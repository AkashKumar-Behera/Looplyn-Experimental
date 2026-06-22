"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { BOOT_MODULES } from "@/lib/data";
import Scanlines from "@/components/cinematic/Scanlines";
import RecIndicator from "@/components/cinematic/RecIndicator";

/**
 * Cinematic splash / boot sequence. Animates the LOOPLYN wordmark, runs a
 * fake "brand engine" boot with a progress bar, then reveals ENTER EXPERIENCE.
 * Clicking enter plays an exit transition and calls onEnter().
 */
export default function Splash({ onEnter }: { onEnter: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();

      tl.from(".splash-logo span", {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
      })
        .from(".splash-sub", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
        .from(".boot-row", { opacity: 0, x: -16, duration: 0.4, stagger: 0.12 }, "-=0.1")
        .to(
          counter,
          {
            v: 100,
            duration: 2.6,
            ease: "power1.inOut",
            onUpdate: () => setProgress(Math.round(counter.v)),
          },
          "-=0.4"
        )
        .add(() => setReady(true))
        .from(".splash-enter", { opacity: 0, y: 18, duration: 0.7, ease: "power3.out" });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    const el = root.current;
    if (!el || exiting) return;
    setExiting(true);
    gsap
      .timeline({ onComplete: onEnter })
      .to(".splash-content", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" })
      .to(".splash-shutter-top", { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.1")
      .to(".splash-shutter-bottom", { yPercent: 100, duration: 0.7, ease: "power4.inOut" }, "<")
      .to(el, { autoAlpha: 0, duration: 0.2 });
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <Scanlines />
      <div className="film-grain animate-grain is-strong" aria-hidden />

      {/* shutter panels for the exit wipe */}
      <div className="splash-shutter-top absolute inset-x-0 top-0 h-1/2 bg-black" />
      <div className="splash-shutter-bottom absolute inset-x-0 bottom-0 h-1/2 bg-black" />

      <div className="absolute left-6 top-6">
        <RecIndicator label="REC • BOOT" />
      </div>
      <div className="absolute right-6 top-6 font-mono-tc text-[11px] uppercase tracking-[0.25em] text-white/50">
        LPN-OS v2.6
      </div>

      <div className="splash-content relative z-10 w-full max-w-xl px-6">
        <h1 className="splash-logo flex justify-center overflow-hidden text-center text-5xl font-bold tracking-tightest sm:text-7xl">
          {"LOOPLYN".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </h1>

        <p className="splash-sub mt-5 text-center font-mono-tc text-xs uppercase tracking-[0.4em] text-accent">
          Initializing brand engine
          <span className="ml-1 animate-pulse">...</span>
        </p>

        <div className="mt-12 space-y-2.5">
          {BOOT_MODULES.map((mod, i) => {
            const threshold = ((i + 1) / BOOT_MODULES.length) * 100;
            const done = progress >= threshold - 6;
            return (
              <div
                key={mod}
                className="boot-row flex items-center justify-between font-mono-tc text-xs"
              >
                <span className={done ? "text-white" : "text-muted"}>
                  <span className="text-accent">›</span> {mod}
                </span>
                <span className={done ? "text-accent" : "text-muted/50"}>
                  {done ? "OK" : "··"}
                </span>
              </div>
            );
          })}
        </div>

        {/* progress bar */}
        <div className="mt-10">
          <div className="mb-2 flex items-center justify-between font-mono-tc text-[11px] text-muted">
            <span>LOADING</span>
            <span className="text-white">{progress}%</span>
          </div>
          <div className="h-px w-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-highlight shadow-[0_0_12px_rgba(255,42,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* enter */}
        <div className="mt-12 flex justify-center">
          {ready && (
            <button
              onClick={handleEnter}
              className="splash-enter group relative overflow-hidden rounded-full border border-accent/40 px-9 py-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-white transition-colors hover:text-black"
            >
              <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <span className="relative z-10">Enter Experience</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
