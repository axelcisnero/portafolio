# Hoja de Vida — Axel Cisnero

Portafolio profesional bilingüe (ES/EN) basado en la plantilla **"Hoja de Vida"**,
portada a Next.js con reseñas y proyectos gestionados desde una base de datos y
login con Clerk.

## ✨ Características

- **CV completo**: perfil, experiencia (timeline), educación, habilidades.
- **Proyectos**: tarjetas con miniatura automática del sitio (thum.io); los
  visitantes hacen clic y abren el sitio real. Se gestionan desde `/admin`.
- **Reseñas**: lugares visitados y comida, con estrellas y foto. Las publicas tú
  y **las ven todos los visitantes** (guardadas en base de datos).
- **Login con Clerk**: solo los correos en `ADMIN_EMAILS` acceden a `/admin`.
- **Bilingüe ES/EN**, **tema claro/oscuro**, **botón flotante de WhatsApp** y
  formulario de contacto (abre el correo del visitante).
- **Diseño fiel a la plantilla**: fuentes Space Grotesk / Manrope, theming por
  variables CSS (`data-dark`, `data-accent`).

## 🛠️ Stack

Next.js 15 (App Router) · TypeScript · CSS de la plantilla · Clerk ·
Prisma + SQLite · next/font

## 🚀 Desarrollo local

```bash
npm install

# .env ya tiene tus claves de Clerk (dev) y ADMIN_EMAILS.
npx prisma db push      # crea la base de datos
node prisma/seed.mjs    # datos de ejemplo (tus proyectos y reseñas)

npm run dev             # http://localhost:3000
```

Inicia sesión con un correo de `ADMIN_EMAILS` y entra a `/admin` para gestionar
reseñas y proyectos.

## 📁 Estructura

```
src/
  app/
    page.tsx          # Página principal (plantilla + datos de la BD)
    cv-styles.css     # CSS de la plantilla (copiado de "Hoja De Vida")
    cv-admin.css      # CSS de modales/panel
    admin/            # Panel /admin protegido con Clerk + server actions
  components/
    CVScripts.tsx     # Interacciones (nav, i18n, tema, estrellas, reveal, form)
  lib/                # Prisma, verificación de admin
prisma/
  schema.prisma       # Modelos Review y Project
  seed.mjs            # Datos iniciales
public/assets/        # Foto y CV en PDF
"Hoja De Vida"/       # Plantilla original (referencia; no se sirve)
```

## 🌐 Despliegue

Ver [DEPLOY.md](DEPLOY.md) — guía para VPS con Docker, Nginx y HTTPS,
**conviviendo con tu agente de IA** en el mismo servidor.
