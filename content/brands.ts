/**
 * Brands with their own pages.
 *   major   → /brands/[slug]/wholesale — well-known brands sold at MOQ (no single-unit samples).
 *   partner → /brands/[slug]         — KLOW partner brands, sampled from 1 unit at wholesale price.
 *
 * Every section on a brand page reads from these fields; a section with no data is hidden,
 * so pages differ by brand rather than being one template with the name swapped.
 * [BRACKETS] = not confirmed yet. Partner brand details are sample data.
 */
import type { LocalizedText, MediaImage, MediaVideoItem } from "@/types/content";

export type BrandType = "major" | "partner";
export type ExclusivityStatus = "open" | "taken" | "ask";

export interface BrandProfile {
  slug: string;
  type: BrandType;
  name: string;
  tagline: LocalizedText;
  story: LocalizedText;
  category: string[];
  heroIngredients: string[];
  priceTier: "value" | "mid" | "premium";
  tags: string[];
  images: MediaImage[];
  videos: MediaVideoItem[];
  /** In display order; the first is the brand's hero product. */
  productIds: string[];
  buyerInfo: {
    marginNote?: LocalizedText;
    certifications: string[];
    /** Country codes where the brand can be sold now (see content/shippingCountries.ts for focus markets). */
    readyMarkets: string[];
    exclusivity: { country: string; status: ExclusivityStatus }[];
    marketingSupport: LocalizedText[];
    /** Rankings, review counts, awards. The row is hidden when empty. */
    proof: LocalizedText[];
  };
  flags: {
    onlyOnKlow: boolean;
    exclusiveOpen: boolean;
    /** Only when true may the page say "Official" / "Authorized". */
    official: boolean;
    featured: boolean;
    /** Whether single units can be ordered as samples (false for major brands). */
    sampleFromOne: boolean;
  };
  /** major: dispatch time from our warehouse, e.g. "[2–5]". */
  dispatchDays?: string;
  /** Hand-picked similar partner brands (slugs). Used before the automatic match. */
  similarBrands: string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  seo?: { title?: LocalizedText; description?: LocalizedText };
  enabled: boolean;
}

const placeholderImages = (name: string, n: number): MediaImage[] =>
  Array.from({ length: n }, (_, i) => ({
    alt: { en: `${name} K-beauty products${i ? ` — photo ${i + 1}` : ""}, wholesale from Korea` },
    fallback: i % 3 === 1 ? "product-bottle" : "brand-placeholder",
  }));

const placeholderVideos = (name: string): MediaVideoItem[] => [
  { ratio: "16:9", title: { en: `${name} brand film` } },
  { ratio: "9:16", title: { en: `${name} — texture` } },
  { ratio: "9:16", title: { en: `${name} — how to use` } },
  { ratio: "9:16", title: { en: `${name} — behind the scenes` } },
];

const majorFaq = (name: string) => [
  {
    question: { en: `What is the MOQ for ${name} wholesale?` },
    answer: { en: `${name} is sold from [__] units per SKU. Sign in to see the price at MOQ and the volume tiers below it.` },
  },
  {
    question: { en: `Can I sample ${name} before ordering in bulk?` },
    answer: { en: `${name} isn’t available as single-unit samples — it’s sold at MOQ. If you want to test first, the similar Korean brands on this page can be sampled from 1 unit at wholesale price.` },
  },
  {
    question: { en: `Do you ship ${name} to Mexico, Kazakhstan or the UAE?` },
    answer: { en: `Yes. We ship ${name} from our warehouse in Korea with export documents, and Spanish, Russian or Arabic labels where needed. Ask us about other countries.` },
  },
  {
    question: { en: `Are your ${name} products authentic?` },
    answer: { en: `Yes. Every unit is genuine stock, checked for expiry and packaging in our Korean warehouse before export. Proof of supply on request.` },
  },
];

export const BRANDS: BrandProfile[] = [
  /* ───── Major brands ───── */
  {
    slug: "anua",
    type: "major",
    name: "Anua",
    tagline: { en: "Heartleaf toners and cleansing oils, at MOQ from our Korean warehouse." },
    story: { en: "" },
    category: ["Skincare"],
    heroIngredients: ["Heartleaf", "Niacinamide"],
    priceTier: "mid",
    tags: ["soothing", "pores", "sensitive", "viral"],
    images: [],
    videos: [],
    productIds: ["anua-heartleaf-toner", "anua-cleansing-oil", "anua-peach-serum", "anua-cleansing-foam"],
    buyerInfo: {
      certifications: ["[CPNP]", "[FDA cosmetic listing]"],
      readyMarkets: ["US", "MX", "AE", "KZ", "GB"],
      exclusivity: [],
      marketingSupport: [],
      proof: [],
    },
    flags: { onlyOnKlow: false, exclusiveOpen: false, official: false, featured: true, sampleFromOne: false },
    dispatchDays: "[2–5]",
    similarBrands: ["airmood", "inyoe"],
    faq: majorFaq("Anua"),
    enabled: true,
  },
  {
    slug: "cosrx",
    type: "major",
    name: "COSRX",
    tagline: { en: "Snail mucin and low-pH essentials, at MOQ from our Korean warehouse." },
    story: { en: "" },
    category: ["Skincare"],
    heroIngredients: ["Snail mucin", "BHA", "Retinol"],
    priceTier: "value",
    tags: ["repair", "acne", "barrier", "viral"],
    images: [],
    videos: [],
    productIds: ["cosrx-snail-essence", "cosrx-gel-cleanser", "cosrx-retinol-cream", "cosrx-snail-cream"],
    buyerInfo: {
      certifications: ["[CPNP]", "[FDA cosmetic listing]"],
      readyMarkets: ["US", "MX", "AE", "SA", "GB"],
      exclusivity: [],
      marketingSupport: [],
      proof: [],
    },
    flags: { onlyOnKlow: false, exclusiveOpen: false, official: false, featured: true, sampleFromOne: false },
    dispatchDays: "[2–5]",
    similarBrands: ["inyoe", "partner-03"],
    faq: majorFaq("COSRX"),
    enabled: true,
  },

  /* ───── Partner brands ───── */
  {
    slug: "airmood",
    type: "partner",
    name: "AIRMOOD",
    tagline: { en: "Heartleaf and cica for calm, breathable skin." },
    story: {
      en: "AIRMOOD started in a small lab in [CITY] with one goal: soothing care that feels like nothing on the skin. Its heartleaf line is fragrance-free and built for sensitive skin, with textures that sell on first try. Every formula is made in Korea and shipped to KLOW buyers directly.",
    },
    category: ["Skincare"],
    heroIngredients: ["Heartleaf", "Centella"],
    priceTier: "value",
    tags: ["soothing", "sensitive", "pores", "fragrance-free"],
    images: placeholderImages("AIRMOOD", 8),
    videos: placeholderVideos("AIRMOOD"),
    productIds: ["airmood-heartleaf-toner", "airmood-cica-cream", "airmood-cleansing-oil", "airmood-sun-fluid"],
    buyerInfo: {
      marginNote: { en: "Based on the hero toner" },
      certifications: [],
      readyMarkets: ["MX", "KZ", "AE"],
      exclusivity: [
        { country: "MX", status: "open" },
        { country: "KZ", status: "open" },
        { country: "AE", status: "ask" },
      ],
      marketingSupport: [{ en: "Image assets" }, { en: "Influencer seeding [scope]" }, { en: "Short-form videos" }],
      proof: [],
    },
    flags: { onlyOnKlow: true, exclusiveOpen: true, official: false, featured: true, sampleFromOne: true },
    similarBrands: [],
    faq: [
      { question: { en: "Is AIRMOOD only available through KLOW?" }, answer: { en: "Yes — AIRMOOD’s export wholesale runs through KLOW, so you won’t compete with grey-market stock." } },
      { question: { en: "Can I get exclusivity for my country?" }, answer: { en: "Exclusive territories are open in Mexico and Kazakhstan; ask us about the UAE. Exclusivity usually comes with a yearly volume commitment of [__]." } },
      { question: { en: "Do the products come with local-language labels?" }, answer: { en: "Spanish, Russian and Arabic labels can be applied in our warehouse before dispatch." } },
    ],
    enabled: true,
  },
  {
    slug: "inyoe",
    type: "partner",
    name: "INYOE",
    tagline: { en: "Snail and niacinamide for skin that bounces back." },
    story: {
      en: "INYOE makes repair-first skincare from [CITY], Korea. Its snail essence is the line’s bestseller in [CHANNEL], and the low-pH cleanser keeps buyers coming back. Small batches, consistent quality, and a team that answers distributors directly.",
    },
    category: ["Skincare"],
    heroIngredients: ["Snail mucin", "Niacinamide", "BHA"],
    priceTier: "mid",
    tags: ["repair", "barrier", "glow", "acne"],
    images: placeholderImages("INYOE", 7),
    videos: placeholderVideos("INYOE"),
    productIds: ["inyoe-snail-essence", "inyoe-niacinamide-serum", "inyoe-gel-cleanser"],
    buyerInfo: {
      marginNote: { en: "Based on the hero essence" },
      certifications: ["[CPNP]"],
      readyMarkets: ["MX", "AE", "SA"],
      exclusivity: [
        { country: "MX", status: "taken" },
        { country: "AE", status: "open" },
        { country: "KZ", status: "ask" },
      ],
      marketingSupport: [{ en: "Image assets" }, { en: "Retail display kit [scope]" }],
      proof: [{ en: "[Olive Young ranking]" }, { en: "[Review count]" }],
    },
    flags: { onlyOnKlow: true, exclusiveOpen: true, official: false, featured: true, sampleFromOne: true },
    similarBrands: [],
    faq: [
      { question: { en: "Which INYOE products sell best abroad?" }, answer: { en: "The Snail Repair Essence and the Low pH Gel Cleanser — start your sample box with those two." } },
      { question: { en: "Is exclusivity available?" }, answer: { en: "Open in the UAE; taken in Mexico; ask us about Kazakhstan." } },
    ],
    enabled: true,
  },
  {
    slug: "partner-03",
    type: "partner",
    name: "[PARTNER 03]",
    tagline: { en: "[Retinal and peptides for visible renewal.]" },
    story: { en: "[Brand story — 3–4 sentences on who makes it, what it’s known for, and why buyers reorder.]" },
    category: ["Skincare"],
    heroIngredients: ["Retinal", "Peptides", "PDRN"],
    priceTier: "premium",
    tags: ["anti-aging", "night", "renewal"],
    images: placeholderImages("[PARTNER 03]", 6),
    videos: [],
    productIds: ["partner-03-retinal-serum", "partner-03-peptide-cream", "partner-03-pdrn-ampoule"],
    buyerInfo: {
      certifications: [],
      readyMarkets: ["AE"],
      exclusivity: [{ country: "MX", status: "open" }, { country: "AE", status: "open" }],
      marketingSupport: [{ en: "Image assets" }],
      proof: [],
    },
    flags: { onlyOnKlow: true, exclusiveOpen: true, official: false, featured: false, sampleFromOne: true },
    similarBrands: [],
    faq: [],
    enabled: true,
  },
];

export const brandProfile = (slug: string) => BRANDS.find((b) => b.slug === slug && b.enabled);
export const brandsOfType = (type: BrandType) => BRANDS.filter((b) => b.enabled && b.type === type);

/**
 * Partner brands to show next to `brand`: the hand-picked `similarBrands` when set;
 * otherwise partners scored by shared hero ingredients (×2), tags and categories, best 4.
 */
export function similarPartners(brand: BrandProfile, limit = 4): BrandProfile[] {
  const partners = brandsOfType("partner").filter((p) => p.slug !== brand.slug);
  if (brand.similarBrands.length) {
    return brand.similarBrands.map((s) => partners.find((p) => p.slug === s)).filter((p): p is BrandProfile => !!p);
  }
  const overlap = (a: string[], b: string[]) => a.filter((x) => b.includes(x)).length;
  return partners
    .map((p) => ({
      p,
      score: overlap(p.heroIngredients, brand.heroIngredients) * 2 + overlap(p.tags, brand.tags) + overlap(p.category, brand.category),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Major brands that list `partner` as similar — for the partner page's "fits the same shelf" links. */
export const majorsListing = (partner: BrandProfile) =>
  brandsOfType("major").filter((m) => similarPartners(m).some((p) => p.slug === partner.slug));
