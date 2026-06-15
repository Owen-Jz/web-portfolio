"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Nav() {
  const { count, toggle } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out " +
        (scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line py-3"
          : "bg-transparent py-5")
      }
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 flex items-center justify-between">
        {/* Left links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide">
          <Link href="/shop"           className="hover:text-klein transition-colors">Shop</Link>
          <Link href="/shop?c=outerwear" className="hover:text-klein transition-colors">New in</Link>
          <Link href="/#editorial"     className="hover:text-klein transition-colors">Editorial</Link>
          <Link href="/#journal"       className="hover:text-klein transition-colors">Journal</Link>
        </nav>

        {/* Wordmark — centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 select-none">
          <span className="font-display text-[22px] md:text-[26px] font-medium tracking-tightest leading-none">
            VESPER<span className="text-klein font-mono text-[11px] align-super ml-1">®</span>
          </span>
        </Link>

        {/* Right utility */}
        <div className="flex items-center gap-5 text-[13px] tracking-wide ml-auto md:ml-0">
          <Link href="/shop" className="hidden md:inline hover:text-klein transition-colors">Search</Link>
          <Link href="/shop" className="hidden md:inline hover:text-klein transition-colors">Stores</Link>
          <button
            onClick={toggle}
            className="relative font-mono uppercase tracking-wider hover:text-klein transition-colors"
            aria-label="Open cart"
          >
            Cart
            <span className="ml-1 font-sans">
              [{String(count).padStart(2, "0")}]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
