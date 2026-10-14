import type { Metadata } from "next";
import AboutSections from "@/components/about/AboutSections";
import { about, t, type AboutSection } from "@/content/about";

export const metadata: Metadata = {
  title: t(about.seo.title),
  description: t(about.seo.description),
  alternates: { canonical: "/about" },
  openGraph: { title: t(about.seo.title), description: t(about.seo.description), type: "website" },
};

/** Organization + FAQPage structured data, built from the same content the page shows. */
function jsonLd(sections: AboutSection[]) {
  const company = sections.find((s) => s.type === "companyInfo" && s.enabled);
  const faq = sections.find((s) => s.type === "faq" && s.enabled);
  const fact = (key: string) => t(company?.items?.find((i) => i.key === key)?.value);

  const organization = {
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
      availableLanguage: ["English"],
    },
  };

  const faqPage = faq && {
    "@type": "FAQPage",
    mainEntity: faq.items?.map((q) => ({
      "@type": "Question",
      name: t(q.title),
      acceptedAnswer: { "@type": "Answer", text: t(q.description) },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [organization, faqPage].filter(Boolean) };
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(about.sections)).replace(/</g, "\\u003c") }}
      />
      <AboutSections sections={about.sections} />
    </>
  );
}
