"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[9990] flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "glass-strong" : "bg-transparent"
        )}
      >
        <a href="#top" className="flex items-center gap-2" data-cursor="hover">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute h-7 w-7 rounded-full bg-primary/30 blur-md" />
            <span className="relative h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-primary to-secondary" />
          </span>
          <span className="text-base font-semibold tracking-tight">LOOPLYN</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-muted transition-colors hover:text-white"
              data-cursor="hover"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="px-5 py-2.5 text-xs">
            Book Call
          </MagneticButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong absolute left-4 right-4 top-20 rounded-3xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-white/90"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium"
              >
                Book Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
