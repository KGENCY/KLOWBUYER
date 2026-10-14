"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LANGUAGES } from "@/content/navigation";
import { DEFAULT_LOCALE } from "@/content/i18n";

/**
 * EN / ES / RU / AR. Only English is live; the others show as disabled with "Coming soon".
 * dropdown: a small button + menu (header, footer). inline: a row of options (mobile menu).
 */
export default function LanguageSelect({
  variant = "dropdown",
  placement = "down",
  tone = "light",
}: {
  variant?: "dropdown" | "inline";
  placement?: "down" | "up";
  tone?: "light" | "dark";
}) {
  const current = LANGUAGES.find((l) => l.code === DEFAULT_LOCALE)!;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const options = LANGUAGES.map((l) => (
    <li key={l.code}>
      <button
        type="button"
        lang={l.code}
        aria-current={l.code === current.code ? "true" : undefined}
        aria-disabled={!l.enabled || undefined}
        disabled={!l.enabled}
        onClick={() => setOpen(false)}
      >
        <b>{l.label}</b>
        <span>{l.name}</span>
        {!l.enabled && <small>Coming soon</small>}
      </button>
    </li>
  ));

  if (variant === "inline") {
    return (
      <div className={`lang lang--inline lang--${tone}`}>
        <span className="eyebrow">Language</span>
        <ul>{options}</ul>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`lang lang--${placement} lang--${tone}`}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        ref={btnRef}
        type="button"
        className="lang__btn"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Language: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        {current.label} <i aria-hidden />
      </button>
      <ul id={menuId} className={`lang__menu ${open ? "is-on" : ""}`}>{options}</ul>
    </div>
  );
}
