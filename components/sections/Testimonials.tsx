"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "@/components/Reveal";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="glass mx-3 flex w-[360px] shrink-0 flex-col justify-between rounded-3xl p-7 sm:w-[420px]">
      <Quote className="mb-5 text-primary" size={26} />
      <blockquote className="text-sm leading-relaxed text-white/90 sm:text-base">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold">
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

export default function Testimonials() {
  // Duplicate the list for a seamless loop
  const row = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Reveal className="mb-16 px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
          Testimonials
        </p>
        <h2 className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Trusted by founders who <span className="gradient-text-purple">demand more</span>
        </h2>
      </Reveal>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </section>
  );
}
