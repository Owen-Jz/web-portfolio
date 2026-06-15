import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatementBand from "@/components/StatementBand";
import EditorialSpread from "@/components/EditorialSpread";
import MaterialLibrary from "@/components/MaterialLibrary";
import ProcessFlow from "@/components/ProcessFlow";
import DropsTimeline from "@/components/DropsTimeline";
import MembershipCard from "@/components/MembershipCard";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import {
  IconAsterisk, IconScissors, IconLeaf, IconCompass,
  IconStamp, IconArrowSlant,
} from "@/components/Icons";

export default function Home() {
  const newIn = products.filter((p) => p.isNew).slice(0, 4);
  const allFour = newIn.length === 4 ? newIn : products.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Utility marquee — iconified */}
      <div className="bg-ink text-bg py-4 border-y border-line/10">
        <Marquee speed={48}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-flex items-center font-mono text-[12px] tracking-[0.25em] uppercase">
              <IconLeaf className="w-3.5 h-3.5 mx-3 text-klein2" />
              <span className="mx-3">100% natural fibre</span>
              <IconStamp className="w-3.5 h-3.5 mx-3 text-klein2" />
              <span className="mx-3">Atelier-direct pricing</span>
              <IconScissors className="w-3.5 h-3.5 mx-3 text-klein2" />
              <span className="mx-3">Cut by hand · five workshops</span>
              <IconCompass className="w-3.5 h-3.5 mx-3 text-klein2" />
              <span className="mx-3">Brooklyn · Naples · Como · Ulaanbaatar</span>
              <IconAsterisk className="w-3.5 h-3.5 mx-3 text-klein2" />
              <span className="mx-3">Free carbon-neutral shipping over $250</span>
            </span>
          ))}
        </Marquee>
      </div>

      <StatementBand />

      <EditorialSpread />

      {/* INDEX — featured pieces presented like a catalog index */}
      <section className="px-6 lg:px-10 py-28 lg:py-36">
        <div className="max-w-[1480px] mx-auto">
          <div className="flex items-end justify-between border-b border-line pb-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-mute">
            <span className="flex items-center gap-2 text-klein">
              <IconAsterisk className="w-3 h-3" />
              Index · Pp. 08
            </span>
            <span>{allFour.length} pieces in this issue</span>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-2 hover:text-ink">
              See full catalog <IconArrowSlant className="w-3 h-3" />
            </Link>
          </div>

          <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(40px,5.5vw,96px)] mb-14">
            The {" "}
            <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>
              new
            </em>
            {" "} ones.
          </h2>

          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12 lg:gap-x-6 lg:gap-y-16">
            {allFour.map((p, i) => (
              <li key={p.slug} className="relative">
                <span className="absolute -top-4 left-0 font-mono text-[10px] tracking-[0.25em] text-klein z-10">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <ProductCard product={p} eager={i < 2} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MaterialLibrary />

      <ProcessFlow />

      <DropsTimeline />

      <MembershipCard />

      {/* JOURNAL — three articles styled like newspaper teasers */}
      <section className="px-6 lg:px-10 pb-32" id="journal">
        <div className="max-w-[1480px] mx-auto">
          <div className="flex items-end justify-between border-b border-line pb-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-mute">
            <span className="flex items-center gap-2 text-klein">
              <IconAsterisk className="w-3 h-3" /> Journal
            </span>
            <span>Three field notes</span>
          </div>

          <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(36px,5vw,80px)] mb-14">
            Field {" "}
            <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>
              notes.
            </em>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { tag: "Atelier",  title: "Two weeks in the Naples tailor shop", img: "1542272604-787c3835535d", read: "8 min" },
              { tag: "Material", title: "Why we left synthetic dyes behind",   img: "1581094288338-2314dddb7ece", read: "6 min" },
              { tag: "Studio",   title: "Our price list, explained line by line", img: "1551488831-00ddcb6c6bd3", read: "4 min" },
            ].map((a, i) => (
              <article key={a.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-bg2 mb-5">
                  <Image
                    src={`https://images.unsplash.com/photo-${a.img}?auto=format&fit=crop&w=900&q=80`}
                    alt={a.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.25em] uppercase bg-bg text-ink px-2 py-1">
                    No. {String(i + 1).padStart(2, "0")} · {a.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-tightest leading-tight mb-2">{a.title}</h3>
                <p className="text-[11px] text-mute font-mono uppercase tracking-wider">{a.read} read · By the studio</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
