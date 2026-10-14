/**
 * About page content.
 *
 * Every word and image on /about lives here, so an admin can later CRUD this object as JSON
 * without touching the components. Components only read it; the page renders `sections`
 * sorted by `order`, skipping any with `enabled: false`.
 *
 * Values in [BRACKETS] are placeholders still waiting for real numbers or details.
 */

/* ───────────── Types ───────────── */

export type Locale = "en" | "es" | "ru" | "ar";
export const RTL_LOCALES: Locale[] = ["ar"];

/** A text field that can be translated. `en` is required and is the fallback for every other locale. */
export type Localized = { en: string } & Partial<Record<Exclude<Locale, "en">, string>>;

/** Name of the built-in SVG drawn when an image has no `src` yet. */
export type Fallback = "warehouse" | "shelves" | "inspection" | "packing" | "worldMap" | "location" | "portrait";

export interface AboutImage {
  /** Real photo URL. Leave empty to show the `fallback` illustration. */
  src?: string;
  alt: Localized;
  caption?: Localized;
  fallback: Fallback;
}

export interface AboutItem {
  /** Stable machine key, used where other code needs to find a specific row (e.g. JSON-LD). */
  key?: string;
  title: Localized;
  description?: Localized;
  /** Big figure (stats) or the value cell (company info). */
  value?: Localized;
}

export interface AboutLink {
  label: Localized;
  href: string;
  variant: "primary" | "secondary";
}

export interface AboutPerson {
  name: Localized;
  role: Localized;
  image: AboutImage;
}

export type SectionType = "hero" | "split" | "grid" | "gallery" | "regions" | "steps" | "companyInfo" | "faq" | "cta";

export interface AboutSection {
  /** Also the anchor id on the page (e.g. /about#company). */
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  /** Shown before the label, e.g. "01". */
  number?: string;
  label?: Localized;
  title?: Localized;
  /** Second line of the title, shown in grey. */
  subtitle?: Localized;
  body?: Localized;
  items?: AboutItem[];
  images?: AboutImage[];
  links?: AboutLink[];
  /** grid: column count on desktop. */
  columns?: 3 | 4;
  /** grid: partner brand names shown as a row of muted text logos. */
  logos?: Localized[];
  /** companyInfo: team placeholders. */
  people?: AboutPerson[];
}

export interface AboutPage {
  seo: { title: Localized; description: Localized };
  sections: AboutSection[];
}

/** Picks the text for a locale, falling back to English. */
export function t(text: Localized | undefined, locale: Locale = "en"): string {
  if (!text) return "";
  return text[locale] ?? text.en;
}

/* ───────────── Content ───────────── */

const BROWSE: AboutLink = { label: { en: "Browse & sample" }, href: "/#collection", variant: "primary" };

export const about: AboutPage = {
  seo: {
    title: { en: "About KLOW | Korean Cosmetics Wholesale Supplier & Export Partner" },
    description: {
      en: "Authentic K-beauty wholesale direct from Korean brands. Sample from 1 unit, ship from our Korean warehouse with export documents and local labels.",
    },
  },

  sections: [
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
      links: [BROWSE, { label: { en: "Talk to our team" }, href: "#company", variant: "secondary" }],
      images: [
        {
          alt: { en: "KLOW K-beauty wholesale warehouse in Korea" },
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
        en: "We sign with each brand directly, receive and inspect stock in our own warehouse in Korea, prepare the export documents, and ship to buyers worldwide. One team handles every step — so nothing passes through a middleman between the brand and you.",
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
          alt: { en: "Shelves of K-beauty stock in KLOW’s warehouse in Korea" },
          caption: { en: "Storage · [CITY], Korea" },
          fallback: "shelves",
        },
        {
          alt: { en: "Inspection bench where incoming cosmetics are checked for expiry and packaging" },
          caption: { en: "Inspection · Incoming stock" },
          fallback: "inspection",
        },
        {
          alt: { en: "Packing area where wholesale and sample orders are boxed for export" },
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
          fallback: "worldMap",
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
        { title: { en: "Export documents" }, description: { en: "Commercial invoice, packing list, certificate of origin (C/O)." } },
        { title: { en: "Product documents" }, description: { en: "Ingredient list, certificate of analysis (CoA), MSDS." } },
        { title: { en: "Local labels" }, description: { en: "Spanish, Russian and Arabic labels, applied before dispatch." } },
        { title: { en: "Customs & duties" }, description: { en: "Duties paid by the buyer on arrival by default. DDP on request." } },
      ],
      links: [{ label: { en: "See payment & shipping" }, href: "/shipping", variant: "secondary" }],
    },

    {
      id: "how-it-works",
      type: "steps",
      enabled: true,
      order: 6,
      number: "06",
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
      images: [{ alt: { en: "Map of KLOW’s office in Gwanggyo, Suwon, Korea" }, caption: { en: "Map" }, fallback: "location" }],
      people: [1, 2, 3].map(() => ({
        name: { en: "[NAME]" },
        role: { en: "[ROLE]" },
        image: { alt: { en: "KLOW team member" }, fallback: "portrait" as const },
      })),
    },

    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 8,
      number: "08",
      label: { en: "FAQ" },
      title: { en: "Questions buyers ask first." },
      items: [
        {
          title: { en: "Are your products authentic?" },
          description: {
            en: "Yes. Every product is supplied under a direct contract with the brand and inspected in our warehouse in Korea. We can send the brand’s confirmation of authentic supply on request.",
          },
        },
        {
          title: { en: "Do you ship to my country?" },
          description: {
            en: "We ship worldwide from Korea, with labels and documents prepared for Mexico & Latin America, Kazakhstan & Central Asia, and the UAE & GCC. Europe support is [coming soon]. Some categories are restricted in some markets — tell us where you are and we’ll confirm.",
          },
        },
        {
          title: { en: "Is there a minimum order?" },
          description: {
            en: "Not for samples: order 1 unit of any product at its wholesale price, and shipping is free once your box reaches 5 SKUs. Wholesale reorders follow each product’s MOQ, from [MOQ] units.",
          },
        },
        {
          title: { en: "Who pays customs and duties?" },
          description: {
            en: "By default the buyer pays import duties and taxes on arrival. DDP — where we pay them up front and include them in your quote — is available on request for [MARKETS].",
          },
        },
        {
          title: { en: "Can you provide export documents?" },
          description: {
            en: "Yes. Every shipment comes with a commercial invoice, packing list and certificate of origin. Ingredient lists, CoA and MSDS are available per product.",
          },
        },
      ],
    },

    {
      id: "start",
      type: "cta",
      enabled: true,
      order: 9,
      title: { en: "Start with one unit." },
      links: [BROWSE],
    },
  ],
};
