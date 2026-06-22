"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import MagneticButton from "@/components/MagneticButton";
import Timecode from "@/components/cinematic/Timecode";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const HEADLINE = ["Where", "Brands", "Get Seen."];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 20, duration: 0.8 }, 0.1)
        .from(".hero-word", { yPercent: 120, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 0.2)
        .from(".hero-sub", { autoAlpha: 0, y: 24, duration: 0.9 }, 0.7)
        .from(".hero-cta", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, 0.85)
        .from(".hero-canvas", { autoAlpha: 0, scale: 0.85, duration: 1.6 }, 0.3)
        .from(".hero-meta", { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.08 }, 1)
        .from(".hero-hud", { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.1);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-radial-glow blur-3xl" />

      {/* cinematic HUD framing */}
      <div className="hero-hud pointer-events-none absolute left-6 top-24 z-20 font-mono-tc text-[11px] uppercase tracking-[0.2em] text-white/50">
        CAM 01 · LOOP
      </div>
      <div className="hero-hud pointer-events-none absolute right-6 top-24 z-20 flex items-center gap-2 font-mono-tc text-[11px] uppercase tracking-[0.2em] text-white/50">
        <Timecode />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="max-w-xl">
          <div className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Creative growth studio
          </div>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tightest sm:text-6xl lg:text-7xl">
            {HEADLINE.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className={
                    "hero-word inline-block " +
                    (i === 2 ? "gradient-text-accent" : "text-white")
                  }
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Looplyn helps ambitious brands scale through strategy, content,
            production and performance marketing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <div className="hero-cta">
              <MagneticButton href="#work">
                View Work <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
            <div className="hero-cta">
              <MagneticButton href="#contact" variant="ghost">
                Book Call <Phone size={15} />
              </MagneticButton>
            </div>
          </div>

          <div className="mt-14 flex gap-10">
            {[
              { k: "150+", v: "Brands scaled" },
              { k: "300%", v: "Avg. growth" },
              { k: "50M+", v: "Reach driven" },
            ].map((s) => (
              <div key={s.v} className="hero-meta">
                <div className="text-2xl font-semibold text-white">{s.k}</div>
                <div className="text-xs text-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Möbius loop */}
        <div className="hero-canvas relative h-[420px] w-full sm:h-[520px] lg:h-[640px]">
          <div className="absolute inset-0 -z-10 m-auto h-2/3 w-2/3 rounded-full bg-accent/20 blur-[100px]" />
          <HeroScene />
          {/* framing brackets */}
          <span className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l border-t border-white/20" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-white/20" />
        </div>
      </div>
    </section>
  );
}
