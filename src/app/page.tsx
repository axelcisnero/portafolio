import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";
import { CVBody } from "./_cvbody";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/en", "x-default": "/" },
  },
};

export default async function Home() {
  const [projects, reviews, profileImage] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.review.findMany({ orderBy: { createdAt: "asc" } }),
    getSetting("profileImage"),
  ]);
  return (
    <CVBody
      lang="es"
      projects={projects}
      reviews={reviews}
      heroPhoto={profileImage || "/assets/axel.jpg"}
    />
  );
}
