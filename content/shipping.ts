/**
 * /shipping content, same section schema as /about (content/sections.ts).
 * Country summaries for the picker live in content/shippingCountries.ts.
 * Values in [BRACKETS] are placeholders still to be confirmed.
 * Every quote CTA on this page points to the form at #quote, at the bottom of the page.
 */
import type { AboutPage } from "./sections";

const QUOTE = "#quote";

export const shipping: AboutPage = {
  ctaPrefix: "shipping",
  seo: {
    title: { en: "Shipping K-Beauty Wholesale Worldwide | KLOW Wholesale" },
    description: {
      en: "How KLOW ships K-beauty wholesale from Korea: express, air and sea freight, Incoterms including DDP, export documents and local-language labels.",
    },
  },
  sections: [
    /* ───── Hero ───── */
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "Shipping" },
      title: { en: "Shipped from Korea," },
      subtitle: { en: "ready for your market." },
      body: {
        en: "Every order is inspected and packed in our warehouse in Korea. Choose how it reaches you — we can handle customs too.",
      },
      images: [
        {
          alt: { en: "Map of K-beauty wholesale shipping routes from Korea to Mexico, Central Asia, the Middle East and Europe" },
          caption: { en: "Korea → Worldwide" },
          fallback: "world-routes",
          ratio: "16 / 10",
          fit: "contain",
        },
      ],
    },

    /* ───── 01 Country picker ───── */
    {
      id: "country",
      type: "countryFinder",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "Your market" },
      title: { en: "Where are you shipping to?" },
      finder: {
        label: { en: "Where are you shipping to?" },
        placeholder: { en: "Select your country" },
        quoteLabel: { en: "Get a shipping quote for {country}" },
        quoteHref: QUOTE,
        guideLabel: { en: "Read the {country} import guide →" },
        emptyText: { en: "Pick a country to see the recommended shipping method, delivery time, labels and the registration your market needs." },
        otherTitle: { en: "Tell us your country." },
        otherLede: { en: "We’ll check." },
      },
    },

    /* ───── 02 Shipping options ───── */
    {
      id: "options",
      type: "table",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "Shipping options" },
      title: { en: "Three ways to ship." },
      badge: { en: "Free shipping on sample boxes of 5+ SKUs" },
      table: {
        columns: [{ en: "Method" }, { en: "Best for" }, { en: "Estimated delivery" }],
        rows: [
          { key: "express", cells: [{ en: "Express courier (EMS · DHL)" }, { en: "Samples, small wholesale" }, { en: "[3–10] business days" }] },
          { key: "air", cells: [{ en: "Air freight" }, { en: "Mid to large wholesale" }, { en: "[5–14] business days" }] },
          { key: "sea", cells: [{ en: "Sea freight" }, { en: "Bulk, container" }, { en: "[20–45] days" }] },
        ],
      },
      footnote: { en: "Times vary by country and customs." },
    },

    /* ───── 03 Incoterms ───── */
    {
      id: "terms",
      type: "table",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "Shipping terms (Incoterms)" },
      title: { en: "Who handles what." },
      body: { en: "Incoterms decide where our responsibility ends and yours begins." },
      table: {
        columns: [{ en: "Term" }, { en: "What it means" }, { en: "Best for" }],
        rows: [
          { key: "exw", cells: [{ en: "EXW" }, { en: "You collect from our warehouse. Everything after is yours." }, { en: "You have a forwarder in Korea" }] },
          { key: "fca", cells: [{ en: "FCA" }, { en: "We clear export and hand over to your carrier." }, { en: "You have your own courier account" }] },
          { key: "fob", cells: [{ en: "FOB" }, { en: "We deliver onto the vessel at a Korean port. Sea only." }, { en: "Bulk sea freight" }] },
          { key: "cif", cells: [{ en: "CIF" }, { en: "We pay freight and insurance to your port." }, { en: "You’d rather not arrange shipping" }] },
          { key: "dap", cells: [{ en: "DAP" }, { en: "We deliver to your address. You pay import duties." }, { en: "Most express orders" }] },
          {
            key: "ddp",
            cells: [{ en: "DDP" }, { en: "We handle duties and taxes to your door." }, { en: "First-time importers" }],
            highlight: { en: "New to importing? Choose DDP — we handle customs and duties. Available for selected countries." },
          },
        ],
      },
      addons: [
        {
          type: "contextCta",
          variant: "quote",
          text: { en: "Not sure which terms fit? We’ll recommend one." },
          ctaId: "shipping_incoterms",
          href: QUOTE,
        },
      ],
    },

    /* ───── 04 Duties & taxes ───── */
    {
      id: "duties",
      type: "split",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Duties & taxes" },
      title: { en: "Import taxes are paid in your country." },
      body: {
        en: "Unless you choose DDP, import duties, VAT and customs fees in your country are paid by you. Ask us for an estimate with your quote.",
      },
      addons: [
        {
          type: "leadMagnets",
          title: { en: "Free import guides" },
          ids: ["mexico-import-checklist", "eaeu-document-pack", "uae-registration-guide"],
          ctaPrefix: "shipping_duties_leadmagnet",
        },
      ],
    },

    /* ───── 05 Documents ───── */
    {
      id: "documents",
      type: "checklist",
      enabled: true,
      order: 5,
      number: "05",
      label: { en: "Documents we provide" },
      title: { en: "The paperwork travels with your order." },
      items: [
        {
          key: "included",
          title: { en: "Included with every export order" },
          points: [
            { text: { en: "Commercial Invoice" } },
            { text: { en: "Packing List" } },
            { text: { en: "Certificate of Origin" }, note: { en: "Lets FTA-country buyers claim reduced duties" } },
          ],
        },
        {
          key: "on-request",
          title: { en: "On request" },
          points: [
            { text: { en: "Full ingredient list" } },
            { text: { en: "Certificate of Analysis (CoA)" } },
            { text: { en: "MSDS" } },
            { text: { en: "Brand authenticity letter" } },
          ],
        },
        {
          key: "labels",
          title: { en: "Local-language labels — Spanish / Russian / Arabic" },
          description: { en: "Prepared and applied before dispatch where supported." },
        },
      ],
      addons: [
        { type: "contextCta", variant: "signup", text: { en: "Sign in to download product documents." }, ctaId: "shipping_documents" },
      ],
    },

    /* ───── 06 Packing & claims ───── */
    {
      id: "packing",
      type: "facts",
      enabled: true,
      order: 6,
      number: "06",
      label: { en: "Packing & claims" },
      title: { en: "Packed to arrive intact." },
      subtitle: { en: "Covered if it doesn’t." },
      body: { en: "Cushioned packing, leak-proof sealing for liquids, carton and pallet packing for bulk." },
      imageSide: "start",
      items: [
        { key: "window", title: { en: "Report within" }, value: { en: "[7] days of delivery" } },
        { key: "required", title: { en: "Required" }, value: { en: "Photos of outer box and products" } },
        { key: "resolution", title: { en: "Resolution" }, value: { en: "Reshipment or refund after review" } },
        { key: "tip", title: { en: "Tip" }, value: { en: "Photograph the box before opening" } },
      ],
      images: [
        {
          alt: { en: "Packing area in KLOW’s Korean warehouse where K-beauty wholesale orders are cushioned and sealed for export" },
          caption: { en: "Packing" },
          fallback: "packing",
        },
      ],
    },

    /* ───── 07 FAQ ───── */
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 7,
      number: "07",
      label: { en: "FAQ" },
      title: { en: "Shipping questions." },
      faqCategory: "shipping",
    },

    /* ───── Final: quote form ───── */
    {
      id: "quote",
      type: "inquiry",
      enabled: true,
      order: 8,
      label: { en: "Shipping quote" },
      title: { en: "Tell us where you ship to." },
      subtitle: { en: "We’ll send a quote within 24h." },
      addons: [
        {
          type: "inquiryForm",
          ctaId: "shipping_final_inquiry",
          title: { en: "Get a shipping quote" },
          lede: { en: "Method, transit time and cost for your market — or a DDP price, all in." },
        },
      ],
    },

    /* ───── Keep reading ───── */
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 9,
      label: { en: "Keep reading" },
      items: [
        { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, company details" } },
        { key: "ordering", href: "/ordering-payment", title: { en: "Ordering & Payment" }, description: { en: "Samples, MOQ, payment methods" } },
      ],
    },
  ],
};
