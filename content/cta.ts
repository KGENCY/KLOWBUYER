import { CONTACT_HREF } from "./navigation";

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
