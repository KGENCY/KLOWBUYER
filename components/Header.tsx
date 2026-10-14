"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FREE_SHIPPING_SKUS } from "@/lib/data";
import { initials } from "@/lib/buyer";
import { t } from "@/content/i18n";
import { NAV, isActive, visible, type NavItem } from "@/content/navigation";
import LanguageSelect from "./nav/LanguageSelect";
import MobileNav from "./nav/MobileNav";
import { MenuAside, MenuColumns, MenuFooter } from "./nav/MenuContent";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

type Menu = Extract<NavItem, { type: "menu" }>;

/** How long the pointer may be outside a menu (e.g. crossing the gap to the panel) before it closes. */
const HOVER_CLOSE_MS = 160;

/**
 * Desktop menus open on hover (mouse) and on click (touch, keyboard). Esc, a click outside,
 * or moving focus out closes them. Only one is open at a time.
 */
function DesktopNav({ path }: { path: string }) {
  const { openWith } = useRequest();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => setOpenId(null), [path]);

  useEffect(() => {
    if (!openId) return;
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpenId(null); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`nav-btn-${openId}`)?.focus();
      setOpenId(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [openId]);

  const hoverOpen = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(timer.current);
    setOpenId(id);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    timer.current = setTimeout(() => setOpenId(null), HOVER_CLOSE_MS);
  };
  const close = () => setOpenId(null);

  return (
    <nav ref={navRef} className="header__nav" aria-label="Main">
      {visible(NAV).map((item) => {
        const active = isActive(item, path);
        if (item.type === "link") {
          return item.action === "requestBrand" ? (
            <button key={item.id} type="button" className="nav__item" onClick={() => openWith()}>{t(item.label)}</button>
          ) : (
            <Link key={item.id} href={item.href ?? "#"} className={`nav__item ${active ? "is-on" : ""}`} aria-current={active ? "page" : undefined}>
              {t(item.label)}
            </Link>
          );
        }
        const open = openId === item.id;
        const panelId = `nav-panel-${item.id}`;
        return (
          <div
            key={item.id}
            className="nav__menu"
            onPointerEnter={hoverOpen(item.id)}
            onPointerLeave={hoverClose}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpenId((o) => (o === item.id ? null : o))}
          >
            <button
              id={`nav-btn-${item.id}`}
              type="button"
              className={`nav__item nav__trigger ${active ? "is-on" : ""}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {t(item.label)} <i aria-hidden />
            </button>
            <MenuPanel menu={item} id={panelId} open={open} onNavigate={close} />
          </div>
        );
      })}
    </nav>
  );
}

/** Full-width panel under the header. Kept in the DOM (hidden) so its links stay crawlable. */
function MenuPanel({ menu, id, open, onNavigate }: { menu: Menu; id: string; open: boolean; onNavigate: () => void }) {
  return (
    <div id={id} className={`menu menu--${menu.size} ${open ? "is-on" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="wrap menu__in">
        <div className={`menu__cols menu__cols--${menu.columns.length}`}>
          <MenuColumns menu={menu} onNavigate={onNavigate} />
        </div>
        {menu.aside && <MenuAside aside={menu.aside} menuId={menu.id} onNavigate={onNavigate} />}
      </div>
      {menu.footer && (
        <div className="menu__band">
          <div className="wrap"><MenuFooter footer={menu.footer} onNavigate={onNavigate} /></div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const path = usePathname();
  const { items, setOpen } = useSamples();
  const { buyer, signIn, signOut } = useBuyer();
  return (
    <>
      <div className="notice">
        <span>Samples at wholesale price — from 1 unit</span>
        <span className="notice__dot hide-sm" />
        <Link href="/shipping" className="hide-sm notice__link">Free shipping at {FREE_SHIPPING_SKUS} SKUs</Link>
        <span className="notice__dot hide-sm" />
        <span className="hide-sm">Verified Korean brands only</span>
      </div>
      <header className="header">
        <div className="header__in">
          <Link href="/" className="wordmark" aria-label="KLOW Wholesale home">
            <span className="wordmark__k">KLOW</span>
            <span className="wordmark__w">Wholesale</span>
          </Link>
          <DesktopNav path={path} />
          <div className="header__act">
            <span className="hide-sm"><LanguageSelect /></span>
            {buyer ? (
              // Design mock: clicking the account signs out, so the signed-in and signed-out views can be flipped back and forth.
              <button className="header__me" onClick={signOut} title={`Signed in as ${buyer.company} · click to sign out`}>
                <span className="header__avatar">
                  <span>{initials(buyer.company)}</span>
                  <i className="header__verified" aria-hidden />
                </span>
                <span className="header__name hide-sm">{buyer.company}</span>
              </button>
            ) : (
              // Design mock: signs straight in as the demo buyer so both views can be compared.
              <button className="header__signin" onClick={() => signIn(DEMO_EMAIL)}>Sign in</button>
            )}
            <button className="header__box" onClick={() => setOpen(true)}>
              Sample box <span className="header__count">{items.length}/{FREE_SHIPPING_SKUS}</span>
            </button>
            <MobileNav path={path} />
          </div>
        </div>
      </header>
    </>
  );
}
