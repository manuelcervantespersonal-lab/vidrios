import Image from "next/image";
import { TransitionLink as Link } from "@/components/transition/transition-link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      data-cursor-hover
      className="group flex h-full flex-col border border-white/10 bg-secondary shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-2 flex-1 font-body text-sm normal-case tracking-normal text-white/50">
          {product.shortDescription}
        </p>
        <Button asChild variant="outline" className="mt-5 w-fit text-white">
          <Link href={`/productos/${product.slug}`}>
            Ver más
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
