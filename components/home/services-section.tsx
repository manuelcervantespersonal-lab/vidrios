"use client";

import type { RefObject } from "react";

import { services } from "@/data/services";
import { SplitHeading } from "@/components/motion/split-heading";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { useCanRender3D } from "@/components/three/use-can-render-3d";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  sectionRef: RefObject<HTMLElement>;
}

/**
 * Text layer only — the 4 service names appear as 3D panels+labels in the
 * persistent <HomeScene> Canvas behind this section (see home-content.tsx).
 * The links below are real, accessible HTML (WebGL text is invisible to
 * screen readers), kept deliberately minimal so the 3D carries the weight.
 *
 * The tall min-height only applies when the 3D scene is actually rendering
 * (it gives the scroll-scrubbed animation room to play) — on mobile/
 * low-power devices, where there's no 3D behind it, that same height would
 * just be an empty gap, so it collapses to a normal section there.
 */
export function ServicesSection({ sectionRef }: ServicesSectionProps) {
  const canRender3D = useCanRender3D();

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex w-full flex-col bg-transparent py-20",
        canRender3D ? "min-h-[160vh] justify-between" : "justify-start gap-10"
      )}
      id="servicios-home"
    >
      <div className="container-px mx-auto max-w-7xl">
        <span className="mb-4 inline-block font-heading text-xs uppercase tracking-[0.35em] text-accent">
          Lo que hacemos
        </span>
        <SplitHeading as="h2" className="text-display max-w-2xl text-foreground">
          NUESTROS SERVICIOS
        </SplitHeading>
      </div>

      <div className="container-px mx-auto w-full max-w-7xl">
        <nav aria-label="Servicios" className="flex flex-wrap gap-x-10 gap-y-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios#${service.anchor}`}
              data-cursor-hover
              className="font-heading text-sm uppercase tracking-wide text-muted-foreground transition-colors hover:text-accent"
            >
              {service.number} — {service.title}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
