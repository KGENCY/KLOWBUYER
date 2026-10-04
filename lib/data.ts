export type BuyerType = "distributor" | "online" | "marketplace" | "store" | "salon";
export type Region = "us" | "ca" | "uk" | "eu" | "gcc" | "sea" | "au" | "latam";
export type Line =
  | "icons"
  | "gems"
  | "antiaging"
  | "hydration"
  | "sun"
  | "sensitive"
  | "brightening"
  | "hair"
  | "body"
  | "makeup";
export type Priority = "moq" | "margin" | "exclusive" | "supply" | "docs";
export type Purpose = "test" | "proven" | "discover" | "expand" | "distribute";

export type Shape = "dropper" | "tube" | "jar" | "pump" | "bottle" | "compact" | "pouch" | "stick";

export interface Brand {
  id: string;
  name: string;
  tier: "icon" | "gem";
  tagline: string;
  logo?: string; // path under /public, e.g. "/logos/haeum.svg" — falls back to a wordmark
  derm?: boolean; // dermatologist / clinic-developed ("K-doctor") brand
  support: string[]; // marketing support the brand offers buyers
  city: string;
  founded: number;
  lines: Line[];
  channels: BuyerType[];
  docs: Region[];
  exclusiveOpen: Region[];
  moq: number; // wholesale units per SKU after sampling
  margin: number; // average MSRP / wholesale
  leadDays: number;
}

export interface Product {
  id: string;
  brandId: string;
  name: string;
  size: string;
  category: Category;
  lines: Line[];
  wholesale: number;
  msrp: number;
  shape: Shape;
  tone: string;
  cap: string;
  badge?: "Bestseller" | "Hidden gem" | "New";
}

export type Category = "Skincare" | "Sun Care" | "Cleansing" | "Masks" | "Haircare" | "Body" | "Makeup";
export const CATEGORIES: Category[] = ["Skincare", "Sun Care", "Cleansing", "Masks", "Haircare", "Body", "Makeup"];

export const FREE_SHIPPING_SKUS = 5;
export const SAMPLE_SHIPPING_FEE = 18;

export const BRANDS: Brand[] = [
  { id: "haeum", derm: true, name: "Haeum Lab", tier: "icon", tagline: "Barrier science with a cult following", support: ["Imagery", "Launch content", "Ad co-funding"], city: "Seoul", founded: 2015, lines: ["icons", "hydration", "sensitive"], channels: ["distributor", "online", "marketplace", "store"], docs: ["us", "ca", "uk", "eu", "sea", "au"], exclusiveOpen: [], moq: 48, margin: 2.6, leadDays: 3 },
  { id: "morae", name: "Morae", tier: "gem", tagline: "Jeju volcanic minerals, quietly formulated", support: ["Imagery", "Influencer seeding"], city: "Jeju", founded: 2020, lines: ["gems", "sensitive", "brightening"], channels: ["online", "store", "marketplace", "salon"], docs: ["us", "sea", "au"], exclusiveOpen: ["us", "ca", "uk", "eu", "gcc", "latam", "au"], moq: 12, margin: 3.1, leadDays: 5 },
  { id: "sooan", name: "Sooan", tier: "icon", tagline: "Fermented ginseng for visible firmness", support: ["Imagery", "Retail displays", "Staff training"], city: "Seoul", founded: 2012, lines: ["icons", "antiaging"], channels: ["distributor", "store", "salon", "online"], docs: ["us", "ca", "uk", "eu", "gcc", "sea"], exclusiveOpen: ["latam"], moq: 36, margin: 2.7, leadDays: 4 },
  { id: "gyeol", derm: true, name: "Gyeol", tier: "gem", tagline: "Peptide textures for professional treatment rooms", support: ["Staff training", "Protocol guides"], city: "Busan", founded: 2019, lines: ["gems", "antiaging", "hydration"], channels: ["salon", "store", "distributor"], docs: ["us", "eu", "uk", "gcc"], exclusiveOpen: ["us", "ca", "gcc", "sea", "au", "latam"], moq: 12, margin: 3.4, leadDays: 6 },
  { id: "bom", name: "Bom Studio", tier: "icon", tagline: "Weightless sun care, worn daily in Seoul", support: ["Imagery", "Launch content", "Ad co-funding"], city: "Seoul", founded: 2017, lines: ["icons", "sun", "sensitive"], channels: ["distributor", "online", "marketplace", "store"], docs: ["us", "ca", "uk", "eu", "gcc", "sea", "au", "latam"], exclusiveOpen: [], moq: 60, margin: 2.4, leadDays: 2 },
  { id: "ilmi", name: "Ilmi", tier: "gem", tagline: "Rice and niacinamide for even, luminous skin", support: ["Imagery", "Influencer seeding"], city: "Gyeonggi", founded: 2021, lines: ["gems", "brightening", "hydration"], channels: ["online", "marketplace", "store"], docs: ["us", "ca", "sea"], exclusiveOpen: ["uk", "eu", "gcc", "au", "latam"], moq: 12, margin: 3.2, leadDays: 5 },
  { id: "nokdu", name: "Nokdu Atelier", tier: "gem", tagline: "Mung bean cleansing for congested skin", support: ["Imagery", "Launch content"], city: "Daegu", founded: 2020, lines: ["gems", "sensitive"], channels: ["online", "marketplace", "store", "distributor"], docs: ["us", "eu", "uk", "sea"], exclusiveOpen: ["ca", "gcc", "au", "latam"], moq: 24, margin: 2.9, leadDays: 4 },
  { id: "yeon", derm: true, name: "Yeon Seoul", tier: "icon", tagline: "Scalp-first haircare from a Gangnam clinic", support: ["Staff training", "Retail displays"], city: "Seoul", founded: 2016, lines: ["icons", "hair"], channels: ["salon", "store", "distributor", "online"], docs: ["us", "ca", "uk", "eu", "gcc", "au"], exclusiveOpen: ["sea", "latam"], moq: 24, margin: 2.8, leadDays: 3 },
  { id: "ondo", name: "Ondo", tier: "gem", tagline: "Warm, sensorial body rituals", support: ["Imagery", "Influencer seeding"], city: "Seoul", founded: 2022, lines: ["gems", "body", "hydration"], channels: ["store", "salon", "online"], docs: ["us", "eu"], exclusiveOpen: ["us", "ca", "uk", "eu", "gcc", "sea", "au", "latam"], moq: 6, margin: 3.5, leadDays: 7 },
  { id: "seorin", name: "Seorin", tier: "icon", tagline: "Second-skin cushions and tints", support: ["Imagery", "Launch content", "Ad co-funding"], city: "Seoul", founded: 2014, lines: ["icons", "makeup"], channels: ["distributor", "online", "marketplace", "store"], docs: ["us", "ca", "uk", "eu", "gcc", "sea", "au"], exclusiveOpen: [], moq: 48, margin: 2.5, leadDays: 3 },
  { id: "dain", derm: true, name: "Dain Derm", tier: "gem", tagline: "Retinal and bakuchiol for sensitive ageing skin", support: ["Staff training", "Imagery"], city: "Seoul", founded: 2021, lines: ["gems", "antiaging", "sensitive"], channels: ["salon", "online", "store"], docs: ["us", "uk", "eu", "au"], exclusiveOpen: ["ca", "gcc", "sea", "latam", "us"], moq: 12, margin: 3.3, leadDays: 5 },
  { id: "purehan", name: "Pure Han", tier: "icon", tagline: "Hanbang botanicals in modern formulas", support: ["Imagery", "Retail displays", "Launch content"], city: "Seoul", founded: 2011, lines: ["icons", "antiaging", "brightening"], channels: ["distributor", "store", "marketplace"], docs: ["us", "ca", "uk", "eu", "gcc", "sea", "latam"], exclusiveOpen: ["au"], moq: 36, margin: 2.6, leadDays: 3 },
];

export const PRODUCTS: Product[] = [
  { id: "p01", brandId: "haeum", name: "Ceramide Barrier Cream", size: "50 ml", category: "Skincare", lines: ["hydration", "sensitive"], wholesale: 9.8, msrp: 26, shape: "jar", tone: "#ECE7DF", cap: "#2A2A2A", badge: "Bestseller" },
  { id: "p02", brandId: "haeum", name: "Panthenol Essence Toner", size: "200 ml", category: "Skincare", lines: ["hydration"], wholesale: 7.6, msrp: 21, shape: "bottle", tone: "#E4E8E6", cap: "#2A2A2A" },
  { id: "p03", brandId: "bom", name: "Airy Sun Fluid SPF 50+", size: "50 ml", category: "Sun Care", lines: ["sun", "sensitive"], wholesale: 7.2, msrp: 18, shape: "tube", tone: "#F2EEE6", cap: "#C9B99A", badge: "Bestseller" },
  { id: "p04", brandId: "bom", name: "Mineral Tone-Up Sun Milk", size: "50 ml", category: "Sun Care", lines: ["sun", "sensitive", "brightening"], wholesale: 8.1, msrp: 22, shape: "pump", tone: "#EFE4DE", cap: "#FFFFFF" },
  { id: "p05", brandId: "sooan", name: "Red Ginseng Firming Serum", size: "30 ml", category: "Skincare", lines: ["antiaging"], wholesale: 14.5, msrp: 42, shape: "dropper", tone: "#8C3B2E", cap: "#1E1E1E", badge: "Bestseller" },
  { id: "p06", brandId: "sooan", name: "Ginseng Contour Eye Cream", size: "20 ml", category: "Skincare", lines: ["antiaging"], wholesale: 12.2, msrp: 36, shape: "jar", tone: "#B4876A", cap: "#C9A86A" },
  { id: "p07", brandId: "morae", name: "Volcanic Clay Cleansing Foam", size: "120 ml", category: "Cleansing", lines: ["sensitive"], wholesale: 6.4, msrp: 20, shape: "tube", tone: "#5A5753", cap: "#1E1E1E", badge: "Hidden gem" },
  { id: "p08", brandId: "morae", name: "Jeju Mineral Calming Mist", size: "100 ml", category: "Skincare", lines: ["sensitive", "hydration"], wholesale: 6.9, msrp: 22, shape: "bottle", tone: "#C7CCC9", cap: "#FFFFFF" },
  { id: "p09", brandId: "gyeol", name: "Peptide Lift Ampoule", size: "30 ml", category: "Skincare", lines: ["antiaging"], wholesale: 13.9, msrp: 48, shape: "dropper", tone: "#DCD3C6", cap: "#9C8A6E", badge: "Hidden gem" },
  { id: "p10", brandId: "gyeol", name: "Collagen Sleeping Mask", size: "70 ml", category: "Masks", lines: ["antiaging", "hydration"], wholesale: 11.4, msrp: 38, shape: "jar", tone: "#F0EBE3", cap: "#9C8A6E" },
  { id: "p11", brandId: "ilmi", name: "Rice Niacinamide Glow Serum", size: "30 ml", category: "Skincare", lines: ["brightening"], wholesale: 8.6, msrp: 28, shape: "dropper", tone: "#F3EFE6", cap: "#D2C4A6", badge: "Hidden gem" },
  { id: "p12", brandId: "ilmi", name: "Rice Water Hydra Mask", size: "5 sheets", category: "Masks", lines: ["hydration", "brightening"], wholesale: 6.2, msrp: 20, shape: "pouch", tone: "#EAE3D5", cap: "#B9A782", badge: "New" },
  { id: "p13", brandId: "nokdu", name: "Mung Bean Pore Cleansing Oil", size: "200 ml", category: "Cleansing", lines: ["sensitive"], wholesale: 8.9, msrp: 26, shape: "pump", tone: "#D7DCC9", cap: "#2F3A2A" },
  { id: "p14", brandId: "nokdu", name: "Green Clay Pack", size: "100 ml", category: "Masks", lines: ["sensitive"], wholesale: 7.1, msrp: 22, shape: "jar", tone: "#AAB49A", cap: "#2F3A2A" },
  { id: "p15", brandId: "yeon", name: "Scalp Clinic Shampoo", size: "300 ml", category: "Haircare", lines: ["hair"], wholesale: 9.4, msrp: 28, shape: "pump", tone: "#2B2B2B", cap: "#BFBFBF", badge: "Bestseller" },
  { id: "p16", brandId: "yeon", name: "Protein Repair Hair Serum", size: "100 ml", category: "Haircare", lines: ["hair"], wholesale: 8.2, msrp: 24, shape: "bottle", tone: "#D9CFC2", cap: "#2B2B2B" },
  { id: "p17", brandId: "ondo", name: "Hinoki Body Wash", size: "400 ml", category: "Body", lines: ["body"], wholesale: 9.6, msrp: 34, shape: "pump", tone: "#C8B79F", cap: "#2A2622", badge: "Hidden gem" },
  { id: "p18", brandId: "ondo", name: "Shea Silk Body Lotion", size: "250 ml", category: "Body", lines: ["body", "hydration"], wholesale: 10.2, msrp: 36, shape: "tube", tone: "#E8DDCF", cap: "#2A2622" },
  { id: "p19", brandId: "seorin", name: "Second Skin Cushion", size: "15 g", category: "Makeup", lines: ["makeup"], wholesale: 10.8, msrp: 29, shape: "compact", tone: "#1E1E1E", cap: "#C9A86A", badge: "Bestseller" },
  { id: "p20", brandId: "seorin", name: "Water Glow Lip Tint", size: "4 g", category: "Makeup", lines: ["makeup"], wholesale: 4.9, msrp: 14, shape: "stick", tone: "#A3443B", cap: "#1E1E1E" },
  { id: "p21", brandId: "dain", name: "Encapsulated Retinal 0.1%", size: "30 ml", category: "Skincare", lines: ["antiaging", "sensitive"], wholesale: 12.8, msrp: 42, shape: "pump", tone: "#E6DDD0", cap: "#6E5B45", badge: "New" },
  { id: "p22", brandId: "dain", name: "Bakuchiol Night Cream", size: "50 ml", category: "Skincare", lines: ["antiaging"], wholesale: 11.6, msrp: 38, shape: "jar", tone: "#CFC3B2", cap: "#6E5B45" },
  { id: "p23", brandId: "purehan", name: "Hanbang Radiance Essence", size: "150 ml", category: "Skincare", lines: ["antiaging", "brightening"], wholesale: 13.2, msrp: 39, shape: "bottle", tone: "#7A5A3A", cap: "#C9A86A", badge: "Bestseller" },
  { id: "p24", brandId: "purehan", name: "Ginseng Sun Cream SPF 50", size: "50 ml", category: "Sun Care", lines: ["sun", "antiaging"], wholesale: 7.9, msrp: 23, shape: "tube", tone: "#E9DFD0", cap: "#7A5A3A" },
];

export const brandById = (id: string) => BRANDS.find((b) => b.id === id)!;
export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)!;
export const productsOf = (brandId: string) => PRODUCTS.filter((p) => p.brandId === brandId);

export const money = (n: number) => `$${n.toFixed(2)}`;

/** Supply rate (공급률): wholesale as a share of MSRP. Lower = more margin for the buyer. */
export const supplyRate = (p: Product) => Math.round((p.wholesale / p.msrp) * 100);

/* ───────────── Curated shelves — cut for how buyers source, not how shoppers browse ───────────── */
/** A clickable sub-range inside a shelf (price point, supply rate…). Empty bands are hidden. */
export interface Band {
  id: string;
  label: string;
  note?: string;
  test: (p: Product) => boolean;
}

export interface Shelf {
  id: string;
  title: string;
  lede: string;
  preview: 4 | 8;
  pick: (p: Product, b: Brand) => boolean;
  sort?: (a: Product, b: Product) => number;
  bands?: Band[];
  tag?: (p: Product) => string; // highlight shown on each card in this shelf
}

const rateBand = (id: string, label: string, lo: number, hi: number): Band => ({
  id, label, note: `${100 - hi}–${100 - lo}% margin`,
  test: (p) => supplyRate(p) >= lo && supplyRate(p) <= hi,
});

const priceBand = (id: string, label: string, lo: number, hi = Infinity): Band => ({
  id, label, test: (p) => p.msrp >= lo && p.msrp < hi,
});

export const SHELVES: Shelf[] = [
  {
    id: "famous", title: "Most famous", preview: 8,
    lede: "The names your customers already search for. Proven sell-through, ready to list.",
    pick: (_, b) => b.tier === "icon",
    sort: (a, b) => Number(b.badge === "Bestseller") - Number(a.badge === "Bestseller"),
  },
  {
    id: "margin", title: "High margin", preview: 4,
    lede: "Sorted by supply rate — wholesale as a share of retail. The industry standard is keystone, 50%. Every brand here supplies at 40% or less.",
    pick: (p) => supplyRate(p) <= 50,
    sort: (a, b) => supplyRate(a) - supplyRate(b),
    bands: [
      { ...rateBand("r30", "30% & under", 0, 30), note: "70%+ margin" },
      rateBand("r33", "31–33%", 31, 33),
      rateBand("r35", "34–35%", 34, 35),
      rateBand("r38", "36–38%", 36, 38),
      rateBand("r40", "39–40%", 39, 40),
      rateBand("r50", "41–50%", 41, 50),
    ],
    tag: (p) => `${supplyRate(p)}% supply · ${100 - supplyRate(p)}% margin`,
  },
  {
    id: "indie", title: "New indie brands, marketing included", preview: 4,
    lede: "Under-the-radar Korean labels, open for exclusives — with imagery and seeding support from the brand.",
    pick: (_, b) => b.tier === "gem",
    sort: (a, b) => brandById(b.brandId).founded - brandById(a.brandId).founded || Number(b.badge === "New") - Number(a.badge === "New"),
  },
  {
    id: "price", title: "Shop by retail price", preview: 4,
    lede: "Pick the price point your shelf needs — from impulse add-ons that move in volume to hero serums.",
    pick: () => true,
    sort: (a, b) => a.msrp - b.msrp,
    bands: [
      priceBand("u15", "Under $15", 0, 15),
      priceBand("u20", "$15–20", 15, 20),
      priceBand("u25", "$20–25", 20, 25),
      priceBand("u30", "$25–30", 25, 30),
      priceBand("u35", "$30–35", 30, 35),
      priceBand("u40", "$35–40", 35, 40),
      priceBand("u45", "$40–45", 40, 45),
      priceBand("o45", "$45+", 45),
    ],
  },
  {
    id: "derm", title: "Derm & K-doctor brands", preview: 4,
    lede: "Clinic-developed formulas for pharmacies, med-spas and treatment rooms.",
    pick: (_, b) => !!b.derm,
  },
  {
    id: "antiaging", title: "Anti-aging", preview: 4,
    lede: "Ginseng, peptides, retinal and bakuchiol — the highest-ticket category in K-beauty.",
    pick: (p) => p.lines.includes("antiaging"),
    sort: (a, b) => b.msrp - a.msrp,
  },
  {
    id: "hydration", title: "Hydration", preview: 4,
    lede: "Barrier creams, essences and masks — the everyday reorder.",
    pick: (p) => p.lines.includes("hydration"),
  },
  {
    id: "sensitive", title: "Sensitive skin", preview: 4,
    lede: "Calming, fragrance-conscious formulas with low return risk.",
    pick: (p) => p.lines.includes("sensitive"),
  },
];

export function shelfProducts(s: Shelf) {
  const list = PRODUCTS.filter((p) => s.pick(p, brandById(p.brandId)));
  return s.sort ? [...list].sort(s.sort) : list;
}
