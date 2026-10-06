import { BuyerType, FREE_SHIPPING_SKUS, SAMPLE_SHIPPING_FEE, brandById, productById } from "./data";

/* ───────────── Types ───────────── */

export type Currency = "USD" | "KRW";
export type SalesChannel = "offline" | "amazon_us" | "amazon_eu" | "own_store" | "tiktok" | "shopee" | "etc";
export type OrderStatus = "requested" | "confirmed" | "shipped" | "delivered";

export interface Buyer {
  id: string;
  name: string;
  email: string;
  dial: string;
  phone: string;
  country: string; // iso2
  company: string;
  businessType: BuyerType;
  currency: Currency;
  channels: SalesChannel[];
  interestedBrands: string[]; // brand ids
  referral?: string;
  certFileName?: string;
  storePhotoName?: string;
  website?: string;
  verifiedAt: number;
  createdAt: number;
}

export interface ShipTo {
  country: string;
  company: string;
  name: string;
  note?: string;
}

export interface SampleOrder {
  id: string;
  items: string[]; // product ids, 1 unit each
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  placedAt: number;
  shipTo: ShipTo;
  card: string; // masked
  tracking?: string;
}

/* ───────────── Constants ───────────── */

export const COUNTRIES: { code: string; name: string; dial: string }[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "KR", name: "South Korea", dial: "+82" },
];

export const countryName = (code: string) => COUNTRIES.find((c) => c.code === code)?.name ?? code;

export const ONLINE_CHANNELS: { value: SalesChannel; label: string }[] = [
  { value: "amazon_us", label: "Amazon US" },
  { value: "amazon_eu", label: "Amazon EU" },
  { value: "own_store", label: "Company's online store" },
  { value: "tiktok", label: "TikTok Shop" },
  { value: "shopee", label: "Shopee / Lazada" },
];

export const CHANNEL_LABEL: Record<SalesChannel, string> = {
  offline: "Offline store",
  amazon_us: "Amazon US",
  amazon_eu: "Amazon EU",
  own_store: "Company's online store",
  tiktok: "TikTok Shop",
  shopee: "Shopee / Lazada",
  etc: "Other",
};

export const STATUS_ORDER: OrderStatus[] = ["requested", "confirmed", "shipped", "delivered"];

export const ORDER_STATUS: Record<OrderStatus, { label: string; note: string }> = {
  requested: { label: "Requested", note: "Payment received. Brands are confirming stock." },
  confirmed: { label: "Confirmed", note: "Every brand confirmed. Samples are being packed in Seoul." },
  shipped: { label: "Shipped", note: "On its way from Seoul with tracking." },
  delivered: { label: "Delivered", note: "Samples delivered. Reorders open at wholesale MOQ." },
};

/* ───────────── Helpers ───────────── */

export function totals(items: string[]) {
  const subtotal = items.reduce((s, id) => s + productById(id).sample, 0);
  const free = items.length >= FREE_SHIPPING_SKUS;
  const shipping = !items.length || free ? 0 : SAMPLE_SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping, free };
}

export function newOrderId(at = Date.now()) {
  const d = new Date(at);
  const ym = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const n = Math.floor(1000 + Math.random() * 9000);
  return `KS-${ym}-${n}`;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "KB";
  return (parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export const fmtDateTime = (ts: number) =>
  new Date(ts).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

/** Longest brand lead time in the order, plus transit from Seoul. */
export function etaRange(items: string[]) {
  const lead = Math.max(0, ...items.map((id) => brandById(productById(id).brandId).leadDays));
  return { from: lead + 5, to: lead + 7 };
}

export function brandNamesOf(items: string[]) {
  return Array.from(new Set(items.map((id) => brandById(productById(id).brandId).name)));
}

/** Two past requests so the account never opens empty in a demo. */
export function demoOrders(b: Buyer): SampleOrder[] {
  const day = 86_400_000;
  const mk = (ids: string[], status: OrderStatus, daysAgo: number, tracking?: string): SampleOrder => {
    const t = totals(ids);
    const placedAt = Date.now() - daysAgo * day;
    return {
      id: newOrderId(placedAt),
      items: ids,
      ...t,
      status,
      placedAt,
      shipTo: { country: b.country, company: b.company, name: b.name },
      card: "Visa •••• 4242",
      tracking,
    };
  };
  return [
    mk(["p05", "p06", "p01"], "shipped", 6, "EE 482 019 334 KR"),
    mk(["p03", "p07", "p08", "p12", "p15"], "delivered", 23, "EE 471 882 905 KR"),
  ];
}

/* ───────────── Checkout scratch (ship-to picked before sign-in) ───────────── */

const CHECKOUT_KEY = "klow.checkout";

export function loadCheckout(): { country?: string; note?: string } {
  try { return JSON.parse(localStorage.getItem(CHECKOUT_KEY) ?? "{}") ?? {}; } catch { return {}; }
}
export function saveCheckout(v: { country?: string; note?: string }) {
  try { localStorage.setItem(CHECKOUT_KEY, JSON.stringify(v)); } catch {}
}
