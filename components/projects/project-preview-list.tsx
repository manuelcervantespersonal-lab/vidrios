"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ArrowUpRight } from "lucide-react";

import { gsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";

/**
 * List of project names (not a grid). Hovering a row floats that project's
 * cover image next to the cursor — the classic portfolio-site pattern this
 * redesign is going for. Degrades gracefully on touch: the preview panel is
 * hidden below md, but the list itself is fully tappable/navigable.
 */
export function ProjectPreviewList({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    quickX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" });
    quickY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" });
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    quickX.current?.(e.clientX + 28);
    quickY.current?.(e.clientY - 150);
  }

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <ul className="divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/proyectos/${project.slug}`}
              data-cursor-hover
              className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between"
              onMouseEnter={() => setActive(project)}
              onMouseLeave={() => setActive(null)}
            >
              <div>
                <span className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
                  {project.category}
                </span>
                <h3 className="mt-2 text-display-sm text-foreground transition-colors duration-300 group-hover:text-accent">
                  {project.name}
                </h3>
              </div>
              <span className="flex items-center gap-3 font-body text-sm normal-case tracking-normal text-muted-foreground">
                {project.location} — {project.year}
                <ArrowUpRight className="h-6 w-6 shrink-0 text-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-64 w-48 overflow-hidden border border-border bg-card opacity-0 shadow-glow-lg transition-opacity duration-300 md:block"
        style={{ opacity: active ? 1 : 0 }}
      >
        {projects.map((project) => (
          <Image
            key={project.slug}
            src={project.cover}
            alt=""
            fill
            sizes="192px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: active?.slug === project.slug ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
