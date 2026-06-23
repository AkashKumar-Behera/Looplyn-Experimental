"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Orb {
  position: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
  color: string;
}

/**
 * A few soft, slowly drifting emissive orbs that add depth around the hero
 * loop without competing with it.
 */
export default function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo<Orb[]>(
    () => [
      { position: [3.4, 1.6, -2], scale: 0.28, speed: 0.6, offset: 0, color: "#8b5cf6" },
      { position: [-3.6, -1.2, -1], scale: 0.18, speed: 0.9, offset: 1.5, color: "#a855f7" },
      { position: [2.6, -2, -3], scale: 0.22, speed: 0.5, offset: 3, color: "#7c3aed" },
      { position: [-2.8, 2.2, -2.5], scale: 0.14, speed: 1.1, offset: 4.2, color: "#c4b5fd" },
      { position: [0.6, 2.8, -3.5], scale: 0.2, speed: 0.7, offset: 2.1, color: "#9333ea" },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.position[1] + Math.sin(t * orb.speed + orb.offset) * 0.4;
      child.position.x = orb.position[0] + Math.cos(t * orb.speed * 0.6 + orb.offset) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={2.2}
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
