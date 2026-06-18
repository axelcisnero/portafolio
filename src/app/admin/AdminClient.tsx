"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ImageField } from "@/components/ImageField";
import { upsertReview, deleteReview, upsertProject, deleteProject, setProfileImage } from "./actions";

interface ReviewRow {
  id: string;
  place: string;
  loc: string;
  stars: number;
  text: string;
  textEn: string | null;
  img: string | null;
}
interface ProjectRow {
  id: string;
  name: string;
  cat: string;
  catEn: string | null;
  url: string;
  desc: string;
  descEn: string | null;
  img: string | null;
}

export function AdminClient({
  userName,
  reviews,
  projects,
  profileImage,
}: {
  userName: string;
  reviews: ReviewRow[];
  projects: ProjectRow[];
  profileImage: string | null;
}) {
  const [tab, setTab] = useState<"reviews" | "projects">("reviews");
  const [editReview, setEditReview] = useState<ReviewRow | null>(null);
  const [editProject, setEditProject] = useState<ProjectRow | null>(null);

  return (
    <main className="admin-shell wide">
      <header className="admin-top">
        <div>
          <h1>Panel de administración</h1>
          <p className="admin-sub">Hola, {userName} 👋 — gestiona tus reseñas y proyectos.</p>
        </div>
        <div className="admin-top-tools">
          <Link href="/" className="btn btn-ghost">Ver sitio</Link>
          <UserButton />
        </div>
      </header>

      <div className="card admin-profile">
        <form action={setProfileImage} style={{ width: "100%" }}>
          <div style={{ marginBottom: 4 }}>
            <h2>Foto de perfil</h2>
            <p>Sube tu foto (aparece en el inicio). Se guarda al pulsar “Guardar foto”.</p>
          </div>
          <ImageField name="img" defaultValue={profileImage} label="" maxW={800} round />
          <button type="submit" className="btn btn-primary sm">Guardar foto</button>
        </form>
      </div>

      <div className="admin-tabs">
        <button className={tab === "reviews" ? "on" : ""} onClick={() => setTab("reviews")}>
          Reseñas ({reviews.length})
        </button>
        <button className={tab === "projects" ? "on" : ""} onClick={() => setTab("projects")}>
          Proyectos ({projects.length})
        </button>
      </div>

      {tab === "reviews" ? (
        <div className="admin-grid">
          <div className="card admin-form">
            <h2>{editReview ? "Editar reseña" : "Nueva reseña"}</h2>
            <form
              key={editReview?.id ?? "new-review"}
              action={async (fd) => {
                await upsertReview(fd);
                setEditReview(null);
              }}
            >
              <input type="hidden" name="id" defaultValue={editReview?.id ?? ""} />
              <div className="field">
                <label>Lugar</label>
                <input name="place" required defaultValue={editReview?.place ?? ""} placeholder="Ej. Times Square" />
              </div>
              <div className="field two">
                <div>
                  <label>Ubicación</label>
                  <input name="loc" defaultValue={editReview?.loc ?? ""} placeholder="Ej. Panamá" />
                </div>
                <div>
                  <label>Estrellas (1-5)</label>
                  <input name="stars" type="number" min={1} max={5} defaultValue={editReview?.stars ?? 5} />
                </div>
              </div>
              <div className="field">
                <label>Comentario (español)</label>
                <textarea name="text" rows={3} required defaultValue={editReview?.text ?? ""} placeholder="Tu reseña..." />
              </div>
              <div className="field">
                <label>Comentario (inglés, opcional)</label>
                <textarea name="textEn" rows={3} defaultValue={editReview?.textEn ?? ""} placeholder="Your review in English..." />
              </div>
              <ImageField name="img" defaultValue={editReview?.img} label="Foto del lugar (opcional)" />
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">Guardar reseña</button>
                {editReview && (
                  <button type="button" className="btn btn-ghost" onClick={() => setEditReview(null)}>Cancelar</button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-list">
            {reviews.length === 0 && <p className="admin-empty">Aún no hay reseñas.</p>}
            {reviews.map((r) => (
              <div key={r.id} className="card admin-row">
                <div className="admin-row-main">
                  <strong>{r.place}</strong>
                  <span className="admin-row-meta">{r.loc} · {"★".repeat(r.stars)}</span>
                  <p>{r.text}</p>
                </div>
                <div className="admin-row-tools">
                  <button className="btn btn-ghost sm" onClick={() => setEditReview(r)}>Editar</button>
                  <form action={deleteReview} onSubmit={(e) => { if (!confirm("¿Eliminar esta reseña?")) e.preventDefault(); }}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="btn btn-ghost sm danger">Eliminar</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <div className="card admin-form">
            <h2>{editProject ? "Editar proyecto" : "Nuevo proyecto"}</h2>
            <p className="admin-hint">La miniatura se genera automáticamente desde la URL si no subes una imagen.</p>
            <form
              key={editProject?.id ?? "new-project"}
              action={async (fd) => {
                await upsertProject(fd);
                setEditProject(null);
              }}
            >
              <input type="hidden" name="id" defaultValue={editProject?.id ?? ""} />
              <div className="field">
                <label>Nombre del proyecto</label>
                <input name="name" required defaultValue={editProject?.name ?? ""} placeholder="Ej. Mi Cliente S.A." />
              </div>
              <div className="field two">
                <div>
                  <label>Categoría (español)</label>
                  <input name="cat" defaultValue={editProject?.cat ?? ""} placeholder="Ej. Sitio corporativo" />
                </div>
                <div>
                  <label>Categoría (inglés)</label>
                  <input name="catEn" defaultValue={editProject?.catEn ?? ""} placeholder="Ex. Corporate site" />
                </div>
              </div>
              <div className="field">
                <label>URL del sitio</label>
                <input name="url" type="url" required defaultValue={editProject?.url ?? ""} placeholder="https://..." />
              </div>
              <div className="field">
                <label>Descripción (español)</label>
                <textarea name="desc" rows={3} defaultValue={editProject?.desc ?? ""} placeholder="¿Qué hiciste en este proyecto?" />
              </div>
              <div className="field">
                <label>Descripción (inglés, opcional)</label>
                <textarea name="descEn" rows={3} defaultValue={editProject?.descEn ?? ""} placeholder="What did you build?" />
              </div>
              <ImageField name="img" defaultValue={editProject?.img} label="Miniatura personalizada (opcional)" />
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">Guardar proyecto</button>
                {editProject && (
                  <button type="button" className="btn btn-ghost" onClick={() => setEditProject(null)}>Cancelar</button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-list">
            {projects.length === 0 && <p className="admin-empty">Aún no hay proyectos.</p>}
            {projects.map((p) => (
              <div key={p.id} className="card admin-row">
                <div className="admin-row-main">
                  <strong>{p.name}</strong>
                  <span className="admin-row-meta">{p.cat} · {p.url.replace(/^https?:\/\//, "")}</span>
                  <p>{p.desc}</p>
                </div>
                <div className="admin-row-tools">
                  <button className="btn btn-ghost sm" onClick={() => setEditProject(p)}>Editar</button>
                  <form action={deleteProject} onSubmit={(e) => { if (!confirm("¿Eliminar este proyecto?")) e.preventDefault(); }}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="btn btn-ghost sm danger">Eliminar</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
