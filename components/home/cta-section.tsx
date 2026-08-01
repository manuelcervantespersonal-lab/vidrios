import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/site";

/**
 * Deliberate saturated-color interruption between the paler sections above
 * and the footer — a full accent-blue band, not another white/pale block.
 */
export function CtaSection() {
  return (
    <section className="section-py bg-accent">
      <div className="container-px mx-auto max-w-7xl text-center">
        <Reveal>
          <span className="mb-4 inline-block font-heading text-xs uppercase tracking-[0.35em] text-white/70">
            ¿Listo para empezar?
          </span>
        </Reveal>
        <SplitHeading as="h2" className="text-display mx-auto max-w-4xl text-white">
          HABLEMOS DE TU PRÓXIMO PROYECTO
        </SplitHeading>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="group bg-white text-accent hover:bg-white/90"
          >
            <Link href="/contacto">
              Contáctanos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outlineOnDark">
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
