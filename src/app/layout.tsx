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

export const metadata: Metadata = {
  title: "Axel Cisnero — Hoja de Vida",
  description:
    "Axel Cisnero · Business Solution Analyst y Desarrollador de Software. Experiencia en tecnología empresarial, redes, MDM y agentes de IA.",
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
          <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        </head>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  );
}
