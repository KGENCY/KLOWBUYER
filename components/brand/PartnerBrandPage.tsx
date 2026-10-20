import Link from "next/link";
import { t } from "@/content/i18n";
import { majorsListing, type BrandProfile } from "@/content/brands";
import { marginPct } from "@/content/products";
import type { LeadMagnet } from "@/content/leadMagnets";
import MediaFrame from "@/components/media/MediaFrame";
import MediaVideo from "@/components/media/MediaVideo";
import SectionHeader from "@/components/section/SectionHeader";
import InfoTable from "@/components/section/InfoTable";
import LeadMagnetCard from "@/components/conversion/LeadMagnetCard";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import BrandGallery from "./BrandGallery";
import InquiryTypeLink from "./InquiryTypeLink";
import BrandFaq from "./BrandFaq";
import BrandJsonLd from "./BrandJsonLd";
import { brandCta, brandPrefix, countryLabel, priceText, productsFor } from "./format";
import VideoStrip from "@/components/kb/VideoStrip";
import { KbBrandProducts, SampleRangeButton } from "@/components/kb/KbBrandProducts";
import { usd } from "@/components/kb/format";

const EXCLUSIVITY_TEXT = { open: "Open", taken: "Taken", ask: "Ask us" } as const;
const INQUIRY_TYPES = ["Sample", "Bulk order", "Exclusivity", "Other"];

/**
 * /brands/[slug] for a partner brand, laid out as on klow.kr: name and terms, the brand's videos,
 * then every product (sampled from 1 unit). Buyer info, story, assets and FAQ follow below.
 * Every section reads this brand's own data and disappears when that data is empty.
 */
export default function PartnerBrandPage({ brand }: { brand: BrandProfile }) {
  const products = productsFor(brand);
  const hero = products[0];
  const info = brand.buyerInfo;
  const shorts = brand.videos.filter((v) => v.ratio === "9:16");
  const [, storyImg, ...rest] = brand.images;
  const galleryImages = rest.slice(0, 9);
  const majors = majorsListing(brand);
  const margin = hero ? marginPct(hero) : null;
  const samples = products.filter((p) => p.category !== "Accessories").map((p) => p.samplePrice).filter((n): n is number => n != null);
  const sampleIds = products.filter((p) => p.samplePrice != null).map((p) => p.id);
  const lo = Math.min(...samples);
  const hi = Math.max(...samples);
  const facts = [
    brand.origin && { k: "From", v: brand.origin },
    brand.openingOrder && { k: "Opening order", v: `${brand.openingOrder} units per SKU` },
    brand.retailMultiple && { k: "Avg. retail multiple", v: `${brand.retailMultiple}× wholesale` },
    !!samples.length && { k: "Sample price", v: lo === hi ? `${usd(lo)} · 1 unit` : `${usd(lo)} – ${usd(hi)} · 1 unit` },
  ].filter((r): r is { k: string; v: string } => !!r);

  const rows = [
    hero && {
      key: "margin",
      label: "Margin",
      value: `${margin ?? "[__]"}% at MSRP — ${priceText(hero.msrp)} MSRP vs ${priceText(hero.samplePrice)} sample${info.marginNote ? ` (${t(info.marginNote)})` : ""}`,
    },
    {
      key: "certs",
      label: "Certifications",
      value: info.certifications.length ? info.certifications.join(" · ") : "On request — ask the brand team for the documents your market needs",
    },
    !!brand.heroIngredients.length && { key: "actives", label: "Key ingredients", value: brand.heroIngredients.join(" · ") },
    !!info.readyMarkets.length && { key: "ready", label: "Ready markets", value: info.readyMarkets.map(countryLabel).join(" · ") },
    !!info.exclusivity.length && {
      key: "exclusivity",
      label: "Exclusivity",
      value: info.exclusivity.map((e) => `${countryLabel(e.country)} — ${EXCLUSIVITY_TEXT[e.status]}`).join(" · "),
    },
    !!info.marketingSupport.length && { key: "marketing", label: "Marketing support", value: info.marketingSupport.map((m) => t(m)).join(" · ") },
    !!info.proof.length && { key: "proof", label: "Proof", value: info.proof.map((p) => t(p)).join(" · ") },
  ].filter((r): r is { key: string; label: string; value: string } => !!r);

  const assetKit: LeadMagnet = {
    id: `${brand.slug}-asset-kit`,
    title: { en: `Get the ${brand.name} asset kit` },
    description: { en: "Product photos, short-form videos and copy you can use in your store and ads." },
    format: "PDF",
    tag: { en: brand.name },
    enabled: true,
  };

  return (
    <div className="kb brand-page">
      <BrandJsonLd brand={brand} />

      <article className="brand">
        <div className="wrap">
          <div className="pdp__bar">
            <Link href="/brands" className="pdp__back">← All brands</Link>
            {brand.tierLabel && <span className="eyebrow tier tier--gem">{brand.tierLabel}</span>}
          </div>

          {/* Name and promise on the left; terms and the two actions on the right */}
          <header className="brand__head">
            <div className="brand__id">
              <h1 className="brand__name">{brand.name}</h1>
              <p className="brand__intro">{t(brand.tagline)}</p>
              {!!brand.heroIngredients.length && (
                <ul className="brand__chips" aria-label="Key ingredients">
                  {brand.heroIngredients.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
            </div>
            <dl className="brand__facts">
              {facts.map((f) => (
                <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
              ))}
            </dl>
            <div className="brand__cta">
              {!!sampleIds.length && <SampleRangeButton ids={sampleIds} />}
              <a href="#ask" className="btn btn--ghost btn--plain" data-cta-id={brandCta(brand.slug, "hero", "ask")}>Ask the brand team</a>
            </div>
          </header>

          {!!brand.youtube?.length && <VideoStrip videos={brand.youtube} brandName={brand.name} />}

          {!!products.length && <KbBrandProducts products={products} brandName={brand.name} />}
        </div>
      </article>

      {/* Below the klow.kr layout: the rest of the brand page, in the About styles */}
      <div className="about">
      {/* Story */}
      {!!t(brand.story) && (
        <section className="section about-sec">
          <div className="wrap about-split pstory">
            <div>
              <SectionHeader label="Brand story" title={`Meet ${brand.name}.`} />
              <p className="pstory__text">{t(brand.story)}</p>
            </div>
            {storyImg && <MediaFrame src={storyImg.src} alt={t(storyImg.alt)} fallback={storyImg.fallback} ratio="3 / 4" />}
          </div>
        </section>
      )}

      {/* Gallery + short videos */}
      {(!!galleryImages.length || !!shorts.length) && (
        <section className="section about-sec">
          <div className="wrap">
            <SectionHeader label="Gallery" title={`${brand.name}, up close.`} />
            {!!galleryImages.length && (
              <BrandGallery
                images={galleryImages.map((i) => ({ src: i.src, alt: t(i.alt), fallback: i.fallback }))}
                ctaPrefix={brandPrefix(brand.slug, "gallery")}
              />
            )}
            {!!shorts.length && (
              <ul className="shorts" aria-label="Short videos">
                {shorts.map((v, i) => (
                  <li key={i}><MediaVideo src={v.src} poster={v.poster} ratio="9:16" title={t(v.title) || `${brand.name} video`} caption={t(v.title)} ctaId={brandCta(brand.slug, "gallery", `video_${i + 1}`)} /></li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}


      {/* Buyer info */}
      <section className="section about-sec">
        <div className="wrap about-split">
          <SectionHeader label="Buyer info" title="Will it sell, will it pay?" description={`What you need to decide on ${brand.name} — before you order.`} />
          <InfoTable rows={rows} />
        </div>
      </section>

      {/* Marketing assets */}
      {!!info.marketingSupport.length && (
        <section className="section about-sec">
          <div className="wrap">
            <SectionHeader label="Marketing assets" title="Ready for your store and ads." />
            <div className="passets">
              <ul className="passets__thumbs">
                {(brand.images.length ? brand.images : [{ alt: { en: `${brand.name} asset` }, fallback: "brand-placeholder" as const }]).slice(0, 4).map((img, i) => (
                  <li key={i}><MediaFrame src={img.src} alt={`${brand.name} marketing asset ${i + 1}`} fallback={img.fallback} ratio="1 / 1" /></li>
                ))}
              </ul>
              <LeadMagnetCard magnet={assetKit} ctaId={brandCta(brand.slug, "assets", "leadmagnet")} />
            </div>
          </div>
        </section>
      )}


      {/* Fits the same shelf as */}
      {!!majors.length && (
        <section className="section about-sec">
          <div className="wrap">
            <SectionHeader label="Fits the same shelf as" title={`Already stocking the big names?`} />
            <ul className="pshelf">
              {majors.map((m) => (
                <li key={m.slug}>
                  <p>Stocking {m.name}? <b>{brand.name} fits the same shelf.</b></p>
                  <Link href={`/brands/${m.slug}/wholesale`} className="link small" data-cta-id={brandCta(brand.slug, "shelf", m.slug)}>
                    {m.name} wholesale →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ + inquiry */}
      <section id="ask" className="section about-sec about-inquiry">
        <div className="wrap about-split">
          <div>
            <BrandFaq
              brand={brand}
              title={brand.faq.length ? `${brand.name} questions.` : `Questions about ${brand.name}?`}
              ctaPrefix={brandPrefix(brand.slug, "faq")}
            />
          </div>
          <QuickInquiryForm
            ctaId={brandCta(brand.slug, "ask", "inquiry")}
            title={`Ask about ${brand.name}`}
            lede="Samples, bulk orders or exclusivity in your country — we reply within 24h."
            inquiryTypes={INQUIRY_TYPES}
          />
        </div>
      </section>
      </div>
    </div>
  );
}
