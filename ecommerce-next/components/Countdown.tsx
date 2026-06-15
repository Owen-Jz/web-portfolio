"use client";

import { useEffect, useState } from "react";

/**
 * A tiny live countdown to a fixed next-drop target.
 * Used in the hero — gives the page a "live" feel that static
 * fashion sites lack.
 */
export default function Countdown({
  target,
  className = "",
}: {
  /** ISO string for the target date, e.g. "2026-09-04T10:00:00Z" */
  target: string;
  className?: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <span className={`font-mono tabular-nums ${className}`}>—:—:—:—</span>
    );
  }

  const diff = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  const z = (n: number) => String(n).padStart(2, "0");

  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`}>
      {z(d)}d {z(h)}h {z(m)}m {z(s)}s
    </span>
  );
}
