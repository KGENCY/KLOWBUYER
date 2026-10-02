import { BRANDS, Brand, BuyerType, Line, Priority, Purpose, Region } from "./data";

export interface Answers {
  type?: BuyerType;
  region?: Region;
  purpose?: Purpose;
  lines?: Line[];
  priorities?: Priority[];
}

export interface Option<V extends string = string> {
  value: V;
  label: string;
  note?: string;
}

export interface Step {
  key: keyof Answers;
  question: string;
  hint?: string;
  max?: number; // multi-select when set
  options: Option[];
}

export const STEPS: Step[] = [
  {
    key: "type",
    question: "What best describes your business?",
    options: [
      { value: "distributor", label: "Distributor / Wholesaler", note: "Supplying retailers in your market" },
      { value: "online", label: "Online retailer", note: "Your own e-commerce store" },
      { value: "marketplace", label: "Marketplace seller", note: "Amazon, TikTok Shop, Shopee" },
      { value: "store", label: "Beauty store", note: "Boutique or multi-brand shop" },
      { value: "salon", label: "Salon, spa or clinic", note: "Treatment and retail" },
    ],
  },
  {
    key: "region",
    question: "Which market do you sell into?",
    hint: "We check that each brand already has the documentation your market requires.",
    options: [
      { value: "us", label: "United States", note: "FDA · MoCRA" },
      { value: "ca", label: "Canada", note: "Health Canada" },
      { value: "uk", label: "United Kingdom", note: "SCPN" },
      { value: "eu", label: "European Union", note: "CPNP" },
      { value: "gcc", label: "Middle East", note: "GCC · Halal" },
      { value: "sea", label: "Southeast Asia", note: "ASEAN notification" },
      { value: "au", label: "Australia / NZ", note: "AICIS" },
      { value: "latam", label: "Latin America", note: "ANVISA · COFEPRIS" },
    ],
  },
  {
    key: "purpose",
    question: "What are you sourcing for right now?",
    options: [
      { value: "test", label: "Testing the waters", note: "Small first orders, low risk" },
      { value: "proven", label: "Adding proven sellers", note: "Brands with demand already built" },
      { value: "discover", label: "Discovering hidden gems", note: "Before they reach your competitors" },
      { value: "expand", label: "Expanding a category", note: "Filling a gap in your line-up" },
      { value: "distribute", label: "Finding a brand to represent", note: "Exclusive or lead distribution" },
    ],
  },
  {
    key: "lines",
    question: "Which lines are you building?",
    hint: "Choose up to three.",
    max: 3,
    options: [
      { value: "icons", label: "K-Beauty icons" },
      { value: "gems", label: "Hidden gems" },
      { value: "antiaging", label: "Anti-ageing" },
      { value: "hydration", label: "Hydration & barrier" },
      { value: "sun", label: "Sun care" },
      { value: "sensitive", label: "Sensitive & acne" },
      { value: "brightening", label: "Brightening" },
      { value: "hair", label: "Hair & scalp" },
      { value: "body", label: "Body" },
      { value: "makeup", label: "Makeup" },
    ],
  },
  {
    key: "priorities",
    question: "What matters most in a brand partner?",
    hint: "Choose up to two.",
    max: 2,
    options: [
      { value: "moq", label: "Low starting quantity", note: "Small reorders after sampling" },
      { value: "margin", label: "Strong retail margin", note: "3× or more on MSRP" },
      { value: "exclusive", label: "Exclusivity potential", note: "Territory rights available" },
      { value: "supply", label: "Fast, reliable supply", note: "Ships from Korea in days" },
      { value: "docs", label: "Market-ready documents", note: "Registrations and CoA in place" },
    ],
  },
];

export const ACKS: Partial<Record<keyof Answers, (a: Answers) => string>> = {
  type: (a) =>
    ({
      distributor: "Good — we'll weigh brands open to territory partners.",
      online: "Noted. We'll favour brands with strong content and imagery.",
      marketplace: "Noted. We'll favour brands with marketplace-ready listings.",
      store: "Lovely. We'll look for brands that sell well on a shelf.",
      salon: "Noted. We'll include professional and back-bar formats.",
    })[a.type!] ?? "",
  region: () => "Thank you. Compliance is checked for that market.",
  purpose: () => "Understood.",
  lines: () => "Almost there.",
};

export const labelFor = (key: keyof Answers, value: string) =>
  STEPS.find((s) => s.key === key)?.options.find((o) => o.value === value)?.label ?? value;

export interface Match {
  brand: Brand;
  score: number;
  reasons: string[];
}

const REGION_NAME: Record<Region, string> = {
  us: "the US", ca: "Canada", uk: "the UK", eu: "the EU", gcc: "the GCC", sea: "Southeast Asia", au: "Australia", latam: "Latin America",
};

export function matchBrands(a: Answers): Match[] {
  const lines = a.lines ?? [];
  const pr = a.priorities ?? [];

  return BRANDS.map((b) => {
    let s = 52;
    const why: string[] = [];
    const docsOk = a.region ? b.docs.includes(a.region) : false;
    const excl = a.region ? b.exclusiveOpen.includes(a.region) : false;

    if (a.type && b.channels.includes(a.type)) s += 8;

    const overlap = lines.filter((l) => b.lines.includes(l));
    s += overlap.length * 7;
    if (overlap.length) why.push(`Fits your ${overlap.map((l) => labelFor("lines", l).toLowerCase()).join(" & ")} line`);

    if (a.region) {
      if (docsOk) { s += 6; why.push(`Registered and ready to sell in ${REGION_NAME[a.region]}`); }
      else s -= 10;
    }

    switch (a.purpose) {
      case "test": if (b.moq <= 24) { s += 8; why.push(`Reorder from just ${b.moq} units per SKU`); } break;
      case "proven": if (b.tier === "icon") { s += 10; why.push("Established demand in Korea and abroad"); } break;
      case "discover": if (b.tier === "gem") { s += 10; why.push("Rarely stocked outside Korea"); } break;
      case "expand": s += overlap.length * 3; break;
      case "distribute": if (excl) { s += 12; why.push(`Seeking an exclusive partner in ${REGION_NAME[a.region!]}`); } break;
    }

    if (pr.includes("moq") && b.moq <= 24) { s += 6; if (a.purpose !== "test") why.push(`Reorder from ${b.moq} units per SKU`); }
    if (pr.includes("margin") && b.margin >= 2.8) { s += 6; why.push(`${b.margin.toFixed(1)}× average retail margin`); }
    if (pr.includes("exclusive") && excl) { s += 6; if (a.purpose !== "distribute") why.push("Territory exclusivity available"); }
    if (pr.includes("supply") && b.leadDays <= 4) { s += 6; why.push(`Dispatches within ${b.leadDays} days`); }
    if (pr.includes("docs") && docsOk) s += 4;

    return { brand: b, score: Math.max(40, Math.min(98, s)), reasons: Array.from(new Set(why)).slice(0, 3) };
  }).sort((x, y) => y.score - x.score);
}
