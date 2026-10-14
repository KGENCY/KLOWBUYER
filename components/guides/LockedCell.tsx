"use client";

import { useBuyer } from "@/components/Buyer";
import { LockIcon } from "@/components/conversion/LockedPrice";

/** A table cell value only signed-in buyers see; otherwise a blurred dummy and a lock (the real value isn't rendered). */
export default function LockedCell({ value }: { value: string }) {
  const { buyer } = useBuyer();
  if (buyer) return <span className="mono">{value}</span>;
  return (
    <span className="lcell">
      <span className="lp__blur" aria-hidden>$0.00</span>
      <LockIcon />
      <span className="sr-only">Sign in to see</span>
    </span>
  );
}
