"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
}

/**
 * Magnetic button — gently pulls toward the cursor on hover, springs back on
 * leave. Renders as <a> when href is provided, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-accent text-black hover:bg-accent-highlight glow-accent"
      : "border border-accent/25 text-white hover:border-accent/60 bg-white/[0.02]";

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
      data-cursor="hover"
    >
      <span className={cn(base, styles, className)}>{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {Inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {Inner}
    </button>
  );
}
