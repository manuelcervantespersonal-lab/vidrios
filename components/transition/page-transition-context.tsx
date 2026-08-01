"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

import { gsap, registerGsap } from "@/lib/gsap";
import { PageTransitionOverlay } from "@/components/transition/page-transition-overlay";

interface PageTransitionContextValue {
  startTransition: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return ctx;
}

const COVER_STAGGER = 0.045;
const COVER_DURATION = 0.5;
const REVEAL_FALLBACK_MS = 4000;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const rectRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const coveredRef = useRef(false);
  const fallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    const rects = rectRefs.current.filter(Boolean) as HTMLDivElement[];
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    const offset = window.innerHeight * 1.3;

    gsap
      .timeline({
        onComplete: () => {
          coveredRef.current = false;
          pendingHrefRef.current = null;
        },
      })
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: "power2.in",
      })
      .to(
        rects,
        {
          y: offset,
          rotate: 15,
          duration: COVER_DURATION,
          stagger: COVER_STAGGER,
          ease: "power3.inOut",
        },
        "-=0.05"
      );
  }, []);

  const startTransition = useCallback(
    (href: string) => {
      if (pendingHrefRef.current) return; // a transition is already running
      registerGsap();
      // Only the path (no hash) is comparable against usePathname() later.
      pendingHrefRef.current = href.split("#")[0];
      // Kick off the RSC fetch immediately instead of waiting for the cover
      // animation to finish — by the time the screen is covered, the route
      // is often already warm, so the reveal doesn't have to wait on it.
      router.prefetch(href);

      const rects = rectRefs.current.filter(Boolean) as HTMLDivElement[];
      const offset = window.innerHeight * 1.3;

      gsap
        .timeline({
          onComplete: () => {
            coveredRef.current = true;
            router.push(href);
            // Safety net: if the pathname never matches (edge case routing),
            // don't leave the site stuck covered forever.
            fallbackTimeoutRef.current = setTimeout(() => {
              if (coveredRef.current) reveal();
            }, REVEAL_FALLBACK_MS);
          },
        })
        .set(rects, { y: -offset, rotate: -15 })
        .set(logoRef.current, { opacity: 0, scale: 0.85 })
        .to(rects, {
          y: 0,
          rotate: 0,
          duration: COVER_DURATION,
          stagger: COVER_STAGGER,
          ease: "power3.inOut",
        })
        .to(
          logoRef.current,
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        );
    },
    [router, reveal]
  );

  // Fires once the new route has actually mounted (pathname matches the
  // target) while the screen is still covered — that's the cue to reveal.
  useEffect(() => {
    if (coveredRef.current && pendingHrefRef.current === pathname) {
      reveal();
    }
  }, [pathname, reveal]);

  return (
    <PageTransitionContext.Provider value={{ startTransition }}>
      {children}
      <PageTransitionOverlay rectRefs={rectRefs} logoRef={logoRef} />
    </PageTransitionContext.Provider>
  );
}
