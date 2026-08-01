"use client";

import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";

import { HomeGlassPanels } from "@/components/three/home-glass-panels";

interface HomeSceneCanvasProps {
  heroRef: RefObject<HTMLElement>;
  servicesRef: RefObject<HTMLElement>;
}

/**
 * Default export so this module works with next/dynamic's ssr:false loader.
 * WebGL doesn't exist server-side, so this file must never be imported
 * outside a dynamic(..., { ssr: false }) boundary.
 */
export default function HomeSceneCanvas({ heroRef, servicesRef }: HomeSceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
    >
      <ambientLight intensity={0.6} color="#dceeff" />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#eaf6ff" />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#4fa8e0" />
      <Suspense fallback={null}>
        <HomeGlassPanels heroRef={heroRef} servicesRef={servicesRef} />
        <Environment preset="dawn" background blur={0.65} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.7}
            luminanceSmoothing={0.3}
            intensity={0.35}
            mipmapBlur
          />
          <DepthOfField focusDistance={0.015} focalLength={0.04} bokehScale={2} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
