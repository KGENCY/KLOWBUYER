import { t } from "@/content/sections";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/**
 * Direct channels (email, WhatsApp…) as large rows, with the inquiry form beside them.
 * A row links out only when its `href` is set, so placeholder values never become broken links.
 */
export default function ContactSection({ s, locale, page }: SectionProps) {
  const form = s.addons?.find((a) => a.type === "inquiryForm");
  return (
    <section id={s.id} className="section about-sec about-inquiry">
      <div className="wrap about-split">
        <div>
          <SectionHead s={s} locale={locale} />
          {s.body && <p className="about-regions__body">{t(s.body, locale)}</p>}
          <ul className="about-channels">
            {s.items?.map((it, i) => {
              const inner = (
                <>
                  <span className="about-channels__k">{t(it.title, locale)}</span>
                  <span className="about-channels__v">{t(it.value, locale)}</span>
                  {it.description && <span className="about-channels__note">{t(it.description, locale)}</span>}
                </>
              );
              return (
                <li key={it.key ?? i}>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-cta-id={`${page}_contact_${it.key ?? i}`}>
                      {inner}
                      <i aria-hidden>→</i>
                    </a>
                  ) : (
                    <div>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {form && (
          <QuickInquiryForm
            id={form.anchor}
            ctaId={form.ctaId}
            title={form.title && t(form.title, locale)}
            lede={form.lede && t(form.lede, locale)}
            submitLabel={form.submitLabel && t(form.submitLabel, locale)}
          />
        )}
      </div>
      {s.addons?.some((a) => a.type !== "inquiryForm") && (
        <div className="wrap"><SectionAddons s={s} locale={locale} /></div>
      )}
    </section>
  );
}
