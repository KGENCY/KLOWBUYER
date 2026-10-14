"use client";

import { useSamples } from "@/components/SampleBox";

/** Add / remove one product from the sample box (partner-brand products only). */
export default function SampleToggle({ id, ctaId, className = "link small" }: { id: string; ctaId: string; className?: string }) {
  const { has, toggle } = useSamples();
  const added = has(id);
  return (
    <button type="button" className={className} aria-pressed={added} onClick={() => toggle(id)} data-cta-id={ctaId}>
      {added ? "In your sample box ✓" : "Add to sample box"}
    </button>
  );
}
