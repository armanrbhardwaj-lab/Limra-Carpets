// EDIT ME: owner-provided contact details. All values below are placeholders
// and must be confirmed by the business owner before going live.
export const siteConfig = {
  name: "Limra Carpets",
  phoneDisplay: "+91 00000 00000",
  whatsappNumber: "910000000000", // digits only, with country code
  email: "hello@example.com",
  address: "Address to be confirmed by owner",
  hours: "Hours to be confirmed by owner",
  isPlaceholder: true,
};

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}
