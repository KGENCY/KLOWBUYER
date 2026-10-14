"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ABOUT_LINKS } from "@/content/nav";

/** The same tab bar on every About-group page, marking the current one. */
export default function AboutTabs() {
  const path = usePathname();
  return (
    <nav className="subnav" aria-label="About KLOW">
      <div className="wrap subnav__in">
        {ABOUT_LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={l.href === path ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
