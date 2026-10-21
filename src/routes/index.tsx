import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Layers, Headphones, PackageCheck, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import bulk from "@/assets/bulk.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Limra Carpets | Carpet Store & Bulk Orders" },
      { name: "description", content: "Style every space with Limra Carpets — rugs for living rooms, bedrooms and offices, plus wholesale & bulk supply." },
      { property: "og:title", content: "Limra Carpets | Carpet Store & Bulk Orders" },
      { property: "og:description", content: "Rugs for every room and bulk carpet supply for businesses across India." },
    ],
  }),
  component: Index,
});

export const promises = [
  { icon: Layers, title: "Quality selection", text: "Curated carpets across styles, materials and budgets." },
  { icon: PackageCheck, title: "Bulk supply", text: "Volume orders for offices, hotels, retailers and events." },
  { icon: Headphones, title: "Personal support", text: "Help choosing sizes, materials and quantities." },
  { icon: Truck, title: "Delivery coordination", text: "We work with you to plan delivery to your location." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <img src={hero} alt="Navy and gold carpet in an elegant living room" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="container-x relative py-20 md:py-32">
          <p className="mb-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">Retail · Wholesale · Bulk</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-primary-foreground md:text-6xl">Style Every Space with Limra Carpets</h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/85 md:text-lg">Rugs and carpets for homes, offices and commercial spaces — buy a single piece or request bulk supply for your business.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="rounded-md bg-gold px-6 py-3 font-semibold text-gold-foreground transition hover:brightness-95">Shop Carpets</Link>
            <Link to="/bulk-orders" className="rounded-md border border-primary-foreground/60 px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary-foreground hover:text-primary">Request Bulk Quote</Link>
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <div className="container-x grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-teal" />
              <div><p className="text-sm font-semibold">{title}</p><p className="hidden text-xs text-muted-foreground sm:block">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-2xl font-semibold md:text-3xl">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to={c.slug === "custom" ? "/bulk-orders" : "/shop"} search={c.slug === "custom" ? undefined : { category: c.slug }} className="group overflow-hidden rounded-lg border bg-card transition hover:shadow-card">
              <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
              <p className="flex items-center justify-between px-3 py-3 text-sm font-semibold">{c.name}<ArrowRight className="h-4 w-4 text-teal opacity-0 transition group-hover:opacity-100" /></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Popular picks</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sample catalog — products and prices are illustrative.</p>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-teal hover:underline">View all →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="container-x mt-16">
        <div className="grid overflow-hidden rounded-xl bg-primary text-primary-foreground md:grid-cols-2">
          <img src={bulk} alt="Rolled carpets ready for bulk supply" loading="lazy" width={1200} height={800} className="h-64 w-full object-cover md:h-full" />
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">For businesses</p>
            <h2 className="mt-2 text-3xl font-semibold">Bulk & wholesale carpet supply</h2>
            <p className="mt-3 text-primary-foreground/80">Offices, hotels, banquet halls, schools, retailers and interior contractors — tell us what you need and we'll prepare a quote.</p>
            <Link to="/bulk-orders" className="mt-6 inline-block rounded-md bg-gold px-6 py-3 font-semibold text-gold-foreground hover:brightness-95">Request Bulk Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
