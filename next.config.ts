import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera una build autocontenida (.next/standalone) ideal para Docker / VPS
  output: "standalone",
  experimental: {
    // Permite subir imágenes (se guardan como dataURL en la base de datos)
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
