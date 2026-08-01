"use client";

import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Edge-glow shader for FLAT glass panels. A true normal-based fresnel term
 * is nearly invisible on a flat plane viewed head-on (the normal barely
 * varies across the surface), so this uses UV distance-to-border instead:
 * fully transparent at the center, glowing in a soft band near the
 * rectangle's edge. That's what makes a transmission:1 panel "read" as a
 * solid object with a defined edge instead of vanishing against a light
 * background — combined with a mild true-fresnel term so the glow still
 * intensifies at grazing viewing angles.
 */
const FresnelEdgeMaterialImpl = shaderMaterial(
  {
    glowColor: new THREE.Color("#eaf6ff"),
    edgeWidth: 0.1,
    intensity: 1.6,
  },
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* glsl */ `
    uniform vec3 glowColor;
    uniform float edgeWidth;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float distToEdge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
      float edge = 1.0 - smoothstep(0.0, edgeWidth, distToEdge);
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 1.5);
      float glow = clamp(edge + fresnel * 0.35, 0.0, 1.0);
      gl_FragColor = vec4(glowColor, glow * intensity);
    }
  `
);

extend({ FresnelEdgeMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    fresnelEdgeMaterialImpl: ThreeElements["shaderMaterial"] & {
      glowColor?: THREE.Color | string;
      edgeWidth?: number;
      intensity?: number;
    };
  }
}

interface FresnelEdgeProps {
  width: number;
  height: number;
  glowColor?: string;
}

/** Slightly-larger transparent overlay plane sitting just in front of the panel. */
export function FresnelEdge({ width, height, glowColor = "#eaf6ff" }: FresnelEdgeProps) {
  return (
    <mesh position={[0, 0, 0.02]}>
      <planeGeometry args={[width * 1.03, height * 1.03]} />
      <fresnelEdgeMaterialImpl
        glowColor={glowColor}
        edgeWidth={0.1}
        intensity={1.6}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
