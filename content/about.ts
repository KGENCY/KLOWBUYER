/**
 * About page content.
 *
 * Every word and image on /about lives here, so an admin can later CRUD this object as JSON
 * without touching the components. Components only read it; the page renders `sections`
 * sorted by `order`, skipping any with `enabled: false`.
 *
 * Values in [BRACKETS] are placeholders still waiting for real numbers or details.
 */

import type { AboutPage } from "./sections";

/* ───────────── Content ───────────── */

export const about: AboutPage = {
  ctaPrefix: "about",
  seo: {
    title: { en: "About KLOW | Korean Cosmetics Wholesale Supplier & Export Partner" },
    description: {
      en: "Authentic K-beauty wholesale direct from Korean brands. Sample from 1 unit, ship from our Korean warehouse with export documents and local-language labels.",
    },
  },

  sections: [
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "About KLOW" },
      title: { en: "Korean Cosmetics Wholesale, Direct from Korea" },
      subtitle: { en: "Verified brands. Real warehouse." },
      subtitleInHeading: false,
      body: {
        en: "KLOW is a Korea-based export and logistics partner working directly with K-beauty brands. Every order ships from our own warehouse in Korea — 100% authentic, with the export documents your market requires.",
      },
      links: [
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "primary", ctaId: "about_hero_sample" },
        { label: { en: "Talk to our team" }, href: "#contact", variant: "secondary", ctaId: "about_hero_inquiry" },
      ],
      images: [
        {
          alt: { en: "KLOW K-beauty wholesale warehouse, Korea" },
          caption: { en: "Warehouse · [CITY], Korea" },
          fallback: "warehouse",
        },
      ],
    },

    {
      id: "who-we-are",
      type: "split",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "Who we are" },
      title: { en: "Not a reseller. A direct partner to Korean brands." },
      body: {
        en: "KLOW is a Korean export and logistics company that contracts directly with K-beauty brands — not a reseller. We receive and inspect stock in our own warehouse in Korea, prepare the export documents, and ship to buyers worldwide: one team, with no middleman between the brand and you.",
      },
      items: [
        { key: "brands", value: { en: "[00]+" }, title: { en: "Partner brands" } },
        { key: "countries", value: { en: "[00]" }, title: { en: "Countries shipped" } },
        { key: "skus", value: { en: "[00]+" }, title: { en: "SKUs" } },
        { key: "minimum", value: { en: "1 unit" }, title: { en: "Minimum sample" } },
      ],
    },

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
        {
          title: { en: "Direct brand contracts" },
          description: { en: "Every product is supplied under a direct contract with the brand. No parallel imports, no grey-market stock." },
        },
        {
          title: { en: "Inspected in our warehouse" },
          description: { en: "Each delivery is checked on arrival for expiry dates, batch codes and packaging condition before it is shelved." },
        },
        {
          title: { en: "Proof on request" },
          description: { en: "Ask for it and we send the brand’s confirmation of authentic supply for the products you order." },
        },
      ],
      logos: [
        { en: "[BRAND 01]" }, { en: "[BRAND 02]" }, { en: "[BRAND 03]" }, { en: "[BRAND 04]" },
        { en: "[BRAND 05]" }, { en: "[BRAND 06]" }, { en: "[BRAND 07]" }, { en: "[BRAND 08]" },
      ],
      addons: [
        { type: "contextCta", variant: "signup", text: { en: "See verified brands and bulk pricing." }, ctaId: "about_authentic" },
      ],
    },

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
        {
          alt: { en: "KLOW K-beauty wholesale warehouse, Korea — storage shelves of cosmetics stock" },
          caption: { en: "Storage · [CITY], Korea" },
          fallback: "warehouse-shelves",
        },
        {
          alt: { en: "KLOW K-beauty wholesale warehouse, Korea — inspection bench checking expiry dates and packaging" },
          caption: { en: "Inspection · Incoming stock" },
          fallback: "inspection",
        },
        {
          alt: { en: "KLOW K-beauty wholesale warehouse, Korea — packing area for export orders" },
          caption: { en: "Packing · Outbound" },
          fallback: "packing",
        },
      ],
    },

    {
      id: "markets",
      type: "regions",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Where we ship" },
      title: { en: "Built for buyers outside the usual markets." },
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
        {
          alt: { en: "Map of KLOW export routes from Korea to Latin America, Central Asia and the Middle East" },
          fallback: "world-routes",
        },
      ],
      addons: [
        {
          type: "leadMagnets",
          title: { en: "Free checklists for your market" },
          ids: ["mexico-import-checklist", "eaeu-document-pack", "gcc-labelling-guide"],
          ctaPrefix: "about_markets_lead",
        },
      ],
    },

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
        { title: { en: "Export documents" }, description: { en: "Commercial invoice, packing list and certificate of origin with every shipment." } },
        { title: { en: "Product documents" }, description: { en: "Ingredient list (INCI), certificate of analysis (CoA) and MSDS, per product on request." } },
        { title: { en: "Certifications" }, description: { en: "Copies of the brand’s registrations — CPNP, FDA cosmetic listing, EAC — where filed [per brand]." } },
        { title: { en: "Local labels" }, description: { en: "Spanish, Russian and Arabic labels, printed and applied before dispatch." } },
      ],
      links: [
        { label: { en: "Country import guides →" }, href: "/shipping#duties", variant: "secondary", ctaId: "about_export_guides" },
        { label: { en: "All documents we provide →" }, href: "/shipping#documents", variant: "secondary", ctaId: "about_export_documents" },
      ],
    },

    {
      id: "shipping-payment",
      type: "split",
      enabled: true,
      order: 6,
      number: "06",
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
      links: [
        { label: { en: "Shipping details →" }, href: "/shipping", variant: "secondary", ctaId: "about_payment_shipping" },
        { label: { en: "Ordering & payment →" }, href: "/ordering-payment", variant: "secondary", ctaId: "about_payment_ordering" },
      ],
    },

    {
      id: "how-it-works",
      type: "steps",
      enabled: true,
      order: 7,
      number: "07",
      label: { en: "How it works" },
      title: { en: "From one unit to a full order." },
      items: [
        { title: { en: "Sample from 1 unit" }, description: { en: "Order a single unit of any product at its wholesale price." } },
        { title: { en: "Free shipping at 5 SKUs" }, description: { en: "Mix any five products across brands and shipping is on us." } },
        { title: { en: "Reorder at wholesale" }, description: { en: "Move what sells into MOQ quantities, at a lower price again." } },
        { title: { en: "We handle export & docs" }, description: { en: "Documents and labels for your market, prepared before it ships." } },
      ],
    },

    {
      id: "company",
      type: "companyInfo",
      enabled: true,
      order: 8,
      number: "08",
      label: { en: "Company information" },
      title: { en: "A registered Korean company." },
      subtitle: { en: "You can check who you are buying from." },
      items: [
        { key: "company", title: { en: "Company" }, value: { en: "Welkit Inc. (주식회사 웰킷)" } },
        { key: "registration", title: { en: "Business registration No." }, value: { en: "634-81-04211" } },
        { key: "office", title: { en: "Office" }, value: { en: "Gwanggyo, Suwon, Gyeonggi-do, Republic of Korea" } },
        { key: "warehouse", title: { en: "Warehouse" }, value: { en: "[WAREHOUSE ADDRESS]" } },
      ],
      /** Replace with the full street address once confirmed. */
      map: { query: "Gwanggyo, Suwon-si, Gyeonggi-do, South Korea", label: { en: "Office · Gwanggyo, Suwon" } },
      images: [{ alt: { en: "Map of KLOW’s office in Gwanggyo, Suwon, Korea" }, caption: { en: "Map" }, fallback: "location" }],
      people: [1, 2, 3].map(() => ({
        name: { en: "[NAME]" },
        role: { en: "[ROLE]" },
        image: { alt: { en: "KLOW team member" }, fallback: "portrait" as const },
      })),
    },

    {
      id: "contact",
      type: "contact",
      enabled: true,
      order: 9,
      number: "09",
      label: { en: "Contact" },
      title: { en: "Talk to our team." },
      subtitle: { en: "Reply within 24h." },
      body: { en: "Email or WhatsApp us directly, or leave your details and we’ll come to you — in English, Spanish, Russian or Arabic." },
      items: [
        // Add href ("mailto:…", "https://wa.me/…") once the real address and number are set; until then the rows aren't links.
        { key: "email", title: { en: "Email" }, value: { en: "[EMAIL]" }, description: { en: "Quotes, documents and partnerships" } },
        { key: "whatsapp", title: { en: "WhatsApp" }, value: { en: "[NUMBER]" }, description: { en: "Fastest for buyers outside Korea" } },
        { key: "response", title: { en: "Response time" }, value: { en: "Within 24 hours" }, description: { en: "Business days, Korea time (KST)" } },
      ],
      addons: [
        {
          type: "inquiryForm",
          anchor: "contact-form",
          ctaId: "about_contact_form",
          title: { en: "Leave your details" },
          lede: { en: "Three fields. A real person replies within 24 hours on business days." },
        },
      ],
    },

    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 10,
      number: "10",
      label: { en: "FAQ" },
      title: { en: "Questions buyers ask first." },
      faqCategory: "about",
    },

    {
      id: "start",
      type: "cta",
      enabled: true,
      order: 11,
      title: { en: "Start with one unit." },
      links: [
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "primary", ctaId: "about_final_sample" },
        { label: { en: "Request bulk quote" }, href: "/ordering-payment#quote", variant: "secondary", ctaId: "about_final_quote" },
      ],
    },

    {
      id: "more",
      type: "related",
      enabled: true,
      order: 12,
      label: { en: "Keep reading" },
      items: [
        {
          key: "shipping",
          href: "/shipping",
          title: { en: "Shipping" },
          description: { en: "Free at 5 SKUs, dispatch times, duties and the documents that travel with your order." },
        },
        {
          key: "ordering",
          href: "/ordering-payment",
          title: { en: "Ordering & Payment" },
          description: { en: "From a one-unit sample to MOQ reorders and bulk quotes, and how you pay." },
        },
      ],
    },
  ],
};
