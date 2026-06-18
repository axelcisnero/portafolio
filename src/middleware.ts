import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // Clerk solo se ejecuta en /admin y rutas de API. Las páginas públicas
  // (inicio, etc.) no pasan por el handshake de Clerk: cargan al instante.
  matcher: ["/admin(.*)", "/(api|trpc)(.*)"],
};
