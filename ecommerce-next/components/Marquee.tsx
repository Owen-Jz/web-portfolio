"use client";

import { ReactNode } from "react";

/**
 * Pure-CSS marquee. Tailwind keyframes are defined in globals.css as
 * `animate-marquee`. Children are duplicated so the loop is seamless.
 */
export default function Marquee({
  children, className = "", speed = 38,
}: {
  children: ReactNode;
  className?: string;
  /** seconds for one full loop */
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="inline-flex whitespace-nowrap will-change-transform animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
