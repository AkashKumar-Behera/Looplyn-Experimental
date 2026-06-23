"use client";

/**
 * AmbientLights — HDRI-style three-point lighting rig with a purple rim light.
 * Reused across all 3D scenes for a consistent dark-luxury look.
 */
export default function AmbientLights() {
  return (
    <>
      {/* Soft fill so the scene never goes fully black */}
      <ambientLight intensity={0.35} color="#1a1a2e" />

      {/* Key light — cool white from upper front */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Purple rim light from behind for the signature glow edge */}
      <directionalLight position={[-6, -2, -4]} intensity={2.4} color="#8b5cf6" />

      {/* Secondary magenta accent */}
      <pointLight position={[-3, 3, 4]} intensity={30} color="#a855f7" distance={20} decay={2} />

      {/* Bottom bounce */}
      <pointLight position={[0, -4, 2]} intensity={12} color="#7c3aed" distance={16} decay={2} />
    </>
  );
}
