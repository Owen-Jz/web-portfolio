import ProductCard from "./ProductCard";
import { type Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-32 text-center text-mute">
        <p className="font-display text-3xl tracking-tightest text-ink">Nothing here.</p>
        <p className="text-sm mt-2">Try a different category.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 md:gap-x-6 md:gap-y-16">
      {products.map((p, i) => (
        // First 6 = above the fold on a 1440×900 desktop grid.
        // Marking them priority/eager lets the browser kick off
        // fetches immediately instead of waiting for IntersectionObserver.
        <ProductCard key={p.slug} product={p} eager={i < 6} />
      ))}
    </div>
  );
}
