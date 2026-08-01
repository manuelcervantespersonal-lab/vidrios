import { TransitionLink as Link } from "@/components/transition/transition-link";
import { MapPin, Mail, Phone } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";
import { footerNav } from "@/data/nav";
import { contactInfo, siteConfig, socialLinks } from "@/data/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
};

export function Footer() {
  return (
    <footer className="bg-background text-white/70">
      <div className="section-py border-b border-white/10">
        <div className="container-px mx-auto max-w-7xl">
          <span className="mb-4 inline-block font-heading text-xs uppercase tracking-[0.35em] text-white/40">
            Hablemos
          </span>
          <SplitHeading as="h2" className="text-display max-w-4xl text-white">
            ¿TIENES UN PROYECTO EN MENTE?
          </SplitHeading>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/contacto">Contáctanos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white">
              <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-cursor-hover
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Empresa
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.empresa.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Productos
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.productos.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
              Contacto
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={contactInfo.phoneHref} className="hover:text-accent">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <p>Diseño y desarrollo web</p>
        </div>
      </div>
    </footer>
  );
}
