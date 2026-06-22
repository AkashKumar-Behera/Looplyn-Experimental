"use client";

import { Quote, Play } from "lucide-react";
import { TESTIMONIALS, CLIENT_LOGOS } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";

type T = (typeof TESTIMONIALS)[number];

function Card({ t }: { t: T }) {
  return (
    <figure className="glass mx-3 flex w-[340px] shrink-0 flex-col justify-between rounded-3xl p-6 sm:w-[400px]">
      {t.video ? (
        <Media seed={t.seed} src={`/videos/client-${t.seed}.mp4`} className="mb-5 aspect-video" showBrackets={false}>
          <span className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/40 backdrop-blur">
              <Play size={15} className="translate-x-0.5 fill-white text-white" />
            </span>
          </span>
        </Media>
      ) : (
        <Quote className="mb-4 text-accent" size={24} />
      )}
      <blockquote className="text-sm leading-relaxed text-white/90">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-highlight text-sm font-semibold text-black">
          {t.name.charAt(0)}
        </span>
        <div>
          <div className="text-sm font-medium text-white">{t.name}</div>
          <div className="text-xs text-muted">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function TestimonialReel() {
  const rowA = [...TESTIMONIALS, ...TESTIMONIALS];
  const rowB = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Reveal className="mb-16 px-6 text-center">
        <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
          09 — The Reel
        </p>
        <h2 className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Founders who <span className="gradient-text-accent">demand more</span>
        </h2>
      </Reveal>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {rowA.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
      <div className="mt-6 flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        {rowB.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>

      {/* client logos marquee */}
      <div className="mt-20 border-y border-white/10 py-8">
        <div className="flex w-max animate-marquee items-center">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <span
              key={i}
              className="mx-10 font-mono-tc text-2xl font-bold tracking-tight text-white/25 transition-colors hover:text-white/70"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
