/* ============================================================
   OLIVE & EMBER — Interactions
   GSAP + ScrollTrigger · Lenis smooth scroll
   Three.js: drifting food-garnish particle field (basil, tomato,
   citrus, peppercorn, salt) — feels like seasoning sprinkled
   gently across the hero, not a tech-demo orb.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------------------------
     1. LOADER — handwritten "setting the table…"
        Holds for ~1.4s while assets settle, then dismisses.
  ---------------------------------------------------------- */
  const loader = document.getElementById("loader");
  document.body.style.overflow = "hidden";

  const dismissLoader = () => {
    loader.classList.add("is-done");
    document.body.style.overflow = "";
    startEntrance();
  };

  // Wait for fonts AND minimum dwell so the loader doesn't blink
  const minDwell = new Promise((r) => setTimeout(r, 1400));
  const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve();
  Promise.all([minDwell, fontsReady]).then(dismissLoader);

  /* ----------------------------------------------------------
     2. LENIS SMOOTH SCROLL — synced to GSAP ticker
  ---------------------------------------------------------- */
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          lenis.scrollTo(t, { offset: -60, duration: 1.4 });
        }
      }
    });
  });

  /* ----------------------------------------------------------
     3. THREE.JS — DRIFTING GARNISH PARTICLES
        Five "ingredients" (basil green, tomato red, citrus gold,
        peppercorn brown, salt cream). Each is a tiny sphere
        sprite. They drift slowly down + slight horizontal sway,
        wrap when offscreen, and shift toward the cursor.
  ---------------------------------------------------------- */
  const canvas = document.getElementById("heroCanvas");
  // Skip WebGL on small screens — canvas is hidden via CSS at <=700px and
  // we don't want the render loop burning battery for off-screen particles.
  if (canvas && window.THREE && window.innerWidth > 700) {
    const T = window.THREE;
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 100);
    const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    camera.position.z = 14;

    // Soft warm lights matched to the page palette
    scene.add(new T.AmbientLight(0xfbf2e3, 0.7));
    const key = new T.DirectionalLight(0xdfa53b, 0.9);
    key.position.set(4, 5, 6); scene.add(key);
    const fill = new T.DirectionalLight(0x7e8b4f, 0.5);
    fill.position.set(-4, -3, 4); scene.add(fill);

    // Ingredient palette + behavior
    const ingredients = [
      { color: 0x7e8b4f, size: 0.18, sway: 0.0010, count: 28 }, // basil
      { color: 0xc5391c, size: 0.14, sway: 0.0014, count: 22 }, // tomato
      { color: 0xdfa53b, size: 0.16, sway: 0.0012, count: 20 }, // citrus zest
      { color: 0x3b2a1a, size: 0.09, sway: 0.0018, count: 18 }, // peppercorn
      { color: 0xfff8e8, size: 0.07, sway: 0.0022, count: 24 }, // salt
    ];

    const particles = []; // { mesh, base, phase, speed, sway }
    ingredients.forEach((ing) => {
      const geo = new T.SphereGeometry(ing.size, 14, 14);
      const mat = new T.MeshStandardMaterial({
        color: ing.color,
        roughness: 0.55,
        metalness: 0.05,
      });
      for (let i = 0; i < ing.count; i++) {
        const m = new T.Mesh(geo, mat);
        const x = (Math.random() - 0.5) * 28;
        const y = (Math.random() - 0.5) * 18;
        const z = (Math.random() - 0.5) * 6;
        m.position.set(x, y, z);
        scene.add(m);
        particles.push({
          mesh: m,
          base: { x, z },
          phase: Math.random() * Math.PI * 2,
          speed: 0.012 + Math.random() * 0.025,
          sway: ing.sway + Math.random() * 0.0015,
          spinX: (Math.random() - 0.5) * 0.04,
          spinY: (Math.random() - 0.5) * 0.04,
        });
      }
    });

    // A subtle background ring of olive light — gives the scene depth
    const ring = new T.Mesh(
      new T.RingGeometry(7, 7.2, 80),
      new T.MeshBasicMaterial({ color: 0xdfa53b, transparent: true, opacity: 0.08, side: T.DoubleSide })
    );
    ring.position.set(0, 0, -4);
    scene.add(ring);

    // Mouse drift
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
    });

    const tick = () => {
      requestAnimationFrame(tick);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      particles.forEach((p) => {
        p.phase += p.sway;
        p.mesh.position.x = p.base.x + Math.sin(p.phase) * 1.2 + mouse.x * 0.4;
        p.mesh.position.y -= p.speed;
        // wrap
        if (p.mesh.position.y < -9) {
          p.mesh.position.y = 9 + Math.random() * 2;
          p.base.x = (Math.random() - 0.5) * 28;
        }
        p.mesh.rotation.x += p.spinX;
        p.mesh.rotation.y += p.spinY;
      });

      ring.rotation.z += 0.0012;
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    // Fade the canvas out as the user leaves the hero
    gsap.to(canvas, {
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    window.addEventListener("resize", () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  }

  /* ----------------------------------------------------------
     4. CUSTOM CURSOR
  ---------------------------------------------------------- */
  const cursor = document.getElementById("cursor");
  if (cursor && matchMedia("(hover: hover)").matches) {
    let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function loop(){
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
    const hov = "a, button, .service, .dish, .chef, .price-card, .step, .m, .t-card, summary, input, textarea, select, .polaroid, .pick";
    document.querySelectorAll(hov).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ----------------------------------------------------------
     5. NAV scroll state
  ---------------------------------------------------------- */
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -20",
    onUpdate: (self) => {
      nav.classList.toggle("is-scrolled", self.scroll() > 50);
    }
  });

  /* ----------------------------------------------------------
     6. PRE-HIDE REVEALS so GSAP owns initial state
  ---------------------------------------------------------- */
  gsap.set(".reveal", { yPercent: 110 });
  gsap.set(".reveal-soft", { y: 28, opacity: 0 });

  function startEntrance() {
    const heroLines = document.querySelectorAll(".hero-title .reveal");
    gsap.to(heroLines, {
      yPercent: 0,
      duration: 1.15, ease: "expo.out",
      stagger: 0.07,
      onStart: () => {
        // draw the squiggle just as "dinner" lands
        setTimeout(() => {
          document.querySelectorAll(".underline-word").forEach((u) => u.classList.add("is-drawn"));
        }, 380);
      }
    });
    gsap.from(".nav",          { y: -30, opacity: 0, duration: .9, delay: .2, ease: "power3.out" });
    gsap.from(".hero-eyebrow", { y: 18, opacity: 0, duration: .9, delay: .25, ease: "power3.out" });
    gsap.to(".hero-sub",       { y: 0, opacity: 1, duration: 1, delay: .9, ease: "power3.out" });
    gsap.to(".hero-actions",   { y: 0, opacity: 1, duration: 1, delay: 1.05, ease: "power3.out" });
    gsap.to(".hero-picks",     { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" });

    // Polaroids float in from off the right with slight rotation correction
    gsap.from(".polaroid", {
      x: 80, y: 40, opacity: 0,
      rotate: (i) => [-12, 14, -10][i] || 0,
      duration: 1.4, ease: "expo.out",
      stagger: 0.12, delay: .5,
    });
    gsap.from(".sticker, .tag", {
      opacity: 0, scale: .6,
      transformOrigin: "center",
      duration: 1, ease: "back.out(1.6)",
      stagger: 0.15, delay: 1.4,
    });

    gsap.from(".hero-marquee", { opacity: 0, y: 30, duration: 1, delay: 1.2, ease: "power2.out" });
  }

  /* ----------------------------------------------------------
     7. SECTION REVEALS
  ---------------------------------------------------------- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero-title")) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => gsap.to(el, { yPercent: 0, duration: 1, ease: "expo.out" }),
    });
  });

  /* ----------------------------------------------------------
     8. KNOWN-FOR COUNTERS
  ---------------------------------------------------------- */
  gsap.utils.toArray(".known-row .stat strong").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate() { el.textContent = Math.floor(this.targets()[0].v); }
        });
      }
    });
  });

  /* ----------------------------------------------------------
     9. PARALLAX
  ---------------------------------------------------------- */
  gsap.utils.toArray(".parallax-item").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.1;
    gsap.to(el, {
      y: () => -innerHeight * speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
    });
  });
  gsap.utils.toArray(".parallax-bg").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    const img = el.querySelector("img");
    if (!img) return;
    gsap.fromTo(img,
      { yPercent: -10 * speed * 10 },
      { yPercent: 10 * speed * 10, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });

  /* ----------------------------------------------------------
     10. MENU HORIZONTAL PIN
  ---------------------------------------------------------- */
  const menuTrack = document.getElementById("menuTrack");
  const menuSection = document.querySelector(".menu");
  if (menuTrack && menuSection && innerWidth > 800) {
    const getDistance = () => menuTrack.scrollWidth - innerWidth;
    gsap.to(menuTrack, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: menuSection,
        start: "top top",
        end: () => "+=" + (getDistance() + 200),
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  /* ----------------------------------------------------------
     11. SERVICE / CARD ENTRANCES
  ---------------------------------------------------------- */
  gsap.utils.toArray(".service").forEach((row, i) => {
    gsap.from(row, {
      y: 50, opacity: 0,
      duration: 1, ease: "expo.out",
      delay: i * 0.06,
      scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none reverse" }
    });
  });

  const enter = (selector, opts = {}) => {
    gsap.utils.toArray(selector).forEach((card, i) => {
      gsap.from(card, {
        y: opts.y ?? 50,
        opacity: 0,
        duration: opts.duration ?? .9,
        ease: "expo.out",
        delay: i * (opts.stagger ?? 0.08),
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }
      });
    });
  };
  enter(".chef");
  enter(".step", { stagger: 0.1 });
  enter(".price-card", { stagger: 0.1 });
  enter(".t-card");
  enter(".m", { y: 40, stagger: 0.06 });

  /* ----------------------------------------------------------
     12. FAQ single-open
  ---------------------------------------------------------- */
  const faq = document.getElementById("faqList");
  if (faq) {
    faq.querySelectorAll("details").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          faq.querySelectorAll("details").forEach((o) => { if (o !== item) o.open = false; });
        }
      });
    });
  }

  /* ----------------------------------------------------------
     13. CONTACT FORM
  ---------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        form.querySelector("input[name='email']").focus();
        return;
      }
      const ok = document.createElement("div");
      ok.style.cssText = "grid-column: span 2; padding: 28px; background: rgba(197,57,28,.15); border-radius: 14px; color: var(--cream); font-family: var(--font-display); font-size: 24px; line-height: 1.35; text-align: center;";
      ok.innerHTML = `Thank you, <em style="color:var(--mustard);font-family:var(--font-hand);font-style:normal;font-size:1.1em">${data.name.split(" ")[0]}</em>.<br/><span style="font-size:18px;font-family:var(--font-hand);color:rgba(255,248,232,.7);">we'll reply within one working day.</span>`;
      form.innerHTML = "";
      form.appendChild(ok);
    });
  }

  /* ----------------------------------------------------------
     14. ScrollTrigger refresh on resize
  ---------------------------------------------------------- */
  let rTO;
  window.addEventListener("resize", () => {
    clearTimeout(rTO);
    rTO = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
