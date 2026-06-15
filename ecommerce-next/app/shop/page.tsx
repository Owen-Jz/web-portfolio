"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, categories, type Product } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export default function ShopPage() {
  const params = useSearchParams();
  const router = useRouter();
  const selected = params.get("c") as Product["category"] | null;
  const [sort, setSort] = useState<SortKey>("featured");

  const items = useMemo(() => {
    let arr = selected ? products.filter((p) => p.category === selected) : [...products];
    switch (sort) {
      case "price-asc":  arr = arr.sort((a, b) => a.price - b.price); break;
      case "price-desc": arr = arr.sort((a, b) => b.price - a.price); break;
      case "new":        arr = arr.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    }
    return arr;
  }, [selected, sort]);

  const setCategory = (c: Product["category"] | null) => {
    const q = new URLSearchParams(params.toString());
    if (c) q.set("c", c); else q.delete("c");
    router.push(`/shop${q.toString() ? "?" + q.toString() : ""}`);
  };

  return (
    <div className="pt-32 pb-24 px-6 lg:px-10">
      <div className="max-w-[1480px] mx-auto">
        {/* Header */}
        <header className="mb-12 lg:mb-16">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-klein mb-3">— The shop</p>
          <h1 className="font-display font-medium tracking-tightest text-[clamp(46px,7vw,120px)] leading-[0.95]">
            {selected
              ? categories.find((c) => c.key === selected)?.label
              : "Everything."}
          </h1>
          <p className="mt-4 text-mute text-[13px] font-mono">
            {items.length} {items.length === 1 ? "piece" : "pieces"} · curated in Brooklyn
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between mb-12 border-y border-line py-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <Chip active={!selected} onClick={() => setCategory(null)}>All</Chip>
            {categories.map((c) => (
              <Chip key={c.key} active={selected === c.key} onClick={() => setCategory(c.key)}>
                {c.label}
              </Chip>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="font-mono text-[11px] tracking-[0.25em] uppercase text-mute">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent border-b border-line py-2 px-1 outline-none font-mono text-[12px] uppercase tracking-wider hover:border-ink"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
        </div>

        <ProductGrid products={items} />
      </div>
    </div>
  );
}

function Chip({
  children, active, onClick,
}: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "shrink-0 font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors " +
        (active
          ? "bg-ink text-bg border-ink"
          : "border-line text-ink hover:border-ink")
      }
    >
      {children}
    </button>
  );
}
