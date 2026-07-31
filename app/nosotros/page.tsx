import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { DecorativePattern } from "@/components/shared/decorative-pattern";
import { aboutContent } from "@/data/about";
import { companyStats } from "@/data/site";
import { Counter } from "@/components/motion/counter";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Casi cuatro décadas de trayectoria en fabricación de fachadas, ventanería y sistemas de vidrio para proyectos de gran escala.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageBanner
        title="Nosotros"
        subtitle="Casi cuatro décadas construyendo la piel de los proyectos más exigentes de Latinoamérica."
        image="/images/hero/hero-nosotros.jpg"
      />

      <section className="section-py relative overflow-hidden bg-white">
        <DecorativePattern className="-right-10 -top-10" />
        <div className="container-px relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="font-heading text-sm uppercase tracking-[0.25em] text-accent">
              Nuestra historia
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              De un taller local a un grupo de alcance nacional
            </h2>
            <div className="mt-6 space-y-4 font-body text-base normal-case tracking-normal text-muted-foreground">
              {aboutContent.history.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] w-full">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-accent/40" />
              <Image
                src="/images/about/about-office.jpg"
                alt="Instalaciones y equipo de Cristalum"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="relative object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-py bg-primary">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {companyStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center md:text-left">
                <div className="font-heading text-5xl font-semibold text-white md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 font-heading text-sm uppercase tracking-wide text-white/60">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-secondary">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal className="border border-border bg-white p-10">
            <Target className="h-8 w-8 text-accent" />
            <h3 className="mt-5 text-2xl font-semibold text-primary">Misión</h3>
            <p className="mt-4 font-body text-base normal-case tracking-normal text-muted-foreground">
              {aboutContent.mission}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="border border-border bg-white p-10">
            <Eye className="h-8 w-8 text-accent" />
            <h3 className="mt-5 text-2xl font-semibold text-primary">Visión</h3>
            <p className="mt-4 font-body text-base normal-case tracking-normal text-muted-foreground">
              {aboutContent.vision}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px mx-auto max-w-4xl">
          <Reveal className="text-center">
            <span className="font-heading text-sm uppercase tracking-[0.25em] text-accent">
              Nuestra trayectoria
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
              Línea del Tiempo
            </h2>
          </Reveal>

          <div className="relative mt-16 space-y-12 border-l border-border pl-8 md:pl-10">
            {aboutContent.timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} className="relative">
                <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent md:-left-[49px]" />
                <span className="font-heading text-2xl font-semibold text-accent">
                  {item.year}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 font-body text-sm normal-case tracking-normal text-muted-foreground">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
