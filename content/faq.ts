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
    id: "reseller-or-distributor",
    category: "about",
    order: 1,
    enabled: true,
    question: { en: "Are you a reseller or a distributor?" },
    answer: {
      en: "Neither, in the usual sense. We contract directly with each brand, hold stock in our own warehouse in Korea and export to buyers abroad. Some brands are open to an exclusive distributor in your country.",
    },
    cta: { label: { en: "Ask about exclusivity →" }, href: CONTACT, ctaId: "reseller_or_distributor_inquiry" },
  },
  {
    id: "warehouse-location",
    category: "about",
    order: 2,
    enabled: true,
    question: { en: "Where is your warehouse?" },
    answer: {
      en: "In [CITY], Korea. Our office is in Gwanggyo, Suwon (Gyeonggi-do). Every order is picked, checked and packed in the warehouse before it’s exported.",
    },
  },
  {
    id: "countries",
    category: "about",
    order: 3,
    enabled: true,
    question: { en: "Which countries do you work with?" },
    answer: {
      en: "Buyers in [00] countries so far. We prepare documents and local-language labels for Mexico & Latin America, Kazakhstan & Central Asia and the UAE & GCC; Europe is [coming soon].",
    },
    cta: { label: { en: "See shipping details →" }, href: "/shipping", ctaId: "countries_shipping" },
  },
  {
    id: "visit-or-call",
    category: "about",
    order: 4,
    enabled: true,
    question: { en: "Can I visit or video-call your team?" },
    answer: {
      en: "Yes. Book a video call with our team, or visit our office in Gwanggyo, Suwon by appointment. Warehouse visits: [by arrangement].",
    },
    cta: { label: { en: "Book a call →" }, href: CONTACT, ctaId: "visit_or_call_inquiry" },
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
      en: "Orders leave our warehouse within 2–7 days. Express courier then takes [3–10] business days, air freight [5–14] and sea freight [20–45], depending on your country and customs.",
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
    question: { en: "Can I use my own forwarder or courier account?" },
    answer: {
      en: "Yes. Choose EXW and your forwarder collects from our warehouse, or FCA and we clear export and hand over to your carrier or courier account. We prepare the export documents either way.",
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
    category: "shipping",
    order: 6,
    enabled: true,
    question: { en: "Is shipping free for samples?" },
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
