"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { CASE_STUDIES } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import { ArrowUpRight } from "lucide-react";

/**
 * Pinned horizontal-scroll case study gallery. The section pins and the track
 * translates horizontally as the user scrolls vertically — GSAP ScrollTrigger.
 */
export default function CaseStudyScroll() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    const tk = track.current;
    if (!el || !tk) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => tk.scrollWidth - window.innerWidth;

      const tween = gsap.to(tk, {
        x: () => -getScrollAmount() - 64,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${getScrollAmount() + window.innerHeight}`,
        pin: true,
        scrub: 0.8,
        animation: tween,
        invalidateOnRefresh: true,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="flex items-center justify-between px-6 pb-10 pt-28 sm:pt-36">
        <div>
          <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
            06 — Case Studies
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Proof, <span className="gradient-text-accent">in motion</span>
          </h2>
        </div>
        <span className="hidden font-mono-tc text-[11px] uppercase tracking-[0.2em] text-muted md:block">
          Scroll →
        </span>
      </div>

      {/* horizontal track */}
      <div className="pb-28 md:pb-0">
        <div
          ref={track}
          className="flex flex-col gap-6 px-6 md:w-max md:flex-row md:gap-8 md:px-6"
        >
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.title}
              className="gradient-border glass relative w-full overflow-hidden rounded-3xl p-5 md:w-[68vw] lg:w-[58vw]"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Media
                  seed={cs.seed}
                  src={`/videos/case-${cs.seed}.mp4`}
                  label={cs.category}
                  className="aspect-video lg:aspect-auto lg:h-full"
                />
                <div className="flex flex-col justify-between p-2 lg:p-6">
                  <div>
                    <p className="font-mono-tc text-[11px] uppercase tracking-[0.25em] text-accent">
                      {cs.category}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                      {cs.title}
                    </h3>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {cs.metrics.map((m) => (
                      <div key={m.v}>
                        <div className="text-2xl font-bold text-white sm:text-3xl">{m.k}</div>
                        <div className="mt-1 text-[11px] text-muted">{m.v}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    data-cursor="hover"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 px-5 py-2.5 text-sm transition-colors hover:bg-accent hover:text-black"
                  >
                    View case <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
