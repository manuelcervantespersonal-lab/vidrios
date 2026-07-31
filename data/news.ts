/**
 * Placeholder editorial content. Structured so it can be swapped
 * for a CMS-backed fetch (e.g. Sanity, Contentful) without changing
 * the components that consume it — just replace this array with
 * an async fetch that returns the same shape.
 */
export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const news: NewsItem[] = [
  {
    slug: "certificacion-iso-9001",
    title: "Cristalum renueva certificación ISO 9001:2015",
    excerpt:
      "Reafirmamos nuestro compromiso con la calidad en cada etapa del proceso de fabricación e instalación.",
    date: "2026-05-12",
    image: "/images/news/news-01.jpg",
  },
  {
    slug: "nueva-planta-monterrey",
    title: "Ampliación de planta de fabricación en Monterrey",
    excerpt:
      "Incrementamos un 40% nuestra capacidad de producción de sistemas de muro cortina para atender la creciente demanda.",
    date: "2026-03-02",
    image: "/images/news/news-02.jpg",
  },
  {
    slug: "premio-innovacion-fachadas",
    title: "Reconocimiento a la innovación en fachadas de alto desempeño",
    excerpt:
      "Nuestro proyecto de la Terminal Internacional Norte fue reconocido por su solución térmica y estructural.",
    date: "2025-11-20",
    image: "/images/news/news-03.jpg",
  },
];
