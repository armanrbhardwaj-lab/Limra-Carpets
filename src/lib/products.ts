// Illustrative sample catalog. Names, prices and specs are demo data — edit freely.
import persian from "@/assets/rug-persian.jpg";
import modern from "@/assets/rug-modern.jpg";
import shag from "@/assets/rug-shag.jpg";
import office from "@/assets/rug-office.jpg";
import kilim from "@/assets/rug-kilim.jpg";
import round from "@/assets/rug-round.jpg";
import hero from "@/assets/hero.jpg";

export const categories = [
  { slug: "living-room", name: "Living Room", image: hero },
  { slug: "bedroom", name: "Bedroom", image: shag },
  { slug: "persian", name: "Persian-Style", image: persian },
  { slug: "modern", name: "Modern Rugs", image: modern },
  { slug: "office", name: "Office & Commercial", image: office },
  { slug: "custom", name: "Custom / Bulk Orders", image: kilim },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  sizes: string[];
  materials: string[];
  color: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
};

export const products: Product[] = [
  { id: "noor-medallion", name: "Noor Medallion Persian-Style Rug", category: "persian", sizes: ["4x6 ft", "5x8 ft", "6x9 ft"], materials: ["Wool Blend", "Polyester"], color: "Red", price: 8499, mrp: 11999, rating: 4.5, reviews: 0, images: [persian, hero], description: "Classic medallion design with rich red field and navy border, inspired by traditional Persian motifs." },
  { id: "shahi-navy", name: "Shahi Navy Floral Carpet", category: "living-room", sizes: ["5x8 ft", "6x9 ft", "8x10 ft"], materials: ["Wool Blend"], color: "Blue", price: 14999, mrp: 18999, rating: 4.7, reviews: 0, images: [hero, persian], description: "Deep navy floral field with a warm gold border — a statement piece for large living rooms." },
  { id: "arc-teal", name: "Arc Teal Geometric Rug", category: "modern", sizes: ["4x6 ft", "5x7 ft"], materials: ["Polyester", "Viscose"], color: "Teal", price: 5299, mrp: 6499, rating: 4.3, reviews: 0, images: [modern], description: "Bold modern arcs in teal, charcoal and ivory with a soft, low-maintenance pile." },
  { id: "cloud-shaggy", name: "Cloud Ivory Shaggy Rug", category: "bedroom", sizes: ["3x5 ft", "4x6 ft", "5x7 ft"], materials: ["Polyester"], color: "Ivory", price: 3999, mrp: 4999, rating: 4.4, reviews: 0, images: [shag], description: "Plush high-pile shaggy rug that adds softness beside the bed." },
  { id: "corporate-grey", name: "Corporate Low-Pile Carpet (per sq ft)", category: "office", sizes: ["Per sq ft"], materials: ["Nylon", "Polypropylene"], color: "Grey", price: 65, mrp: 65, rating: 4.2, reviews: 0, images: [office], description: "Durable low-pile carpet suited to offices, lobbies and conference rooms. Priced per sq ft; bulk rates on request." },
  { id: "kilim-desert", name: "Desert Kilim Flat-Weave Rug", category: "living-room", sizes: ["4x6 ft", "5x8 ft"], materials: ["Cotton", "Wool Blend"], color: "Gold", price: 4799, mrp: 5999, rating: 4.6, reviews: 0, images: [kilim], description: "Reversible flat-weave kilim with diamond motifs in gold, rust and navy." },
  { id: "jute-round", name: "Natural Jute Round Rug", category: "bedroom", sizes: ["4 ft round", "5 ft round", "6 ft round"], materials: ["Jute"], color: "Beige", price: 2899, mrp: 2899, rating: 4.1, reviews: 0, images: [round], description: "Hand-braided natural jute for an earthy, minimal look." },
  { id: "custom-logo", name: "Custom Logo / Size Carpet", category: "custom", sizes: ["Custom"], materials: ["Nylon", "Wool Blend", "Polyester"], color: "Multi", price: 120, mrp: 120, rating: 4.5, reviews: 0, images: [kilim, office], description: "Made-to-order carpets in your size, colours or logo. Indicative price per sq ft — final quote after enquiry." },
  { id: "tabriz-classic", name: "Tabriz Classic Runner", category: "persian", sizes: ["2.5x8 ft", "2.5x10 ft"], materials: ["Wool Blend"], color: "Red", price: 4499, mrp: 5799, rating: 4.4, reviews: 0, images: [persian], description: "Persian-style runner for hallways and corridors." },
  { id: "halo-modern", name: "Halo Modern Hand-Tufted Rug", category: "modern", sizes: ["5x8 ft", "6x9 ft"], materials: ["Wool Blend", "Viscose"], color: "Teal", price: 9999, mrp: 12499, rating: 4.6, reviews: 0, images: [modern, round], description: "Hand-tufted contemporary rug with subtle sheen." },
  { id: "hotel-heritage", name: "Hotel Heritage Wall-to-Wall Carpet", category: "office", sizes: ["Per sq ft"], materials: ["Nylon"], color: "Blue", price: 95, mrp: 110, rating: 4.3, reviews: 0, images: [hero, office], description: "Patterned broadloom option for hotels, banquet halls and corridors." },
  { id: "snow-bedside", name: "Snow Bedside Runner Pair", category: "bedroom", sizes: ["2x5 ft (pair)"], materials: ["Polyester"], color: "Ivory", price: 2499, mrp: 3199, rating: 4.2, reviews: 0, images: [shag], description: "Set of two soft bedside runners." },
];

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
export const allMaterials = Array.from(new Set(products.flatMap((p) => p.materials)));
export const allColors = Array.from(new Set(products.map((p) => p.color)));

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "discount";

export function filterProducts(
  list: Product[],
  f: { q?: string; category?: string; sizes?: string[]; materials?: string[]; colors?: string[]; min?: number; max?: number; sort?: SortKey },
) {
  const q = f.q?.trim().toLowerCase();
  let out = list.filter((p) => {
    if (q && !`${p.name} ${categoryName(p.category)} ${p.materials.join(" ")} ${p.color}`.toLowerCase().includes(q)) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.sizes?.length && !p.sizes.some((s) => f.sizes!.includes(s))) return false;
    if (f.materials?.length && !p.materials.some((m) => f.materials!.includes(m))) return false;
    if (f.colors?.length && !f.colors.includes(p.color)) return false;
    if (f.min != null && p.price < f.min) return false;
    if (f.max != null && p.price > f.max) return false;
    return true;
  });
  const disc = (p: Product) => (p.mrp - p.price) / p.mrp;
  if (f.sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
  if (f.sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
  if (f.sort === "discount") out = [...out].sort((a, b) => disc(b) - disc(a));
  return out;
}
