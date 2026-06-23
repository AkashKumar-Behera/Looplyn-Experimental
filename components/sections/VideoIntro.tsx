"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import Media from "@/components/cinematic/Media";
import RecIndicator from "@/components/cinematic/RecIndicator";
import Timecode from "@/components/cinematic/Timecode";

/**
 * Fullscreen cinematic intro. A background film fills the viewport with
 * overlay typography; on scroll the footage zooms out into a framed panel and
 * the text fades, handing off to the hero.
 */
export default function VideoIntro() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          pin: ".intro-stage",
          pinSpacing: true,
        },
      });

      tl.to(".intro-media", { scale: 0.82, borderRadius: "28px", ease: "none" }, 0)
        .to(".intro-frame", { padding: "5vh 5vw", ease: "none" }, 0)
        .to(".intro-copy", { autoAlpha: 0, y: -60, ease: "none" }, 0)
        .to(".intro-letterbox", { autoAlpha: 0, ease: "none" }, 0.4)
        .fromTo(".intro-vignette", { autoAlpha: 0.2 }, { autoAlpha: 0.7, ease: "none" }, 0);

      // entrance
      gsap.from(".intro-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[180vh]">
      <div className="intro-stage relative h-screen w-full overflow-hidden">
        <div className="intro-frame relative h-full w-full p-0">
          <Media
            seed={2}
            src="/videos/intro.mp4"
            rounded="rounded-none"
            showBrackets={false}
            className="intro-media h-full w-full"
          />
        </div>

        {/* letterbox bars */}
        <div className="intro-letterbox pointer-events-none absolute inset-x-0 top-0 z-20 h-[8vh] bg-black" />
        <div className="intro-letterbox pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[8vh] bg-black" />

        {/* vignette */}
        <div
          className="intro-vignette pointer-events-none absolute inset-0 z-10"
          style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 45%, #050505 100%)" }}
        />

        {/* HUD — REC + timecode + corner frame markers only */}
        <div className="absolute left-6 top-[10vh] z-30">
          <RecIndicator />
        </div>
        <div className="absolute right-6 top-[10vh] z-30">
          <Timecode />
        </div>
        <span className="pointer-events-none absolute left-6 top-[9vh] z-30 h-7 w-7 border-l border-t border-white/30" />
        <span className="pointer-events-none absolute right-6 top-[9vh] z-30 h-7 w-7 border-r border-t border-white/30" />
        <span className="pointer-events-none absolute bottom-[9vh] left-6 z-30 h-7 w-7 border-b border-l border-white/30" />
        <span className="pointer-events-none absolute bottom-[9vh] right-6 z-30 h-7 w-7 border-b border-r border-white/30" />

        {/* overlay copy */}
        <div className="intro-copy absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 font-mono-tc text-xs uppercase tracking-[0.4em] text-accent">
            Looplyn — Where Brands Get Seen
          </p>
          <h2 className="text-5xl font-bold leading-[0.95] tracking-tightest sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <span className="intro-line inline-block">WE DON&apos;T FOLLOW TRENDS</span>
            </span>
            <span className="block overflow-hidden">
              <span className="intro-line inline-block gradient-text-accent">WE CREATE THEM</span>
            </span>
          </h2>
          <div className="mt-12 flex flex-col items-center gap-2 text-muted">
            <span className="font-mono-tc text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
