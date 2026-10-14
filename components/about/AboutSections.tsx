import { RTL_LOCALES, type AboutSection, type Locale, type SectionType } from "@/content/about";
import type { SectionProps } from "./parts";
import HeroSection from "./sections/HeroSection";
import SplitSection from "./sections/SplitSection";
import GridSection from "./sections/GridSection";
import GallerySection from "./sections/GallerySection";
import RegionsSection from "./sections/RegionsSection";
import StepsSection from "./sections/StepsSection";
import CompanyInfoSection from "./sections/CompanyInfoSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";

const BY_TYPE: Record<SectionType, (p: SectionProps) => React.ReactNode> = {
  hero: HeroSection,
  split: SplitSection,
  grid: GridSection,
  gallery: GallerySection,
  regions: RegionsSection,
  steps: StepsSection,
  companyInfo: CompanyInfoSection,
  faq: FaqSection,
  cta: CtaSection,
};

/** Renders enabled sections in `order`. Layout uses logical properties, so `dir="rtl"` mirrors it for Arabic. */
export default function AboutSections({ sections, locale = "en" }: { sections: AboutSection[]; locale?: Locale }) {
  const visible = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  return (
    <div className="about" lang={locale} dir={RTL_LOCALES.includes(locale) ? "rtl" : "ltr"}>
      {visible.map((s) => {
        const Section = BY_TYPE[s.type];
        return <Section key={s.id} s={s} locale={locale} />;
      })}
    </div>
  );
}
