# ===== Etapa 1: dependencias y build =====
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

# Clave dummy solo para compilar (la real se pasa como --build-arg)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuZXhhbXBsZS5jb20k
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL="file:/app/data/prod.db"

RUN npx prisma generate && npm run build

# Crea una BD "plantilla" con el esquema ya aplicado. En el primer arranque se
# copia al volumen, así no hace falta la CLI de Prisma en la imagen final.
RUN DATABASE_URL="file:/app/prisma/template.db" npx prisma db push --skip-generate

# ===== Etapa 2: imagen final =====
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/data/prod.db"

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# prisma/ incluye schema.prisma, seed.mjs y la BD plantilla creada en el build
COPY --from=builder /app/prisma ./prisma
# Cliente de Prisma generado (motor de consultas) para la app y el seed
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

RUN mkdir -p /app/data && chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copia la BD plantilla al volumen si aún no existe, siembra datos y arranca.
CMD ["sh", "-c", "[ -f /app/data/prod.db ] || cp /app/prisma/template.db /app/data/prod.db; node prisma/seed.mjs && node server.js"]
