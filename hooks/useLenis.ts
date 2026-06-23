"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Initialises Lenis smooth scrolling and syncs it with GSAP ScrollTrigger.
 * Returns nothing — mount once near the root of the app.
 */
export function useLenis() {
  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // Drive Lenis from GSAP's ticker for perfect sync
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    // gsap ticker uses seconds; lenis expects ms
    const { gsap } = require("@/lib/gsap");
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links → smooth scroll
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
      }
    };
    document.addEventListener("click", handleAnchor);

    return () => {
      document.removeEventListener("click", handleAnchor);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
