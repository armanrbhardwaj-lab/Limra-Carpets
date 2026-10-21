import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { allColors, allMaterials, allSizes, categories, categoryName, filterProducts, products, type SortKey } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  q: z.string().max(80).optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop Carpets & Rugs | Limra Carpets" },
      { name: "description", content: "Browse living room, bedroom, Persian-style, modern and commercial carpets. Filter by size, material, colour and price." },
      { property: "og:title", content: "Shop Carpets & Rugs | Limra Carpets" },
      { property: "og:description", content: "Browse and filter the Limra Carpets catalog." },
    ],
  }),
  component: Shop,
});

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Shop() {
  const { q, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [sizes, setSizes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [max, setMax] = useState(20000);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(
    () => filterProducts(products, { q, category, sizes, materials, colors, max: max >= 20000 ? undefined : max, sort }),
    [q, category, sizes, materials, colors, max, sort],
  );

  const reset = () => { setSizes([]); setMaterials([]); setColors([]); setMax(20000); navigate({ search: {} }); };

  const Group = ({ title, items, value, set }: { title: string; items: string[]; value: string[]; set: (v: string[]) => void }) => (
    <fieldset className="border-t py-4">
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</legend>
      <div className="space-y-1.5">
        {items.map((i) => (
          <label key={i} className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={value.includes(i)} onChange={() => set(toggle(value, i))} className="h-4 w-4 accent-[var(--teal)]" /> {i}
          </label>
        ))}
      </div>
    </fieldset>
  );

  const Filters = (
    <div>
      <div className="flex items-center justify-between pb-3">
        <h2 className="font-sans text-base font-bold">Filters</h2>
        <button onClick={reset} className="text-xs font-semibold text-teal hover:underline">Clear all</button>
      </div>
      <fieldset className="border-t py-4">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</legend>
        <div className="space-y-1.5 text-sm">
          <label className="flex cursor-pointer items-center gap-2"><input type="radio" name="cat" checked={!category} onChange={() => navigate({ search: (s) => ({ ...s, category: undefined }) })} className="accent-[var(--teal)]" /> All</label>
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2"><input type="radio" name="cat" checked={category === c.slug} onChange={() => navigate({ search: (s) => ({ ...s, category: c.slug }) })} className="accent-[var(--teal)]" /> {c.name}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="border-t py-4">
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Max price</legend>
        <input type="range" min={500} max={20000} step={500} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full accent-[var(--teal)]" aria-label="Maximum price" />
        <p className="text-sm">{max >= 20000 ? "Any price" : `Up to ₹${max.toLocaleString("en-IN")}`}</p>
      </fieldset>
      <Group title="Size" items={allSizes} value={sizes} set={setSizes} />
      <Group title="Material" items={allMaterials} value={materials} set={setMaterials} />
      <Group title="Colour" items={allColors} value={colors} set={setColors} />
    </div>
  );

  return (
    <div className="container-x py-8">
      <nav className="text-xs text-muted-foreground"><Link to="/" className="hover:text-teal">Home</Link> / Shop{category && ` / ${categoryName(category)}`}</nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">{q ? `Results for “${q}”` : category ? categoryName(category) : "All carpets"}</h1>
          <p className="text-sm text-muted-foreground">{list.length} sample product{list.length !== 1 && "s"} · illustrative catalog</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
          <label className="sr-only" htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-md border bg-card px-3 py-2 text-sm">
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top rated</option>
            <option value="discount">Biggest discount</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-fit rounded-lg border bg-card p-4 lg:block">{Filters}</aside>
        <div>
          {list.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <p className="font-semibold">No carpets match these filters.</p>
              <button onClick={reset} className="mt-3 text-sm font-semibold text-teal hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-foreground/40" aria-label="Close filters" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-80 max-w-[90%] flex-col bg-card">
            <div className="flex items-center justify-between border-b p-4"><span className="font-semibold">Filter & refine</span><button onClick={() => setDrawer(false)} aria-label="Close"><X /></button></div>
            <div className="flex-1 overflow-y-auto p-4">{Filters}</div>
            <div className="border-t p-4"><button onClick={() => setDrawer(false)} className="w-full rounded-md bg-primary py-2.5 font-semibold text-primary-foreground">Show {list.length} results</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
