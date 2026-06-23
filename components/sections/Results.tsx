"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { STATS } from "@/lib/data";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

const CHART = [
  { label: "Q1", value: 42 },
  { label: "Q2", value: 58 },
  { label: "Q3", value: 71 },
  { label: "Q4", value: 86 },
  { label: "Q5", value: 100 },
];

export default function Results() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chart-bar",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".chart", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".chart-line",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".chart", start: "top 80%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
            Results
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Numbers that <span className="gradient-text-purple">compound</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Stat counters */}
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="gradient-border glass flex flex-col justify-between rounded-3xl p-8"
            >
              <div className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-4 text-sm uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Animated dashboard chart */}
        <div className="gradient-border glass chart relative mt-6 overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Client growth index</h3>
              <p className="text-sm text-muted">Average performance over 5 quarters</p>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
              +138% YoY
            </span>
          </div>

          <div className="relative h-56">
            {/* trend line */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 600 220"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c4b5fd" />
                </linearGradient>
              </defs>
              <polyline
                className="chart-line"
                points="40,180 175,150 310,110 445,70 580,24"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="600"
              />
            </svg>

            {/* bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-4 px-2">
              {CHART.map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="chart-bar w-full origin-bottom rounded-t-lg bg-gradient-to-t from-primary/30 to-secondary"
                    style={{ height: `${d.value}%` }}
                  />
                  <span className="text-xs text-muted">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
