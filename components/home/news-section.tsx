import Image from "next/image";
import { CalendarDays } from "lucide-react";

import { news } from "@/data/news";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function NewsSection() {
  return (
    <section className="section-py bg-section-gradient">
      <div className="container-px mx-auto max-w-7xl">
        <span className="mb-4 inline-block font-heading text-xs uppercase tracking-[0.35em] text-accent">
          Actualidad
        </span>
        <SplitHeading as="h2" className="text-display max-w-3xl text-foreground">
          ÚLTIMAS NOTICIAS
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <article
                data-cursor-hover
                className="group h-full border border-border bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm normal-case tracking-normal text-muted-foreground">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
