"use client";

import { selectInquiryType } from "@/components/conversion/QuickInquiryForm";

/** Jumps to the page's inquiry form with its "What's it about?" already set, e.g. to Exclusivity. */
export default function InquiryTypeLink({ type, href, className, ctaId, children }: { type: string; href: string; className?: string; ctaId: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} onClick={() => selectInquiryType(type)} data-cta-id={ctaId}>
      {children}
    </a>
  );
}
