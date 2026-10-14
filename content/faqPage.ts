/**
 * Copy for the /faq hub. The questions themselves come only from content/faq.ts —
 * this page collects them and adds no questions of its own.
 */
import type { LocalizedText } from "@/types/content";

export const faqPage = {
  seo: {
    title: { en: "K-Beauty Wholesale FAQ | Samples, Shipping & Payment – KLOW" } as LocalizedText,
    description: {
      en: "Answers to common questions about buying K-beauty wholesale from KLOW: authenticity, samples from 1 unit, MOQ, shipping, duties and payment.",
    } as LocalizedText,
  },
  hero: {
    label: { en: "FAQ" } as LocalizedText,
    title: { en: "Questions buyers ask us." } as LocalizedText,
    body: { en: "Can’t find your answer? Our team replies within 24 hours." } as LocalizedText,
    searchLabel: { en: "Search questions" } as LocalizedText,
    searchPlaceholder: { en: "Search questions — e.g. DDP, MOQ, PayPal" } as LocalizedText,
    noMatches: { en: "No matches." } as LocalizedText,
    askTeam: { en: "Ask our team →" } as LocalizedText,
    resultsOne: { en: "1 matching question" } as LocalizedText,
    resultsMany: { en: "{n} matching questions" } as LocalizedText,
  },
  popular: {
    label: { en: "Popular questions" } as LocalizedText,
    readAnswer: { en: "Read the answer" } as LocalizedText,
  },
  /** Count above each category's heading. */
  countOne: { en: "1 question" } as LocalizedText,
  countMany: { en: "{n} questions" } as LocalizedText,
  /** "More about {label} →" under each category. */
  moreLabel: { en: "More about {label} →" } as LocalizedText,
  still: {
    title: { en: "Still have questions?" } as LocalizedText,
    body: { en: "Email, WhatsApp, or the form — whatever’s easiest." } as LocalizedText,
    formTitle: { en: "Ask our team" } as LocalizedText,
    formLede: { en: "Tell us what you need. We reply within 24 hours on business days." } as LocalizedText,
  },
  bottomCta: { en: "Ready to try? Sample from 1 unit." } as LocalizedText,
  related: [
    { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, company details" } },
    { key: "shipping", href: "/shipping", title: { en: "Shipping" }, description: { en: "Delivery times, Incoterms, documents" } },
    { key: "ordering", href: "/ordering-payment", title: { en: "Ordering & Payment" }, description: { en: "Samples, MOQ, payment methods" } },
  ] as { key: string; href: string; title: LocalizedText; description: LocalizedText }[],
};

/** Contact details shown on the hub (same placeholders as the About page). */
export const FAQ_CONTACT: { label: LocalizedText; value: LocalizedText }[] = [
  { label: { en: "Email" }, value: { en: "[EMAIL]" } },
  { label: { en: "WhatsApp" }, value: { en: "[NUMBER]" } },
  { label: { en: "Response time" }, value: { en: "Within 24 hours on business days (KST)" } },
];
