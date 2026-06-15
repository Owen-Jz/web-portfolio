"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  /** "lines" wraps text in a mask + animates yPercent (best for titles).
   *  "fade"  fades + lifts a generic block. */
  mode?: "lines" | "fade";
};

/**
 * Drop a <Reveal> around any block to give it the same yPercent-line-mask
 * reveal the prior sites use. GSAP owns the initial transform — never set
 * translateY in CSS or the animation reads as 0→0 and nothing moves.
 */
export default function Reveal({
  children, as = "div", className = "", delay = 0, mode = "lines",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (mode === "lines") {
      const inner = el.querySelector<HTMLElement>("[data-reveal-inner]");
      if (!inner) return;
      gsap.set(inner, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => gsap.to(inner, {
          yPercent: 0, duration: 1, ease: "expo.out", delay,
        }),
      });
    } else {
      gsap.set(el, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        onEnter: () => gsap.to(el, {
          y: 0, opacity: 1, duration: .9, ease: "expo.out", delay,
        }),
      });
    }
  }, [delay, mode]);

  const Tag: any = as;

  if (mode === "lines") {
    return (
      <Tag ref={ref as any} className={`overflow-hidden inline-block ${className}`}>
        <span data-reveal-inline="true" data-reveal-inner="true" className="inline-block will-change-transform">
          {children}
        </span>
      </Tag>
    );
  }

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}
