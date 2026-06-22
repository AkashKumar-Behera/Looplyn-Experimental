"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MediaProps {
  /** Optional real video path, e.g. "/videos/hero.mp4". Falls back to a
   *  generated cinematic placeholder if missing or unplayable. */
  src?: string;
  poster?: string;
  /** Seed varies the generated placeholder look so tiles differ. */
  seed?: number;
  label?: string;
  className?: string;
  /** When true the video plays; otherwise shows the first frame / placeholder. */
  playing?: boolean;
  autoPlay?: boolean;
  rounded?: string;
  showBrackets?: boolean;
  children?: React.ReactNode;
}

/**
 * CinematicMedia — the universal media slot.
 * If a real video `src` is provided and loads, it plays it. Otherwise it
 * renders a self-contained, filmic animated placeholder (drifting red light,
 * grain, scanlines) so the layout always looks intentional and never broken.
 */
export default function Media({
  src,
  poster,
  seed = 0,
  label,
  className,
  playing = true,
  autoPlay = true,
  rounded = "rounded-2xl",
  showBrackets = true,
  children,
}: MediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(!!src);

  const hue = 6 + (seed % 5) * 4; // stay within the red family
  const angle = 120 + ((seed * 47) % 120);

  // Two drifting radial lights + a base gradient = "footage" feel.
  const bg = `
    radial-gradient(60% 80% at ${20 + (seed % 4) * 12}% 25%, hsla(${hue}, 100%, 50%, 0.35), transparent 60%),
    radial-gradient(50% 60% at ${70 - (seed % 3) * 10}% 80%, hsla(${hue + 8}, 100%, 55%, 0.22), transparent 55%),
    linear-gradient(${angle}deg, #0b0b0b 0%, #111111 45%, #050505 100%)
  `;

  return (
    <div
      className={cn(
        "group/media relative overflow-hidden bg-surface",
        rounded,
        className
      )}
    >
      {/* generated cinematic placeholder */}
      <div className="absolute inset-0" style={{ background: bg }} />
      <div
        className="absolute inset-0 opacity-50 transition-transform duration-[6000ms] ease-linear group-hover/media:scale-110"
        style={{
          background: `radial-gradient(40% 50% at 50% 50%, hsla(${hue + 12}, 100%, 60%, 0.18), transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern [background-size:34px_34px] opacity-30" />
      <div className="scanlines absolute inset-0 opacity-40" />

      {/* real video, if present and loadable */}
      {src && videoOk && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={autoPlay && playing}
          preload="none"
          onError={() => setVideoOk(false)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* corner framing brackets */}
      {showBrackets && (
        <>
          <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-white/40" />
          <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/40" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/40" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/40" />
        </>
      )}

      {label && (
        <span className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono-tc text-[10px] uppercase tracking-[0.25em] text-white/70">
          {label}
        </span>
      )}

      {children}
    </div>
  );
}
