"use client";

import { useRef, useState } from "react";

/** Redimensiona una imagen del usuario y la devuelve como dataURL JPEG. */
function fileToResizedDataURL(file: File, maxW = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxW) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        if (!ctx) return reject(new Error("Canvas no disponible"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const STR = {
  es: { upload: "Subir imagen", busy: "Procesando…", remove: "Quitar", url: "…o pega una URL" },
  en: { upload: "Upload image", busy: "Processing…", remove: "Remove", url: "…or paste a URL" },
};

export function ImageField({
  name,
  defaultValue,
  label = "Imagen",
  maxW = 1000,
  round = false,
  lang = "es",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
  maxW?: number;
  round?: boolean;
  lang?: "es" | "en";
}) {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const s = STR[lang];

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const url = await fileToResizedDataURL(f, maxW);
      setValue(url);
    } catch {
      alert("No se pudo procesar la imagen. Prueba con otra.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="field">
      <label>{label}</label>
      <input type="hidden" name={name} value={value} />
      <div className="img-field">
        <div
          className="img-field-prev"
          style={round ? { borderRadius: "50%", width: 72, height: 72 } : undefined}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          )}
        </div>
        <div className="img-field-controls">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
          <button type="button" className="btn btn-ghost sm" onClick={() => fileRef.current?.click()} disabled={busy}>
            {busy ? s.busy : s.upload}
          </button>
          {value && (
            <button type="button" className="btn btn-ghost sm danger" onClick={() => setValue("")}>
              {s.remove}
            </button>
          )}
          <input
            className="img-field-url"
            type="url"
            placeholder={s.url}
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
