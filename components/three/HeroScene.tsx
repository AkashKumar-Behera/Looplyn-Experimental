"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  AdaptiveDpr,
  Preload,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import AmbientLights from "./AmbientLights";
import InfinityLoop from "./InfinityLoop";
import ParticleField from "./ParticleField";
import FloatingOrbs from "./FloatingOrbs";

/**
 * A grounded, in-memory studio environment built from red Lightformers — gives
 * the metallic loop real reflections and a volumetric red wash, with no
 * external HDRI (works fully offline).
 */
function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#050505"]} />
      {/* key */}
      <Lightformer
        intensity={3}
        color="#ffffff"
        position={[0, 4, -6]}
        scale={[8, 8, 1]}
        form="rect"
      />
      {/* red rim sheets wrapping the object for reflections */}
      <Lightformer intensity={4} color="#ff2a00" position={[-6, 1, 1]} scale={[3, 8, 1]} form="rect" />
      <Lightformer intensity={3} color="#ff4d2d" position={[6, -1, 2]} scale={[3, 8, 1]} form="rect" />
      <Lightformer intensity={2} color="#ff6a4a" position={[0, -4, 3]} scale={[10, 3, 1]} form="rect" />
    </Environment>
  );
}

/** Subtle reflective floor that grounds the object. */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#0a0506"
        metalness={0.9}
        roughness={0.55}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6.8], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        {/* atmospheric fog grounds the depth */}
        <fog attach="fog" args={["#050505", 7, 16]} />

        <AmbientLights />

        {/* volumetric red key from upper-front */}
        <spotLight
          position={[2.5, 5, 4]}
          angle={0.5}
          penumbra={1}
          intensity={60}
          color="#ff3a10"
          distance={22}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.5}>
          <InfinityLoop />
        </Float>

        <FloatingOrbs />
        <ParticleField count={420} radius={6.5} size={0.028} />
        <ParticleField count={160} radius={3.2} size={0.05} speed={0.4} color="#ff6a4a" />

        {/* <Floor /> */}
        <ContactShadows
          position={[0, -1.84, 0]}
          opacity={0.55}
          scale={14}
          blur={2.6}
          far={6}
          color="#ff2a00"
        />

        <StudioEnv />

        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
