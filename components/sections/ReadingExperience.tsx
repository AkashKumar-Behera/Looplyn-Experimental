"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const STATEMENT =
  "We don't make ads. We direct stories — researched, scripted, shot and scaled — until a brand becomes impossible to look away from.";

/**
 * A single large editorial statement that resolves word-by-word from gray to
 * white as it scrolls through the viewport. Apple-style reading rhythm, given
 * its own breathing room.
 */
export default function ReadingExperience() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(".rx-word", {
        color: "#ffffff",
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: ".rx-copy",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 sm:py-48">
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
        <p className="mb-12 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
          The Manifesto
        </p>
        <p className="rx-copy text-balance text-3xl font-medium leading-[1.25] tracking-tight sm:text-5xl sm:leading-[1.2]">
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} className="rx-word" style={{ color: "#37373a" }}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
