export type ProjectCategory =
  | "transporte"
  | "comercial"
  | "hospitalidad"
  | "educativo"
  | "residencial"
  | "salud";

export const projectCategories: { value: ProjectCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "transporte", label: "Transporte" },
  { value: "comercial", label: "Comercial" },
  { value: "hospitalidad", label: "Hospitalidad" },
  { value: "educativo", label: "Educativo" },
  { value: "residencial", label: "Residencial" },
  { value: "salud", label: "Salud" },
];

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  location: string;
  year: number;
  client: string;
  area: string;
  cover: string;
  gallery: string[];
  summary: string;
  description: string[];
  scope: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "terminal-internacional-norte",
    name: "Terminal Internacional Norte",
    category: "transporte",
    location: "Monterrey, N.L.",
    year: 2023,
    client: "Grupo Aeroportuario del Norte",
    area: "42,000 m² de fachada",
    cover: "/images/projects/proj-aeropuerto-01.jpg",
    gallery: [
      "/images/projects/proj-aeropuerto-01.jpg",
      "/images/projects/proj-aeropuerto-02.jpg",
      "/images/projects/proj-aeropuerto-03.jpg",
    ],
    summary:
      "Muro cortina estructural de gran formato para la nueva terminal internacional, diseñado para resistir cargas de viento extremas.",
    description: [
      "El proyecto de la Terminal Internacional Norte representó uno de los retos de ingeniería más importantes de la compañía, con un muro cortina continuo de doble altura que envuelve la fachada principal de llegadas y salidas.",
      "Se desarrollaron paneles unitizados de gran formato con vidrio de control solar de baja emisividad, reduciendo la carga térmica del edificio sin sacrificar la transparencia buscada por el despacho de arquitectura.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
    featured: true,
  },
  {
    slug: "hotel-marbella-bay",
    name: "Hotel Marbella Bay",
    category: "hospitalidad",
    location: "Puerto Vallarta, Jal.",
    year: 2022,
    client: "Grupo Hotelero Marbella",
    area: "18,500 m² de fachada",
    cover: "/images/projects/proj-hotel-01.jpg",
    gallery: [
      "/images/projects/proj-hotel-01.jpg",
      "/images/projects/proj-hotel-02.jpg",
      "/images/projects/proj-hotel-03.jpg",
    ],
    summary:
      "Fachada de vidrio templado y laminado resistente a ambiente costero para torre hotelera de 32 niveles frente al mar.",
    description: [
      "El proyecto exigió el desarrollo de un sistema de fachada resistente a la corrosión por ambiente salino, con herrajes de acero inoxidable grado marino y vidrio laminado de seguridad en todas las elevaciones expuestas al oleaje.",
      "Se integraron balcones con barandales estructurales de vidrio sin marco, maximizando la vista al mar desde cada habitación.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación", "Mantenimiento"],
    featured: true,
  },
  {
    slug: "hospital-santa-fe",
    name: "Hospital Santa Fe",
    category: "salud",
    location: "Ciudad de México",
    year: 2021,
    client: "Grupo Médico Santa Fe",
    area: "9,800 m² de fachada",
    cover: "/images/projects/proj-hospital-01.jpg",
    gallery: [
      "/images/projects/proj-hospital-01.jpg",
      "/images/projects/proj-hospital-02.jpg",
      "/images/projects/proj-hospital-03.jpg",
    ],
    summary:
      "Sistema de ventanería hermética y vidrio de control acústico para un hospital de especialidades de alta complejidad.",
    description: [
      "El diseño de fachada priorizó el aislamiento acústico y la hermeticidad, condiciones críticas para las áreas de hospitalización y quirófanos del hospital.",
      "Se utilizó vidrio laminado acústico en combinación con perfiles de aluminio de rotura de puente térmico, cumpliendo con los estrictos protocolos de infección y climatización del sector salud.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
    featured: true,
  },
  {
    slug: "casino-gran-royale",
    name: "Casino Gran Royale",
    category: "hospitalidad",
    location: "Cancún, Q.R.",
    year: 2023,
    client: "Entretenimiento Royale",
    area: "12,300 m² de fachada",
    cover: "/images/projects/proj-casino-01.jpg",
    gallery: [
      "/images/projects/proj-casino-01.jpg",
      "/images/projects/proj-casino-02.jpg",
      "/images/projects/proj-casino-03.jpg",
    ],
    summary:
      "Fachada escenográfica de vidrio serigrafiado y estructura de aluminio a la vista para complejo de entretenimiento.",
    description: [
      "El complejo de entretenimiento requería una fachada con fuerte identidad visual nocturna, por lo que se desarrolló un sistema de vidrio serigrafiado con retroiluminación integrada y estructura de aluminio anodizado a la vista.",
      "El proyecto se ejecutó en dos frentes de obra simultáneos para cumplir con la fecha de apertura comprometida por el cliente.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
  },
  {
    slug: "torre-corporativa-altavista",
    name: "Torre Corporativa Altavista",
    category: "comercial",
    location: "Guadalajara, Jal.",
    year: 2020,
    client: "Desarrolladora Altavista",
    area: "27,600 m² de fachada",
    cover: "/images/projects/proj-corporativo-01.jpg",
    gallery: [
      "/images/projects/proj-corporativo-01.jpg",
      "/images/projects/proj-corporativo-02.jpg",
      "/images/projects/proj-corporativo-03.jpg",
    ],
    summary:
      "Muro cortina unitizado de alta eficiencia energética para torre corporativa clase A.",
    description: [
      "La torre Altavista buscaba la certificación LEED Gold, por lo que el sistema de fachada se diseñó con vidrio de triple plata y perfiles con rotura de puente térmico reforzada.",
      "El proceso constructivo unitizado permitió reducir significativamente los tiempos de montaje en obra respecto a un sistema convencional stick.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación", "Mantenimiento"],
  },
  {
    slug: "centro-comercial-paseo-real",
    name: "Centro Comercial Paseo Real",
    category: "comercial",
    location: "Querétaro, Qro.",
    year: 2019,
    client: "Fibra Paseo Real",
    area: "15,200 m² de fachada",
    cover: "/images/projects/proj-comercial-01.jpg",
    gallery: [
      "/images/projects/proj-comercial-01.jpg",
      "/images/projects/proj-comercial-02.jpg",
      "/images/projects/proj-comercial-03.jpg",
    ],
    summary:
      "Domo estructural de vidrio y fachadas de acceso para desarrollo comercial de usos mixtos.",
    description: [
      "El proyecto incluyó un domo estructural de vidrio laminado sobre estructura de acero, así como las fachadas de acceso principal con puertas automáticas de gran formato.",
      "Se coordinó estrechamente con la cuadrilla de estructura metálica para garantizar tolerancias milimétricas en el anclaje del vidrio.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
  },
  {
    slug: "universidad-tecnologica-bajio",
    name: "Universidad Tecnológica del Bajío",
    category: "educativo",
    location: "León, Gto.",
    year: 2022,
    client: "Universidad Tecnológica del Bajío",
    area: "8,400 m² de fachada",
    cover: "/images/projects/proj-educativo-01.jpg",
    gallery: [
      "/images/projects/proj-educativo-01.jpg",
      "/images/projects/proj-educativo-02.jpg",
      "/images/projects/proj-educativo-03.jpg",
    ],
    summary:
      "Sistemas de ventanería de alto rendimiento térmico para el nuevo campus de ingenierías.",
    description: [
      "El campus requería un balance entre iluminación natural para las aulas y control solar para reducir el consumo de aire acondicionado en clima cálido.",
      "Se instalaron parasoles de aluminio integrados al sistema de ventanería, reduciendo la ganancia solar directa en fachadas oriente y poniente.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
  },
  {
    slug: "residencial-las-lomas",
    name: "Residencial Las Lomas",
    category: "residencial",
    location: "Ciudad de México",
    year: 2021,
    client: "Inmobiliaria Las Lomas",
    area: "6,100 m² de fachada",
    cover: "/images/projects/proj-residencial-01.jpg",
    gallery: [
      "/images/projects/proj-residencial-01.jpg",
      "/images/projects/proj-residencial-02.jpg",
      "/images/projects/proj-residencial-03.jpg",
    ],
    summary:
      "Ventanería de aluminio de lujo y sistemas de puertas plegables para desarrollo residencial vertical.",
    description: [
      "El desarrollo residencial de alta gama solicitó puertas plegables de piso a techo para maximizar la integración entre terrazas e interiores en cada unidad.",
      "Se fabricaron perfiles de aluminio con acabado anodizado premium a solicitud del despacho de interiorismo del proyecto.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
  },
  {
    slug: "terminal-de-cruceros-costa-azul",
    name: "Terminal de Cruceros Costa Azul",
    category: "transporte",
    location: "Ensenada, B.C.",
    year: 2020,
    client: "Administración Portuaria Costa Azul",
    area: "11,700 m² de fachada",
    cover: "/images/projects/proj-transporte-01.jpg",
    gallery: [
      "/images/projects/proj-transporte-01.jpg",
      "/images/projects/proj-transporte-02.jpg",
      "/images/projects/proj-transporte-03.jpg",
    ],
    summary:
      "Fachada curva de vidrio termoformado para terminal marítima de pasajeros.",
    description: [
      "La geometría curva de la terminal exigió el desarrollo de vidrio termoformado a la medida, fabricado bajo especificación con tolerancias estrictas de radio y planicidad.",
      "El sistema de anclaje se diseñó para resistir la alta exposición salina característica del entorno portuario.",
    ],
    scope: ["Diseño e ingeniería", "Fabricación", "Instalación"],
  },
];
