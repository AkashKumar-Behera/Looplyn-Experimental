"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor follower: a small dot plus a larger trailing ring that grows
 * and changes when hovering interactive elements. Hidden on touch devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 32, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 32, mass: 0.3 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea')
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          borderColor: hovering ? "#FF2A00" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="h-full w-full rounded-full border" style={{ borderColor: "inherit" }} />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
          scale: hovering ? 0.5 : 1,
        }}
      />
    </>
  );
}
