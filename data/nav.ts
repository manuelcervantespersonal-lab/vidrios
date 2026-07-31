export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Productos", href: "/productos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Carreras", href: "/carreras" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav = {
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Carreras", href: "/carreras" },
    { label: "Contacto", href: "/contacto" },
  ],
  productos: [
    { label: "Todos los productos", href: "/productos" },
    { label: "Muro cortina", href: "/productos/muro-cortina" },
    { label: "Ventaneria de aluminio", href: "/productos/ventaneria-aluminio" },
    { label: "Vidrio de seguridad", href: "/productos/vidrio-de-seguridad" },
  ],
  proyectos: [
    { label: "Todos los proyectos", href: "/proyectos" },
    { label: "Hospitalidad", href: "/proyectos?categoria=hospitalidad" },
    { label: "Transporte", href: "/proyectos?categoria=transporte" },
    { label: "Salud", href: "/proyectos?categoria=salud" },
  ],
};
