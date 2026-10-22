# Limra Carpets

Build a polished, responsive e-commerce website for “Limra Carpets”, focused on carpet sales and bulk/wholesale orders in India. Use the familiar shopping usability and marketplace polish of major Indian e-commerce sites like Flipkart and Amazon as inspiration, but create an original brand identity and layout—do not copy their logos or exact UI.

Brand and logo:
- Create a clean, premium “LIMRA CARPETS” wordmark/logo using an original woven carpet/rug motif or geometric rug emblem. Make it as an SVG or CSS/vector logo in the project so it remains crisp. Palette: deep royal blue/navy, warm gold, ivory/white, and a small teal accent. Premium but approachable.
- Show the logo in header and footer and use matching favicon/brand mark.

Storefront:
- Responsive mobile-first header with announcement strip (“Wholesale & Bulk Orders Welcome”), logo, prominent product search, account/help, cart, and category navigation.
- Hero banner with premium carpet imagery, headline “Style Every Space with Limra Carpets”, subtext for retail and bulk supply, CTAs “Shop Carpets” and “Request Bulk Quote”.
- Shop by category tiles: Living Room, Bedroom, Persian-Style, Modern Rugs, Office & Commercial, Custom/Bulk Orders.
- Product grid with believable demo items and clearly marked demo pricing / example products. Product cards include image, title, size, material, price in INR, sale badge where appropriate, rating visual, quick-view/add-to-cart. Use appropriate carpet/rug imagery (remote image URLs or generated gradient/photo placeholders if needed; avoid broken image links).
- Filters and sorting: category, size, material, color, price range; search works against product names/categories; responsive filter drawer on mobile.
- Product details page/modal with gallery, size/material choices, quantity, delivery/pincode field (UI only unless real integration configured), add to cart, and “Ask about bulk pricing”.
- Cart drawer/page with quantity controls, remove, subtotal, and proceed-to-enquiry/WhatsApp CTA. Do not fake payment processing or checkout success.
- Dedicated Bulk Orders page/section: tiers/volume order inquiry, fields for name, business/company, phone, email optional, city, estimated quantity, carpet type, message; validate form and show clear confirmation in UI. Add WhatsApp enquiry CTA but make phone number configurable and use a safe placeholder like +91 00000 00000 until owner provides the actual number.
- About Limra Carpets, why choose us (bulk supply, quality selection, support, delivery coordination—phrase as brand promises/offerings, do not make unsupported certifications or guarantees), FAQ, contact section and footer.
- Add an editable/configurable contact details area with placeholder phone/email/address explicitly labeled as needing owner confirmation. No invented real business address or contact info.
- Add trust cues without fabricated testimonials, fake stock urgency, or unverified delivery guarantees.

Implementation:
- Build the actual functioning frontend, not just a landing page. Use TypeScript, Tailwind and shadcn/ui defaults. Keep stateful search, category filtering, sorting, cart quantity updates, and bulk enquiry validation working.
- Use localStorage for cart persistence if suitable. No payment gateway, accounts, inventory backend, or real form submission unless configured; be transparent in UI that it is an enquiry/demo storefront.
- SEO metadata/title: “Limra Carpets | Carpet Store & Bulk Orders”.
- High quality spacing, clear typography, accessible contrast, hover states, skeleton-free polished loading, responsive desktop/tablet/mobile. Avoid overdone gradients. Use clean ecommerce UX and distinctive Limra brand.
- Use Indian rupee formatting and sample/demo products clearly marked as illustrative, editable sample catalog data.
- Finish with a clean, ready-to-preview site and report what is still placeholder-based.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://limra-carpets.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0266d105-6263-4c11-95ea-feb2c50450cc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
