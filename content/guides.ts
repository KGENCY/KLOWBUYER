/**
 * Guides: country import guides, monthly trend reports, ingredient guides.
 * One base shape for all three, plus fields per type — an admin form can switch fields by `type`.
 *
 * Regulatory details and market facts are NOT confirmed: they're marked [to confirm] or "To be confirmed".
 * relatedBrands / relatedProducts are optional; when empty, pages match brands automatically
 * (country → readyMarkets, ingredient → heroIngredients, trend → ingredients to watch).
 */
import type { LocalizedText, MediaImage } from "@/types/content";
import type { Difficulty } from "./shippingCountries";

const L = (en: string): LocalizedText => ({ en });

export type GuideType = "import" | "trend" | "ingredient";

export interface GuideSection {
  id: string;
  heading: LocalizedText;
  body?: LocalizedText;
  items?: LocalizedText[];
  /** How `items` are drawn: a ticked checklist, numbered steps, or a plain list. */
  style?: "checklist" | "steps" | "list";
  /** A highlighted note under the section, e.g. "KLOW can prepare Spanish labels". */
  callout?: LocalizedText;
}

interface GuideBase {
  slug: string;
  type: GuideType;
  title: LocalizedText;
  summary: LocalizedText;
  heroImage: MediaImage;
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD
  sections: GuideSection[];
  keyFacts: { label: LocalizedText; value: LocalizedText }[];
  /** Brand slugs to feature; empty = automatic match. */
  relatedBrands: string[];
  /** Product ids to feature; empty = automatic match. */
  relatedProducts: string[];
  leadMagnetId?: string;
  faq: { question: LocalizedText; answer: LocalizedText }[];
  seo: { title?: LocalizedText; description: LocalizedText };
  enabled: boolean;
}

export interface ImportGuide extends GuideBase {
  type: "import";
  /** Links to content/shippingCountries.ts. */
  countryCode: string;
  country: LocalizedText;
  difficulty: Difficulty;
  labelLanguage: LocalizedText;
  registrationSummary: LocalizedText;
  dutiesNote: LocalizedText;
}

export interface TrendGuide extends GuideBase {
  type: "trend";
  /** "YYYY-MM" — also the URL: /guides/trends/[month]. */
  month: string;
  /** The month in three lines. */
  highlights: LocalizedText[];
  rankings: { rank: number; name: LocalizedText; productId?: string; note: LocalizedText }[];
  ingredientsToWatch: { name: string; note: LocalizedText }[];
  buyerTakeaways: LocalizedText[];
}

export interface IngredientGuide extends GuideBase {
  type: "ingredient";
  /** Must match brands' heroIngredients / products' heroIngredient for automatic matching. */
  ingredient: string;
  aliases: string[];
  whatItIs: LocalizedText;
  whyBuyersStock: LocalizedText;
}

export type Guide = ImportGuide | TrendGuide | IngredientGuide;

const hero = (alt: string, fallback: MediaImage["fallback"] = "world-routes"): MediaImage => ({ alt: L(alt), fallback });

/* ───────────── Import guides ───────────── */

const mexico: ImportGuide = {
  slug: "mexico",
  type: "import",
  countryCode: "MX",
  country: L("Mexico"),
  title: L("Importing Korean cosmetics to Mexico"),
  summary: L("What you need before the first shipment: importer registration, Spanish labels, sanitary notice and duties — and how KLOW prepares them."),
  heroImage: hero("Map of K-beauty export routes from Korea to Mexico"),
  publishedAt: "2026-09-15",
  updatedAt: "2026-10-01",
  difficulty: "moderate",
  labelLanguage: L("Spanish"),
  registrationSummary: L("Importer registry + sanitary notice for cosmetics [to confirm]"),
  dutiesNote: L("[x]% duty + [x]% VAT (IVA) on arrival [to confirm]"),
  keyFacts: [],
  sections: [
    {
      id: "requirements",
      heading: L("Requirements at a glance"),
      style: "checklist",
      items: [
        L("Importer of record registered for imports (Padrón de Importadores) [to confirm]"),
        L("Sanitary notice for cosmetic products filed before sale [to confirm]"),
        L("Spanish labels meeting the cosmetics labelling standard [to confirm]"),
        L("Commercial invoice, packing list and certificate of origin"),
        L("A customs broker (agente aduanal) to clear the shipment"),
      ],
    },
    {
      id: "registration",
      heading: L("Registration steps"),
      style: "steps",
      items: [
        L("Register your company as an importer [to confirm]"),
        L("File the sanitary notice for each product line [to confirm]"),
        L("Approve Spanish labels — we print and apply them in Korea"),
        L("Book a customs broker and share our export documents"),
      ],
    },
    {
      id: "labeling",
      heading: L("Labeling"),
      body: L("Labels must be in Spanish. Items usually required on each unit (to be confirmed for your product category):"),
      style: "list",
      items: [L("Product name and function in Spanish"), L("Net content"), L("Ingredient list (INCI)"), L("Importer name and address"), L("Country of origin"), L("Batch / lot number")],
      callout: L("KLOW can prepare Spanish labels and apply them in our warehouse before dispatch."),
    },
    {
      id: "duties",
      heading: L("Duties & taxes"),
      body: L("Unless you choose DDP, import duties and VAT are paid in Mexico on arrival. Rates depend on the product’s tariff code — ask us for an estimate with your quote."),
    },
    {
      id: "what-sells",
      heading: L("What sells in Mexico"),
      style: "list",
      items: [L("Light sun care for hot climates [to confirm]"), L("Soothing toners — heartleaf, centella [to confirm]"), L("Niacinamide and brightening serums [to confirm]")],
    },
  ],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "mexico-import-checklist",
  faq: [
    { question: L("Do I need a sanitary registration to sell Korean cosmetics in Mexico?"), answer: L("Cosmetics generally need a sanitary notice rather than a full registration, but this depends on the product. To be confirmed with your customs broker.") },
    { question: L("Can KLOW put Spanish labels on the products?"), answer: L("Yes. We print and apply Spanish labels in our warehouse in Korea before dispatch.") },
    { question: L("How long does shipping to Mexico take?"), answer: L("Express courier usually takes [3–10] business days; air freight [5–14]. Ask us for your route.") },
  ],
  seo: { description: L("How to import Korean cosmetics to Mexico: importer registration, Spanish labels, sanitary notice, duties and shipping times — with a free checklist.") },
  enabled: true,
};

const kazakhstan: ImportGuide = {
  slug: "kazakhstan",
  type: "import",
  countryCode: "KZ",
  country: L("Kazakhstan"),
  title: L("Importing Korean cosmetics to Kazakhstan"),
  summary: L("EAEU conformity, Russian labels and customs in one place — what to prepare before your first order."),
  heroImage: hero("Map of K-beauty export routes from Korea to Kazakhstan and Central Asia"),
  publishedAt: "2026-09-15",
  updatedAt: "2026-10-01",
  difficulty: "complex",
  labelLanguage: L("Russian (Kazakh on request)"),
  registrationSummary: L("EAEU declaration of conformity (EAC) [to confirm]"),
  dutiesNote: L("EAEU common tariff + [x]% VAT [to confirm]"),
  keyFacts: [],
  sections: [
    {
      id: "requirements",
      heading: L("Requirements at a glance"),
      style: "checklist",
      items: [
        L("EAEU declaration of conformity for cosmetics (EAC) [to confirm]"),
        L("Russian-language labels; Kazakh may also be required [to confirm]"),
        L("A local applicant / importer of record [to confirm]"),
        L("Commercial invoice, packing list and certificate of origin"),
      ],
    },
    {
      id: "registration",
      heading: L("Registration steps"),
      style: "steps",
      items: [L("Choose the applicant for the EAC declaration [to confirm]"), L("Test samples at an accredited lab [to confirm]"), L("Register the declaration [to confirm]"), L("Ship with EAC-marked Russian labels")],
    },
    {
      id: "labeling",
      heading: L("Labeling"),
      body: L("Labels in Russian with the EAC mark once the declaration is registered (details to be confirmed):"),
      style: "list",
      items: [L("Product name and purpose"), L("Ingredient list"), L("Manufacturer and importer"), L("Shelf life and batch"), L("EAC mark")],
      callout: L("KLOW can prepare Russian labels and apply them before dispatch."),
    },
    { id: "duties", heading: L("Duties & taxes"), body: L("Duties follow the EAEU common customs tariff; VAT applies on import. Ask us for an estimate or a DDP price.") },
    { id: "what-sells", heading: L("What sells in Kazakhstan"), style: "list", items: [L("Barrier repair and snail essences [to confirm]"), L("Gentle cleansers for dry winters [to confirm]")] },
  ],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "eaeu-document-pack",
  faq: [
    { question: L("Is an EAC declaration required for cosmetics in Kazakhstan?"), answer: L("Cosmetics sold in the EAEU generally need a declaration of conformity. To be confirmed for your products.") },
    { question: L("Can I use the same labels for Russia and Kazakhstan?"), answer: L("Often yes, as both are in the EAEU, but Kazakh-language requirements may apply. To be confirmed.") },
  ],
  seo: { description: L("How to import Korean cosmetics to Kazakhstan: EAEU conformity (EAC), Russian labels, duties and shipping — with a free EAEU document pack.") },
  enabled: true,
};

const uae: ImportGuide = {
  slug: "uae",
  type: "import",
  countryCode: "AE",
  country: L("UAE"),
  title: L("Importing Korean cosmetics to the UAE"),
  summary: L("Product registration, Arabic labels and customs for the UAE — and how to get your first K-beauty order through."),
  heroImage: hero("Map of K-beauty export routes from Korea to the UAE and GCC"),
  publishedAt: "2026-09-15",
  updatedAt: "2026-10-01",
  difficulty: "moderate",
  labelLanguage: L("Arabic (with English)"),
  registrationSummary: L("Product registration with the local municipality [to confirm]"),
  dutiesNote: L("[x]% GCC duty + [x]% VAT [to confirm]"),
  keyFacts: [],
  sections: [
    {
      id: "requirements",
      heading: L("Requirements at a glance"),
      style: "checklist",
      items: [L("Trade licence covering cosmetics import [to confirm]"), L("Product registration before sale [to confirm]"), L("Arabic labels (English alongside) [to confirm]"), L("Commercial invoice, packing list and certificate of origin")],
    },
    {
      id: "registration",
      heading: L("Registration steps"),
      style: "steps",
      items: [L("Check your trade licence activity [to confirm]"), L("Register products on the municipality portal [to confirm]"), L("Approve Arabic labels"), L("Clear customs on arrival")],
    },
    {
      id: "labeling",
      heading: L("Labeling"),
      body: L("Arabic labels are expected, usually with English (to be confirmed):"),
      style: "list",
      items: [L("Product name"), L("Ingredients"), L("Manufacturer and country of origin"), L("Production and expiry dates"), L("Batch number")],
      callout: L("KLOW can prepare Arabic labels and apply them before dispatch."),
    },
    { id: "duties", heading: L("Duties & taxes"), body: L("GCC customs duty and VAT apply on arrival unless you choose DDP. Ask us for an estimate with your quote.") },
    { id: "what-sells", heading: L("What sells in the UAE"), style: "list", items: [L("High-SPF, light sun care [to confirm]"), L("Brightening and niacinamide serums [to confirm]")] },
  ],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "uae-registration-guide",
  faq: [
    { question: L("Do cosmetics need to be registered before sale in the UAE?"), answer: L("Products are generally registered with the local municipality before sale. To be confirmed for your emirate.") },
    { question: L("Can KLOW ship DDP to the UAE?"), answer: L("DDP is available for selected countries — ask us for a UAE quote.") },
  ],
  seo: { description: L("How to import Korean cosmetics to the UAE: product registration, Arabic labels, duties and shipping — with a free UAE registration guide.") },
  enabled: true,
};

/* ───────────── Trend reports ───────────── */

const trend202609: TrendGuide = {
  slug: "2026-09",
  type: "trend",
  month: "2026-09",
  title: L("What’s selling in Korea — September 2026"),
  summary: L("[One-paragraph summary of the month: what moved in Korean retail, and what it means for buyers abroad.]"),
  heroImage: hero("Korea K-beauty trend report — September 2026", "brand-placeholder"),
  publishedAt: "2026-10-01",
  updatedAt: "2026-10-01",
  highlights: [L("[Highlight 1 — the biggest mover this month]"), L("[Highlight 2 — an ingredient gaining ground]"), L("[Highlight 3 — a category to watch]")],
  rankings: [
    { rank: 1, name: L("Heartleaf 77% Soothing Toner — Anua"), productId: "anua-heartleaf-toner", note: L("[Why it’s rising — ranking source to confirm]") },
    { rank: 2, name: L("Heartleaf Calming Toner — AIRMOOD"), productId: "airmood-heartleaf-toner", note: L("[Why it’s rising — ranking source to confirm]") },
    { rank: 3, name: L("[Rising product 3]"), note: L("[Why it’s rising]") },
    { rank: 4, name: L("PDRN Recovery Ampoule — [PARTNER 03]"), productId: "partner-03-pdrn-ampoule", note: L("[Why it’s rising — ranking source to confirm]") },
    { rank: 5, name: L("[Rising product 5]"), note: L("[Why it’s rising]") },
  ],
  ingredientsToWatch: [
    { name: "PDRN", note: L("[Why buyers should watch it this month]") },
    { name: "Heartleaf", note: L("[Why buyers should watch it this month]") },
    { name: "Retinal", note: L("[Why buyers should watch it this month]") },
  ],
  buyerTakeaways: [L("[Takeaway 1 — what to sample now]"), L("[Takeaway 2 — what to reorder]"), L("[Takeaway 3 — what to skip]")],
  keyFacts: [],
  sections: [],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "wholesale-price-list",
  faq: [],
  seo: { description: L("What’s selling in Korean beauty in September 2026: rising products, ingredients to watch and what it means for wholesale buyers.") },
  enabled: true,
};

/* ───────────── Ingredient guides ───────────── */

const pdrn: IngredientGuide = {
  slug: "pdrn",
  type: "ingredient",
  ingredient: "PDRN",
  aliases: ["Polydeoxyribonucleotide", "Salmon DNA"],
  title: L("PDRN skincare from Korea, for buyers."),
  summary: L("What PDRN is, why Korean clinics made it famous, and which brands you can sample at wholesale."),
  heroImage: hero("PDRN skincare products from Korea, available wholesale", "product-bottle"),
  publishedAt: "2026-09-20",
  updatedAt: "2026-10-01",
  whatItIs: L("PDRN (polydeoxyribonucleotide) is a DNA-derived ingredient, often sourced from salmon, first used in Korean clinic treatments. In skincare it’s marketed for recovery and skin renewal."),
  whyBuyersStock: L("Clinic credibility and strong word of mouth make PDRN an easy story at the shelf, and prices sit in the premium tier — good for margin. [Demand data to confirm]"),
  keyFacts: [],
  sections: [],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "brand-catalog",
  faq: [
    { question: L("Is PDRN the same as salmon DNA?"), answer: L("PDRN is usually derived from salmon DNA, purified for use in skincare.") },
    { question: L("Can I sample PDRN products from 1 unit?"), answer: L("Yes — partner brands on KLOW, like [PARTNER 03], can be sampled from 1 unit at wholesale price.") },
  ],
  seo: { description: L("PDRN skincare wholesale from Korea: what it is, why buyers stock it, popular products and new Korean brands you can sample from 1 unit.") },
  enabled: true,
};

const heartleaf: IngredientGuide = {
  slug: "heartleaf",
  type: "ingredient",
  ingredient: "Heartleaf",
  aliases: ["Houttuynia cordata", "Dokdami"],
  title: L("Heartleaf skincare from Korea, for buyers."),
  summary: L("Heartleaf (Houttuynia cordata) toners took K-beauty global. Here’s what to stock — and the new brands with the same calming line."),
  heroImage: hero("Heartleaf skincare products from Korea, available wholesale", "product-bottle"),
  publishedAt: "2026-09-20",
  updatedAt: "2026-10-01",
  whatItIs: L("Heartleaf is Houttuynia cordata, a plant extract used in Korean skincare for its soothing feel. It’s best known in toners and cleansing oils for sensitive, oily skin."),
  whyBuyersStock: L("It’s one of the most searched K-beauty ingredients abroad, and shoppers already know the toner format — so it sells without much explaining. [Demand data to confirm]"),
  keyFacts: [],
  sections: [],
  relatedBrands: [],
  relatedProducts: [],
  leadMagnetId: "brand-catalog",
  faq: [
    { question: L("Which heartleaf products sell best wholesale?"), answer: L("Toners and cleansing oils are the usual starting point. [Sales data to confirm]") },
    { question: L("Are there alternatives to the big heartleaf brands?"), answer: L("Yes — partner brands like AIRMOOD make heartleaf toners you can sample from 1 unit, often with better margins.") },
  ],
  seo: { description: L("Heartleaf skincare wholesale from Korea: bestsellers, new Korean brands with heartleaf lines, sample prices and margins.") },
  enabled: true,
};

export const GUIDES: Guide[] = [mexico, kazakhstan, uae, trend202609, pdrn, heartleaf];

/* ───────────── Lookups ───────────── */

const live = () => GUIDES.filter((g) => g.enabled);
export const importGuides = () => live().filter((g): g is ImportGuide => g.type === "import");
export const trendGuides = () => live().filter((g): g is TrendGuide => g.type === "trend").sort((a, b) => b.month.localeCompare(a.month));
export const ingredientGuides = () => live().filter((g): g is IngredientGuide => g.type === "ingredient");
export const latestTrend = () => trendGuides()[0];

export const importGuide = (slug: string) => importGuides().find((g) => g.slug === slug);
export const trendGuide = (month: string) => trendGuides().find((g) => g.month === month);
export const ingredientGuide = (slug: string) => ingredientGuides().find((g) => g.slug === slug);

/** URL of a guide. */
export const guideHref = (g: Guide) =>
  g.type === "import" ? `/guides/import/${g.slug}` : g.type === "trend" ? `/guides/trends/${g.month}` : `/guides/ingredients/${g.slug}`;

/** "September 2026" from "2026-09". */
export const monthLabel = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
};
