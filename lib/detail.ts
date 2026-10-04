import { Brand, Category, Product } from "./data";

/* ────────────────────────────────────────────────────────────────
   Product detail data for professional buyers.
   ──────────────────────────────────────────────────────────────── */

export interface Tier {
  minUnits: number;
  unit: number; // USD per unit
}

export interface Cert {
  code: string; // what is printed on the badge
  note: string; // what it means to a buyer
}

export interface Copy {
  about: string;
  actives: string[];
  claims: string[];
  use: string; // skin / hair type and how it is used
  inci: string;
  certs: string[];
  launched: number;
  shelfMonths: number;
}

export interface Review {
  id: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  business: string; // kind of business, e.g. "Online retailer"
  country: string;
  units: number; // verified order size
  date: string;
  orders: number; // how many orders this buyer has placed for the product
  photos: string[];
}

/* ───────────── Certifications: badge text + what it means ───────────── */

export const CERTS: Record<string, Cert> = {
  CPNP: { code: "CPNP", note: "EU notified" },
  "FDA listed": { code: "FDA", note: "US facility listed" },
  "FDA OTC": { code: "FDA OTC", note: "US sunscreen listing" },
  "SPF in-vivo": { code: "SPF", note: "In-vivo tested, KFDA" },
  Vegan: { code: "Vegan", note: "Vegan Society" },
  Halal: { code: "Halal", note: "KMF certified" },
  "EWG Verified": { code: "EWG", note: "EWG Verified" },
  "Leaping Bunny": { code: "Cruelty-free", note: "Leaping Bunny" },
  "ISO 22716": { code: "GMP", note: "ISO 22716" },
  "Derm tested": { code: "Derm", note: "Dermatologist tested" },
};

/* ───────────── Per-product copy ───────────── */

const COPY: Record<string, Copy> = {
  p01: { about: "A 5-ceramide moisturiser built for compromised barriers. Rich without occlusion, it is the product Haeum Lab is known for and the SKU most buyers lead with.", actives: ["Ceramide NP/AP/EOP 2%", "Panthenol 3%", "Madecassoside", "Squalane"], claims: ["Fragrance-free", "Non-comedogenic", "Vegan"], use: "Dry, sensitive and post-procedure skin. Final step, AM and PM.", inci: "Water, Glycerin, Squalane, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Panthenol, Ceramide NP, Ceramide AP, Ceramide EOP, Madecassoside, Cholesterol, Phytosphingosine…", certs: ["CPNP", "FDA listed", "Vegan", "Derm tested", "ISO 22716"], launched: 2017, shelfMonths: 36 },
  p02: { about: "A fluid, fast-absorbing toner with 5% panthenol. Positioned as the first step of a barrier routine and a natural pairing with the Barrier Cream.", actives: ["Panthenol 5%", "Beta-glucan", "Hyaluronic acid, 3 weights"], claims: ["Fragrance-free", "Alcohol-free", "pH 5.5"], use: "All skin types. First step after cleansing, or soaked into a cotton pad as a 5-minute mask.", inci: "Water, Panthenol, Butylene Glycol, Glycerin, Beta-Glucan, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Allantoin, Trehalose…", certs: ["CPNP", "FDA listed", "Vegan"], launched: 2018, shelfMonths: 36 },
  p03: { about: "The weightless chemical sunscreen that made Bom Studio a daily habit in Seoul. No white cast, no pilling under makeup, and a strong repeat-purchase profile at retail.", actives: ["Uvinul A Plus", "Tinosorb S", "Niacinamide 2%", "Centella extract"], claims: ["SPF 50+ PA++++", "No white cast", "Fragrance-free"], use: "All skin tones. Last skincare step, under makeup. Reapply every two hours outdoors.", inci: "Water, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Niacinamide, Centella Asiatica Extract…", certs: ["CPNP", "FDA OTC", "SPF in-vivo", "ISO 22716"], launched: 2019, shelfMonths: 30 },
  p04: { about: "A mineral tone-up sun milk for buyers whose customers ask for zinc-only filters. A soft pink cast that evens skin without reading as makeup.", actives: ["Zinc Oxide 18%", "Titanium Dioxide 4%", "Centella extract"], claims: ["SPF 50+ PA++++", "100% mineral", "Pregnancy-safe"], use: "Sensitive and reactive skin. Shake, then apply as the last step. Works as a light base.", inci: "Water, Zinc Oxide, Cyclopentasiloxane, Butylene Glycol, Titanium Dioxide, Glycerin, Centella Asiatica Extract, Iron Oxides…", certs: ["CPNP", "FDA OTC", "SPF in-vivo"], launched: 2021, shelfMonths: 30 },
  p05: { about: "Sooan's hero serum: six-year red ginseng, fermented for 90 days. The bestselling anti-ageing SKU in the collection and a reliable anchor for prestige skincare counters.", actives: ["Fermented red ginseng 12%", "Adenosine", "Peptide complex 5"], claims: ["Clinically tested firmness, 8 wk", "Paraben-free"], use: "Mature and dull skin. Two to three drops after toner, AM and PM.", inci: "Panax Ginseng Root Ferment Filtrate, Water, Glycerin, Butylene Glycol, 1,2-Hexanediol, Adenosine, Palmitoyl Tripeptide-5, Acetyl Hexapeptide-8…", certs: ["CPNP", "FDA listed", "Halal", "Derm tested", "ISO 22716"], launched: 2014, shelfMonths: 36 },
  p06: { about: "A dense eye cream built on the same ginseng ferment. Pairs with the serum as a gift set; retailers report strong attachment rates.", actives: ["Fermented red ginseng 8%", "Caffeine", "Retinyl palmitate"], claims: ["Ophthalmologist tested", "Fragrance-free"], use: "Fine lines and puffiness. A rice-grain amount around the orbital bone, PM.", inci: "Water, Panax Ginseng Root Ferment Filtrate, Glycerin, Shea Butter, Caffeine, Retinyl Palmitate, Adenosine, Tocopherol…", certs: ["CPNP", "FDA listed", "Halal"], launched: 2016, shelfMonths: 36 },
  p07: { about: "A low-foam cleanser with Jeju volcanic clay. Sells well to sensitive-skin audiences who find clay cleansers too drying; the entry SKU for the Morae range.", actives: ["Jeju volcanic clay 3%", "Centella extract", "Amino-acid surfactants"], claims: ["pH 5.5", "Sulfate-free", "Fragrance-free"], use: "Oily and sensitive skin. Morning and evening cleanse, or as the second step of a double cleanse.", inci: "Water, Glycerin, Sodium Cocoyl Glycinate, Volcanic Ash, Centella Asiatica Extract, Sodium Lauroyl Glutamate, Betaine…", certs: ["CPNP", "Vegan", "EWG Verified"], launched: 2020, shelfMonths: 36 },
  p08: { about: "A fine-mist toner spray with Jeju mineral water. High margin, low weight, strong impulse purchase at counters and in subscription boxes.", actives: ["Jeju mineral water 92%", "Allantoin", "Madecassoside"], claims: ["Fragrance-free", "Alcohol-free", "Hypoallergenic tested"], use: "All skin types. Mist over bare skin or makeup through the day.", inci: "Water, Glycerin, Butylene Glycol, Allantoin, Madecassoside, Sodium Hyaluronate, Panthenol…", certs: ["CPNP", "Vegan"], launched: 2021, shelfMonths: 36 },
  p09: { about: "Gyeol's treatment-room ampoule, formulated with a Busan aesthetics clinic. High-concentration peptides in a slip-free texture that works under devices and massage.", actives: ["Peptide complex 9, 5%", "Copper tripeptide-1", "Hyaluronic acid"], claims: ["Professional-use tested", "Fragrance-free"], use: "Loss of firmness. In-room under LED or microcurrent; at home, four drops PM.", inci: "Water, Glycerin, Butylene Glycol, Palmitoyl Pentapeptide-4, Copper Tripeptide-1, Acetyl Hexapeptide-8, Sodium Hyaluronate…", certs: ["CPNP", "FDA listed", "ISO 22716"], launched: 2020, shelfMonths: 36 },
  p10: { about: "An overnight mask with hydrolysed collagen and ceramides. Positioned as the take-home step after a Gyeol facial; also moves well online.", actives: ["Hydrolysed collagen 3%", "Ceramide NP", "Niacinamide 2%"], claims: ["Fragrance-free", "Paraben-free"], use: "Dehydrated skin. A thin layer as the last step, two to three nights a week.", inci: "Water, Glycerin, Hydrolyzed Collagen, Niacinamide, Butylene Glycol, Ceramide NP, Shea Butter, Adenosine…", certs: ["CPNP", "FDA listed", "Derm tested"], launched: 2021, shelfMonths: 36 },
  p11: { about: "Rice ferment and 5% niacinamide for brightening. Ilmi's hero and the most-sampled hidden gem in the collection: competitive pricing, a clean label and highly visual packaging.", actives: ["Rice ferment filtrate 60%", "Niacinamide 5%", "Alpha-arbutin 1%"], claims: ["Fragrance-free", "Cruelty-free"], use: "Uneven tone and dullness. After toner, AM and PM. Pairs with sunscreen.", inci: "Oryza Sativa (Rice) Ferment Filtrate, Water, Niacinamide, Glycerin, Butylene Glycol, Alpha-Arbutin, Sodium Hyaluronate…", certs: ["CPNP", "Vegan", "Leaping Bunny", "Derm tested"], launched: 2022, shelfMonths: 36 },
  p12: { about: "A 5-sheet rice-water mask box. Low unit cost, low weight, an excellent add-on SKU for baskets and marketplace bundles.", actives: ["Rice water 70%", "Hyaluronic acid", "Niacinamide 2%"], claims: ["Bamboo sheet", "Fragrance-free"], use: "All skin types. Fifteen minutes, two to three times a week.", inci: "Oryza Sativa (Rice) Water, Glycerin, Butylene Glycol, Niacinamide, Sodium Hyaluronate, Trehalose…", certs: ["CPNP", "Vegan"], launched: 2025, shelfMonths: 36 },
  p13: { about: "A mung-bean cleansing oil that emulsifies fast and rinses clean. Nokdu's signature SKU; buyers pair it with the Green Clay Pack as a double-cleanse set.", actives: ["Mung bean extract", "Sunflower seed oil", "Jojoba oil"], claims: ["Non-comedogenic tested", "Fragrance-free"], use: "All skin types, including acne-prone. First cleanse on dry skin, PM.", inci: "Helianthus Annuus Seed Oil, Caprylic/Capric Triglyceride, Simmondsia Chinensis Seed Oil, Polysorbate 80, Phaseolus Radiatus Seed Extract…", certs: ["CPNP", "Vegan"], launched: 2020, shelfMonths: 36 },
  p14: { about: "A wash-off green clay pack for congested skin. Sold as a weekly treatment; strong in salon retail where staff can demonstrate.", actives: ["French green clay", "Mung bean extract", "Tea tree leaf water"], claims: ["Fragrance-free", "Derm tested"], use: "Oily and congested skin. Ten minutes on damp skin, once or twice a week.", inci: "Water, Illite, Kaolin, Glycerin, Phaseolus Radiatus Seed Extract, Melaleuca Alternifolia Leaf Water, Bentonite…", certs: ["CPNP", "Vegan", "Derm tested"], launched: 2021, shelfMonths: 36 },
  p15: { about: "The clinic shampoo that built Yeon Seoul. Scalp-pH balanced, silicone-free, tuned for hard-water markets. A reliable volume driver for salons and pharmacies.", actives: ["Salicylic acid 0.5%", "Biotin", "Panthenol", "Menthol"], claims: ["Silicone-free", "Sulfate-free", "pH 5.0"], use: "Oily or flaking scalps. Daily. Doubles as a backbar shampoo.", inci: "Water, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Glycerin, Salicylic Acid, Biotin, Panthenol, Menthol…", certs: ["CPNP", "FDA listed", "Derm tested", "ISO 22716"], launched: 2017, shelfMonths: 36 },
  p16: { about: "A leave-in protein serum for bleached and heat-damaged hair. High attachment rate with the shampoo; frequently bundled by salons.", actives: ["Hydrolysed keratin", "Hydrolysed silk", "Argan oil"], claims: ["Heat protection to 230°C", "Silicone-free"], use: "Chemically treated hair. Two pumps on damp lengths before heat styling.", inci: "Water, Glycerin, Hydrolyzed Keratin, Hydrolyzed Silk, Argania Spinosa Kernel Oil, Panthenol…", certs: ["CPNP", "Vegan"], launched: 2019, shelfMonths: 36 },
  p17: { about: "A hinoki-scented body wash in a 400 ml pump. Ondo's most photographed product: gift-ready packaging that holds its own on a concept-store shelf.", actives: ["Hinoki leaf oil", "Glycerin 8%", "Amino-acid surfactants"], claims: ["Sulfate-free", "Recyclable PCR bottle"], use: "All skin types. Daily. The scent carries into the lotion.", inci: "Water, Sodium Cocoyl Glycinate, Glycerin, Cocamidopropyl Betaine, Chamaecyparis Obtusa Leaf Oil, Betaine…", certs: ["CPNP", "Vegan"], launched: 2022, shelfMonths: 36 },
  p18: { about: "A shea-based lotion with a dry-touch finish. Pairs with the body wash as a ritual set; strong in salon retail and gifting seasons.", actives: ["Shea butter 10%", "Squalane", "Ceramide NP"], claims: ["Derm tested", "Recyclable PCR tube"], use: "Dry skin. After showering, on damp skin.", inci: "Water, Butyrospermum Parkii Butter, Glycerin, Squalane, Cetearyl Alcohol, Ceramide NP, Chamaecyparis Obtusa Leaf Oil…", certs: ["CPNP", "Vegan", "Derm tested"], launched: 2023, shelfMonths: 36 },
  p19: { about: "Seorin's flagship cushion: a thin, skin-like finish in 12 shades. Cushions are a proven K-beauty category and this is the brand's largest-volume SKU.", actives: ["Niacinamide 2%", "Hyaluronic acid", "SPF 40 PA++"], claims: ["12 shades", "24-hour wear tested", "Refill available"], use: "All skin types. Press with the puff from the centre outward. Refill sold separately.", inci: "Water, Cyclopentasiloxane, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Niacinamide, Butylene Glycol, Iron Oxides…", certs: ["CPNP", "FDA OTC", "ISO 22716"], launched: 2016, shelfMonths: 30 },
  p20: { about: "A watery lip tint in 8 shades. Low price point, high rotation; the SKU most marketplace sellers lead with for Seorin.", actives: ["Hyaluronic acid", "Castor oil", "Vitamin E"], claims: ["8 shades", "Transfer-resistant"], use: "Build from the inner lip outward. Layers under balm or gloss.", inci: "Water, Glycerin, Butylene Glycol, Ricinus Communis Seed Oil, Sodium Hyaluronate, Tocopherol, Red 7 Lake…", certs: ["CPNP", "Vegan"], launched: 2020, shelfMonths: 30 },
  p21: { about: "Encapsulated retinal at 0.1% for first-time retinoid users. Dain Derm's launch product, developed with a Seoul dermatology clinic.", actives: ["Encapsulated retinal 0.1%", "Bakuchiol 1%", "Ceramide NP"], claims: ["Clinically tested, 12 wk", "Fragrance-free"], use: "Retinoid beginners. Two nights a week, building to nightly. Sunscreen in the morning.", inci: "Water, Glycerin, Caprylic/Capric Triglyceride, Retinal, Bakuchiol, Ceramide NP, Squalane, Tocopherol…", certs: ["CPNP", "FDA listed", "Derm tested", "ISO 22716"], launched: 2025, shelfMonths: 24 },
  p22: { about: "A bakuchiol night cream for sensitive, ageing skin. Retinol-alternative positioning sells well in clean-beauty retail and in pregnancy-safe sets.", actives: ["Bakuchiol 1%", "Peptide complex", "Shea butter"], claims: ["Pregnancy-safe", "Fragrance-free"], use: "Sensitive and mature skin. Last step, PM.", inci: "Water, Glycerin, Butyrospermum Parkii Butter, Bakuchiol, Squalane, Palmitoyl Tripeptide-1, Ceramide NP…", certs: ["CPNP", "FDA listed", "Vegan"], launched: 2022, shelfMonths: 36 },
  p23: { about: "A hanbang first-essence with 11 Korean botanicals. Pure Han's hero and a proven performer in Asian and Gulf prestige retail.", actives: ["Hanbang complex 11", "Ginseng berry", "Adenosine"], claims: ["Derm tested", "Paraben-free"], use: "Mature and dull skin. First step after cleansing, pressed in with palms.", inci: "Water, Glycerin, Panax Ginseng Fruit Extract, Angelica Gigas Root Extract, Paeonia Lactiflora Root Extract, Adenosine…", certs: ["CPNP", "FDA listed", "Halal", "Derm tested", "ISO 22716"], launched: 2013, shelfMonths: 36 },
  p24: { about: "An organic-filter sun cream with ginseng extract. The anti-ageing sun positioning lets prestige retailers carry a sunscreen without discounting their counter.", actives: ["Ginseng extract", "Adenosine", "Uvinul A Plus"], claims: ["SPF 50 PA++++", "No white cast", "Paraben-free"], use: "Mature skin. Last step, AM. Sits well under foundation.", inci: "Water, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Panax Ginseng Root Extract, Adenosine…", certs: ["CPNP", "FDA OTC", "SPF in-vivo"], launched: 2018, shelfMonths: 30 },
};

export const copyOf = (p: Product): Copy => COPY[p.id];
export const certsOf = (p: Product): Cert[] => COPY[p.id].certs.map((c) => CERTS[c]);

/* ───────────── Volume pricing ───────────── */

const r2 = (n: number) => Math.round(n * 100) / 100;

/** The sample price equals the opening-order price; the unit steps down from there. */
export function tiersFor(p: Product, b: Brand): Tier[] {
  const m = b.moq;
  return [
    { minUnits: 1, unit: p.wholesale },
    { minUnits: m, unit: p.wholesale },
    { minUnits: m * 3, unit: r2(p.wholesale * 0.94) },
    { minUnits: m * 8, unit: r2(p.wholesale * 0.88) },
    { minUnits: m * 20, unit: r2(p.wholesale * 0.82) },
  ];
}

export const tierIndexFor = (tiers: Tier[], units: number) => {
  let i = 0;
  tiers.forEach((t, k) => { if (units >= t.minUnits) i = k; });
  return i;
};

/* ───────────── Buyer reviews ───────────── */

type Seed = Omit<Review, "id" | "productId" | "photos"> & { photos?: string[] };

const POOL: Record<Category, Seed[]> = {
  Skincare: [
    { rating: 5, title: "Reordered three times in six months", text: "We opened with the MOQ to test and sold through in five weeks on our site. Repeat rate is the best in our K-beauty section, and the brand's imagery was ready in our format on day one.", business: "Online retailer", country: "United States", units: 288, orders: 4, date: "2026-08-14", photos: ["/img/brand-set.jpg", "/img/facial.jpg"] },
    { rating: 4, title: "Margin holds even with promo", text: "Priced at MSRP we're at a 2.6× multiple, and we can still run 15% off without going below our floor. The outer box scuffs if cartons are stacked more than six high, so ask for the reinforced pack.", business: "Distributor", country: "Germany", units: 960, orders: 2, date: "2026-06-02" },
    { rating: 5, title: "Documentation was the easy part", text: "CPNP was already filed and the Responsible Person paperwork came with the proforma. Customs cleared in two days. For a first-time K-beauty import this was the smoothest line we've added.", business: "Pharmacy chain", country: "Sweden", units: 144, orders: 1, date: "2026-04-21", photos: ["/img/brand-pink.jpg"] },
    { rating: 4, title: "Staff sell it once they've used it", text: "We ran the sample through our treatment rooms for two weeks before listing. Therapists asked for it by name afterwards, which is the only KPI that matters for retail in a spa.", business: "Spa & clinic", country: "Australia", units: 48, orders: 2, date: "2026-07-30", photos: ["/img/salon.jpg"] },
  ],
  "Sun Care": [
    { rating: 5, title: "Our top sunscreen by units, two summers running", text: "The no-white-cast claim actually holds for darker skin tones, which is what our customers test first. We moved from 96 to 480 units per order and lead time stayed at ten days.", business: "Online retailer", country: "United Kingdom", units: 480, orders: 5, date: "2026-07-11", photos: ["/img/brand-set.jpg"] },
    { rating: 4, title: "FDA listing made the difference", text: "We can't carry sunscreen without an OTC listing. Having it in place before we asked meant we launched in time for May instead of the following season.", business: "Distributor", country: "United States", units: 1200, orders: 2, date: "2026-05-19" },
    { rating: 5, title: "Low weight, high margin, no returns", text: "Fifty-millilitre tubes ship cheaply and we have had zero leakage complaints across three orders. The ad co-funding covered our first paid campaign.", business: "Marketplace seller", country: "Canada", units: 360, orders: 3, date: "2026-08-28", photos: ["/img/hero.jpg", "/img/dark.jpg"] },
  ],
  Cleansing: [
    { rating: 5, title: "The entry SKU that brings people into the range", text: "We lead with this at the lowest price point and customers come back for the rest of the line. Sell-through was 80% in the first eight weeks.", business: "Skin studio", country: "France", units: 72, orders: 2, date: "2026-06-25", photos: ["/img/facial.jpg"] },
    { rating: 4, title: "Clean label is the whole pitch, and it works", text: "Sulfate-free and fragrance-free are the two filters our customers use most. This passes both and the price leaves room for a 2.8× multiple. Pump heads occasionally arrive loose, so check on receipt.", business: "Online retailer", country: "United States", units: 240, orders: 1, date: "2026-08-03" },
    { rating: 5, title: "Listed the same day the pallet landed", text: "Imagery from the brand was already in white-background 1:1 format, so the marketplace listing went up immediately.", business: "Marketplace seller", country: "Singapore", units: 480, orders: 3, date: "2026-05-08", photos: ["/img/brand-set.jpg"] },
  ],
  Masks: [
    { rating: 5, title: "Perfect basket add-on", text: "Low unit cost, light to ship, and it lifts average order value when we bundle it with a serum. We now keep it permanently in the gift-with-purchase rotation.", business: "Online retailer", country: "United States", units: 600, orders: 4, date: "2026-07-19", photos: ["/img/brand-pink.jpg"] },
    { rating: 4, title: "Salon retail favourite", text: "Easy for therapists to recommend after a facial. We sell more of this than any other take-home product. Would love a 10-sheet box option.", business: "Spa & salon", country: "United Kingdom", units: 120, orders: 2, date: "2026-04-30", photos: ["/img/salon.jpg", "/img/facial.jpg"] },
    { rating: 4, title: "Shelf life gives us breathing room", text: "Thirty-six months means we can order a full carton without worrying about rotation in our smaller stores.", business: "Pharmacy chain", country: "Spain", units: 240, orders: 2, date: "2026-08-22" },
  ],
  Haircare: [
    { rating: 5, title: "Backbar and retail in one SKU", text: "We use it in the basin and sell it at the front desk. The 300 ml size works for both. The staff training deck got our stylists talking about scalp pH within a week.", business: "Hair salon", country: "United States", units: 96, orders: 3, date: "2026-06-14", photos: ["/img/salon.jpg"] },
    { rating: 4, title: "Heavy carton, plan freight accordingly", text: "Great product and very steady reorders, but at nearly 14 kg per carton you want this on a pallet, not parcel. Once we switched, the landed cost dropped 11%.", business: "Beauty supply distributor", country: "Canada", units: 720, orders: 4, date: "2026-07-27" },
    { rating: 5, title: "Hard-water markets respond", text: "Formulated with hard water in mind and our customers in the Midwest notice. Lowest return rate of any haircare line we carry.", business: "Online retailer", country: "United States", units: 216, orders: 2, date: "2026-05-02", photos: ["/img/dark.jpg"] },
  ],
  Body: [
    { rating: 5, title: "The packaging sells it before the scent does", text: "This sits on our front table and people pick it up for the bottle alone. We charge full MSRP and still see a 3× multiple. Gifting season doubled our order.", business: "Concept store", country: "United States", units: 64, orders: 2, date: "2026-08-09", photos: ["/img/brand-set.jpg", "/img/hero.jpg"] },
    { rating: 4, title: "Small MOQ made the test easy", text: "Six units to start meant we could put it on the shelf without a meeting. The lotion and wash together outsold the single SKU, so we'd suggest the set from day one.", business: "Day spa", country: "Australia", units: 32, orders: 1, date: "2026-06-30", photos: ["/img/salon.jpg"] },
    { rating: 4, title: "Lead time is the trade-off", text: "Made to order, so plan four weeks ahead. Worth it: nothing else in our body category moves at this price.", business: "Boutique retailer", country: "Netherlands", units: 96, orders: 1, date: "2026-04-12" },
  ],
  Makeup: [
    { rating: 5, title: "Shade range is what closed the deal", text: "Twelve shades covers our customer base without gaps, and the brand shipped a tester set with the opening order. Refills bring customers back every 6–8 weeks.", business: "Beauty retailer", country: "United States", units: 432, orders: 3, date: "2026-07-05", photos: ["/img/brand-makeup.jpg", "/img/lips.jpg"] },
    { rating: 4, title: "Strong marketplace performer", text: "Pricing leaves room for marketplace fees and still returns a 2.4× multiple. Launch content from the brand performed well in paid social.", business: "Marketplace seller", country: "Canada", units: 720, orders: 3, date: "2026-08-18" },
    { rating: 5, title: "Zero quality issues across 2,000 units", text: "Consistency is what we need in colour. Three orders in and every batch matched the shade card. CPNP done, which is rare for Korean colour at this price.", business: "Distributor", country: "France", units: 1440, orders: 3, date: "2026-05-27", photos: ["/img/lips.jpg"] },
  ],
};

export function reviewsOf(p: Product): Review[] {
  const pool = POOL[p.category];
  const idx = parseInt(p.id.slice(1), 10);
  const n = p.badge === "Bestseller" ? pool.length : 3;
  const start = idx % pool.length;
  return Array.from({ length: Math.min(n, pool.length) }, (_, i) => {
    const seed = pool[(start + i) % pool.length];
    // The first photo on a review is the product itself, as buyers tend to photograph what arrived.
    const photos = seed.photos ? [`/img/${p.id}.jpg`, ...seed.photos] : [];
    return { ...seed, photos, id: `${p.id}-r${i + 1}`, productId: p.id };
  });
}

