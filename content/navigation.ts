/**
 * Site navigation: header menus, mobile menu, footer columns and languages.
 * Components only render this data, so an admin can later edit menus as JSON.
 * Brand lists here are temporary (to be linked to content/brands.ts later).
 */
import type { CtaLink, Locale, LocalizedText, MediaImage } from "@/types/content";
import { t } from "./i18n";
import { brandHref, brandsOfType, featuredPartners } from "./brands";

/* ───────────── Types ───────────── */

export interface NavLink {
  id: string;
  label: LocalizedText;
  /** Where it goes. Leave empty when `action` is set. */
  href?: string;
  /** Opens an on-page tool instead of navigating. */
  action?: "requestBrand";
  /** One line under the label (compact menus). */
  description?: LocalizedText;
  /** Small tag beside the label, e.g. "Only on KLOW". */
  badge?: LocalizedText;
  enabled: boolean;
  order: number;
}

export interface NavColumn {
  id: string;
  heading: LocalizedText;
  /** Short helper line under the heading. */
  note?: LocalizedText;
  links: NavLink[];
  /** "All … →" link at the bottom of the column. */
  more?: NavLink;
  /** Show the first link as a highlighted card (e.g. the latest report). */
  featureFirst?: boolean;
}

export type NavAside =
  | {
      type: "brandCards";
      cards: { id: string; name: LocalizedText; tagline: LocalizedText; href: string; image: MediaImage; cta: LocalizedText; badge?: LocalizedText }[];
    }
  | { type: "leadMagnet"; magnetId: string }
  | { type: "contact"; title: LocalizedText; link: CtaLink; whatsapp: CtaLink };

interface NavBase {
  id: string;
  label: LocalizedText;
  enabled: boolean;
  order: number;
  /** URL prefixes that make this item the current section (shown as active). */
  match?: string[];
}

export type NavItem =
  | (NavBase & { type: "link"; href?: string; action?: "requestBrand" })
  | (NavBase & {
      type: "menu";
      /** wide: columns + aside in a full-width panel. compact: one list with descriptions + aside. */
      size: "wide" | "compact";
      columns: NavColumn[];
      aside?: NavAside;
      /** Thin band along the bottom of the panel. With no href, the link opens the request-a-brand drawer. */
      footer?: { text: LocalizedText; label: LocalizedText; ctaId: string; href?: string };
    });

export interface Language {
  code: Locale;
  /** Short label, e.g. "EN". */
  label: string;
  /** Name in its own language. */
  name: string;
  enabled: boolean;
}

/* ───────────── Contact ───────────── */

/** Fill in to make WhatsApp links open a chat (digits only, with country code). */
export const WHATSAPP_NUMBER = ""; // [NUMBER]
/** Where "contact us" goes: the contact section on /about. */
export const CONTACT_HREF = "/about#contact";
/** WhatsApp chat link once the number is set; the contact section until then. */
export const whatsappHref = () => (WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : CONTACT_HREF);

/* ───────────── Languages ───────────── */

export const LANGUAGES: Language[] = [
  { code: "en", label: "EN", name: "English", enabled: true },
  { code: "es", label: "ES", name: "Español", enabled: false },
  { code: "ru", label: "RU", name: "Русский", enabled: false },
  { code: "ar", label: "AR", name: "العربية", enabled: false },
];

/* ───────────── Header ───────────── */

const link = (id: string, en: string, href: string, order: number, extra: Partial<NavLink> = {}): NavLink => ({
  id, label: { en }, href, enabled: true, order, ...extra,
});

const ONLY_ON_KLOW: LocalizedText = { en: "Only on KLOW" };

export const NAV: NavItem[] = [
  { id: "collection", type: "link", label: { en: "Collection" }, href: "/#collection", enabled: true, order: 0 },
  {
    id: "brands",
    type: "menu",
    size: "wide",
    label: { en: "Brands" },
    enabled: true,
    order: 1,
    match: ["/brands"],
    // Brand lists come from content/brands.ts — add or reorder brands there, not here.
    columns: [
      {
        id: "popular",
        heading: { en: "Popular K-beauty" },
        note: { en: "Wholesale at MOQ, shipped from Korea" },
        links: brandsOfType("major").slice(0, 8).map((b, i) => link(b.slug, b.name, brandHref(b), i)),
        more: link("popular-all", "All popular brands", "/brands?filter=popular", 99),
      },
      {
        id: "new",
        heading: { en: "Discover new brands" },
        note: { en: "Partner brands, sample from 1 unit" },
        links: brandsOfType("partner").slice(0, 8).map((b, i) =>
          link(b.slug, b.name, brandHref(b), i, b.flags.onlyOnKlow ? { badge: ONLY_ON_KLOW } : {})),
        more: link("new-all", "All new brands", "/brands?filter=new", 99),
      },
      {
        id: "browse",
        heading: { en: "Browse by" },
        links: [
          link("skincare", "Skincare", "/brands?category=skincare", 0),
          link("sun-care", "Sun care", "/brands?category=sun-care", 1),
          link("makeup", "Makeup", "/brands?category=makeup", 2),
          link("ingredient", "By ingredient", "/brands#ingredients", 3),
          link("a-z", "All brands A–Z", "/brands", 4),
        ],
      },
    ],
    aside: {
      type: "brandCards",
      cards: featuredPartners(2).map((b) => ({
        id: b.slug,
        name: { en: b.name },
        tagline: { en: "No MOQ. Sample from 1 unit." },
        href: brandHref(b),
        cta: { en: "View brand" },
        badge: b.flags.onlyOnKlow ? ONLY_ON_KLOW : undefined,
        image: b.images[0] ?? { alt: { en: `${b.name} K-beauty products, available wholesale on KLOW` }, fallback: "brand-placeholder" },
      })),
    },
    footer: { text: { en: "Can’t find a brand?" }, label: { en: "Request a brand" }, ctaId: "nav_brands_request" },
  },
  {
    id: "guides",
    type: "menu",
    size: "wide",
    label: { en: "Guides" },
    enabled: true,
    order: 2,
    match: ["/guides"],
    columns: [
      {
        id: "import",
        heading: { en: "Import guides" },
        links: [
          link("mexico", "Mexico", "/guides/import/mexico", 0),
          link("kazakhstan", "Kazakhstan", "/guides/import/kazakhstan", 1),
          link("uae", "UAE", "/guides/import/uae", 2),
          link("colombia", "Colombia", "/guides/import/colombia", 3),
        ],
        more: link("import-all", "All countries", "/guides/import", 99),
      },
      {
        id: "trends",
        heading: { en: "Trends" },
        featureFirst: true,
        links: [
          link("trend-report", "Korea Trend Report – [Month Year]", "/guides/trends/korea-trend-report", 0, {
            description: { en: "What’s selling in Korea this month, and why." },
          }),
        ],
        more: link("trends-all", "All reports", "/guides/trends", 99),
      },
      {
        id: "ingredients",
        heading: { en: "Ingredients & categories" },
        links: [
          link("pdrn", "PDRN", "/guides/ingredients/pdrn", 0),
          link("heartleaf", "Heartleaf", "/guides/ingredients/heartleaf", 1),
          link("retinal", "Retinal", "/guides/ingredients/retinal", 2),
          link("korean-sunscreen", "Korean sunscreen", "/guides/ingredients/korean-sunscreen", 3),
        ],
        more: link("ingredients-all", "All guides", "/guides/ingredients", 99),
      },
    ],
    aside: { type: "leadMagnet", magnetId: "wholesale-price-list" },
  },
  { id: "match", type: "link", label: { en: "Find my brands" }, href: "/match", enabled: true, order: 3, match: ["/match"] },
  { id: "request", type: "link", label: { en: "Request a brand" }, action: "requestBrand", enabled: true, order: 4 },
  {
    id: "about",
    type: "menu",
    size: "compact",
    label: { en: "About" },
    enabled: true,
    order: 5,
    match: ["/about", "/shipping", "/ordering-payment", "/faq"],
    columns: [
      {
        id: "about",
        heading: { en: "About KLOW" },
        links: [
          link("about", "About KLOW", "/about", 0, { description: { en: "Who we are, our warehouse, company details" } }),
          link("shipping", "Shipping", "/shipping", 1, { description: { en: "Delivery times, Incoterms, documents" } }),
          link("ordering", "Ordering & Payment", "/ordering-payment", 2, { description: { en: "Samples, MOQ reorders, bulk quotes, payment" } }),
          link("faq", "FAQ", "/faq", 3, { description: { en: "Answers to the questions buyers ask first" } }),
        ],
      },
    ],
    aside: {
      type: "contact",
      title: { en: "Questions?" },
      link: { label: { en: "Ask our team" }, href: CONTACT_HREF, ctaId: "nav_about_inquiry" },
      whatsapp: { label: { en: "Chat on WhatsApp" }, href: whatsappHref(), ctaId: "nav_about_whatsapp" },
    },
  },
];

/** The About group pages (tab bar on those pages, footer Company column). */
export const ABOUT_LINKS = (NAV.find((n) => n.id === "about") as Extract<NavItem, { type: "menu" }>).columns[0].links
  .filter((l) => l.enabled)
  .map((l) => ({ href: l.href!, label: t(l.label) }));

/** Bottom of the mobile menu. */
export const MOBILE_ACTIONS: { primary: CtaLink; whatsapp: CtaLink } = {
  primary: { label: { en: "Browse & sample" }, href: "/#collection", ctaId: "mnav_sample" },
  whatsapp: { label: { en: "WhatsApp" }, href: whatsappHref(), ctaId: "mnav_whatsapp" },
};

/* ───────────── Footer ───────────── */

export const FOOTER = {
  blurb: { en: "Korean beauty, sourced directly from the brands — for distributors, retailers and professionals worldwide." } as LocalizedText,
  columns: [
    {
      id: "shop",
      heading: { en: "Shop" },
      links: [
        link("collection", "Collection", "/#collection", 0),
        link("popular", "Popular K-beauty", "/brands?filter=popular", 1),
        link("new", "Discover new brands", "/brands?filter=new", 2),
        { id: "request", label: { en: "Request a brand" }, action: "requestBrand", enabled: true, order: 3 } as NavLink,
      ],
    },
    {
      id: "guides",
      heading: { en: "Guides" },
      links: [
        link("import", "Import guides", "/guides/import", 0),
        link("trends", "Trend reports", "/guides/trends", 1),
        link("ingredients", "Ingredients & categories", "/guides/ingredients", 2),
      ],
    },
    {
      id: "company",
      heading: { en: "Company" },
      links: [
        link("about", "About KLOW", "/about", 0),
        link("shipping", "Shipping", "/shipping", 1),
        link("ordering", "Ordering & Payment", "/ordering-payment", 2),
        link("faq", "FAQ", "/faq", 3),
        link("contact", "Contact", CONTACT_HREF, 4),
      ],
    },
  ] satisfies NavColumn[],
  newsletter: {
    heading: { en: "Newsletter" } as LocalizedText,
    title: { en: "Get the monthly Korea Trend Report" } as LocalizedText,
    note: { en: "One email a month. Unsubscribe anytime." } as LocalizedText,
    ctaId: "footer_newsletter_subscribe",
  },
  /** Bottom line, joined with " · ". */
  legal: [
    { en: "Welkit Inc." },
    { en: "Business Reg. No. 634-81-04211" },
    { en: "Gwanggyo, Suwon, Korea" },
    { en: "[EMAIL]" },
  ] as LocalizedText[],
};

/* ───────────── Helpers ───────────── */

export const visible = <T extends { enabled: boolean; order: number }>(list: T[]) =>
  list.filter((x) => x.enabled).sort((a, b) => a.order - b.order);

/** Whether a nav item is the section the current path belongs to. */
export const isActive = (item: NavItem, path: string) => !!item.match?.some((m) => path === m || path.startsWith(m + "/"));

/** Every linked label in the header and footer, for naming placeholder pages. */
function allLinks(): NavLink[] {
  const fromNav = NAV.flatMap((n) => (n.type === "menu" ? n.columns.flatMap((c) => [...c.links, ...(c.more ? [c.more] : [])]) : []));
  return [...fromNav, ...FOOTER.columns.flatMap((c) => c.links)];
}

/** The menu label for a path, e.g. "/guides/import/mexico" → "Mexico". */
export function navLabelFor(path: string): string | undefined {
  const hit = allLinks().find((l) => l.href === path);
  return hit && t(hit.label);
}
