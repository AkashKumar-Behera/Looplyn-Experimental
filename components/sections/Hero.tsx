"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import MagneticButton from "@/components/MagneticButton";
import Timecode from "@/components/cinematic/Timecode";
import RecIndicator from "@/components/cinematic/RecIndicator";
import Media from "@/components/cinematic/Media";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const STATS = [
  { k: "150+", v: "Brands scaled" },
  { k: "300%", v: "Avg. growth" },
  { k: "50M+", v: "Reach driven" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 20, duration: 0.8 }, 0.1)
        .from(".hero-word", { yPercent: 120, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.2)
        .from(".hero-sub", { autoAlpha: 0, y: 24, duration: 0.9 }, 0.75)
        .from(".hero-cta", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, 0.9)
        .from(".hero-canvas", { autoAlpha: 0, scale: 0.9, duration: 1.6 }, 0.3)
        .from(".hero-meta", { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.08 }, 1.05)
        .from(".hero-hud", { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.1);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* ---- cinematic background motion ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Media
          seed={6}
          src="/videos/hero-bg.mp4"
          rounded="rounded-none"
          showBrackets={false}
          className="h-full w-full opacity-[0.18]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      {/* light leaks */}
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[460px] w-[460px] animate-float rounded-full bg-accent/15 blur-[120px]" />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-[520px] w-[520px] animate-float rounded-full bg-accent/10 blur-[140px]"
        style={{ animationDelay: "-3s" }}
      />

      {/* ---- minimal HUD: REC + timecode + corner markers only ---- */}
      <div className="hero-hud pointer-events-none absolute left-6 top-28 z-20 sm:left-10">
        <RecIndicator />
      </div>
      <div className="hero-hud pointer-events-none absolute right-6 top-28 z-20 sm:right-10">
        <Timecode />
      </div>

      {/* ---- 12-column composition ---- */}
      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-12 items-center gap-x-6 px-6 pt-32 sm:px-10">
        {/* LEFT — cols 1–6 */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <div className="hero-eyebrow mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 font-mono-tc text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Creative growth studio
          </div>

          <h1 className="font-semibold leading-[0.9] tracking-tightest">
            <span className="block overflow-hidden">
              <span className="hero-word block text-3xl font-medium text-muted sm:text-4xl">
                Where
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word block text-[clamp(3.5rem,9vw,7.5rem)] text-white">
                Brands
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word block text-[clamp(3.5rem,9vw,7.5rem)] gradient-text-accent">
                Get Seen.
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-9 max-w-sm text-base leading-relaxed text-muted">
            Looplyn helps ambitious brands scale through strategy, content,
            production and performance marketing.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work">
              View Work <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Book Call <Phone size={15} />
            </MagneticButton>
          </div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-7">
            {STATS.map((s) => (
              <div key={s.v} className="hero-meta">
                <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {s.k}
                </div>
                <div className="mt-1 font-mono-tc text-[11px] uppercase tracking-wider text-muted">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* spacer — col 7 */}
        <div className="hidden xl:col-span-1 xl:block" />

        {/* RIGHT — cols 7/8–12, the framed 3D plate */}
        <div className="col-span-12 mt-12 lg:col-span-6 lg:mt-0">
          <div className="hero-canvas relative mx-auto aspect-square w-full max-w-[34rem]">
            <div className="absolute inset-0 -z-10 m-auto h-1/2 w-1/2 rounded-full bg-accent/25 blur-[90px]" />
            <HeroScene />

            {/* four corner frame markers */}
            <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l border-t border-white/25" />
            <span className="pointer-events-none absolute right-0 top-0 h-7 w-7 border-r border-t border-white/25" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-7 w-7 border-b border-l border-white/25" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 border-b border-r border-white/25" />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex">
        <span className="font-mono-tc text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
