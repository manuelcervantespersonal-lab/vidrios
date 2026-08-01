"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

const COLS = 4;
const ROWS = 3;
const PANEL_W = 1.5;
const PANEL_H = 2.0;
const GAP = 0.15;

interface PanelState {
  gridPos: THREE.Vector3;
  scatterPos: THREE.Vector3;
  scatterRot: THREE.Euler;
}

function buildPanels(): PanelState[] {
  const panels: PanelState[] = [];
  const totalW = COLS * PANEL_W + (COLS - 1) * GAP;
  const totalH = ROWS * PANEL_H + (ROWS - 1) * GAP;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = -totalW / 2 + PANEL_W / 2 + col * (PANEL_W + GAP);
      const y = totalH / 2 - PANEL_H / 2 - row * (PANEL_H + GAP);
      panels.push({
        gridPos: new THREE.Vector3(x, y, 0),
        scatterPos: new THREE.Vector3(
          x + (Math.random() - 0.5) * 6,
          y + (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5 - 2
        ),
        scatterRot: new THREE.Euler(
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.2
        ),
      });
    }
  }
  return panels;
}

interface GlassPanelsProps {
  /** The hero <section> DOM node — scrolling through it drives disassembly. */
  sectionRef?: RefObject<HTMLElement>;
}

/**
 * Curtain-wall facade: 12 panels start scattered like loose parts, assemble
 * into an ordered 4x3 grid on load (this is the product — a real facade,
 * not abstract decoration), idle with a very subtle wobble once assembled,
 * then disassemble again as the user scrolls past the hero into Services.
 */
export function GlassPanels({ sectionRef }: GlassPanelsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRefs = useRef<Array<THREE.Mesh | null>>([]);
  const panels = useMemo(() => buildPanels(), []);
  const assembled = useRef(false);
  const idleT = useRef(0);

  useEffect(() => {
    registerGsap();
    const meshes = panelRefs.current.filter(Boolean) as THREE.Mesh[];

    meshes.forEach((mesh, i) => {
      const p = panels[i];
      mesh.position.copy(p.scatterPos);
      mesh.rotation.set(p.scatterRot.x, p.scatterRot.y, p.scatterRot.z);
    });

    let scrollTriggerInstance: ScrollTrigger | undefined;

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        assembled.current = true;

        // Only start listening to scroll once fully assembled, so the
        // ScrollTrigger's initial sync-call can't snap panels mid-flight.
        if (sectionRef?.current) {
          scrollTriggerInstance = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            onUpdate: (self) => {
              const t = self.progress;
              meshes.forEach((mesh, i) => {
                const p = panels[i];
                mesh.position.x = p.gridPos.x + (p.scatterPos.x - p.gridPos.x) * t * 1.4;
                mesh.position.y = p.gridPos.y + (p.scatterPos.y - p.gridPos.y) * t * 1.4;
                mesh.position.z = p.gridPos.z - t * 6;
                mesh.rotation.x = p.scatterRot.x * t;
                mesh.rotation.y = p.scatterRot.y * t;
                mesh.rotation.z = p.scatterRot.z * t;
              });
            },
          });
        }
      },
    });

    meshes.forEach((mesh, i) => {
      const p = panels[i];
      tl.to(
        mesh.position,
        { x: p.gridPos.x, y: p.gridPos.y, z: p.gridPos.z, duration: 1.4, ease: "power3.out" },
        i * 0.06
      ).to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 1.4, ease: "power3.out" }, i * 0.06);
    });

    return () => {
      tl.kill();
      scrollTriggerInstance?.kill();
    };
  }, [panels, sectionRef]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || !assembled.current) return;

    idleT.current += delta;
    const wobble = Math.sin(idleT.current * 0.3) * 0.02;
    const tiltX = state.pointer.y * 0.05;
    const tiltZ = state.pointer.x * 0.03;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, wobble, 0.03);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tiltX, 0.03);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, tiltZ, 0.03);
  });

  return (
    <group ref={groupRef}>
      {panels.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
        >
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshPhysicalMaterial
            roughness={0.08}
            metalness={0}
            transmission={1}
            thickness={1.2}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.8}
            color="#eef4f8"
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
