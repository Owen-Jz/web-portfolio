"use client";

import { ReactNode, useRef } from "react";

/**
 * Slight magnetic pull toward the cursor on hover — common fashion-site
 * micro-interaction. Pure CSS transform, no GSAP needed for this one.
 */
export default function MagneticButton({
  children, className = "", as: As = "button", ...props
}: {
  children: ReactNode;
  className?: string;
  as?: any;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <As
      {...props}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </As>
  );
}
