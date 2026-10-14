import type { Metadata } from "next";
import AboutSections from "@/components/about/AboutSections";
import { shipping } from "@/content/shipping";
import { t } from "@/content/sections";

export const metadata: Metadata = {
  title: t(shipping.seo.title),
  description: t(shipping.seo.description),
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return <AboutSections sections={shipping.sections} page={shipping.ctaPrefix} />;
}
