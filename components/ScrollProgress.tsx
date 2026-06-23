"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar fixed to the top of the viewport that fills as
 * the user scrolls through the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[9998] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #8b5cf6, #a855f7, #c4b5fd)",
        boxShadow: "0 0 12px rgba(139,92,246,0.7)",
      }}
    />
  );
}
