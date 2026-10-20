import type { Metadata } from "next";
import SamplePicker from "@/components/SamplePicker";
import { PARTNER_SAMPLE_PRICE } from "@/content/products";

export const metadata: Metadata = {
  title: `Pick your samples — $${PARTNER_SAMPLE_PRICE} each, no MOQ — KLOW Wholesale`,
  description: `Sample any product from rising Korean beauty brands at $${PARTNER_SAMPLE_PRICE} a unit, with no minimum order. Free shipping from 5 products.`,
};

export default function SamplesPage() {
  return <SamplePicker />;
}
