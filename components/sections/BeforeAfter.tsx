"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { BEFORE_AFTER } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { clamp } from "@/lib/utils";

/**
 * Interactive before/after comparison. Drag the handle to wipe between the
 * "before" and "Looplyn after" states; metric bars animate on scroll.
 */
export default function BeforeAfter() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(p, 0, 100));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && updateFromClientX(e.clientX);
    const touch = (e: TouchEvent) =>
      dragging.current && e.touches[0] && updateFromClientX(e.touches[0].clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", touch, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("touchend", up);
    };
  }, [updateFromClientX]);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ba-bar-fill").forEach((bar) => {
        const w = bar.dataset.w || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${w}%`,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 70%" },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
            07 — The difference
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Before Looplyn <span className="gradient-text-accent">vs after</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* comparison frame */}
          <div
            ref={frame}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-accent/15"
            onMouseDown={(e) => {
              dragging.current = true;
              updateFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              dragging.current = true;
              if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
            }}
            data-cursor="hover"
          >
            {/* AFTER (full) */}
            <Media seed={3} src="/videos/after.mp4" rounded="rounded-none" className="absolute inset-0" showBrackets={false}>
              <span className="absolute right-5 top-5 z-10 rounded-full bg-accent px-3 py-1 font-mono-tc text-[11px] uppercase tracking-wider text-black">
                After
              </span>
            </Media>

            {/* BEFORE (clipped, desaturated) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <div className="relative h-full w-full" style={{ width: frame.current?.offsetWidth }}>
                <Media
                  seed={50}
                  src="/videos/before.mp4"
                  rounded="rounded-none"
                  className="absolute inset-0 grayscale"
                  showBrackets={false}
                >
                  <span className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-black/40 px-3 py-1 font-mono-tc text-[11px] uppercase tracking-wider text-white/80">
                    Before
                  </span>
                </Media>
              </div>
            </div>

            {/* handle */}
            <div
              className="absolute top-0 z-20 h-full w-px bg-accent shadow-[0_0_14px_rgba(255,42,0,0.9)]"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-black/70 backdrop-blur">
                <span className="font-mono-tc text-[10px] text-accent">↔</span>
              </span>
            </div>
          </div>

          {/* animated metrics */}
          <div className="flex flex-col justify-center gap-7">
            {BEFORE_AFTER.map((m) => {
              const ratio = Math.round((m.after / (m.after + m.before)) * 100);
              return (
                <div key={m.label}>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-sm text-muted">{m.label}</span>
                    <span className="font-mono-tc text-sm text-white">
                      {m.before}
                      {m.unit} <span className="text-accent">→ {m.after}{m.unit}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="ba-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-accent-highlight"
                      data-w={ratio}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
