import { t } from "@/content/sections";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * Bordered lists side by side (e.g. "Included" / "On request"), each line with an optional muted note.
 * An odd last list spans the full width as a summary row.
 */
export default function ChecklistSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <ul className="checklists">
          {s.items?.map((it, i) => (
            <li key={it.key ?? i}>
              <h3>{t(it.title, locale)}</h3>
              {it.description && <p className="checklists__desc">{t(it.description, locale)}</p>}
              {!!it.points?.length && (
                <ul className="checklists__points">
                  {it.points.map((p, j) => (
                    <li key={j}>
                      <span>{t(p.text, locale)}</span>
                      {p.note && <small>{t(p.note, locale)}</small>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
