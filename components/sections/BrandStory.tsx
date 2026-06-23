"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { STORY_PARAGRAPHS } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import RecIndicator from "@/components/cinematic/RecIndicator";

/**
 * Apple-style reading experience. Each word transitions from muted gray to
 * white as it scrolls through a focus band — reading progress tied to scroll.
 * A split layout pairs the editorial copy with cinematic media on the right.
 */
export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".story-word");

      gsap.to(words, {
        color: "#ffffff",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".story-copy",
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      });

      // reading progress bar
      gsap.fromTo(
        ".story-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-copy",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.4,
          },
        }
      );

      // parallax on the media column
      gsap.to(".story-media-inner", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-center justify-between">
          <p className="font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
            01 — The Studio
          </p>
          <RecIndicator label="Brand Story" className="hidden sm:flex" />
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* LEFT — editorial copy */}
          <div className="relative">
            {/* reading progress rail */}
            <div className="absolute -left-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 sm:block">
              <div className="story-progress h-full w-full origin-top bg-accent shadow-[0_0_10px_rgba(255,42,0,0.7)]" />
            </div>

            <div className="story-copy space-y-10">
              {STORY_PARAGRAPHS.map((para, pi) => (
                <p
                  key={pi}
                  className="text-2xl font-medium leading-[1.35] tracking-tight sm:text-3xl lg:text-[2.6rem] lg:leading-[1.25]"
                >
                  {para.split(" ").map((word, wi) => (
                    <span
                      key={wi}
                      className="story-word"
                      style={{ color: "#3a3a3a" }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT — media stack */}
          <div className="story-media relative">
            <div className="story-media-inner space-y-5">
              <Media seed={7} src="/videos/story-1.mp4" label="ON SET · 01" className="aspect-[4/5]" />
              <div className="grid grid-cols-2 gap-5">
                <Media seed={8} src="/images/story-2.jpg" label="EDIT" className="aspect-square" />
                <Media seed={9} src="/images/story-3.jpg" label="GRADE" className="aspect-square" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
