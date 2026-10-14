/** The About group: header dropdown, the tab bar on each of these pages, and the footer column. */
export const ABOUT_LINKS = [
  { href: "/about", label: "About KLOW" },
  { href: "/shipping", label: "Shipping" },
  { href: "/ordering-payment", label: "Ordering & Payment" },
  { href: "/faq", label: "FAQ" },
] as const;

/** Where "contact us" goes until there is a dedicated page: the inquiry form on /about. */
export const CONTACT_HREF = "/about#contact";
