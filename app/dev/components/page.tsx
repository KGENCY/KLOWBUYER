import type { Metadata } from "next";
import { ABOUT_LINKS } from "@/content/nav";
import { leadMagnetsById } from "@/content/leadMagnets";
import type { CtaVariant } from "@/content/cta";
import MediaFrame from "@/components/media/MediaFrame";
import MediaVideo from "@/components/media/MediaVideo";
import { ILLUSTRATIONS } from "@/components/media/Illustration";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import LeadMagnetCard from "@/components/conversion/LeadMagnetCard";
import ContextCTA from "@/components/conversion/ContextCTA";
import LockedPrice from "@/components/conversion/LockedPrice";
import WhatsAppButton from "@/components/conversion/WhatsAppButton";
import FaqSection from "@/components/faq/FaqSection";
import SectionHeader from "@/components/section/SectionHeader";
import SubTabs from "@/components/section/SubTabs";
import InfoTable from "@/components/section/InfoTable";
import StepFlow from "@/components/section/StepFlow";
import RelatedPageCards from "@/components/section/RelatedPageCards";
import ExitPreviewButton from "./ExitPreviewButton";

export const metadata: Metadata = {
  title: "Components — KLOW Wholesale (dev)",
  robots: { index: false, follow: false },
};

const TOKENS = [
  ["--bg", "Page background"], ["--bg-2", "Image frames"], ["--surface", "Raised sections"], ["--card", "Cards, inputs"],
  ["--ink", "Text, buttons"], ["--ink-2", "Body copy"], ["--muted", "Secondary text"], ["--line", "Borders"],
  ["--line-2", "Inner rules"], ["--accent", "Green: notice bar, accents"], ["--accent-ink", "Text on green"], ["--sand", "Tier dot"],
] as const;

const VARIANTS: { variant: CtaVariant; text: string }[] = [
  { variant: "quote", text: "Shipping a full order? Get the landed cost before you commit." },
  { variant: "sample", text: "Try any product from one unit, at its wholesale price." },
  { variant: "signup", text: "See verified brands and bulk pricing." },
  { variant: "inquiry", text: "Not sure where to start? Ask our team." },
];

/** One labelled demo block. */
function Demo({ name, note, children }: { name: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="devc__demo">
      <div className="devc__name">
        <code>{name}</code>
        {note && <span>{note}</span>}
      </div>
      {children}
    </div>
  );
}

/** Every shared component in every state, for design review. Not indexed by search engines. */
export default function ComponentsPreview() {
  const [magnet] = leadMagnetsById(["mexico-import-checklist"]);
  return (
    <div className="devc">
      <section className="section about-sec">
        <div className="wrap">
          <SectionHeader number="00" label="Dev preview" title="Shared components." subtitle="Every state, one page." description="Design-only previews. Forms don't send anything; this page is noindex." as="h1" />
        </div>
      </section>

      <section className="section about-sec">
        <div className="wrap">
          <SectionHeader number="01" label="Tokens" title="Colours" description="Defined once on :root in app/globals.css. --muted was darkened to pass 4.5:1 on every background." />
          <ul className="devc__swatches">
            {TOKENS.map(([v, use]) => (
              <li key={v}>
                <i style={{ background: `var(${v})` }} />
                <code>{v}</code>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-sec">
        <div className="wrap devc__stack">
          <SectionHeader number="02" label="Section" title="Section building blocks" />
          <Demo name="SectionHeader" note="number · label · title · subtitle · badge · description">
            <SectionHeader number="01" label="Shipping options" title="Three ways to ship." subtitle="Free at 5 SKUs." badge="Samples ship free at 5 SKUs" description="Samples go by express courier. Wholesale orders go by air or sea, quoted per order." />
          </Demo>
          <Demo name="SubTabs" note="current page = aria-current; none is current here">
            <SubTabs links={ABOUT_LINKS} label="About KLOW (preview)" />
          </Demo>
          <Demo name="InfoTable">
            <InfoTable rows={[
              { key: "company", label: "Company", value: "Welkit Inc. (주식회사 웰킷)" },
              { key: "registration", label: "Business registration No.", value: "634-81-04211" },
              { key: "warehouse", label: "Warehouse", value: "[WAREHOUSE ADDRESS]" },
            ]} />
          </Demo>
          <Demo name="StepFlow" note="vertical below 860px">
            <StepFlow steps={[
              { title: "Sample from 1 unit", description: "Any product, one unit, at its wholesale price." },
              { title: "Free shipping at 5 SKUs", description: "Mix any five products across brands." },
              { title: "Reorder at MOQ", description: "A lower unit price once something sells." },
              { title: "Bulk quote", description: "Prices, lead time and landed cost in one reply." },
            ]} />
          </Demo>
          <Demo name="RelatedPageCards" note="2 or 3 cards">
            <RelatedPageCards ctaPrefix="dev_related" headingLevel="h3" cards={[
              { key: "shipping", href: "/shipping", title: "Shipping", description: "Free at 5 SKUs, dispatch times, duties and documents." },
              { key: "ordering", href: "/ordering-payment", title: "Ordering & Payment", description: "From a one-unit sample to MOQ reorders and bulk quotes." },
              { key: "faq", href: "/faq", title: "FAQ", description: "Authenticity, shipping, minimums and payment." },
            ]} />
          </Demo>
        </div>
      </section>

      <section className="section about-sec">
        <div className="wrap devc__stack">
          <SectionHeader number="03" label="Media" title="MediaFrame — every drawing" description="Shown whenever an image has no src. The caption is the drawing's name." />
          <div className="devc__grid devc__grid--4">
            {ILLUSTRATIONS.map((name) => (
              <MediaFrame key={name} alt={`Placeholder drawing: ${name}`} caption={name} fallback={name} ratio="4 / 3" fit={name === "world-routes" ? "contain" : "cover"} />
            ))}
          </div>
          <Demo name="MediaVideo" note="16:9 · 9:16 · 1:1 — no src yet, so they show 'coming soon' and don't play">
            <div className="devc__videos">
              <MediaVideo ratio="16:9" title="Warehouse tour" caption="16:9" />
              <MediaVideo ratio="9:16" title="Brand reel" caption="9:16" />
              <MediaVideo ratio="1:1" title="Product close-up" caption="1:1" />
            </div>
          </Demo>
        </div>
      </section>

      <section className="section about-sec">
        <div className="wrap devc__stack">
          <SectionHeader number="04" label="Conversion" title="Lead capture" description="Priority: bulk quote > sample > sign-up > download > inquiry." />
          <Demo name="QuickInquiryForm" note="default · sent">
            <div className="devc__grid devc__grid--2">
              <QuickInquiryForm ctaId="dev_inquiry" />
              <QuickInquiryForm ctaId="dev_inquiry_sent" defaultState="sent" />
            </div>
          </Demo>
          <Demo name="LeadMagnetCard" note="default · sent">
            <div className="devc__grid devc__grid--3">
              {magnet && <LeadMagnetCard magnet={magnet} ctaId="dev_lead" />}
              {magnet && <LeadMagnetCard magnet={magnet} ctaId="dev_lead_sent" defaultState="sent" />}
            </div>
          </Demo>
          <Demo name="LockedPrice" note="isLoggedIn false · true">
            <div className="devc__grid devc__grid--2">
              <LockedPrice sample={11.3} moq={9.8} moqUnits={48} isLoggedIn={false} ctaId="dev_price_signin" />
              <LockedPrice sample={11.3} moq={9.8} moqUnits={48} isLoggedIn ctaId="dev_price_signin_after" />
            </div>
          </Demo>
          {(["light", "dark"] as const).map((tone) => (
            <Demo key={tone} name={`ContextCTA — tone "${tone}"`} note="quote · sample · signup · inquiry">
              <div className="devc__ctas">
                {VARIANTS.map((v) => <ContextCTA key={v.variant} id={`dev_${tone}`} variant={v.variant} text={v.text} tone={tone} />)}
              </div>
            </Demo>
          ))}
          <Demo name="WhatsAppButton" note="fixed bottom-end on every page; shown in place here">
            <div className="devc__wa"><WhatsAppButton /></div>
          </Demo>
          <Demo name="ExitIntentModal" note="desktop only, once per session — this button skips those rules">
            <ExitPreviewButton />
          </Demo>
        </div>
      </section>

      <FaqSection
        category="about"
        id="dev-faq"
        head={{ number: "05", label: { en: "FaqSection" }, title: { en: "category=\"about\"" }, subtitle: { en: "withSchema={false}" } }}
        ctaPrefix="dev_faq"
        withSchema={false}
      />
    </div>
  );
}
