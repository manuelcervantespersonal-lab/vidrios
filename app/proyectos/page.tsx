import type { Metadata } from "next";
import { Suspense } from "react";

import { PageBanner } from "@/components/shared/page-banner";
import { ProjectsFilterGrid } from "@/components/projects/projects-filter-grid";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Conoce los proyectos de hotelería, transporte, salud, comercio, educación y residencial en los que hemos participado.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageBanner
        title="Proyectos"
        subtitle="Fachadas y sistemas de vidrio para los proyectos de mayor escala en México y Latinoamérica."
        image="/images/hero/hero-proyectos.jpg"
      />

      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-7xl">
          <Suspense fallback={null}>
            <ProjectsFilterGrid />
          </Suspense>
        </div>
      </section>
    </>
  );
}
