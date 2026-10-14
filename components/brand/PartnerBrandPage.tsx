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
import PartnerProducts from "./PartnerProducts";
import SampleBlock from "./SampleBlock";
import InquiryTypeLink from "./InquiryTypeLink";
import BrandFaq from "./BrandFaq";
import BrandJsonLd from "./BrandJsonLd";
import { brandCta, brandPrefix, countryLabel, lowestSample, priceText, productsFor } from "./format";

const EXCLUSIVITY_TEXT = { open: "Open", taken: "Taken", ask: "Ask us" } as const;
const INQUIRY_TYPES = ["Sample", "Bulk order", "Exclusivity", "Other"];

/**
 * /brands/[slug] for a partner brand: image- and video-led, sampled from 1 unit.
 * Every section reads this brand's own data and disappears when that data is empty.
 */
export default function PartnerBrandPage({ brand }: { brand: BrandProfile }) {
  const products = productsFor(brand);
  const hero = products[0];
  const info = brand.buyerInfo;
  const film = brand.videos.find((v) => v.ratio === "16:9" && (v.src || v.poster));
  const shorts = brand.videos.filter((v) => v.ratio === "9:16");
  const [cover, storyImg, ...rest] = brand.images;
  const galleryImages = rest.slice(0, 9);
  const majors = majorsListing(brand);
  const margin = hero ? marginPct(hero) : null;

  const rows = [
    hero && {
      key: "margin",
      label: "Margin",
      value: `${margin ?? "[__]"}% at MSRP — ${priceText(hero.msrp)} MSRP vs ${priceText(hero.samplePrice)} sample${info.marginNote ? ` (${t(info.marginNote)})` : ""}`,
    },
    {
      key: "certs",
      label: "Certifications",
      value: info.certifications.length ? info.certifications.join(" · ") : "None yet — KLOW registration support available",
    },
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
    <div className="about brand-page">
      <BrandJsonLd brand={brand} />

      {/* Hero: full-width visual, name and badges over its bottom edge */}
      <section className="phero">
        <div className="phero__media">
          {film ? (
            <MediaVideo src={film.src} poster={film.poster} ratio="16:9" title={t(film.title) || `${brand.name} brand film`} />
          ) : (
            <MediaFrame src={cover?.src} alt={cover ? t(cover.alt) : `${brand.name} K-beauty products`} fallback={cover?.fallback ?? "brand-placeholder"} ratio="21 / 9" priority />
          )}
          <div className="phero__over">
            <h1 className="phero__title">
              {brand.name} <em>{t(brand.tagline)}</em>
            </h1>
            <ul className="phero__badges">
              {brand.flags.onlyOnKlow && <li>Only on KLOW</li>}
              {brand.flags.exclusiveOpen && <li>Exclusive territories open</li>}
              {brand.flags.sampleFromOne && <li>Sample from 1 unit</li>}
            </ul>
          </div>
        </div>
        <div className="wrap phero__cta">
          {!!products.length && (
            <a href="#products" className="btn btn--solid" data-cta-id={brandCta(brand.slug, "hero", "sample")}>
              Sample from {lowestSample(brand)}
            </a>
          )}
          {brand.flags.exclusiveOpen && (
            <InquiryTypeLink type="Exclusivity" href="#ask" className="link small" ctaId={brandCta(brand.slug, "hero", "exclusivity")}>
              Ask about exclusivity
            </InquiryTypeLink>
          )}
        </div>
      </section>

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

      {/* Hero products */}
      {!!products.length && (
        <section id="products" className="section about-sec">
          <div className="wrap">
            <SectionHeader label="Hero products" title="Sample from 1 unit, at wholesale price." description="Mix any 5 products across brands and shipping is on us." />
            <PartnerProducts
              ctaPrefix={brandPrefix(brand.slug, "products")}
              products={products.slice(0, 6).map((p) => ({
                id: p.id,
                name: p.name,
                volume: p.volume,
                heroIngredient: p.heroIngredient,
                image: { src: p.images[0]?.src, alt: p.images[0] ? t(p.images[0].alt) : p.name, fallback: p.images[0]?.fallback ?? "product-bottle" },
                sample: priceText(p.samplePrice),
                msrp: priceText(p.msrp),
                margin: marginPct(p),
              }))}
            />
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

      {/* Sample block */}
      {brand.flags.sampleFromOne && !!products.length && (
        <section className="section about-sec">
          <div className="wrap">
            <SampleBlock
              slug={brand.slug}
              brandName={brand.name}
              products={products.slice(0, 4).map((p) => ({ id: p.id, name: p.name, sample: priceText(p.samplePrice) }))}
              ctaPrefix={brandPrefix(brand.slug, "sampleblock")}
            />
          </div>
        </section>
      )}

      {/* Fits the same shelf as */}
      {!!majors.length && (
        <section className="section about-sec">
          <div className="wrap">
            <SectionHeader label="Fits the same shelf as" title={`Already stocking the big names?`} />
            <ul className="shelf">
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
  );
}
