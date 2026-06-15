"use client";

import Link from "next/link";
import { useRef } from "react";
import { IconChip, IconStamp, IconLock, IconAsterisk, IconArrowSlant } from "./Icons";

/**
 * "Founders Circle" section — replaces the standard newsletter block.
 * A literal credit-card visual that tilts in 3D with the cursor.
 */
export default function MembershipCard() {
  const card = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 12}deg) translateZ(0)`;
  };
  const onLeave = () => { if (card.current) card.current.style.transform = ""; };

  return (
    <section className="px-6 lg:px-10 py-28 lg:py-36 bg-bg">
      <div className="max-w-[1480px] mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-3 flex items-center gap-2">
            <IconAsterisk className="w-3 h-3" /> Members
          </p>
          <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(40px,5.5vw,96px)]">
            The {" "}
            <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>
              Founders
            </em>
            <br /> Circle.
          </h2>
          <p className="mt-8 text-[15px] leading-relaxed text-mute max-w-md">
            500 members. First access to every drop. Two atelier visits a year.
            A printed annual. Your own block kept on file at the Naples tailor shop.
          </p>

          <ul className="mt-10 space-y-3 max-w-md">
            {[
              ["24h pre-launch on every drop",   <IconStamp key="0" className="w-4 h-4 text-klein" />],
              ["Two atelier visits / year",     <IconStamp key="1" className="w-4 h-4 text-klein" />],
              ["Printed annual + member tag",   <IconStamp key="2" className="w-4 h-4 text-klein" />],
              ["No automatic renewal — ever",   <IconStamp key="3" className="w-4 h-4 text-klein" />],
            ].map(([t, ic], i) => (
              <li key={i} className="flex items-center gap-4 py-3 border-b border-line text-[15px]">
                {ic}
                <span>{t as string}</span>
              </li>
            ))}
          </ul>

          <Link href="/#" className="mt-10 inline-flex items-center gap-3 bg-ink text-bg font-mono text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-klein transition-colors">
            Apply — $480 / yr
            <IconArrowSlant className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card visual */}
        <div
          className="relative mx-auto w-full max-w-[500px] aspect-[1.586/1] [perspective:900px]"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div
            ref={card}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-klein via-klein2 to-ink text-bg p-7 flex flex-col justify-between transition-transform duration-300 ease-out will-change-transform shadow-[0_30px_60px_rgba(0,23,216,0.35)]"
          >
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-70">Vesper®</p>
                <p className="font-display text-3xl tracking-tightest leading-none mt-1">Founders</p>
                <p className="font-display-italic text-2xl text-bg/80" style={{ fontFamily: "var(--font-display-italic)" }}>circle</p>
              </div>
              <IconLock className="w-7 h-7 opacity-90" />
            </div>

            {/* Chip + name */}
            <div className="flex items-end justify-between gap-6">
              <IconChip className="w-12 h-12 opacity-90" />
              <div className="text-right">
                <p className="font-mono text-[10px] tracking-[0.3em] opacity-60 mb-1">Member since</p>
                <p className="font-mono text-base tabular-nums">02 / 2026</p>
              </div>
            </div>

            {/* Bottom — number + name */}
            <div>
              <p className="font-mono text-lg tabular-nums tracking-[0.2em] opacity-95 mb-2">
                0419 · 2603 · 0014 · 0032
              </p>
              <div className="flex justify-between items-end">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">— Your name here</p>
                <p className="font-display-italic text-xl text-bg/80" style={{ fontFamily: "var(--font-display-italic)" }}>
                  No. 014
                </p>
              </div>
            </div>

            {/* Subtle grid texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
