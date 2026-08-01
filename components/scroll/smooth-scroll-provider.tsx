"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger positions
 * stay in sync with Lenis's virtual scroll instead of the raw scroll event.
 * Skipped entirely under prefers-reduced-motion (falls back to native scroll).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Every route change (including our page-transition navigations) must
  // reset scroll to the top — a plain window.scrollTo isn't enough because
  // Lenis keeps its own virtual scroll position and would otherwise animate
  // back from wherever the previous page had scrolled to.
  useEffect(() => {
    // A hash in the URL means this navigation targets a specific section
    // (e.g. a service card linking to /servicios#instalacion) — let that
    // scroll to the anchor instead of forcing the page back to the top.
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
