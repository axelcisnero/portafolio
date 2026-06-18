import { currentUser } from "@clerk/nextjs/server";

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** Devuelve true si el usuario autenticado es administrador (su correo está en ADMIN_EMAILS). */
export async function isAdmin(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;
  const emails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
  const allowed = adminEmails();
  return emails.some((e) => allowed.includes(e));
}
