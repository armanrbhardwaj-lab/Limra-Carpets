import { Link } from "@tanstack/react-router";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { categoryName } from "@/lib/products";
import { formatINR } from "@/lib/site-config";
import { useCart } from "@/lib/cart";

export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-success px-1.5 py-0.5 text-xs font-semibold text-primary-foreground" aria-label={`Sample rating ${value} of 5`}>
      {value.toFixed(1)} <Star className="h-3 w-3 fill-current" />
    </span>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const perSqft = p.sizes[0] === "Per sq ft" || p.category === "custom";

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card transition hover:-translate-y-0.5 hover:shadow-card">
      <Link to="/product/$id" params={{ id: p.id }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {off > 0 && <span className="absolute left-2 top-2 rounded bg-gold px-2 py-0.5 text-xs font-bold text-gold-foreground">{off}% OFF</span>}
        <span className="absolute right-2 top-2 rounded bg-card/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Sample</span>
        <span className="absolute inset-x-2 bottom-2 translate-y-2 rounded bg-primary/90 py-1.5 text-center text-xs font-semibold text-primary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Quick view</span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-teal">{categoryName(p.category)}</p>
        <Link to="/product/$id" params={{ id: p.id }} className="mt-1 line-clamp-2 text-sm font-semibold leading-snug hover:text-teal">{p.name}</Link>
        <p className="mt-1 text-xs text-muted-foreground">{p.sizes.join(" · ")} | {p.materials[0]}</p>
        <div className="mt-2"><Stars value={p.rating} /></div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatINR(p.price)}</span>
          {perSqft && <span className="text-xs text-muted-foreground">/ sq ft</span>}
          {off > 0 && <span className="text-xs text-muted-foreground line-through">{formatINR(p.mrp)}</span>}
        </div>
        <button
          onClick={() => { add({ id: p.id, size: p.sizes[0], material: p.materials[0], qty: 1 }); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
          className="mt-auto flex items-center justify-center gap-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          style={{ marginTop: "0.875rem" }}
        >
          <ShoppingCart className="h-4 w-4" /> {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
