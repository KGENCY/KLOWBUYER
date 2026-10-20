/**
 * /about content. Every word and image on the page lives here (LocalizedText, English only for now),
 * so an admin can later CRUD it as JSON. The page renders `sections` sorted by `order`, skipping
 * `enabled: false`. Schema: content/sections.ts.
 *
 * Values in [BRACKETS] are placeholders still waiting for real numbers or details.
 */
import type { AboutPage } from "./sections";
import { PARTNER_SAMPLE_PRICE as SAMPLE } from "./products";

export const about: AboutPage = {
  ctaPrefix: "about",
  seo: {
    title: { en: "About KLOW | Korean Cosmetics Wholesale Supplier & Export Partner" },
    description: {
      en: "KLOW is a Korea-based K-beauty wholesale and export partner: authentic products direct from brands, samples from 1 unit, export documents and local labels.",
    },
  },

  sections: [
    /* ───── Hero ───── */
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "About KLOW" },
      title: { en: "Korean cosmetics wholesale, direct from Korea." },
      subtitle: { en: "Verified brands. Real warehouse." },
      body: {
        en: "KLOW is a Korea-based export and logistics partner working directly with K-beauty brands. Every order ships from our own warehouse in Korea — 100% authentic, with the export documents your market requires.",
      },
      links: [
        { label: { en: "Pick your samples" }, href: "/samples", variant: "primary", ctaId: "about_hero_sample" },
        { label: { en: "Talk to our team" }, href: "#contact", variant: "secondary", ctaId: "about_hero_inquiry" },
      ],
      images: [
        {
          alt: { en: "KLOW K-beauty wholesale warehouse in Korea" },
          caption: { en: "Warehouse · [CITY], Korea" },
          fallback: "warehouse-shelves",
        },
      ],
    },

    /* ───── 01 Who we are ───── */
    {
      id: "who-we-are",
      type: "split",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "Who we are" },
      title: { en: "Not a reseller. A direct partner to Korean brands." },
      body: {
        en: "We contract directly with each brand, receive and inspect stock in our own warehouse, prepare export documents, and ship worldwide — one team, end to end.",
      },
      // Shown as the row of figures under the split.
      items: [
        { key: "brands", value: { en: "[00]+" }, title: { en: "Partner brands" } },
        { key: "countries", value: { en: "[00]" }, title: { en: "Countries shipped" } },
        { key: "skus", value: { en: "[00]+" }, title: { en: "SKUs" } },
        { key: "minimum", value: { en: "1 unit" }, title: { en: "Minimum sample" } },
      ],
    },

    /* ───── 02 Authenticity ───── */
    {
      id: "authentic",
      type: "grid",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "Authenticity" },
      title: { en: "100% authentic, sourced directly." },
      columns: 3,
      items: [
        { title: { en: "Direct brand contracts" }, description: { en: "Every product comes straight from the brand. No grey market, no middlemen." } },
        { title: { en: "Inspected in our warehouse" }, description: { en: "We check expiry dates and packaging condition on arrival." } },
        { title: { en: "Proof on request" }, description: { en: "Ask for a brand authenticity letter with any order." } },
      ],
      // Shown as the row of muted wordmarks under the grid.
      logos: [
        { en: "[BRAND 01]" }, { en: "[BRAND 02]" }, { en: "[BRAND 03]" }, { en: "[BRAND 04]" },
        { en: "[BRAND 05]" }, { en: "[BRAND 06]" }, { en: "[BRAND 07]" }, { en: "[BRAND 08]" },
      ],
      addons: [
        { type: "contextCta", variant: "signup", text: { en: "See verified brands and bulk pricing." }, ctaId: "about_authentic" },
      ],
    },

    /* ───── 03 Warehouse ───── */
    {
      id: "warehouse",
      type: "gallery",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "The warehouse" },
      title: { en: "Our warehouse in Korea." },
      body: { en: "Every product you sample or reorder is picked, checked and packed here." },
      images: [
        { alt: { en: "Storage shelves in KLOW’s K-beauty wholesale warehouse in Korea" }, caption: { en: "Storage" }, fallback: "warehouse-shelves" },
        { alt: { en: "Inspection bench in KLOW’s Korean warehouse, checking K-beauty stock for expiry and packaging" }, caption: { en: "Inspection" }, fallback: "inspection" },
        { alt: { en: "Packing and dispatch area for K-beauty wholesale export orders in Korea" }, caption: { en: "Packing & dispatch" }, fallback: "packing" },
      ],
    },

    /* ───── 04 Markets ───── */
    {
      id: "markets",
      type: "regions",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Where we ship" },
      title: { en: "Built for buyers beyond the usual markets." },
      body: {
        en: "Mexico, Central Asia, the Middle East and beyond. We prepare the documents and local-language labels that indie brands usually don’t have.",
      },
      items: [
        { title: { en: "Mexico & Latin America" }, description: { en: "Spanish labels, import documents" } },
        { title: { en: "Kazakhstan & Central Asia" }, description: { en: "Russian labels, EAEU document pack" } },
        { title: { en: "UAE & GCC" }, description: { en: "Arabic labels, registration support" } },
        { title: { en: "Europe" }, description: { en: "[Coming soon]" } },
      ],
      images: [
        { alt: { en: "Map of K-beauty export routes from Korea to Latin America, Central Asia and the Middle East" }, fallback: "world-routes" },
      ],
      addons: [
        {
          type: "leadMagnets",
          title: { en: "Free guides for your market" },
          ids: ["mexico-import-checklist", "eaeu-document-pack", "uae-registration-guide"],
          ctaPrefix: "about_regions_leadmagnet",
        },
      ],
    },

    /* ───── 05 Export support ───── */
    {
      id: "export-support",
      type: "grid",
      enabled: true,
      order: 5,
      number: "05",
      label: { en: "Export support" },
      title: { en: "The paperwork, handled." },
      columns: 4,
      items: [
        { title: { en: "Export documents" }, description: { en: "Commercial Invoice, Packing List, Certificate of Origin." } },
        { title: { en: "Product documents" }, description: { en: "Ingredient list, CoA, MSDS." } },
        { title: { en: "Local labels" }, description: { en: "Spanish, Russian, Arabic." } },
        { title: { en: "Customs & duties" }, description: { en: "DDP available on request." } },
      ],
      links: [
        { label: { en: "See shipping details →" }, href: "/shipping", variant: "secondary", ctaId: "about_export_shipping" },
        { label: { en: "How ordering works →" }, href: "/ordering-payment", variant: "secondary", ctaId: "about_export_ordering" },
      ],
    },

    /* Not part of the current design; kept so it can be switched back on. */
    {
      id: "shipping-payment",
      type: "split",
      enabled: false,
      order: 99,
      label: { en: "Shipping & payment" },
      title: { en: "Free shipping at 5 SKUs. Paid in USD." },
      body: {
        en: "Sample orders are paid by card at checkout — Visa, Mastercard, AMEX, JCB, UnionPay, PayPal or Alipay+ — and ship free once your box reaches 5 SKUs. Wholesale orders are invoiced in USD by [PAYMENT METHODS]. Every order leaves Korea within 2–7 days.",
      },
      items: [
        { key: "free", value: { en: "5 SKUs" }, title: { en: "Free sample shipping" } },
        { key: "dispatch", value: { en: "2–7 days" }, title: { en: "Dispatch from Korea" } },
        { key: "lead", value: { en: "[x–x] days" }, title: { en: "Average lead time to you" } },
        { key: "currency", value: { en: "USD" }, title: { en: "Card · PayPal · Invoice" } },
      ],
    },

    /* ───── 06 How it works ───── */
    {
      id: "how-it-works",
      type: "steps",
      enabled: true,
      order: 6,
      number: "06",
      label: { en: "How it works" },
      title: { en: "From one unit to a full order." },
      items: [
        { title: { en: `Every sample $${SAMPLE}` }, description: { en: `Order a single unit of any product at $${SAMPLE}, once per product. No MOQ.` } },
        { title: { en: "Free shipping at 5 products" }, description: { en: "Mix any five products across brands and shipping is on us — up to ten per order." } },
        { title: { en: "Reorder what sells at MOQ" }, description: { en: "Move your best sellers into MOQ quantities, with volume tiers as you grow." } },
        { title: { en: "We handle export & documents" }, description: { en: "Documents and labels for your market, prepared before it ships." } },
      ],
    },

    /* ───── 07 Company information + contact ───── */
    {
      id: "company",
      type: "companyInfo",
      enabled: true,
      order: 7,
      number: "07",
      label: { en: "Company information" },
      title: { en: "A registered Korean company." },
      subtitle: { en: "You can check who you are buying from." },
      items: [
        { key: "company", title: { en: "Company" }, value: { en: "Welkit Inc. (주식회사 웰킷)" } },
        { key: "registration", title: { en: "Business registration No." }, value: { en: "634-81-04211" } },
        { key: "office", title: { en: "Office" }, value: { en: "Gwanggyo, Suwon, Gyeonggi-do, Republic of Korea" } },
        { key: "warehouse", title: { en: "Warehouse" }, value: { en: "[WAREHOUSE ADDRESS]" } },
        { key: "email", title: { en: "Email" }, value: { en: "[EMAIL]" } },
        { key: "whatsapp", title: { en: "WhatsApp" }, value: { en: "[NUMBER]" } },
        { key: "response", title: { en: "Response time" }, value: { en: "Within 24 hours on business days (KST)" } },
      ],
      // Map placeholder. To show a live Google map instead, add: map: { query: "<full address>", label: { en: "Office" } }
      images: [{ alt: { en: "Map of KLOW’s office in Gwanggyo, Suwon, Korea" }, caption: { en: "Map" }, fallback: "location" }],
      people: [1, 2, 3].map(() => ({
        name: { en: "[NAME]" },
        role: { en: "[ROLE]" },
        image: { alt: { en: "KLOW K-beauty wholesale team member in Korea" }, fallback: "portrait" as const },
      })),
      addons: [
        {
          type: "inquiryForm",
          placement: "below",
          anchor: "contact",
          ctaId: "about_contact_inquiry",
          title: { en: "Talk to our team" },
          lede: { en: "Tell us where you sell. A real person replies within 24 hours on business days." },
          intro: {
            label: { en: "Contact" },
            text: { en: "Questions before your first order? Ask us directly — in English, Spanish, Russian or Arabic." },
          },
        },
      ],
    },

    /* ───── 08 FAQ ───── */
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 8,
      number: "08",
      label: { en: "FAQ" },
      title: { en: "Questions buyers ask first." },
      faqCategory: "about",
    },

    /* ───── Final CTA ───── */
    {
      id: "start",
      type: "cta",
      enabled: true,
      order: 9,
      addons: [
        { type: "contextCta", variant: "sample", tone: "dark", text: { en: "Start with one unit." }, ctaId: "about_final", secondary: "quote" },
      ],
    },

    /* ───── Keep reading ───── */
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 10,
      label: { en: "Keep reading" },
      items: [
        { key: "shipping", href: "/shipping", title: { en: "Shipping" }, description: { en: "Delivery times, Incoterms, documents" } },
        { key: "ordering", href: "/ordering-payment", title: { en: "Ordering & Payment" }, description: { en: "Samples, MOQ, payment methods" } },
      ],
    },
  ],
};
