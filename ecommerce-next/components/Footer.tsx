"use client";

import Link from "next/link";
import {
  IconStamp, IconAsterisk, IconCompass, IconScissors, IconLeaf, IconStar,
} from "./Icons";

/**
 * Masthead-style footer — designed to read like the last page of a print
 * magazine, with editorial credits, issue stamp, and contributor list.
 * Replaces the generic "links + newsletter" pattern.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-bg pt-20 pb-8">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">

        {/* Top — issue stamp + signup */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-bg/15 items-start">
          <div className="lg:col-span-6">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bg/55 mb-4 flex items-center gap-2">
              <IconAsterisk className="w-3 h-3 text-klein2" /> Masthead
            </p>
            <h2 className="font-display font-medium text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.04em]">
              Issue 01 — <em className="font-display-italic text-klein2 not-italic" style={{ fontFamily: "var(--font-display-italic)" }}>A wardrobe of quiet objects.</em>
            </h2>
            <p className="mt-6 text-bg/55 max-w-md text-[14px] leading-relaxed">
              Vol. 03 · No. 14 · Printed in Brooklyn on 80gsm uncoated stock.
              Available at our atelier, by mail, or as a PDF for members.
            </p>
          </div>

          <form
            className="lg:col-span-6 flex flex-col gap-4 lg:items-end justify-end"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bg/55">
              Receive the next issue
            </p>
            <div className="flex w-full max-w-md border-b border-bg/40 py-3">
              <input
                type="email"
                placeholder="email@inbox.com"
                className="flex-1 bg-transparent outline-none text-bg placeholder:text-bg/45"
              />
              <button className="font-mono text-[11px] tracking-[0.25em] uppercase hover:text-klein2 flex items-center gap-2">
                Subscribe <IconStamp className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-bg/45 max-w-md">
              One letter every two weeks. New collections, atelier notes, no marketing.
            </p>
          </form>
        </div>

        {/* Mid — credits + link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-6 py-16">
          {/* Brand block */}
          <div className="col-span-2 lg:col-span-4 max-w-sm">
            <p className="font-display text-3xl tracking-[-0.04em] leading-none">VESPER®</p>
            <p className="mt-4 text-sm text-bg/65 leading-relaxed">
              An independent studio building ten-year clothes from natural fibres.
              Designed in Brooklyn. Made in small ateliers across Europe and Asia.
            </p>
            <div className="mt-6 flex items-center gap-3 text-bg/55">
              <IconCompass className="w-4 h-4" />
              <IconScissors className="w-4 h-4" />
              <IconLeaf className="w-4 h-4" />
              <IconStar className="w-4 h-4" />
            </div>
          </div>

          {/* Editorial credits */}
          <div className="col-span-2 lg:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-klein2 mb-4">— Editorial</p>
            <ul className="text-sm space-y-2 text-bg/80">
              <li><span className="text-bg/45">Words</span> · The studio</li>
              <li><span className="text-bg/45">Photography</span> · Naples / Como</li>
              <li><span className="text-bg/45">Type</span> · Bricolage · Fraunces</li>
              <li><span className="text-bg/45">Paper</span> · Munken Pure 80gsm</li>
              <li><span className="text-bg/45">Bound by</span> · Atelier 12</li>
            </ul>
          </div>

          <FooterCol title="Shop" links={[
            ["Outerwear", "/shop?c=outerwear"],
            ["Knits", "/shop?c=knits"],
            ["Denim", "/shop?c=denim"],
            ["Accessories", "/shop?c=accessories"],
          ]}/>
          <FooterCol title="Studio" links={[
            ["About", "/#studio"],
            ["Ateliers", "/#studio"],
            ["Press", "/#"],
            ["Careers", "/#"],
          ]}/>
          <FooterCol title="Help" links={[
            ["Shipping", "/#"],
            ["Returns", "/#"],
            ["Care guide", "/#"],
            ["Contact", "/#"],
          ]}/>
        </div>

        {/* Big wordmark — magazine-style */}
        <div className="relative border-t border-bg/15 pt-12 pb-6">
          <p className="font-display tracking-[-0.06em] leading-[0.78] text-[clamp(72px,18vw,260px)] text-bg/[0.05] select-none uppercase">
            VESPER
          </p>
          {/* Issue stamp */}
          <div className="absolute right-6 lg:right-12 top-12 lg:top-16 -rotate-6">
            <div className="border-2 border-klein2 text-klein2 px-5 py-3 text-center">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase">Vol. 03 · No. 14</p>
              <p className="font-display text-3xl leading-none mt-1 tracking-[-0.03em]">A/W 26</p>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-1 opacity-80">Sept. 04 · 10:00 ET</p>
            </div>
          </div>
        </div>

        {/* Bottom — colophon */}
        <div className="border-t border-bg/15 pt-6 flex flex-col md:flex-row gap-3 justify-between text-[11px] text-bg/55 tracking-wide font-mono uppercase">
          <span>© 2026 Vesper Studio, LLC.</span>
          <span className="flex gap-5">
            <Link href="/#" className="hover:text-bg">Privacy</Link>
            <Link href="/#" className="hover:text-bg">Terms</Link>
            <Link href="/#" className="hover:text-bg">Accessibility</Link>
          </span>
          <span className="flex items-center gap-2">
            <IconCompass className="w-3 h-3 text-klein2" />
            Brooklyn · Paris · Tokyo
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="lg:col-span-2">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-klein2 mb-4">— {title}</p>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-klein2 transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
