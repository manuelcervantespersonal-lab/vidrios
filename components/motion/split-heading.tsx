"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  splitType?: "words" | "chars";
  /** false = reveal immediately on mount (hero); true = reveal on scroll into view. */
  scrollTrigger?: boolean;
  delay?: number;
}

/**
 * Giant Lusion-style headline that reveals word-by-word (or letter-by-letter)
 * via GSAP SplitText, either on mount (hero) or when scrolled into view.
 * This is the one reusable primitive every section/page title should use.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  splitType = "words",
  scrollTrigger = true,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const split = new SplitText(el, {
        type: `lines,${splitType}`,
        linesClass: "split-line",
      });

      const targets = splitType === "chars" ? split.chars : split.words;

      const tween = gsap.from(targets, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: splitType === "chars" ? 0.012 : 0.05,
        delay,
        scrollTrigger: scrollTrigger
          ? {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            }
          : undefined,
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [children, splitType, scrollTrigger] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
