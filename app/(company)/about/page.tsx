import type { Metadata } from "next";
import AboutSections from "@/components/about/AboutSections";
import { about } from "@/content/about";
import { t, type AboutSection } from "@/content/sections";

export const metadata: Metadata = {
  title: t(about.seo.title),
  description: t(about.seo.description),
  alternates: { canonical: "/about" },
  openGraph: { title: t(about.seo.title), description: t(about.seo.description), type: "website" },
};

/** Organization structured data, built from the company facts and contact details the page shows. (FAQPage comes from the FAQ section.) */
function organizationLd(sections: AboutSection[]) {
  const items = sections.filter((s) => s.enabled && (s.type === "companyInfo" || s.type === "contact")).flatMap((s) => s.items ?? []);
  const fact = (key: string) => t(items.find((i) => i.key === key)?.value);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KLOW Wholesale",
    legalName: "Welkit Inc.",
    alternateName: "주식회사 웰킷",
    description: t(about.seo.description),
    taxID: fact("registration"),
    email: fact("email"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gwanggyo",
      addressLocality: "Suwon",
      addressRegion: "Gyeonggi-do",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: fact("email"),
      telephone: fact("whatsapp"),
      availableLanguage: ["English", "Spanish", "Russian", "Arabic"],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd(about.sections)).replace(/</g, "\\u003c") }}
      />
      <AboutSections sections={about.sections} page={about.ctaPrefix} />
    </>
  );
}
