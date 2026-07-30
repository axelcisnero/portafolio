import type { MetadataRoute } from "next";

const SITE_URL = "https://axelicisnero.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: SITE_URL, en: `${SITE_URL}/en` };
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
