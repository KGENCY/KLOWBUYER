"use client";

import { usePathname } from "next/navigation";
import { brandsOfType } from "@/content/brands";
import WhatsAppButton from "./WhatsAppButton";
import ExitIntentModal from "./ExitIntentModal";

const PAGES = ["/about", "/shipping", "/ordering-payment", "/faq", "/guides"];
const PARTNERS = new Set(brandsOfType("partner").map((b) => `/brands/${b.slug}`));

/** New pages only (About group, guides, brand pages): the landing and older pages keep their original design. */
const isNewPage = (path: string) =>
  PAGES.some((p) => path === p || path.startsWith(`${p}/`)) || path.endsWith("/wholesale") || PARTNERS.has(path);

/** WhatsApp button and exit-intent offer on the new pages. */
export default function GlobalConversion() {
  const path = usePathname();
  if (!isNewPage(path)) return null;
  return (
    <>
      <ExitIntentModal />
      <WhatsAppButton />
    </>
  );
}
