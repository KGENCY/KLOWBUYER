import { t } from "@/content/i18n";
import { FOOTER, visible } from "@/content/navigation";
import { NavLinkView } from "./nav/MenuContent";
import NewsletterForm from "./nav/NewsletterForm";
import LanguageSelect from "./nav/LanguageSelect";

/** Shop / Guides / Company links, the newsletter, then the legal line and language. All text from content/navigation.ts. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="wordmark wordmark--light">
            <span className="wordmark__k">KLOW</span>
            <span className="wordmark__w">Wholesale</span>
          </div>
          <p className="footer__blurb">{t(FOOTER.blurb)}</p>
        </div>
        <div className="footer__grid">
          {FOOTER.columns.map((c) => (
            <nav key={c.id} className="footer__col" aria-label={t(c.heading)}>
              <span className="eyebrow">{t(c.heading)}</span>
              <ul>
                {visible(c.links).map((l) => (
                  <li key={l.id}><NavLinkView l={l} className="footer__link" /></li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer__col footer__col--news">
            <span className="eyebrow">{t(FOOTER.newsletter.heading)}</span>
            <NewsletterForm ctaId={FOOTER.newsletter.ctaId} title={t(FOOTER.newsletter.title)} note={t(FOOTER.newsletter.note)} />
          </div>
        </div>
      </div>
      <div className="wrap footer__base">
        <p className="footer__legal">
          {FOOTER.legal.map((part, i) => (
            <span key={i}>{t(part)}</span>
          ))}
        </p>
        <LanguageSelect placement="up" tone="dark" />
      </div>
    </footer>
  );
}
