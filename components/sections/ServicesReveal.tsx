"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";

/**
 * Premium hover-reveal services list. Hovering a row swaps the large preview
 * (scale + blur transition) and the preview drifts slightly with the cursor.
 * On mobile the preview sits inline above the list.
 */
export default function ServicesReveal() {
  const [active, setActive] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    el.style.setProperty("--px", `${dx * 18}px`);
    el.style.setProperty("--py", `${dy * 18}px`);
  };

  const current = SERVICES[active];

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
              02 — Capabilities
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              What we <span className="gradient-text-accent">direct</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">
            One integrated studio — strategy, film, content and media under a
            single creative direction.
          </p>
        </Reveal>

        <div
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr]"
          onMouseMove={handleMove}
        >
          {/* LIST */}
          <ul className="order-2 lg:order-1">
            {SERVICES.map((service, i) => (
              <li
                key={service.title}
                onMouseEnter={() => setActive(i)}
                data-cursor="hover"
                className="group relative cursor-pointer border-t border-white/10 last:border-b"
              >
                <div className="flex items-center justify-between py-7 transition-all duration-500 group-hover:px-3">
                  <div className="flex items-baseline gap-5">
                    <span
                      className={
                        "font-mono-tc text-xs transition-colors " +
                        (active === i ? "text-accent" : "text-muted")
                      }
                    >
                      {service.index}
                    </span>
                    <span
                      className={
                        "text-3xl font-semibold tracking-tight transition-colors duration-300 sm:text-4xl " +
                        (active === i ? "text-white" : "text-muted")
                      }
                    >
                      {service.title}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className={
                      "transition-all duration-300 " +
                      (active === i
                        ? "translate-x-0 text-accent opacity-100"
                        : "-translate-x-2 text-muted opacity-0")
                    }
                  />
                </div>
                {/* sweep highlight */}
                <span
                  className={
                    "absolute bottom-0 left-0 h-px bg-accent transition-all duration-500 " +
                    (active === i ? "w-full" : "w-0")
                  }
                />
              </li>
            ))}
          </ul>

          {/* PREVIEW */}
          <div className="order-1 lg:order-2">
            <div
              ref={previewRef}
              className="relative aspect-[4/3] w-full"
              style={{ transform: "translate(var(--px,0), var(--py,0))", transition: "transform 0.4s ease-out" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(14px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Media
                    seed={current.seed}
                    src={current.src}
                    label={`${current.index} · ${current.title}`}
                    className="h-full w-full"
                  >
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16">
                      <p className="max-w-md text-sm leading-relaxed text-white/85">
                        {current.description}
                      </p>
                    </div>
                  </Media>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
