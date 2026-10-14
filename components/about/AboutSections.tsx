import { RTL_LOCALES, type AboutSection, type Locale, type SectionType } from "@/content/sections";
import FaqSection from "@/components/faq/FaqSection";
import type { SectionProps } from "./parts";
import HeroSection from "./sections/HeroSection";
import SplitSection from "./sections/SplitSection";
import GridSection from "./sections/GridSection";
import GallerySection from "./sections/GallerySection";
import RegionsSection from "./sections/RegionsSection";
import StepsSection from "./sections/StepsSection";
import CompanyInfoSection from "./sections/CompanyInfoSection";
import CtaSection from "./sections/CtaSection";
import RelatedSection from "./sections/RelatedSection";
import PricingSection from "./sections/PricingSection";
import InquirySection from "./sections/InquirySection";

/** The shared FAQ, filtered to this section's category (with FAQPage JSON-LD). */
function FaqFromData({ s, locale, page }: SectionProps) {
  return <FaqSection category={s.faqCategory ?? "about"} id={s.id} head={s} ctaPrefix={`${page}_faq`} locale={locale} />;
}

const BY_TYPE: Record<SectionType, (p: SectionProps) => React.ReactNode> = {
  hero: HeroSection,
  split: SplitSection,
  grid: GridSection,
  gallery: GallerySection,
  regions: RegionsSection,
  steps: StepsSection,
  companyInfo: CompanyInfoSection,
  facts: CompanyInfoSection,
  pricing: PricingSection,
  inquiry: InquirySection,
  faq: FaqFromData,
  cta: CtaSection,
  related: RelatedSection,
};

/** Renders enabled sections in `order`. Layout uses logical properties, so `dir="rtl"` mirrors it for Arabic. */
export default function AboutSections({ sections, page, locale = "en" }: { sections: AboutSection[]; page: string; locale?: Locale }) {
  const visible = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  return (
    <div className="about" lang={locale} dir={RTL_LOCALES.includes(locale) ? "rtl" : "ltr"}>
      {visible.map((s) => {
        const Section = BY_TYPE[s.type];
        return <Section key={s.id} s={s} locale={locale} page={page} />;
      })}
    </div>
  );
}
