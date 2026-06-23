"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, AdaptiveDpr, Preload } from "@react-three/drei";
import AmbientLights from "./AmbientLights";
import InfinityLoop from "./InfinityLoop";
import ParticleField from "./ParticleField";
import FloatingOrbs from "./FloatingOrbs";

/**
 * HeroScene — the full R3F canvas for the hero. Combines the Möbius infinity
 * loop, ambient particle field, floating orbs and the lighting rig.
 * Rendered lazily (dynamic import) so it never blocks first paint.
 */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <AmbientLights />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <InfinityLoop />
        </Float>

        <FloatingOrbs />
        <ParticleField count={500} radius={6.5} size={0.03} />

        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
