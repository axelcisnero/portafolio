import { prisma } from "@/lib/prisma";

/** Lee un ajuste por clave; devuelve null si no existe. */
export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}
