"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * Mounts Lenis smooth scrolling. Render once near the root.
 */
export default function SmoothScroll() {
  useLenis();
  return null;
}
