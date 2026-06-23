"use client";

import { useRef } from "react";
import {
  Target,
  TrendingUp,
  Sparkles,
  Clapperboard,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, LucideIcon> = {
  "Brand Strategy": Target,
  "Performance Marketing": TrendingUp,
  "Content Creation": Sparkles,
  "Video Production": Clapperboard,
  Analytics: BarChart3,
};

function ServiceCard({
  service,
  large,
}: {
  service: (typeof SERVICES)[number];
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[service.title] ?? Sparkles;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      data-cursor="hover"
      className={
        "group gradient-border glass relative overflow-hidden rounded-3xl p-7 sm:p-8 " +
        (large ? "md:col-span-2" : "")
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx) var(--my), rgba(168,85,247,0.16), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/10 text-primary transition-transform duration-500 group-hover:scale-110">
            <Icon size={22} />
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-muted">
            {service.tag}
          </span>
        </div>
        <h3 className="text-xl font-semibold sm:text-2xl">{service.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
            Services
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Everything you need to <span className="gradient-text-purple">grow</span>
          </h2>
          <p className="mt-5 text-muted">
            One integrated team across strategy, media, creative and production —
            no hand-offs, no friction.
          </p>
        </Reveal>

        <Reveal
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
          y={40}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} large={i === 4} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
