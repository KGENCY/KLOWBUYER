"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { t } from "@/content/i18n";
import { NAV, isActive, type NavItem } from "@/content/navigation";
import { MenuAside, MenuColumns, MenuFooter } from "./MenuContent";

type Menu = Extract<NavItem, { type: "menu" }>;

const ABOUT = NAV.find((n) => n.id === "about") as Menu;

/** How long the pointer may be outside the menu (e.g. crossing the gap to the panel) before it closes. */
const HOVER_CLOSE_MS = 160;

/**
 * About dropdown for the header nav. Opens on hover (mouse) and on click (touch, keyboard);
 * Esc, a click outside, or moving focus out closes it.
 */
export default function AboutMenu() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = isActive(ABOUT, path);
  const panelId = `nav-panel-${ABOUT.id}`;

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.getElementById(`nav-btn-${ABOUT.id}`)?.focus();
      setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={ref}
      className="nav__menu"
      onPointerEnter={(e) => { if (e.pointerType !== "mouse") return; clearTimeout(timer.current); setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType !== "mouse") return; timer.current = setTimeout(close, HOVER_CLOSE_MS); }}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
    >
      <button
        id={`nav-btn-${ABOUT.id}`}
        type="button"
        className={`nav__item nav__trigger ${active ? "is-on" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {t(ABOUT.label)} <i aria-hidden />
      </button>
      {/* Full-width panel under the header. Kept in the DOM (hidden) so its links stay crawlable. */}
      <div id={panelId} className={`menu menu--${ABOUT.size} ${open ? "is-on" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="wrap menu__in">
          <div className={`menu__cols menu__cols--${ABOUT.columns.length}`}>
            <MenuColumns menu={ABOUT} onNavigate={close} />
          </div>
          {ABOUT.aside && <MenuAside aside={ABOUT.aside} menuId={ABOUT.id} onNavigate={close} />}
        </div>
        {ABOUT.footer && (
          <div className="menu__band">
            <div className="wrap"><MenuFooter footer={ABOUT.footer} onNavigate={close} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
