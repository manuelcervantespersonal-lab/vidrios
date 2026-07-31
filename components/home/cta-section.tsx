import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/site";

export function CtaSection() {
  return (
    <section className="bg-accent">
      <div className="container-px mx-auto flex max-w-7xl flex-col items-center gap-8 py-16 text-center md:flex-row md:justify-between md:text-left">
        <Reveal>
          <h2 className="text-2xl font-semibold text-white md:text-4xl">
            ¿Tienes un proyecto en puerta?
          </h2>
          <p className="mt-3 max-w-xl font-body text-base normal-case tracking-normal text-white/85">
            Escríbenos y un especialista de {""}
            <span className="font-medium">Cristalum</span> te contactará para
            revisar los requerimientos técnicos de tu proyecto.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="dark">
            <Link href="/contacto">Contáctanos</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white">
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
