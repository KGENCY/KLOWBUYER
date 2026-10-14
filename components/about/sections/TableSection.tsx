import { Fragment } from "react";
import { t } from "@/content/sections";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * A comparison table. On mobile each row stacks into a block, with the column name before each cell.
 * A highlighted row gets a green rule and its note on the line below.
 */
export default function TableSection({ s, locale }: SectionProps) {
  const table = s.table;
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <div className="about-row">
          <SectionHead s={s} locale={locale} />
          {s.body && <p className="about-row__body">{t(s.body, locale)}</p>}
        </div>
        {table && (
          <table className="about-table">
            <thead>
              <tr>{table.columns.map((c, i) => <th key={i} scope="col">{t(c, locale)}</th>)}</tr>
            </thead>
            <tbody>
              {table.rows.map((r) => (
                <Fragment key={r.key}>
                  <tr className={r.highlight ? "is-highlight" : undefined}>
                    {r.cells.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">{t(c, locale)}</th>
                      ) : (
                        <td key={i} data-label={t(table.columns[i], locale)}>{t(c, locale)}</td>
                      )
                    )}
                  </tr>
                  {r.highlight && (
                    <tr className="about-table__note">
                      <td colSpan={table.columns.length}>{t(r.highlight, locale)}</td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
