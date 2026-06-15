/* ============================================================
   PRISM — Interactions
   Lenis + GSAP + ScrollTrigger + Three.js
   Plus: terminal typing, code-tab SDK, sparkline, pricing slider,
   architecture-flow pulses, live counters.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. LOADER — quick boot, fade out
  ---------------------------------------------------------- */
  const loader   = document.getElementById("loader");
  const fill     = document.getElementById("loaderFill");
  const stepEl   = document.getElementById("loaderStep");
  document.body.style.overflow = "hidden";

  const steps = [
    "initializing intelligence layer",
    "warming up smart router",
    "connecting to 23 providers",
    "syncing semantic cache",
    "ready",
  ];
  let stepIdx = 0;
  let pct = 0;
  const tick = setInterval(() => {
    pct += 4 + Math.random() * 7;
    if (pct >= 100) {
      pct = 100;
      clearInterval(tick);
      stepEl.textContent = "ready";
      fill.style.right = "0%";
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.style.overflow = "";
        startEntrance();
      }, 500);
    } else {
      const ns = Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length));
      if (ns !== stepIdx) { stepIdx = ns; stepEl.textContent = steps[ns]; }
      fill.style.right = (100 - pct) + "%";
    }
  }, 90);

  /* ----------------------------------------------------------
     2. LENIS smooth scroll piped into GSAP ticker
  ---------------------------------------------------------- */
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     3. NAV scroll state
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -20",
    onUpdate: (s) => nav.classList.toggle("is-scrolled", s.scroll() > 40),
  });

  /* ----------------------------------------------------------
     4. ENTRANCE — hero reveals
  ---------------------------------------------------------- */
  gsap.set(".reveal", { yPercent: 110 });

  function startEntrance() {
    const heroLines = document.querySelectorAll(".hero-title .reveal");
    gsap.to(heroLines, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.08 });
    gsap.from(".hero-chip",       { y: 16, opacity: 0, duration: .9, delay: .1,  ease: "power3.out" });
    gsap.from(".hero-sub",        { y: 18, opacity: 0, duration: .9, delay: .9,  ease: "power3.out" });
    gsap.from(".hero-cta",        { y: 18, opacity: 0, duration: .9, delay: 1.0, ease: "power3.out" });
    gsap.from(".hero-trust",      { y: 18, opacity: 0, duration: .9, delay: 1.1, ease: "power3.out" });
    gsap.from(".router-console",  { x: 60, opacity: 0, duration: 1.1, delay: .6, ease: "expo.out" });
    gsap.from(".hero-side-card",  { y: 30, opacity: 0, duration: .9, delay: 1.0, ease: "power3.out" });
    gsap.from(".nav",             { y: -30, opacity: 0, duration: .8, delay: .15, ease: "power3.out" });
  }

  /* ----------------------------------------------------------
     5. Generic section reveals
  ---------------------------------------------------------- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero-title")) return;
    ScrollTrigger.create({
      trigger: el, start: "top 90%",
      onEnter: () => gsap.to(el, { yPercent: 0, duration: 1, ease: "expo.out" }),
    });
  });

  /* ----------------------------------------------------------
     6. HERO ROUTER CONSOLE — cycles through different routing
     scenarios so the user sees PRISM actually working.
     Replaces the 3D icosahedron that fought with the gradient
     text and didn't actually communicate the product.
  ---------------------------------------------------------- */
  const scenarios = [
    {
      prompt: '"Summarize this support ticket and rate urgency 1–5."',
      tokens: "2,840 tok", user: "team:cursor", strategy: "cost-first",
      chosen: "gemini",
      resp: "Customer is frustrated about a delayed order #4827. Wants refund or replacement. Last contact 3 days ago, no reply. Urgency:&nbsp;",
      urg: "4", chose: "google/gemini-2.5", lat: "98<i>ms</i>", saved: "54%",
    },
    {
      prompt: '"Translate this legal brief to Japanese and flag risks."',
      tokens: "12,418 tok", user: "team:linear", strategy: "quality-first",
      chosen: "claude",
      resp: "翻訳済み。注意: 第3条の責任制限条項が日本の消費者契約法に抵触する可能性があります&nbsp;",
      urg: "3", chose: "anthropic/claude-4.5", lat: "180<i>ms</i>", saved: "32%",
    },
    {
      prompt: '"Write a unit test for this React useHook."',
      tokens: "1,204 tok", user: "team:vercel", strategy: "latency-first",
      chosen: "gpt",
      resp: "describe(useDebounce, () => { it('returns the latest value after delay'…&nbsp;",
      urg: "—", chose: "openai/gpt-4o", lat: "142<i>ms</i>", saved: "18%",
    },
    {
      prompt: '"Classify this product photo: shoe/bag/jacket/other."',
      tokens: "896 tok", user: "team:retool", strategy: "cheapest",
      chosen: "mistral",
      resp: "Classification: jacket (0.94 confidence). Secondary: bag (0.04)&nbsp;",
      urg: "—", chose: "mistral/large", lat: "112<i>ms</i>", saved: "71%",
    },
  ];

  const els = {
    prompt:  document.getElementById("rcPrompt"),
    tokens:  document.getElementById("rcTokens"),
    user:    document.getElementById("rcUser"),
    strategy: document.getElementById("rcStrategy"),
    options: document.getElementById("rcOptions"),
    resp:    document.getElementById("rcResp"),
    urg:     document.getElementById("rcUrg"),
    chose:   document.getElementById("rcChose"),
    lat:     document.getElementById("rcLat"),
    saved:   document.getElementById("rcSaved"),
  };
  let sIdx = 0;
  function renderScenario(s) {
    if (!els.prompt) return;
    els.prompt.textContent  = s.prompt;
    els.tokens.textContent  = s.tokens;
    els.user.textContent    = s.user;
    els.strategy.textContent = s.strategy;
    els.options.querySelectorAll(".rc-opt").forEach((opt) => {
      opt.classList.toggle("is-chosen", opt.dataset.key === s.chosen);
    });
    els.resp.innerHTML = s.resp;
    els.urg.textContent = s.urg;
    els.chose.textContent = s.chose;
    els.lat.innerHTML = s.lat;
    els.saved.textContent = s.saved;
  }
  // Render first scenario, then rotate
  renderScenario(scenarios[0]);
  setInterval(() => {
    sIdx = (sIdx + 1) % scenarios.length;
    // Soft fade out → swap → fade in for each step
    const steps = document.querySelectorAll(".rc-step");
    gsap.to(steps, { opacity: 0.25, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        renderScenario(scenarios[sIdx]);
        gsap.to(steps, { opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.08 });
      }
    });
  }, 4500);

  /* ----------------------------------------------------------
     7. HERO LIVE COUNTER — tokens-routed-this-hour ticker
  ---------------------------------------------------------- */
  const liveTokens = document.getElementById("liveTokens");
  if (liveTokens) {
    let v = 47_219_304_118;
    setInterval(() => {
      v += Math.floor(120 + Math.random() * 380);
      liveTokens.textContent = v.toLocaleString();
    }, 250);
  }

  /* ----------------------------------------------------------
     8. TERMINAL — typed-out demo code in the demo section
  ---------------------------------------------------------- */
  const termBody = document.getElementById("termBody");
  const termLines = [
    { txt: "# point at PRISM instead of OpenAI", c: "c" },
    { txt: "import os", c: "k" },
    { txt: "from openai import OpenAI", c: "k" },
    { txt: "", c: "" },
    { txt: "client = OpenAI(", c: "n" },
    { txt: "    api_key=os.environ['PRISM_KEY'],", c: "" },
    { txt: "    base_url='https://api.prism.ai/v1',", c: "s" },
    { txt: ")", c: "n" },
    { txt: "", c: "" },
    { txt: "# PRISM picks the best model for the job", c: "c" },
    { txt: "resp = client.chat.completions.create(", c: "n" },
    { txt: "    model='auto',", c: "p" },
    { txt: "    messages=[{'role':'user','content':'Plan my week.'}],", c: "" },
    { txt: "    extra_body={", c: "" },
    { txt: "        'route': {'strategy': 'cheapest'},", c: "" },
    { txt: "        'cache': True,", c: "" },
    { txt: "        'fallback': ['anthropic/claude-4.5', 'google/gemini-2.5'],", c: "s" },
    { txt: "    },", c: "" },
    { txt: ")", c: "n" },
    { txt: "", c: "" },
    { txt: "# {router: 'cost-first' -> openai/gpt-4o-mini, $0.0042}", c: "c" },
    { txt: "print(resp.choices[0].message.content)", c: "k" },
  ];

  if (termBody) {
    const startTyping = () => {
      termBody.innerHTML = "";
      let li = 0, ci = 0;
      const next = () => {
        if (li >= termLines.length) {
          // Loop after a pause
          setTimeout(startTyping, 4000);
          return;
        }
        const L = termLines[li];
        if (ci === 0) {
          const span = document.createElement("span");
          span.className = "ln-" + (L.c || "");
          span.dataset.idx = li;
          termBody.appendChild(span);
          if (li > 0) termBody.appendChild(document.createTextNode("\n"));
        }
        const span = termBody.querySelector(`[data-idx="${li}"]`);
        const ch = L.txt[ci];
        if (ch !== undefined) {
          span.textContent += ch;
          ci++;
          setTimeout(next, L.txt.length === 0 ? 30 : 14 + Math.random() * 18);
        } else {
          li++; ci = 0;
          setTimeout(next, 120);
        }
      };
      next();
    };

    // Kick off typing when the terminal scrolls into view
    ScrollTrigger.create({
      trigger: ".term", start: "top 80%", once: true,
      onEnter: startTyping,
    });
  }

  /* ----------------------------------------------------------
     9. DEMO SIDE — rotate the "current provider" highlighted block
  ---------------------------------------------------------- */
  const dsProv = document.getElementById("dsProv");
  const dsTps  = document.getElementById("dsTps");
  const dsTtft = document.getElementById("dsTtft");
  const dsCost = document.getElementById("dsCost");
  const dsBlocks = document.querySelectorAll(".ds-block");
  const provs = [
    { name: "GPT-4o",   tps: 198, ttft: "142ms", cost: "$0.0042" },
    { name: "Claude",   tps: 156, ttft: "180ms", cost: "$0.0028" },
    { name: "Gemini",   tps: 220, ttft: "98ms",  cost: "$0.0019" },
  ];
  let provIdx = 0;
  setInterval(() => {
    provIdx = (provIdx + 1) % provs.length;
    const p = provs[provIdx];
    if (dsProv) dsProv.textContent = p.name;
    if (dsTps)  dsTps.textContent  = p.tps;
    if (dsTtft) dsTtft.textContent = p.ttft;
    if (dsCost) dsCost.textContent = p.cost;
    dsBlocks.forEach((b, i) => b.style.opacity = i === provIdx ? "1" : "0.35");
  }, 2400);

  /* ----------------------------------------------------------
     10. ARCHITECTURE — animate pulses along the SVG paths
  ---------------------------------------------------------- */
  const archSvg = document.querySelector(".arch-svg");
  if (archSvg) {
    const pulses = archSvg.querySelectorAll(".pulse");
    const edgeIds = ["e1", "e2", "e3", "e4", "e5"];
    const userPath = archSvg.querySelector(".edge-user");

    function animatePulse(pulse, path, dur, delay = 0, color) {
      const len = path.getTotalLength();
      if (color) pulse.setAttribute("fill", color);
      const obj = { t: 0 };
      gsap.to(obj, {
        t: 1, duration: dur, delay,
        ease: "power2.inOut",
        repeat: -1, repeatDelay: 0.5,
        onUpdate: () => {
          const p = path.getPointAtLength(obj.t * len);
          pulse.setAttribute("cx", p.x);
          pulse.setAttribute("cy", p.y);
          pulse.setAttribute("opacity", (Math.sin(obj.t * Math.PI)).toString());
        }
      });
    }

    if (pulses.length >= 3 && userPath) {
      pulses.forEach((p, i) => {
        const path = i === 0 ? userPath : archSvg.querySelector("." + edgeIds[(i - 1) % edgeIds.length]);
        animatePulse(p, path, 2.6 + i * 0.6, i * 0.4);
      });
    }
  }

  /* ----------------------------------------------------------
     11. SDK — tabbed multi-language code, with simple styling
  ---------------------------------------------------------- */
  const snippets = {
    py: `<span class="c"># pip install prism</span>
<span class="k">from</span> prism <span class="k">import</span> Client

client <span class="p">=</span> Client(api_key<span class="p">=</span><span class="s">"sk-prism-..."</span>)

response <span class="p">=</span> client<span class="p">.</span>chat<span class="p">.</span>complete(
    model<span class="p">=</span><span class="s">"auto"</span>,
    messages<span class="p">=</span>[{<span class="s">"role"</span><span class="p">:</span> <span class="s">"user"</span>, <span class="s">"content"</span><span class="p">:</span> <span class="s">"Hello, models."</span>}],
    route<span class="p">=</span>{<span class="s">"strategy"</span><span class="p">:</span> <span class="s">"quality-first"</span>, <span class="s">"fallback"</span><span class="p">:</span> [<span class="s">"openai/gpt-4o"</span>, <span class="s">"anthropic/claude-4.5"</span>]},
    cache<span class="p">=</span><span class="n">True</span>,
)
<span class="k">print</span>(response<span class="p">.</span>choices[<span class="n">0</span>]<span class="p">.</span>text)`,

    ts: `<span class="c">// npm i @prism/sdk</span>
<span class="k">import</span> { Prism } <span class="k">from</span> <span class="s">"@prism/sdk"</span>;

<span class="k">const</span> prism <span class="p">=</span> <span class="k">new</span> Prism({ apiKey<span class="p">:</span> process<span class="p">.</span>env<span class="p">.</span>PRISM_KEY });

<span class="k">const</span> { text, provider, cost } <span class="p">=</span> <span class="k">await</span> prism<span class="p">.</span>chat({
  model<span class="p">:</span> <span class="s">"auto"</span>,
  messages<span class="p">:</span> [{ role<span class="p">:</span> <span class="s">"user"</span>, content<span class="p">:</span> <span class="s">"Hello, models."</span> }],
  route<span class="p">:</span> { strategy<span class="p">:</span> <span class="s">"cheapest"</span> },
  cache<span class="p">:</span> <span class="n">true</span>,
});

console<span class="p">.</span>log({ text, provider, cost });
<span class="c">// → { text: "Hello!", provider: "google/gemini-2.5", cost: 0.0019 }</span>`,

    go: `<span class="c">// go get github.com/prism-ai/sdk-go</span>
<span class="k">package</span> main

<span class="k">import</span> (
    <span class="s">"context"</span>
    <span class="s">"github.com/prism-ai/sdk-go"</span>
)

<span class="k">func</span> main() {
    client <span class="p">:=</span> prism<span class="p">.</span>New(prism<span class="p">.</span>Config{
        APIKey<span class="p">:</span>   os<span class="p">.</span>Getenv(<span class="s">"PRISM_KEY"</span>),
        Strategy<span class="p">:</span> prism<span class="p">.</span>QualityFirst,
        Cache<span class="p">:</span>    <span class="n">true</span>,
    })

    resp, _ <span class="p">:=</span> client<span class="p">.</span>Chat(ctx, prism<span class="p">.</span>ChatReq{
        Model<span class="p">:</span> <span class="s">"auto"</span>,
        Messages<span class="p">:</span> [{Role<span class="p">:</span> <span class="s">"user"</span>, Content<span class="p">:</span> <span class="s">"Hello, models."</span>}],
    })
    fmt<span class="p">.</span>Println(resp<span class="p">.</span>Text, resp<span class="p">.</span>Provider, resp<span class="p">.</span>Cost)
}`,

    curl: `<span class="c"># 100% OpenAI-compatible — point base_url at PRISM</span>
<span class="k">curl</span> https<span class="p">://</span>api<span class="p">.</span>prism<span class="p">.</span>ai<span class="p">/</span>v1<span class="p">/</span>chat<span class="p">/</span>completions <span class="p">\\</span>
  -H <span class="s">"Authorization: Bearer $PRISM_KEY"</span> <span class="p">\\</span>
  -H <span class="s">"Content-Type: application/json"</span> <span class="p">\\</span>
  -d <span class="s">'{
    "model": "auto",
    "messages": [{"role":"user","content":"Hello, models."}],
    "extra_body": {
      "route": {"strategy":"cheapest","fallback":["openai/gpt-4o","anthropic/claude-4.5"]},
      "cache": true
    }
  }'</span>`,
  };
  const sdkCode = document.getElementById("sdkCode");
  const sdkTabs = document.querySelectorAll(".sdk-tab");
  const renderLang = (lang) => { if (sdkCode) sdkCode.innerHTML = snippets[lang]; };
  if (sdkCode) renderLang("py");
  sdkTabs.forEach((t) => t.addEventListener("click", () => {
    sdkTabs.forEach((x) => x.classList.remove("is-active"));
    t.classList.add("is-active");
    renderLang(t.dataset.lang);
  }));

  /* ----------------------------------------------------------
     12. DASHBOARD — sparkline + KPI ticker
  ---------------------------------------------------------- */
  const sparkPath = document.getElementById("sparkPath");
  const sparkArea = document.getElementById("sparkArea");
  if (sparkPath && sparkArea) {
    const N = 60;
    const data = Array.from({ length: N }, () => 30 + Math.random() * 70);

    const draw = () => {
      const step = 600 / (N - 1);
      const norm = data.map((v) => 130 - (v * 1.1));
      let d = `M 0 ${norm[0].toFixed(1)}`;
      for (let i = 1; i < N; i++) {
        const x = (i * step).toFixed(1);
        const y = norm[i].toFixed(1);
        d += ` L ${x} ${y}`;
      }
      sparkPath.setAttribute("d", d);
      sparkArea.setAttribute("d", d + ` L 600 140 L 0 140 Z`);
    };
    draw();

    // Rolling update
    setInterval(() => {
      data.shift();
      const last = data[data.length - 1];
      const next = Math.max(10, Math.min(110, last + (Math.random() - 0.5) * 30));
      data.push(next);
      draw();
    }, 1200);
  }
  const dashTps = document.getElementById("dashTps");
  if (dashTps) {
    let v = 2184;
    setInterval(() => {
      v += Math.floor((Math.random() - 0.3) * 80);
      dashTps.textContent = v.toLocaleString();
    }, 1500);
  }

  /* ----------------------------------------------------------
     13. PRICING SLIDER — logarithmic tokens → monthly cost
  ---------------------------------------------------------- */
  const range = document.getElementById("psRange");
  const psVolume   = document.getElementById("psVolume");
  const psProvider = document.getElementById("psProvider");
  const psMargin   = document.getElementById("psMargin");
  const psTotal    = document.getElementById("psTotal");
  const psSavings  = document.getElementById("psSavings");

  const fmtTokens = (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(0) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(0) + "k";
    return n.toString();
  };
  const fmt$ = (n) => "$" + Math.round(n).toLocaleString();

  const updatePricing = () => {
    const r = parseFloat(range.value) / 100; // 0..1
    const tokens = Math.round(1e5 * Math.pow(10000, r)); // log scale 100k → 1B
    psVolume.textContent = fmtTokens(tokens);
    // Provider blended cost: $20 / 1M (typical)
    const providerCost = (tokens / 1e6) * 20;
    // PRISM margin: $10 / 1M (lower at scale; clipped at floor)
    const margin = Math.max(5, (tokens / 1e6) * 10);
    const total = providerCost + margin;
    psProvider.textContent = fmt$(providerCost);
    psMargin.textContent   = fmt$(margin);
    psTotal.textContent    = fmt$(total);
    // Savings vs vanilla: cache reduces volume ~38%, route-cheapest saves ~30% → ~50%
    const vanilla = providerCost * 2.1;
    psSavings.textContent  = fmt$(vanilla - total);
  };
  if (range) {
    updatePricing();
    range.addEventListener("input", updatePricing);
  }

  /* ----------------------------------------------------------
     14. FEATURE CARDS — radial highlight follows the cursor
  ---------------------------------------------------------- */
  document.querySelectorAll(".feat").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ----------------------------------------------------------
     15. FOOTER status clock
  ---------------------------------------------------------- */
  const footStatusTime = document.getElementById("footStatusTime");
  if (footStatusTime) {
    const tickClock = () => {
      const d = new Date();
      footStatusTime.textContent = "UTC " + d.toISOString().substr(11, 8);
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ----------------------------------------------------------
     16. SCROLL-TRIGGERED CARD reveals
  ---------------------------------------------------------- */
  const enterCards = (sel, opts = {}) => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.from(el, {
        y: opts.y ?? 30,
        opacity: 0,
        duration: opts.duration ?? .8,
        ease: "expo.out",
        delay: i * (opts.stagger ?? 0.07),
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" }
      });
    });
  };
  enterCards(".feat");
  enterCards(".as-card", { stagger: 0.1 });
  enterCards(".tier", { stagger: 0.1 });
  enterCards(".qu");
  enterCards(".ds-card", { stagger: 0.15 });

  /* ----------------------------------------------------------
     17. ScrollTrigger refresh on resize
  ---------------------------------------------------------- */
  let rTO;
  window.addEventListener("resize", () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
