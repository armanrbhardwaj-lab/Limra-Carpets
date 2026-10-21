import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="weave-border" />
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 text-sm opacity-80">Carpets and rugs for homes, offices and businesses — retail and bulk supply across India.</p>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-sm font-semibold text-gold">Shop</h3>
          <ul className="space-y-2 text-sm opacity-85">
            {categories.map((c) => <li key={c.slug}><Link to="/shop" search={{ category: c.slug }} className="hover:text-gold">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-sm font-semibold text-gold">Company</h3>
          <ul className="space-y-2 text-sm opacity-85">
            <li><Link to="/about" className="hover:text-gold">About Limra</Link></li>
            <li><Link to="/bulk-orders" className="hover:text-gold">Bulk & Wholesale</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact & FAQ</Link></li>
            <li><Link to="/cart" className="hover:text-gold">Enquiry Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-sans text-sm font-semibold text-gold">Contact</h3>
          <ul className="space-y-2 text-sm opacity-85">
            <li>{siteConfig.phoneDisplay}</li>
            <li>{siteConfig.email}</li>
            <li>{siteConfig.address}</li>
          </ul>
          {siteConfig.isPlaceholder && <p className="mt-3 inline-block rounded bg-gold/20 px-2 py-1 text-xs text-gold">Placeholder details — awaiting owner confirmation</p>}
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col gap-2 py-5 text-xs opacity-70 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Limra Carpets</span>
          <span>Demo storefront: products & prices are illustrative. Orders are placed by enquiry — no online payment.</span>
        </div>
      </div>
    </footer>
  );
}
