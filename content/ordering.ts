/**
 * /ordering-payment content, same section schema as /about (content/sections.ts).
 * Order rules (MOA, payment terms, cancellation…) come from content/orderPolicy.ts.
 * Values in [BRACKETS] are placeholders still to be confirmed.
 */
import type { AboutPage } from "./sections";
import { ORDER_POLICY as P } from "./orderPolicy";

export const ordering: AboutPage = {
  ctaPrefix: "ordering",
  seo: {
    title: { en: "How to Order K-Beauty Wholesale: MOQ, Samples & Payment | KLOW" },
    description: {
      en: `Sample any partner-brand K-beauty product from 1 unit at $${P.samplePrice}, then reorder what sells at MOQ. Pay by card, PayPal or bank transfer. Clear terms from Korea.`,
    },
  },
  sections: [
    /* ───── Hero ───── */
    {
      id: "hero",
      type: "hero",
      enabled: true,
      order: 0,
      label: { en: "Ordering & payment" },
      title: { en: "Start with one unit." },
      subtitle: { en: "Scale when it sells." },
      body: { en: `Every sample $${P.samplePrice}, then reorder what sells at MOQ. Clear terms, no surprises.` },
      links: [
        { label: { en: "Pick your samples" }, href: "/samples", variant: "primary", ctaId: "ordering_hero_sample" },
        { label: { en: "Request bulk quote" }, href: "#quote", variant: "secondary", ctaId: "ordering_hero_quote" },
      ],
    },

    /* ───── 01 Three ways to order ───── */
    {
      id: "ways",
      type: "orderWays",
      enabled: true,
      order: 1,
      number: "01",
      label: { en: "Three ways to order" },
      title: { en: "Pick the way that fits your order." },
      previewToggle: { en: "Preview as signed-in buyer" },
      ways: [
        {
          key: "sample",
          name: { en: "Sample" },
          tag: { en: `from ${P.sampleMinUnits} unit` },
          rows: [
            { label: { en: "For" }, value: { en: "Testing products before you commit" } },
            { label: { en: "How" }, value: { en: "Add to sample box → pay online" } },
            { label: { en: "Payment" }, value: { en: "Card or PayPal" } },
            { label: { en: "Shipping" }, value: { en: `Free at ${P.freeShippingSkus}+ SKUs` } },
          ],
          price: { sample: "$[__]", moq: "$[__]", moqUnits: "[__]" },
          cta: { label: { en: "Start a sample box" }, href: "/samples", ctaId: "ordering_ways_sample" },
        },
        {
          key: "wholesale",
          name: { en: "Wholesale" },
          tag: { en: `MOA ${P.wholesaleMOA}+` },
          highlight: { en: "Most buyers" },
          rows: [
            { label: { en: "For" }, value: { en: "Stores and online shops restocking" } },
            { label: { en: "How" }, value: { en: "Request a quote → we send a Proforma Invoice (PI) → pay → ship" } },
            { label: { en: "Payment" }, value: { en: `Bank transfer (T/T), PayPal up to ${P.paypalLimit}` } },
            { label: { en: "Shipping" }, value: { en: "Express or your own carrier" } },
          ],
          cta: { label: { en: "Create a buyer account" }, href: "/signup", ctaId: "ordering_ways_signup" },
        },
        {
          key: "bulk",
          name: { en: "Bulk & container" },
          tag: { en: "1:1 terms" },
          rows: [
            { label: { en: "For" }, value: { en: "Distributors and importers" } },
            { label: { en: "How" }, value: { en: "1:1 terms with our team" } },
            { label: { en: "Payment" }, value: { en: "T/T, L/C on request" } },
            { label: { en: "Shipping" }, value: { en: "FOB, CIF or DDP" } },
          ],
          cta: { label: { en: "Request bulk quote" }, href: "#quote", ctaId: "ordering_ways_quote" },
        },
      ],
    },

    /* ───── 02 How an order works ───── */
    {
      id: "process",
      type: "steps",
      enabled: true,
      order: 2,
      number: "02",
      label: { en: "How an order works" },
      title: { en: "From box to boarding." },
      // value = how long the step takes
      items: [
        { title: { en: "Add to box or request a quote" }, description: { en: "Samples go in your box; larger orders start with a quote." }, value: { en: "[Same day]" } },
        { title: { en: "We confirm stock & terms" }, description: { en: "Each brand confirms availability and lead time." }, value: { en: "[1–3 business days]" } },
        { title: { en: "Proforma Invoice (PI)" }, description: { en: "Products, prices, shipping and our bank details." }, value: { en: "[1 business day]" } },
        { title: { en: "Payment" }, description: { en: "Card, PayPal or bank transfer, by the PI." }, value: { en: "[1–5 business days]" } },
        { title: { en: "Inspection & packing" }, description: { en: "Checked for expiry and condition, then packed." }, value: { en: "[2–7 days]" } },
        { title: { en: "Shipped with documents" }, description: { en: "Invoice, packing list and C/O travel with it." }, value: { en: "[x–x days in transit]" } },
      ],
      links: [{ label: { en: "See shipping options →" }, href: "/shipping", variant: "secondary", ctaId: "ordering_process_shipping" }],
    },

    /* ───── 03 Payment methods ───── */
    {
      id: "payment-methods",
      type: "table",
      enabled: true,
      order: 3,
      number: "03",
      label: { en: "Payment methods" },
      title: { en: "How you can pay." },
      table: {
        columns: [{ en: "Method" }, { en: "Available for" }, { en: "Notes" }],
        rows: [
          { key: "card", cells: [{ en: "Card & PayPal" }, { en: "Samples, small wholesale" }, { en: "PayPal fees may apply [__]" }] },
          { key: "tt", cells: [{ en: "Bank transfer (T/T)" }, { en: "Wholesale, bulk" }, { en: "Choose OUR so the full amount arrives" }] },
          { key: "lc", cells: [{ en: "Letter of Credit (L/C)" }, { en: "Large bulk orders" }, { en: "By agreement" }] },
        ],
      },
      callout: {
        icon: "lock",
        text: {
          en: "Our bank details appear only on your Proforma Invoice. We will never ask you by email to pay a different account. If you receive such a message, contact us before paying.",
        },
      },
    },

    /* ───── 04 Payment terms ───── */
    {
      id: "payment-terms",
      type: "facts",
      enabled: true,
      order: 4,
      number: "04",
      label: { en: "Payment terms" },
      title: { en: "Clear terms, no surprises." },
      items: [
        { key: "currency", title: { en: "Currency" }, value: { en: P.currency } },
        { key: "first", title: { en: "First order" }, value: { en: P.firstOrderTerms } },
        { key: "repeat", title: { en: "Repeat buyers" }, value: { en: P.repeatBuyerTerms } },
        { key: "fees", title: { en: "Bank fees" }, value: { en: "Paid by the buyer (OUR)" } },
        { key: "confirmation", title: { en: "Payment confirmation" }, value: { en: "Send your remittance slip to speed things up" } },
      ],
    },

    /* ───── 05 Changes, cancellations & refunds ───── */
    {
      id: "changes",
      type: "facts",
      enabled: true,
      order: 5,
      number: "05",
      label: { en: "Changes, cancellations & refunds" },
      title: { en: "If plans change." },
      items: [
        { key: "change", title: { en: "Change or cancel" }, value: { en: `Within ${P.cancellationWindow} after order submission` } },
        { key: "packing", title: { en: "After packing starts" }, value: { en: "Orders can’t be changed" } },
        {
          key: "claims",
          title: { en: "Defective or damaged items" },
          value: { en: "Reshipment or refund after review." },
          href: "/shipping#claims",
          linkLabel: { en: "See claims policy →" },
        },
        { key: "refunds", title: { en: "Refunds" }, value: { en: P.refundPolicy } },
      ],
    },

    /* ───── 06 FAQ ───── */
    {
      id: "faq",
      type: "faq",
      enabled: true,
      order: 6,
      number: "06",
      label: { en: "FAQ" },
      title: { en: "Ordering questions." },
      faqCategory: "ordering",
    },

    /* ───── Final: account band + questions form ───── */
    {
      id: "quote",
      type: "inquiry",
      enabled: true,
      order: 7,
      addons: [
        { type: "contextCta", variant: "signup", tone: "dark", text: { en: "Create a buyer account to see bulk pricing." }, ctaId: "ordering_final" },
        {
          type: "inquiryForm",
          ctaId: "ordering_final_inquiry",
          title: { en: "Questions about terms? Ask us." },
          lede: { en: "Bulk quotes, payment terms or anything else — we reply within 24 hours on business days." },
        },
      ],
    },

    /* ───── Keep reading ───── */
    {
      id: "more",
      type: "related",
      enabled: true,
      order: 8,
      label: { en: "Keep reading" },
      items: [
        { key: "about", href: "/about", title: { en: "About KLOW" }, description: { en: "Who we are, our warehouse in Korea, company details" } },
        { key: "shipping", href: "/shipping", title: { en: "Shipping" }, description: { en: "Delivery times, Incoterms, documents" } },
      ],
    },
  ],
};
