import type { Metadata } from "next";

import { PageBanner } from "@/components/shared/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Líneas de producto: muro cortina, ventanería de aluminio, vidrio de seguridad, domos, barandales y fachadas ventiladas.",
};

export default function ProductosPage() {
  return (
    <>
      <PageBanner
        title="Productos"
        subtitle="Líneas de producto desarrolladas para resistir las exigencias de la construcción de gran escala."
        image="/images/hero/hero-productos.jpg"
      />

      <section className="section-py bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
