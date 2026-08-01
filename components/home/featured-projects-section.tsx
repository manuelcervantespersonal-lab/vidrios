import { TransitionLink as Link } from "@/components/transition/transition-link";

import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { ProjectPreviewList } from "@/components/projects/project-preview-list";

export function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-py bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-heading text-xs uppercase tracking-[0.35em] text-accent">
              Nuestro trabajo
            </span>
            <SplitHeading as="h2" className="text-display mt-3 text-foreground">
              PROYECTOS DESTACADOS
            </SplitHeading>
          </div>
          <Button asChild variant="outline">
            <Link href="/proyectos">Ver todos los proyectos</Link>
          </Button>
        </Reveal>

        <div className="mt-14">
          <ProjectPreviewList projects={featured} />
        </div>
      </div>
    </section>
  );
}
