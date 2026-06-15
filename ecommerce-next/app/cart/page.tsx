"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, remove, setQty, subtotal, clear } = useCart();
  const shipping = subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-24 px-6 lg:px-10">
      <div className="max-w-[1240px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-3">— Your bag</p>
        <h1 className="font-display font-medium tracking-tightest text-[clamp(46px,6vw,96px)] leading-[0.95]">
          Checkout.
        </h1>

        {lines.length === 0 ? (
          <div className="border-t border-line mt-12 pt-24 text-center text-mute">
            <p className="font-display text-4xl tracking-tightest text-ink mb-4">Empty.</p>
            <p className="text-sm mb-8">No pieces in your bag yet.</p>
            <Link
              href="/shop"
              className="inline-block bg-ink text-bg font-mono text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-klein"
            >
              Browse the shop →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 mt-12 border-t border-line pt-10">
            {/* Lines */}
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const p = products.find((x) => x.slug === l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${l.size}-${l.color}`} className="grid grid-cols-[100px_1fr_auto] gap-6 py-6">
                    <Link href={`/product/${p.slug}`} className="relative w-[100px] h-[130px] bg-bg2 overflow-hidden">
                      <Image src={p.images[0].src} alt={p.name} fill className="object-cover" sizes="100px"/>
                    </Link>
                    <div>
                      <Link href={`/product/${p.slug}`} className="font-display text-xl tracking-tightest leading-tight hover:text-klein">
                        {p.name}
                      </Link>
                      <p className="text-mute text-[13px] mt-1">{l.color} · {l.size}</p>
                      <p className="font-mono text-[12px] text-mute mt-1">{p.fabric}</p>
                      <div className="inline-flex items-center border border-line mt-4">
                        <button className="px-3 py-1 text-sm hover:text-klein" onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}>−</button>
                        <span className="px-2 font-mono text-[12px]">{l.qty}</span>
                        <button className="px-3 py-1 text-sm hover:text-klein" onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-mono text-[14px]">{formatPrice(p.price * l.qty)}</p>
                      <button
                        onClick={() => remove(l.slug, l.size, l.color)}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute hover:text-coral"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Summary */}
            <aside className="border border-line p-8 self-start lg:sticky lg:top-32">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mute mb-4">Summary</p>
              <dl className="space-y-3 text-[14px]">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-mono">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                <div className="flex justify-between text-mute"><dt>Taxes</dt><dd className="font-mono">calc&apos;d at next step</dd></div>
              </dl>
              <div className="border-t border-line mt-6 pt-6 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase">Total</span>
                <span className="font-display text-3xl tracking-tightest">{formatPrice(total)}</span>
              </div>
              <button
                onClick={() => alert("Demo — wire to your checkout (Stripe / Shopify) here.")}
                className="block w-full text-center bg-ink text-bg py-4 mt-8 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-klein transition-colors"
              >
                Pay {formatPrice(total)} →
              </button>
              <button onClick={clear} className="block w-full text-center mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mute hover:text-coral">
                Empty the bag
              </button>
              <p className="text-[11px] text-mute mt-6 leading-relaxed">
                30-day returns · Free over $250 · Carbon-neutral delivery
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
