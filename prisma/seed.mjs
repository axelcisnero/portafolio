// Datos iniciales. Solo se crean proyectos de ejemplo si la tabla esta vacia.
// Las resenas NO se siembran: se gestionan desde /admin (antes reaparecian en
// cada arranque del contenedor).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if ((await prisma.project.count()) === 0) {
    await prisma.project.create({
      data: {
        name: "Harsoft Solution Center",
        cat: "Soluciones IT",
        catEn: "IT Solutions",
        url: "https://hardsoftsc.com",
        desc: "Sitio web corporativo para un proveedor de soluciones tecnológicas: servicios, marca y captación de clientes.",
        descEn: "Corporate website for a technology solutions provider: services, branding and lead capture.",
      },
    });
    await prisma.project.create({
      data: {
        name: "Tempo Cargo S.A.",
        cat: "Logística & Carga",
        catEn: "Logistics & Freight",
        url: "https://tempocargo.com",
        desc: "Sitio web para una empresa de carga y logística: servicios, cobertura y contacto para operaciones de carga.",
        descEn: "Website for a freight and logistics company: services, coverage and contact for cargo operations.",
      },
    });
    await prisma.project.create({
      data: {
        name: "MROB S.A.",
        cat: "Corporativo",
        catEn: "Corporate",
        url: "https://mrobsa.com",
        desc: "Sitio web corporativo: presentación de la empresa, sus servicios y datos de contacto.",
        descEn: "Corporate website: clean presentation of the company, its services and contact details.",
      },
    });
    console.log("✔ Proyectos de ejemplo creados");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
