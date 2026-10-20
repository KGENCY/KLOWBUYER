/**
 * Brands with their own pages.
 *   major   → /brands/[slug]/wholesale — well-known brands sold at MOQ (no single-unit samples).
 *   partner → /brands/[slug]         — KLOW partner brands, sampled from 1 unit at wholesale price.
 *
 * Every section on a brand page reads from these fields; a section with no data is hidden,
 * so pages differ by brand rather than being one template with the name swapped.
 * [BRACKETS] = not confirmed yet. Partner brands are the real ones listed on klow.kr (content/klowCatalog.ts).
 */
import type { LocalizedText, MediaImage, MediaVideoItem } from "@/types/content";
import { PRODUCTS } from "./products";
import { KLOW_BRANDS } from "./klowCatalog";

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
  /** Position in menus and lists (lower first); brands without it follow, A–Z. */
  order?: number;
  enabled: boolean;
  /** Brand logo (image URL). */
  logo?: string;
  /** Tier label over the brand name, e.g. "Hidden gem". */
  tierLabel?: string;
  /** Country of origin, e.g. "Korea". */
  origin?: string;
  /** Units per SKU for the first wholesale order. */
  openingOrder?: number;
  /** Average MSRP ÷ wholesale price, e.g. 2.1. */
  retailMultiple?: number;
  /** The brand's own YouTube videos and Shorts ("Brand in action"). */
  youtube?: { id: string; title: string; vertical: boolean }[];
}

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

/** A klow.kr partner brand as a BrandProfile. Only facts klow.kr lists are filled; the rest stays empty, so those sections hide. */
function partner(k: (typeof KLOW_BRANDS)[number], order: number): BrandProfile {
  const products = PRODUCTS.filter((p) => k.productIds.includes(p.id));
  const samples = products.map((p) => p.samplePrice).filter((n): n is number => n != null);
  const from = samples.length ? `$${Math.min(...samples).toFixed(2)}` : "$[__]";
  const actives = [...new Set(products.flatMap((p) => (p.keyActives ?? []).filter((a) => !/^SPF/i.test(a))).map((a) => a.replace(/\s*\d+%$/, "")))];
  return {
    slug: k.slug,
    type: "partner",
    name: k.name,
    tagline: { en: k.intro.replace(/\s*\n\s*/g, " ") },
    story: { en: "" },
    category: [...new Set(products.map((p) => p.category).filter((c) => c !== "Sets" && c !== "Accessories"))],
    heroIngredients: actives.slice(0, 3),
    priceTier: "mid",
    tags: [],
    images: products[0]?.images[0]?.src ? [{ src: products[0].images[0].src, alt: { en: `${k.name} K-beauty products, wholesale from Korea` }, fallback: "brand-placeholder" }] : [],
    videos: [],
    productIds: k.productIds,
    buyerInfo: { certifications: [], readyMarkets: [], exclusivity: [], marketingSupport: [], proof: [] },
    flags: { onlyOnKlow: false, exclusiveOpen: false, official: false, featured: order < 2, sampleFromOne: true },
    similarBrands: [],
    faq: [
      {
        question: { en: `What is the minimum order for ${k.name}?` },
        answer: { en: `The opening order is ${k.openingOrder ?? "[__]"} units per SKU. Before that, you can sample any ${k.name} product from 1 unit at wholesale price — from ${from}.` },
      },
      {
        question: { en: `How much margin is there on ${k.name}?` },
        answer: { en: `On average ${k.name} retails at ${k.retailMultiple ?? "[__]"}× its wholesale price. Sign in to see the unit price at every order quantity.` },
      },
      {
        question: { en: `Can I get the full ingredients and documents for ${k.name}?` },
        answer: { en: "Yes — ask the brand team on any product page. Full INCI, specifications and export documents are sent on request, usually within one business day." },
      },
    ],
    order,
    enabled: true,
    logo: k.logo ?? undefined,
    tierLabel: k.tier,
    origin: k.origin,
    openingOrder: k.openingOrder ?? undefined,
    retailMultiple: k.retailMultiple ?? undefined,
    youtube: k.youtube,
  };
}

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
    similarBrands: ["inyoe", "simplete"],
    faq: majorFaq("COSRX"),
    enabled: true,
  },


  /* ───── Partner brands (klow.kr) ───── */
  ...KLOW_BRANDS.map((k, i): BrandProfile => partner(k, i)),
];

const byOrder = (a: BrandProfile, b: BrandProfile) =>
  (a.order ?? Infinity) - (b.order ?? Infinity) || a.name.localeCompare(b.name);

export const brandProfile = (slug: string) => BRANDS.find((b) => b.slug === slug && b.enabled);
/** Enabled brands of a type, by `order` then name. */
export const brandsOfType = (type: BrandType) => BRANDS.filter((b) => b.enabled && b.type === type).sort(byOrder);
export const allBrands = () => BRANDS.filter((b) => b.enabled).sort(byOrder);

/** Where a brand's page lives: major → /brands/[slug]/wholesale, partner → /brands/[slug]. */
export const brandHref = (b: Pick<BrandProfile, "slug" | "type">) => (b.type === "major" ? `/brands/${b.slug}/wholesale` : `/brands/${b.slug}`);

/** Partners featured in the Brands menu: `flags.featured` ones, or the first partner if none are. */
export const featuredPartners = (limit = 2) => {
  const partners = brandsOfType("partner");
  const featured = partners.filter((p) => p.flags.featured);
  return (featured.length ? featured : partners).slice(0, featured.length ? limit : 1);
};

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

/* Dev check: every similarBrands slug and productId must point at something real. */
if (process.env.NODE_ENV !== "production") {
  for (const b of BRANDS) {
    for (const slug of b.similarBrands)
      if (!BRANDS.some((x) => x.slug === slug && x.enabled)) console.warn(`[brands] ${b.slug}.similarBrands → "${slug}" doesn't exist`);
    for (const id of b.productIds)
      if (!PRODUCTS.some((p) => p.id === id)) console.warn(`[brands] ${b.slug}.productIds → "${id}" doesn't exist`);
  }
}
