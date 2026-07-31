export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string[];
  image: string;
  gallery: string[];
  applications: string[];
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    slug: "muro-cortina",
    name: "Muro Cortina",
    shortDescription:
      "Sistemas de fachada ligera unitizada y stick para edificios de gran altura.",
    description: [
      "Nuestros sistemas de muro cortina se diseñan a la medida de cada proyecto, con opciones unitizadas para acelerar el montaje en obra o sistemas stick para proyectos con geometrías especiales.",
      "Compatibles con una amplia gama de vidrios de control solar, paneles de aluminio compuesto y acabados arquitectónicos.",
    ],
    image: "/images/products/prod-muro-cortina.jpg",
    gallery: [
      "/images/products/prod-muro-cortina.jpg",
      "/images/projects/proj-corporativo-01.jpg",
      "/images/projects/proj-aeropuerto-02.jpg",
    ],
    applications: ["Torres corporativas", "Aeropuertos", "Hoteles", "Hospitales"],
    specs: [
      { label: "Sistema", value: "Unitizado / Stick" },
      { label: "Espesor de vidrio", value: "6 mm a 12 mm (laminado o DVH)" },
      { label: "Resistencia al viento", value: "Hasta 200 km/h certificado" },
      { label: "Acabado de aluminio", value: "Anodizado o pintura electrostática" },
    ],
  },
  {
    slug: "ventaneria-aluminio",
    name: "Ventanería de Aluminio",
    shortDescription:
      "Líneas de ventanas corredizas, abatibles, oscilobatientes y proyectantes de alto desempeño.",
    description: [
      "Fabricamos ventanería de aluminio en múltiples líneas de perfil, desde soluciones económicas hasta sistemas de alto desempeño térmico y acústico con rotura de puente térmico.",
      "Todas nuestras líneas cumplen con pruebas de infiltración de aire, resistencia al agua y desempeño estructural conforme a normativa vigente.",
    ],
    image: "/images/products/prod-ventaneria.jpg",
    gallery: [
      "/images/products/prod-ventaneria.jpg",
      "/images/projects/proj-residencial-01.jpg",
      "/images/projects/proj-educativo-02.jpg",
    ],
    applications: ["Residencial", "Educativo", "Oficinas", "Hospitalidad"],
    specs: [
      { label: "Tipos", value: "Corrediza, abatible, oscilobatiente, proyectante" },
      { label: "Rotura de puente térmico", value: "Disponible en todas las líneas premium" },
      { label: "Vidriado", value: "Sencillo, laminado o doble acristalamiento" },
      { label: "Acabado", value: "Anodizado, pintura electrostática o madera símil" },
    ],
  },
  {
    slug: "vidrio-de-seguridad",
    name: "Vidrio de Seguridad",
    shortDescription:
      "Vidrio templado, laminado y blindado para aplicaciones que requieren máxima protección.",
    description: [
      "Procesamos vidrio templado y laminado en nuestras propias plantas, con control de calidad en cada lote y certificaciones de seguridad reconocidas internacionalmente.",
      "Ofrecemos también soluciones de vidrio antibala y resistente a impacto para proyectos con requerimientos especiales de seguridad.",
    ],
    image: "/images/products/prod-vidrio-seguridad.jpg",
    gallery: [
      "/images/products/prod-vidrio-seguridad.jpg",
      "/images/projects/proj-hospital-02.jpg",
      "/images/projects/proj-hotel-03.jpg",
    ],
    applications: ["Hospitales", "Bancos", "Hotelería", "Residencial de lujo"],
    specs: [
      { label: "Tipos", value: "Templado, laminado, blindado" },
      { label: "Espesores", value: "4 mm a 20+ mm laminado" },
      { label: "Normativa", value: "NOM y estándares internacionales de impacto" },
      { label: "Opciones", value: "Acústico, control solar, serigrafiado" },
    ],
  },
  {
    slug: "domos-y-tragaluces",
    name: "Domos y Tragaluces",
    shortDescription:
      "Estructuras de vidrio y aluminio para iluminación natural en grandes claros.",
    description: [
      "Diseñamos y fabricamos domos estructurales y tragaluces para atrios, centros comerciales y estaciones de transporte, maximizando la entrada de luz natural sin comprometer el desempeño térmico.",
      "Cada domo se calcula estructuralmente para las cargas vivas de la región, incluyendo granizo, viento y mantenimiento.",
    ],
    image: "/images/products/prod-domos.jpg",
    gallery: [
      "/images/products/prod-domos.jpg",
      "/images/projects/proj-comercial-01.jpg",
      "/images/projects/proj-transporte-02.jpg",
    ],
    applications: ["Centros comerciales", "Estaciones de transporte", "Atrios corporativos"],
    specs: [
      { label: "Estructura", value: "Acero o aluminio estructural" },
      { label: "Vidriado", value: "Laminado de seguridad, curvo o plano" },
      { label: "Cargas", value: "Diseño según viento, granizo y mantenimiento" },
      { label: "Drenaje", value: "Sistema integrado de canaletas ocultas" },
    ],
  },
  {
    slug: "barandales-de-vidrio",
    name: "Barandales de Vidrio",
    shortDescription:
      "Sistemas de barandal estructural sin marco para balcones, escaleras y terrazas.",
    description: [
      "Nuestros sistemas de barandal de vidrio estructural permiten vistas despejadas en balcones y terrazas, cumpliendo con las normas de seguridad para barreras de protección.",
      "Disponibles en configuraciones empotradas, con perfil de aluminio o con herrajes puntuales de acero inoxidable.",
    ],
    image: "/images/products/prod-barandales.jpg",
    gallery: [
      "/images/products/prod-barandales.jpg",
      "/images/projects/proj-hotel-02.jpg",
      "/images/projects/proj-residencial-02.jpg",
    ],
    applications: ["Hotelería", "Residencial vertical", "Oficinas corporativas"],
    specs: [
      { label: "Vidrio", value: "Laminado de seguridad, 2 o 3 capas" },
      { label: "Fijación", value: "Empotrado, perfil de aluminio o herraje puntual" },
      { label: "Altura", value: "A partir de 90 cm según normativa" },
      { label: "Acabados", value: "Vidrio claro, extra claro o de baja reflexión" },
    ],
  },
  {
    slug: "fachadas-ventiladas",
    name: "Fachadas Ventiladas",
    shortDescription:
      "Sistemas de recubrimiento exterior con cámara de aire para eficiencia energética.",
    description: [
      "Las fachadas ventiladas combinan un recubrimiento exterior de piedra, cerámica o aluminio compuesto con una cámara de aire que mejora el desempeño térmico y protege la envolvente del edificio.",
      "El sistema de subestructura se ancla de forma independiente al muro, permitiendo tolerancias constructivas y facilitando el mantenimiento a largo plazo.",
    ],
    image: "/images/products/prod-fachada-ventilada.jpg",
    gallery: [
      "/images/products/prod-fachada-ventilada.jpg",
      "/images/projects/proj-corporativo-02.jpg",
      "/images/projects/proj-hospital-01.jpg",
    ],
    applications: ["Torres corporativas", "Hospitales", "Hotelería"],
    specs: [
      { label: "Subestructura", value: "Aluminio o acero inoxidable" },
      { label: "Recubrimiento", value: "Piedra, cerámica, ACM" },
      { label: "Cámara de aire", value: "Ventilada, mejora aislamiento térmico" },
      { label: "Mantenimiento", value: "Paneles desmontables individualmente" },
    ],
  },
];
