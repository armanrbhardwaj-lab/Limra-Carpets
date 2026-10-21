import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQ | Limra Carpets" },
      { name: "description", content: "Contact Limra Carpets and read answers to common questions about orders, bulk supply and delivery." },
      { property: "og:title", content: "Contact & FAQ | Limra Carpets" },
      { property: "og:description", content: "Get in touch with Limra Carpets." },
    ],
  }),
  component: Contact,
});

const faqs = [
  { q: "How do I place an order?", a: "Add carpets to your cart and send the enquiry via WhatsApp, or use the bulk quote form. Our team confirms availability, final price and delivery with you directly." },
  { q: "Are the prices on the site final?", a: "Prices shown are illustrative. Final pricing is confirmed on enquiry, especially for bulk and custom orders." },
  { q: "Do you take bulk or wholesale orders?", a: "Yes — wholesale and bulk orders are welcome. Share your quantity and requirement on the Bulk Orders page." },
  { q: "Can I get a custom size or design?", a: "Custom sizes, colours and logo carpets can be discussed. Tell us your requirement and we'll share options." },
  { q: "Do you deliver to my city?", a: "Delivery is coordinated case by case. Share your pincode with your enquiry and we'll confirm options and charges." },
  { q: "Can I pay online?", a: "Not on this site. This is an enquiry storefront — payment terms are agreed directly with our team." },
];

function Contact() {
  const rows = [
    { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay },
    { icon: Mail, label: "Email", value: siteConfig.email },
    { icon: MapPin, label: "Address", value: siteConfig.address },
    { icon: Clock, label: "Hours", value: siteConfig.hours },
  ];
  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-semibold md:text-4xl">Help & contact</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="h-fit rounded-lg border bg-card p-6">
          {siteConfig.isPlaceholder && (
            <p className="mb-4 flex gap-2 rounded-md bg-gold/15 p-3 text-xs"><AlertTriangle className="h-4 w-4 shrink-0 text-gold" /> These contact details are placeholders and need confirmation from the owner.</p>
          )}
          <ul className="space-y-4">
            {rows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-3"><Icon className="mt-0.5 h-5 w-5 text-teal" /><div><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium">{value}</p></div></li>
            ))}
          </ul>
          <a href={whatsappLink("Hi Limra Carpets, I have a question.")} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-md bg-teal py-3 font-semibold text-teal-foreground hover:brightness-95"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</a>
          <Link to="/bulk-orders" className="mt-3 block rounded-md border border-primary py-3 text-center font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Request bulk quote</Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <div className="mt-4 divide-y rounded-lg border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{f.q}<span className="text-teal transition group-open:rotate-45">+</span></summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
