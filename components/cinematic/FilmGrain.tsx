"use client";

import { useDirectorsCut } from "./DirectorsCut";
import { cn } from "@/lib/utils";

/**
 * Animated SVG-noise film grain layered over the whole page. Subtle by
 * default, stronger in Director's Cut mode.
 */
export default function FilmGrain() {
  const { enabled } = useDirectorsCut();
  return (
    <div
      aria-hidden
      className={cn("film-grain animate-grain", enabled && "is-strong")}
    />
  );
}
