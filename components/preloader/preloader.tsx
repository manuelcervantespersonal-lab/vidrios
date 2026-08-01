"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { SplitHeading } from "@/components/motion/split-heading";

const STRIP_COUNT = 6;

/**
 * Full-screen loading counter shown once on initial page load. Lives in the
 * root layout, which the App Router does not remount on client-side
 * navigation, so it never reappears when browsing between pages.
 *
 * Exit is a staggered curtain: each vertical strip slides up on its own
 * timing (not one flat overlay sliding as a single piece), echoing the same
 * fragment language as <PageTransitionOverlay />.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const counterObj = { value: 0 };
    const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      },
    });

    tl.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(counterObj.value);
        if (counterRef.current) counterRef.current.textContent = `${rounded}%`;
        if (barRef.current) barRef.current.style.width = `${counterObj.value}%`;
      },
    })
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.35,
        ease: "power2.in",
      })
      .to(
        strips,
        {
          y: -window.innerHeight * 1.1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.inOut",
        },
        "-=0.05"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div role="status" aria-label="Cargando sitio" className="fixed inset-0 z-[200]">
      <div className="absolute inset-0 flex">
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              stripRefs.current[i] = el;
            }}
            className="h-full flex-1 bg-background"
          />
        ))}
      </div>
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <SplitHeading
          as="span"
          scrollTrigger={false}
          splitType="chars"
          className="font-heading text-xs uppercase tracking-[0.4em] text-white/40"
        >
          CRISTALUM
        </SplitHeading>
        <span
          ref={counterRef}
          className="font-heading text-6xl font-bold tabular-nums text-white md:text-8xl"
        >
          0%
        </span>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
