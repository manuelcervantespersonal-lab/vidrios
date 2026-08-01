"use client";

import { useEffect, useState } from "react";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Gates the Three.js hero scene behind a capability check so mobile and
 * low-end devices get the static photo instead of a WebGL canvas.
 * Defaults to false (safe/static) until the client-side check resolves.
 */
export function useCanRender3D() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const isSmallViewport = window.innerWidth < 900;
    const cores = navigator.hardwareConcurrency ?? 4;
    const isLowPowerCpu = cores <= 2;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    setCapable(
      detectWebGL() &&
        !isSmallViewport &&
        !isLowPowerCpu &&
        !prefersReducedMotion &&
        !isCoarsePointer
    );
  }, []);

  return capable;
}
