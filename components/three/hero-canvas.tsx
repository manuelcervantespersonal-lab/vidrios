"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import { GlassPanels } from "@/components/three/glass-panels";

/**
 * Default export so this module works with next/dynamic's ssr:false loader.
 * WebGL doesn't exist server-side, so this file must never be imported
 * outside a dynamic(..., { ssr: false }) boundary.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <Suspense fallback={null}>
        <GlassPanels />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
