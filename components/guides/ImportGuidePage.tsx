import Link from "next/link";
import { t } from "@/content/i18n";
import type { ImportGuide } from "@/content/guides";
import { leadMagnetsById } from "@/content/leadMagnets";
import { DIFFICULTY_TEXT, shippingCountries } from "@/content/shippingCountries";
import InfoTable from "@/components/section/InfoTable";
import LeadMagnetCard from "@/components/conversion/LeadMagnetCard";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import ArticleLayout from "./ArticleLayout";
import GuideSectionView from "./GuideSectionView";
import GuideJsonLd from "./GuideJsonLd";
import ProductPicks from "./ProductPicks";
import { pickCards } from "./pickCards";
import { relatedGuides } from "./related";
import { dateLabel, guideBrands, guideProducts, readMinutes } from "./match";

const DISCLAIMER = "Regulations change. Confirm current requirements with your customs broker or local regulator before shipping.";

/** /guides/import/[slug] — country import guide, ending in products ready for that market and a quote form. */
export default function ImportGuidePage({ guide }: { guide: ImportGuide }) {
  const country = t(guide.country);
  const p = `guide_import_${guide.slug.replace(/-/g, "_")}`;
  const ship = shippingCountries().find((c) => c.code === guide.countryCode);
  const [magnet] = leadMagnetsById(guide.leadMagnetId ? [guide.leadMagnetId] : []);
  const brands = guideBrands(guide);
  const products = pickCards(guideProducts(guide));
  const year = guide.updatedAt.slice(0, 4);
  const sec = (id: string) => guide.sections.find((s) => s.id === id);
  const crumbs = [
    { label: "Guides", href: "/guides" },
    { label: "Import guides", href: "/guides#import" },
    { label: country, href: `/guides/import/${guide.slug}` },
  ];

  const toc = [
    { id: "summary", label: "Summary" },
    ...guide.sections.filter((s) => ["requirements", "registration", "labeling", "duties"].includes(s.id)).map((s) => ({ id: s.id, label: t(s.heading) })),
    ...(ship ? [{ id: "shipping", label: "Shipping options" }] : []),
    ...(sec("what-sells") ? [{ id: "what-sells", label: t(sec("what-sells")!.heading) }] : []),
    ...(products.length ? [{ id: "ready", label: `Ready to sell in ${country}` }] : []),
    ...(guide.faq.length ? [{ id: "faq", label: "FAQ" }] : []),
    { id: "quote", label: "Get a quote" },
  ];

  return (
    <>
      <GuideJsonLd guide={guide} headline={`Importing Korean cosmetics to ${country}`} crumbs={crumbs} />
      <ArticleLayout
        crumbs={crumbs}
        label={`Import guide · ${year}`}
        title={`Importing Korean cosmetics to ${country}`}
        summary={t(guide.summary)}
        meta={`Updated ${dateLabel(guide.updatedAt)} · ${readMinutes(guide)} min read`}
        toc={toc}
        cta={{ title: `Shipping to ${country}?`, text: "Method, transit time and landed cost — or a DDP price, all in.", label: `Get a ${country} shipping quote`, href: "#quote", ctaId: `${p}_sidebar_quote` }}
        disclaimer={DISCLAIMER}
        related={relatedGuides(guide)}
        ctaPrefix={p}
        newsletterCtaId={`${p}_newsletter`}
      >
        <section id="summary" className="gsec">
          <h2 className="sr-only">Summary</h2>
          <InfoTable rows={[
            { key: "registration", label: "Registration", value: t(guide.registrationSummary) },
            { key: "labels", label: "Labeling language", value: t(guide.labelLanguage) },
            { key: "duties", label: "Typical duties", value: t(guide.dutiesNote) },
            { key: "delivery", label: "Delivery from Korea", value: ship ? t(ship.deliveryDays) : "[x–x] business days" },
            { key: "difficulty", label: "Difficulty", value: t(DIFFICULTY_TEXT[guide.difficulty]) },
          ]} />
        </section>

        {sec("requirements") && <GuideSectionView s={sec("requirements")!} />}
        {sec("registration") && <GuideSectionView s={sec("registration")!} />}
        {sec("labeling") && <GuideSectionView s={sec("labeling")!} />}

        {magnet && (
          <div className="gaside">
            <LeadMagnetCard magnet={{ ...magnet, title: { en: `${country} import checklist` } }} ctaId={`${p}_leadmagnet`} />
          </div>
        )}

        {sec("duties") && (
          <section id="duties" className="gsec">
            <h2>{t(sec("duties")!.heading)}</h2>
            <p>{t(sec("duties")!.body)}</p>
            <p className="gnote">New to importing? Choose <b>DDP</b> and we handle customs and duties to your door. <Link href="/shipping#terms" className="link small" data-cta-id={`${p}_duties_incoterms`}>Compare shipping terms →</Link></p>
          </section>
        )}

        {ship && (
          <section id="shipping" className="gsec">
            <h2>Shipping options</h2>
            <InfoTable rows={[
              { key: "method", label: "Recommended", value: t(ship.recommendedMethod) },
              { key: "days", label: "Estimated delivery", value: t(ship.deliveryDays) },
              { key: "samples", label: "Sample boxes", value: "Free shipping at 5+ SKUs (partner brands)" },
            ]} />
            <p><Link href="/shipping" className="link small" data-cta-id={`${p}_shipping_more`}>All shipping options →</Link></p>
          </section>
        )}

        {sec("what-sells") && <GuideSectionView s={sec("what-sells")!} />}

        {!!products.length && (
          <section id="ready" className="gsec gsec--wide">
            <h2>Ready to sell in {country}</h2>
            <p>{brands.length} brand{brands.length === 1 ? "" : "s"} already cleared for {country}. Partner brands sample from 1 unit; well-known brands are sold at MOQ.</p>
            <ProductPicks products={products} ctaPrefix={`${p}_ready`} />
          </section>
        )}

        {!!guide.faq.length && (
          <section id="faq" className="gsec">
            <h2>FAQ</h2>
            <div className="about-faq">
              {guide.faq.map((f, i) => (
                <details key={i} open={i === 0}>
                  <summary><h3>{t(f.question)}</h3><i aria-hidden /></summary>
                  <div className="about-faq__a"><p>{t(f.answer)}</p></div>
                </details>
              ))}
            </div>
          </section>
        )}

        <section id="quote" className="gsec">
          <QuickInquiryForm
            ctaId={`${p}_quote`}
            title={`Shipping to ${country}? Get a quote within 24h.`}
            lede="Products, labels and landed cost for your market."
            defaultCountry={guide.countryCode}
          />
        </section>
      </ArticleLayout>
    </>
  );
}
