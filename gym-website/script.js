/* ============================================================
   IRONPULSE — Interactions
   Lenis smooth scroll + GSAP ScrollTrigger parallax & reveals
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  const loaderCount = document.getElementById("loaderCount");
  const loaderFill = document.getElementById("loaderFill");
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 12;
    if (progress >= 100) {
      progress = 100;
      loaderCount.textContent = "100";
      loaderFill.style.right = "0%";
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.style.overflow = "";
        startEntrance();
      }, 350);
    } else {
      loaderCount.textContent = Math.floor(progress);
      loaderFill.style.right = (100 - progress) + "%";
    }
  }, 90);
  document.body.style.overflow = "hidden";

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* ---------- GSAP + ScrollTrigger ---------- */
  gsap.registerPlugin(ScrollTrigger);

  // Sync ScrollTrigger with Lenis
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ---------- NAV scroll state ---------- */
  const nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -20",
    onUpdate: (self) => {
      if (self.scroll() > 50) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
  });

  /* ---------- SMOOTH LINKS ---------- */
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

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (cursor && dot && window.matchMedia("(hover: hover)").matches) {
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    const hoverables = "a, button, .program-card, .price-card, .coach-card, .testi-card, input";
    document.querySelectorAll(hoverables).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- PRE-HIDE ALL REVEALS ---------- *
   * Set yPercent in JS (not CSS) so GSAP owns the value and animations
   * actually run. The CSS-only translateY(110%) approach left text stuck
   * off-screen because GSAP couldn't read the existing transform. */
  gsap.set(".reveal", { yPercent: 110 });

  /* ---------- ENTRANCE / HERO REVEAL ---------- */
  function startEntrance() {
    const heroLines = document.querySelectorAll(".hero-title .reveal");
    const heroSubs  = document.querySelectorAll(".hero-sub .reveal");

    gsap.to(heroLines, {
      yPercent: 0, duration: 1.2, stagger: 0.09, ease: "expo.out"
    });
    gsap.to(heroSubs, {
      yPercent: 0, duration: 1, stagger: 0.1, delay: 0.35, ease: "expo.out"
    });

    gsap.from(".hero-eyebrow", { y: 24, opacity: 0, duration: 1, delay: .2, ease: "power2.out" });
    gsap.from(".hero-cta",     { y: 24, opacity: 0, duration: 1, delay: .8, ease: "power2.out" });
    gsap.from(".hero-meta",    { y: 24, opacity: 0, duration: 1, delay: 1.0, ease: "power2.out" });
    gsap.from(".nav",          { y: -30, opacity: 0, duration: .9, delay: .2, ease: "power2.out" });
  }

  /* ---------- SECTION REVEALS (everything except hero) ---------- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero-title") || el.closest(".hero-sub")) return; // handled in entrance
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => gsap.to(el, { yPercent: 0, duration: 1, ease: "expo.out" }),
    });
  });

  /* ---------- HERO PARALLAX BG ---------- */
  gsap.to(".hero-bg .parallax-layer img", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });
  gsap.to(".hero-content", {
    yPercent: -8,
    opacity: .35,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });

  /* ---------- ABOUT PARALLAX CARDS ---------- */
  gsap.utils.toArray(".parallax-item").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.1;
    gsap.to(el, {
      y: () => -window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });

  /* ---------- PARALLAX BACKGROUNDS (quote + cta) ---------- */
  gsap.utils.toArray(".parallax-bg").forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    const img = el.querySelector("img");
    if (!img) return;
    gsap.fromTo(img,
      { yPercent: -10 * speed * 10 },
      {
        yPercent: 10 * speed * 10,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  });

  /* ---------- HORIZONTAL PROGRAMS SCROLL ---------- *
   * The .programs-stage is a 100vh column: header on top, track below.
   * We pin the section and translate the track horizontally as the user
   * scrolls vertically. End distance = track-width minus its visible slot. */
  const hscrollTrack = document.getElementById("hscrollTrack");
  const programsSection = document.querySelector(".programs");
  if (hscrollTrack && programsSection && window.innerWidth > 760) {
    const getDistance = () => {
      // Track scrolls until its right edge reaches the viewport's right edge.
      return hscrollTrack.scrollWidth - window.innerWidth;
    };
    gsap.to(hscrollTrack, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: programsSection,
        start: "top top",
        end: () => "+=" + (getDistance() + 200),
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });
  }

  /* ---------- COACH CARD STAGGER ---------- */
  gsap.utils.toArray(".coach-card").forEach((card, i) => {
    gsap.from(card, {
      y: 60, opacity: 0,
      duration: 1, ease: "expo.out",
      delay: i * 0.08,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      }
    });
  });

  /* ---------- PRICING REVEAL ---------- */
  gsap.utils.toArray(".price-card").forEach((card, i) => {
    gsap.from(card, {
      y: 50, opacity: 0,
      duration: .9, ease: "expo.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });
  });

  /* ---------- TESTIMONIALS ---------- */
  gsap.utils.toArray(".testi-card").forEach((card, i) => {
    gsap.from(card, {
      y: 40, opacity: 0,
      duration: .9, ease: "expo.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: ".testi-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });
  });

  /* ---------- FOOTER MEGA TEXT PARALLAX ---------- */
  gsap.to(".footer-mega", {
    backgroundPositionY: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".footer",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    }
  });

  /* ---------- CTA FORM ---------- */
  const form = document.getElementById("ctaForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type='email']").value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        form.querySelector("input").style.borderColor = "red";
        return;
      }
      form.innerHTML = `<div style="padding:18px 22px; color:#fff; font-size:14px; letter-spacing:.15em; text-transform:uppercase;">✓ Welcome to the pulse, ${email.split("@")[0]}. Check your inbox.</div>`;
    });
  }

  /* ---------- BURGER (mobile) ---------- */
  const burger = document.getElementById("navBurger");
  if (burger) {
    burger.addEventListener("click", () => {
      alert("Mobile menu — wire to your overlay component.");
    });
  }

  /* ---------- REFRESH SCROLLTRIGGER on resize ---------- */
  window.addEventListener("resize", () => ScrollTrigger.refresh());
});
