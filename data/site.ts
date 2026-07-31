/**
 * Global site configuration and company information.
 * Replace these values with the real client data — nothing else
 * in the codebase should need to change when content is updated.
 */

export const siteConfig = {
  name: "CRISTALUM",
  legalName: "Cristalum Fachadas y Sistemas S.A. de C.V.",
  shortDescription:
    "Fachadas, ventanería y sistemas de vidrio y aluminio de alto desempeño para proyectos de gran escala.",
  url: "https://www.cristalum.com",
  foundedYear: 1988,
  ogImage: "/images/hero/hero-facade-01.jpg",
  keywords: [
    "fachadas arquitectonicas",
    "ventanas de aluminio",
    "muro cortina",
    "sistemas de vidrio",
    "fabricacion de ventanas",
    "fachadas de vidrio",
    "curtain wall",
  ],
};

export const contactInfo = {
  phone: "+52 (81) 8123 4567",
  phoneHref: "tel:+528181234567",
  email: "contacto@cristalum.com",
  emailCareers: "talento@cristalum.com",
  address: "Av. de la Industria 4520, Parque Industrial Norte, Monterrey, N.L., México",
  // Formato de embed sin API key: sustituir por el embed real (con Place ID)
  // generado desde Google Maps > Compartir > Insertar un mapa cuando se
  // tenga la ubicación definitiva del cliente.
  mapEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Av. de la Industria 4520, Parque Industrial Norte, Monterrey, N.L., México") +
    "&output=embed",
  hours: "Lunes a viernes, 8:00 - 18:00 hrs",
};

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export const companyStats = [
  { value: 38, suffix: "+", label: "Años de experiencia" },
  { value: 420, suffix: "+", label: "Proyectos entregados" },
  { value: 65, suffix: "", label: "Ciudades atendidas" },
  { value: 900, suffix: "+", label: "Colaboradores" },
];
