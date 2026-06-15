"use client";

import Image from "next/image";
import Link from "next/link";
import { IconAsterisk, IconArrowSlant, IconTag } from "./Icons";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";

/**
 * Two-page magazine spread treating one product as a featured story.
 * Drop-cap intro, pull-quote, byline, caption — replaces the
 * generic "featured product" card.
 */
export default function EditorialSpread() {
  const feature = products[0]; // Carlton

  return (
    <section className="px-6 lg:px-10 py-28 lg:py-36" id="studio">
      <div className="max-w-[1480px] mx-auto">

        {/* Spread header */}
        <div className="flex items-end justify-between border-b border-line pb-4 mb-12 lg:mb-16 font-mono text-[10px] tracking-[0.3em] uppercase text-mute">
          <span className="flex items-center gap-2 text-klein">
            <IconAsterisk className="w-3 h-3" />
            Editorial · Story 01
          </span>
          <span>Words · The studio</span>
          <span className="hidden md:inline">Photography · Atelier Naples</span>
          <span>Pp. 04 / 28</span>
        </div>

        <div className="grid grid-cols-12 gap-x-5 gap-y-8">

          {/* Left column — number + headline */}
          <div className="col-span-12 lg:col-span-7 lg:pr-8">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-2">No. 01</p>
            <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(38px,5.5vw,92px)]">
              The coat we&rsquo;ve been refining since {" "}
              <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>2014.</em>
            </h2>

            <div className="mt-10 columns-1 md:columns-2 gap-10 text-[15.5px] leading-relaxed text-ink">
              <p>
                <span className="font-display text-6xl float-left mr-2 leading-[0.85] tracking-tightest text-klein">T</span>
                he Carlton came out of a tailor&rsquo;s frustration. He wanted a coat
                that could be worn over a suit to dinner and over a sweater on the way
                back from the bakery — and he could not find one. So we made one with him
                in Naples, and have spent the eleven seasons since pulling tiny things out
                of it until it felt inevitable.
              </p>
              <p>
                The shoulder is dropped 4 cm from a traditional cut. The chest is half-lined
                with cotton bemberg. The pocket bags are denim, the buttons horn from a
                co-op in Catalonia. The cloth — 92% virgin Biella wool, 8% cashmere — is
                woven on a thirty-year-old loom in eight runs per year.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="relative mt-12 pl-6 border-l-2 border-klein max-w-md">
              <p className="font-display-italic text-2xl leading-tight tracking-tight text-klein"
                 style={{ fontFamily: "var(--font-display-italic)" }}>
                &ldquo;A coat is just two pieces of cloth. The question is which two.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-mute">— Tomaso, head tailor, Naples atelier</footer>
            </blockquote>

            <div className="mt-12 flex items-center gap-4">
              <Link
                href={`/product/${feature.slug}`}
                className="inline-flex items-center gap-3 bg-ink text-bg font-mono text-[11px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-klein transition-colors"
              >
                Read the spec sheet
                <IconArrowSlant className="w-3.5 h-3.5" />
              </Link>
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-mute flex items-center gap-2">
                <IconTag className="w-3.5 h-3.5 text-klein" />
                {formatPrice(feature.price)}
              </span>
            </div>
          </div>

          {/* Right column — stacked photographs */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <figure className="relative aspect-[4/5] skeleton overflow-hidden">
              <Image
                src={feature.images[0].src}
                alt={feature.images[0].alt}
                fill sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.25em] uppercase text-bg mix-blend-difference">
                Plate i — front · Naples, 2026
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure className="relative aspect-square skeleton overflow-hidden">
                <Image
                  src={feature.images[1].src}
                  alt={feature.images[1].alt}
                  fill sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.25em] uppercase text-bg mix-blend-difference">
                  Plate ii — back
                </figcaption>
              </figure>
              <div className="aspect-square bg-ink text-bg p-5 flex flex-col justify-between">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase">Spec — Carlton</p>
                <ul className="space-y-1 font-mono text-[11px] leading-relaxed">
                  <li className="flex justify-between"><span className="opacity-60">Cloth</span><span>Wool 92 · Cas 8</span></li>
                  <li className="flex justify-between"><span className="opacity-60">Weight</span><span>580 g/m²</span></li>
                  <li className="flex justify-between"><span className="opacity-60">Loom</span><span>1996, Biella</span></li>
                  <li className="flex justify-between"><span className="opacity-60">Buttons</span><span>Horn, Catalonia</span></li>
                  <li className="flex justify-between"><span className="opacity-60">Cut</span><span>Block 17.3</span></li>
                </ul>
                <p className="font-display-italic text-klein2 text-lg" style={{ fontFamily: "var(--font-display-italic)" }}>
                  fig. i
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
