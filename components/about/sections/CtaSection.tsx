import { t } from "@/content/about";
import { Links, type SectionProps } from "../parts";

/** Closing green band. */
export default function CtaSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="about-band">
      <div className="wrap about-band__in">
        <h2 className="h2">{t(s.title, locale)}</h2>
        <Links links={s.links} locale={locale} invert />
      </div>
    </section>
  );
}
