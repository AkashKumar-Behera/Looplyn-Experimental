"use client";

import { ArrowUpRight } from "lucide-react";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import RecIndicator from "@/components/cinematic/RecIndicator";

/**
 * Massive cinematic closing CTA over a fullscreen background film.
 */
export default function FinalCTA() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-36 sm:py-52">
      {/* background film */}
      <div className="absolute inset-0 -z-10">
        <Media seed={4} src="/videos/cta.mp4" rounded="rounded-none" showBrackets={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 40%, #050505 100%)" }}
      />

      <div className="absolute left-6 top-8 z-10">
        <RecIndicator label="Final Cut" />
      </div>

      <Reveal className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.03] px-4 py-1.5 font-mono-tc text-xs uppercase tracking-[0.25em] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Now accepting select partners
        </p>
        <h2 className="text-balance text-5xl font-bold leading-[1.02] tracking-tightest sm:text-7xl lg:text-8xl">
          Ready To Build Something{" "}
          <span className="gradient-text-accent">Extraordinary?</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
          Tell us where you want to go. We&apos;ll direct the story that gets you
          there — faster than you think.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="mailto:looplynproductions@gmail.com" className="px-10 py-4 text-base">
            Let&apos;s Talk <ArrowUpRight size={18} />
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost" className="px-10 py-4 text-base">
            View Work
          </MagneticButton>
        </div>

        <p className="mt-8 font-mono-tc text-sm text-muted">
          or email{" "}
          <a
            href="mailto:looplynproductions@gmail.com"
            className="text-white underline-offset-4 hover:underline"
          >
            looplynproductions@gmail.com
          </a>
        </p>
      </Reveal>
    </section>
  );
}
