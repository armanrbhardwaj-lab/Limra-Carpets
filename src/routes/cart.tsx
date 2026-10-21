import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatINR, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Enquiry Cart | Limra Carpets" },
      { name: "description", content: "Review carpets in your cart and send an enquiry to Limra Carpets." },
      { property: "og:title", content: "Your Enquiry Cart | Limra Carpets" },
      { property: "og:description", content: "Review selected carpets and send an enquiry." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();

  const message = [
    "Hi Limra Carpets, I'd like to enquire about:",
    ...items.map((i) => {
      const p = getProduct(i.id);
      return `• ${p?.name} — ${i.size}, ${i.material} × ${i.qty}`;
    }),
    `Estimated subtotal (demo prices): ${formatINR(subtotal)}`,
  ].join("\n");

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add carpets to build an enquiry list.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Shop Carpets</Link>
      </div>
    );

  return (
    <div className="container-x py-8">
      <h1 className="text-2xl font-semibold md:text-3xl">Your cart <span className="text-base font-normal text-muted-foreground">({count} item{count !== 1 && "s"})</span></h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y rounded-lg border bg-card">
          {items.map((i, idx) => {
            const p = getProduct(i.id);
            if (!p) return null;
            return (
              <li key={`${i.id}-${i.size}-${i.material}`} className="flex gap-4 p-4">
                <Link to="/product/$id" params={{ id: p.id }} className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" /></Link>
                <div className="flex flex-1 flex-col">
                  <Link to="/product/$id" params={{ id: p.id }} className="font-semibold hover:text-teal">{p.name}</Link>
                  <p className="text-xs text-muted-foreground">{i.size} · {i.material}</p>
                  <p className="mt-1 font-bold">{formatINR(p.price * i.qty)}</p>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <div className="flex items-center rounded-md border">
                      <button onClick={() => setQty(idx, i.qty - 1)} className="p-1.5" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                      <span className="w-10 text-center text-sm">{i.qty}</span>
                      <button onClick={() => setQty(idx, i.qty + 1)} className="p-1.5" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => remove(idx)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <aside className="h-fit rounded-lg border bg-card p-5">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-bold">{formatINR(subtotal)}</span></div>
          <p className="mt-1 text-xs text-muted-foreground">Based on illustrative demo prices. Delivery and final pricing confirmed on enquiry.</p>
          <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-md bg-gold py-3 font-semibold text-gold-foreground hover:brightness-95"><MessageCircle className="h-5 w-5" /> Send enquiry on WhatsApp</a>
          <Link to="/bulk-orders" className="mt-3 block rounded-md border border-primary py-3 text-center font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Request bulk quote instead</Link>
          <p className="mt-4 rounded bg-muted p-3 text-xs text-muted-foreground">This is an enquiry storefront — no online payment is taken. Our team will contact you to confirm your order.</p>
        </aside>
      </div>
    </div>
  );
}
