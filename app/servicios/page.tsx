import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { Check, ArrowUpRight } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño e ingeniería, fabricación, instalación y mantenimiento de fachadas, ventanería y sistemas de vidrio.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageBanner
        title="Servicios"
        subtitle="Acompañamos cada proyecto de principio a fin: desde la ingeniería hasta el mantenimiento postventa."
        image="/images/hero/hero-servicios.jpg"
      />

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.anchor}
          className={`section-py scroll-mt-24 ${index % 2 === 1 ? "bg-secondary" : "bg-background"}`}
        >
          <div className="container-px mx-auto max-w-7xl">
            <div
              className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <span className="font-heading text-6xl font-bold text-accent/25">
                  {service.number}
                </span>
                <SplitHeading as="h2" className="text-display-sm mt-2 text-white">
                  {service.title.toUpperCase()}
                </SplitHeading>
                <p className="mt-5 font-body text-base normal-case tracking-normal text-white/55">
                  {service.shortDescription}
                </p>
                <div className="mt-4 space-y-3 font-body text-base normal-case tracking-normal text-white/55">
                  {service.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-white">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-90"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="section-py bg-background text-center">
        <div className="container-px mx-auto flex max-w-3xl flex-col items-center gap-8">
          <SplitHeading as="h2" className="text-display text-white">
            ¿NECESITAS ASESORÍA TÉCNICA?
          </SplitHeading>
          <Button asChild size="lg" className="group">
            <Link href="/contacto">
              Contáctanos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
