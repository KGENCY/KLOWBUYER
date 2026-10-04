"use client";

import Link from "next/link";
import { FREE_SHIPPING_SKUS } from "@/lib/data";
import { useSamples } from "./SampleBox";
import { useRequest } from "./RequestBrand";

export default function Header() {
  const { items, setOpen } = useSamples();
  const { openWith } = useRequest();
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
            <span className="hide-sm">Sign in</span>
            <button className="header__box" onClick={() => setOpen(true)}>
              Sample box <span className="header__count">{items.length}/{FREE_SHIPPING_SKUS}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
