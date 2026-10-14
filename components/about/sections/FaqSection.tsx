import { t } from "@/content/about";
import { SectionHead, type SectionProps } from "../parts";

/** Native <details> accordion: toggles without JS and keeps answers in the HTML for search engines. */
export default function FaqSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap about-split">
        <SectionHead s={s} locale={locale} />
        <div className="about-faq">
          {s.items?.map((it, i) => (
            <details key={i} open={i === 0}>
              <summary>
                <h3>{t(it.title, locale)}</h3>
                <i aria-hidden />
              </summary>
              <p>{t(it.description, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
