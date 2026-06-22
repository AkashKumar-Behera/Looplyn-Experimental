"use client";

import { useEffect, useState } from "react";

/**
 * A running broadcast-style timecode (HH:MM:SS:FF) that ticks at ~24fps,
 * counting up from page mount. Pure client; never rendered on the server to
 * avoid hydration mismatches.
 */
export default function Timecode({ className = "" }: { className?: string }) {
  const [frames, setFrames] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const elapsed = (performance.now() - start) / 1000;
      setFrames(Math.floor(elapsed * 24));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  const ff = frames % 24;
  const totalSeconds = Math.floor(frames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  const p = (n: number) => n.toString().padStart(2, "0");

  return (
    <span className={"font-mono-tc text-[11px] tracking-wider text-white/70 " + className}>
      {p(hh)}:{p(mm)}:{p(ss)}:{p(ff)}
    </span>
  );
}
