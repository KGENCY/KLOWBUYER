import { t } from "@/content/sections";
import { Links, SectionAddons, type SectionProps } from "../parts";

/**
 * Closing call to action. With a contextCta addon it renders that band (e.g. tone "dark");
 * otherwise the full-width green band with the section's title and links.
 */
export default function CtaSection({ s, locale }: SectionProps) {
  if (s.addons?.some((a) => a.type === "contextCta")) {
    return (
      <section id={s.id} className="about-final">
        <div className="wrap"><SectionAddons s={s} locale={locale} /></div>
      </section>
    );
  }
  return (
    <section id={s.id} className="about-band">
      <div className="wrap about-band__in">
        <h2 className="h2">{t(s.title, locale)}</h2>
        <Links links={s.links} locale={locale} invert />
      </div>
    </section>
  );
}
