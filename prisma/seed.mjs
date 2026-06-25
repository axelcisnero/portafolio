// Datos iniciales basados en tu plantilla. Puedes editarlos o borrarlos desde /admin.
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

  if ((await prisma.review.count()) === 0) {
    await prisma.review.create({
      data: {
        place: "Times Square",
        loc: "New York, USA",
        stars: 5,
        text: "Una experiencia eléctrica y abrumadora; la energía de la ciudad nunca se detiene. Hay que verlo al menos una vez.",
        textEn: "An overwhelming, electric experience; the energy of the city never stops. A must-see at least once.",
      },
    });
    await prisma.review.create({
      data: {
        place: "Casco Antiguo",
        loc: "Panamá",
        stars: 5,
        text: "Historia, arquitectura y buena comida en cada esquina. Perfecto para caminar al atardecer.",
        textEn: "History, architecture and great food in every corner. Perfect for an evening walk.",
      },
    });
    await prisma.review.create({
      data: {
        place: "Bocas del Toro",
        loc: "Panamá",
        stars: 4,
        text: "Playas caribeñas y un ambiente relajado. Ideal para desconectarse unos días.",
        textEn: "Caribbean beaches and a relaxed vibe. Ideal to disconnect for a few days.",
      },
    });
    console.log("✔ Reseñas de ejemplo creadas");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
