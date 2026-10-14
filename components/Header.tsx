"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FREE_SHIPPING_SKUS } from "@/lib/data";
import { initials } from "@/lib/buyer";
import { ABOUT_LINKS } from "@/content/nav";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

/** "About" opens the About group: on hover with a mouse, on click/tap and keyboard otherwise. */
function AboutMenu() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = ABOUT_LINKS.some((l) => l.href === path);
  useEffect(() => setOpen(false), [path]);
  return (
    <div
      className="navdrop"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button className={`navdrop__btn ${active ? "is-on" : ""}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        About <i aria-hidden />
      </button>
      <div className={`navdrop__menu ${open ? "is-on" : ""}`}>
        {ABOUT_LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={l.href === path ? "page" : undefined} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const { items, setOpen } = useSamples();
  const { openWith } = useRequest();
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
          <nav className="header__nav">
            <Link href="/#collection">Collection</Link>
            <Link href="/#brands">Brands</Link>
            <Link href="/match">Find my brands</Link>
            <button onClick={() => openWith()}>Request a brand</button>
            <AboutMenu />
          </nav>
          <div className="header__act">
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
          </div>
        </div>
      </header>
    </>
  );
}
