"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { CASE_STUDIES } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";

/**
 * Work Wall — a vertical editorial index of projects. Hovering a row reveals a
 * floating media preview that follows the cursor (GSAP quickTo). Premium,
 * BASIC-agency style interaction.
 */
export default function WorkWall() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = preview.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      xTo.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
      yTo.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
  };

  return (
    <section
      id="work"
      ref={root}
      onMouseMove={handleMove}
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[88rem] px-6 sm:px-10">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
              Index — Selected Work
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              The <span className="gradient-text-accent">work</span>
            </h2>
          </div>
          <span className="hidden font-mono-tc text-[11px] uppercase tracking-[0.2em] text-muted md:block">
            ({CASE_STUDIES.length.toString().padStart(2, "0")}) projects
          </span>
        </Reveal>

        <div className="border-t border-white/10">
          {CASE_STUDIES.map((cs, i) => (
            <a
              key={cs.title}
              href="#contact"
              data-cursor="hover"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative flex items-center justify-between border-b border-white/10 py-7 transition-colors sm:py-9"
            >
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="font-mono-tc text-xs text-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h3
                  className={
                    "text-3xl font-semibold tracking-tight transition-all duration-300 sm:text-5xl " +
                    (active === i ? "translate-x-2 text-white" : "text-muted")
                  }
                >
                  {cs.title}
                </h3>
              </div>
              <span className="hidden font-mono-tc text-[11px] uppercase tracking-[0.2em] text-muted sm:block">
                {cs.category}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* floating cursor preview */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        style={{ width: "24rem" }}
      >
        {CASE_STUDIES.map((cs, i) => (
          <div
            key={cs.title}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              opacity: active === i ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${active === i ? 1 : 0.85})`,
              filter: active === i ? "blur(0px)" : "blur(12px)",
            }}
          >
            <Media
              seed={cs.seed}
              src={`/videos/case-${cs.seed}.mp4`}
              playing={active === i}
              label={cs.category}
              className="aspect-video w-96"
              showBrackets={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
