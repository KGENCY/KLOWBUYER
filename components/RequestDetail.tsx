"use client";

import Link from "next/link";
import { brandById, money, productById } from "@/lib/data";
import { ORDER_STATUS, STATUS_ORDER, countryName, etaRange, fmtDate, fmtDateTime } from "@/lib/buyer";
import { useBuyer } from "./Buyer";
import { useSamples } from "./SampleBox";
import Photo from "./Photo";

export default function RequestDetail({ id }: { id: string }) {
  const { ready, buyer, orders } = useBuyer();
  const { addMany, setOpen } = useSamples();
  const order = orders.find((o) => o.id === id);

  if (!ready) return <div className="page wrap" />;

  if (!buyer || !order) {
    return (
      <div className="page wrap">
        <div className="empty">
          <h3 className="serif">Request not found.</h3>
          <p className="muted">It may belong to another account, or the link is out of date.</p>
          <Link href="/account" className="btn btn--solid">Back to my requests</Link>
        </div>
      </div>
    );
  }

  const idx = STATUS_ORDER.indexOf(order.status);
  const eta = etaRange(order.items);
  const day = 86_400_000;
  const stamp = (i: number) => (i <= idx ? fmtDate(order.placedAt + i * 2 * day) : "");

  return (
    <div className="page wrap">
      <nav className="trail"><Link href="/account" className="link">My requests</Link><span>/</span><span className="mono">{order.id}</span></nav>

      <header className="page__head page__head--row">
        <div>
          <span className="eyebrow">Sample request</span>
          <h1 className="h2 mono">{order.id}</h1>
          <p className="muted">Placed {fmtDateTime(order.placedAt)} · {money(order.total)} paid with {order.card}</p>
        </div>
        <i className={`pill pill--lg pill--${order.status}`}>{ORDER_STATUS[order.status].label}</i>
      </header>

      <div className="split">
        <section className="split__main">
          <div className="block">
            <div className="block__head"><h2 className="serif">Progress</h2></div>
            <ol className="timeline">
              {STATUS_ORDER.map((s, i) => (
                <li key={s} className={i < idx ? "is-done" : i === idx ? "is-on" : ""}>
                  <i />
                  <div>
                    <b>{ORDER_STATUS[s].label}</b>
                    <p className="muted small">{ORDER_STATUS[s].note}</p>
                    {stamp(i) && <span className="mono small muted">{stamp(i)}</span>}
                  </div>
                </li>
              ))}
            </ol>
            {order.tracking && (
              <div className="track">
                <span className="eyebrow">Tracking</span>
                <b className="mono">{order.tracking}</b>
                <button className="link small">Track on Korea Post →</button>
              </div>
            )}
            {!order.tracking && order.status !== "delivered" && (
              <p className="muted small block__foot">Estimated arrival {eta.from}–{eta.to} business days after the last brand confirms.</p>
            )}
          </div>

          <div className="block">
            <div className="block__head">
              <h2 className="serif">Samples <sup className="mono">{order.items.length}</sup></h2>
              <button className="link small" onClick={() => { addMany(order.items); setOpen(true); }}>Reorder these samples</button>
            </div>
            <ul className="lines">
              {order.items.map((pid) => {
                const p = productById(pid);
                const b = brandById(p.brandId);
                return (
                  <li key={pid} className="line">
                    <div className="line__thumb"><Photo p={p} sizes="88px" /></div>
                    <div className="line__info">
                      <span className="eyebrow">{b.name}</span>
                      <span className="line__name">{p.name}</span>
                      <span className="muted small">1 unit · {p.size} · wholesale MOQ {b.moq} units</span>
                    </div>
                    <div className="line__price"><span className="mono">{money(p.wholesale)}</span></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <aside className="summary summary--static">
          <span className="eyebrow">Shipping</span>
          <dl className="kv">
            <div><dt>Company</dt><dd>{order.shipTo.company}</dd></div>
            <div><dt>Recipient</dt><dd>{order.shipTo.name}</dd></div>
            <div><dt>Destination</dt><dd>{countryName(order.shipTo.country)}</dd></div>
            {order.shipTo.note && <div><dt>Note to brands</dt><dd className="muted small">“{order.shipTo.note}”</dd></div>}
          </dl>
          <span className="eyebrow">Payment</span>
          <div className="summary__rows">
            <div className="row"><span>Samples at wholesale</span><span>{money(order.subtotal)}</span></div>
            <div className="row"><span>Shipping</span><span>{order.shipping ? money(order.shipping) : "Complimentary"}</span></div>
            <div className="row row--total"><span>Paid</span><span>{money(order.total)} <small>USD</small></span></div>
          </div>
          <p className="muted small">{order.card} via Eximbay · <button className="link">Download receipt</button></p>
          <p className="muted small">Questions about this request? <button className="link">Message the Seoul team</button></p>
        </aside>
      </div>
    </div>
  );
}
