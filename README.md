# web-portfolio

Five web projects sharing one animation foundation (Lenis smooth scroll + GSAP + ScrollTrigger), each with a completely distinct visual identity.

| # | Folder | Brand | Domain | Visual identity | Stack |
|---|---|---|---|---|---|
| 1 | [`gym-website/`](./gym-website) | **IRONPULSE** | Gym / fitness | Brutalist black + hi-vis orange · Anton display + Inter | HTML + CSS + JS · Lenis + GSAP |
| 2 | [`catering-website/`](./catering-website) | **OLIVE & EMBER** | Bespoke catering | Warm cream + tomato + olive · Fraunces + Caveat handwritten | HTML + CSS + JS · Lenis + GSAP + Three.js (garnish particles) |
| 3 | [`ecommerce-next/`](./ecommerce-next) | **VESPER®** | Independent fashion studio | Bone off-white + Klein blue + coral · Bricolage Grotesque + Fraunces italic | Next.js 15 + TypeScript + Tailwind v3 + GSAP + Lenis |
| 4 | [`logistics-website/`](./logistics-website) | **MERIDIAN** | Freight / logistics | Deep navy + hi-vis amber + lime · Space Grotesk + JetBrains Mono | HTML + CSS + JS · Lenis + GSAP + Three.js (single persistent 3D globe) |
| 5 | [`saas-website/`](./saas-website) | **PRISM** | AI gateway · LLM router | Warm near-black + signature orange + gold · Inter Tight + DM Sans | HTML + CSS + JS · Lenis + GSAP |

---

## Running each site

### Static sites (1, 2, 4, 5)
```bash
cd <folder>
python3 -m http.server 8000
# open http://127.0.0.1:8000
```

### Vesper (Next.js)
```bash
cd ecommerce-next
npm install
npm run dev
# open http://localhost:3000
```

---

## Shared techniques

Every site reuses the same animation backbone but applies it through different visual grammars:

- **Lenis smooth scroll** piped into the GSAP ticker so `ScrollTrigger.update()` runs in lock-step with the smoothed scroll position
- **`yPercent: 110` line-mask reveals** for every section title — JS-owned initial state so GSAP can animate them (CSS `translateY` defeats GSAP)
- **Marquee strips** as either CSS keyframe loops or duplicated tracks
- **Custom inline-SVG icon sets** per brand (no Heroicons / Lucide)
- **Live tickers + count-up KPIs** for that "operational" feel
- **Hand-built loaders** matched to each brand voice

## What's distinctive per site

- **Ironpulse** — pinned horizontal scroll for the programs section
- **Olive & Ember** — polaroid-tilt photo stack, animated hand-drawn squiggle SVG that draws itself in as the line lands
- **Vesper** — magazine-cover hero (Issue / Vol / cover blurbs), interactive material library with circular fabric swatches, 3D-tilting Founders Circle credit card
- **Meridian** — **a single persistent 3D Three.js globe** that drifts between every section as you scroll. One scene, lerped position / scale / rotation / opacity between per-section anchor states.
- **Prism** — live "router console" hero that cycles through 4 routing scenarios every 4.5s (incoming request → 4-model comparison → CHOSEN highlight → streaming response with cost savings)

---

Built across one session.
