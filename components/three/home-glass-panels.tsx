"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { services } from "@/data/services";
import { FresnelEdge } from "@/components/three/fresnel-edge-material";

const COLS = 4;
const ROWS = 3;
const PANEL_W = 1.5;
const PANEL_H = 2.0;
const GAP = 0.15;
const PANEL_COUNT = COLS * ROWS;

// The top row (indices 0-3) peels forward to become the 4 service markers;
// the other 8 panels dissolve away to clear the stage for them.
const SERVICE_PANEL_INDICES = [0, 1, 2, 3];
const HOLD_END = 0.4; // scroll progress where the hero "hold" ends

interface PanelState {
  gridPos: THREE.Vector3;
  scatterPos: THREE.Vector3;
  scatterRot: THREE.Euler;
  slotPos: THREE.Vector3 | null;
  // Per-panel ambient-float parameters so panels don't move in lockstep.
  floatPhase: number;
  floatSpeed: number;
  rotSpeed: number;
}

function buildPanels(): PanelState[] {
  const panels: PanelState[] = [];
  const totalW = COLS * PANEL_W + (COLS - 1) * GAP;
  const totalH = ROWS * PANEL_H + (ROWS - 1) * GAP;
  const serviceCount = SERVICE_PANEL_INDICES.length;
  const slotSpread = 8.5;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col;
      const x = -totalW / 2 + PANEL_W / 2 + col * (PANEL_W + GAP);
      const y = totalH / 2 - PANEL_H / 2 - row * (PANEL_H + GAP);

      const serviceSlot = SERVICE_PANEL_INDICES.indexOf(index);
      const slotPos =
        serviceSlot >= 0
          ? new THREE.Vector3(
              -slotSpread / 2 + (slotSpread / (serviceCount - 1)) * serviceSlot,
              -0.2,
              2
            )
          : null;

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
        slotPos,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.35 + Math.random() * 0.3,
        rotSpeed: 0.25 + Math.random() * 0.25,
      });
    }
  }
  return panels;
}

interface HomeGlassPanelsProps {
  /** Scroll range start: the Hero <section>. */
  heroRef: RefObject<HTMLElement>;
  /** Scroll range end: the Services <section>. */
  servicesRef: RefObject<HTMLElement>;
}

/**
 * The single persistent 3D scene for Home: a 12-panel curtain-wall grid that
 * assembles on load, idles with a continuous per-panel float/rotation
 * (always running, independent of scroll), and — driven by ONE master
 * ScrollTrigger spanning Hero to the bottom of Services — the camera pulls
 * back while the top row of 4 panels peels forward into "service marker"
 * slots (each gaining a 3D text label) and the remaining 8 dissolve away.
 *
 * Position/rotation flow through a "base" model (basePos/baseRot refs) that
 * GSAP (on load) and ScrollTrigger (on scroll) write into, while a single
 * useFrame loop adds the continuous idle float on top every frame — so the
 * ambient animation and the scroll choreography compose instead of one
 * overwriting the other.
 */
export function HomeGlassPanels({ heroRef, servicesRef }: HomeGlassPanelsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRefs = useRef<Array<THREE.Mesh | null>>([]);
  const textRefs = useRef<Array<THREE.Mesh | null>>([]);
  const panels = useMemo(() => buildPanels(), []);
  const basePos = useMemo(() => Array.from({ length: PANEL_COUNT }, () => new THREE.Vector3()), []);
  const baseRot = useMemo(() => Array.from({ length: PANEL_COUNT }, () => new THREE.Euler()), []);
  const baseScale = useRef<number[]>(new Array(PANEL_COUNT).fill(1));
  const assembled = useRef(false);
  const idleT = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    registerGsap();
    const meshes = panelRefs.current.filter(Boolean) as THREE.Mesh[];

    panels.forEach((p, i) => {
      basePos[i].copy(p.scatterPos);
      baseRot[i].copy(p.scatterRot);
      const material = meshes[i]?.material as THREE.MeshPhysicalMaterial;
      if (material) {
        material.transparent = true;
        material.opacity = 1;
      }
    });

    camera.position.set(0, 0, 7.5);

    let scrollTriggerInstance: ScrollTrigger | undefined;

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        assembled.current = true;

        if (heroRef.current && servicesRef.current) {
          scrollTriggerInstance = ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            endTrigger: servicesRef.current,
            end: "bottom top",
            scrub: 0.8,
            onUpdate: (self) => {
              const progress = self.progress;
              const p2 = Math.min(1, Math.max(0, (progress - HOLD_END) / (1 - HOLD_END)));

              camera.position.z = THREE.MathUtils.lerp(7.5, 9.5, p2);

              panels.forEach((p, i) => {
                const mesh = meshes[i];
                if (!mesh) return;
                const material = mesh.material as THREE.MeshPhysicalMaterial;

                if (p.slotPos) {
                  basePos[i].lerpVectors(p.gridPos, p.slotPos, p2);
                  baseRot[i].x = 0;
                  baseRot[i].y = 0;
                  baseScale.current[i] = THREE.MathUtils.lerp(1, 1.15, p2);
                  material.opacity = 1;

                  const text = textRefs.current[i];
                  if (text) {
                    const textOpacity = Math.min(1, Math.max(0, (p2 - 0.6) / 0.4));
                    (text.material as THREE.Material).opacity = textOpacity;
                    text.visible = textOpacity > 0.01;
                  }
                } else {
                  basePos[i].x = p.gridPos.x;
                  basePos[i].y = p.gridPos.y;
                  basePos[i].z = p.gridPos.z - p2 * 9;
                  baseRot[i].z = p.scatterRot.z * p2 * 0.6;
                  material.opacity = 1 - p2;
                }
              });
            },
          });
        }
      },
    });

    panels.forEach((p, i) => {
      tl.to(
        basePos[i],
        { x: p.gridPos.x, y: p.gridPos.y, z: p.gridPos.z, duration: 1.4, ease: "power3.out" },
        i * 0.06
      ).to(baseRot[i], { x: 0, y: 0, z: 0, duration: 1.4, ease: "power3.out" }, i * 0.06);
    });

    return () => {
      tl.kill();
      scrollTriggerInstance?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panels]);

  useFrame((state, delta) => {
    const group = groupRef.current;

    idleT.current += delta;
    const t = idleT.current;

    const meshes = panelRefs.current;
    for (let i = 0; i < PANEL_COUNT; i++) {
      const mesh = meshes[i];
      if (!mesh) continue;
      const p = panels[i];

      const floatY = Math.sin(t * p.floatSpeed + p.floatPhase) * 0.12;
      const floatX = Math.cos(t * p.floatSpeed * 0.7 + p.floatPhase) * 0.05;
      const idleRotZ = Math.sin(t * p.rotSpeed + p.floatPhase) * 0.04;
      const idleRotX = Math.cos(t * p.rotSpeed * 0.8 + p.floatPhase) * 0.03;

      mesh.position.set(
        basePos[i].x + floatX,
        basePos[i].y + floatY,
        basePos[i].z
      );
      mesh.rotation.set(
        baseRot[i].x + idleRotX,
        baseRot[i].y,
        baseRot[i].z + idleRotZ
      );
      mesh.scale.setScalar(baseScale.current[i]);
    }

    if (!group || !assembled.current) return;
    const wobble = Math.sin(t * 0.3) * 0.02;
    const tiltX = state.pointer.y * 0.04;
    const tiltZ = state.pointer.x * 0.025;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tiltX, 0.03);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, wobble + tiltZ, 0.03);
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
            transmission={0.92}
            thickness={1.3}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={2.2}
            color="#a9def0"
            side={THREE.DoubleSide}
          />
          <FresnelEdge width={PANEL_W} height={PANEL_H} glowColor="#eaf7ff" />
          {SERVICE_PANEL_INDICES.includes(i) && (
            <Text
              ref={(el) => {
                textRefs.current[i] = el as unknown as THREE.Mesh;
              }}
              position={[0, 0, 0.06]}
              fontSize={0.16}
              color="#0b2d47"
              anchorX="center"
              anchorY="middle"
              maxWidth={PANEL_W - 0.2}
              textAlign="center"
              visible={false}
            >
              {services[i].number} {services[i].title.split(" ")[0].toUpperCase()}
            </Text>
          )}
        </mesh>
      ))}
    </group>
  );
}
