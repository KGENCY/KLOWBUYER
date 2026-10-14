import type { CtaLink } from "@/types/content";
import type { Localized } from "./i18n";

/**
 * Every FAQ on the site lives here, once. Pages pull their category with `faqsFor()`;
 * /faq shows them all. Values in [BRACKETS] are still to be confirmed.
 */

export type FaqCategory = "about" | "shipping" | "ordering";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: Localized;
  answer: Localized;
  order: number;
  enabled: boolean;
  /** Optional inline link at the end of the answer. Its ctaId is the action part; pages prefix it with [page]_faq_. */
  cta?: CtaLink;
}

export const FAQ_CATEGORIES: Record<FaqCategory, { label: Localized; href: string; more: Localized }> = {
  about: { label: { en: "About KLOW" }, href: "/about", more: { en: "More about KLOW →" } },
  shipping: { label: { en: "Shipping" }, href: "/shipping", more: { en: "More about shipping →" } },
  ordering: { label: { en: "Ordering & payment" }, href: "/ordering-payment", more: { en: "More about ordering & payment →" } },
};

export const FAQ_CATEGORY_ORDER: FaqCategory[] = ["about", "shipping", "ordering"];

const CONTACT = "/about#contact";

export const FAQS: FaqItem[] = [
  /* About */
  {
    id: "authentic",
    category: "about",
    order: 0,
    enabled: true,
    question: { en: "Are your products authentic?" },
    answer: {
      en: "Yes. Every product is supplied under a direct contract with the brand and inspected in our warehouse in Korea. We can send the brand’s confirmation of authentic supply on request.",
    },
    cta: { label: { en: "Ask for proof of supply →" }, href: CONTACT, ctaId: "authentic_inquiry" },
  },
  {
    id: "who",
    category: "about",
    order: 1,
    enabled: true,
    question: { en: "Who is behind KLOW?" },
    answer: {
      en: "KLOW is run by Welkit Inc. (주식회사 웰킷), a registered Korean company (business registration No. 634-81-04211) based in Gwanggyo, Suwon. We sign with brands directly and ship from our own warehouse in Korea.",
    },
  },
  {
    id: "small-buyers",
    category: "about",
    order: 2,
    enabled: true,
    question: { en: "Do you work with small buyers?" },
    answer: {
      en: "Yes. You can start with a single unit of any product at its wholesale price, and move to MOQ quantities once something sells. Many of our buyers are independent shops and new distributors.",
    },
    cta: { label: { en: "Browse & sample →" }, href: "/#collection", ctaId: "small_buyers_sample" },
  },
  /* Shipping */
  {
    id: "ship-to-country",
    category: "shipping",
    order: 0,
    enabled: true,
    question: { en: "Do you ship to my country?" },
    answer: {
      en: "We ship worldwide from Korea, with labels and documents prepared for Mexico & Latin America, Kazakhstan & Central Asia, and the UAE & GCC. Europe support is [coming soon]. Some categories are restricted in some markets — tell us where you are and we’ll confirm.",
    },
    cta: { label: { en: "Ask about your country →" }, href: "/shipping#quote", ctaId: "ship_to_country_quote" },
  },
  {
    id: "delivery-time",
    category: "shipping",
    order: 2,
    enabled: true,
    question: { en: "How long does delivery take?" },
    answer: {
      en: "Orders are packed in our Korean warehouse and dispatched within 2–7 days. Then express courier takes [x–x] days, air freight [x–x] days and sea freight [x–x] days, depending on your market.",
    },
  },
  {
    id: "customs-duties",
    category: "shipping",
    order: 1,
    enabled: true,
    question: { en: "Who pays customs and duties?" },
    answer: {
      en: "By default the buyer pays import duties and taxes on arrival. DDP — where we pay them up front and include them in your quote — is available on request for [MARKETS].",
    },
    cta: { label: { en: "Request a DDP quote →" }, href: "/shipping#quote", ctaId: "customs_duties_quote" },
  },

  {
    id: "own-forwarder",
    category: "shipping",
    order: 3,
    enabled: true,
    question: { en: "Can I use my own forwarder?" },
    answer: {
      en: "Yes. Choose EXW or FCA and your forwarder collects from our warehouse in Korea, or FOB and we deliver to the port of export. We prepare the export documents either way.",
    },
  },
  {
    id: "documents",
    category: "shipping",
    order: 4,
    enabled: true,
    question: { en: "What documents do you provide?" },
    answer: {
      en: "Every shipment comes with a commercial invoice, packing list and certificate of origin. On request we add ingredient lists, CoA, MSDS and a brand authenticity letter.",
    },
  },
  {
    id: "local-labels",
    category: "shipping",
    order: 5,
    enabled: true,
    question: { en: "Do you provide local-language labels?" },
    answer: {
      en: "Yes, in Spanish, Russian and Arabic. We print and apply them in our warehouse before dispatch, so stock arrives ready to sell. Other languages: [on request].",
    },
    cta: { label: { en: "Ask about labels for your market →" }, href: "/shipping#quote", ctaId: "local_labels_quote" },
  },

  /* Ordering & payment */
  {
    id: "minimum-order",
    category: "ordering",
    order: 0,
    enabled: true,
    question: { en: "Is there a minimum order?" },
    answer: {
      en: "Not for samples: order 1 unit of any product at its wholesale price. Wholesale reorders follow each product’s MOQ, from [MOQ] units.",
    },
    cta: { label: { en: "Browse & sample →" }, href: "/#collection", ctaId: "minimum_order_sample" },
  },
  {
    id: "free-shipping",
    category: "ordering",
    order: 1,
    enabled: true,
    question: { en: "When is shipping free?" },
    answer: {
      en: "Sample orders ship free once your box reaches 5 SKUs, mixed across any brands. Below that, sample shipping is a flat $18.",
    },
    cta: { label: { en: "Browse & sample →" }, href: "/#collection", ctaId: "free_shipping_sample" },
  },
  {
    id: "bulk-pricing",
    category: "ordering",
    order: 2,
    enabled: true,
    question: { en: "How do I see bulk prices?" },
    answer: {
      en: "Sample prices are public. MOQ and volume prices show once you sign in with a buyer account — it’s free and takes about two minutes.",
    },
    cta: { label: { en: "Create a buyer account →" }, href: "/signup", ctaId: "bulk_pricing_signup" },
  },
  {
    id: "payment-methods",
    category: "ordering",
    order: 3,
    enabled: true,
    question: { en: "How can I pay?" },
    answer: {
      en: "Sample orders are paid by card in USD (Visa, Mastercard, AMEX, JCB, UnionPay, PayPal, Alipay+). Wholesale orders are invoiced in USD and paid by [PAYMENT METHODS].",
    },
  },
  {
    id: "bulk-quote",
    category: "ordering",
    order: 4,
    enabled: true,
    question: { en: "Can I get a quote for a large order?" },
    answer: {
      en: "Yes. Send us the products and quantities you have in mind and we’ll reply within 24 hours on business days with prices, lead time and shipping to your market.",
    },
    cta: { label: { en: "Request bulk quote →" }, href: "/ordering-payment#quote", ctaId: "bulk_quote_quote" },
  },
];

export const faqsFor = (category: FaqCategory) =>
  FAQS.filter((f) => f.category === category && f.enabled).sort((a, b) => a.order - b.order);
