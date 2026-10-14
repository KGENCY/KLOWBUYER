"use client";

import { useState } from "react";
import Link from "next/link";
import { t, type LocalizedText } from "@/content/i18n";
import { FAQ_CATEGORIES, faqsFor, featuredFaqs, type FaqItem } from "@/content/faq";
import { faqPage } from "@/content/faqPage";
import SectionHeader from "@/components/section/SectionHeader";
import FaqSection from "./FaqSection";
import { faqAnchor } from "./FaqList";

const catAnchor = (id: string) => `faq-${id}`;
const plural = (n: number, one: LocalizedText, many: LocalizedText) => (n === 1 ? t(one) : t(many).replace("{n}", String(n)));

/**
 * The searchable part of /faq: hero with search + category links, popular question cards,
 * then every category from content/faq.ts. Search filters questions and answers on the page only.
 * No FAQPage schema here — each question's own page outputs it.
 */
export default function FaqHub() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const matches = (f: FaqItem) => !query || `${t(f.question)} ${t(f.answer)}`.toLowerCase().includes(query);
  const groups = FAQ_CATEGORIES.map((c, i) => ({ c, i, items: faqsFor(c.id).filter(matches) }));
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  /** Popular card → clear any search, open that question and bring it into view. */
  const openQuestion = (id: string) => {
    setQ("");
    requestAnimationFrame(() => {
      const el = document.getElementById(faqAnchor(id)) as HTMLDetailsElement | null;
      if (!el) return;
      el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.querySelector("summary")?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <section className="about-hero faq-hero">
        <div className="wrap about-hero__grid about-hero__grid--solo">
          <div>
            <span className="eyebrow eyebrow--accent about-hero__label">{t(faqPage.hero.label)}</span>
            <h1 className="hero__title">{t(faqPage.hero.title)}</h1>
            <p className="hero__lede">{t(faqPage.hero.body)}</p>

            <div className="faq-search" role="search">
              <label className="sr-only" htmlFor="faq-search">{t(faqPage.hero.searchLabel)}</label>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden className="faq-search__icon">
                <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 13l5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <input
                id="faq-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t(faqPage.hero.searchPlaceholder)}
                autoComplete="off"
                data-cta-id="faq_search"
              />
            </div>
            <p className="faq-search__status" aria-live="polite">
              {query && total > 0 && plural(total, faqPage.hero.resultsOne, faqPage.hero.resultsMany)}
              {query && total === 0 && (
                <>
                  {t(faqPage.hero.noMatches)}{" "}
                  <a href="#ask" className="link" data-cta-id="faq_search_ask">{t(faqPage.hero.askTeam)}</a>
                </>
              )}
            </p>

            <nav className="faq-chips" aria-label="FAQ categories">
              {FAQ_CATEGORIES.map((c) => (
                <a key={c.id} href={`#${catAnchor(c.id)}`} data-cta-id={`faq_chip_${c.id}`}>{t(c.label)}</a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {!query && (
        <section className="section about-sec faq-popular">
          <div className="wrap">
            <SectionHeader label={t(faqPage.popular.label)} />
            <ul className="faq-popular__grid">
              {featuredFaqs().map((f) => (
                <li key={f.id}>
                  <button type="button" onClick={() => openQuestion(f.id)} data-cta-id={`faq_popular_${f.id.replace(/-/g, "_")}`}>
                    <span className="eyebrow">{t(FAQ_CATEGORIES.find((c) => c.id === f.category)!.label)}</span>
                    <span className="faq-popular__q">{t(f.question)}</span>
                    <span className="faq-popular__go">{t(faqPage.popular.readAnswer)} →</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {groups.map(({ c, i, items }) => (
        <FaqSection
          key={c.id}
          category={c.id}
          id={catAnchor(c.id)}
          items={items}
          openAll={!!query}
          withSchema={false}
          head={{ number: String(i + 1).padStart(2, "0"), label: { en: plural(items.length, faqPage.countOne, faqPage.countMany) }, title: c.label }}
          description={t(c.description)}
          ctaPrefix={`faq_${c.id}`}
          footer={
            <Link href={c.href} className="link small" data-cta-id={`faq_more_${c.id}`}>
              {t(faqPage.moreLabel).replace("{label}", t(c.label))}
            </Link>
          }
        />
      ))}
    </>
  );
}
