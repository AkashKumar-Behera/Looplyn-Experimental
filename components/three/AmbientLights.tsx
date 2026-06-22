"use client";

/**
 * AmbientLights — HDRI-style three-point lighting rig with a purple rim light.
 * Reused across all 3D scenes for a consistent dark-luxury look.
 */
export default function AmbientLights() {
  return (
    <>
      {/* Soft fill so the scene never goes fully black */}
      <ambientLight intensity={0.3} color="#1a0a06" />

      {/* Key light — warm white from upper front */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.5}
        color="#fff3ee"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Red rim light from behind for the signature glow edge */}
      <directionalLight position={[-6, -2, -4]} intensity={2.6} color="#ff2a00" />

      {/* Secondary ember accent */}
      <pointLight position={[-3, 3, 4]} intensity={32} color="#ff4d2d" distance={20} decay={2} />

      {/* Bottom bounce */}
      <pointLight position={[0, -4, 2]} intensity={12} color="#ff6a4a" distance={16} decay={2} />
    </>
  );
}
