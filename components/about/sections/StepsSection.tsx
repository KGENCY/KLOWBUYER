import { t } from "@/content/about";
import { SectionHead, type SectionProps } from "../parts";

/** Steps joined by a thin rule: across on desktop, down on mobile. */
export default function StepsSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <ol className="about-flow">
          {s.items?.map((it, i) => (
            <li key={i}>
              <span className="about-flow__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(it.title, locale)}</h3>
              {it.description && <p>{t(it.description, locale)}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
