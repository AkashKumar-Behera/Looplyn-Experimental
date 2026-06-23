"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { WORK } from "@/lib/data";
import Reveal from "@/components/Reveal";

function WorkCard({ project }: { project: (typeof WORK)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMove}
      data-cursor="hover"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-surface p-1"
    >
      {/* mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(139,92,246,0.18), transparent 60%)",
        }}
      />

      <div className="relative rounded-[20px] p-7 sm:p-9">
        {/* thumbnail */}
        <div
          className="relative mb-7 h-52 overflow-hidden rounded-2xl sm:h-60"
          style={{
            background: `radial-gradient(120% 120% at 30% 20%, ${project.accent}40, #111111 60%)`,
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern [background-size:28px_28px] opacity-40" />
          <div
            className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125"
            style={{ background: project.accent, opacity: 0.5 }}
          />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
            {project.industry}
          </span>
          <span className="absolute bottom-5 left-5 text-5xl font-bold tracking-tight text-white">
            {project.growth}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.metric}</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
              Featured Work
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Brands we made <span className="gradient-text-purple">unmissable</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            A selection of recent partnerships where strategy and creative met
            measurable growth.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.12} y={50}>
          {WORK.map((project) => (
            <WorkCard key={project.title} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
