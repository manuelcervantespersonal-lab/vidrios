"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";
import { useCanRender3D } from "@/components/three/use-can-render-3d";

// WebGL doesn't exist on the server, so the Three.js canvas is client-only.
const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
});

function HeroFallbackImage() {
  return (
    <Image
      src="/images/hero/hero-facade-01.jpg"
      alt="Fachada de vidrio vista desde abajo con reflejos de cielo en un edificio corporativo de gran altura"
      fill
      priority
      className="object-cover opacity-60"
      sizes="100vw"
    />
  );
}

export function Hero() {
  const canRender3D = useCanRender3D();

  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        {canRender3D ? (
          <Suspense fallback={<HeroFallbackImage />}>
            <HeroCanvas />
          </Suspense>
        ) : (
          <HeroFallbackImage />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      <div className="container-px relative mx-auto w-full max-w-7xl">
        <span className="mb-6 inline-block border-l-2 border-accent pl-4 font-heading text-xs uppercase tracking-[0.35em] text-white/60">
          Fachadas y sistemas de vidrio
        </span>

        <SplitHeading
          as="h1"
          scrollTrigger={false}
          className="text-display max-w-5xl text-white"
        >
          CONSTRUIMOS LA PIEL DE LOS PROYECTOS MÁS AMBICIOSOS
        </SplitHeading>

        <p className="mt-8 max-w-xl font-body text-base normal-case tracking-normal text-white/60 md:text-lg">
          Diseñamos, fabricamos e instalamos ventanería, muros cortina y
          sistemas de vidrio para hoteles, aeropuertos, hospitales y casinos
          en toda Latinoamérica.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="group">
            <Link href="/servicios">
              Qué hacemos
              <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white">
            <Link href="/proyectos">Ver proyectos</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
        <span className="font-heading text-[10px] uppercase tracking-[0.35em]">
          Scroll para explorar
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
