"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useDirectorsCut } from "./DirectorsCut";
import FilmGrain from "./FilmGrain";
import RecIndicator from "./RecIndicator";
import Timecode from "./Timecode";

/**
 * Global, always-mounted cinematic layer. Film grain is subtle in Standard
 * mode; Director's Cut adds a REC HUD, running timecode, corner framing and a
 * heavier vignette + scanlines across the whole experience.
 */
export default function CinematicOverlays() {
  const { enabled } = useDirectorsCut();

  return (
    <>
      <FilmGrain />

      <AnimatePresence>
        {enabled && (
          <motion.div
            key="dc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none fixed inset-0 z-[65]"
            aria-hidden
          >
            {/* heavier vignette */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(5,5,5,0.65) 100%)" }}
            />
            {/* scanlines */}
            <div className="scanlines absolute inset-0 opacity-50" />
            {/* moving scan beam */}
            <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

            {/* corner brackets */}
            <span className="absolute left-5 top-5 h-7 w-7 border-l-2 border-t-2 border-accent/70" />
            <span className="absolute right-5 top-5 h-7 w-7 border-r-2 border-t-2 border-accent/70" />
            <span className="absolute bottom-5 left-5 h-7 w-7 border-b-2 border-l-2 border-accent/70" />
            <span className="absolute bottom-5 right-5 h-7 w-7 border-b-2 border-r-2 border-accent/70" />

            {/* HUD */}
            <div className="absolute bottom-7 left-7 flex items-center gap-4">
              <RecIndicator label="REC" />
              <span className="font-mono-tc text-[11px] uppercase tracking-[0.2em] text-white/60">
                Director&apos;s Cut
              </span>
            </div>
            <div className="absolute bottom-7 right-7 flex items-center gap-3 font-mono-tc text-[11px] uppercase tracking-[0.2em] text-white/60">
              <span>A001 · 24FPS</span>
              <Timecode />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
