import { COUNTRIES } from "@/lib/buyer";

export { CTA_TARGETS, CTA_FALLBACK, type CtaVariant } from "@/content/cta";

export const BUSINESS_TYPES = ["Retail store", "Online store", "Distributor", "Salon & spa", "Other"];

/** Focus markets first, then every other country the site already knows. */
const FOCUS = [
  { code: "MX", name: "Mexico" }, { code: "CO", name: "Colombia" }, { code: "PE", name: "Peru" }, { code: "CL", name: "Chile" },
  { code: "KZ", name: "Kazakhstan" }, { code: "UZ", name: "Uzbekistan" }, { code: "KG", name: "Kyrgyzstan" },
  { code: "AE", name: "United Arab Emirates" }, { code: "SA", name: "Saudi Arabia" }, { code: "QA", name: "Qatar" }, { code: "KW", name: "Kuwait" },
];
export const COUNTRY_GROUPS = [
  { label: "Focus markets", options: FOCUS },
  { label: "All countries", options: COUNTRIES.filter((c) => !FOCUS.some((f) => f.code === c.code) && c.code !== "KR") },
];
