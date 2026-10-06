import Link from "next/link";
import Collection from "@/components/Collection";
import Brands from "@/components/Brands";
import HeroSlides from "@/components/HeroSlides";
import { FREE_SHIPPING_SKUS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <h1 className="hero__title">
              Samples at wholesale price.
              <em>Even just one unit.</em>
            </h1>
            <p className="hero__lede">
              Not free testers, not retail markups. Order a single unit of any K-beauty product at the exact wholesale
              price you&rsquo;ll pay in bulk &mdash; then reorder what sells.
            </p>

            <div className="hero__cta">
              <Link href="/#collection" className="btn btn--solid">Browse &amp; sample</Link>
              <Link href="/match" className="link small">Not sure what to pick? Get matched</Link>
            </div>
          </div>

          <HeroSlides />
        </div>

        <div className="wrap">
          <ul className="pillars" data-reveal>
            <li>
              <span className="pillars__k">Wholesale price on every sample</span>
              <span className="pillars__n">1 unit</span>
              <p><b>No MOQ, no case packs.</b> Sample any product on its own; once it sells, the MOQ price is lower still.</p>
            </li>
            <li>
              <span className="pillars__k">Free shipping at {FREE_SHIPPING_SKUS} SKUs</span>
              <span className="pillars__n">{FREE_SHIPPING_SKUS} SKUs</span>
              <p><b>Ships complimentary.</b> Mix any {FREE_SHIPPING_SKUS} products across brands and shipping is on us.</p>
            </li>
            <li>
              <span className="pillars__k">Brands that fit</span>
              <span className="pillars__n">Matched</span>
              <p><b>Aligned to your business.</b> Your channel, market, margins and documentation needs.</p>
            </li>
          </ul>
          <a href="#sampling" className="hero__more" aria-label="Scroll to the sample program"><span>↓</span></a>
        </div>
      </section>

      <section id="sampling" className="sampling">
        <div className="wrap sampling__grid">
          <div className="sampling__text" data-reveal>
            <span className="eyebrow eyebrow--light">The sample program</span>
            <h2 className="h2">Test with confidence.<br />Commit when you&rsquo;re certain.</h2>
            <ol className="steps">
              <li><span className="steps__n">01</span><div><h3>Choose single units</h3><p>Pick any product in the collection. One unit is enough, priced exactly as your wholesale order will be.</p></div></li>
              <li><span className="steps__n">02</span><div><h3>Reach {FREE_SHIPPING_SKUS} SKUs</h3><p>Combine products across brands. At {FREE_SHIPPING_SKUS} SKUs, international shipping from Seoul is complimentary.</p></div></li>
              <li><span className="steps__n">03</span><div><h3>Reorder at scale</h3><p>Move what works into wholesale quantities, with documentation for your market prepared in advance.</p></div></li>
            </ol>
          </div>
          <div className="sampling__img">
            <img src="/img/dark.jpg" alt="Amber serum bottles" loading="lazy" />
            <span className="sampling__cap"><i />Packed in Seoul · 2–7 day dispatch</span>
          </div>
        </div>
      </section>

      <Collection />

      <section id="brands" className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <span className="eyebrow">The brands</span>
              <h2 className="h2">Icons and quiet discoveries,<br />directly from Korea.</h2>
            </div>
            <Link href="/match" className="btn btn--ghost">Find brands for my business</Link>
          </div>
          <Brands />
        </div>
      </section>

      <section className="closing">
        <div className="wrap closing__grid">
          <div className="closing__img"><img src="/img/facial.jpg" alt="Professional skin treatment" loading="lazy" /></div>
          <div className="closing__in" data-reveal>
            <span className="eyebrow eyebrow--accent">KLOW Concierge</span>
            <h2 className="h2">Not sure where to begin?</h2>
            <p className="muted">Answer five questions about your business. We&rsquo;ll introduce the brands worth sampling first.</p>
            <Link href="/match" className="btn btn--solid">Start with the concierge</Link>
          </div>
        </div>
      </section>
    </>
  );
}
