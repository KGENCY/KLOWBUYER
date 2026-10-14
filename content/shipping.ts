/**
 * /shipping content, same section schema as /about (content/sections.ts).
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
      en: "K-beauty wholesale shipped worldwide from our warehouse in Korea. Express, air or sea freight, EXW to DDP terms, export documents and local-language labels.",
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
          alt: { en: "Map of KLOW shipping routes from Korea to Mexico, Central Asia, the Middle East and Europe" },
          caption: { en: "Seoul → Worldwide" },
          fallback: "worldMap",
          ratio: "16 / 10",
          fit: "contain",
        },
      ],
      addons: [
        {
          type: "countryFinder",
          label: { en: "Where are you shipping to?" },
          placeholder: { en: "Select your market" },
          quoteLabel: { en: "Get a shipping quote for {country}" },
          quoteHref: QUOTE,
          ctaPrefix: "shipping_country",
          destinations: [
            {
              code: "MX",
              name: { en: "Mexico" },
              method: { en: "Air freight for wholesale · express courier for samples" },
              days: { en: "[x–x] days" },
              labels: { en: "Spanish labels — applied before dispatch" },
              registration: { en: "Importer files a COFEPRIS sanitary notice; Spanish labelling required [to confirm]" },
            },
            {
              code: "KZ",
              name: { en: "Kazakhstan" },
              method: { en: "Air freight · express courier for samples" },
              days: { en: "[x–x] days" },
              labels: { en: "Russian labels — applied before dispatch" },
              registration: { en: "EAEU declaration of conformity (EAC) for cosmetics [to confirm]" },
            },
            {
              code: "AE",
              name: { en: "UAE" },
              method: { en: "Air freight · express courier for samples" },
              days: { en: "[x–x] days" },
              labels: { en: "Arabic labels — applied before dispatch" },
              registration: { en: "Products registered with the local municipality before sale [to confirm]" },
            },
            {
              code: "CO",
              name: { en: "Colombia" },
              method: { en: "Air freight · sea freight for large orders" },
              days: { en: "[x–x] days" },
              labels: { en: "Spanish labels — applied before dispatch" },
              registration: { en: "INVIMA cosmetic notification (NSO) before import [to confirm]" },
            },
            {
              code: "OTHER",
              name: { en: "Other" },
              method: { en: "Express courier or air freight, depending on volume" },
              days: { en: "[x–x] days" },
              labels: { en: "English labels · other languages on request" },
              registration: { en: "Tell us your market and we’ll check what’s needed" },
            },
          ],
        },
      ],
    },

    /* ───── 01 Shipping options ───── */
    {
      id: "options",
      type: "table",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "Shipping options" },
      title: { en: "Three ways to ship." },
      badge: { en: "Samples ship free at 5 SKUs" },
      body: { en: "Samples go by express courier. Wholesale orders go by air or sea, quoted per order." },
      table: {
        columns: [{ en: "Method" }, { en: "Best for" }, { en: "Transit time" }],
        rows: [
          { key: "express", cells: [{ en: "Express courier (EMS · DHL)" }, { en: "Samples and small reorders" }, { en: "[x–x] days" }] },
          { key: "air", cells: [{ en: "Air freight" }, { en: "Wholesale orders from [x] kg" }, { en: "[x–x] days" }] },
          { key: "sea", cells: [{ en: "Sea freight" }, { en: "Large orders and full containers" }, { en: "[x–x] days" }] },
        ],
      },
    },

    /* ───── 02 Shipping terms ───── */
    {
      id: "terms",
      type: "table",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "Shipping terms (Incoterms)" },
      title: { en: "Who handles what." },
      body: { en: "The Incoterm decides where our job ends and yours begins: freight, insurance, customs and duties." },
      table: {
        columns: [{ en: "Term" }, { en: "What it means" }, { en: "Best for" }],
        rows: [
          { key: "exw", cells: [{ en: "EXW" }, { en: "You collect from our warehouse in Korea." }, { en: "Buyers with a forwarder in Korea" }] },
          { key: "fca", cells: [{ en: "FCA" }, { en: "We hand over to your carrier, export-cleared." }, { en: "Buyers with their own forwarder" }] },
          { key: "fob", cells: [{ en: "FOB" }, { en: "We deliver on board at the Korean port." }, { en: "Sea freight with your forwarder" }] },
          { key: "cif", cells: [{ en: "CIF" }, { en: "We pay freight and insurance to your port." }, { en: "Sea freight buyers who clear customs" }] },
          { key: "dap", cells: [{ en: "DAP" }, { en: "We deliver to your door; you pay duties on arrival." }, { en: "Experienced importers" }] },
          {
            key: "ddp",
            cells: [{ en: "DDP" }, { en: "We deliver to your door with customs and duties paid." }, { en: "First-time importers" }],
            highlight: { en: "New to importing? Choose DDP — we handle customs and duties." },
          },
        ],
      },
      addons: [
        {
          type: "contextCta",
          variant: "quote",
          text: { en: "Not sure which term fits? Tell us your market and we’ll quote two." },
          ctaId: "shipping_terms",
          href: QUOTE,
        },
      ],
    },

    /* ───── 03 Duties & taxes ───── */
    {
      id: "duties",
      type: "split",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "Duties & taxes" },
      title: { en: "Unless you choose DDP, import taxes are paid in your country." },
      body: {
        en: "On every term except DDP, import duties, VAT and customs fees are charged by your country on arrival and paid by you, the buyer. They’re set by your customs authority, not by us — but we can estimate them in your quote, and our checklists show what to prepare.",
      },
      addons: [
        {
          type: "leadMagnets",
          title: { en: "Free import guides" },
          ids: ["mexico-import-checklist", "eaeu-document-pack", "uae-registration-guide"],
          ctaPrefix: "shipping_duties_lead",
        },
      ],
    },

    /* ───── 04 Documents ───── */
    {
      id: "documents",
      type: "grid",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Documents we provide" },
      title: { en: "The paperwork travels with your order." },
      columns: 3,
      items: [
        { title: { en: "With every order" }, description: { en: "Commercial invoice · Packing list · Certificate of origin" } },
        { title: { en: "On request" }, description: { en: "Ingredient list · Certificate of analysis (CoA) · MSDS · Brand authenticity letter" } },
        { title: { en: "Local-language labels" }, description: { en: "Spanish · Russian · Arabic — printed and applied in our warehouse before dispatch" } },
      ],
      addons: [
        { type: "contextCta", variant: "signup", text: { en: "Sign in to download product documents." }, ctaId: "shipping_documents" },
      ],
    },

    /* ───── 05 Packing & claims ───── */
    {
      id: "packing",
      type: "facts",
      enabled: true,
      order: 5,
      number: "05",
      label: { en: "Packing & claims" },
      title: { en: "Packed to arrive intact." },
      subtitle: { en: "Covered if it doesn’t." },
      items: [
        { key: "packing", title: { en: "Packing" }, value: { en: "Each product wrapped, packed by SKU and sealed in export cartons" } },
        { key: "fragile", title: { en: "Glass & liquids" }, value: { en: "Extra cushioning and leak-proof bags [to confirm]" } },
        { key: "window", title: { en: "Claim window" }, value: { en: "Within [7] days of delivery" } },
        { key: "evidence", title: { en: "What to send" }, value: { en: "Photos of the outer carton, the damaged item and the shipping label" } },
        { key: "missing", title: { en: "Missing items" }, value: { en: "Report within [7] days, checked against your packing list" } },
        { key: "resolution", title: { en: "Resolution" }, value: { en: "[Replacement in your next shipment or refund]" } },
      ],
      images: [
        {
          alt: { en: "Packing area in KLOW’s warehouse where K-beauty orders are boxed and sealed for export" },
          caption: { en: "Packing · Outbound" },
          fallback: "packing",
        },
      ],
    },

    /* ───── 06 FAQ ───── */
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 6,
      number: "06",
      label: { en: "FAQ" },
      title: { en: "Shipping questions." },
      faqCategory: "shipping",
    },

    /* ───── 07 Quote ───── */
    {
      id: "quote",
      type: "inquiry",
      enabled: true,
      order: 7,
      number: "07",
      label: { en: "Shipping quote" },
      title: { en: "Get a shipping quote." },
      body: { en: "We reply within 24 hours on business days with:" },
      items: [
        { title: { en: "The best way to ship to your market" } },
        { title: { en: "Transit time and cost — or a DDP price, all in" } },
        { title: { en: "The documents and labels your market needs" } },
      ],
      addons: [
        {
          type: "inquiryForm",
          anchor: "quote-form",
          ctaId: "shipping_quote_form",
          title: { en: "Tell us where you ship to." },
          lede: { en: "We’ll send a quote." },
        },
      ],
    },

    /* ───── Keep reading ───── */
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 8,
      label: { en: "Keep reading" },
      items: [
        { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, and how we source directly from brands." } },
        { key: "ordering", href: "/ordering-payment", title: { en: "Ordering & Payment" }, description: { en: "From a one-unit sample to MOQ reorders and bulk quotes, and how you pay." } },
      ],
    },
  ],
};
