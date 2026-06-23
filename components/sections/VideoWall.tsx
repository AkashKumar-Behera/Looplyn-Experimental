"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { VIDEO_WALL } from "@/lib/data";
import Media from "@/components/cinematic/Media";
import Reveal from "@/components/Reveal";
import RecIndicator from "@/components/cinematic/RecIndicator";

type Project = (typeof VIDEO_WALL)[number];

/**
 * 3x3 video wall. Tiles autoplay their placeholder/footage on hover and scale
 * slightly; clicking opens a cinematic fullscreen modal (Netflix-style).
 */
export default function VideoWall() {
  const [active, setActive] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono-tc text-xs uppercase tracking-[0.3em] text-accent">
              04 — The Reel
            </p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              In motion
            </h2>
          </div>
          <RecIndicator label="9 films" className="hidden sm:flex" />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_WALL.map((project, i) => (
            <motion.button
              key={project.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(project)}
              data-cursor="hover"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative block text-left"
            >
              <Media
                seed={project.seed}
                src={`/videos/work-${project.seed}.mp4`}
                playing={hovered === i}
                className="aspect-video w-full"
                showBrackets={false}
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/30 backdrop-blur">
                    <Play size={20} className="translate-x-0.5 fill-white text-white" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="font-mono-tc text-[11px] uppercase tracking-wider text-muted">
                      {project.category}
                    </p>
                  </div>
                </div>
              </Media>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-accent/20 bg-background-2"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-accent hover:text-accent"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <Media
                seed={active.seed}
                src={`/videos/work-${active.seed}.mp4`}
                playing
                className="aspect-video w-full"
                rounded="rounded-none"
                showBrackets={false}
              />

              <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="font-mono-tc text-[11px] uppercase tracking-[0.25em] text-accent">
                    {active.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{active.title}</h3>
                </div>
                <p className="max-w-sm text-sm text-muted">
                  A cinematic campaign directed, produced and scaled end-to-end by
                  the Looplyn studio.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
