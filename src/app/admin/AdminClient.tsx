"use client";

import { useEffect, useState } from "react";
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

type Lang = "es" | "en";

const T = {
  es: {
    title: "Panel de administración",
    greet: (n: string) => `Hola, ${n}. Gestiona tus reseñas y proyectos.`,
    viewSite: "Ver sitio",
    reviews: "Reseñas",
    projects: "Proyectos",
    profilePhoto: "Foto de perfil",
    profileHint: "Sube tu foto (aparece en el inicio). Se guarda al pulsar Guardar foto.",
    savePhoto: "Guardar foto",
    newReview: "Nueva reseña",
    editReviewT: "Editar reseña",
    place: "Lugar",
    location: "Ubicación",
    stars: "Estrellas (1-5)",
    commentEs: "Comentario (español)",
    commentEn: "Comentario (inglés, opcional)",
    placePhoto: "Foto del lugar (opcional)",
    saveReview: "Guardar reseña",
    cancel: "Cancelar",
    edit: "Editar",
    del: "Eliminar",
    noReviews: "Aún no hay reseñas.",
    confirmDelReview: "¿Eliminar esta reseña?",
    newProject: "Nuevo proyecto",
    editProjectT: "Editar proyecto",
    projectHint: "La miniatura se genera automáticamente desde la URL si no subes una imagen.",
    projectName: "Nombre del proyecto",
    catEs: "Categoría (español)",
    catEnL: "Categoría (inglés)",
    siteUrl: "URL del sitio",
    descEs: "Descripción (español)",
    descEnL: "Descripción (inglés, opcional)",
    customThumb: "Miniatura personalizada (opcional)",
    saveProject: "Guardar proyecto",
    noProjects: "Aún no hay proyectos.",
    confirmDelProject: "¿Eliminar este proyecto?",
    phPlace: "Ej. Times Square",
    phLoc: "Ej. Panamá",
    phReview: "Tu reseña",
    phReviewEn: "Tu reseña en inglés",
    phName: "Ej. Mi Cliente S.A.",
    phCat: "Ej. Sitio corporativo",
    phCatEn: "Ex. Corporate site",
    phDesc: "¿Qué hiciste en este proyecto?",
    phDescEn: "What did you build?",
  },
  en: {
    title: "Admin dashboard",
    greet: (n: string) => `Hi, ${n}. Manage your reviews and projects.`,
    viewSite: "View site",
    reviews: "Reviews",
    projects: "Projects",
    profilePhoto: "Profile photo",
    profileHint: "Upload your photo (shown on the homepage). Saved when you click Save photo.",
    savePhoto: "Save photo",
    newReview: "New review",
    editReviewT: "Edit review",
    place: "Place",
    location: "Location",
    stars: "Stars (1-5)",
    commentEs: "Comment (Spanish)",
    commentEn: "Comment (English, optional)",
    placePhoto: "Place photo (optional)",
    saveReview: "Save review",
    cancel: "Cancel",
    edit: "Edit",
    del: "Delete",
    noReviews: "No reviews yet.",
    confirmDelReview: "Delete this review?",
    newProject: "New project",
    editProjectT: "Edit project",
    projectHint: "The thumbnail is generated automatically from the URL if you don't upload an image.",
    projectName: "Project name",
    catEs: "Category (Spanish)",
    catEnL: "Category (English)",
    siteUrl: "Site URL",
    descEs: "Description (Spanish)",
    descEnL: "Description (English, optional)",
    customThumb: "Custom thumbnail (optional)",
    saveProject: "Save project",
    noProjects: "No projects yet.",
    confirmDelProject: "Delete this project?",
    phPlace: "e.g. Times Square",
    phLoc: "e.g. Panama",
    phReview: "Your review",
    phReviewEn: "Your review in English",
    phName: "e.g. My Client Inc.",
    phCat: "e.g. Corporate site",
    phCatEn: "e.g. Corporate site",
    phDesc: "What did you do on this project?",
    phDescEn: "What did you build?",
  },
};

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
  const [lang, setLang] = useState<Lang>("es");
  const [dark, setDark] = useState(false);

  // Sincroniza con las preferencias guardadas del sitio público
  useEffect(() => {
    try {
      const l = localStorage.getItem("cv-axel-lang");
      if (l === "en" || l === "es") setLang(l);
      setDark(localStorage.getItem("cv-axel-theme") === "dark");
    } catch {}
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    try { localStorage.setItem("cv-axel-lang", l); } catch {}
  };
  const changeTheme = (isDark: boolean) => {
    setDark(isDark);
    document.documentElement.setAttribute("data-dark", isDark ? "true" : "false");
    try { localStorage.setItem("cv-axel-theme", isDark ? "dark" : "light"); } catch {}
  };

  const t = T[lang];

  return (
    <main className="admin-shell wide">
      <header className="admin-top">
        <div>
          <h1>{t.title}</h1>
          <p className="admin-sub">{t.greet(userName)}</p>
        </div>
        <div className="admin-top-tools">
          <div className="toggle" id="langToggle">
            <button className={lang === "es" ? "active" : ""} onClick={() => changeLang("es")}>ES</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => changeLang("en")}>EN</button>
          </div>
          <div className="toggle" role="group" aria-label="Tema">
            <button className={!dark ? "active" : ""} aria-label="Claro" onClick={() => changeTheme(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            </button>
            <button className={dark ? "active" : ""} aria-label="Oscuro" onClick={() => changeTheme(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            </button>
          </div>
          <Link href="/" className="btn btn-line sm">{t.viewSite}</Link>
          <UserButton />
        </div>
      </header>

      <section className="admin-profile">
        <form action={setProfileImage}>
          <h2>{t.profilePhoto}</h2>
          <p className="admin-hint">{t.profileHint}</p>
          <ImageField name="img" defaultValue={profileImage} label="" maxW={800} round lang={lang} />
          <button type="submit" className="btn btn-primary sm">{t.savePhoto}</button>
        </form>
      </section>

      <div className="admin-tabs">
        <button className={tab === "reviews" ? "on" : ""} onClick={() => setTab("reviews")}>
          {t.reviews} ({reviews.length})
        </button>
        <button className={tab === "projects" ? "on" : ""} onClick={() => setTab("projects")}>
          {t.projects} ({projects.length})
        </button>
      </div>

      {tab === "reviews" ? (
        <div className="admin-grid">
          <section className="admin-form">
            <h2>{editReview ? t.editReviewT : t.newReview}</h2>
            <form
              key={editReview?.id ?? "new-review"}
              action={async (fd) => { await upsertReview(fd); setEditReview(null); }}
            >
              <input type="hidden" name="id" defaultValue={editReview?.id ?? ""} />
              <div className="field">
                <label>{t.place}</label>
                <input name="place" required defaultValue={editReview?.place ?? ""} placeholder={t.phPlace} />
              </div>
              <div className="field two">
                <div>
                  <label>{t.location}</label>
                  <input name="loc" defaultValue={editReview?.loc ?? ""} placeholder={t.phLoc} />
                </div>
                <div>
                  <label>{t.stars}</label>
                  <input name="stars" type="number" min={1} max={5} defaultValue={editReview?.stars ?? 5} />
                </div>
              </div>
              <div className="field">
                <label>{t.commentEs}</label>
                <textarea name="text" rows={3} required defaultValue={editReview?.text ?? ""} placeholder={t.phReview} />
              </div>
              <div className="field">
                <label>{t.commentEn}</label>
                <textarea name="textEn" rows={3} defaultValue={editReview?.textEn ?? ""} placeholder={t.phReviewEn} />
              </div>
              <ImageField name="img" defaultValue={editReview?.img} label={t.placePhoto} lang={lang} />
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">{t.saveReview}</button>
                {editReview && (
                  <button type="button" className="btn btn-line" onClick={() => setEditReview(null)}>{t.cancel}</button>
                )}
              </div>
            </form>
          </section>

          <div className="admin-list">
            {reviews.length === 0 && <p className="admin-empty">{t.noReviews}</p>}
            {reviews.map((r) => (
              <div key={r.id} className="admin-row">
                <div className="admin-row-main">
                  <strong>{r.place}</strong>
                  <span className="admin-row-meta">{r.loc} · {"★".repeat(r.stars)}</span>
                  <p>{r.text}</p>
                </div>
                <div className="admin-row-tools">
                  <button className="btn btn-line sm" onClick={() => setEditReview(r)}>{t.edit}</button>
                  <form action={deleteReview} onSubmit={(e) => { if (!confirm(t.confirmDelReview)) e.preventDefault(); }}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="btn btn-line sm danger">{t.del}</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <section className="admin-form">
            <h2>{editProject ? t.editProjectT : t.newProject}</h2>
            <p className="admin-hint">{t.projectHint}</p>
            <form
              key={editProject?.id ?? "new-project"}
              action={async (fd) => { await upsertProject(fd); setEditProject(null); }}
            >
              <input type="hidden" name="id" defaultValue={editProject?.id ?? ""} />
              <div className="field">
                <label>{t.projectName}</label>
                <input name="name" required defaultValue={editProject?.name ?? ""} placeholder={t.phName} />
              </div>
              <div className="field two">
                <div>
                  <label>{t.catEs}</label>
                  <input name="cat" defaultValue={editProject?.cat ?? ""} placeholder={t.phCat} />
                </div>
                <div>
                  <label>{t.catEnL}</label>
                  <input name="catEn" defaultValue={editProject?.catEn ?? ""} placeholder={t.phCatEn} />
                </div>
              </div>
              <div className="field">
                <label>{t.siteUrl}</label>
                <input name="url" type="url" required defaultValue={editProject?.url ?? ""} placeholder="https://..." />
              </div>
              <div className="field">
                <label>{t.descEs}</label>
                <textarea name="desc" rows={3} defaultValue={editProject?.desc ?? ""} placeholder={t.phDesc} />
              </div>
              <div className="field">
                <label>{t.descEnL}</label>
                <textarea name="descEn" rows={3} defaultValue={editProject?.descEn ?? ""} placeholder={t.phDescEn} />
              </div>
              <ImageField name="img" defaultValue={editProject?.img} label={t.customThumb} lang={lang} />
              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">{t.saveProject}</button>
                {editProject && (
                  <button type="button" className="btn btn-line" onClick={() => setEditProject(null)}>{t.cancel}</button>
                )}
              </div>
            </form>
          </section>

          <div className="admin-list">
            {projects.length === 0 && <p className="admin-empty">{t.noProjects}</p>}
            {projects.map((p) => (
              <div key={p.id} className="admin-row">
                <div className="admin-row-main">
                  <strong>{p.name}</strong>
                  <span className="admin-row-meta">{p.cat} · {p.url.replace(/^https?:\/\//, "")}</span>
                  <p>{p.desc}</p>
                </div>
                <div className="admin-row-tools">
                  <button className="btn btn-line sm" onClick={() => setEditProject(p)}>{t.edit}</button>
                  <form action={deleteProject} onSubmit={(e) => { if (!confirm(t.confirmDelProject)) e.preventDefault(); }}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="btn btn-line sm danger">{t.del}</button>
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
