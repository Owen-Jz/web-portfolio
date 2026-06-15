import { IconAsterisk, IconStar, IconStamp, IconLeaf, IconSpool, IconScissors } from "./Icons";

/**
 * A horizontal year-at-a-glance of the studio's drops.
 * Each drop has an icon, month tick, status (shipped / live / soon).
 * Replaces the standard "Coming soon" mailing-list section.
 */
export default function DropsTimeline() {
  const drops = [
    { code: "RS·01", title: "Resort 01",         month: "Feb 26", status: "shipped", icon: IconLeaf },
    { code: "SS·02", title: "Summer Editorial",  month: "May 26", status: "shipped", icon: IconSpool },
    { code: "AW·01", title: "Winter Editorial",  month: "Sep 26", status: "live",    icon: IconScissors },
    { code: "AW·02", title: "Holiday Capsule",   month: "Nov 26", status: "soon",    icon: IconStamp },
    { code: "RS·03", title: "Resort 03",         month: "Feb 27", status: "soon",    icon: IconStar },
  ];

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 bg-ink text-bg">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-end justify-between border-b border-bg/15 pb-4 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase text-bg/60">
          <span className="flex items-center gap-2 text-klein2">
            <IconAsterisk className="w-3 h-3" />
            Drops · 2026 / 27
          </span>
          <span>{drops.length} scheduled</span>
        </div>

        <h2 className="font-display font-medium tracking-[-0.04em] leading-[0.93] text-[clamp(36px,5vw,84px)] mb-14 max-w-3xl">
          The {" "}
          <em className="font-display-italic text-klein2" style={{ fontFamily: "var(--font-display-italic)" }}>
            calendar.
          </em>
        </h2>

        {/* Timeline */}
        <div className="relative">
          <div aria-hidden="true" className="absolute top-9 left-0 right-0 h-px bg-bg/20" />

          <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-3 relative">
            {drops.map((d) => {
              const I = d.icon;
              const tagColor =
                d.status === "live"    ? "bg-coral text-bg" :
                d.status === "shipped" ? "bg-bg text-ink"  :
                                         "border border-bg/25 text-bg/60";
              return (
                <li key={d.code} className="relative flex flex-col items-start">
                  {/* Node dot on the line */}
                  <span className="block w-4 h-4 rounded-full border-2 border-bg bg-ink z-10 relative" />
                  <p className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-bg/60">{d.month}</p>
                  <p className="font-display text-2xl tracking-tightest leading-tight mt-1">{d.title}</p>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-bg/40 mt-1">{d.code}</p>

                  <span className={`mt-4 font-mono text-[9px] tracking-[0.25em] uppercase px-2 py-1 inline-flex items-center gap-2 ${tagColor}`}>
                    <I className="w-3 h-3" />
                    {d.status === "live" ? "Live now" : d.status === "shipped" ? "Shipped" : "Coming"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
