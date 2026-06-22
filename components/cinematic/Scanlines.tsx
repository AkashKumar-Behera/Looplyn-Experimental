"use client";

import { cn } from "@/lib/utils";

/**
 * Subtle CRT scanlines + a slow moving scan beam. Scoped to whatever element
 * it's placed inside (parent should be position: relative).
 */
export default function Scanlines({
  className = "",
  beam = true,
}: {
  className?: string;
  beam?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="scanlines absolute inset-0 opacity-60" />
      {beam && (
        <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      )}
    </div>
  );
}
