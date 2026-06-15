import { IconSeam, IconLeaf, IconRuler, IconAsterisk } from "./Icons";

/**
 * Brand-statement band — replaces the standard "Our mission" block.
 * Oversized type that bleeds across the viewport, with icons inline
 * as if they were part of the typography itself.
 */
export default function StatementBand() {
  return (
    <section className="px-6 lg:px-10 py-28 lg:py-36 border-y border-line bg-bg">
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-12 gap-4 items-baseline">
          <p className="col-span-12 lg:col-span-2 font-mono text-[10px] tracking-[0.3em] uppercase text-klein mb-6 lg:mb-0">
            <IconAsterisk className="w-3 h-3 inline -translate-y-0.5 mr-1.5"/>
            Manifesto
          </p>

          <h2 className="col-span-12 lg:col-span-10 font-display font-medium tracking-[-0.045em] leading-[0.92] text-[clamp(40px,7vw,128px)]">
            We make {" "}
            <span className="inline-flex items-center gap-3 align-baseline">
              <IconRuler className="w-[0.6em] h-[0.6em] text-klein -translate-y-1" />
              twelve
            </span>
            {" "} fewer things, {" "}
            <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>
              better.
            </em>
            <br />
            For the{" "}
            <span className="inline-flex items-center gap-3 align-baseline">
              <IconSeam className="w-[0.7em] h-[0.7em] text-klein -translate-y-1" />
              tenth wear.
            </span>{" "}
            Not the first.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-16 pt-8 border-t border-line">
          {[
            { icon: IconLeaf,   k: "01", t: "Natural fibre",  v: "Every fibre traceable to a farm, flock or co-op we have visited in person." },
            { icon: IconRuler,  k: "02", t: "One pattern",    v: "Each block is refined for years before it goes into production — never re-cut for a season." },
            { icon: IconSeam,   k: "03", t: "Small ateliers", v: "Five workshops, none bigger than forty people. Every maker named on the price list." },
          ].map(({ icon: I, k, t, v }) => (
            <div key={k} className="col-span-12 md:col-span-4 flex gap-5">
              <I className="w-9 h-9 shrink-0 text-klein" />
              <div>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mute mb-2">{k} · {t}</p>
                <p className="text-[15px] leading-relaxed text-ink max-w-xs">{v}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
