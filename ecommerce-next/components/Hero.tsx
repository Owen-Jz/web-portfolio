"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import Countdown from "./Countdown";
import {
  IconAsterisk, IconCompass, IconScissors, IconStamp,
  IconArrowSlant, IconStar,
} from "./Icons";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Magazine-cover hero — anti-template.
 * Vertical Issue / Vol strips frame an oversized wordmark + cover photo.
 * Cover blurbs (numbered badges) sit on top of the imagery the way a
 * print fashion magazine handles its front page. The familiar e-comm
 * "title-left / image-right" layout is intentionally absent.
 */
export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Wordmark letter-by-letter entrance
    const letters = el.querySelectorAll<HTMLElement>("[data-cover-letter]");
    gsap.set(letters, { yPercent: 110 });
    gsap.to(letters, {
      yPercent: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.04,
      delay: 0.25,
    });

    // Cover image scale-in
    const cover = el.querySelector(".cover-photo");
    if (cover) {
      gsap.fromTo(cover,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.2 }
      );
    }

    // Cover blurbs float in
    const blurbs = el.querySelectorAll<HTMLElement>("[data-blurb]");
    gsap.from(blurbs, {
      y: 24, opacity: 0,
      duration: 1, ease: "expo.out",
      stagger: 0.08, delay: 1.0,
    });

    // Scrub parallax on the cover photo
    const img = el.querySelector(".cover-photo img");
    if (img) {
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }

    // Auto-rotating stamp
    const stamp = el.querySelector(".cover-stamp");
    if (stamp) gsap.to(stamp, { rotate: 360, repeat: -1, duration: 26, ease: "none" });
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] pt-24 pb-10 px-6 lg:px-10 overflow-hidden bg-bg"
    >
      {/* Subtle grain / grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-[1480px] mx-auto h-full">
        {/* Top spec bar — like a magazine masthead */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase font-mono mb-6 lg:mb-8 border-b border-line pb-3">
          <span className="flex items-center gap-2">
            <IconAsterisk className="w-3.5 h-3.5 text-klein" />
            Issue 01 · Vol. 03
          </span>
          <span className="hidden md:flex items-center gap-2">
            <IconCompass className="w-3.5 h-3.5 text-klein" />
            40.7128° N · 74.0060° W
          </span>
          <span className="hidden lg:flex items-center gap-2">
            <IconScissors className="w-3.5 h-3.5 text-klein" />
            Cut by hand — Naples, Como, Inner Mongolia
          </span>
          <span className="flex items-center gap-2 text-klein">
            ● Live · Next drop in <Countdown target="2026-09-04T10:00:00Z" className="text-klein" />
          </span>
        </div>

        {/* Magazine cover grid */}
        <div className="grid grid-cols-12 gap-3 lg:gap-5 items-stretch">

          {/* LEFT strip — vertical metadata */}
          <aside className="hidden lg:flex col-span-1 flex-col items-start gap-6 pt-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase rotate-180 [writing-mode:vertical-rl] text-mute">
              Ten-year clothes
            </span>
            <IconStar className="w-5 h-5 text-klein" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-mute">$5.00</span>
          </aside>

          {/* CENTER — wordmark + cover photo + cover blurbs */}
          <div className="col-span-12 lg:col-span-10 relative">

            {/* Oversized wordmark */}
            <h1
              aria-label="VESPER — A wardrobe of quiet objects"
              className="font-display font-medium text-ink tracking-[-0.07em] leading-[0.78] text-center select-none mb-4 lg:mb-6"
              style={{ fontSize: "clamp(110px, 22.5vw, 360px)" }}
            >
              {"VESPER".split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-baseline">
                  <span data-cover-letter className="inline-block">{c}</span>
                </span>
              ))}
            </h1>

            {/* Cover photo with overlays */}
            <div className="cover-photo relative aspect-[16/9] lg:aspect-[2.4/1] overflow-hidden skeleton">
              {/* unoptimized = skip the Next.js Image proxy for this one
                  hero photo. The proxy's default 7s upstream timeout is
                  brittle for large Unsplash images on cold cache and was
                  returning 500. The browser fetches direct from Unsplash
                  with native lazy/eager loading. */}
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80"
                alt="A/W 26 cover look"
                fill priority unoptimized
                sizes="100vw"
                className="object-cover"
              />

              {/* Cover blurb top-left */}
              <div data-blurb className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-bg text-ink px-3 py-2">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase">— Cover</p>
                <p className="font-display text-2xl sm:text-3xl leading-none tracking-tightest mt-1">Look 01</p>
              </div>

              {/* Cover blurb top-right — rotated tag */}
              <div data-blurb className="absolute top-4 right-4 sm:top-6 sm:right-6 -rotate-3">
                <div className="bg-coral text-bg px-3 py-2 flex items-center gap-2">
                  <IconStamp className="w-4 h-4" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase">12 new pieces</span>
                </div>
              </div>

              {/* Bottom-left — captioned price */}
              <div data-blurb className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 mix-blend-difference text-bg">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">— Worn</p>
                <p className="font-display text-xl leading-tight mt-1">Carlton overcoat <em className="font-display-italic text-klein2" style={{fontFamily:"var(--font-display-italic)"}}>· $890</em></p>
              </div>

              {/* Bottom-right — rotating stamp */}
              <div data-blurb className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <div className="cover-stamp relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-klein text-bg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <defs>
                      <path id="coverArc" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                    </defs>
                    <text fill="currentColor" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3">
                      <textPath href="#coverArc">A/W 26 · WINTER EDITORIAL · A/W 26 ·</textPath>
                    </text>
                  </svg>
                  <IconAsterisk className="w-7 h-7" />
                </div>
              </div>
            </div>

            {/* Below cover — sub-headline + CTA */}
            <div className="mt-6 lg:mt-8 grid grid-cols-12 gap-3 items-end">
              <div className="col-span-12 md:col-span-7">
                <p className="font-display tracking-tightest text-[clamp(20px,2.8vw,40px)] leading-[1.05]">
                  A wardrobe of <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>quiet</em> objects —
                  tailored in Naples, knit in Mongolia, sewn in Saint-Malo.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center md:justify-end gap-3 flex-wrap">
                <MagneticButton
                  as={Link}
                  href="/shop"
                  className="inline-flex items-center gap-3 bg-ink text-bg font-mono text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-klein"
                >
                  <span>Shop A/W 26</span>
                  <IconArrowSlant className="w-3.5 h-3.5" />
                </MagneticButton>
                <Link href="#studio" className="under-line font-mono text-[11px] tracking-[0.25em] uppercase pb-1">
                  The studio
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT strip — vertical metadata */}
          <aside className="hidden lg:flex col-span-1 flex-col items-end justify-between pt-2 pb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase rotate-180 [writing-mode:vertical-rl] text-mute">
              Brooklyn — 2026
            </span>
            <IconCompass className="w-5 h-5 text-klein" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-mute">No. 14</span>
          </aside>
        </div>
      </div>
    </section>
  );
}
