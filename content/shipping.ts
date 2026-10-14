/**
 * /shipping content, same section schema as /about (content/sections.ts).
 * Values in [BRACKETS] are placeholders still to be confirmed.
 */
import type { AboutPage } from "./sections";

export const shipping: AboutPage = {
  ctaPrefix: "shipping",
  seo: {
    title: { en: "Shipping | KLOW Wholesale — K-beauty shipped worldwide from Korea" },
    description: {
      en: "K-beauty samples and wholesale orders shipped from our warehouse in Korea. Free shipping at 5 SKUs, 2–7 day dispatch, export documents and local labels included.",
    },
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "Shipping" },
      title: { en: "Shipped from Korea, worldwide." },
      subtitle: { en: "Free at 5 SKUs." },
      body: {
        en: "Every order leaves our own warehouse in Korea, checked, packed and documented for your market. Mix any five products across brands and sample shipping is on us.",
      },
      links: [
        { label: { en: "Request bulk quote" }, href: "/ordering-payment#quote", variant: "primary", ctaId: "shipping_hero_quote" },
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "secondary", ctaId: "shipping_hero_sample" },
      ],
    },
    {
      id: "at-a-glance",
      type: "facts",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "At a glance" },
      title: { en: "Shipping terms." },
      items: [
        { key: "from", title: { en: "Ships from" }, value: { en: "Our warehouse in [CITY], Korea" } },
        { key: "dispatch", title: { en: "Dispatch" }, value: { en: "Within 2–7 days of your order" } },
        { key: "samples", title: { en: "Sample shipping" }, value: { en: "Free at 5 SKUs · $18 flat below that" } },
        { key: "wholesale", title: { en: "Wholesale shipping" }, value: { en: "Quoted per order · [AIR / SEA]" } },
        { key: "delivery", title: { en: "Delivery time" }, value: { en: "[X–Y] business days, by market" } },
        { key: "duties", title: { en: "Duties & taxes" }, value: { en: "Paid by the buyer on arrival · DDP on request" } },
        { key: "carriers", title: { en: "Carriers" }, value: { en: "[CARRIERS]" } },
      ],
      addons: [
        { type: "contextCta", variant: "quote", text: { en: "Shipping a full order? Get the landed cost before you commit." }, ctaId: "shipping_terms" },
      ],
    },
    {
      id: "markets",
      type: "regions",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "Documents & labels" },
      title: { en: "Ready for your market before it ships." },
      body: { en: "Export documents travel with every order. For our focus markets we also prepare local-language labels and the import paperwork." },
      items: [
        { title: { en: "Mexico & Latin America" }, description: { en: "Spanish labels, import documents" } },
        { title: { en: "Kazakhstan & Central Asia" }, description: { en: "Russian labels, EAEU document pack" } },
        { title: { en: "UAE & GCC" }, description: { en: "Arabic labels, registration support" } },
        { title: { en: "Everywhere" }, description: { en: "CI, packing list, C/O" } },
      ],
      images: [{ alt: { en: "Map of KLOW shipping routes from Korea" }, fallback: "worldMap" }],
      addons: [
        {
          type: "leadMagnets",
          title: { en: "Free checklists for your market" },
          ids: ["mexico-import-checklist", "eaeu-document-pack", "gcc-labelling-guide"],
          ctaPrefix: "shipping_markets_lead",
        },
      ],
    },
    {
      id: "journey",
      type: "steps",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "From our shelf to your door" },
      title: { en: "What happens after you order." },
      items: [
        { title: { en: "Picked & checked" }, description: { en: "Expiry dates and packaging are checked again before packing." } },
        { title: { en: "Documented" }, description: { en: "Commercial invoice, packing list and C/O prepared for your market." } },
        { title: { en: "Dispatched from Korea" }, description: { en: "Within 2–7 days, with tracking sent by email." } },
        { title: { en: "Delivered & cleared" }, description: { en: "Duties paid on arrival, or by us if you chose DDP." } },
      ],
    },
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "FAQ" },
      title: { en: "Shipping questions." },
      faqCategory: "shipping",
    },
    {
      id: "start",
      type: "cta",
      enabled: true,
      order: 5,
      title: { en: "Five SKUs ship free." },
      links: [
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "primary", ctaId: "shipping_final_sample" },
        { label: { en: "Request bulk quote" }, href: "/ordering-payment#quote", variant: "secondary", ctaId: "shipping_final_quote" },
      ],
    },
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 6,
      label: { en: "Keep reading" },
      items: [
        { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, and how we source directly from brands." } },
        { key: "ordering", href: "/ordering-payment", title: { en: "Ordering & Payment" }, description: { en: "From a one-unit sample to MOQ reorders and bulk quotes, and how you pay." } },
      ],
    },
  ],
};
