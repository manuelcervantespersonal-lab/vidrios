import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function ServicesSection() {
  return (
    <section className="section-py bg-background" id="servicios-home">
      <div className="container-px mx-auto max-w-7xl">
        <span className="mb-4 inline-block font-heading text-xs uppercase tracking-[0.35em] text-accent">
          Lo que hacemos
        </span>
        <SplitHeading as="h2" className="text-display max-w-3xl text-white">
          NUESTROS SERVICIOS
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={`/servicios#${service.anchor}`}
                data-cursor-hover
                className="group block h-full border border-white/10 bg-secondary shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/10" />
                  <span className="absolute left-4 top-4 font-heading text-sm text-white/70">
                    {service.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm normal-case tracking-normal text-white/50">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-medium uppercase tracking-wide text-accent">
                    Ver más
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
