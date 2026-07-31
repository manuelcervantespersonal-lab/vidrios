"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { mainNav } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        solid ? "bg-white shadow-md" : "bg-gradient-to-b from-black/50 to-transparent"
      )}
    >
      <div
        className={cn(
          "container-px mx-auto flex max-w-7xl items-center justify-between transition-[height] duration-300 ease-out",
          solid ? "h-16" : "h-20"
        )}
      >
        <Logo variant={solid ? "dark" : "light"} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {mainNav.map((navItem) => {
            const active =
              navItem.href === "/" ? pathname === "/" : pathname.startsWith(navItem.href);
            return (
              <Link
                key={navItem.href}
                href={navItem.href}
                className={cn(
                  "group relative py-1 font-heading text-sm font-medium uppercase tracking-wide transition-colors",
                  solid ? "text-primary hover:text-accent" : "text-white hover:text-white/70",
                  active && (solid ? "text-accent" : "text-white")
                )}
              >
                {navItem.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100",
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
          className={cn(
            "flex h-10 w-10 items-center justify-center lg:hidden",
            solid ? "text-primary" : "text-white"
          )}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
            aria-label="Navegación móvil"
          >
            <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {mainNav.map((navItem) => (
                <Link
                  key={navItem.href}
                  href={navItem.href}
                  className="rounded-sm px-2 py-3 font-heading text-base uppercase tracking-wide text-primary hover:bg-secondary"
                >
                  {navItem.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
