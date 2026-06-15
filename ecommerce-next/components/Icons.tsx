/**
 * Custom editorial icon library — single-stroke, hand-drawn feeling.
 * Used across the home page to break the generic e-comm aesthetic.
 *
 * Usage:  <IconScissors className="w-5 h-5" />
 * All icons inherit currentColor for stroke.
 */

import { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (extra = ""): P => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: extra,
});

/* ============================== SCISSORS ============================== */
export const IconScissors = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <circle cx="6" cy="6"  r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8 7.7 L20 14M8 16.3 L20 10M14 12 L20 8M14 12 L20 16" />
  </svg>
);

/* ============================== SPOOL ============================== */
export const IconSpool = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <ellipse cx="12" cy="4.5" rx="6.5" ry="1.6" />
    <ellipse cx="12" cy="19.5" rx="6.5" ry="1.6" />
    <path d="M5.5 4.5 V19.5 M18.5 4.5 V19.5" />
    <path d="M7 7 H17 M7 10 H17 M7 13 H17 M7 16 H17" opacity=".5"/>
  </svg>
);

/* ============================== NEEDLE & THREAD ============================== */
export const IconNeedle = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M3 21 L18 6" />
    <path d="M14 2 L22 10 L18 6 Z" fill="currentColor"/>
    <path d="M3 21 c -1 -2 0 -4 2 -4" opacity=".6"/>
  </svg>
);

/* ============================== LEAF ============================== */
export const IconLeaf = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M20 4 c 0 11 -7 17 -16 17 0 -11 7 -17 16 -17 Z" />
    <path d="M4 21 L18 6" opacity=".6"/>
  </svg>
);

/* ============================== COMPASS ============================== */
export const IconCompass = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9 L11 13 L9 15 L13 11 Z" fill="currentColor" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

/* ============================== RULER ============================== */
export const IconRuler = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <rect x="2" y="9" width="20" height="6" rx="1" />
    <path d="M6 9 V11 M9 9 V12 M12 9 V11 M15 9 V12 M18 9 V11" />
  </svg>
);

/* ============================== STAMP / SEAL ============================== */
export const IconStamp = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M12 2 L13.8 5 L17 5.2 L14.4 7.4 L15.2 11 L12 9 L8.8 11 L9.6 7.4 L7 5.2 L10.2 5 Z" />
    <path d="M12 11 L12 15 M9 18 L15 18 M8 21 L16 21" />
  </svg>
);

/* ============================== ASTERISK ============================== */
export const IconAsterisk = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M12 3 V21 M3.6 7.5 L20.4 16.5 M3.6 16.5 L20.4 7.5" />
  </svg>
);

/* ============================== ARROW SLANT ============================== */
export const IconArrowSlant = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M6 18 L18 6 M9 6 H18 V15" />
  </svg>
);

/* ============================== STAR ============================== */
export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M12 3 L14.5 9 L21 9.5 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9.5 L9.5 9 Z" />
  </svg>
);

/* ============================== TAG ============================== */
export const IconTag = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M12 2 H21 V11 L11 21 L3 13 Z" />
    <circle cx="17.5" cy="6.5" r="1.2" />
  </svg>
);

/* ============================== DOOR / ATELIER ============================== */
export const IconDoor = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M5 21 V5 a2 2 0 0 1 2 -2 H17 a2 2 0 0 1 2 2 V21 Z" />
    <path d="M15 12 a1 1 0 0 0 0 .1" />
    <path d="M3 21 H21" />
  </svg>
);

/* ============================== LOCK ============================== */
export const IconLock = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="1.5" />
    <path d="M8 11 V7 a4 4 0 0 1 8 0 V11" />
    <circle cx="12" cy="16" r="1.2" />
  </svg>
);

/* ============================== EYE ============================== */
export const IconEye = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M2 12 c 2 -5 6 -8 10 -8 s 8 3 10 8 c -2 5 -6 8 -10 8 s -8 -3 -10 -8 Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* ============================== SEAM / STITCH ============================== */
export const IconSeam = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M2 12 H4 M6 12 H8 M10 12 H12 M14 12 H16 M18 12 H20 M22 12 H22" />
    <path d="M2 8 H4 M6 8 H8 M10 8 H12 M14 8 H16 M18 8 H20" opacity=".4"/>
    <path d="M2 16 H4 M6 16 H8 M10 16 H12 M14 16 H16 M18 16 H20" opacity=".4"/>
  </svg>
);

/* ============================== CHIP (credit card) ============================== */
export const IconChip = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M4 10 H8 V14 H4 M20 10 H16 V14 H20 M10 6 V10 H14 V6 M10 18 V14 H14 V18" />
  </svg>
);

/* ============================== GRAIN / WEAVE ============================== */
export const IconWeave = (p: P) => (
  <svg viewBox="0 0 24 24" {...base()} {...p}>
    <path d="M3 6 H21 M3 10 H21 M3 14 H21 M3 18 H21" />
    <path d="M6 3 V21 M10 3 V21 M14 3 V21 M18 3 V21" opacity=".4"/>
  </svg>
);
