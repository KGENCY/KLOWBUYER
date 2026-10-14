"use client";

import Link from "next/link";
import { FREE_SHIPPING_SKUS } from "@/lib/data";
import { initials } from "@/lib/buyer";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";
import { DEMO_EMAIL, useBuyer } from "./Buyer";

export default function Header() {
  const { items, setOpen } = useSamples();
  const { openWith } = useRequest();
  const { buyer, signIn, signOut } = useBuyer();
  return (
    <>
      <div className="notice">
        <span>Samples at wholesale price — from 1 unit</span>
        <span className="notice__dot hide-sm" />
        <span className="hide-sm">Free shipping at {FREE_SHIPPING_SKUS} SKUs</span>
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
