import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { promises } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Limra Carpets | Retail & Bulk Carpet Supply" },
      { name: "description", content: "Learn about Limra Carpets — carpets and rugs for homes and businesses, with retail and bulk supply." },
      { property: "og:title", content: "About Limra Carpets" },
      { property: "og:description", content: "Carpets and rugs for homes and businesses across India." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-x py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">About us</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-5xl">Carpets chosen for real spaces</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">Limra Carpets offers carpets and rugs for living rooms, bedrooms, offices and commercial spaces. Whether you need a single rug for your home or a large quantity for a project, we aim to make choosing simple and personal.</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">We welcome retail customers, wholesale buyers and businesses alike — reach out and we'll help you find the right fit.</p>
          <Link to="/contact" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Get in touch</Link>
        </div>
        <img src={hero} alt="Living room with a Limra-style carpet" loading="lazy" width={1600} height={912} className="rounded-xl shadow-card" />
      </div>
      <h2 className="mt-16 text-2xl font-semibold md:text-3xl">Why choose Limra</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-lg border bg-card p-6">
            <Icon className="h-7 w-7 text-teal" />
            <p className="mt-3 font-semibold">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
