"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { BRANDS, BuyerType } from "@/lib/data";
import { STEPS } from "@/lib/match";
import { COUNTRIES, Currency, ONLINE_CHANNELS, SalesChannel } from "@/lib/buyer";
import { useBuyer } from "./Buyer";

const STEP_LABELS = ["Account", "Business", "Verify"];
const BUSINESS_TYPES = STEPS[0].options as { value: BuyerType; label: string; note?: string }[];

interface Form {
  name: string;
  email: string;
  dial: string;
  phone: string;
  password: string;
  confirm: string;
  country: string;
  company: string;
  businessType: BuyerType | "";
  currency: Currency;
  offline: boolean;
  online: boolean;
  onlineChannels: SalesChannel[];
  etc: boolean;
  storePhotoName: string;
  certFileName: string;
  website: string;
  interestedBrands: string[];
  referral: string;
  terms: boolean;
}

const EMPTY: Form = {
  name: "", email: "", dial: "+1", phone: "", password: "", confirm: "",
  country: "US", company: "", businessType: "", currency: "USD",
  offline: false, online: false, onlineChannels: [], etc: false,
  storePhotoName: "", certFileName: "", website: "", interestedBrands: [], referral: "", terms: false,
};

export default function Signup({ mode = "signup" }: { mode?: "signup" | "signin" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";
  void router;

  if (mode === "signin") return <SignIn next={next} />;
  return <SignUp next={next} />;
}

/* ───────────── Sign in (mock) ───────────── */

function SignIn({ next }: { next: string }) {
  const router = useRouter();
  const { signIn } = useBuyer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    setTimeout(() => { signIn(email); router.push(next); }, 700);
  };

  return (
    <div className="page page--narrow wrap">
      <header className="page__head center">
        <span className="eyebrow">Buyer sign in</span>
        <h1 className="h2">Welcome back.</h1>
        <p className="muted">Sign in to see your sample requests and reorder at wholesale.</p>
      </header>
      <form className="panel form" onSubmit={submit}>
        <label className="field">
          <span className="eyebrow">Work email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required autoFocus />
        </label>
        <label className="field">
          <span className="eyebrow">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </label>
        <div className="form__row">
          <label className="check"><input type="checkbox" defaultChecked /><i /><span>Keep me signed in</span></label>
          <button type="button" className="link small muted">Forgot password?</button>
        </div>
        <button type="submit" className="btn btn--solid btn--block" disabled={!email || !password || busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="muted small center">
          New to KLOW? <Link href={`/signup?next=${encodeURIComponent(next)}`} className="link">Create a buyer account</Link>
        </p>
      </form>
    </div>
  );
}

/* ───────────── Sign up (3 steps) ───────────── */

function SignUp({ next }: { next: string }) {
  const router = useRouter();
  const { signUp, buyer, ready } = useBuyer();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((x) => ({ ...x, [k]: v }));

  // Already signed in (and not just now) → nowhere to go but onward.
  useEffect(() => {
    if (ready && buyer && !done) router.replace(next);
  }, [ready, buyer, done, next, router]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  /* step 1 validation */
  const emailOk = /.+@.+\..+/.test(f.email);
  const pwOk = f.password.length >= 8;
  const matchOk = f.password === f.confirm;
  const step1Ok = f.name.trim() && emailOk && f.phone.trim() && pwOk && matchOk;

  /* step 2 validation */
  const step2Ok = f.company.trim() && f.businessType && f.terms;

  const channels = (): SalesChannel[] => [
    ...(f.offline ? (["offline"] as SalesChannel[]) : []),
    ...(f.online ? f.onlineChannels : []),
    ...(f.etc ? (["etc"] as SalesChannel[]) : []),
  ];

  const verify = () => {
    signUp({
      name: f.name.trim(),
      email: f.email.trim(),
      dial: f.dial,
      phone: f.phone.trim(),
      country: f.country,
      company: f.company.trim(),
      businessType: f.businessType as BuyerType,
      currency: f.currency,
      channels: channels(),
      interestedBrands: f.interestedBrands,
      referral: f.referral.trim() || undefined,
      certFileName: f.certFileName,
      storePhotoName: f.storePhotoName || undefined,
      website: f.website.trim() || undefined,
    });
    setDone(true);
  };

  if (done) {
    const toPay = next.startsWith("/checkout");
    return (
      <div className="page page--narrow wrap">
        <div className="panel sent sent--page">
          <span className="sent__mark">✓</span>
          <span className="badge badge--accent">Verified buyer</span>
          <h4 className="serif">You&rsquo;re in, {f.name.split(" ")[0]}.</h4>
          <p className="muted">
            <b>{f.company}</b> is now a verified KLOW buyer. Wholesale prices, sample requests and reorders are open to you across every brand in the collection.
          </p>
          <div className="btn-row">
            <button className="btn btn--solid" onClick={() => router.push(next)}>{toPay ? "Continue to payment" : "Go to my account"}</button>
            {toPay && <Link href="/account" className="link small">See my account first</Link>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--narrow wrap">
      <header className="page__head">
        <span className="eyebrow">Buyer verification</span>
        <h1 className="h2">{["Create your buyer account", "Tell us about your business", "Verify your e-mail"][step]}</h1>
        <p className="muted">
          {[
            "Wholesale prices are for verified businesses only. This takes about two minutes.",
            "We use this to show you the right brands, documents and supply terms for your market.",
            `We sent a 6-digit code to ${f.email}. Enter it below to finish.`,
          ][step]}
        </p>
      </header>

      <ol className="stepper" aria-label="Sign-up progress">
        {STEP_LABELS.map((l, i) => (
          <li key={l} className={i === step ? "is-on" : i < step ? "is-done" : ""}>
            <span className="stepper__n">{i < step ? "✓" : `0${i + 1}`}</span>
            <span className="stepper__l">{l}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <form className="panel form" onSubmit={(e) => { e.preventDefault(); setTouched(true); if (step1Ok) { setStep(1); setTouched(false); } }} noValidate>
          <label className="field">
            <span className="eyebrow">Full name *</span>
            <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Park" autoFocus />
          </label>
          <label className="field">
            <span className="eyebrow">Work email *</span>
            <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
            <span className="field__help">A 6-digit verification code will be sent to this address. It becomes your sign-in ID.</span>
            {touched && !emailOk && <span className="field__err">Enter a valid e-mail address.</span>}
          </label>
          <div className="field">
            <span className="eyebrow">Contact number *</span>
            <div className="field__group">
              <select value={f.dial} onChange={(e) => set("dial", e.target.value)} aria-label="Country code" className="field__dial">
                {Array.from(new Set(COUNTRIES.map((c) => c.dial))).map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <input value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="415 555 0132" inputMode="tel" />
            </div>
          </div>
          <div className="fields fields--2">
            <label className="field">
              <span className="eyebrow">Password *</span>
              <input type="password" value={f.password} onChange={(e) => set("password", e.target.value)} placeholder="8+ characters" />
              {touched && !pwOk && <span className="field__err">At least 8 characters.</span>}
            </label>
            <label className="field">
              <span className="eyebrow">Confirm password *</span>
              <input type="password" value={f.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repeat password" />
              {f.confirm && !matchOk && <span className="field__err">Passwords don&rsquo;t match.</span>}
            </label>
          </div>
          <div className="form__foot">
            <button type="submit" className="btn btn--solid btn--block">Continue</button>
            <p className="muted small center">Already have an account? <Link href={`/signin?next=${encodeURIComponent(next)}`} className="link">Sign in</Link></p>
          </div>
        </form>
      )}

      {step === 1 && (
        <form className="stack" onSubmit={(e) => { e.preventDefault(); setTouched(true); if (step2Ok) { setStep(2); setTouched(false); } }} noValidate>
          {/* ── Required ── */}
          <section className="panel form panel--required">
            <header className="panel__head">
              <span className="eyebrow eyebrow--accent">Required</span>
              <h3 className="serif">Your business</h3>
              <p className="muted small">Three things we need to open wholesale prices to you.</p>
            </header>

            <label className="field">
              <span className="eyebrow">Country *</span>
              <select value={f.country} onChange={(e) => set("country", e.target.value)}>
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
            </label>

            <label className="field">
              <span className="eyebrow">Company *</span>
              <input value={f.company} onChange={(e) => set("company", e.target.value)} placeholder="Lumen Beauty Co." autoFocus />
              <span className="field__help">Individual seller without a company name? Enter your own name instead.</span>
              {touched && !f.company.trim() && <span className="field__err">Enter your company or your own name.</span>}
            </label>

            <div className="field">
              <span className="eyebrow">Business type *</span>
              <div className="options options--tiles">
                {BUSINESS_TYPES.map((o) => (
                  <button key={o.value} type="button" className={`option ${f.businessType === o.value ? "is-on" : ""}`} onClick={() => set("businessType", o.value)}>
                    <span className="option__label">{o.label}</span>
                    {o.note && <span className="option__note">{o.note}</span>}
                    <span className="option__tick" />
                  </button>
                ))}
              </div>
              {touched && !f.businessType && <span className="field__err">Choose one.</span>}
            </div>
          </section>

          {/* ── Optional ── */}
          <section className="panel form panel--optional">
            <header className="panel__head">
              <span className="eyebrow">Optional</span>
              <h3 className="serif">Help brands quote you accurately</h3>
              <p className="muted small">Skip anything here — you can add it later from your account. Buyers who complete it get supply terms faster.</p>
            </header>

            <label className="field">
              <span className="eyebrow">Purchase currency</span>
              <div className="seg" role="radiogroup">
                {(["USD", "KRW"] as Currency[]).map((c) => (
                  <button key={c} type="button" role="radio" aria-checked={f.currency === c} className={f.currency === c ? "is-on" : ""} onClick={() => set("currency", c)}>{c}</button>
                ))}
              </div>
            </label>

            <div className="field">
              <span className="eyebrow">Sales channels</span>
              <span className="field__help">Tell us where you sell so brands can give you accurate supply information.</span>
              <ul className="checks">
                <li>
                  <label className="check"><input type="checkbox" checked={f.offline} onChange={(e) => set("offline", e.target.checked)} /><i /><span>Offline store</span></label>
                  {f.offline && (
                    <Upload
                      label="Picture of your offline store"
                      hint="30MB or less · JPG, JPEG, PNG"
                      accept="image/*"
                      value={f.storePhotoName}
                      onChange={(n) => set("storePhotoName", n)}
                    />
                  )}
                </li>
                <li>
                  <label className="check"><input type="checkbox" checked={f.online} onChange={(e) => set("online", e.target.checked)} /><i /><span>Online store</span></label>
                  {f.online && (
                    <ul className="checks checks--sub">
                      {ONLINE_CHANNELS.map((c) => {
                        const on = f.onlineChannels.includes(c.value);
                        return (
                          <li key={c.value}>
                            <label className="check">
                              <input type="checkbox" checked={on} onChange={() => set("onlineChannels", on ? f.onlineChannels.filter((x) => x !== c.value) : [...f.onlineChannels, c.value])} />
                              <i /><span>{c.label}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
                <li>
                  <label className="check"><input type="checkbox" checked={f.etc} onChange={(e) => set("etc", e.target.checked)} /><i /><span>Other (salon, clinic, distribution…)</span></label>
                </li>
              </ul>
            </div>

            <label className="field">
              <span className="eyebrow">Website or Instagram</span>
              <input value={f.website} onChange={(e) => set("website", e.target.value)} placeholder="lumenbeauty.co · @lumenbeauty" />
            </label>

            <div className="field">
              <span className="eyebrow">Business registration certificate</span>
              <Upload
                label={f.certFileName ? "Replace document" : "Upload your business licence or registration"}
                hint="30MB or less · PDF, JPG, JPEG, PNG"
                accept=".pdf,image/*"
                value={f.certFileName}
                onChange={(n) => set("certFileName", n)}
              />
              <span className="field__help">Unlocks the <b>Verified buyer</b> badge and brand-exclusive terms. Reviewed by our Seoul team within one business day.</span>
            </div>

            <BrandPicker value={f.interestedBrands} onChange={(v) => set("interestedBrands", v)} />

            <label className="field">
              <span className="eyebrow">Referral code</span>
              <input value={f.referral} onChange={(e) => set("referral", e.target.value.toUpperCase())} placeholder="Optional" className="mono" />
            </label>
          </section>

          <section className="panel form">
            <label className="check">
              <input type="checkbox" checked={f.terms} onChange={(e) => set("terms", e.target.checked)} /><i />
              <span>I agree to the <Link href="#" className="link">Terms &amp; Conditions</Link> and <Link href="#" className="link">Privacy Policy</Link>. *</span>
            </label>
            {touched && !f.terms && <span className="field__err">Please accept the terms to continue.</span>}

            <div className="form__foot form__foot--split">
              <button type="button" className="link small" onClick={() => setStep(0)}>← Back</button>
              <button type="submit" className="btn btn--solid">Send verification code</button>
            </div>
          </section>
        </form>
      )}
      {step === 2 && <Verify email={f.email} onBack={() => setStep(1)} onVerified={verify} />}
    </div>
  );
}

/* ───────────── Pieces ───────────── */

function Upload({ label, hint, accept, value, onChange }: { label: string; hint: string; accept: string; value: string; onChange: (name: string) => void }) {
  return (
    <label className={`upload ${value ? "is-filled" : ""}`}>
      <input type="file" accept={accept} onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")} />
      <span className="upload__icon" aria-hidden>{value ? "✓" : "↑"}</span>
      <span className="upload__text">
        <b>{value || label}</b>
        <small>{value ? "Attached · click to replace" : hint}</small>
      </span>
    </label>
  );
}

function BrandPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return BRANDS.filter((b) => b.name.toLowerCase().includes(s) && !value.includes(b.id)).slice(0, 5);
  }, [q, value]);
  return (
    <div className="field">
      <span className="eyebrow">Interested brands</span>
      <div className="picker">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand…" />
        {hits.length > 0 && (
          <ul className="picker__hits">
            {hits.map((b) => (
              <li key={b.id}><button type="button" onClick={() => { onChange([...value, b.id]); setQ(""); }}>{b.name} <span className="muted small">{b.tagline}</span></button></li>
            ))}
          </ul>
        )}
      </div>
      {value.length > 0 && (
        <ul className="tags tags--left">
          {value.map((id) => {
            const b = BRANDS.find((x) => x.id === id)!;
            return <li key={id}>{b.name} <button type="button" aria-label={`Remove ${b.name}`} onClick={() => onChange(value.filter((x) => x !== id))}>×</button></li>;
          })}
        </ul>
      )}
    </div>
  );
}

function Verify({ email, onBack, onVerified }: { email: string; onBack: () => void; onVerified: () => void }) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [left, setLeft] = useState(60);
  const [busy, setBusy] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const full = code.every((c) => c !== "");

  const put = (i: number, v: string) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) { setCode((c) => c.map((x, j) => (j === i ? "" : x))); return; }
    setCode((c) => {
      const n = [...c];
      digits.split("").slice(0, 6 - i).forEach((d, k) => { n[i + k] = d; });
      return n;
    });
    refs.current[Math.min(5, i + digits.length)]?.focus();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!full) return;
    setBusy(true);
    setTimeout(onVerified, 900);
  };

  return (
    <form className="panel form" onSubmit={submit}>
      <div className="code" role="group" aria-label="6-digit verification code">
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={c}
            inputMode="numeric"
            maxLength={6}
            autoFocus={i === 0}
            onChange={(e) => put(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus(); }}
          />
        ))}
      </div>
      <p className="muted small center">
        Didn&rsquo;t get it?{" "}
        {left > 0 ? <span className="mono">Resend in 0:{String(left).padStart(2, "0")}</span> : <button type="button" className="link" onClick={() => setLeft(60)}>Resend code</button>}
        {" "}· <button type="button" className="link" onClick={onBack}>Change e-mail</button>
      </p>
      <div className="form__foot">
        <button type="submit" className="btn btn--solid btn--block" disabled={!full || busy}>{busy ? "Verifying…" : "Verify & create account"}</button>
        <p className="muted small center">Sent to <b>{email}</b>. For this mock-up, any 6 digits work.</p>
      </div>
    </form>
  );
}
