"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: number;
  once?: boolean;
}

/**
 * Generic GSAP fade-up reveal driven by ScrollTrigger. When `stagger` is set,
 * the element's direct children animate in sequence.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  stagger,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger, once]);

  return (
    // @ts-expect-error — dynamic element typing
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
