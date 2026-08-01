import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, MapPin, Ruler } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      images: [{ url: project.cover, width: 1400, height: 1050, alt: project.name }],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <>
      <PageBanner title={project.name} subtitle={project.summary} image={project.cover} compact />

      <section className="section-py bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <Link
            href="/proyectos"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wide text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal className="space-y-4 font-body text-base normal-case tracking-normal text-muted-foreground">
                {project.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.gallery.slice(1).map((image, i) => (
                  <Reveal
                    key={image + i}
                    delay={i * 0.1}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${project.name} — vista ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-90"
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.1}>
              <aside className="border border-border bg-secondary p-8">
                <h2 className="font-heading text-sm uppercase tracking-widest text-foreground">
                  Ficha técnica
                </h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <dt className="text-muted-foreground">Ubicación</dt>
                      <dd className="font-medium text-foreground">{project.location}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <dt className="text-muted-foreground">Año</dt>
                      <dd className="font-medium text-foreground">{project.year}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Building2 className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <dt className="text-muted-foreground">Cliente</dt>
                      <dd className="font-medium text-foreground">{project.client}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Ruler className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <dt className="text-muted-foreground">Área</dt>
                      <dd className="font-medium text-foreground">{project.area}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                    Alcance del proyecto
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.scope.map((item) => (
                      <li
                        key={item}
                        className="border border-border px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-py bg-secondary">
          <div className="container-px mx-auto max-w-7xl">
            <SplitHeading as="h2" className="text-display-sm text-foreground">
              PROYECTOS RELACIONADOS
            </SplitHeading>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
