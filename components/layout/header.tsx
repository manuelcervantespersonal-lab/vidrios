"use client";

import { TransitionLink as Link } from "@/components/transition/transition-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";

import { mainNav } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const links = linkRefs.current.filter(Boolean) as HTMLSpanElement[];

      if (mobileOpen) {
        document.body.style.overflow = "hidden";
        gsap.set(overlay, { display: "flex" });
        gsap
          .timeline()
          .to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" })
          .fromTo(
            links,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out" },
            "-=0.15"
          );
      } else {
        document.body.style.overflow = "";
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }
    },
    { dependencies: [mobileOpen] }
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-400",
          scrolled
            ? "border-b border-white/10 bg-background/75 shadow-lg backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "container-px mx-auto flex max-w-7xl items-center justify-between transition-[height] duration-300 ease-out",
            scrolled ? "h-16 md:h-18" : "h-20 md:h-24"
          )}
        >
          <Logo variant="light" />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {mainNav.map((navItem) => {
              const active =
                navItem.href === "/" ? pathname === "/" : pathname.startsWith(navItem.href);
              return (
                <Link
                  key={navItem.href}
                  href={navItem.href}
                  className={cn(
                    "group relative py-1 font-heading text-sm font-medium uppercase tracking-wide text-white/80 transition-colors hover:text-white",
                    active && "text-white"
                  )}
                >
                  {navItem.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
                      active && "scale-x-100"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button asChild size="default">
              <Link href="/contacto">Contáctanos</Link>
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Fullscreen mobile menu overlay, animated with a GSAP cascade. */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center bg-background opacity-0 lg:hidden"
        aria-label="Navegación móvil"
      >
        <nav className="container-px flex flex-col gap-1">
          {mainNav.map((navItem, i) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className="overflow-hidden py-2"
            >
              <span
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className="inline-block text-display-sm text-white"
              >
                {navItem.label}
              </span>
            </Link>
          ))}
          <Button asChild size="lg" className="mt-8 w-fit">
            <Link href="/contacto">Contáctanos</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
