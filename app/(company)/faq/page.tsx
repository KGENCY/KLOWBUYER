import type { Metadata } from "next";
import { t } from "@/content/i18n";
import { faqPage, FAQ_CONTACT } from "@/content/faqPage";
import FaqHub from "@/components/faq/FaqHub";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import ContextCTA from "@/components/conversion/ContextCTA";
import SectionHeader from "@/components/section/SectionHeader";
import InfoTable from "@/components/section/InfoTable";
import RelatedPageCards from "@/components/section/RelatedPageCards";

export const metadata: Metadata = {
  title: t(faqPage.seo.title),
  description: t(faqPage.seo.description),
  alternates: { canonical: "/faq" },
};

/**
 * FAQ hub: every question from content/faq.ts, grouped by category, searchable.
 * No FAQPage JSON-LD here — /about, /shipping and /ordering-payment each output their own.
 */
export default function FaqPage() {
  return (
    <div className="about">
      <FaqHub />

      <section id="ask" className="section about-sec about-inquiry">
        <div className="wrap about-split">
          <div>
            <SectionHeader title={t(faqPage.still.title)} description={t(faqPage.still.body)} />
            <InfoTable rows={FAQ_CONTACT.map((r) => ({ key: r.label.en, label: t(r.label), value: t(r.value) }))} />
          </div>
          <QuickInquiryForm ctaId="faq_final_inquiry" title={t(faqPage.still.formTitle)} lede={t(faqPage.still.formLede)} />
        </div>
      </section>

      <section className="about-final">
        <div className="wrap">
          <ContextCTA id="faq_bottom" variant="sample" text={t(faqPage.bottomCta)} />
        </div>
      </section>

      <section className="about-related">
        <div className="wrap">
          <span className="eyebrow about-label">Keep reading</span>
          <RelatedPageCards
            ctaPrefix="faq_related"
            cards={faqPage.related.map((r) => ({ key: r.key, href: r.href, title: t(r.title), description: t(r.description) }))}
          />
        </div>
      </section>
    </div>
  );
}
