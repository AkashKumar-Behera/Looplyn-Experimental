"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the pointer position in viewport pixels.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return position;
}
