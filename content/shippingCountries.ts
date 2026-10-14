/**
 * Per-country shipping summaries for the "Where are you shipping to?" picker on /shipping.
 * Kept separate so the Guides country pages can reuse the same records later.
 * Every number and regulatory line is a placeholder until confirmed.
 */
import type { LocalizedText } from "@/types/content";

export type LabelSupport = "supported" | "not-needed" | "contact";
export type Difficulty = "easy" | "moderate" | "complex";

export interface ShippingCountry {
  /** ISO code, or "OTHER" for the catch-all entry (which shows an inquiry form instead of a summary). */
  code: string;
  name: LocalizedText;
  recommendedMethod: LocalizedText;
  deliveryDays: LocalizedText;
  labelSupport: LabelSupport;
  /** Label language when supported, e.g. Spanish. */
  labelLanguage?: LocalizedText;
  /** One line on the local registration the importer needs. */
  registrationSummary: LocalizedText;
  /** How much paperwork to expect. Not shown for "OTHER". */
  difficulty?: Difficulty;
  /** /guides/import/[guideSlug], when that guide exists. */
  guideSlug?: string;
  enabled: boolean;
  order: number;
}

export const LABEL_SUPPORT_TEXT: Record<LabelSupport, LocalizedText> = {
  supported: { en: "Supported" },
  "not-needed": { en: "Not needed" },
  contact: { en: "Contact us" },
};

export const DIFFICULTY_TEXT: Record<Difficulty, LocalizedText> = {
  easy: { en: "Easy" },
  moderate: { en: "Moderate" },
  complex: { en: "Complex" },
};

export const SHIPPING_COUNTRIES: ShippingCountry[] = [
  {
    code: "MX",
    name: { en: "Mexico" },
    recommendedMethod: { en: "Air freight for wholesale · express courier for samples" },
    deliveryDays: { en: "[x–x] business days" },
    labelSupport: "supported",
    labelLanguage: { en: "Spanish" },
    registrationSummary: { en: "COFEPRIS-compliant Spanish labelling; importer registered for imports [to confirm]" },
    difficulty: "moderate",
    guideSlug: "mexico",
    enabled: true,
    order: 0,
  },
  {
    code: "KZ",
    name: { en: "Kazakhstan" },
    recommendedMethod: { en: "Air freight · express courier for samples" },
    deliveryDays: { en: "[x–x] business days" },
    labelSupport: "supported",
    labelLanguage: { en: "Russian" },
    registrationSummary: { en: "EAEU declaration of conformity (EAC) for cosmetics [to confirm]" },
    difficulty: "complex",
    guideSlug: "kazakhstan",
    enabled: true,
    order: 1,
  },
  {
    code: "AE",
    name: { en: "UAE" },
    recommendedMethod: { en: "Air freight · express courier for samples" },
    deliveryDays: { en: "[x–x] business days" },
    labelSupport: "supported",
    labelLanguage: { en: "Arabic" },
    registrationSummary: { en: "Products registered with the local municipality before sale [to confirm]" },
    difficulty: "moderate",
    guideSlug: "uae",
    enabled: true,
    order: 2,
  },
  {
    code: "CO",
    name: { en: "Colombia" },
    recommendedMethod: { en: "Air freight · sea freight for large orders" },
    deliveryDays: { en: "[x–x] business days" },
    labelSupport: "supported",
    labelLanguage: { en: "Spanish" },
    registrationSummary: { en: "INVIMA cosmetic notification (NSO) before import [to confirm]" },
    difficulty: "moderate",
    guideSlug: "colombia",
    enabled: true,
    order: 3,
  },
  {
    code: "OTHER",
    name: { en: "Other" },
    recommendedMethod: { en: "Express courier or air freight, depending on volume" },
    deliveryDays: { en: "[x–x] business days" },
    labelSupport: "contact",
    registrationSummary: { en: "Tell us your market and we’ll check what’s needed" },
    enabled: true,
    order: 99,
  },
];

export const shippingCountries = () => SHIPPING_COUNTRIES.filter((c) => c.enabled).sort((a, b) => a.order - b.order);
