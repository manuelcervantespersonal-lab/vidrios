import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image, width: 1200, height: 900, alt: product.name }],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <>
      <PageBanner title={product.name} subtitle={product.shortDescription} image={product.image} compact />

      <section className="section-py bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <Link
            href="/productos"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-heading text-sm uppercase tracking-wide text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal className="space-y-4 font-body text-base normal-case tracking-normal text-muted-foreground">
                {product.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.gallery.slice(1).map((image, i) => (
                  <Reveal
                    key={image + i}
                    delay={i * 0.1}
                    className="relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} — referencia ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-90"
                    />
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15} className="mt-10">
                <h2 className="font-heading text-sm uppercase tracking-widest text-foreground">
                  Aplicaciones
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-center gap-2 border border-border px-3 py-1.5 text-sm text-foreground"
                    >
                      <Check className="h-3.5 w-3.5 text-accent" />
                      {app}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <aside className="border border-border bg-secondary p-8">
                <h2 className="font-heading text-sm uppercase tracking-widest text-foreground">
                  Especificaciones
                </h2>
                <dl className="mt-6 space-y-5 text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="font-medium text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <Button asChild size="lg" className="mt-8 w-full">
                  <Link href="/contacto">Solicitar cotización</Link>
                </Button>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
