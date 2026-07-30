import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono, Newsreader } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import "./cv-styles.css";
import "./cv-admin.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--f-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono" });
const serif = Newsreader({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--f-serif" });

const SITE_URL = "https://axelicisnero.com";
const SITE_DESC =
  "Axel Cisnero · Especialista en Infraestructura TI y Desarrollador de Software. Más de una década en tecnología empresarial, redes, MDM y agentes de IA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axel Cisnero · Infraestructura TI y Desarrollo de Software",
    template: "%s · Axel Cisnero",
  },
  description: SITE_DESC,
  keywords: [
    "Axel Cisnero",
    "Infraestructura TI",
    "Especialista en TI Panamá",
    "Desarrollador de Software Panamá",
    "Soporte técnico empresarial",
    "Redes y comunicaciones",
    "MDM",
    "Agentes de IA",
    "Ciberseguridad",
    "Desarrollo web",
    "Consultor de tecnología",
  ],
  authors: [{ name: "Axel Cisnero", url: SITE_URL }],
  creator: "Axel Cisnero",
  publisher: "Axel Cisnero",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Axel Cisnero · Infraestructura TI y Desarrollo de Software",
    description: SITE_DESC,
    url: SITE_URL,
    siteName: "Axel Cisnero",
    locale: "es_PA",
    type: "website",
    images: [{ url: "/assets/axel.jpg", width: 800, height: 800, alt: "Axel Cisnero" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel Cisnero · Infraestructura TI y Desarrollo de Software",
    description: SITE_DESC,
    images: ["/assets/axel.jpg"],
  },
};

// Datos estructurados (JSON-LD): ayudan a Google a entender quién eres y a
// mostrarte en resultados enriquecidos (perfil profesional + contacto).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Axel Cisnero",
      url: SITE_URL,
      image: `${SITE_URL}/assets/axel.jpg`,
      jobTitle: "Especialista en Infraestructura TI y Desarrollador de Software",
      email: "mailto:axel.cisnero@hotmail.com",
      sameAs: ["https://github.com/axelcisnero", "https://www.linkedin.com/in/acisnero/"],
      address: { "@type": "PostalAddress", addressCountry: "PA" },
      knowsAbout: [
        "Infraestructura TI",
        "Redes y comunicaciones",
        "MDM",
        "Desarrollo de Software",
        "Agentes de IA",
        "Ciberseguridad",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Axel Cisnero",
      description: SITE_DESC,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "es-PA",
    },
  ],
};

// Evita el parpadeo de tema: aplica data-dark antes de pintar.
const themeInit = `try{if(localStorage.getItem('cv-axel-theme')==='dark')document.documentElement.setAttribute('data-dark','true');}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={esES}>
      <html
        lang="es"
        data-accent="blue"
        data-dark="false"
        data-font="grotesk"
        suppressHydrationWarning
        className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        </head>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  );
}
