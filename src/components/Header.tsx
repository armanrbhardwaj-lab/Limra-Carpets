import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, HelpCircle, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  const SearchBox = (
    <form onSubmit={submit} role="search" className="flex w-full">
      <label htmlFor="site-search" className="sr-only">Search carpets</label>
      <input
        id="site-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        maxLength={80}
        placeholder="Search carpets, rugs, materials…"
        className="h-11 w-full rounded-l-md border border-r-0 border-input bg-card px-4 text-sm outline-none focus:border-teal"
      />
      <button type="submit" aria-label="Search" className="flex h-11 w-12 items-center justify-center rounded-r-md bg-gold text-gold-foreground transition hover:brightness-95">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 bg-card shadow-card">
      <div className="bg-primary text-primary-foreground">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="font-medium"><span className="text-gold">★</span> Wholesale & Bulk Orders Welcome</span>
          <span className="hidden items-center gap-1.5 opacity-90 sm:flex"><Phone className="h-3.5 w-3.5" /> {siteConfig.phoneDisplay}</span>
        </div>
      </div>
      <div className="container-x flex h-16 items-center gap-4 md:h-20">
        <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu className="h-6 w-6" /></button>
        <Link to="/" aria-label="Limra Carpets home"><Logo /></Link>
        <div className="mx-4 hidden flex-1 md:block">{SearchBox}</div>
        <nav className="ml-auto flex items-center gap-1 sm:gap-3">
          <Link to="/contact" className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted sm:flex"><HelpCircle className="h-5 w-5" /> Help</Link>
          <Link to="/bulk-orders" className="hidden rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground lg:block">Bulk Quote</Link>
          <Link to="/cart" className="relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" aria-label={`Cart, ${count} items`}>
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && <span className="absolute -top-0.5 left-6 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal px-1 text-[11px] font-bold text-teal-foreground">{count}</span>}
          </Link>
        </nav>
      </div>
      <div className="container-x pb-3 md:hidden">{SearchBox}</div>
      <div className="hidden border-t md:block">
        <nav className="container-x flex h-11 items-center gap-6 overflow-x-auto text-sm font-medium">
          <Link to="/shop" activeOptions={{ exact: true, includeSearch: false }} className="whitespace-nowrap hover:text-teal">All Carpets</Link>
          {categories.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="whitespace-nowrap text-muted-foreground hover:text-teal">{c.name}</Link>
          ))}
          <Link to="/about" className="ml-auto whitespace-nowrap text-muted-foreground hover:text-teal">About</Link>
        </nav>
      </div>
      <div className="weave-border" />

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-foreground/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-card p-5">
            <div className="mb-6 flex items-center justify-between"><Logo /><button aria-label="Close" onClick={() => setOpen(false)}><X /></button></div>
            <nav className="flex flex-col gap-1 text-sm" onClick={() => setOpen(false)}>
              <Link to="/shop" className="rounded px-2 py-2.5 font-semibold hover:bg-muted">All Carpets</Link>
              {categories.map((c) => (
                <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="rounded px-2 py-2.5 hover:bg-muted">{c.name}</Link>
              ))}
              <hr className="my-3" />
              <Link to="/bulk-orders" className="rounded px-2 py-2.5 font-semibold text-primary hover:bg-muted">Bulk Orders</Link>
              <Link to="/about" className="rounded px-2 py-2.5 hover:bg-muted">About</Link>
              <Link to="/contact" className="rounded px-2 py-2.5 hover:bg-muted">Help & Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
