/* ============================================================
   MERIDIAN — Interactions
   GSAP + ScrollTrigger · Lenis smooth scroll
   Plus: terminal boot loader, live clocks, track widget, quote
   calculator, animated KPIs.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. LOADER — fake terminal boot log
  ---------------------------------------------------------- */
  const loader   = document.getElementById("loader");
  const logEl    = document.getElementById("loaderLog");
  const pctEl    = document.getElementById("loaderPct");
  const fillEl   = document.getElementById("loaderFill");
  document.body.style.overflow = "hidden";

  const bootLines = [
    "$ meridian boot --mode=production",
    "→ resolving network nodes ...",
    "<span class='ok'>✓</span> connected · 142 ports · 64 countries",
    "→ syncing live trackers ...",
    "<span class='ok'>✓</span> 12,840 containers · 218 vessels · 3,402 trucks",
    "→ pulling tariff tables ...",
    "<span class='ok'>✓</span> harmonized · 17,326 SKUs · latest rev 2026-06-15",
    "→ fetching carbon ledger ...",
    "<span class='ok'>✓</span> YTD offset 1,284 t · audited SGS",
    "→ ops desk handshake ...",
    "<span class='focus'>✓</span> hello — what are we moving today?",
  ];
  let lineIdx = 0;
  const writeLine = () => {
    if (lineIdx >= bootLines.length) return;
    logEl.innerHTML += (lineIdx ? "\n" : "") + bootLines[lineIdx];
    lineIdx++;
    setTimeout(writeLine, 130 + Math.random() * 60);
  };
  writeLine();

  let pct = 0;
  const fillTick = setInterval(() => {
    pct += 4 + Math.random() * 6;
    if (pct >= 100) {
      pct = 100;
      clearInterval(fillTick);
      pctEl.textContent = "100";
      fillEl.style.right = "0%";
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.style.overflow = "";
        startEntrance();
      }, 600);
    } else {
      pctEl.textContent = String(Math.floor(pct)).padStart(3, "0");
      fillEl.style.right = (100 - pct) + "%";
    }
  }, 110);

  /* ----------------------------------------------------------
     2. LENIS SMOOTH SCROLL → GSAP ticker
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
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          lenis.scrollTo(t, { offset: -80, duration: 1.4 });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     3. NAV scroll state
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -30",
    onUpdate: (s) => nav.classList.toggle("is-scrolled", s.scroll() > 60),
  });

  /* ----------------------------------------------------------
     4. ENTRANCE — hero title yPercent reveal
  ---------------------------------------------------------- */
  gsap.set(".reveal", { yPercent: 110 });

  function startEntrance() {
    const heroLines = document.querySelectorAll(".hero-title .reveal");
    gsap.to(heroLines, {
      yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08
    });
    gsap.from(".hero-meta",  { y: 20, opacity: 0, duration: .8, delay: .1, ease: "power3.out" });
    gsap.from(".hero-sub",   { y: 20, opacity: 0, duration: .8, delay: .9, ease: "power3.out" });
    gsap.from(".hero-cta",   { y: 20, opacity: 0, duration: .8, delay: 1.0, ease: "power3.out" });
    gsap.from(".hero-kpis",  { y: 20, opacity: 0, duration: .9, delay: 1.1, ease: "power3.out" });
    gsap.from(".hero-card",  { y: 40, opacity: 0, duration: 1, delay: 1.0, ease: "expo.out", stagger: 0.2 });
    gsap.from(".nav",        { y: -30, opacity: 0, duration: .9, delay: .2, ease: "power3.out" });
    gsap.from(".ticker",     { y: -20, opacity: 0, duration: .8, delay: .1, ease: "power3.out" });

    runKpiCounters(".hero-kpis .kpi-num"); // hero KPIs run on entrance
  }

  /* ----------------------------------------------------------
     5. Generic SECTION reveals + scroll-based KPI counters
  ---------------------------------------------------------- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero-title")) return;
    ScrollTrigger.create({
      trigger: el, start: "top 90%",
      onEnter: () => gsap.to(el, { yPercent: 0, duration: 1, ease: "expo.out" }),
    });
  });

  function runKpiCounters(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const isDecimal = target % 1 !== 0;
      gsap.to({ v: 0 }, {
        v: target, duration: 1.8, ease: "power2.out",
        onUpdate() {
          const v = this.targets()[0].v;
          el.textContent = prefix + (isDecimal ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix;
        },
      });
    });
  }
  gsap.utils.toArray(".sustain-stats .ss-num").forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        gsap.to({ v: 0 }, {
          v: target, duration: 1.8, ease: "power2.out",
          onUpdate() { el.textContent = Math.floor(this.targets()[0].v) + suffix; },
        });
      }
    });
  });

  /* ----------------------------------------------------------
     6. PARALLAX BAND background
  ---------------------------------------------------------- */
  gsap.utils.toArray(".pb-bg").forEach((el) => {
    const img = el.querySelector("img");
    if (!img) return;
    gsap.fromTo(img,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      }
    );
  });

  /* ----------------------------------------------------------
     7. LIVE CLOCKS (network HUD + track widget + footer)
  ---------------------------------------------------------- */
  const hudUtc  = document.getElementById("hudUtc");
  const twTime  = document.getElementById("twTime");
  const footTime= document.getElementById("footTime");
  const contLive= document.getElementById("contLive");
  let contValue = 12840;

  const tick = () => {
    const d = new Date();
    const utc = d.toISOString().substr(11, 8); // HH:MM:SS
    if (hudUtc)   hudUtc.textContent = utc;
    if (twTime)   twTime.textContent = "UTC " + utc;
    if (footTime) footTime.textContent = "UTC " + utc;

    // Wiggle the containers-in-motion number every few seconds
    if (contLive && d.getSeconds() % 3 === 0) {
      contValue += Math.floor((Math.random() - 0.3) * 4);
      contLive.textContent = contValue.toLocaleString();
    }
  };
  tick();
  setInterval(tick, 1000);

  /* ----------------------------------------------------------
     8. TRACK widget — multiple test shipments, live lookup
     ----------------------------------------------------------
     A small dataset of fake-but-realistic shipments keyed by
     tracking number. Typing/submitting a known number renders
     its route, KPIs and event timeline; an unknown number shows
     a not-found prompt with the available samples.
  ---------------------------------------------------------- */
  const trackForm   = document.getElementById("trackForm");
  const trackInput  = document.getElementById("trackInput");
  const trackResult = document.getElementById("trackResult");
  const twFound     = document.getElementById("twFound");
  const twEmptyMsg  = document.getElementById("twEmptyMsg");
  const twSamples   = document.getElementById("twSamples");

  // mode → vessel glyph drawn on the route rail
  const VESSEL = { OCEAN: "▾", AIR: "✈", GROUND: "▸", RAIL: "▸" };

  const SHIPMENTS = {
    "MX-4827": {
      mode: "OCEAN · 40HQ", label: "B/L", status: { text: "ON SCHEDULE", kind: "good" },
      from: { code: "SHA", place: "Shanghai" }, to: { code: "ROT", place: "Rotterdam" },
      stops: ["SHA", "SIN", "HAM", "ROT"], progress: 62,
      eta: "2026-07-04 09:12 UTC", transit: "12d 04h 22m",
      lastScan: "SIN · 14:08 UTC", carrier: "HMM · Hyundai Merchant",
      timeline: [
        ["done",   "Loaded · SHA",             "2026-06-22 11:02 UTC"],
        ["done",   "Cleared · SHA Customs",    "2026-06-22 18:40 UTC"],
        ["done",   "Transshipment · SIN",      "2026-06-30 14:08 UTC"],
        ["active", "In transit · Indian Ocean", "Last ping 00:00:14 ago"],
        ["",       "Arrive · ROT",             "ETA 2026-07-04 09:12 UTC"],
        ["",       "Customs · NL",             "~ 2026-07-04 16:00 UTC"],
      ],
    },
    "HLBU-9182734": {
      mode: "OCEAN · 20GP", label: "Container", status: { text: "ON SCHEDULE", kind: "good" },
      from: { code: "SHA", place: "Shanghai" }, to: { code: "LAX", place: "Los Angeles" },
      stops: ["SHA", "PUS", "LAX"], progress: 41,
      eta: "2026-07-09 06:30 UTC", transit: "06d 19h 10m",
      lastScan: "PUS · 02:51 UTC", carrier: "ONE · Ocean Network Express",
      timeline: [
        ["done",   "Loaded · SHA",            "2026-06-25 08:14 UTC"],
        ["done",   "Cleared · SHA Customs",   "2026-06-25 15:02 UTC"],
        ["active", "Transshipment · Busan",   "Last ping 00:02:40 ago"],
        ["",       "Depart · PUS",            "ETA 2026-06-27 09:00 UTC"],
        ["",       "Arrive · LAX",            "ETA 2026-07-09 06:30 UTC"],
        ["",       "Customs · US",            "~ 2026-07-09 13:00 UTC"],
      ],
    },
    "AWB-074-12345678": {
      mode: "AIR · 3 PCS · 480 kg", label: "AWB", status: { text: "DELAYED", kind: "amber" },
      from: { code: "HKG", place: "Hong Kong" }, to: { code: "JFK", place: "New York" },
      stops: ["HKG", "ANC", "JFK"], progress: 78,
      eta: "2026-06-23 22:40 UTC", transit: "01d 09h 05m",
      lastScan: "ANC · 19:20 UTC", carrier: "CX · Cathay Cargo",
      timeline: [
        ["done",   "Tendered · HKG",          "2026-06-22 09:30 UTC"],
        ["done",   "Departed · HKG",          "2026-06-22 13:05 UTC"],
        ["done",   "Transit · Anchorage",     "2026-06-22 19:20 UTC"],
        ["active", "Held · ANC weather hold", "Re-booked next-flight-out"],
        ["",       "Arrive · JFK",            "ETA 2026-06-23 22:40 UTC"],
        ["",       "Customs · US",            "~ 2026-06-24 02:00 UTC"],
      ],
    },
    "MX-5310": {
      mode: "GROUND · FTL · 53'", label: "PRO", status: { text: "OUT FOR DELIVERY", kind: "good" },
      from: { code: "LAX", place: "Los Angeles" }, to: { code: "ORD", place: "Chicago" },
      stops: ["LAX", "ABQ", "ORD"], progress: 88,
      eta: "2026-06-22 18:00 UTC", transit: "03d 02h 40m",
      lastScan: "ABQ · 11:46 UTC", carrier: "Meridian Ground · owner-operator #4471",
      timeline: [
        ["done",   "Picked up · LAX",         "2026-06-19 15:20 UTC"],
        ["done",   "In transit · I-40 E",     "2026-06-20 22:10 UTC"],
        ["done",   "Hub scan · Albuquerque",  "2026-06-21 11:46 UTC"],
        ["active", "Out for delivery · ORD",  "Last ping 00:00:31 ago"],
        ["",       "Delivered · ORD dock 12", "ETA 2026-06-22 18:00 UTC"],
      ],
    },
  };

  // Render one shipment's detail block into #twFound.
  const renderShipment = (s) => {
    const badgeClass = s.status.kind === "amber" ? "badge-amber" : "badge-good";
    const dotClass   = s.status.kind === "amber" ? "dot-amber"   : "dot-good";
    const vessel     = VESSEL[s.mode.split(" ")[0]] || "▾";
    const stops      = s.stops.map((c) => `<span>${c}</span>`).join("");
    const timeline   = s.timeline.map(
      ([state, title, time]) =>
        `<li class="${state}"><span class="dot"></span><div><p>${title}</p><p>${time}</p></div></li>`
    ).join("");

    twFound.innerHTML = `
      <div class="tw-found-head">
        <div>
          <p class="tw-label">${s.label}</p>
          <p class="tw-id">${s.id} · ${s.mode}</p>
        </div>
        <span class="${badgeClass}"><span class="${dotClass}"></span> ${s.status.text}</span>
      </div>
      <div class="tw-route">
        <div class="tw-port">
          <p class="tw-label">From</p>
          <p class="tw-code">${s.from.code}</p>
          <p class="tw-place">${s.from.place}</p>
        </div>
        <div class="tw-rail" aria-hidden="true">
          <div class="tw-rail-track"><div class="tw-rail-fill" id="trackRailFill"></div></div>
          <span class="tw-rail-vessel" id="trackVessel">${vessel}</span>
          <p class="tw-rail-stops">${stops}</p>
        </div>
        <div class="tw-port">
          <p class="tw-label">To</p>
          <p class="tw-code">${s.to.code}</p>
          <p class="tw-place">${s.to.place}</p>
        </div>
      </div>
      <div class="tw-grid">
        <div><span class="tw-label">ETA</span><strong>${s.eta}</strong></div>
        <div><span class="tw-label">In transit</span><strong>${s.transit}</strong></div>
        <div><span class="tw-label">Last scan</span><strong>${s.lastScan}</strong></div>
        <div><span class="tw-label">Carrier</span><strong>${s.carrier}</strong></div>
      </div>
      <ol class="tw-timeline">${timeline}</ol>
    `;

    trackResult.dataset.empty = "false";

    // Animate route progress + vessel position once layout settles.
    const fill   = document.getElementById("trackRailFill");
    const vesEl  = document.getElementById("trackVessel");
    setTimeout(() => {
      if (fill)  fill.style.width  = s.progress + "%";
      if (vesEl) vesEl.style.left  = s.progress + "%";
    }, 100);

    gsap.from(twFound.querySelectorAll(".tw-timeline li"), {
      y: 10, opacity: 0, duration: .5, ease: "power3.out", stagger: 0.08,
    });
  };

  // Look up a typed value; render it or show a not-found prompt.
  const doTrack = (raw) => {
    const key = raw.trim().toUpperCase();
    if (!key) {
      trackInput.style.borderColor = "var(--amber)";
      return;
    }
    trackInput.style.borderColor = "";
    const s = SHIPMENTS[key];
    if (s) {
      renderShipment({ ...s, id: key });
    } else {
      trackResult.dataset.empty = "true";
      twEmptyMsg.textContent = `No shipment found for "${key}". Try a sample:`;
      twEmptyMsg.style.color = "var(--amber)";
    }
  };

  // Build clickable sample chips from the dataset.
  if (twSamples) {
    Object.keys(SHIPMENTS).forEach((id) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tw-chip";
      b.textContent = id;
      b.addEventListener("click", () => {
        trackInput.value = id;
        doTrack(id);
      });
      twSamples.appendChild(b);
    });
  }

  if (trackForm) {
    trackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      doTrack(trackInput.value);
    });
  }

  /* ----------------------------------------------------------
     9. QUOTE calculator — toy formula but feels real
  ---------------------------------------------------------- */
  const qfTabs    = document.querySelectorAll(".qf-tab");
  const qfWeight  = document.getElementById("qfWeight");
  const qfVolume  = document.getElementById("qfVolume");
  const qfCarbon  = document.getElementById("qfCarbon");
  const qfInsurance = document.getElementById("qfInsurance");
  const qfoAmt    = document.getElementById("qfoAmt");
  const qfoTransit= document.getElementById("qfoTransit");
  const qfoCarbon = document.getElementById("qfoCarbon");
  let mode = "ocean";

  const transit = { ocean: "17 — 22 days", air: "2 — 4 days", ground: "3 — 7 days" };
  const baseRate = { ocean: 0.18, air: 4.20, ground: 0.55 }; // $ per kg
  const baseCO2  = { ocean: 0.000182, air: 0.0016, ground: 0.000062 }; // tons / kg

  const recompute = () => {
    const w = Math.max(1, parseFloat(qfWeight.value) || 0);
    const v = Math.max(1, parseFloat(qfVolume.value) || 0);
    let amt = baseRate[mode] * w + v * 28;
    if (qfCarbon.checked)    amt *= 1.07;
    if (qfInsurance.checked) amt *= 1.025;
    qfoAmt.textContent = "$" + Math.round(amt).toLocaleString();
    qfoTransit.textContent = transit[mode];
    qfoCarbon.textContent = (baseCO2[mode] * w).toFixed(2) + " t CO₂e";
  };

  qfTabs.forEach((t) => {
    t.addEventListener("click", () => {
      qfTabs.forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      mode = t.dataset.mode;
      recompute();
    });
  });
  [qfWeight, qfVolume, qfCarbon, qfInsurance].forEach((el) =>
    el.addEventListener("input", recompute)
  );
  recompute();

  document.getElementById("qfBook").addEventListener("click", () => {
    alert("Demo — wire to your booking flow (Shopify, internal CRM, etc) here.");
  });

  /* ----------------------------------------------------------
     10. CARD reveals (services / steps / industries)
  ---------------------------------------------------------- */
  const enter = (sel, opts = {}) =>
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.from(el, {
        y: opts.y ?? 30,
        opacity: 0,
        duration: opts.duration ?? .8,
        ease: "expo.out",
        delay: i * (opts.stagger ?? 0.07),
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" }
      });
    });
  enter(".service");
  enter(".step", { stagger: 0.1 });
  enter(".ind",  { y: 20 });

  /* ----------------------------------------------------------
     11. THREE.JS — ONE PERSISTENT GLOBE THAT DRIFTS BETWEEN
                    SECTIONS AS THE USER SCROLLS
     ----------------------------------------------------------
     A single fixed-canvas Three.js scene holds ONE globe. Every
     section on the page declares a "state" (position, scale,
     rotation, opacity). On every frame we find which sections
     are bracketing the viewport center and lerp between their
     states with an easing — so the globe glides continuously
     from "hero accent" → "network centerpiece" → "atmospheric
     backdrop" → etc. ScrollTrigger refresh keeps anchors in
     sync on resize.
  ---------------------------------------------------------- */
  const T = window.THREE;
  if (T) {

    /* ------------ shared helpers ------------ */
    const PORTS = [
      { code: "LAX", lat: 33.94,  lng: -118.40, color: "amber" },
      { code: "JFK", lat: 40.64,  lng: -73.78,  color: "amber" },
      { code: "ROT", lat: 51.93,  lng:   4.13,  color: "lime"  },
      { code: "HAM", lat: 53.55,  lng:   9.99,  color: "amber" },
      { code: "DXB", lat: 25.27,  lng:  55.31,  color: "lime"  },
      { code: "SHA", lat: 31.22,  lng: 121.46,  color: "amber" },
      { code: "SIN", lat:  1.35,  lng: 103.82,  color: "lime"  },
      { code: "NRT", lat: 35.77,  lng: 140.39,  color: "amber" },
      { code: "SYD", lat: -33.86, lng: 151.20,  color: "lime"  },
      { code: "GRU", lat: -23.55, lng: -46.63,  color: "amber" },
      { code: "BCN", lat: 41.39,  lng:   2.17,  color: "lime"  },
    ];
    const ARCS = [
      ["LAX", "SHA"], ["JFK", "ROT"], ["ROT", "SHA"], ["SHA", "SIN"],
      ["SIN", "SYD"], ["JFK", "DXB"], ["DXB", "SIN"], ["GRU", "ROT"],
      ["HAM", "NRT"], ["BCN", "NRT"], ["LAX", "SYD"],
    ];
    const COLORS = { amber: 0xff7a1a, lime: 0xb6ff3c, royal: 0x4773ff, ink: 0x0a1224, paper: 0xf1eee2 };

    const latLngToVec3 = (lat, lng, r) => {
      const phi   = (90 - lat) * Math.PI / 180;
      const theta = (lng + 180) * Math.PI / 180;
      return new T.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta),
      );
    };

    /**
     * Build a globe + arcs + vessels group, parameterised so we can
     * use it both as the hero background and as the main network map.
     */
    function buildGlobe({ radius = 2, showLabels = false, labelsHost = null, showArcs = true }) {
      const group = new T.Group();

      // Outer wireframe sphere
      const wire = new T.Mesh(
        new T.SphereGeometry(radius, 48, 32),
        new T.MeshBasicMaterial({
          color: COLORS.royal,
          wireframe: true, transparent: true, opacity: 0.22,
        })
      );
      group.add(wire);

      // Inner solid sphere — gives the wireframe depth
      const inner = new T.Mesh(
        new T.SphereGeometry(radius * 0.99, 64, 48),
        new T.MeshBasicMaterial({
          color: COLORS.ink, transparent: true, opacity: 0.92,
        })
      );
      group.add(inner);

      // Equator ring + meridian ring (subtle reference lines)
      const ringMat = new T.LineBasicMaterial({ color: COLORS.royal, transparent: true, opacity: 0.35 });
      const equatorPts = [], meridianPts = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        equatorPts.push (new T.Vector3(Math.cos(a) * radius * 1.001, 0, Math.sin(a) * radius * 1.001));
        meridianPts.push(new T.Vector3(0, Math.sin(a) * radius * 1.001, Math.cos(a) * radius * 1.001));
      }
      group.add(new T.Line(new T.BufferGeometry().setFromPoints(equatorPts), ringMat));
      group.add(new T.Line(new T.BufferGeometry().setFromPoints(meridianPts), ringMat));

      // Port dots + pulse rings
      const portMeshes = [];
      const labelEls = [];
      PORTS.forEach((p) => {
        const pos = latLngToVec3(p.lat, p.lng, radius * 1.01);
        const c = p.color === "lime" ? COLORS.lime : COLORS.amber;

        const dot = new T.Mesh(
          new T.SphereGeometry(radius * 0.018, 12, 12),
          new T.MeshBasicMaterial({ color: c })
        );
        dot.position.copy(pos);
        group.add(dot);

        const ring = new T.Mesh(
          new T.RingGeometry(radius * 0.025, radius * 0.04, 32),
          new T.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45, side: T.DoubleSide })
        );
        ring.position.copy(pos);
        ring.lookAt(new T.Vector3(0, 0, 0));
        ring.userData = { basePos: pos.clone(), seed: Math.random() * Math.PI * 2 };
        group.add(ring);

        portMeshes.push({ port: p, dot, ring, pos });

        if (showLabels && labelsHost) {
          const el = document.createElement("div");
          el.className = "port-label";
          el.innerHTML = `<span class="${p.color}">${p.code}</span>`;
          labelsHost.appendChild(el);
          labelEls.push({ el, basePos: pos });
        }
      });

      // Arcs + vessels
      const arcMeshes = [];
      if (showArcs) {
        ARCS.forEach(([fromCode, toCode], i) => {
          const from = PORTS.find((p) => p.code === fromCode);
          const to   = PORTS.find((p) => p.code === toCode);
          if (!from || !to) return;
          const a = latLngToVec3(from.lat, from.lng, radius);
          const b = latLngToVec3(to.lat,   to.lng,   radius);
          const distance = a.distanceTo(b);
          const altitude = Math.min(distance * 0.45, radius * 0.9);
          const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(radius + altitude);

          const curve  = new T.QuadraticBezierCurve3(a, mid, b);
          const points = curve.getPoints(80);
          const geo    = new T.BufferGeometry().setFromPoints(points);
          const lineColor = i % 2 === 0 ? COLORS.amber : COLORS.lime;
          const mat = new T.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.55 });
          const arc = new T.Line(geo, mat);
          group.add(arc);

          // A small vessel travelling the arc
          const vessel = new T.Mesh(
            new T.SphereGeometry(radius * 0.012, 8, 8),
            new T.MeshBasicMaterial({ color: COLORS.paper })
          );
          vessel.userData = { points, t: Math.random(), speed: 0.0015 + Math.random() * 0.002 };
          group.add(vessel);
          arcMeshes.push({ arc, vessel });
        });
      }

      return { group, portMeshes, arcMeshes, labelEls };
    }

    /* ============================================================
       Per-section states — every entry says "where the globe lives
       when this section is centered on the viewport". Numbers are in
       world units (camera at z = 7.5, fov 40°) so wx = 2.6 sits about
       a third of the viewport off-center to the right.
       Order MUST match top-to-bottom DOM order.
       ============================================================ */
    /* `m:` holds a mobile override (<=760px). On a narrow phone viewport
       the world is much narrower, so the desktop wx:2.7 parks the globe
       almost entirely off the right edge. On mobile we pull it back to
       roughly center so it reads as a full-bleed backdrop behind the
       hero copy instead of a sliver hugging the edge. */
    const states = [
      { sel: "#home",            wx:  2.7, wy: -0.2, scale: 1.05, rotX: 0.3,  rotY: -1.2, opacity: 0.75,
        m: { wx: 0.25, wy: -1.0, scale: 1.0,  opacity: 0.6 } },
      { sel: ".port-strip",      wx:  2.7, wy: -0.2, scale: 1.10, rotX: 0.3,  rotY: -0.6, opacity: 0.55,
        m: { wx: 0.25, wy: -1.0, scale: 1.05, opacity: 0.4 } },
      { sel: "#network",         wx:  0.0, wy:  0.0, scale: 1.70, rotX: 0.35, rotY:  0.3, opacity: 1.00 },
      { sel: "#services",        wx:  4.5, wy:  0.0, scale: 0.50, rotX: 0.4,  rotY:  1.8, opacity: 0.00 },
      { sel: "#track",           wx:  2.4, wy:  0.0, scale: 1.10, rotX: 0.4,  rotY:  2.6, opacity: 0.55 },
      { sel: ".parallax-band",   wx:  0.0, wy:  0.0, scale: 2.10, rotX: 0.55, rotY:  3.4, opacity: 0.35 },
      { sel: "#process",         wx: -4.5, wy:  0.0, scale: 0.50, rotX: 0.3,  rotY:  4.4, opacity: 0.00 },
      { sel: ".industries",      wx: -2.4, wy:  0.0, scale: 1.00, rotX: 0.35, rotY:  5.2, opacity: 0.45 },
      { sel: ".logos",           wx: -2.4, wy:  0.0, scale: 1.00, rotX: 0.35, rotY:  5.6, opacity: 0.30 },
      { sel: "#sustain",         wx:  1.6, wy:  0.0, scale: 1.40, rotX: 0.4,  rotY:  6.6, opacity: 0.55 },
      { sel: "#quote",           wx: -2.6, wy:  0.0, scale: 0.95, rotX: 0.3,  rotY:  7.6, opacity: 0.50 },
      { sel: ".footer",          wx:  0.0, wy: -0.4, scale: 1.45, rotX: 0.3,  rotY:  8.8, opacity: 0.20 },
    ];

    const canvas = document.getElementById("globeCanvas");
    const labelsHost = document.getElementById("globeLabels");
    if (!canvas || !labelsHost) return;

    const scene  = new T.Scene();
    const camera = new T.PerspectiveCamera(40, 1, 0.1, 100);
    const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    /* Track whether we're at a mobile viewport so states can swap to
       their `m:` overrides. Recomputed on every resize. */
    let mobileView = window.matchMedia("(max-width: 760px)").matches;
    const fitCanvas = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight, false);
      mobileView = window.matchMedia("(max-width: 760px)").matches;
    };
    fitCanvas();
    window.addEventListener("resize", fitCanvas);

    /* Read a state field, preferring its mobile override when present. */
    const sv = (s, k) => (mobileView && s.m && s.m[k] !== undefined) ? s.m[k] : s[k];

    const { group, portMeshes, arcMeshes, labelEls } = buildGlobe({
      radius: 2, showLabels: true, labelsHost, showArcs: true,
    });
    scene.add(group);

    camera.position.set(0, 0, 7.5);

    /* Resolve each state's target DOM element so we can read its
       bounding rect every frame. Skip states whose element isn't in
       the DOM (defensive). */
    const anchors = states
      .map((s) => ({ ...s, el: document.querySelector(s.sel) }))
      .filter((s) => s.el);

    /* eased lerp — produces smooth deceleration into each section's
       state instead of a linear glide. */
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2;

    /* Current applied state — we lerp from this each frame for extra
       smoothing on top of the inter-section interpolation. */
    const current = { wx: 0, wy: 0, scale: 1, rotX: 0.3, rotY: 0, opacity: 0 };

    /* Compute the target state for the current scroll position by
       finding which two anchors bracket the viewport center, then
       eased-lerping between their declared states. */
    function targetState() {
      const vhMid = innerHeight / 2;
      let aIdx = 0;
      for (let i = 0; i < anchors.length; i++) {
        const r = anchors[i].el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        if (center < vhMid) aIdx = i; else break;
      }
      const A = anchors[aIdx];
      const B = anchors[aIdx + 1] || A;
      const rA = A.el.getBoundingClientRect();
      const rB = B.el.getBoundingClientRect();
      const cA = rA.top + rA.height / 2;
      const cB = rB.top + rB.height / 2;
      let t = (vhMid - cA) / Math.max(1, (cB - cA));
      t = Math.max(0, Math.min(1, t));
      const e = easeInOut(t);
      return {
        wx:      lerp(sv(A,"wx"),      sv(B,"wx"),      e),
        wy:      lerp(sv(A,"wy"),      sv(B,"wy"),      e),
        scale:   lerp(sv(A,"scale"),   sv(B,"scale"),   e),
        rotX:    lerp(sv(A,"rotX"),    sv(B,"rotX"),    e),
        rotY:    lerp(sv(A,"rotY"),    sv(B,"rotY"),    e),
        opacity: lerp(sv(A,"opacity"), sv(B,"opacity"), e),
      };
    }

    /* Mouse parallax — small offset added on top of section state. */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.tx = (e.clientX / innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
    });

    /* Project a 3D point on the globe surface to screen pixels so
       each port label sits over its dot. Hide labels when the port
       has rotated to the back hemisphere. */
    const tmpV = new T.Vector3();
    const projectLabel = (basePos, el) => {
      tmpV.copy(basePos);
      tmpV.applyMatrix4(group.matrixWorld);
      const camToPort = tmpV.clone().sub(camera.position);
      const facing = camToPort.dot(tmpV.clone().sub(group.position)) < 0;
      tmpV.project(camera);
      const x = ((tmpV.x + 1) / 2) * innerWidth;
      const y = ((1 - tmpV.y) / 2) * innerHeight;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, calc(-100% - 8px))`;
      // Visible when facing camera AND in front of camera AND globe itself > 0.4 opacity
      el.classList.toggle("is-visible", facing && tmpV.z < 1 && current.opacity > 0.45);
    };

    /* Drag-to-rotate (only meaningful when the globe is opaque enough
       to be the focus — i.e. inside the network section). */
    let dragRotY = 0;
    const drag = { active: false, lx: 0 };
    canvas.style.pointerEvents = "auto";
    canvas.addEventListener("pointerdown", (e) => {
      if (current.opacity < 0.7) return; // ignore drags when globe is decorative
      drag.active = true; drag.lx = e.clientX;
    });
    window.addEventListener("pointerup",   () => { drag.active = false; });
    window.addEventListener("pointermove", (e) => {
      if (!drag.active) return;
      dragRotY += (e.clientX - drag.lx) * 0.006;
      drag.lx = e.clientX;
    });

    /* Once-on-enter arc + port reveal — applies when the user first
       reaches the network section. After that the globe just flows. */
    ScrollTrigger.create({
      trigger: "#network", start: "top 70%", once: true,
      onEnter: () => {
        arcMeshes.forEach((a, i) => {
          gsap.fromTo(a.arc.material, { opacity: 0 }, {
            opacity: 0.55, duration: 1.1, ease: "power2.out", delay: i * 0.07,
          });
          gsap.from(a.vessel.scale, { x: 0, y: 0, z: 0, duration: 0.55, delay: 0.55 + i*0.07, ease: "back.out(2)" });
        });
        portMeshes.forEach((p, i) => {
          gsap.from(p.ring.scale, { x: 0, y: 0, z: 0, duration: 0.7, delay: i*0.04, ease: "back.out(2)" });
          gsap.from(p.dot.scale,  { x: 0, y: 0, z: 0, duration: 0.5, delay: i*0.04, ease: "back.out(2)" });
        });
      },
    });

    /* Main render loop — runs every frame regardless of scroll, so
       the per-section lerp is always smooth even when Lenis idles. */
    let last = performance.now();
    function tick(now) {
      requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Compute target from scroll, smooth it with another lerp.
      const target = targetState();
      const ease = 0.10; // higher = snappier
      current.wx      = lerp(current.wx,      target.wx,      ease);
      current.wy      = lerp(current.wy,      target.wy,      ease);
      current.scale   = lerp(current.scale,   target.scale,   ease);
      current.rotX    = lerp(current.rotX,    target.rotX,    ease);
      current.rotY    = lerp(current.rotY,    target.rotY,    ease);
      current.opacity = lerp(current.opacity, target.opacity, ease);

      // Apply to globe group
      group.position.set(current.wx + mouse.x * 0.25, current.wy - mouse.y * 0.15, 0);
      group.scale.setScalar(current.scale);
      group.rotation.x = current.rotX + mouse.y * 0.06;
      group.rotation.y = current.rotY + dragRotY + (now * 0.00006); // gentle constant drift
      canvas.style.opacity = current.opacity.toFixed(3);

      // Walk vessels along their cached bezier points
      arcMeshes.forEach(({ vessel }) => {
        vessel.userData.t += vessel.userData.speed;
        if (vessel.userData.t > 1) vessel.userData.t = 0;
        const pts = vessel.userData.points;
        const idx = Math.floor(vessel.userData.t * (pts.length - 1));
        vessel.position.copy(pts[idx]);
      });

      // Pulse port rings independently
      const t = now * 0.001;
      portMeshes.forEach(({ ring }) => {
        const s = 1 + 0.32 * Math.sin(t * 2 + ring.userData.seed);
        ring.scale.setScalar(s);
      });

      // Project HTML labels onto the canvas every frame
      group.updateMatrixWorld();
      labelEls.forEach(({ basePos, el }) => projectLabel(basePos, el));

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  } // end if (T)

  /* ----------------------------------------------------------
     12. ScrollTrigger refresh on resize
  ---------------------------------------------------------- */
  let rTO;
  window.addEventListener("resize", () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
