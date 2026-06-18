# 🚀 Despliegue en tu VPS (junto a tu agente de IA)

Tu VPS ya corre un **agente de IA en Docker**. Este portafolio se agrega como
**otro contenedor Docker**, en el **dominio principal**, sin tocar tu agente.

Resumen del plan:

```
                      ┌─────────────── VPS (4 GB+) ───────────────┐
   Internet  ──► Nginx (80/443) ──► tudominio.com   → portafolio  :3000 (Docker)
                      │            └► agente.tudominio.com → agente IA   :XXXX (Docker)
                      └── HTTPS (Certbot)                                          │
                                                                                  ┘
```

- El **agente sigue igual**, en su propio contenedor y su propio subdominio/puerto.
- El **portafolio** corre en el puerto interno `3000` (solo visible dentro del VPS).
- **Nginx** enruta por dominio: el dominio principal va al portafolio.

---

## 1. Configurar Clerk (una sola vez)

1. Entra a <https://dashboard.clerk.com>.
2. Ya tienes una aplicación de desarrollo (`immense-raccoon-94`). Para producción,
   en **Domains** agrega tu dominio real y crea las claves de producción
   (`pk_live_...` y `sk_live_...`). *(Las de test también funcionan para empezar.)*
3. Copia ambas claves; las usarás en el paso 4.

> Solo los correos en `ADMIN_EMAILS` pueden entrar a `/admin` y publicar. Cualquier
> otra persona puede registrarse, pero solo verá el sitio.

---

## 2. Subir el proyecto al VPS

Con Git (recomendado). El `.gitignore` ya excluye `.env`, la base de datos y `docs/`.

```bash
# En tu PC
cd C:\dev\CV
git add .
git commit -m "Portafolio con plantilla Hoja de Vida"
git push   # a tu repo de GitHub

# En el VPS
cd /opt
git clone https://github.com/axelcisnero/TU_REPO.git portfolio
cd portfolio
```

---

## 3. Variables de entorno de producción

```bash
nano /opt/portfolio/.env.production
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxx
ADMIN_EMAILS=axel.cisnero@gmail.com,axel.cisnero@hotmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=50761511270
```

> La clave `NEXT_PUBLIC_*` se incrusta al **compilar**, por eso en el paso 4 se
> pasa también como `--build-arg`.

---

## 4. Levantar el contenedor del portafolio

```bash
cd /opt/portfolio

docker compose build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
docker compose up -d

docker compose logs -f          # verifica que arrancó
curl -I http://localhost:3000   # debe responder 200/307
```

La base de datos SQLite queda en `/opt/portfolio/data/prod.db` (persiste entre
reinicios y actualizaciones, montada como volumen). La primera vez se crean los
datos de ejemplo; edítalos o bórralos desde `/admin`.

> **Puertos:** el portafolio usa el `3000`. Si tu agente ya usa ese puerto, cambia
> el mapeo en `docker-compose.yml` (ej. `"3001:3000"`) y ajusta el `proxy_pass` del
> paso 5 a ese puerto. Revisa con `docker ps` qué puertos están ocupados.

---

## 5. Nginx: enrutar el dominio principal al portafolio

Si tu agente **ya usa Nginx en el host**, solo agrega un `server` nuevo.
Si no, instálalo (no afecta a tu contenedor del agente):

```bash
apt install -y nginx
```

```bash
nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

> Tu agente queda en su propio bloque `server` (su subdominio). Si el agente hoy
> se accede por `IP:puerto`, este es buen momento para darle también un subdominio
> (`agente.tudominio.com`) con su propio `proxy_pass` al puerto del agente.

---

## 6. HTTPS gratis (Certbot)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d tudominio.com -d www.tudominio.com
```

Renovación automática incluida. ¡Listo: `https://tudominio.com`! 🎉

---

## 7. Actualizar el sitio

```bash
cd /opt/portfolio
git pull
docker compose build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
docker compose up -d
```

---

## 8. Respaldo de la base de datos

Todo (reseñas y proyectos) vive en un solo archivo:

```bash
mkdir -p /opt/backups
cp /opt/portfolio/data/prod.db /opt/backups/prod-$(date +%F).db
```

Automático con cron (diario, 3 a.m.):

```bash
crontab -e
0 3 * * * cp /opt/portfolio/data/prod.db /opt/backups/prod-$(date +\%F).db
```

---

## Comprobación rápida de que no chocas con el agente

```bash
docker ps                       # lista contenedores y sus puertos
sudo lsof -i -P -n | grep LISTEN # qué escucha en cada puerto
free -h                         # RAM disponible (tienes 4 GB+, sobra)
```

Si el agente y el portafolio usan puertos distintos (y lo hacen: el portafolio
es el `3000`), conviven sin problema. Nginx es quien decide qué dominio va a cuál.
