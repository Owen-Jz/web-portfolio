import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  return <ProductDetail product={product} />;
}
