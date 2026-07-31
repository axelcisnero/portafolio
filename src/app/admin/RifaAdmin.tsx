"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";

const RIFA = "/rifa/admin/api";

type NumInfo = { n: string; paid: boolean };
type Person = {
  id: number; first_name: string; last_name: string; phone: string;
  count: number; paidCount: number; allPaid: boolean; numbers: NumInfo[];
};
type Overview = {
  stats: { total: number; taken: number; available: number; paid: number; unpaid: number; complete: boolean; allPaid: boolean };
  price: number;
  amounts: { perNumber: number; collected: number; pending: number; sold: number; total: number };
  participants: Person[];
  drawDate: string | null; drawDateEs: string; winningNumber: string | null;
  winnerNotified: boolean; winner: { first_name: string; last_name: string; phone: string } | null;
  whatsappEnabled: boolean;
};

const money = (n: number) => "$" + (Math.round(n * 100) / 100).toFixed(2);

export function RifaAdmin() {
  const { getToken } = useAuth();
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [onlyDebt, setOnlyDebt] = useState(false);
  const [busy, setBusy] = useState(false);
  const priceRef = useRef<HTMLInputElement>(null);

  const call = useCallback(async (path: string, opts: RequestInit = {}) => {
    const token = await getToken();
    return fetch(RIFA + path, {
      ...opts,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, ...(opts.headers || {}) },
    });
  }, [getToken]);

  const load = useCallback(async () => {
    try {
      setError(null);
      const res = await call("/overview");
      if (!res.ok) { setError(res.status === 401 ? "Tu cuenta no tiene acceso a la rifa." : "Error " + res.status); setData(null); }
      else setData(await res.json());
    } catch { setError("No se pudo conectar con la rifa."); }
    setLoading(false);
  }, [call]);

  useEffect(() => { load(); }, [load]);

  const act = async (path: string, body: Record<string, unknown>) => {
    setBusy(true);
    await call(path, { method: "POST", body: JSON.stringify(body) });
    await load();
    setBusy(false);
  };

  const resend = async () => {
    if (!confirm("¿Enviar la confirmación por WhatsApp a TODOS los participantes actuales? Úsalo cuando las plantillas ya estén aprobadas.")) return;
    setBusy(true);
    const res = await call("/resend-confirmations", { method: "POST" });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (d.ok) alert(`Confirmaciones enviadas: ${d.sent} · Fallidas: ${d.failed} (de ${d.total}).`);
    else alert("Error: " + (d.error || res.status));
    load();
  };

  if (loading) return <p className="admin-empty">Cargando rifa…</p>;
  if (error) return <p className="admin-empty">{error}</p>;
  if (!data) return null;

  const s = data.stats;
  const people = onlyDebt ? data.participants.filter((p) => !p.allPaid) : data.participants;
  const statCards = [
    { n: s.available, l: "Disponibles", c: "" },
    { n: s.taken, l: "Vendidos", c: "" },
    { n: s.paid, l: "Pagados", c: "#1faa53" },
    { n: s.unpaid, l: "Por cobrar", c: s.unpaid > 0 ? "#d83a1c" : "#1faa53" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12, marginBottom: 18 }}>
        {statCards.map((c) => (
          <div key={c.l} className="admin-form" style={{ padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: c.c || undefined }}>{c.n}</div>
            <div className="admin-row-meta" style={{ textTransform: "uppercase", letterSpacing: ".05em" }}>{c.l}</div>
          </div>
        ))}
      </div>

      <div className="admin-form" style={{ marginBottom: 16 }}>
        <h2>Precio y dinero</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: ".85rem", fontWeight: 600 }}>Precio por número ($)</label>
            <input
              ref={priceRef}
              type="number"
              step="0.01"
              min="0"
              defaultValue={data.price || ""}
              key={data.price}
              style={{ display: "block", padding: 8, borderRadius: 8, border: "1.5px solid rgba(18,18,24,.28)", width: 140, marginTop: 4 }}
            />
          </div>
          <button className="btn btn-line sm" disabled={busy} onClick={() => act("/price", { price: priceRef.current?.value })}>Guardar precio</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10 }}>
          {[
            { l: "Cobrado", v: data.amounts.collected, c: "#1faa53" },
            { l: "Pendiente", v: data.amounts.pending, c: data.amounts.pending > 0 ? "#d83a1c" : "#1faa53" },
            { l: "Valor vendido", v: data.amounts.sold, c: "" },
            { l: "Total rifa", v: data.amounts.total, c: "" },
          ].map((m) => (
            <div key={m.l} style={{ border: "1px solid rgba(18,18,24,.12)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: m.c || undefined }}>{money(m.v)}</div>
              <div className="admin-row-meta" style={{ textTransform: "uppercase", letterSpacing: ".05em" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-form" style={{ marginBottom: 16 }}>
        <h2>Sorteo y ganador</h2>
        <p className="admin-hint">
          {data.drawDate
            ? "Sorteo: " + data.drawDateEs
            : s.complete && !s.allPaid
              ? "Todos vendidos, faltan " + s.unpaid + " por pagar. El sorteo se fija cuando todos esten pagados."
              : "El sorteo se fija cuando los 100 numeros esten vendidos y pagados."}
        </p>
        {data.winningNumber && (
          <p style={{ fontWeight: 700 }}>
            🏆 Numero ganador: {data.winningNumber}
            {data.winner ? " — " + data.winner.first_name + " " + data.winner.last_name + " (" + data.winner.phone + ")" : " (sin dueno)"}
          </p>
        )}
        <div className="admin-form-actions">
          <button className="btn btn-line sm" disabled={busy} onClick={() => act("/resolve", {})}>Leer resultado de la Loteria</button>
          <button className="btn btn-line sm" disabled={busy} onClick={() => load()}>Actualizar</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>Participantes ({data.participants.length})</h2>
        <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: ".9rem" }}>
          <input type="checkbox" checked={onlyDebt} onChange={(e) => setOnlyDebt(e.target.checked)} /> Solo por cobrar
        </label>
      </div>

      <div className="admin-list">
        {people.length === 0 && <p className="admin-empty">Nadie por aqui.</p>}
        {people.map((p) => (
          <div key={p.id} className="admin-row" style={{ display: "block", borderLeft: p.allPaid ? undefined : "3px solid #d83a1c" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div>
                <strong>{p.first_name} {p.last_name}</strong>{" "}
                <span style={{ fontWeight: 700, fontSize: ".76rem", padding: "2px 8px", borderRadius: 999, background: p.allPaid ? "#e8f7ee" : "#fdece8", color: p.allPaid ? "#178f45" : "#b92f16" }}>
                  {p.allPaid ? "✓ Pagado" : "Debe " + (p.count - p.paidCount) + "/" + p.count}
                </span>
                <div className="admin-row-meta">
                  {p.phone} · <a href={"https://wa.me/" + p.phone} target="_blank" rel="noopener" style={{ color: "#178f45" }}>WhatsApp</a> · {p.count} numero(s)
                </div>
              </div>
              <div className="admin-row-tools">
                {!p.allPaid && <button className="btn btn-line sm" disabled={busy} onClick={() => act("/participant/paid", { id: p.id, paid: true })}>Marcar pagado</button>}
                <button className="btn btn-line sm danger" disabled={busy} onClick={() => { if (confirm("¿Eliminar y liberar sus numeros?")) act("/participant/delete", { id: p.id }); }}>Eliminar</button>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {p.numbers.map((x) => (
                <button
                  key={x.n}
                  disabled={busy}
                  onClick={() => act("/paid", { n: parseInt(x.n, 10), paid: !x.paid })}
                  title={x.paid ? "Pagado (clic para quitar)" : "Sin pagar (clic para marcar)"}
                  style={{
                    cursor: "pointer", fontVariantNumeric: "tabular-nums", fontWeight: 700,
                    borderRadius: 8, padding: "4px 9px", fontSize: ".82rem",
                    border: "1.5px solid " + (x.paid ? "#1faa53" : "#d83a1c"),
                    background: x.paid ? "#1faa53" : "transparent",
                    color: x.paid ? "#fff" : "#d83a1c",
                  }}
                >
                  {x.paid ? "✓ " : ""}{x.n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form" style={{ marginTop: 16 }}>
        <h2>Mensajes</h2>
        <p className="admin-hint">Reenvía la confirmación por WhatsApp a todos los que ya reservaron (con sus números y monto). Úsalo una vez cuando Meta apruebe las plantillas, para avisar a quienes compraron antes de la aprobación.</p>
        <button className="btn btn-line sm" disabled={busy} onClick={resend}>
          Reenviar confirmación a todos
        </button>
      </div>

      <div className="admin-form" style={{ marginTop: 16 }}>
        <h2>Reiniciar rifa</h2>
        <p className="admin-hint">Libera los 100 numeros y borra participantes para empezar de cero. No se puede deshacer.</p>
        <button
          className="btn btn-line sm danger"
          disabled={busy}
          onClick={() => { if (confirm("¿Reiniciar la rifa? Libera todo y borra participantes.") && confirm("Ultima confirmacion: no se puede deshacer.")) act("/reset", {}); }}
        >
          Reiniciar rifa
        </button>
      </div>
    </div>
  );
}
