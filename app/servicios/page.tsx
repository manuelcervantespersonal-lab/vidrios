import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
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
          className={`section-py scroll-mt-24 ${index % 2 === 1 ? "bg-secondary" : "bg-white"}`}
        >
          <div className="container-px mx-auto max-w-7xl">
            <div
              className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <span className="font-heading text-6xl font-semibold text-accent/30">
                  {service.number}
                </span>
                <h2 className="mt-2 text-3xl font-semibold text-primary md:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-5 font-body text-base normal-case tracking-normal text-muted-foreground">
                  {service.shortDescription}
                </p>
                <div className="mt-4 space-y-3 font-body text-base normal-case tracking-normal text-muted-foreground">
                  {service.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-primary">
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
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-accent">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-white md:text-4xl">
            ¿Necesitas asesoría técnica para tu proyecto?
          </h2>
          <Button asChild size="lg" variant="dark">
            <Link href="/contacto">Contáctanos</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
