# Cristalum — Sitio Corporativo

Sitio web corporativo para una empresa de fabricación de fachadas, ventanería
y sistemas de vidrio. Construido con Next.js 14 (App Router), TypeScript,
Tailwind CSS, shadcn/ui y Framer Motion.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** para todos los estilos
- **shadcn/ui** (componentes base en `components/ui`)
- **Framer Motion** para animaciones de scroll
- **lucide-react** para iconografía
- **next/image** para todas las imágenes
- **Resend** para el envío de correos del formulario de contacto

## Requisitos

- Node.js 18.18 o superior
- npm 9+

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

| Variable | Requerida | Descripción |
| --- | --- | --- |
| `RESEND_API_KEY` | Sí, para que el formulario envíe correos | API key de [resend.com](https://resend.com) |
| `CONTACT_FROM_EMAIL` | No | Remitente verificado en Resend. Si se omite, se usa `onboarding@resend.dev` (solo válido para pruebas, no para producción) |

Sin `RESEND_API_KEY`, la ruta `/api/contact` responde con un error controlado
(no rompe el build ni el resto del sitio).

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
app/                    Rutas (App Router)
  page.tsx              Home
  nosotros/              /nosotros
  proyectos/             /proyectos y /proyectos/[slug]
  productos/             /productos y /productos/[slug]
  servicios/             /servicios (con anclas #1–#4)
  carreras/              /carreras
  contacto/              /contacto
  api/contact/route.ts   Endpoint del formulario de contacto (Resend)
  sitemap.ts             Genera /sitemap.xml
  robots.ts              Genera /robots.txt

components/
  ui/                    Componentes base shadcn/ui (Button, Card, Input...)
  layout/                Header, Footer, Logo
  home/                  Secciones de la página de inicio
  projects/ products/ contact/   Componentes específicos por sección
  motion/                Reveal (fade-in + slide-up) y Counter (contador animado)
  shared/                PageBanner, patrón decorativo, iconos de redes sociales

data/                    **Todo el contenido editable vive aquí**
  site.ts                Nombre de empresa, contacto, stats, redes sociales
  nav.ts                 Enlaces de navegación (header y footer)
  services.ts            Los 4 servicios (home + /servicios)
  projects.ts             Proyectos (home + /proyectos + /proyectos/[slug])
  products.ts             Productos (/productos + /productos/[slug])
  jobs.ts                 Vacantes (/carreras)
  news.ts                 Noticias (placeholder, listo para CMS)
  about.ts                Historia, misión, visión, línea de tiempo

public/images/           Imágenes estáticas servidas por next/image
scripts/generate-placeholders.mjs   Genera las imágenes placeholder (ver abajo)
```

## Reemplazar contenido por el del cliente

1. **Textos y datos**: edita los archivos en `/data/*.ts`. Los componentes no
   necesitan tocarse — todos leen de estos archivos.
2. **Imágenes**: reemplaza los archivos en `public/images/**` conservando el
   mismo nombre y ruta (o actualiza la ruta en el archivo de datos
   correspondiente). Usa fotografía de gran formato y, de preferencia, la
   misma relación de aspecto que la imagen que reemplazas.
3. **Logo**: el logotipo actual (`components/layout/logo.tsx`) es un wordmark
   tipográfico. Sustitúyelo por el logo real del cliente (SVG recomendado)
   cuando esté disponible.
4. **Colores**: la paleta y el color de acento se definen como variables CSS
   en `app/globals.css` (`--accent`, `--primary`, `--charcoal`, etc.) y se
   consumen desde `tailwind.config.ts`.

### Sobre las imágenes placeholder

Todas las imágenes en `public/images/**` se generaron localmente
(`scripts/generate-placeholders.mjs`, usando `sharp`) para que el proyecto no
dependa de servicios externos de fotografía de stock. Son gradientes
abstractos que simulan paneles de fachada/vidrio — **deben reemplazarse por
fotografía real del cliente antes de salir a producción**. Para regenerarlas
o ajustar la paleta:

```bash
node scripts/generate-placeholders.mjs
```

## SEO

- Metadata (`title`, `description`, Open Graph) definida por página vía la
  export `metadata` de Next.js, usando los datos de `data/site.ts`.
- `app/sitemap.ts` y `app/robots.ts` generan `/sitemap.xml` y `/robots.txt`
  automáticamente a partir de las rutas y del contenido de `data/projects.ts`
  y `data/products.ts`.
- Todas las imágenes usan `next/image` (optimización y lazy loading
  automáticos).

## Deploy en Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. Configura las variables de entorno (`RESEND_API_KEY`,
   `CONTACT_FROM_EMAIL`) en **Project Settings → Environment Variables**.
4. Verifica el dominio de envío en Resend antes de usar
   `CONTACT_FROM_EMAIL` en producción (de lo contrario los correos pueden
   marcarse como spam o ser rechazados).
5. Deploy. Vercel detecta Next.js automáticamente (no requiere configuración
   adicional).

## Notas técnicas

- El sitio no usa CSS-in-JS; todos los estilos son Tailwind + variables CSS.
- El formulario de contacto valida en servidor (`app/api/contact/route.ts`)
  y en cliente (atributos HTML + mensajes de error).
- El grid de proyectos (`/proyectos`) es filtrable por categoría vía un
  componente cliente que sincroniza el filtro activo con el parámetro de URL
  `?categoria=`.
- `lucide-react` no incluye logos de marcas (política de marca registrada);
  los íconos de redes sociales del footer son SVG propios en
  `components/shared/social-icons.tsx`.
