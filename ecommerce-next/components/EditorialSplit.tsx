"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function EditorialSplit() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector(".ed-img img");
    if (!img) return;
    gsap.fromTo(img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  }, []);

  return (
    <section id="editorial" ref={ref} className="px-6 lg:px-10 py-32">
      <div className="grid lg:grid-cols-12 gap-10 max-w-[1480px] mx-auto items-center">
        <div className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-6">— The studio</p>
          <h2 className="font-display tracking-tightest leading-[0.95] text-[clamp(40px,5vw,80px)]">
            We make twelve <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>fewer</em> things, &nbsp;better.
          </h2>
          <p className="mt-8 text-mute text-[15px] leading-relaxed max-w-md">
            Vesper began in a Brooklyn studio over the question: <em>what would we wear in ten years?</em>
            The answer was a small, repeatable wardrobe of natural fibres,
            cut from the same patterns we&rsquo;ve been refining since 2014.
          </p>
          <ul className="mt-10 space-y-3 text-[14px] max-w-md">
            {[
              ["01", "Cut & sewn in five small ateliers, no factory bigger than 40 people."],
              ["02", "Every fibre traceable to a farm, a flock, or a co-op we&rsquo;ve visited."],
              ["03", "Public price list — you see exactly what we pay our makers."],
            ].map(([n, t]) => (
              <li key={n} className="flex gap-5 items-baseline border-b border-line pb-3">
                <span className="font-mono text-[12px] text-klein">{n}</span>
                <span className="text-ink" dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
          <Link
            href="/#"
            className="inline-flex items-center gap-3 mt-10 font-mono text-[11px] tracking-[0.25em] uppercase under-line pb-1"
          >
            Read the manifesto <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="ed-img lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative aspect-[4/5] overflow-hidden bg-bg2">
          <Image
            src="https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=1200&q=80"
            alt="Atelier"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover scale-110"
          />
          <div className="absolute bottom-4 left-4 text-bg mix-blend-difference font-mono text-[10px] tracking-[0.25em] uppercase">
            Atelier Naples · 2026
          </div>
        </div>
      </div>
    </section>
  );
}
