"use client";

import { cn } from "@/lib/utils";

/**
 * Broadcast REC indicator: a blinking red dot + label. Used in the video
 * intro and globally in Director's Cut mode.
 */
export default function RecIndicator({
  className = "",
  label = "REC",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono-tc text-[11px] uppercase tracking-[0.2em] text-white/80",
        className
      )}
    >
      <span className="h-2.5 w-2.5 animate-rec-blink rounded-full bg-accent shadow-[0_0_10px_rgba(255,42,0,0.9)]" />
      {label}
    </div>
  );
}
