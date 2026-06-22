"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { STORY_STEPS } from "@/lib/data";
import Media from "@/components/cinematic/Media";

// Deterministic scattered start transforms (so SSR + client match).
const SCATTER = [
  { x: -120, y: 40, r: -9 },
  { x: 90, y: -60, r: 7 },
  { x: -60, y: 80, r: 5 },
  { x: 140, y: 30, r: -6 },
  { x: -100, y: -50, r: 8 },
  { x: 70, y: 70, r: -4 },
];

/**
 * Scattered production photos that rearrange into an ordered timeline as the
 * section scrolls into view — Research → Scale.
 */
export default function ImageStack() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        const s = SCATTER[i % SCATTER.length];
        gsap.fromTo(
          card,
          { xPercent: 0, x: s.x, y: s.y, rotate: s.r, scale: 0.9, opacity: 0.4 },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "center 55%",
              scrub: 0.7,
            },
          }
        );
      });

      gsap.fromTo(
        ".stack-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 60%", end: "center 55%", scrub: 0.6 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
            03 — From brief to launch
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Every frame is <span className="gradient-text-accent">directed</span>
          </h2>
        </div>

        <div className="relative">
          {/* timeline rail */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/10 lg:block">
            <div className="stack-line h-full w-full origin-left bg-accent/60" />
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {STORY_STEPS.map((step) => (
              <div key={step.index} className="stack-card relative">
                <Media
                  seed={step.seed}
                  src={`/images/step-${step.index}.jpg`}
                  className="aspect-[3/4]"
                  showBrackets={false}
                />
                <div className="mt-3">
                  <span className="font-mono-tc text-[11px] text-accent">{step.index}</span>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-[11px] text-muted">{step.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
