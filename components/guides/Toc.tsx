"use client";

import { useEffect, useState } from "react";

/** Table of contents that marks the section currently in view. */
export default function Toc({ items, ctaPrefix }: { items: { id: string; label: string }[]; ctaPrefix: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <ol className="toc">
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined} data-cta-id={`${ctaPrefix}_toc`}>{i.label}</a>
        </li>
      ))}
    </ol>
  );
}
