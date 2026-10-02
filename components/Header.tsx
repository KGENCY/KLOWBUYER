"use client";

import Link from "next/link";
import { FREE_SHIPPING_SKUS } from "@/lib/data";
import { initials } from "@/lib/buyer";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";
import { useBuyer } from "./Buyer";

export default function Header() {
  const { items, setOpen } = useSamples();
  const { openWith } = useRequest();
  const { buyer } = useBuyer();
  return (
    <>
      <div className="notice">
        <span>Samples from 1 unit at wholesale price</span>
        <span className="notice__dot hide-sm" />
        <span className="hide-sm">Complimentary shipping on any {FREE_SHIPPING_SKUS} SKUs</span>
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
              <Link href="/account" className="header__avatar" title={`${buyer.name} · ${buyer.company}`} aria-label="My account">
                <span>{initials(buyer.name)}</span>
                <i className="header__verified" aria-hidden />
              </Link>
            ) : (
              <Link href="/signin" className="hide-sm">Sign in</Link>
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
