import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useState } from "react";
import bulk from "@/assets/bulk.jpg";
import { bulkSchema } from "@/lib/bulk-schema";
import { categories } from "@/lib/products";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "Bulk & Wholesale Carpet Orders | Limra Carpets" },
      { name: "description", content: "Request a bulk or wholesale carpet quote for offices, hotels, retail and events across India." },
      { property: "og:title", content: "Bulk & Wholesale Carpet Orders | Limra Carpets" },
      { property: "og:description", content: "Volume carpet supply for businesses — request a quote." },
    ],
  }),
  component: BulkPage,
});

const tiers = [
  { name: "Starter", range: "10 – 49 units", text: "For small offices, boutiques and home projects." },
  { name: "Business", range: "50 – 249 units", text: "For hotels, schools, showrooms and banquet halls." },
  { name: "Wholesale", range: "250+ units", text: "For retailers, distributors and contractors." },
];

const empty = { name: "", company: "", phone: "", email: "", city: "", quantity: "", carpetType: "", message: "" };
type Field = keyof typeof empty;

function BulkPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [done, setDone] = useState(false);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = bulkSchema.safeParse(form);
    if (!r.success) {
      const errs: Partial<Record<Field, string>> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as Field] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };

  const waMessage = `Bulk enquiry — ${form.name} (${form.company}), ${form.city}. Type: ${form.carpetType}. Qty: ${form.quantity}. Phone: ${form.phone}. ${form.message}`;

  const input = "mt-1 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-teal";
  const F = ({ k, label, children }: { k: Field; label: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={k} className="text-sm font-medium">{label}</label>
      {children}
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <section className="relative bg-primary">
        <img src={bulk} alt="Rolled carpets in a warehouse" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="container-x relative py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Wholesale & bulk</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold text-primary-foreground md:text-5xl">Carpet supply for your business</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/85">Share your requirement and we'll get back with options and a quote.</p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-lg border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal">{t.name}</p>
              <p className="mt-1 font-display text-2xl font-semibold">{t.range}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              <p className="mt-3 text-xs font-medium text-gold-foreground">Volume pricing on request</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border bg-card p-6 md:p-8">
          {done ? (
            <div className="py-8 text-center" role="status">
              <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
              <h2 className="mt-4 text-2xl font-semibold">Thank you, {form.name.split(" ")[0]}!</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Your enquiry details are ready. This demo site doesn't send forms automatically yet — please send it to us on WhatsApp so our team receives it.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md bg-gold px-5 py-3 font-semibold text-gold-foreground hover:brightness-95"><MessageCircle className="h-5 w-5" /> Send via WhatsApp</a>
                <button onClick={() => { setForm(empty); setDone(false); }} className="rounded-md border px-5 py-3 font-semibold hover:bg-muted">New enquiry</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <h2 className="text-2xl font-semibold sm:col-span-2">Request a bulk quote</h2>
              <F k="name" label="Your name *"><input id="name" className={input} value={form.name} onChange={set("name")} maxLength={100} /></F>
              <F k="company" label="Business / company *"><input id="company" className={input} value={form.company} onChange={set("company")} maxLength={120} /></F>
              <F k="phone" label="Phone *"><input id="phone" type="tel" className={input} value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" maxLength={16} /></F>
              <F k="email" label="Email (optional)"><input id="email" type="email" className={input} value={form.email} onChange={set("email")} maxLength={255} /></F>
              <F k="city" label="City *"><input id="city" className={input} value={form.city} onChange={set("city")} maxLength={80} /></F>
              <F k="quantity" label="Estimated quantity *"><input id="quantity" inputMode="numeric" className={input} value={form.quantity} onChange={set("quantity")} placeholder="Pieces or sq ft" maxLength={7} /></F>
              <div className="sm:col-span-2">
                <F k="carpetType" label="Carpet type *">
                  <select id="carpetType" className={input} value={form.carpetType} onChange={set("carpetType")}>
                    <option value="">Select…</option>
                    {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
                    <option>Not sure yet</option>
                  </select>
                </F>
              </div>
              <div className="sm:col-span-2">
                <F k="message" label="Message">
                  <textarea id="message" rows={4} className={`${input} h-auto py-2`} value={form.message} onChange={set("message")} maxLength={1000} placeholder="Sizes, colours, timeline, delivery location…" />
                </F>
              </div>
              <button type="submit" className="rounded-md bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 sm:col-span-2">Submit enquiry</button>
              <p className="text-xs text-muted-foreground sm:col-span-2">Demo form: details are not stored or sent automatically. After submitting you can forward them via WhatsApp.</p>
            </form>
          )}
        </div>
        <aside className="h-fit space-y-4 rounded-lg border bg-card p-6">
          <h3 className="font-sans text-base font-bold">Prefer to chat?</h3>
          <p className="text-sm text-muted-foreground">Message us on WhatsApp with your requirement.</p>
          <a href={whatsappLink("Hi Limra Carpets, I have a bulk carpet requirement.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-teal py-3 font-semibold text-teal-foreground hover:brightness-95"><MessageCircle className="h-5 w-5" /> WhatsApp {siteConfig.phoneDisplay}</a>
          {siteConfig.isPlaceholder && <p className="text-xs text-muted-foreground">Placeholder number — the owner's WhatsApp number will be added.</p>}
        </aside>
      </section>
    </>
  );
}
