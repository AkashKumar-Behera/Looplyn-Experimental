"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { STATS } from "@/lib/data";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import RecIndicator from "@/components/cinematic/RecIndicator";
import Timecode from "@/components/cinematic/Timecode";

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
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
              08 — Command Center
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Numbers that <span className="gradient-text-accent">compound</span>
            </h2>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <RecIndicator label="LIVE" />
            <Timecode />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="gradient-border glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-8"
            >
              <span className="absolute right-5 top-5 font-mono-tc text-[10px] uppercase tracking-wider text-accent/70">
                ●
              </span>
              <div className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-4 font-mono-tc text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="gradient-border glass chart relative mt-5 overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Client growth index</h3>
              <p className="text-sm text-muted">Average performance over 5 quarters</p>
            </div>
            <span className="rounded-full bg-accent/15 px-3 py-1 font-mono-tc text-xs text-accent">
              +138% YoY
            </span>
          </div>

          <div className="relative h-56">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff2a00" />
                  <stop offset="100%" stopColor="#ff6a4a" />
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

            <div className="absolute inset-0 flex items-end justify-between gap-4 px-2">
              {CHART.map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="chart-bar w-full origin-bottom rounded-t-lg bg-gradient-to-t from-accent/30 to-accent-highlight"
                    style={{ height: `${d.value}%` }}
                  />
                  <span className="font-mono-tc text-xs text-muted">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
