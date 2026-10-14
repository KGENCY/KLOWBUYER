"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { t } from "@/content/i18n";
import { MOBILE_ACTIONS, NAV, isActive, visible } from "@/content/navigation";
import { WhatsAppIcon } from "@/components/conversion/WhatsAppButton";
import { useRequest } from "@/components/RequestBrand";
import LanguageSelect from "./LanguageSelect";
import { MenuColumns, MenuFooter } from "./MenuContent";

/**
 * Below 860px: a menu button opens a full-screen panel. Menus become accordions; language sits at the top,
 * "Browse & sample" and WhatsApp stay pinned at the bottom. Rendered into <body> so the header's
 * backdrop blur can't trap it, and above the sample bar so they never overlap.
 */
export default function MobileNav({ path }: { path: string }) {
  const { openWith } = useRequest();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(false); setSection(null); }, [path]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => { root.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => setOpen(false);

  const panel = (
    <div id="mnav" className={`mnav ${open ? "is-on" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
      <div className="mnav__top">
        <Link href="/" className="wordmark" onClick={close} aria-label="KLOW Wholesale home">
          <span className="wordmark__k">KLOW</span>
        </Link>
        <button ref={closeRef} type="button" className="mnav__close" onClick={() => { close(); btnRef.current?.focus(); }} aria-label="Close menu">×</button>
      </div>
      <div className="mnav__body">
        <LanguageSelect variant="inline" />
        <ul className="mnav__list">
          {visible(NAV).map((item) => {
            const active = isActive(item, path);
            if (item.type === "link") {
              return (
                <li key={item.id}>
                  {item.action === "requestBrand" ? (
                    <button type="button" className="mnav__item" onClick={() => { close(); openWith(); }}>{t(item.label)}</button>
                  ) : (
                    <Link href={item.href ?? "#"} className={`mnav__item ${active ? "is-on" : ""}`} onClick={close} aria-current={active ? "page" : undefined}>
                      {t(item.label)}
                    </Link>
                  )}
                </li>
              );
            }
            const expanded = section === item.id;
            const regionId = `mnav-${item.id}`;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`mnav__item mnav__toggle ${active ? "is-on" : ""}`}
                  aria-expanded={expanded}
                  aria-controls={regionId}
                  onClick={() => setSection(expanded ? null : item.id)}
                >
                  {t(item.label)} <i aria-hidden />
                </button>
                <div id={regionId} className="mnav__region" hidden={!expanded}>
                  <MenuColumns menu={item} onNavigate={close} />
                  {item.footer && <MenuFooter footer={item.footer} onNavigate={close} />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mnav__foot">
        <Link href={MOBILE_ACTIONS.primary.href} className="btn btn--solid" onClick={close} data-cta-id={MOBILE_ACTIONS.primary.ctaId}>
          {t(MOBILE_ACTIONS.primary.label)}
        </Link>
        <a href={MOBILE_ACTIONS.whatsapp.href} className="btn btn--ghost btn--plain mnav__wa" onClick={close} data-cta-id={MOBILE_ACTIONS.whatsapp.ctaId}>
          <WhatsAppIcon /> {t(MOBILE_ACTIONS.whatsapp.label)}
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="header__burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mnav"
        onClick={() => setOpen(true)}
      >
        <i aria-hidden /><i aria-hidden /><i aria-hidden />
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
