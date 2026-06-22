"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import ParticleField from "./ParticleField";
import AmbientLights from "./AmbientLights";

/**
 * Animated particle field used as the background of the contact CTA section.
 */
export default function ContactScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <AmbientLights />
        <ParticleField count={900} radius={9} size={0.045} speed={0.6} color="#ff2a00" />
        <ParticleField count={400} radius={6} size={0.025} speed={1.2} color="#ff6a4a" />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
