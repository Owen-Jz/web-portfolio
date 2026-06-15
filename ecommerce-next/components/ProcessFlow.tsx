import { IconLeaf, IconWeave, IconScissors, IconDoor, IconAsterisk } from "./Icons";

/**
 * Process diagram — flow of the garment from farm to wearer.
 * Anti-template: e-comm sites use a horizontal "Why us" feature row;
 * this reads like a museum-display schematic.
 */
export default function ProcessFlow() {
  const steps = [
    { n: "01", label: "Farm",    note: "Fibre grown by named co-ops we visit yearly.",      icon: IconLeaf },
    { n: "02", label: "Mill",    note: "Woven, dyed and finished — no synthetic blends.",   icon: IconWeave },
    { n: "03", label: "Atelier", note: "Cut & sewn by hand in five small workshops.",       icon: IconScissors },
    { n: "04", label: "You",     note: "Carbon-neutral delivery and a 30-day return.",      icon: IconDoor },
  ];

  return (
    <section className="px-6 lg:px-10 py-28 lg:py-36 bg-bg border-y border-line">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-end justify-between border-b border-line pb-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-mute">
          <span className="flex items-center gap-2 text-klein">
            <IconAsterisk className="w-3 h-3" /> Schema · How it happens
          </span>
          <span>Fig. ii</span>
        </div>

        <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(40px,5.5vw,96px)] mb-16 max-w-3xl">
          A four-step {" "}
          <em className="font-display-italic text-klein" style={{ fontFamily: "var(--font-display-italic)" }}>chain</em>
          {" "} you can read end-to-end.
        </h2>

        {/* Schematic */}
        <div className="relative">
          {/* Connecting line */}
          <div aria-hidden="true" className="hidden lg:block absolute top-12 left-[6%] right-[6%] h-px border-t border-dashed border-line" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {steps.map((s, i) => {
              const I = s.icon;
              return (
                <div key={s.n} className="relative flex flex-col items-start">
                  {/* Numbered node */}
                  <div className="relative bg-bg pr-4 mb-6">
                    <span className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-ink relative">
                      <I className="w-9 h-9 text-ink" />
                      <span className="absolute -top-3 -right-3 bg-klein text-bg font-mono text-[10px] tracking-[0.2em] px-2 py-1">
                        {s.n}
                      </span>
                    </span>
                  </div>

                  <h3 className="font-display text-3xl tracking-tightest leading-tight mb-2">{s.label}</h3>
                  <p className="text-[14px] leading-relaxed text-mute max-w-xs">{s.note}</p>

                  {/* Arrow connector at the right edge */}
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden lg:block absolute top-12 -right-2 text-klein text-lg">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
