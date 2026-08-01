import { TransitionLink as Link } from "@/components/transition/transition-link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 text-center">
      <span className="font-heading text-7xl font-bold text-accent">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md font-body text-sm normal-case tracking-normal text-white/55">
        La página que buscas no existe o fue movida. Regresa al inicio para
        continuar navegando.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </section>
  );
}
