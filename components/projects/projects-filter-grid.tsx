"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";

export function ProjectsFilterGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("categoria") as ProjectCategory | null) ?? "todos";
  const [active, setActive] = useState<ProjectCategory | "todos">(
    projectCategories.some((c) => c.value === initialCategory) ? initialCategory : "todos"
  );

  const filtered = useMemo(
    () => (active === "todos" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  function handleSelect(value: ProjectCategory | "todos") {
    setActive(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "todos") {
      params.delete("categoria");
    } else {
      params.set("categoria", value);
    }
    router.replace(params.toString() ? `/proyectos?${params.toString()}` : "/proyectos", {
      scroll: false,
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por categoría">
        {projectCategories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => handleSelect(cat.value)}
            aria-pressed={active === cat.value}
            data-cursor-hover
            className={cn(
              "border px-5 py-2 font-heading text-sm uppercase tracking-wide transition-colors",
              active === cat.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No hay proyectos en esta categoría por el momento.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
