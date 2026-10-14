import Link from "next/link";
import { money } from "@/lib/data";

/** Small filled padlock, also used on notices. */
export function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden>
      <rect x="2.5" y="7" width="11" height="7.5" fill="currentColor" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Numbers are formatted as money; text (e.g. a "$[__]" placeholder) is shown as given. */
const show = (v: number | string) => (typeof v === "number" ? money(v) : v);

/**
 * Sample price is always public; the MOQ reorder price shows only to signed-in buyers.
 * When locked, the real number is never rendered — a blurred dummy stands in for it.
 */
export default function LockedPrice({
  sample,
  moq,
  moqUnits,
  isLoggedIn,
  ctaId,
  next,
}: {
  sample: number | string;
  moq: number | string;
  moqUnits: number | string;
  isLoggedIn: boolean;
  ctaId: string;
  /** Where to come back to after signing in. */
  next?: string;
}) {
  const saving = typeof sample === "number" && typeof moq === "number" ? Math.round((1 - moq / sample) * 100) : null;
  return (
    <dl className={`lp ${isLoggedIn ? "" : "lp--locked"}`}>
      <div className="lp__row">
        <dt>Sample <small>1 unit</small></dt>
        <dd>{show(sample)}</dd>
      </div>
      <div className="lp__row">
        <dt>Reorder at MOQ <small>{moqUnits}+ units</small></dt>
        {isLoggedIn ? (
          <dd>{show(moq)} {saving !== null && <small className="lp__save">−{saving}%</small>}</dd>
        ) : (
          <dd className="lp__hidden">
            <span className="lp__blur" aria-hidden>$0.00</span>
            <LockIcon />
            <span className="sr-only">Hidden until you sign in</span>
          </dd>
        )}
      </div>
      {!isLoggedIn && (
        <Link href={`/signin${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="link small lp__cta" data-cta-id={ctaId}>
          Sign in to see bulk pricing
        </Link>
      )}
    </dl>
  );
}
