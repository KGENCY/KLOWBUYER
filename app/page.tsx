import Link from "next/link";
import Collection from "@/components/Collection";
import { BRANDS, FREE_SHIPPING_SKUS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <h1 className="hero__title">
              Sample at wholesale price.
              <em>Source what fits your business.</em>
            </h1>
            <p className="hero__lede">
              From hidden gems to proven K-beauty icons — order a single unit at the price you&rsquo;ll actually pay,
              and meet the brands matched to how you sell.
            </p>

            <div className="hero__cta">
              <Link href="/match" className="btn btn--solid">Get your free samples</Link>
            </div>
          </div>

          <Link href="/#collection" className="hero__photo" aria-label="Browse Gyeol in the collection">
            <img src="/img/hero.jpg" alt="Peptide ampoule with eucalyptus on linen" loading="eager" fetchPriority="high" />
            <span className="hero__cap"><span>Gyeol</span><span className="hero__arrow">→</span></span>
          </Link>
        </div>

        <div className="wrap">
          <ul className="pillars" data-reveal>
            <li><span className="pillars__n">1 unit</span><p><b>Sample anything.</b> Every product, from a single unit — at wholesale, not retail.</p></li>
            <li><span className="pillars__n">{FREE_SHIPPING_SKUS} SKUs</span><p><b>Ships complimentary.</b> Mix any {FREE_SHIPPING_SKUS} products across brands and shipping is on us.</p></li>
            <li><span className="pillars__n">Matched</span><p><b>Brands that fit.</b> Aligned to your channel, market, margins and documentation needs.</p></li>
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
          <div className="brands__grid" data-reveal>
            <div className="brands__mood">
              <figure><img src="/img/brand-pink.jpg" alt="K-beauty skincare set" loading="lazy" /><figcaption>K-Beauty icons</figcaption></figure>
              <figure><img src="/img/brand-set.jpg" alt="Minimal skincare line" loading="lazy" /><figcaption>Hidden gems</figcaption></figure>
            </div>
            <ul className="brandwall">
              {BRANDS.map((b) => (
                <li key={b.id}>
                  <span className={`eyebrow tier ${b.tier === "gem" ? "tier--gem" : ""}`}>{b.tier === "icon" ? "K-Beauty icon" : "Hidden gem"}</span>
                  <span className="serif">{b.name}</span>
                  <span className="muted small">{b.tagline}</span>
                  <div className="brandwall__meta"><span>{b.city} · est. {b.founded}</span><span>MOQ <b>{b.moq}</b></span></div>
                </li>
              ))}
            </ul>
          </div>
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
