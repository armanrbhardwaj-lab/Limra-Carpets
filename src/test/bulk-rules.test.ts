import { describe, expect, it } from "vitest";
import { bulkSchema } from "@/lib/bulk-schema";
import { filterProducts, products } from "@/lib/products";

const valid = { name: "Asha", company: "Asha Interiors", phone: "9876543210", email: "", city: "Pune", quantity: "50", carpetType: "Modern Rugs", message: "" };

describe("bulk enquiry rules", () => {
  it("accepts a valid enquiry with optional email empty", () => {
    expect(bulkSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects invalid Indian phone", () => {
    expect(bulkSchema.safeParse({ ...valid, phone: "12345" }).success).toBe(false);
  });
  it("requires business/company", () => {
    expect(bulkSchema.safeParse({ ...valid, company: "" }).success).toBe(false);
  });
});

describe("catalog search", () => {
  it("matches by category name", () => {
    const r = filterProducts(products, { q: "persian" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.category === "persian" || p.name.toLowerCase().includes("persian"))).toBe(true);
  });
  it("sorts by price ascending", () => {
    const r = filterProducts(products, { sort: "price-asc" });
    expect(r[0].price).toBeLessThanOrEqual(r[1].price);
  });
});
