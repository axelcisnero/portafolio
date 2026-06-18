"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";

async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("No autorizado: solo el administrador puede realizar esta acción.");
  }
}

function clean(v: FormDataEntryValue | null): string {
  return ((v as string) || "").trim();
}

/* ===================== RESEÑAS ===================== */

export async function upsertReview(formData: FormData) {
  await requireAdmin();
  const id = clean(formData.get("id")) || null;
  const data = {
    place: clean(formData.get("place")),
    loc: clean(formData.get("loc")),
    stars: Math.min(5, Math.max(1, parseInt(clean(formData.get("stars")), 10) || 5)),
    text: clean(formData.get("text")),
    textEn: clean(formData.get("textEn")) || null,
    img: clean(formData.get("img")) || null,
  };
  if (!data.place || !data.text) {
    throw new Error("El lugar y el comentario son obligatorios.");
  }
  if (id) await prisma.review.update({ where: { id }, data });
  else await prisma.review.create({ data });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const id = clean(formData.get("id"));
  if (id) await prisma.review.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

/* ===================== PROYECTOS ===================== */

export async function upsertProject(formData: FormData) {
  await requireAdmin();
  const id = clean(formData.get("id")) || null;
  let url = clean(formData.get("url"));
  if (url && !/^https?:\/\//.test(url)) url = "https://" + url;
  const data = {
    name: clean(formData.get("name")),
    cat: clean(formData.get("cat")) || "Proyecto",
    catEn: clean(formData.get("catEn")) || null,
    url,
    desc: clean(formData.get("desc")),
    descEn: clean(formData.get("descEn")) || null,
    img: clean(formData.get("img")) || null,
  };
  if (!data.name || !data.url) {
    throw new Error("El nombre y la URL del proyecto son obligatorios.");
  }
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = clean(formData.get("id"));
  if (id) await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

/* ===================== AJUSTES (foto de perfil) ===================== */

export async function setProfileImage(formData: FormData) {
  await requireAdmin();
  const img = clean(formData.get("img"));
  if (!img) throw new Error("No se recibió ninguna imagen.");
  await prisma.setting.upsert({
    where: { key: "profileImage" },
    update: { value: img },
    create: { key: "profileImage", value: img },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}
