import Link from "next/link";
import { money } from "@/lib/data";

function Lock() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <rect x="2.5" y="7" width="11" height="7.5" fill="currentColor" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Sample price is always public; the MOQ reorder price shows only to signed-in buyers.
 * When locked, the real number is never rendered — a blurred dummy stands in for it.
 */
export default function LockedPrice({
  sample,
  moq,
  moqUnits,
  signedIn,
  ctaId,
  next,
}: {
  sample: number;
  moq: number;
  moqUnits: number;
  signedIn: boolean;
  ctaId: string;
  /** Where to come back to after signing in. */
  next?: string;
}) {
  return (
    <dl className={`lp ${signedIn ? "" : "lp--locked"}`}>
      <div className="lp__row">
        <dt>Sample <small>1 unit</small></dt>
        <dd>{money(sample)}</dd>
      </div>
      <div className="lp__row">
        <dt>Reorder at MOQ <small>{moqUnits}+ units</small></dt>
        {signedIn ? (
          <dd>{money(moq)} <small className="lp__save">−{Math.round((1 - moq / sample) * 100)}%</small></dd>
        ) : (
          <dd className="lp__hidden">
            <span className="lp__blur" aria-hidden>$0.00</span>
            <Lock />
            <span className="sr-only">Hidden until you sign in</span>
          </dd>
        )}
      </div>
      {!signedIn && (
        <Link href={`/signin${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="link small lp__cta" data-cta-id={ctaId}>
          Sign in to see bulk pricing
        </Link>
      )}
    </dl>
  );
}
