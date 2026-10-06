"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { brandById, money, productById } from "@/lib/data";
import { brandNamesOf, countryName, etaRange, fmtDateTime } from "@/lib/buyer";
import { useBuyer } from "./Buyer";
import Photo from "./Photo";

export default function Complete() {
  const params = useSearchParams();
  const id = params.get("order");
  const { ready, orders, buyer } = useBuyer();
  const order = orders.find((o) => o.id === id) ?? orders[0];

  if (!ready) return <div className="page wrap" />;

  if (!order) {
    return (
      <div className="page wrap">
        <div className="empty">
          <h3 className="serif">No request found.</h3>
          <p className="muted">Start from the collection and request samples from your box.</p>
          <Link href="/#collection" className="btn btn--solid">Browse the collection</Link>
        </div>
      </div>
    );
  }

  const eta = etaRange(order.items);
  const brands = brandNamesOf(order.items);

  return (
    <div className="page page--narrow wrap">
      <div className="panel sent sent--page">
        <span className="sent__mark">✓</span>
        <span className="eyebrow eyebrow--accent">Request {order.id}</span>
        <h4 className="serif">Sample request placed.</h4>
        <p className="muted">
          Thank you{buyer ? `, ${buyer.name.split(" ")[0]}` : ""}. We&rsquo;ve charged <b>{money(order.total)}</b> to {order.card} and asked {brands.length === 1 ? brands[0] : `${brands.length} brands`} to confirm stock. A receipt is on its way to <b>{buyer?.email ?? "your inbox"}</b>.
        </p>
      </div>

      <div className="panel">
        <dl className="kv kv--3">
          <div><dt>Paid</dt><dd>{fmtDateTime(order.placedAt)}</dd></div>
          <div><dt>Ships to</dt><dd>{order.shipTo.company}<br /><span className="muted small">{countryName(order.shipTo.country)}</span></dd></div>
          <div><dt>Estimated arrival</dt><dd>{eta.from}–{eta.to} business days<br /><span className="muted small">after the last brand confirms</span></dd></div>
        </dl>
      </div>

      <div className="panel">
        <div className="block__head">
          <h2 className="serif">What happens next</h2>
        </div>
        <ol className="next">
          <li><span className="next__n">01</span><div><b>Brands confirm</b><p className="muted">Each brand confirms the unit is in stock. Usually within one business day.</p></div></li>
          <li><span className="next__n">02</span><div><b>Packed in Seoul</b><p className="muted">All samples are consolidated into one parcel with the export paperwork done for you.</p></div></li>
          <li><span className="next__n">03</span><div><b>Tracking by e-mail</b><p className="muted">You get a tracking number the moment it leaves Korea. Reorder at MOQ from your account.</p></div></li>
        </ol>
      </div>

      <div className="panel">
        <div className="block__head">
          <h2 className="serif">Samples <sup className="mono">{order.items.length}</sup></h2>
          <span className="mono small">{money(order.subtotal)} + {order.shipping ? money(order.shipping) : "free"} shipping</span>
        </div>
        <ul className="lines lines--compact">
          {order.items.map((pid) => {
            const p = productById(pid);
            return (
              <li key={pid} className="line">
                <div className="line__thumb"><Photo p={p} sizes="56px" /></div>
                <div className="line__info">
                  <span className="eyebrow">{brandById(p.brandId).name}</span>
                  <span className="line__name">{p.name}</span>
                </div>
                <div className="line__price"><span className="mono">{money(p.sample)}</span></div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="btn-row btn-row--center">
        <Link href="/account" className="btn btn--solid">View my requests</Link>
        <Link href="/#collection" className="btn btn--ghost">Back to the collection</Link>
      </div>
    </div>
  );
}
