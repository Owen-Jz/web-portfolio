"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const onAdd = () => {
    if (!size) { setError("Pick a size."); return; }
    setError(null);
    add({ slug: product.slug, color, size, qty });
  };

  return (
    <div className="pt-28 pb-24">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-10 max-w-[1480px] mx-auto">
        <nav className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute flex gap-2 mb-8">
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <Link href={`/shop?c=${product.category}`} className="hover:text-ink capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + Buybox */}
      <div className="px-6 lg:px-10 max-w-[1480px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* Gallery */}
        <div className="space-y-3 md:space-y-6">
          {product.images.map((img, i) => (
            <div key={i} className="relative aspect-[4/5] bg-bg2 overflow-hidden">
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover"/>
              <div className="absolute top-3 left-3 mix-blend-difference text-bg font-mono text-[10px] tracking-[0.25em] uppercase">
                {String(i + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Buybox */}
        <aside className="lg:sticky lg:top-28 self-start">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-3">
            — {product.collection}
          </p>
          <h1 className="font-display font-medium tracking-tightest leading-[0.95] text-[clamp(40px,4.5vw,72px)]">
            {product.name}
          </h1>
          <p className="text-mute mt-4 text-[15px] max-w-md">{product.tagline}</p>

          <div className="flex items-baseline gap-4 mt-8 pb-6 border-b border-line">
            <span className="font-display text-3xl tracking-tightest">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="font-mono text-[13px] text-mute line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            <span className="ml-auto font-mono text-[11px] text-mute tracking-wider">{product.fabric}</span>
          </div>

          {/* Color */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Color</span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-mute">{color}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={
                    "h-9 w-9 rounded-full border-2 transition " +
                    (color === c.name ? "border-ink scale-95" : "border-transparent hover:border-line")
                  }
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Size</span>
              <Link href="/#" className="font-mono text-[11px] tracking-[0.2em] uppercase under-line text-mute pb-0.5">Size guide</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={
                    "min-w-[52px] font-mono text-[12px] tracking-wider px-3 py-2 border transition " +
                    (size === s
                      ? "bg-ink text-bg border-ink"
                      : "border-line hover:border-ink")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="mt-10 flex gap-3">
            <div className="inline-flex items-center border border-line">
              <button className="px-3 py-3 text-sm hover:text-klein" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="px-2 font-mono text-[13px] w-8 text-center">{qty}</span>
              <button className="px-3 py-3 text-sm hover:text-klein" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button
              onClick={onAdd}
              disabled={product.isSoldOut}
              className="flex-1 bg-ink text-bg font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-klein transition-colors py-4 disabled:opacity-50"
            >
              {product.isSoldOut ? "Sold out" : `Add to bag — ${formatPrice(product.price * qty)}`}
            </button>
          </div>
          {error && <p className="mt-3 text-[12px] text-coral font-mono">{error}</p>}

          {/* Details */}
          <details className="mt-10 border-t border-line py-4 group">
            <summary className="flex justify-between items-center font-mono text-[12px] tracking-[0.2em] uppercase cursor-pointer">
              Details
              <span className="group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-4 text-[14px] text-mute leading-relaxed">
              <p>{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-ink">Fabric — </span>{product.fabric}</li>
                <li><span className="text-ink">Origin — </span>{product.origin}</li>
              </ul>
            </div>
          </details>
          <details className="border-t border-line py-4 group">
            <summary className="flex justify-between items-center font-mono text-[12px] tracking-[0.2em] uppercase cursor-pointer">
              Shipping & returns
              <span className="group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[14px] text-mute leading-relaxed">
              Free carbon-neutral shipping on orders over $250.
              Returns accepted within 30 days, free in the US, $15 international.
            </p>
          </details>
          <details className="border-y border-line py-4 group">
            <summary className="flex justify-between items-center font-mono text-[12px] tracking-[0.2em] uppercase cursor-pointer">
              Care
              <span className="group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[14px] text-mute leading-relaxed">
              Dry clean only. Store on a wide wooden hanger. Brush after each wear.
            </p>
          </details>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 lg:px-10 max-w-[1480px] mx-auto mt-32">
          <h2 className="font-display tracking-tightest text-3xl mb-10">More from {product.category}.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-12 md:gap-x-6">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
