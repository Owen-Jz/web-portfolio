"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* `skeleton` shows a moving sheen behind the <img> until it covers
          the parent. With images.unoptimized=true the first paint can be
          slow on cold cache; this keeps the card from feeling broken. */}
      <div className="relative aspect-[3/4] overflow-hidden skeleton">
        {/* Primary image */}
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          priority={eager}
          className="object-cover transition-opacity duration-500 ease-editorial group-hover:opacity-0"
        />
        {/* Hover-swap image */}
        <Image
          src={product.images[1]?.src ?? product.images[0].src}
          alt={product.images[1]?.alt ?? product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover opacity-0 transition-all duration-700 ease-editorial group-hover:opacity-100 group-hover:scale-[1.03]"
        />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-bg text-ink px-2 py-1">
              New
            </span>
          )}
          {onSale && (
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-coral text-bg px-2 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Quick view chip on hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-bg
                        opacity-0 translate-y-2 transition-all duration-500 ease-editorial
                        group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-ink/85 px-3 py-2 backdrop-blur-sm">
            Quick view →
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-ink/85 px-3 py-2 backdrop-blur-sm">
            {product.colors.length} colors
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[17px] leading-tight tracking-tightest">{product.name}</h3>
          <p className="text-[12px] text-mute mt-0.5">{product.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          {onSale && (
            <p className="font-mono text-[11px] text-mute line-through">
              {formatPrice(product.compareAtPrice!)}
            </p>
          )}
          <p className={`font-mono text-[13px] ${onSale ? "text-coral" : "text-ink"}`}>
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
