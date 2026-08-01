import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para cotizar tu proyecto de fachadas, ventanería o sistemas de vidrio. Oficinas en Monterrey, N.L.",
};

export default function ContactoPage() {
  return (
    <>
      <PageBanner
        title="Contacto"
        subtitle="Cuéntanos sobre tu proyecto y un especialista técnico te contactará."
        image="/images/hero/hero-contacto.jpg"
        compact
      />

      <section className="section-py bg-background">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <SplitHeading as="h2" className="text-display-sm text-foreground">
              ENVÍANOS UN MENSAJE
            </SplitHeading>
            <p className="mt-3 font-body text-sm normal-case tracking-normal text-muted-foreground">
              Completa el formulario y te responderemos en un plazo máximo de 24 horas hábiles.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-6 border border-border bg-secondary p-8">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                    Oficinas
                  </p>
                  <p className="mt-1 text-sm text-foreground">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                    Teléfono
                  </p>
                  <a href={contactInfo.phoneHref} className="mt-1 block text-sm text-foreground hover:text-accent">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                    Correo
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-1 block text-sm text-foreground hover:text-accent"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                    Horario
                  </p>
                  <p className="mt-1 text-sm text-foreground">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 aspect-[4/3] w-full overflow-hidden border border-border">
              <iframe
                src={contactInfo.mapEmbedSrc}
                title="Ubicación de Cristalum en el mapa"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
