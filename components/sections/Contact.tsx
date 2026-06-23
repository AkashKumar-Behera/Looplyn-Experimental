"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), {
  ssr: false,
});

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 sm:py-44">
      {/* particle field background */}
      <div className="absolute inset-0 -z-10">
        <ContactScene />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-3xl" />

      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Now accepting select partners
        </p>
        <h2 className="text-balance text-5xl font-bold leading-[1.02] tracking-tightest sm:text-6xl lg:text-7xl">
          Ready To Build Something{" "}
          <span className="gradient-text-purple">Extraordinary?</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
          Tell us where you want to go. We&apos;ll show you how to get there —
          faster than you think.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="mailto:looplynproductions@gmail.com" className="px-9 py-4 text-base">
            Let&apos;s Talk <ArrowUpRight size={18} />
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost" className="px-9 py-4 text-base">
            View Work
          </MagneticButton>
        </div>

        <p className="mt-8 text-sm text-muted">
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
