import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";
import { CVBody } from "../_cvbody";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = "https://axelicisnero.com";
const DESC_EN =
  "Axel Cisnero — IT Infrastructure Specialist and Software Developer. Over a decade in enterprise technology, networks, MDM and AI agents. Based in Panama, available worldwide.";

export const metadata: Metadata = {
  title: "Axel Cisnero — IT Infrastructure & Software Development",
  description: DESC_EN,
  keywords: [
    "Axel Cisnero",
    "IT Infrastructure Specialist",
    "Software Developer",
    "MDM consultant",
    "Enterprise IT support",
    "Networking",
    "AI agents",
    "Web development",
    "Panama",
    "Freelance developer",
  ],
  alternates: {
    canonical: "/en",
    languages: { es: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Axel Cisnero — IT Infrastructure & Software Development",
    description: DESC_EN,
    url: SITE_URL + "/en",
    siteName: "Axel Cisnero",
    locale: "en_US",
    type: "website",
    images: [{ url: "/assets/axel.jpg", width: 800, height: 800, alt: "Axel Cisnero" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel Cisnero — IT Infrastructure & Software Development",
    description: DESC_EN,
    images: ["/assets/axel.jpg"],
  },
};

export default async function HomeEN() {
  const [projects, reviews, profileImage] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.review.findMany({ orderBy: { createdAt: "asc" } }),
    getSetting("profileImage"),
  ]);
  return (
    <CVBody
      lang="en"
      projects={projects}
      reviews={reviews}
      heroPhoto={profileImage || "/assets/axel.jpg"}
    />
  );
}
