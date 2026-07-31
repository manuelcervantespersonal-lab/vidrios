export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const jobs: Job[] = [
  {
    slug: "ingeniero-de-fachadas",
    title: "Ingeniero(a) de Fachadas",
    department: "Ingeniería",
    location: "Monterrey, N.L.",
    type: "Tiempo completo",
    description:
      "Responsable del diseño estructural y desarrollo de detalles constructivos para sistemas de muro cortina y ventanería en proyectos de gran escala.",
  },
  {
    slug: "supervisor-de-obra",
    title: "Supervisor(a) de Instalación en Obra",
    department: "Instalación",
    location: "Ciudad de México",
    type: "Tiempo completo",
    description:
      "Coordinación de cuadrillas de instalación en obra, control de avance y cumplimiento de protocolos de seguridad en proyectos verticales.",
  },
  {
    slug: "gerente-de-proyecto",
    title: "Gerente de Proyecto",
    department: "Operaciones",
    location: "Guadalajara, Jal.",
    type: "Tiempo completo",
    description:
      "Gestión integral de proyectos de fachada desde la etapa de ingeniería hasta la entrega final, coordinando con clientes, proveedores y equipos internos.",
  },
  {
    slug: "operador-cnc",
    title: "Operador(a) de Maquinaria CNC",
    department: "Producción",
    location: "Planta Monterrey",
    type: "Tiempo completo",
    description:
      "Operación de maquinaria de corte y maquinado de perfiles de aluminio conforme a especificaciones de planos de taller.",
  },
  {
    slug: "vendedor-tecnico",
    title: "Ejecutivo(a) de Ventas Técnicas",
    department: "Comercial",
    location: "Ciudad de México",
    type: "Tiempo completo",
    description:
      "Desarrollo de nuevos proyectos con despachos de arquitectura, constructoras y desarrolladores inmobiliarios en la región centro del país.",
  },
];
