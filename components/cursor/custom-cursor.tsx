"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const RING_SIZE = 36;
const DOT_SIZE = 6;

/**
 * Lusion-style cursor dot that lerps toward the pointer. Position is driven
 * imperatively via gsap.quickTo (no React re-renders on mousemove); only the
 * hover state (enlarging over links/buttons/cards) touches React state,
 * since that only changes on enter/leave, not every frame.
 * Disabled entirely on touch / coarse-pointer / reduced-motion devices.
 *
 * Rendered through a portal straight into document.body — it must never be
 * a DOM descendant of anything that gets a CSS `transform` (Lenis's content
 * wrapper, the page-transition overlay, etc.), because `transform` on an
 * ancestor turns `position: fixed` into "fixed to that ancestor" instead of
 * the viewport, which silently breaks the whole effect.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Pass 1: capability check. Only flips state — never touches the refs,
  // since at this point (first render) `enabled` was still false and the
  // ring/dot elements below don't exist in the DOM yet.
  useEffect(() => {
    setMounted(true);
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isFinePointer && !prefersReducedMotion) setEnabled(true);
  }, []);

  // Pass 2: runs *after* the re-render that `enabled` triggered — by then
  // the ring/dot divs exist, so the refs are guaranteed to be populated.
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    function handleMove(e: MouseEvent) {
      setRingX(e.clientX - RING_SIZE / 2);
      setRingY(e.clientY - RING_SIZE / 2);
      setDotX(e.clientX - DOT_SIZE / 2);
      setDotY(e.clientY - DOT_SIZE / 2);
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(true);
    }
    function handleOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(false);
    }

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden will-change-transform md:block"
      >
        <div
          className={cn(
            "rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out",
            hovering
              ? "scale-[1.8] border-accent bg-accent/10"
              : "scale-100 border-foreground/35 bg-transparent"
          )}
          style={{ height: RING_SIZE, width: RING_SIZE }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden will-change-transform md:block"
      >
        <div
          className={cn(
            "rounded-full bg-accent transition-opacity duration-200",
            hovering ? "opacity-0" : "opacity-100"
          )}
          style={{ height: DOT_SIZE, width: DOT_SIZE }}
        />
      </div>
    </>,
    document.body
  );
}
