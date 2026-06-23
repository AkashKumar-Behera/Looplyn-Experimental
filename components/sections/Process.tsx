"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate the glowing connector line filling as you scroll
      gsap.fromTo(
        ".process-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      // Each step reveals
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.fromTo(
          step.querySelector(".process-dot"),
          { scale: 0.4, boxShadow: "0 0 0 rgba(139,92,246,0)" },
          {
            scale: 1,
            boxShadow: "0 0 28px rgba(139,92,246,0.9)",
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: { trigger: step, start: "top 78%" },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-20 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
            The Process
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            A system engineered for <span className="gradient-text-purple">momentum</span>
          </h2>
          <p className="mt-5 text-muted">
            Four deliberate stages that take your brand from positioning to a
            compounding growth flywheel.
          </p>
        </header>

        <div className="process-track relative pl-8 sm:pl-0">
          {/* connector line */}
          <div className="absolute bottom-6 left-8 top-6 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
            <div className="process-line-fill h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-primary [box-shadow:0_0_16px_rgba(139,92,246,0.7)]" />
          </div>

          <div className="flex flex-col gap-16 sm:gap-24">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.index}
                className={
                  "process-step relative sm:grid sm:grid-cols-2 sm:items-center sm:gap-12 " +
                  (i % 2 === 1 ? "sm:[direction:rtl]" : "")
                }
              >
                {/* dot */}
                <span className="process-dot absolute -left-8 top-1 h-3.5 w-3.5 rounded-full bg-primary sm:left-1/2 sm:-translate-x-1/2" />

                <div
                  className={
                    "[direction:ltr] " +
                    (i % 2 === 1 ? "sm:text-right" : "")
                  }
                >
                  <div className="gradient-border glass rounded-3xl p-7 sm:p-9">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-sm font-semibold text-primary">
                        {step.index}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* spacer column on the other side */}
                <div className="hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
