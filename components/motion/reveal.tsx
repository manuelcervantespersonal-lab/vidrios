"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, registerGsap } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/**
 * Fade + slide-up scroll reveal, driven by GSAP ScrollTrigger (not Framer)
 * so every content block on every page shares the same scroll-animation
 * engine as the section titles and the page-transition system.
 */
export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const tween = gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.6,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [delay, y] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
