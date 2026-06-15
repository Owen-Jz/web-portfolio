"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { isOpen, close, lines, remove, setQty, subtotal, count } = useCart();

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={
          "fixed inset-0 z-50 bg-ink/40 transition-opacity duration-400 " +
          (isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      />

      {/* Panel */}
      <aside
        className={
          "fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-bg border-l border-line " +
          "flex flex-col transition-transform duration-500 ease-editorial " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">Your bag</p>
            <p className="font-display text-2xl tracking-tightest leading-none mt-1">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button onClick={close} className="text-[13px] tracking-wide hover:text-klein" aria-label="Close cart">Close ✕</button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-mute">
              <p className="font-display text-3xl text-ink tracking-tightest">Empty</p>
              <p className="text-sm max-w-[260px]">Nothing here yet. Add a piece you&rsquo;ll wear for ten years.</p>
              <Link href="/shop" onClick={close}
                className="font-mono text-[11px] tracking-[0.2em] uppercase border-b border-ink pb-1 text-ink hover:text-klein hover:border-klein">
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((l) => {
                const p = products.find((x) => x.slug === l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${l.size}-${l.color}`} className="flex gap-4">
                    <div className="relative w-24 h-32 bg-bg2 shrink-0 overflow-hidden">
                      <Image src={p.images[0].src} alt={p.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-[17px] tracking-tightest leading-tight">{p.name}</p>
                        <p className="font-mono text-[12px]">{formatPrice(p.price)}</p>
                      </div>
                      <p className="text-[12px] text-mute mt-1">{l.color} · {l.size}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="inline-flex items-center border border-line">
                          <button className="px-3 py-1 text-sm hover:text-klein"
                            onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}>−</button>
                          <span className="px-2 font-mono text-[12px]">{l.qty}</span>
                          <button className="px-3 py-1 text-sm hover:text-klein"
                            onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}>+</button>
                        </div>
                        <button
                          onClick={() => remove(l.slug, l.size, l.color)}
                          className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute hover:text-coral"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-line px-6 py-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute">Subtotal</span>
              <span className="font-display text-2xl tracking-tightest">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[12px] text-mute">Shipping & taxes calculated at checkout.</p>
            <Link
              href="/cart"
              onClick={close}
              className="block text-center bg-ink text-bg py-4 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-klein transition-colors"
            >
              Checkout →
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
