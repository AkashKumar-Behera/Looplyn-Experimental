"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/**
 * Number that counts up from 0 to `value` when scrolled into view.
 */
export default function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => setDisplay(Math.round(obj.val)),
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
