"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PanelData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

function generatePanels(count: number): PanelData[] {
  const panels: PanelData[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.6 + Math.random() * 1.8;
    panels.push({
      position: [
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 4.5,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2,
      ],
      rotation: [
        (Math.random() - 0.5) * 0.6,
        angle + (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.3,
      ],
      scale: 0.75 + Math.random() * 0.6,
    });
  }
  return panels;
}

function Panel({ position, rotation, scale }: PanelData) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1.6, 2.4]} />
      <meshPhysicalMaterial
        roughness={0.05}
        metalness={0}
        transmission={1}
        thickness={0.4}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.4}
        color="#dce8f2"
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Abstract composition of floating glass facade panels. Rotates slowly and
 * continuously on Y, while X/Z tilt lerps toward the pointer position for a
 * subtle parallax/tilt reaction — no scroll coupling (that's GSAP's job).
 */
export function GlassPanels() {
  const groupRef = useRef<THREE.Group>(null);
  const panels = useMemo(() => generatePanels(11), []);
  const target = useRef({ x: 0, z: 0 });

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y += delta * 0.08;

    target.current.x = state.pointer.y * 0.15;
    target.current.z = state.pointer.x * 0.08;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, target.current.x, 0.04);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, target.current.z, 0.04);
  });

  return (
    <group ref={groupRef}>
      {panels.map((panel, i) => (
        <Panel key={i} {...panel} />
      ))}
    </group>
  );
}
