/**
 * Mock product catalog — swap this file's export for a fetch() from
 * Shopify / Stripe / your CMS without touching any component.
 *
 * Each product has TWO images so cards can hover-swap front↔back.
 */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: "outerwear" | "knits" | "denim" | "dresses" | "accessories" | "shoes";
  collection: string;
  price: number;             // in cents
  compareAtPrice?: number;   // for sale tags
  images: { src: string; alt: string }[]; // first = primary, second = hover
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  fabric: string;
  origin: string;
  isNew?: boolean;
  isSoldOut?: boolean;
};

/* w=800 / q=75 cuts the per-image payload roughly in half vs the prior
   w=1200 / q=80. With images.unoptimized = true (set in next.config.mjs to
   avoid the Next.js proxy's 7s upstream timeout), we hit Unsplash direct
   on every request — smaller bytes = faster perceived load on /shop. */
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const products: Product[] = [
  {
    slug: "carlton-wool-overcoat",
    name: "Carlton Wool Overcoat",
    tagline: "Double-breasted, dropped shoulder.",
    category: "outerwear",
    collection: "Winter Editorial 01",
    price: 89000,
    images: [
      { src: U("1551488831-00ddcb6c6bd3"), alt: "Carlton wool overcoat, front" },
      { src: U("1542291026-7eec264c27ff"), alt: "Carlton wool overcoat, back" },
    ],
    colors: [
      { name: "Camel", hex: "#b18a5a" },
      { name: "Ink",   hex: "#1a1a1a" },
      { name: "Bone",  hex: "#e6dfcf" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A heavyweight Italian wool overcoat with a dropped shoulder and softly structured silhouette. Worn open over knitwear or belted for evening.",
    fabric: "92% virgin wool, 8% cashmere",
    origin: "Made in Biella, Italy",
    isNew: true,
  },
  {
    slug: "lione-silk-slip-dress",
    name: "Lione Silk Slip Dress",
    tagline: "Bias-cut, mid-calf.",
    category: "dresses",
    collection: "Resort 02",
    price: 42000,
    images: [
      { src: U("1539109136881-3be0616acf4b"), alt: "Lione silk slip dress" },
      { src: U("1583744946564-b52ac1c389c8"), alt: "Lione silk slip dress, alternate" },
    ],
    colors: [
      { name: "Champagne", hex: "#e8d9b4" },
      { name: "Noir",      hex: "#111" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "An on-the-bias slip dress in liquid silk-satin. Adjustable straps, French seams, weighted hem.",
    fabric: "100% mulberry silk",
    origin: "Made in Como, Italy",
    isNew: true,
  },
  {
    slug: "saito-cashmere-crewneck",
    name: "Saito Cashmere Crewneck",
    tagline: "Two-ply, oversized.",
    category: "knits",
    collection: "Core",
    price: 32500,
    images: [
      { src: U("1542272604-787c3835535d"), alt: "Saito cashmere crewneck" },
      { src: U("1581094288338-2314dddb7ece"), alt: "Saito cashmere crewneck, back" },
    ],
    colors: [
      { name: "Ash",   hex: "#9a958c" },
      { name: "Bone",  hex: "#e6dfcf" },
      { name: "Forest", hex: "#26382b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Pure Mongolian cashmere knit on a vintage two-ply machine. Ribbed collar, raglan sleeve, dropped shoulder.",
    fabric: "100% grade-A cashmere",
    origin: "Made in Inner Mongolia",
  },
  {
    slug: "eddo-rinse-denim",
    name: "Eddo Rinse Denim Trouser",
    tagline: "High rise, wide leg.",
    category: "denim",
    collection: "Core",
    price: 28000,
    compareAtPrice: 34000,
    images: [
      { src: U("1542060748-10c28b62716f"), alt: "Eddo denim trouser" },
      { src: U("1602810316693-3667c854239a"), alt: "Eddo denim trouser, detail" },
    ],
    colors: [
      { name: "Indigo", hex: "#1a2547" },
      { name: "Vintage", hex: "#5a647c" },
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    description:
      "13.5oz Japanese selvedge denim. High waist, full leg, single-needle topstitch. Rinsed once for a clean indigo.",
    fabric: "100% cotton selvedge",
    origin: "Cut & sewn in Los Angeles, CA",
  },
  {
    slug: "verra-double-breasted-blazer",
    name: "Verra Double-Breasted Blazer",
    tagline: "Sharp shoulder, soft hand.",
    category: "outerwear",
    collection: "Tailoring",
    price: 56000,
    images: [
      { src: U("1485518882345-15568b007407"), alt: "Verra blazer" },
      { src: U("1556905055-8f358a7a47b2"), alt: "Verra blazer, alternate" },
    ],
    colors: [
      { name: "Charcoal", hex: "#3a3a3a" },
      { name: "Camel",    hex: "#b18a5a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Single-canvas construction, peak lapel, half-lined for warmth without weight.",
    fabric: "Super 120s wool",
    origin: "Tailored in Naples, Italy",
  },
  {
    slug: "atria-leather-tote",
    name: "Atria Leather Tote",
    tagline: "One main, two slip.",
    category: "accessories",
    collection: "Core",
    price: 49000,
    images: [
      { src: U("1553062407-98eeb64c6a62"), alt: "Atria leather tote" },
      { src: U("1521369909029-2afed882baee"), alt: "Atria leather tote, detail" },
    ],
    colors: [
      { name: "Cognac", hex: "#8a4f25" },
      { name: "Black",  hex: "#0a0a0a" },
    ],
    sizes: ["One Size"],
    description:
      "Vegetable-tanned cowhide. Hand-stitched edges, brass hardware, soft unstructured body.",
    fabric: "Italian vegetable-tanned leather",
    origin: "Made in Tuscany, Italy",
    isNew: true,
  },
  {
    slug: "olo-suede-court-sneaker",
    name: "Olo Suede Court Sneaker",
    tagline: "Tonal sole, hidden eyelets.",
    category: "shoes",
    collection: "Core",
    price: 26500,
    images: [
      { src: U("1606107557195-0e29a4b5b4aa"), alt: "Olo suede sneaker" },
      { src: U("1606107557195-0e29a4b5b4aa"), alt: "Olo suede sneaker, alt" },
    ],
    colors: [
      { name: "Bone",     hex: "#e6dfcf" },
      { name: "Sage",     hex: "#9caa86" },
      { name: "Espresso", hex: "#3a261a" },
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
    description:
      "Italian suede upper, tonal rubber cup-sole, recycled cotton lining. Low court silhouette.",
    fabric: "Suede / rubber / recycled cotton",
    origin: "Made in Le Marche, Italy",
  },
  {
    slug: "cosmo-breton-tee",
    name: "Cosmo Breton Tee",
    tagline: "Heavy cotton, dropped shoulder.",
    category: "knits",
    collection: "Core",
    price: 9500,
    images: [
      { src: U("1583846783214-7229a91b20ed"), alt: "Cosmo breton tee" },
      { src: U("1591047139829-d91aecb6caea"), alt: "Cosmo breton tee, back" },
    ],
    colors: [
      { name: "Bone / Navy",   hex: "#1a2547" },
      { name: "Bone / Tomato", hex: "#c5391c" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "10oz tube-knit cotton in the traditional French marinière. Dropped shoulder, boat neck, weighty hand.",
    fabric: "100% combed cotton",
    origin: "Knit in Saint-Malo, France",
  },
];

export const categories: { key: Product["category"]; label: string }[] = [
  { key: "outerwear",   label: "Outerwear" },
  { key: "knits",       label: "Knits & Tees" },
  { key: "dresses",     label: "Dresses" },
  { key: "denim",       label: "Denim" },
  { key: "accessories", label: "Accessories" },
  { key: "shoes",       label: "Shoes" },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (cat?: Product["category"]) =>
  cat ? products.filter((p) => p.category === cat) : products;
