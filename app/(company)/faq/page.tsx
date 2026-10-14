import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/content/i18n";
import { FAQ_CATEGORIES, FAQ_CATEGORY_ORDER, faqsFor } from "@/content/faq";
import { SectionHead } from "@/components/about/parts";
import FaqList from "@/components/faq/FaqList";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";

export const metadata: Metadata = {
  title: "FAQ | KLOW Wholesale — K-beauty wholesale questions answered",
  description: "Answers on authenticity, shipping from Korea, duties, minimum orders, bulk pricing and payment for KLOW’s K-beauty wholesale buyers.",
  alternates: { canonical: "/faq" },
};

/**
 * Every FAQ, grouped by category. No FAQPage JSON-LD here: each question already carries it
 * on its own page (/about, /shipping, /ordering-payment), and duplicating it would compete.
 */
export default function FaqPage() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="wrap about-hero__grid about-hero__grid--solo">
          <div>
            <span className="eyebrow eyebrow--accent about-hero__label">FAQ</span>
            <h1 className="hero__title">
              Questions buyers ask.
              <em>Answered once, here.</em>
            </h1>
            <p className="hero__lede">Authenticity, shipping, duties, minimums and payment. Can’t find yours? Ask us at the bottom of the page.</p>
            <nav className="faq-jump" aria-label="FAQ categories">
              {FAQ_CATEGORY_ORDER.map((c) => (
                <a key={c} href={`#${c}`} data-cta-id={`faq_jump_${c}`}>{t(FAQ_CATEGORIES[c].label)}</a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {FAQ_CATEGORY_ORDER.map((c, i) => {
        const cat = FAQ_CATEGORIES[c];
        return (
          <section key={c} id={c} className="section about-sec">
            <div className="wrap about-split">
              <div className="faq-cat__head">
                <SectionHead s={{ number: String(i + 1).padStart(2, "0"), label: { en: `${faqsFor(c).length} questions` }, title: cat.label }} locale="en" />
                <Link href={cat.href} className="link small" data-cta-id={`faq_more_${c}`}>{t(cat.more)}</Link>
              </div>
              <FaqList items={faqsFor(c)} ctaPrefix={`faq_${c}`} openFirst={false} />
            </div>
          </section>
        );
      })}

      <section id="ask" className="section about-sec about-inquiry">
        <div className="wrap about-split">
          <div>
            <SectionHead s={{ label: { en: "Still unsure?" }, title: { en: "Didn’t find your answer?" }, subtitle: { en: "Ask us directly." } }} locale="en" />
            <p className="about-regions__body">A real person on our team replies within 24 hours on business days — in English, Spanish, Russian or Arabic.</p>
          </div>
          <QuickInquiryForm ctaId="faq_inquiry" title="Ask our team" />
        </div>
      </section>
    </div>
  );
}
