import Link from "next/link";

import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-heading text-sm uppercase tracking-[0.25em] text-accent">
              Nuestro trabajo
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-5xl">
              Proyectos Destacados
            </h2>
          </div>
          <Button asChild variant="outlineDark">
            <Link href="/proyectos">Ver todos los proyectos</Link>
          </Button>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
