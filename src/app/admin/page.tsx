import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { getSetting } from "@/lib/settings";
import { AdminClient } from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await currentUser();
  const admin = await isAdmin();

  if (!user) {
    return (
      <main className="admin-shell">
        <div className="card admin-gate">
          <div className="admin-gate-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          <h1>Acceso de administrador</h1>
          <p>Inicia sesión para gestionar tus reseñas y proyectos.</p>
          <SignInButton mode="modal">
            <button className="btn btn-primary" style={{ width: "100%" }}>Iniciar sesión</button>
          </SignInButton>
          <Link href="/" className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }}>Volver al inicio</Link>
        </div>
      </main>
    );
  }

  if (!admin) {
    return (
      <main className="admin-shell">
        <div className="card admin-gate">
          <div className="admin-gate-ic" style={{ color: "#c23b3b" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
          </div>
          <h1>Sin permisos</h1>
          <p>
            Hola {user.firstName || "👋"}, tu cuenta no tiene permisos de administrador.
            Solo el dueño del sitio puede publicar contenido.
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 14px" }}>
            <UserButton />
          </div>
          <Link href="/" className="btn btn-ghost" style={{ width: "100%" }}>Volver al inicio</Link>
        </div>
      </main>
    );
  }

  const [reviews, projects, profileImage] = await Promise.all([
    prisma.review.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "asc" } }),
    getSetting("profileImage"),
  ]);

  return (
    <AdminClient
      userName={user.firstName || "Axel"}
      profileImage={profileImage}
      reviews={reviews.map((r) => ({ ...r, createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString() }))}
      projects={projects.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }))}
    />
  );
}
