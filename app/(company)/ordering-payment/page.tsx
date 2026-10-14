import type { Metadata } from "next";
import AboutSections from "@/components/about/AboutSections";
import { ordering } from "@/content/ordering";
import { t } from "@/content/sections";

export const metadata: Metadata = {
  title: t(ordering.seo.title),
  description: t(ordering.seo.description),
  alternates: { canonical: "/ordering-payment" },
};

export default function OrderingPaymentPage() {
  return <AboutSections sections={ordering.sections} page={ordering.ctaPrefix} />;
}
