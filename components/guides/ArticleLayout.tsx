import Link from "next/link";
import Toc from "./Toc";
import NewsletterBlock from "./NewsletterBlock";

export type Crumb = { label: string; href: string };
export type SideCta = { title: string; text: string; label: string; href: string; ctaId: string };
export type RelatedGuide = { key: string; href: string; label: string; title: string; summary: string };

/** The sticky sidebar box; also repeated at the end of the article on mobile. */
function CtaBox({ cta, place }: { cta: SideCta; place: "side" | "end" }) {
  return (
    <div className={`gcta gcta--${place}`}>
      <span className="gcta__title">{cta.title}</span>
      <p>{cta.text}</p>
      <Link href={cta.href} className="btn btn--solid btn--sm" data-cta-id={place === "side" ? cta.ctaId : `${cta.ctaId}_end`}>{cta.label}</Link>
    </div>
  );
}

/**
 * Shared layout for every guide: breadcrumb, title and meta, a ~700px reading column with a sidebar
 * (contents that track the section in view + a sticky CTA), then related guides and the newsletter.
 * On mobile the contents fold under the title and the CTA box moves to the end of the article.
 */
export default function ArticleLayout({
  crumbs,
  label,
  title,
  summary,
  meta,
  toc,
  cta,
  disclaimer,
  related,
  ctaPrefix,
  newsletterCtaId,
  children,
}: {
  crumbs: Crumb[];
  label: string;
  title: string;
  summary: string;
  meta: string;
  toc: { id: string; label: string }[];
  cta: SideCta;
  disclaimer?: string;
  related: RelatedGuide[];
  ctaPrefix: string;
  newsletterCtaId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="about guide">
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.href}>
              {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>

      <header className="wrap guide__head">
        <span className="eyebrow eyebrow--accent">{label}</span>
        <h1 className="guide__title">{title}</h1>
        <p className="guide__summary">{summary}</p>
        <p className="guide__meta">{meta}</p>
        <details className="guide__toc-m">
          <summary>Contents</summary>
          <Toc items={toc} ctaPrefix={`${ctaPrefix}_m`} />
        </details>
      </header>

      <div className="wrap guide__grid">
        <article className="guide__body">
          {children}
          {disclaimer && <p className="guide__disclaimer" role="note">{disclaimer}</p>}
          <CtaBox cta={cta} place="end" />
        </article>
        <aside className="guide__side">
          <div className="guide__sticky">
            <span className="eyebrow">Contents</span>
            <Toc items={toc} ctaPrefix={ctaPrefix} />
            <CtaBox cta={cta} place="side" />
          </div>
        </aside>
      </div>

      {!!related.length && (
        <section className="section about-sec">
          <div className="wrap">
            <span className="eyebrow about-label">More guides</span>
            <ul className="about-related__grid about-related__grid--3 grel">
              {related.map((r) => (
                <li key={r.key}>
                  <Link href={r.href} data-cta-id={`${ctaPrefix}_related_${r.key}`}>
                    <span className="eyebrow">{r.label}</span>
                    <h2>{r.title}</h2>
                    <p>{r.summary}</p>
                    <span className="about-related__go" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section about-sec">
        <div className="wrap"><NewsletterBlock ctaId={newsletterCtaId} /></div>
      </section>
    </div>
  );
}
