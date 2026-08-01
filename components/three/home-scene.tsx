"use client";

import { Suspense, type RefObject } from "react";
import dynamic from "next/dynamic";

import { useCanRender3D } from "@/components/three/use-can-render-3d";

const HomeSceneCanvas = dynamic(() => import("@/components/three/home-scene-canvas"), {
  ssr: false,
});

interface HomeSceneProps {
  heroRef: RefObject<HTMLElement>;
  servicesRef: RefObject<HTMLElement>;
}

/**
 * The ONE fixed-position Canvas for the whole Home page — mounted once,
 * sitting behind every section's HTML. Hero and Services keep transparent
 * backgrounds so this shows through; sections after Services have solid
 * backgrounds as usual, which naturally covers it once scrolled past.
 * On mobile/low-power devices this renders nothing at all (see
 * useCanRender3D) — Hero falls back to its static photo in that case.
 */
export function HomeScene({ heroRef, servicesRef }: HomeSceneProps) {
  const canRender3D = useCanRender3D();
  if (!canRender3D) return null;

  return (
    // Negative z-index, not 0: a positioned element with an EXPLICIT z-index
    // (even "0") paints in a later stacking step than normal in-flow content,
    // so `z-0` here would render ON TOP of every opaque section below —
    // negative z-index is the one that actually paints behind them.
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Suspense fallback={null}>
        <HomeSceneCanvas heroRef={heroRef} servicesRef={servicesRef} />
      </Suspense>
    </div>
  );
}
