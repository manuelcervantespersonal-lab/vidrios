export interface Service {
  slug: string;
  anchor: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string[];
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "diseno-e-ingenieria",
    anchor: "1",
    number: "01",
    title: "Diseño e Ingeniería",
    shortDescription:
      "Desarrollo técnico y estructural de fachadas y sistemas de vidrio a la medida de cada proyecto.",
    description: [
      "Nuestro equipo de ingeniería trabaja de la mano con arquitectos y despachos de diseño desde las etapas conceptuales del proyecto, garantizando viabilidad estructural, térmica y presupuestal antes de iniciar la fabricación.",
      "Realizamos modelado 3D, memorias de cálculo, análisis de cargas de viento y sismo, y pruebas de laboratorio certificadas para asegurar que cada sistema cumple con las normativas locales e internacionales.",
    ],
    image: "/images/services/service-diseno.jpg",
    features: [
      "Modelado BIM y planos de taller",
      "Memorias de cálculo estructural",
      "Pruebas de desempeño en laboratorio certificado",
      "Análisis térmico y acústico",
    ],
  },
  {
    slug: "fabricacion",
    anchor: "2",
    number: "02",
    title: "Fabricación",
    shortDescription:
      "Producción en plantas propias con control de calidad en cada etapa del proceso.",
    description: [
      "Contamos con plantas de fabricación equipadas con maquinaria de control numérico para el corte, maquinado y ensamble de perfiles de aluminio, así como líneas de templado, laminado y doble acristalamiento para vidrio.",
      "Cada lote de producción pasa por un proceso de control de calidad documentado, con trazabilidad completa desde la materia prima hasta el producto terminado.",
    ],
    image: "/images/services/service-fabricacion.jpg",
    features: [
      "Corte y maquinado CNC de aluminio",
      "Templado, laminado y DVH de vidrio",
      "Control de calidad por lote",
      "Capacidad para grandes volúmenes",
    ],
  },
  {
    slug: "instalacion",
    anchor: "3",
    number: "03",
    title: "Instalación",
    shortDescription:
      "Montaje en obra con cuadrillas propias certificadas y supervisión permanente.",
    description: [
      "Nuestras cuadrillas de instalación están certificadas en trabajos en altura y manejo de estructuras de vidrio de gran formato, cumpliendo con los más altos estándares de seguridad en obra.",
      "Un residente de obra acompaña cada proyecto desde el izaje hasta la entrega final, coordinando con la constructora y demás gremios para mantener los tiempos de ejecución.",
    ],
    image: "/images/services/service-instalacion.jpg",
    features: [
      "Cuadrillas certificadas en trabajo en altura",
      "Equipo propio de izaje y montaje",
      "Residente de obra dedicado",
      "Protocolos de seguridad NOM e internacionales",
    ],
  },
  {
    slug: "mantenimiento",
    anchor: "4",
    number: "04",
    title: "Mantenimiento y Postventa",
    shortDescription:
      "Programas de mantenimiento preventivo y correctivo para preservar el desempeño de la fachada.",
    description: [
      "Ofrecemos contratos de mantenimiento preventivo que incluyen limpieza especializada, revisión de sellos, herrajes y sistemas de drenaje para prolongar la vida útil de la fachada.",
      "Nuestro equipo de postventa responde a incidencias en garantía y brinda soporte técnico durante toda la vida útil del edificio.",
    ],
    image: "/images/services/service-mantenimiento.jpg",
    features: [
      "Mantenimiento preventivo programado",
      "Atención de garantías",
      "Diagnóstico y reparación de sellos y herrajes",
      "Soporte técnico postventa",
    ],
  },
];
