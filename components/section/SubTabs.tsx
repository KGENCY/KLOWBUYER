"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Tab bar linking the pages of one group; the current page is marked with aria-current. */
export default function SubTabs({ links, label }: { links: readonly { href: string; label: string }[]; /** Accessible name of the nav. */ label: string }) {
  const path = usePathname();
  return (
    <nav className="subnav" aria-label={label}>
      <div className="wrap subnav__in">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={l.href === path ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
