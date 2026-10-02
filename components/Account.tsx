"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BRANDS, BuyerType, money } from "@/lib/data";
import { STEPS, labelFor } from "@/lib/match";
import { Buyer, CHANNEL_LABEL, COUNTRIES, ORDER_STATUS, brandNamesOf, countryName, fmtDate, initials } from "@/lib/buyer";
import { useBuyer } from "./Buyer";

type Tab = "requests" | "profile" | "settings";
const TABS: { k: Tab; label: string }[] = [
  { k: "requests", label: "Sample requests" },
  { k: "profile", label: "Buyer profile" },
  { k: "settings", label: "Settings" },
];

export default function Account() {
  const { ready, buyer, orders } = useBuyer();
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("tab") as Tab | null) ?? "requests";
  const [tab, setTab] = useState<Tab>(TABS.some((t) => t.k === initial) ? initial : "requests");

  if (!ready) return <div className="page wrap" />;

  if (!buyer) {
    return (
      <div className="page wrap">
        <div className="empty">
          <span className="eyebrow">My account</span>
          <h3 className="serif">Sign in to see your sample requests.</h3>
          <p className="muted">Verified buyers can track every request, reorder at MOQ and manage their company profile here.</p>
          <div className="btn-row">
            <Link href="/signin?next=/account" className="btn btn--solid">Sign in</Link>
            <Link href="/signup" className="link small">Create a buyer account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page wrap">
      <header className="acct">
        <span className="acct__avatar">{initials(buyer.name)}</span>
        <div className="acct__id">
          <span className="eyebrow">My account</span>
          <h1 className="serif">{buyer.company}</h1>
          <p className="muted">{buyer.name} · {buyer.email}</p>
        </div>
        <div className="acct__meta">
          <span className="badge badge--accent">✓ Verified buyer</span>
          <span className="muted small">since {fmtDate(buyer.createdAt)} · {countryName(buyer.country)}</span>
        </div>
      </header>

      <div className="tabs tabs--acct" role="tablist">
        {TABS.map((t) => (
          <button key={t.k} role="tab" aria-selected={tab === t.k} className={tab === t.k ? "is-on" : ""} onClick={() => { setTab(t.k); router.replace(`/account?tab=${t.k}`, { scroll: false }); }}>
            {t.label}{t.k === "requests" && <sup>{orders.length}</sup>}
          </button>
        ))}
      </div>

      {tab === "requests" && <Requests />}
      {tab === "profile" && <Profile buyer={buyer} />}
      {tab === "settings" && <Settings buyer={buyer} />}
    </div>
  );
}

/* ───────────── Requests ───────────── */

function Requests() {
  const { orders } = useBuyer();
  if (!orders.length) {
    return (
      <div className="empty">
        <h3 className="serif">No sample requests yet.</h3>
        <p className="muted">Pick products from the collection and request them from your sample box.</p>
        <Link href="/#collection" className="btn btn--solid">Browse the collection</Link>
      </div>
    );
  }
  return (
    <div className="orders">
      <div className="orders__head">
        <span>Request</span><span>Placed</span><span>Samples</span><span>Brands</span><span>Total</span><span>Status</span>
      </div>
      <ul>
        {orders.map((o) => {
          const brands = brandNamesOf(o.items);
          return (
            <li key={o.id}>
              <Link href={`/account/requests/${o.id}`} className="orders__row">
                <span className="mono">{o.id}</span>
                <span>{fmtDate(o.placedAt)}</span>
                <span>{o.items.length} {o.items.length === 1 ? "unit" : "units"}</span>
                <span className="orders__brands">{brands.slice(0, 2).join(", ")}{brands.length > 2 ? ` +${brands.length - 2}` : ""}</span>
                <span className="mono">{money(o.total)}</span>
                <span><i className={`pill pill--${o.status}`}>{ORDER_STATUS[o.status].label}</i></span>
                <span className="orders__arrow mono" aria-hidden>→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ───────────── Profile ───────────── */

function Profile({ buyer }: { buyer: Buyer }) {
  const { updateBuyer } = useBuyer();
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(buyer);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setD(buyer); }, [buyer]);

  const save = () => {
    updateBuyer({ name: d.name, phone: d.phone, dial: d.dial, company: d.company, country: d.country, website: d.website, businessType: d.businessType });
    setEdit(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  const typeOpts = STEPS[0].options;

  return (
    <div className="profile">
      <div className="profile__bar">
        <p className="muted small">Changes apply to future requests. Your legal entity and documents are re-verified when changed.</p>
        <div className="btn-row">
          {saved && <span className="eyebrow eyebrow--accent">Saved ✓</span>}
          {edit ? (
            <>
              <button className="link small" onClick={() => { setD(buyer); setEdit(false); }}>Cancel</button>
              <button className="btn btn--solid btn--plain btn--sm" onClick={save}>Save changes</button>
            </>
          ) : (
            <button className="btn btn--ghost btn--plain btn--sm" onClick={() => setEdit(true)}>Edit profile</button>
          )}
        </div>
      </div>

      <section className="panel">
        <h3 className="panel__title">Account</h3>
        <dl className="kv kv--form">
          <div><dt>Full name</dt><dd>{edit ? <input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /> : buyer.name}</dd></div>
          <div><dt>Sign-in e-mail</dt><dd>{buyer.email} <span className="badge">Verified</span><br /><span className="muted small">Your ID cannot be changed after registration.</span></dd></div>
          <div>
            <dt>Contact number</dt>
            <dd>
              {edit ? (
                <div className="field__group">
                  <select value={d.dial} onChange={(e) => setD({ ...d, dial: e.target.value })} className="field__dial">
                    {Array.from(new Set(COUNTRIES.map((c) => c.dial))).map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                  <input value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} />
                </div>
              ) : `${buyer.dial} ${buyer.phone}`}
            </dd>
          </div>
          <div><dt>Password</dt><dd>•••••••• <button className="link small muted">Change password</button></dd></div>
        </dl>
      </section>

      <section className="panel">
        <h3 className="panel__title">Business</h3>
        <dl className="kv kv--form">
          <div><dt>Company</dt><dd>{edit ? <input value={d.company} onChange={(e) => setD({ ...d, company: e.target.value })} /> : buyer.company}</dd></div>
          <div>
            <dt>Country</dt>
            <dd>{edit ? (
              <select value={d.country} onChange={(e) => setD({ ...d, country: e.target.value })}>
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            ) : countryName(buyer.country)}</dd>
          </div>
          <div>
            <dt>Business type</dt>
            <dd>{edit ? (
              <select value={d.businessType} onChange={(e) => setD({ ...d, businessType: e.target.value as BuyerType })}>
                {typeOpts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : labelFor("type", buyer.businessType)}</dd>
          </div>
          <div><dt>Purchase currency</dt><dd>{buyer.currency}</dd></div>
          <div><dt>Website / Instagram</dt><dd>{edit ? <input value={d.website ?? ""} onChange={(e) => setD({ ...d, website: e.target.value })} placeholder="—" /> : buyer.website || <span className="muted">—</span>}</dd></div>
          {buyer.referral && <div><dt>Referral code</dt><dd className="mono">{buyer.referral}</dd></div>}
        </dl>
      </section>

      <section className="panel">
        <h3 className="panel__title">Sales channels</h3>
        <ul className="tags tags--left">
          {buyer.channels.map((c) => <li key={c}>{CHANNEL_LABEL[c]}</li>)}
          {!buyer.channels.length && <li className="muted">None listed</li>}
        </ul>
        {buyer.interestedBrands.length > 0 && (
          <>
            <h3 className="panel__title panel__title--mt">Interested brands</h3>
            <ul className="tags tags--left">
              {buyer.interestedBrands.map((id) => <li key={id}>{BRANDS.find((b) => b.id === id)?.name ?? id}</li>)}
            </ul>
          </>
        )}
      </section>

      <section className="panel">
        <h3 className="panel__title">Documents</h3>
        <ul className="docs">
          {buyer.certFileName ? (
            <li>
              <span className="docs__icon">PDF</span>
              <div><b>{buyer.certFileName}</b><span className="muted small">Business registration · uploaded {fmtDate(buyer.createdAt)}</span></div>
              <span className="badge badge--accent">✓ Verified</span>
            </li>
          ) : (
            <li>
              <span className="docs__icon docs__icon--empty">—</span>
              <div><b>Business registration certificate</b><span className="muted small">Not uploaded yet · unlocks brand-exclusive terms and faster quotes</span></div>
              <button className="btn btn--ghost btn--plain btn--sm">Upload</button>
            </li>
          )}
          {buyer.storePhotoName && (
            <li>
              <span className="docs__icon">IMG</span>
              <div><b>{buyer.storePhotoName}</b><span className="muted small">Offline store photo</span></div>
              <span className="badge">On file</span>
            </li>
          )}
          <li className="docs__add">
            <button className="link small">+ Add a document (reseller permit, VAT ID, import licence…)</button>
          </li>
        </ul>
      </section>
    </div>
  );
}

/* ───────────── Settings ───────────── */

function Settings({ buyer }: { buyer: Buyer }) {
  const { signOut, withdraw } = useBuyer();
  const router = useRouter();
  const [notif, setNotif] = useState({ status: true, launches: true, pricing: false, digest: true });
  const [confirm, setConfirm] = useState(false);
  const [reason, setReason] = useState("");
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);

  const canDelete = reason && typed.trim().toLowerCase() === buyer.company.trim().toLowerCase();

  const doSignOut = () => { signOut(); router.push("/"); };
  const doDelete = () => {
    setBusy(true);
    setTimeout(() => { withdraw(); router.push("/"); }, 900);
  };

  return (
    <div className="profile">
      <section className="panel">
        <h3 className="panel__title">E-mail notifications</h3>
        <ul className="toggles">
          {([
            ["status", "Request status", "Brand confirmations, dispatch and delivery for each request."],
            ["launches", "New brands & products", "When a brand matching your interests joins the collection."],
            ["pricing", "Wholesale price changes", "Price or MOQ changes on products you have sampled."],
            ["digest", "Monthly sourcing digest", "What professional buyers in your market are reordering."],
          ] as const).map(([k, l, n]) => (
            <li key={k}>
              <div><b>{l}</b><span className="muted small">{n}</span></div>
              <button className={`switch ${notif[k] ? "is-on" : ""}`} role="switch" aria-checked={notif[k]} onClick={() => setNotif((x) => ({ ...x, [k]: !x[k] }))}><i /></button>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h3 className="panel__title">Session</h3>
        <div className="settings__row">
          <div><b>Signed in as {buyer.email}</b><span className="muted small">You stay signed in on this device until you sign out.</span></div>
          <button className="btn btn--ghost btn--plain btn--sm" onClick={doSignOut}>Sign out</button>
        </div>
      </section>

      <section className="panel panel--danger">
        <h3 className="panel__title">Delete account</h3>
        {!confirm ? (
          <div className="settings__row">
            <div>
              <b>Permanently delete {buyer.company}&rsquo;s buyer account</b>
              <span className="muted small">Removes your profile, documents and request history. Requests already in transit are still delivered. This cannot be undone.</span>
            </div>
            <button className="btn btn--danger btn--plain btn--sm" onClick={() => setConfirm(true)}>Delete account</button>
          </div>
        ) : (
          <div className="danger">
            <p><b>We&rsquo;re sorry to see you go.</b> Tell us why, then type your company name to confirm.</p>
            <label className="field">
              <span className="eyebrow">Reason</span>
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Choose one…</option>
                <option>I found the brands I needed</option>
                <option>Prices or MOQs didn&rsquo;t fit my business</option>
                <option>Shipping or customs were too complex</option>
                <option>I&rsquo;m closing or changing my business</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              <span className="eyebrow">Type “{buyer.company}” to confirm</span>
              <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={buyer.company} />
            </label>
            <div className="form__foot--split">
              <button className="link small" onClick={() => { setConfirm(false); setTyped(""); setReason(""); }}>Keep my account</button>
              <button className="btn btn--danger btn--plain" disabled={!canDelete || busy} onClick={doDelete}>{busy ? "Deleting…" : "Delete permanently"}</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
