import type { Metadata } from "next";
import { Briefcase, MapPin, Clock } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { jobs } from "@/data/jobs";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Carreras",
  description:
    "Vacantes actuales en ingeniería, producción, instalación y comercial en Cristalum Fachadas y Sistemas.",
};

export default function CarrerasPage() {
  return (
    <>
      <PageBanner
        title="Carreras"
        subtitle="Súmate a un equipo que construye la piel de los proyectos más importantes del país."
        image="/images/hero/hero-carreras.jpg"
      />

      <section className="section-py bg-background">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal className="max-w-2xl">
            <span className="font-heading text-xs uppercase tracking-[0.35em] text-accent">
              Vacantes
            </span>
          </Reveal>
          <SplitHeading as="h2" className="text-display max-w-2xl text-foreground">
            POSICIONES ABIERTAS
          </SplitHeading>

          <div className="mt-14 space-y-4">
            {jobs.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.06}>
                <article
                  data-cursor-hover
                  className="flex flex-col gap-4 border border-border bg-secondary p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <p className="mt-1.5 font-body text-sm normal-case tracking-normal text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-accent" />
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${contactInfo.emailCareers}?subject=${encodeURIComponent(
                      "Postulación: " + job.title
                    )}`}
                    data-cursor-hover
                    className="shrink-0 border border-border px-5 py-2.5 text-center font-heading text-sm uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:bg-accent"
                  >
                    Postularme
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={0.1}
            className="mt-12 border border-dashed border-border p-8 text-center"
          >
            <p className="font-body text-sm normal-case tracking-normal text-muted-foreground">
              ¿No encuentras una vacante para tu perfil? Envíanos tu CV a{" "}
              <a href={`mailto:${contactInfo.emailCareers}`} className="font-medium text-accent">
                {contactInfo.emailCareers}
              </a>{" "}
              y lo tomaremos en cuenta para futuras posiciones.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
