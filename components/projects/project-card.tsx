import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-cursor-hover
      className="group block shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="font-heading text-xs uppercase tracking-[0.2em] text-accent">
            {project.category}
          </span>
          <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-white">
            {project.name}
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          <p className="mt-1 font-body text-sm normal-case tracking-normal text-white/70">
            {project.location} — {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
