"use client";

import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ChevronDown } from "lucide-react";
import type { RefObject } from "react";

import { Button } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";
import { useCanRender3D } from "@/components/three/use-can-render-3d";

interface HeroProps {
  sectionRef: RefObject<HTMLElement>;
}

/**
 * Text-only layer — the glass panels live in the single persistent
 * <HomeScene> Canvas mounted alongside this section (see home-content.tsx),
 * not inside Hero itself. On mobile/low-power devices that Canvas doesn't
 * render at all, so Hero shows its own static photo instead.
 */
export function Hero({ sectionRef }: HeroProps) {
  const canRender3D = useCanRender3D();

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-transparent"
    >
      {!canRender3D && (
        <Image
          src="/images/hero/hero-facade-01.jpg"
          alt="Fachada de vidrio vista desde abajo con reflejos de cielo en un edificio corporativo de gran altura"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {!canRender3D && (
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
      )}

      <div className="container-px relative mx-auto w-full max-w-7xl">
        <span className="mb-6 inline-block border-l-2 border-accent pl-4 font-heading text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Fachadas y sistemas de vidrio
        </span>

        <SplitHeading
          as="h1"
          scrollTrigger={false}
          className="text-display max-w-4xl text-foreground"
        >
          CONSTRUIMOS TU FACHADA
        </SplitHeading>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="group">
            <Link href="/servicios">
              Qué hacemos
              <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/proyectos">Ver proyectos</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
        <span className="font-heading text-[10px] uppercase tracking-[0.35em]">
          Scroll para explorar
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
