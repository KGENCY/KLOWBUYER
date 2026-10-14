import { t } from "@/content/i18n";
import type { GuideSection } from "@/content/guides";

/** One text section of a guide: H2, body, items (checklist / numbered steps / list) and an optional callout. */
export default function GuideSectionView({ s }: { s: GuideSection }) {
  const items = s.items ?? [];
  return (
    <section id={s.id} className="gsec">
      <h2>{t(s.heading)}</h2>
      {s.body && <p>{t(s.body)}</p>}
      {!!items.length && s.style === "steps" && (
        <ol className="gsteps">
          {items.map((i, n) => <li key={n}><span>{String(n + 1).padStart(2, "0")}</span><p>{t(i)}</p></li>)}
        </ol>
      )}
      {!!items.length && s.style === "checklist" && (
        <ul className="gcheck">{items.map((i, n) => <li key={n}>{t(i)}</li>)}</ul>
      )}
      {!!items.length && (!s.style || s.style === "list") && (
        <ul className="glist">{items.map((i, n) => <li key={n}>{t(i)}</li>)}</ul>
      )}
      {s.callout && <p className="gnote">{t(s.callout)}</p>}
    </section>
  );
}
