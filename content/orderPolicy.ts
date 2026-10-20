/**
 * Ordering and payment rules in one place. Pages and FAQ answers build their text from these
 * values, so a change here shows up everywhere. [BRACKETS] = not decided yet.
 */
import { FREE_SHIPPING_SKUS, MAX_SAMPLE_SKUS } from "@/lib/data";
import { PARTNER_SAMPLE_PRICE } from "./products";

export const ORDER_POLICY = {
  /** Smallest sample order per product. */
  sampleMinUnits: 1,
  /** Partner-brand samples: verified buyers only, this price per unit, each product once per buyer. */
  samplePrice: PARTNER_SAMPLE_PRICE,
  /** Most products in one sample order; more means another order. */
  maxSampleSkus: MAX_SAMPLE_SKUS,
  /** Sample boxes ship free from this many SKUs (same constant the sample box uses). */
  freeShippingSkus: FREE_SHIPPING_SKUS,
  /** Minimum order amount for wholesale orders. */
  wholesaleMOA: "[US$ ___]",
  /** Largest order that can be paid by PayPal. */
  paypalLimit: "[US$ ___]",
  firstOrderTerms: "100% in advance",
  repeatBuyerTerms: "30% deposit / 70% before shipment",
  /** How long after submitting an order it can still be changed or cancelled. */
  cancellationWindow: "[__]",
  refundPolicy: "[__]",
  currency: "USD",
} as const;
