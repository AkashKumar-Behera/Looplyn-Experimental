"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PROCESS_STEPS } from "@/lib/data";

/**
 * Horizontal process timeline. A red line draws left-to-right on scroll while
 * each stage node pops and its content reveals in sequence.
 */
export default function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".timeline-track", start: "top 75%", end: "bottom 70%", scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.from(node, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 82%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(
          node.querySelector(".timeline-dot"),
          { scale: 0.3 },
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: node, start: "top 78%" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
            05 — The Process
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            From discovery to <span className="gradient-text-accent">scale</span>
          </h2>
        </div>

        <div className="timeline-track relative">
          {/* horizontal rail */}
          <div className="absolute left-0 right-0 top-[42px] hidden h-px bg-white/10 lg:block">
            <div className="timeline-line h-full w-full origin-left bg-gradient-to-r from-accent to-accent-highlight shadow-[0_0_12px_rgba(255,42,0,0.7)]" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.index} className="timeline-node relative">
                <div className="mb-7 flex items-center gap-3 lg:block">
                  <span className="timeline-dot relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-accent shadow-[0_0_18px_rgba(255,42,0,0.8)]">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                </div>
                <span className="font-mono-tc text-xs text-accent">{step.index}</span>
                <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
