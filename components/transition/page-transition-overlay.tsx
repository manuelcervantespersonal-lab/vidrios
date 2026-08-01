"use client";

import { useEffect, useState, type MutableRefObject } from "react";
import { createPortal } from "react-dom";

export const RECT_COUNT = 8;

interface PageTransitionOverlayProps {
  rectRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  logoRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Purely presentational: solid brand-dark rectangles + a centered isotype.
 * No screenshotting of the outgoing page (the hero's WebGL canvas can't be
 * captured by html2canvas-style tools anyway) — this just covers, shows the
 * mark, and uncovers, while <PageTransitionProvider> does the choreography.
 * Portal'd to document.body for the same reason as the cursor: it must
 * never sit inside anything with a CSS transform, or `position: fixed`
 * breaks.
 */
export function PageTransitionOverlay({ rectRefs, logoRef }: PageTransitionOverlayProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[150]" aria-hidden="true">
      <div className="absolute inset-0 flex">
        {Array.from({ length: RECT_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              rectRefs.current[i] = el;
            }}
            className="h-full flex-1 bg-charcoal"
            style={{ transform: "translateY(-1400px) rotate(-15deg)" }}
          />
        ))}
      </div>
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
        style={{ transform: "scale(0.85)" }}
      >
        <span className="relative flex h-16 w-16 items-center justify-center bg-accent">
          <span className="absolute inset-[6px] border border-white/70" />
        </span>
      </div>
    </div>,
    document.body
  );
}
