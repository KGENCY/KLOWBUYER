import { t } from "@/content/sections";
import StepFlow from "@/components/section/StepFlow";
import { SectionAddons, SectionHead, type SectionProps } from "../parts";

/** Steps joined by a thin rule: across on desktop, down on mobile. */
export default function StepsSection({ s, locale }: SectionProps) {
  return (
    <section id={s.id} className="section about-sec">
      <div className="wrap">
        <SectionHead s={s} locale={locale} />
        <StepFlow steps={(s.items ?? []).map((it) => ({ title: t(it.title, locale), description: it.description && t(it.description, locale) }))} />
        <SectionAddons s={s} locale={locale} />
      </div>
    </section>
  );
}
