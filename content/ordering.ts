/**
 * /ordering-payment content, same section schema as /about (content/sections.ts).
 * Values in [BRACKETS] are placeholders still to be confirmed.
 */
import type { AboutPage } from "./sections";

export const ordering: AboutPage = {
  ctaPrefix: "ordering",
  seo: {
    title: { en: "Ordering & Payment | KLOW Wholesale — Sample from 1 unit, reorder at MOQ" },
    description: {
      en: "How to order K-beauty wholesale from KLOW: sample any product from 1 unit, reorder at MOQ prices, request a bulk quote, and pay securely in USD.",
    },
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "Ordering & payment" },
      title: { en: "Sample first. Reorder at MOQ." },
      subtitle: { en: "Quote anything bigger." },
      body: {
        en: "Start with a single unit of any product at its wholesale price. When something sells, reorder at MOQ for less — or send us a list and we’ll quote the whole order within 24 hours.",
      },
      links: [
        { label: { en: "Request bulk quote" }, href: "#quote", variant: "primary", ctaId: "ordering_hero_quote" },
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "secondary", ctaId: "ordering_hero_sample" },
      ],
    },
    {
      id: "how",
      type: "steps",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "How ordering works" },
      title: { en: "Three ways to buy." },
      items: [
        { title: { en: "Sample from 1 unit" }, description: { en: "Any product, one unit, at its wholesale price. Paid by card at checkout." } },
        { title: { en: "Free shipping at 5 SKUs" }, description: { en: "Mix any five products across brands and sample shipping is on us." } },
        { title: { en: "Reorder at MOQ" }, description: { en: "Each product’s MOQ unlocks a lower unit price, and volume tiers go lower again." } },
        { title: { en: "Bulk quote" }, description: { en: "For larger or mixed orders: prices, lead time and landed cost in one reply." } },
      ],
    },
    {
      id: "pricing",
      type: "pricing",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "Pricing" },
      title: { en: "Sample prices are public." },
      subtitle: { en: "Bulk prices are for buyers." },
      body: {
        en: "Anyone can see what a single sample costs. MOQ and volume prices show once you sign in with a free buyer account, so we can keep them fair for the brands and for you.",
      },
      items: [{ key: "p01", title: { en: "Example product" } }],
      addons: [
        { type: "contextCta", variant: "signup", text: { en: "A free buyer account shows MOQ and volume prices on every product." }, ctaId: "ordering_pricing" },
        {
          type: "leadMagnets",
          title: { en: "Prefer a spreadsheet?" },
          ids: ["wholesale-price-list", "brand-catalog"],
          ctaPrefix: "ordering_pricing_lead",
        },
      ],
    },
    {
      id: "payment",
      type: "facts",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "Payment" },
      title: { en: "How you pay." },
      items: [
        { key: "currency", title: { en: "Currency" }, value: { en: "USD" } },
        { key: "samples", title: { en: "Sample orders" }, value: { en: "Card at checkout via Eximbay — Visa, Mastercard, AMEX, JCB, UnionPay, PayPal, Alipay+" } },
        { key: "charged", title: { en: "When you’re charged" }, value: { en: "Only after every brand in your order confirms stock" } },
        { key: "wholesale", title: { en: "Wholesale orders" }, value: { en: "Invoiced in USD · [PAYMENT METHODS]" } },
        { key: "terms", title: { en: "Payment terms" }, value: { en: "[DEPOSIT / BALANCE TERMS]" } },
      ],
    },
    {
      id: "quote",
      type: "inquiry",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Bulk quote" },
      title: { en: "Request a bulk quote." },
      body: { en: "Tell us where you sell and we’ll reply within 24 hours on business days with:" },
      items: [
        { title: { en: "Unit prices at your quantities" } },
        { title: { en: "Lead time from our warehouse in Korea" } },
        { title: { en: "Shipping to your market — and DDP on request" } },
        { title: { en: "The documents and labels your market needs" } },
      ],
      addons: [
        {
          type: "inquiryForm",
          anchor: "quote-form",
          ctaId: "ordering_quote_form",
          title: { en: "Request bulk quote" },
          lede: { en: "Three fields to start. We’ll ask for products and quantities in our reply." },
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 5,
      number: "05",
      label: { en: "FAQ" },
      title: { en: "Ordering questions." },
      faqCategory: "ordering",
    },
    {
      id: "start",
      type: "cta",
      enabled: true,
      order: 6,
      title: { en: "Start with one unit." },
      links: [
        { label: { en: "Browse & sample" }, href: "/#collection", variant: "primary", ctaId: "ordering_final_sample" },
        { label: { en: "Create a buyer account" }, href: "/signup", variant: "secondary", ctaId: "ordering_final_signup" },
      ],
    },
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 7,
      label: { en: "Keep reading" },
      items: [
        { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, and how we source directly from brands." } },
        { key: "shipping", href: "/shipping", title: { en: "Shipping" }, description: { en: "Free at 5 SKUs, dispatch times, duties and the documents that travel with your order." } },
      ],
    },
  ],
};
