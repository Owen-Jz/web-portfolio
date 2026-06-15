"use client";

import { useState } from "react";
import { IconLeaf, IconWeave, IconSpool, IconAsterisk } from "./Icons";

type Material = {
  key: string;
  label: string;
  fibre: string;
  origin: string;
  weight: string;
  hand: string;
  hex: string;
  ring: string;
  source: string;
};

const materials: Material[] = [
  { key: "wool",   label: "Virgin Wool", fibre: "92% wool · 8% cashmere",
    origin: "Biella, Italy",   weight: "580 g/m²", hand: "Heavy · soft",
    hex: "#c3b59a", ring: "#7e7048", source: "Lanificio Lora & Festa — est. 1894" },
  { key: "cash",   label: "Cashmere",    fibre: "100% grade-A two-ply",
    origin: "Inner Mongolia",  weight: "320 g/m²", hand: "Light · dense",
    hex: "#d8cdbc", ring: "#8c8164", source: "Saito Cooperative — Ulaanbaatar" },
  { key: "silk",   label: "Silk-Satin",  fibre: "100% mulberry silk",
    origin: "Como, Italy",      weight: "88 g/m²",  hand: "Liquid · cool",
    hex: "#e8d9b4", ring: "#a8966c", source: "Setificio Mantero — Como" },
  { key: "denim",  label: "Selvedge Denim", fibre: "100% cotton, rope-dyed",
    origin: "Okayama, Japan",   weight: "13.5 oz",  hand: "Crisp · stiff",
    hex: "#1a2547", ring: "#0a1532", source: "Kuroki Mill — est. 1950" },
  { key: "linen",  label: "Heavy Linen",    fibre: "100% wet-spun flax",
    origin: "Saint-Quentin, France", weight: "260 g/m²", hand: "Cool · dry",
    hex: "#b8b09c", ring: "#7e7860", source: "Maison Linière — Picardy" },
  { key: "leather", label: "Veg-Tanned Leather", fibre: "Full grain cowhide",
    origin: "Tuscany, Italy",   weight: "1.4 mm",  hand: "Firm · slow patina",
    hex: "#8a4f25", ring: "#532e15", source: "Consorzio Vera Pelle — Santa Croce" },
];

/**
 * Material library — interactive spec sheet.
 * Click a swatch to reveal its origin/weight/source data.
 * Replaces the standard "Our materials" section with a tactile,
 * museum-style catalog.
 */
export default function MaterialLibrary() {
  const [active, setActive] = useState<Material>(materials[0]);

  return (
    <section className="px-6 lg:px-10 py-28 lg:py-36 bg-bg2">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-end justify-between border-b border-line pb-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-mute">
          <span className="flex items-center gap-2 text-klein">
            <IconAsterisk className="w-3 h-3" />
            Library
          </span>
          <span>06 materials · 06 mills</span>
          <span className="hidden md:inline">Updated quarterly</span>
        </div>

        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Header + swatches */}
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(40px,5.5vw,96px)] mb-12">
              The {" "}
              <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>
                cloth.
              </em>
            </h2>

            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              {materials.map((m) => {
                const isActive = m.key === active.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setActive(m)}
                    className="group text-left flex flex-col items-start gap-3"
                  >
                    <span
                      className={
                        "relative block w-full aspect-square rounded-full transition-all duration-500 ease-editorial " +
                        (isActive ? "ring-[3px] ring-ink ring-offset-4 ring-offset-bg2 scale-95" : "group-hover:scale-95")
                      }
                      style={{
                        background: m.hex,
                        boxShadow: `inset 0 0 0 1px ${m.ring}, inset 6px 6px 18px ${m.ring}, inset -10px -10px 22px ${m.hex}`,
                      }}
                    />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-mute group-hover:text-ink transition-colors">
                      {String(materials.indexOf(m) + 1).padStart(2, "0")} · {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spec card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-line bg-bg p-8 lg:p-10 sticky top-32">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-klein mb-2">
                    Selected · {String(materials.indexOf(active) + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-4xl tracking-tightest leading-tight">{active.label}</h3>
                </div>
                <span
                  className="block w-16 h-16 rounded-full shrink-0"
                  style={{
                    background: active.hex,
                    boxShadow: `inset 0 0 0 1px ${active.ring}, inset 4px 4px 12px ${active.ring}`,
                  }}
                />
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[13px] font-mono mt-6 border-t border-line pt-6">
                <Row label="Fibre"   value={active.fibre}  />
                <Row label="Origin"  value={active.origin} />
                <Row label="Weight"  value={active.weight} />
                <Row label="Hand"    value={active.hand}   />
              </dl>

              <div className="mt-8 pt-6 border-t border-line flex items-start gap-3">
                <IconSpool className="w-5 h-5 text-klein shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-mute mb-1">Source</p>
                  <p className="text-[14px] leading-snug">{active.source}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-mute">
                <IconLeaf className="w-4 h-4 text-klein" />
                <IconWeave className="w-4 h-4 text-klein" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase">100% traceable · no synthetic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.25em] text-mute mb-1">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
