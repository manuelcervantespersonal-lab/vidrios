import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { DecorativePattern } from "@/components/shared/decorative-pattern";
import { aboutContent } from "@/data/about";
import { siteConfig } from "@/data/site";

export function AboutSection() {
  return (
    <section className="section-py relative overflow-hidden bg-section-gradient">
      <DecorativePattern className="-left-10 -top-10" />
      <DecorativePattern className="-bottom-10 -right-10 rotate-180" />

      <div className="container-px relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="font-heading text-xs uppercase tracking-[0.35em] text-accent">
            Quiénes somos
          </span>
          <SplitHeading as="h2" className="text-display-sm mt-3 text-foreground">
            SOBRE NOSOTROS
          </SplitHeading>
          <p className="mt-6 font-body text-base normal-case tracking-normal text-muted-foreground">
            Desde {siteConfig.foundedYear}, construimos fachadas de vidrio para los proyectos
            más exigentes de Latinoamérica.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {aboutContent.values.map((value) => (
              <li key={value.title} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="font-heading text-sm uppercase tracking-wide text-foreground">
                  {value.title}
                </span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" variant="outline" className="mt-10">
            <Link href="/nosotros">Conoce nuestra historia</Link>
          </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] w-full max-w-md lg:ml-auto">
            <div className="absolute -right-4 -top-4 h-full w-full border-2 border-accent/40" />
            <Image
              src="/images/about/about-office.jpg"
              alt="Equipo de ingeniería revisando planos de fachada en planta de fabricación"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="relative object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
