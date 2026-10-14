import { COUNTRIES } from "@/lib/buyer";
import { CONTACT_HREF } from "@/content/nav";

/**
 * Conversion priority across the site, highest first:
 * bulk quote > sample > sign-up > resource download > inquiry.
 */
export type CtaVariant = "quote" | "sample" | "signup" | "inquiry";

export const CTA_TARGETS: Record<CtaVariant, { label: string; href: string }> = {
  quote: { label: "Request bulk quote", href: "/ordering-payment#quote" },
  sample: { label: "Browse & sample", href: "/#collection" },
  signup: { label: "Create a buyer account", href: "/signup" },
  inquiry: { label: "Ask our team", href: CONTACT_HREF },
};

/** The text link offered next to each primary button: the next-best action. */
export const CTA_FALLBACK: Record<CtaVariant, CtaVariant> = {
  quote: "sample",
  sample: "quote",
  signup: "sample",
  inquiry: "quote",
};

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
