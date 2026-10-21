import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, MapPin, MessageCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { categoryName, getProduct, products } from "@/lib/products";
import { formatINR, whatsappLink } from "@/lib/site-config";
import { useCart } from "@/lib/cart";
import { ProductCard, Stars } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { name: p.name, description: p.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} | Limra Carpets` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} | Limra Carpets` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Product not found | Limra Carpets" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const p = getProduct(id)!;
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(p.sizes[0]);
  const [material, setMaterial] = useState(p.materials[0]);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [added, setAdded] = useState(false);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  const checkPin = () => setPinMsg(/^[1-9]\d{5}$/.test(pin) ? `Thanks — we'll confirm delivery options for ${pin} when you enquire.` : "Please enter a valid 6-digit pincode.");

  return (
    <div className="container-x py-8">
      <nav className="text-xs text-muted-foreground"><Link to="/" className="hover:text-teal">Home</Link> / <Link to="/shop" search={{ category: p.category }} className="hover:text-teal">{categoryName(p.category)}</Link> / {p.name}</nav>
      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex gap-2 sm:flex-col">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`h-16 w-16 overflow-hidden rounded-md border-2 ${i === img ? "border-teal" : "border-transparent"}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg border bg-card">
            <img src={p.images[img]} alt={p.name} width={816} height={816} className="aspect-square w-full object-cover" />
            <span className="absolute left-3 top-3 rounded bg-card/90 px-2 py-1 text-xs font-semibold text-muted-foreground">Sample product image</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal">{categoryName(p.category)}</p>
          <h1 className="mt-1 text-2xl font-semibold md:text-3xl">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2"><Stars value={p.rating} /><span className="text-xs text-muted-foreground">Sample rating (demo)</span></div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatINR(p.price)}</span>
            {off > 0 && <><span className="text-muted-foreground line-through">{formatINR(p.mrp)}</span><span className="font-semibold text-success">{off}% off</span></>}
          </div>
          <p className="text-xs text-muted-foreground">Illustrative demo price · final price confirmed on enquiry</p>
          <p className="mt-4 text-sm leading-relaxed">{p.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`rounded-md border px-3 py-1.5 text-sm ${s === size ? "border-teal bg-teal/10 font-semibold text-teal" : "hover:border-foreground/40"}`}>{s}</button>)}</div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">Material</p>
            <div className="flex flex-wrap gap-2">{p.materials.map((m) => <button key={m} onClick={() => setMaterial(m)} className={`rounded-md border px-3 py-1.5 text-sm ${m === material ? "border-teal bg-teal/10 font-semibold text-teal" : "hover:border-foreground/40"}`}>{m}</button>)}</div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-sm font-semibold">Quantity</p>
            <div className="flex items-center rounded-md border bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
              <input value={qty} onChange={(e) => setQty(Math.max(1, Math.min(999, Number(e.target.value.replace(/\D/g, "")) || 1)))} className="w-12 text-center text-sm outline-none" aria-label="Quantity" />
              <button onClick={() => setQty(Math.min(999, qty + 1))} className="p-2" aria-label="Increase"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => { add({ id: p.id, size, material, qty }); setAdded(true); }} className="flex items-center justify-center gap-2 rounded-md bg-gold py-3 font-semibold text-gold-foreground hover:brightness-95"><ShoppingCart className="h-5 w-5" /> {added ? "Added to cart ✓" : "Add to cart"}</button>
            <a href={whatsappLink(`Hi Limra Carpets, I'd like bulk pricing for "${p.name}" (${size}, ${material}). Quantity: ${qty}+`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md border border-primary py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground"><MessageCircle className="h-5 w-5" /> Ask about bulk pricing</a>
          </div>
          {added && <Link to="/cart" className="mt-2 inline-block text-sm font-semibold text-teal hover:underline">View cart →</Link>}

          <div className="mt-6 rounded-lg border bg-card p-4">
            <p className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-teal" /> Delivery</p>
            <div className="mt-2 flex gap-2">
              <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter pincode" inputMode="numeric" className="h-10 flex-1 rounded-md border bg-background px-3 text-sm" aria-label="Pincode" />
              <button onClick={checkPin} className="rounded-md border px-4 text-sm font-semibold text-teal hover:bg-muted">Check</button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{pinMsg || "Delivery availability and charges are confirmed with you directly."}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">You may also like</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
