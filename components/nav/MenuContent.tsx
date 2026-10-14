"use client";

import Link from "next/link";
import { t } from "@/content/i18n";
import { visible, type NavAside, type NavColumn, type NavItem, type NavLink } from "@/content/navigation";
import { leadMagnetsById } from "@/content/leadMagnets";
import MediaFrame from "@/components/media/MediaFrame";
import LeadMagnetCard from "@/components/conversion/LeadMagnetCard";
import { WhatsAppIcon } from "@/components/conversion/WhatsAppButton";
import { useRequest } from "@/components/RequestBrand";

type Menu = Extract<NavItem, { type: "menu" }>;

/** One menu link; `action` links (request a brand) become buttons. */
export function NavLinkView({ l, className, onNavigate }: { l: NavLink; className?: string; onNavigate?: () => void }) {
  const { openWith } = useRequest();
  const body = (
    <>
      <span className="menu__label">
        {t(l.label)}
        {l.badge && <em className="menu__badge">{t(l.badge)}</em>}
      </span>
      {l.description && <span className="menu__desc">{t(l.description)}</span>}
    </>
  );
  if (l.action === "requestBrand") {
    return <button type="button" className={className} onClick={() => { onNavigate?.(); openWith(); }}>{body}</button>;
  }
  return <Link href={l.href ?? "#"} className={className} onClick={onNavigate}>{body}</Link>;
}

/** The link columns of a menu. */
export function MenuColumns({ menu, onNavigate }: { menu: Menu; onNavigate?: () => void }) {
  return (
    <>
      {menu.columns.map((c: NavColumn) => {
        const links = visible(c.links);
        const [first, ...rest] = links;
        return (
          <div key={c.id} className="menu__col">
            {/* Compact menus have one column whose heading repeats the trigger, so it's only for screen readers. */}
            <span className={menu.size === "compact" ? "sr-only" : "eyebrow menu__head"}>{t(c.heading)}</span>
            {c.note && <span className="menu__note">{t(c.note)}</span>}
            {c.featureFirst && first && <NavLinkView l={first} className="menu__feature" onNavigate={onNavigate} />}
            <ul className="menu__links">
              {(c.featureFirst ? rest : links).map((l) => (
                <li key={l.id}><NavLinkView l={l} className="menu__link" onNavigate={onNavigate} /></li>
              ))}
            </ul>
            {c.more && c.more.enabled && (
              <Link href={c.more.href ?? "#"} className="link small menu__more" onClick={onNavigate}>{t(c.more.label)} →</Link>
            )}
          </div>
        );
      })}
    </>
  );
}

/** Right-hand block of a menu: brand cards, a resource, or a contact box. */
export function MenuAside({ aside, menuId, onNavigate }: { aside: NavAside; menuId: string; onNavigate?: () => void }) {
  if (aside.type === "brandCards") {
    return (
      <div className="menu__aside menu__cards">
        {aside.cards.map((c) => (
          <Link key={c.id} href={c.href} className="menu__card" onClick={onNavigate} data-cta-id={`nav_${menuId}_card_${c.id}`}>
            <MediaFrame src={c.image.src} alt={t(c.image.alt)} fallback={c.image.fallback} ratio="4 / 3" />
            <span className="menu__card-name">{t(c.name)}<em className="menu__badge">Only on KLOW</em></span>
            <span className="menu__card-tag">{t(c.tagline)}</span>
            <span className="menu__card-go">{t(c.cta)} →</span>
          </Link>
        ))}
      </div>
    );
  }
  if (aside.type === "leadMagnet") {
    const [magnet] = leadMagnetsById([aside.magnetId]);
    return magnet ? <div className="menu__aside"><LeadMagnetCard magnet={magnet} ctaId={`nav_${menuId}_lead_${magnet.id.replace(/-/g, "_")}`} /></div> : null;
  }
  return (
    <div className="menu__aside menu__contact">
      <span className="menu__contact-title">{t(aside.title)}</span>
      <Link href={aside.link.href} className="btn btn--solid btn--sm" onClick={onNavigate} data-cta-id={aside.link.ctaId}>{t(aside.link.label)}</Link>
      <a href={aside.whatsapp.href} className="menu__wa" data-cta-id={aside.whatsapp.ctaId}>
        <WhatsAppIcon /> {t(aside.whatsapp.label)}
      </a>
    </div>
  );
}

/** Thin band at the bottom of a menu panel, e.g. "Can't find a brand? Request a brand →". */
export function MenuFooter({ footer, onNavigate }: { footer: NonNullable<Menu["footer"]>; onNavigate?: () => void }) {
  const { openWith } = useRequest();
  return (
    <p className="menu__footer">
      <span>{t(footer.text)}</span>
      {footer.href ? (
        <Link href={footer.href} className="link small" onClick={onNavigate} data-cta-id={footer.ctaId}>{t(footer.label)} →</Link>
      ) : (
        <button type="button" className="link small" onClick={() => { onNavigate?.(); openWith(); }} data-cta-id={footer.ctaId}>{t(footer.label)} →</button>
      )}
    </p>
  );
}
