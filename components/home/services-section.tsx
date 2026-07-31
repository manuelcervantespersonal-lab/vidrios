import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import { Reveal } from "@/components/motion/reveal";

export function ServicesSection() {
  return (
    <section className="section-py bg-white" id="servicios-home">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="font-heading text-sm uppercase tracking-[0.25em] text-accent">
            Lo que hacemos
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-primary md:text-5xl">
            Nuestros Servicios
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link
                href={`/servicios#${service.anchor}`}
                className="group block h-full border border-border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 transition-colors group-hover:bg-charcoal/10" />
                  <span className="absolute left-4 top-4 font-heading text-sm text-white/80">
                    {service.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm normal-case tracking-normal text-muted-foreground">
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
