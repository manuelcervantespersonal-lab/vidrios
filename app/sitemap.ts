import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/nosotros",
    "/proyectos",
    "/productos",
    "/servicios",
    "/carreras",
    "/contacto",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/proyectos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/productos/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...productRoutes];
}
