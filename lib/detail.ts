import { Brand, Category, Product, Region, brandById, productById } from "./data";

/* ────────────────────────────────────────────────────────────────
   Product detail data for professional buyers.
   Everything a buyer needs before committing a PO: volume pricing,
   trade terms, logistics, compliance, and what other buyers saw.
   ──────────────────────────────────────────────────────────────── */

export interface Tier {
  label: string;
  minUnits: number;
  unit: number; // USD per unit
  off: number; // % off the sample / MOQ price
}

export interface Logistics {
  casePack: number; // units per inner carton
  cartonUnits: number; // units per master carton
  cartonCm: string; // L × W × H
  cartonKg: number;
  shelfMonths: number;
  paoMonths: number; // period after opening
  hsCode: string;
  origin: string;
  readiness: string; // production / stock status
  leadWeeks: string;
}

export interface Detail {
  about: string;
  actives: string[];
  claims: string[];
  inci: string;
  certs: string[];
  launched: number;
  tiers: Tier[];
  logistics: Logistics;
  /** Markets where the brand already holds product registration. */
  registered: Region[];
  /** Sell-through signals reported by buyers reordering this SKU. */
  signals: { reorderRate: number; firstOrder: number; topChannels: string[] };
}

export interface Review {
  id: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  buyer: string; // business type
  company: string;
  country: string;
  channel: string;
  units: number; // last order size
  reorders: number;
  date: string;
  tags: string[];
}

export const REGION_NAME: Record<Region, string> = {
  us: "United States", ca: "Canada", uk: "United Kingdom", eu: "European Union", gcc: "GCC", sea: "Southeast Asia", au: "Australia", latam: "Latin America",
};

export const REGION_DOC: Record<Region, string> = {
  us: "FDA / MoCRA listing", ca: "Health Canada CNF", uk: "UK SCPN", eu: "CPNP + Responsible Person", gcc: "SFDA / ESMA", sea: "ASEAN notification", au: "AICIS", latam: "ANVISA / COFEPRIS",
};

/* ───────────── Per-product editorial content ───────────── */

interface Copy { about: string; actives: string[]; claims: string[]; inci: string; certs: string[]; launched: number }

const COPY: Record<string, Copy> = {
  p01: { about: "A 5-ceramide moisturiser built for compromised barriers. Rich without occlusion, it is the product Haeum Lab is known for and the SKU most buyers lead with.", actives: ["Ceramide NP/AP/EOP 2%", "Panthenol 3%", "Madecassoside", "Squalane"], claims: ["Fragrance-free", "Dermatologist tested", "Non-comedogenic", "Vegan"], inci: "Water, Glycerin, Squalane, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Panthenol, Ceramide NP, Ceramide AP, Ceramide EOP, Madecassoside, Cholesterol, Phytosphingosine…", certs: ["CPNP", "FDA listed", "Vegan Society", "ISO 22716"], launched: 2017 },
  p02: { about: "A fluid, fast-absorbing toner with 5% panthenol. Positioned as the first step of a barrier routine and a natural pairing with the Barrier Cream.", actives: ["Panthenol 5%", "Beta-glucan", "Hyaluronic acid (3 weights)"], claims: ["Fragrance-free", "Alcohol-free", "pH 5.5", "Vegan"], inci: "Water, Panthenol, Butylene Glycol, Glycerin, Beta-Glucan, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Allantoin, Trehalose…", certs: ["CPNP", "FDA listed", "Vegan Society"], launched: 2018 },
  p03: { about: "The weightless chemical sunscreen that made Bom Studio a daily habit in Seoul. No white cast, no pilling under makeup, and a strong repeat-purchase profile at retail.", actives: ["Uvinul A Plus", "Tinosorb S", "Centella extract", "Niacinamide 2%"], claims: ["SPF 50+ PA++++", "No white cast", "Fragrance-free", "Reef-safer filters"], inci: "Water, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Niacinamide, Centella Asiatica Extract…", certs: ["CPNP", "FDA OTC listed", "SPF in-vivo (KFDA)", "ISO 24444"], launched: 2019 },
  p04: { about: "A mineral tone-up sun milk for buyers whose customers ask for zinc-only filters. Soft pink cast that evens skin without reading as makeup.", actives: ["Zinc Oxide 18%", "Titanium Dioxide 4%", "Centella extract"], claims: ["SPF 50+ PA++++", "100% mineral", "Fragrance-free", "Pregnancy-safe"], inci: "Water, Zinc Oxide, Cyclopentasiloxane, Butylene Glycol, Titanium Dioxide, Glycerin, Centella Asiatica Extract, Iron Oxides…", certs: ["CPNP", "FDA OTC listed", "SPF in-vivo (KFDA)"], launched: 2021 },
  p05: { about: "Sooan's hero serum: six-year red ginseng, fermented 90 days. The bestselling anti-ageing SKU in the collection and a reliable anchor for prestige skincare counters.", actives: ["Fermented red ginseng 12%", "Adenosine", "Peptide complex 5"], claims: ["Clinically tested firmness (8 wk)", "Dermatologist tested", "Paraben-free"], inci: "Panax Ginseng Root Ferment Filtrate, Water, Glycerin, Butylene Glycol, 1,2-Hexanediol, Adenosine, Palmitoyl Tripeptide-5, Acetyl Hexapeptide-8…", certs: ["CPNP", "FDA listed", "Halal (KMF)", "ISO 22716"], launched: 2014 },
  p06: { about: "A dense eye cream built on the same ginseng ferment. Pairs with the serum as a gift set; retailers report strong attachment rates.", actives: ["Fermented red ginseng 8%", "Caffeine", "Retinyl palmitate"], claims: ["Ophthalmologist tested", "Fragrance-free", "Paraben-free"], inci: "Water, Panax Ginseng Root Ferment Filtrate, Glycerin, Shea Butter, Caffeine, Retinyl Palmitate, Adenosine, Tocopherol…", certs: ["CPNP", "FDA listed", "Halal (KMF)"], launched: 2016 },
  p07: { about: "A low-foam cleanser with Jeju volcanic clay. Sells well to sensitive-skin audiences who find clay cleansers too drying; the entry SKU for the Morae range.", actives: ["Jeju volcanic clay 3%", "Centella extract", "Amino acid surfactants"], claims: ["pH 5.5", "Sulfate-free", "Fragrance-free", "Vegan"], inci: "Water, Glycerin, Sodium Cocoyl Glycinate, Volcanic Ash, Centella Asiatica Extract, Sodium Lauroyl Glutamate, Betaine…", certs: ["CPNP", "Vegan Society", "EWG Verified"], launched: 2020 },
  p08: { about: "A fine-mist toner spray with Jeju mineral water. High margin, low weight, strong impulse purchase at counters and in subscription boxes.", actives: ["Jeju mineral water 92%", "Allantoin", "Madecassoside"], claims: ["Fragrance-free", "Alcohol-free", "Vegan", "Hypoallergenic tested"], inci: "Water, Glycerin, Butylene Glycol, Allantoin, Madecassoside, Sodium Hyaluronate, Panthenol…", certs: ["CPNP", "Vegan Society"], launched: 2021 },
  p09: { about: "Gyeol's treatment-room ampoule, formulated with a Busan aesthetics clinic. High-concentration peptides in a slip-free texture that works under devices and massage.", actives: ["Peptide complex 9 (5%)", "Copper tripeptide-1", "Hyaluronic acid"], claims: ["Professional-use tested", "Fragrance-free", "Paraben-free"], inci: "Water, Glycerin, Butylene Glycol, Palmitoyl Pentapeptide-4, Copper Tripeptide-1, Acetyl Hexapeptide-8, Sodium Hyaluronate…", certs: ["CPNP", "FDA listed", "ISO 22716"], launched: 2020 },
  p10: { about: "An overnight mask with hydrolysed collagen and ceramides. Positioned as the take-home step after a Gyeol facial; also moves well online.", actives: ["Hydrolysed collagen 3%", "Ceramide NP", "Niacinamide 2%"], claims: ["Fragrance-free", "Dermatologist tested", "Paraben-free"], inci: "Water, Glycerin, Hydrolyzed Collagen, Niacinamide, Butylene Glycol, Ceramide NP, Shea Butter, Adenosine…", certs: ["CPNP", "FDA listed"], launched: 2021 },
  p11: { about: "Rice ferment and 5% niacinamide for brightening. Ilmi's hero and the most-sampled hidden gem in the collection: competitive pricing, clean label, highly visual packaging.", actives: ["Rice ferment filtrate 60%", "Niacinamide 5%", "Alpha-arbutin 1%"], claims: ["Fragrance-free", "Vegan", "Cruelty-free", "Dermatologist tested"], inci: "Oryza Sativa (Rice) Ferment Filtrate, Water, Niacinamide, Glycerin, Butylene Glycol, Alpha-Arbutin, Sodium Hyaluronate…", certs: ["CPNP", "Vegan Society", "Leaping Bunny"], launched: 2022 },
  p12: { about: "A 5-sheet rice-water mask box. Low unit cost, low weight, excellent add-on SKU for baskets and marketplace bundles.", actives: ["Rice water 70%", "Hyaluronic acid", "Niacinamide 2%"], claims: ["Bamboo sheet", "Fragrance-free", "Vegan"], inci: "Oryza Sativa (Rice) Water, Glycerin, Butylene Glycol, Niacinamide, Sodium Hyaluronate, Trehalose…", certs: ["CPNP", "Vegan Society"], launched: 2025 },
  p13: { about: "A mung-bean cleansing oil that emulsifies fast and rinses clean. Nokdu's signature SKU; buyers pair it with the Green Clay Pack as a double-cleanse set.", actives: ["Mung bean extract", "Sunflower seed oil", "Jojoba oil"], claims: ["Non-comedogenic tested", "Fragrance-free", "Vegan"], inci: "Helianthus Annuus Seed Oil, Caprylic/Capric Triglyceride, Simmondsia Chinensis Seed Oil, Polysorbate 80, Phaseolus Radiatus Seed Extract…", certs: ["CPNP", "Vegan Society"], launched: 2020 },
  p14: { about: "A wash-off green clay pack for congested skin. Sold as a weekly treatment; strong in salon retail where staff can demonstrate.", actives: ["French green clay", "Mung bean extract", "Tea tree leaf water"], claims: ["Fragrance-free", "Vegan", "Dermatologist tested"], inci: "Water, Illite, Kaolin, Glycerin, Phaseolus Radiatus Seed Extract, Melaleuca Alternifolia Leaf Water, Bentonite…", certs: ["CPNP", "Vegan Society"], launched: 2021 },
  p15: { about: "The clinic shampoo that built Yeon Seoul. Scalp-pH balanced, silicone-free, tuned for hard-water markets. Reliable volume driver for salons and pharmacies.", actives: ["Salicylic acid 0.5%", "Biotin", "Panthenol", "Menthol"], claims: ["Silicone-free", "Sulfate-free", "pH 5.0", "Dermatologist tested"], inci: "Water, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Glycerin, Salicylic Acid, Biotin, Panthenol, Menthol…", certs: ["CPNP", "FDA listed", "ISO 22716"], launched: 2017 },
  p16: { about: "A leave-in protein serum for bleached and heat-damaged hair. High attachment rate with the shampoo; frequently bundled by salons.", actives: ["Hydrolysed keratin", "Hydrolysed silk", "Argan oil"], claims: ["Heat protection to 230°C", "Silicone-free", "Vegan"], inci: "Water, Glycerin, Hydrolyzed Keratin, Hydrolyzed Silk, Argania Spinosa Kernel Oil, Panthenol…", certs: ["CPNP", "Vegan Society"], launched: 2019 },
  p17: { about: "A hinoki-scented body wash in a 400 ml pump. Ondo's most photographed product: gift-ready packaging that holds its own on a concept-store shelf.", actives: ["Hinoki leaf oil", "Glycerin 8%", "Amino acid surfactants"], claims: ["Sulfate-free", "Vegan", "Recyclable PCR bottle"], inci: "Water, Sodium Cocoyl Glycinate, Glycerin, Cocamidopropyl Betaine, Chamaecyparis Obtusa Leaf Oil, Betaine…", certs: ["CPNP", "Vegan Society"], launched: 2022 },
  p18: { about: "A shea-based lotion with a dry-touch finish. Pairs with the body wash as a ritual set; strong in salon retail and gifting seasons.", actives: ["Shea butter 10%", "Squalane", "Ceramide NP"], claims: ["Dermatologist tested", "Vegan", "Recyclable PCR tube"], inci: "Water, Butyrospermum Parkii Butter, Glycerin, Squalane, Cetearyl Alcohol, Ceramide NP, Chamaecyparis Obtusa Leaf Oil…", certs: ["CPNP", "Vegan Society"], launched: 2023 },
  p19: { about: "Seorin's flagship cushion: a thin, skin-like finish in 12 shades. Cushions are a proven K-beauty category and this is the brand's largest volume SKU.", actives: ["Niacinamide 2%", "Hyaluronic acid", "SPF 40 PA++"], claims: ["12 shades", "SPF 40 PA++", "24-hour wear tested", "Refill available"], inci: "Water, Cyclopentasiloxane, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Niacinamide, Butylene Glycol, Iron Oxides…", certs: ["CPNP", "FDA OTC listed", "ISO 22716"], launched: 2016 },
  p20: { about: "A watery lip tint in 8 shades. Low price point, high rotation; the SKU most marketplace sellers lead with for Seorin.", actives: ["Hyaluronic acid", "Castor oil", "Vitamin E"], claims: ["8 shades", "Transfer-resistant", "Vegan"], inci: "Water, Glycerin, Butylene Glycol, Ricinus Communis Seed Oil, Sodium Hyaluronate, Tocopherol, Red 7 Lake…", certs: ["CPNP", "Vegan Society"], launched: 2020 },
  p21: { about: "Encapsulated retinal at 0.1% for first-time retinoid users. Dain Derm's launch product, developed with a Seoul dermatology clinic.", actives: ["Encapsulated retinal 0.1%", "Bakuchiol 1%", "Ceramide NP"], claims: ["Clinically tested (12 wk)", "Fragrance-free", "Dermatologist developed"], inci: "Water, Glycerin, Caprylic/Capric Triglyceride, Retinal, Bakuchiol, Ceramide NP, Squalane, Tocopherol…", certs: ["CPNP", "FDA listed", "ISO 22716"], launched: 2025 },
  p22: { about: "A bakuchiol night cream for sensitive, ageing skin. Retinol-alternative positioning sells well in clean-beauty retail and in pregnancy-safe sets.", actives: ["Bakuchiol 1%", "Peptide complex", "Shea butter"], claims: ["Pregnancy-safe", "Fragrance-free", "Vegan"], inci: "Water, Glycerin, Butyrospermum Parkii Butter, Bakuchiol, Squalane, Palmitoyl Tripeptide-1, Ceramide NP…", certs: ["CPNP", "FDA listed", "Vegan Society"], launched: 2022 },
  p23: { about: "A hanbang first-essence with 11 Korean botanicals. Pure Han's hero and a proven performer in Asian and Gulf prestige retail.", actives: ["Hanbang complex 11", "Ginseng berry", "Adenosine"], claims: ["Dermatologist tested", "Paraben-free", "Halal"], inci: "Water, Glycerin, Panax Ginseng Fruit Extract, Angelica Gigas Root Extract, Paeonia Lactiflora Root Extract, Adenosine…", certs: ["CPNP", "FDA listed", "Halal (KMF)", "ISO 22716"], launched: 2013 },
  p24: { about: "An organic-filter sun cream with ginseng extract. The anti-ageing sun positioning lets prestige retailers carry a sunscreen without discounting their counter.", actives: ["Ginseng extract", "Adenosine", "Uvinul A Plus"], claims: ["SPF 50 PA++++", "No white cast", "Paraben-free"], inci: "Water, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Panax Ginseng Root Extract, Adenosine…", certs: ["CPNP", "FDA OTC listed", "SPF in-vivo (KFDA)"], launched: 2018 },
};

/* ───────────── Logistics by category (overridable) ───────────── */

const PACK: Record<Category, Omit<Logistics, "readiness" | "leadWeeks" | "origin">> = {
  Skincare: { casePack: 12, cartonUnits: 72, cartonCm: "42 × 30 × 22", cartonKg: 7.4, shelfMonths: 36, paoMonths: 12, hsCode: "3304.99" },
  "Sun Care": { casePack: 12, cartonUnits: 96, cartonCm: "40 × 32 × 20", cartonKg: 7.9, shelfMonths: 30, paoMonths: 12, hsCode: "3304.99" },
  Cleansing: { casePack: 12, cartonUnits: 48, cartonCm: "44 × 32 × 24", cartonKg: 9.2, shelfMonths: 36, paoMonths: 12, hsCode: "3401.30" },
  Masks: { casePack: 10, cartonUnits: 60, cartonCm: "38 × 28 × 20", cartonKg: 5.1, shelfMonths: 36, paoMonths: 12, hsCode: "3304.99" },
  Haircare: { casePack: 12, cartonUnits: 36, cartonCm: "46 × 34 × 26", cartonKg: 13.8, shelfMonths: 36, paoMonths: 12, hsCode: "3305.10" },
  Body: { casePack: 8, cartonUnits: 32, cartonCm: "48 × 34 × 26", cartonKg: 15.2, shelfMonths: 36, paoMonths: 12, hsCode: "3401.30" },
  Makeup: { casePack: 24, cartonUnits: 144, cartonCm: "38 × 28 × 18", cartonKg: 6.4, shelfMonths: 30, paoMonths: 12, hsCode: "3304.20" },
};

const ORIGIN: Record<string, string> = { morae: "Jeju, Korea", gyeol: "Busan, Korea", nokdu: "Daegu, Korea", ilmi: "Gyeonggi, Korea" };

/* ───────────── Volume pricing ───────────── */

const r2 = (n: number) => Math.round(n * 100) / 100;

export function tiersFor(p: Product, b: Brand): Tier[] {
  const m = b.moq;
  return [
    { label: "Sample", minUnits: 1, unit: p.wholesale, off: 0 },
    { label: "Opening order", minUnits: m, unit: p.wholesale, off: 0 },
    { label: "Volume", minUnits: m * 3, unit: r2(p.wholesale * 0.94), off: 6 },
    { label: "Case volume", minUnits: m * 8, unit: r2(p.wholesale * 0.88), off: 12 },
    { label: "Distributor", minUnits: m * 20, unit: r2(p.wholesale * 0.82), off: 18 },
  ];
}

export function tierFor(tiers: Tier[], units: number): Tier {
  return [...tiers].reverse().find((t) => units >= t.minUnits) ?? tiers[0];
}

/* ───────────── Assemble ───────────── */

export function detailOf(p: Product): Detail {
  const b = brandById(p.brandId);
  const copy = COPY[p.id];
  const pack = PACK[p.category];
  const icon = b.tier === "icon";
  const idx = parseInt(p.id.slice(1), 10);
  return {
    ...copy,
    tiers: tiersFor(p, b),
    logistics: {
      ...pack,
      origin: ORIGIN[b.id] ?? "Seoul, Korea",
      readiness: icon ? "In stock · ships from Seoul warehouse" : "Made to order · small-batch production",
      leadWeeks: icon ? "1–2 weeks" : "3–4 weeks",
    },
    registered: b.docs,
    signals: {
      reorderRate: icon ? 68 + (idx % 5) * 3 : 54 + (idx % 6) * 4,
      firstOrder: b.moq * (icon ? 4 : 2) + (idx % 3) * b.moq,
      topChannels: b.channels.slice(0, 3).map(channelLabel),
    },
  };
}

export const channelLabel = (c: string) =>
  ({ distributor: "Distributors", online: "Online retail", marketplace: "Marketplaces", store: "Boutiques", salon: "Salons & spas" } as Record<string, string>)[c] ?? c;

/* ───────────── Buyer reviews ───────────── */

type Seed = Omit<Review, "id" | "productId">;

const POOL: Record<Category, Seed[]> = {
  Skincare: [
    { rating: 5, title: "Reordered three times in six months", text: "We opened with the MOQ to test and sold through in five weeks on our site. Repeat rate is the best in our K-beauty section. The brand's product imagery was ready in our format on day one, which saved our content team a full sprint.", buyer: "Online retailer", company: "Glasshouse Beauty", country: "United States", channel: "Online retail", units: 288, reorders: 3, date: "2026-08-14", tags: ["Sell-through", "Marketing assets"] },
    { rating: 4, title: "Margin holds even with promo", text: "Priced at MSRP we're at a 2.6× multiple, and we can still run 15% off without going below our floor. Only note: the outer box scuffs if cartons are stacked more than six high, so ask for the reinforced pack.", buyer: "Distributor", company: "Nordlys Trading", country: "Germany", channel: "Distributors", units: 960, reorders: 2, date: "2026-06-02", tags: ["Margin", "Packaging"] },
    { rating: 5, title: "Documentation was the easy part", text: "CPNP was already filed and the Responsible Person paperwork came with the proforma. Customs cleared in two days. For a first-time K-beauty import this was the smoothest line we've added.", buyer: "Pharmacy chain", company: "Apoteket Norr", country: "Sweden", channel: "Boutiques", units: 144, reorders: 1, date: "2026-04-21", tags: ["Documentation"] },
    { rating: 4, title: "Staff sell it once they've used it", text: "We ran the sample through our treatment rooms for two weeks before listing. Therapists asked for it by name afterwards, which is the only KPI that matters for retail in a spa.", buyer: "Salon & spa", company: "Studio Lumen", country: "Australia", channel: "Salons & spas", units: 48, reorders: 2, date: "2026-07-30", tags: ["Staff adoption"] },
  ],
  "Sun Care": [
    { rating: 5, title: "Our top sunscreen by units, two summers running", text: "The 'no white cast' claim actually holds for darker skin tones, which is what our customers test first. We moved from 96 to 480 units per order and lead time stayed at ten days.", buyer: "Online retailer", company: "Dewpoint", country: "United Kingdom", channel: "Online retail", units: 480, reorders: 4, date: "2026-07-11", tags: ["Sell-through", "Lead time"] },
    { rating: 4, title: "FDA listing made the difference", text: "We can't carry sunscreen without an OTC listing. Having it in place before we asked meant we launched in time for May instead of the following season.", buyer: "Distributor", company: "Pacific Coast Brands", country: "United States", channel: "Distributors", units: 1200, reorders: 2, date: "2026-05-19", tags: ["Documentation"] },
    { rating: 5, title: "Low weight, high margin, no returns", text: "Fifty-millilitre tubes ship cheaply and we have had zero leakage complaints across three orders. The ad co-funding covered our first paid campaign.", buyer: "Marketplace seller", company: "Seoul Shelf", country: "Canada", channel: "Marketplaces", units: 360, reorders: 3, date: "2026-08-28", tags: ["Margin", "Marketing assets"] },
  ],
  Cleansing: [
    { rating: 5, title: "Entry SKU that brings people into the range", text: "We lead with this at the lowest price point and customers come back for the rest of the line. Sell-through was 80% in the first eight weeks.", buyer: "Boutique", company: "Mille Skin Studio", country: "France", channel: "Boutiques", units: 72, reorders: 2, date: "2026-06-25", tags: ["Sell-through"] },
    { rating: 4, title: "Clean label is the whole pitch, and it works", text: "Sulfate-free and fragrance-free are the two filters our customers use most. This passes both and the price leaves room for a 2.8× multiple. Pump heads occasionally arrive loose, so check on receipt.", buyer: "Online retailer", company: "Honest Glow Co.", country: "United States", channel: "Online retail", units: 240, reorders: 3, date: "2026-08-03", tags: ["Margin", "Packaging"] },
    { rating: 5, title: "Marketplace listing converted from week one", text: "Imagery from the brand was already in white-background 1:1 format, so we listed the same day the pallet landed.", buyer: "Marketplace seller", company: "Kbeauty Direct", country: "Singapore", channel: "Marketplaces", units: 480, reorders: 2, date: "2026-05-08", tags: ["Marketing assets"] },
  ],
  Masks: [
    { rating: 5, title: "Perfect basket add-on", text: "Low unit cost, light to ship, and it lifts average order value when we bundle it with a serum. We now keep it permanently in the gift-with-purchase rotation.", buyer: "Online retailer", company: "Glasshouse Beauty", country: "United States", channel: "Online retail", units: 600, reorders: 4, date: "2026-07-19", tags: ["Sell-through", "Margin"] },
    { rating: 4, title: "Salon retail favourite", text: "Easy for therapists to recommend after a facial. We sell more of this than any other take-home product. Would love a 10-sheet box option.", buyer: "Salon & spa", company: "Haus of Calm", country: "United Kingdom", channel: "Salons & spas", units: 120, reorders: 2, date: "2026-04-30", tags: ["Staff adoption"] },
    { rating: 4, title: "Shelf life gives us breathing room", text: "Thirty-six months means we can order a full carton without worrying about rotation in our smaller stores.", buyer: "Pharmacy chain", company: "Farmacia Verde", country: "Spain", channel: "Boutiques", units: 240, reorders: 1, date: "2026-08-22", tags: ["Logistics"] },
  ],
  Haircare: [
    { rating: 5, title: "Backbar and retail in one SKU", text: "We use it in the basin and sell it at the front desk. The 300 ml size works for both. Staff training deck from the brand got our stylists talking about scalp pH within a week.", buyer: "Salon & spa", company: "Atelier Hair", country: "United States", channel: "Salons & spas", units: 96, reorders: 3, date: "2026-06-14", tags: ["Staff adoption", "Marketing assets"] },
    { rating: 4, title: "Heavy carton, plan freight accordingly", text: "Great product and very steady reorders, but at nearly 14 kg per carton you want this on a pallet, not parcel. Once we switched the landed cost dropped 11%.", buyer: "Distributor", company: "Maple Beauty Supply", country: "Canada", channel: "Distributors", units: 720, reorders: 2, date: "2026-07-27", tags: ["Logistics", "Margin"] },
    { rating: 5, title: "Hard-water markets respond", text: "Formulated with hard water in mind and our customers in the Midwest notice. Lowest return rate of any haircare line we carry.", buyer: "Online retailer", company: "Rootline", country: "United States", channel: "Online retail", units: 216, reorders: 2, date: "2026-05-02", tags: ["Sell-through"] },
  ],
  Body: [
    { rating: 5, title: "The packaging sells it before the scent does", text: "This sits on our front table and people pick it up for the bottle alone. We charge full MSRP and still see a 3× multiple. Gifting season doubled our order.", buyer: "Boutique", company: "Field & Form", country: "United States", channel: "Boutiques", units: 64, reorders: 3, date: "2026-08-09", tags: ["Margin", "Sell-through"] },
    { rating: 4, title: "Small MOQ made the test easy", text: "Six units to start meant we could put it on the shelf without a meeting. The lotion and wash together outsold the single SKU, so we'd suggest the set from day one.", buyer: "Salon & spa", company: "Onsen Day Spa", country: "Australia", channel: "Salons & spas", units: 32, reorders: 2, date: "2026-06-30", tags: ["MOQ"] },
    { rating: 4, title: "Lead time is the trade-off", text: "Made to order, so plan four weeks ahead. Worth it: nothing else in our body category moves at this price. Ask for the PCR packaging documentation if you need it for EU retail.", buyer: "Online retailer", company: "Slow Goods", country: "Netherlands", channel: "Online retail", units: 96, reorders: 1, date: "2026-04-12", tags: ["Lead time", "Documentation"] },
  ],
  Makeup: [
    { rating: 5, title: "Shade range is what closed the deal", text: "Twelve shades covers our customer base without gaps, and the brand shipped a tester set with the opening order. Cushion refills bring customers back every 6–8 weeks.", buyer: "Online retailer", company: "Tint Theory", country: "United States", channel: "Online retail", units: 432, reorders: 3, date: "2026-07-05", tags: ["Sell-through", "Marketing assets"] },
    { rating: 4, title: "Strong marketplace performer", text: "Pricing leaves room for marketplace fees and still returns a 2.4× multiple. Launch content from the brand performed well in paid social. Watch the carton count: 144 per master carton moves fast.", buyer: "Marketplace seller", company: "Seoul Shelf", country: "Canada", channel: "Marketplaces", units: 720, reorders: 2, date: "2026-08-18", tags: ["Margin"] },
    { rating: 5, title: "Zero quality issues across 2,000 units", text: "Consistency is what we need in colour. Three orders in and every batch matched the shade card. CPNP done, which is rare for Korean colour at this price.", buyer: "Distributor", company: "Lumière Distribution", country: "France", channel: "Distributors", units: 1440, reorders: 2, date: "2026-05-27", tags: ["Documentation", "Quality"] },
  ],
};

export function reviewsOf(p: Product): Review[] {
  const pool = POOL[p.category];
  const idx = parseInt(p.id.slice(1), 10);
  const n = p.badge === "Bestseller" ? pool.length : p.badge ? 2 : 2;
  const start = idx % pool.length;
  return Array.from({ length: Math.min(n, pool.length) }, (_, i) => {
    const seed = pool[(start + i) % pool.length];
    return { ...seed, id: `${p.id}-r${i + 1}`, productId: p.id };
  });
}

export function ratingSummary(rs: Review[]) {
  const avg = rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, count: rs.filter((r) => r.rating === n).length }));
  const reorders = rs.filter((r) => r.reorders > 1).length;
  return { avg, dist, reorders, count: rs.length };
}

/** Margin multiple for a given unit cost against MSRP (e.g. 2.65×). */
export const multiple = (msrp: number, unit: number) => msrp / unit;

export const detailById = (id: string) => detailOf(productById(id));
