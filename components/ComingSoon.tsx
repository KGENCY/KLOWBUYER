import type { Metadata } from "next";
import Link from "next/link";
import { navLabelFor } from "@/content/navigation";
import QuickInquiryForm from "@/components/conversion/QuickInquiryForm";
import SectionHeader from "@/components/section/SectionHeader";

/** Title for a placeholder page: an explicit one, the menu label for this path, or the last URL segment. */
export function comingSoonTitle(path: string, title?: string) {
  if (title) return title;
  const label = navLabelFor(path);
  if (label) return label;
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/** Placeholder pages are kept out of search results until they have real content. */
export function comingSoonMetadata(path: string, title?: string): Metadata {
  return {
    title: `${comingSoonTitle(path, title)} — coming soon | KLOW Wholesale`,
    robots: { index: false, follow: true },
  };
}

/**
 * Shared "coming soon" page for routes the menus already link to.
 * Still converts: the inquiry form asks what the buyer was looking for.
 */
export default function ComingSoon({ path, title, description }: { path: string; title?: string; description?: string }) {
  const heading = comingSoonTitle(path, title);
  const slug = path.split("/").filter(Boolean).join("_").replace(/-/g, "_") || "home";
  return (
    <div className="about">
      <section className="section about-sec soon">
        <div className="wrap about-split">
          <div>
            <SectionHeader label="Coming soon" title={heading} subtitle="This page is on its way." as="h1" />
            <p className="about-regions__body">
              {description ?? "We’re still putting this page together. Tell us what you were looking for and we’ll send it to you directly — usually within a day."}
            </p>
            <div className="about-links">
              <Link href="/samples" className="btn btn--solid" data-cta-id={`soon_${slug}_sample`}>Pick your samples</Link>
              <Link href="/about" className="link small" data-cta-id={`soon_${slug}_about`}>About KLOW</Link>
            </div>
          </div>
          <QuickInquiryForm ctaId={`soon_${slug}_inquiry`} title="Tell us what you need" lede={`Interested in ${heading}? Leave your details and we’ll reply within 24h.`} />
        </div>
      </section>
    </div>
  );
}
