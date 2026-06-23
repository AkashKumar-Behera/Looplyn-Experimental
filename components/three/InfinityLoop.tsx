"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Builds a Möbius-strip BufferGeometry.
 * A Möbius strip is the mathematical "infinity loop" — a single continuous,
 * one-sided surface, which suits LOOPLYN's brand metaphor perfectly.
 */
function useMobiusGeometry(segments = 320, widthSegments = 24, width = 0.7) {
  return useMemo(() => {
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= widthSegments; j++) {
        const v = (j / widthSegments) * 2 - 1; // -1 .. 1
        const half = (v * width) / 2;
        const cu = Math.cos(u);
        const su = Math.sin(u);
        const cu2 = Math.cos(u / 2);
        const su2 = Math.sin(u / 2);

        const r = 1 + half * cu2;
        const x = r * cu;
        const y = r * su;
        const z = half * su2;

        positions.push(x * 1.6, y * 1.6, z * 1.6);
        uvs.push(i / segments, j / widthSegments);
      }
    }

    const stride = widthSegments + 1;
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * stride + j;
        const b = (i + 1) * stride + j;
        const c = (i + 1) * stride + (j + 1);
        const d = i * stride + (j + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [segments, widthSegments, width]);
}

export default function InfinityLoop() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMobiusGeometry();
  const { pointer } = useThree();

  // Smoothed mouse-parallax targets
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Continuous slow rotation
    groupRef.current.rotation.z += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.25 - 0.3;

    // Floating bob
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;

    // Mouse parallax (eased)
    target.current.x = pointer.y * 0.35;
    target.current.y = pointer.x * 0.5;
    groupRef.current.rotation.x += (target.current.x - groupRef.current.rotation.x * 0) * 0;
    groupRef.current.rotation.y +=
      (target.current.y - groupRef.current.rotation.y) * Math.min(1, delta * 2.2);
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Solid emissive Möbius body */}
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#2a1a4a"
          emissive="#8b5cf6"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.25}
          side={THREE.DoubleSide}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Glowing wireframe overlay for the "energy" look */}
      <mesh geometry={geometry} scale={1.005}>
        <meshBasicMaterial
          color="#c4b5fd"
          wireframe
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
