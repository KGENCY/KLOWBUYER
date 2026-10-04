"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Brand, FREE_SHIPPING_SKUS, Product, Region, SAMPLE_SHIPPING_FEE, money } from "@/lib/data";
import { certsOf } from "@/lib/detail";
import { useBuyer } from "./Buyer";

/* ────────────────────────────────────────────────────────────────
   Ask about a product.
   A short guided chat: the questions we can answer from the
   product data get an instant reply; anything else is handed to
   the brand team, who come back on WhatsApp or email.
   ──────────────────────────────────────────────────────────────── */

type Channel = "whatsapp" | "email";
type Contact = { channel: Channel; value: string };
type Msg =
  | { role: "bot" | "user"; text: string; at: number }
  | { role: "handoff"; at: number; sent?: Contact; ref: string }; // the contact card, inline in the thread

type Quick = { label: string; answer?: (p: Product, b: Brand) => string }; // no answer → handed to the team

const KEY = (id: string) => `klow.ask.${id}`;
const CONTACT_KEY = "klow.ask.contact";
const TYPING_MS = 900;

/** DESIGN PREVIEW — set to false before launch.
 *  While true, nothing is persisted and every open starts on the contact hand-off card
 *  (as if the buyer had just asked a brand-team question), so the screen can be reviewed. */
const DESIGN_PREVIEW = true;
const PREVIEW_QUESTION = "Is private label or custom packaging possible?";

const REGION: Record<Region, string> = { us: "United States", ca: "Canada", uk: "United Kingdom", eu: "EU", gcc: "GCC", sea: "Southeast Asia", au: "Australia", latam: "Latin America" };
const num = (n: number) => n.toLocaleString("en-US");

const QUICK: Quick[] = [
  {
    label: "How fast does it ship, and from where?",
    answer: (p, b) => `${b.name} dispatches from ${b.city} within ${b.leadDays} business ${b.leadDays === 1 ? "day" : "days"} of payment. Samples ship by express courier, usually 3–6 days door to door; wholesale orders go by air freight unless you ask for sea. Shipping on any ${FREE_SHIPPING_SKUS} sample SKUs is on us, otherwise ${money(SAMPLE_SHIPPING_FEE)} flat.`,
  },
  {
    label: "What is the minimum order, and can I start smaller?",
    answer: (p, b) => `You can sample ${p.name} from 1 unit at the wholesale price of ${money(p.wholesale)}. The opening wholesale order is ${num(b.moq)} units per SKU, with the unit price stepping down from ${num(b.moq * 3)} units. Opening orders below ${num(b.moq)} units are negotiated case by case: ask below and the ${b.name} team will come back to you.`,
  },
  {
    label: "Which documents are ready for my market?",
    answer: (p, b) => {
      const certs = certsOf(p).map((c) => `${c.code} (${c.note})`).join(", ");
      const docs = b.docs.map((r) => REGION[r]).join(", ");
      return `On file for ${p.name}: ${certs}. ${b.name} has export paperwork ready for ${docs}. MSDS, COA and the full INCI are sent with the proforma invoice; for any other market, ask below and we check with the brand.`;
    },
  },
  { label: "Is private label or custom packaging possible?" },
  { label: "Can I get a tester set for my staff?" },
];

const newRef = () => `KQ-${Date.now().toString(36).slice(-5).toUpperCase()}`;

function load<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "null");
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export default function AskProduct({ p, b, open, first, onClose }: { p: Product; b: Brand; open: boolean; first?: string; onClose: () => void }) {
  const { buyer } = useBuyer();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore this product's thread and any contact the buyer already left.
  // In design preview, every open is a fresh thread parked on the hand-off card.
  useEffect(() => {
    if (!open) return;
    if (DESIGN_PREVIEW) {
      const at = Date.now();
      setContact(null);
      setDraft("");
      setMsgs([
        { role: "user", text: PREVIEW_QUESTION, at },
        { role: "bot", text: `This one needs the ${b.name} team rather than a stock answer. Leave a WhatsApp number or an email and the team in charge of ${b.name} will contact you within one business day.`, at },
        { role: "handoff", at, ref: newRef() },
      ]);
      setHydrated(true);
      return;
    }
    if (hydrated) return;
    setMsgs(load<Msg[]>(KEY(p.id), []));
    setContact(load<Contact | null>(CONTACT_KEY, null));
    setHydrated(true);
  }, [open, hydrated, p.id, b.name]);

  useEffect(() => {
    if (!hydrated || DESIGN_PREVIEW) return;
    try { localStorage.setItem(KEY(p.id), JSON.stringify(msgs)); } catch {}
  }, [msgs, hydrated, p.id]);

  useEffect(() => {
    if (!hydrated || !contact || DESIGN_PREVIEW) return;
    try { localStorage.setItem(CONTACT_KEY, JSON.stringify(contact)); } catch {}
  }, [contact, hydrated]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      window.addEventListener("keydown", onKey);
      setTimeout(() => inputRef.current?.focus(), 450);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing, open]);

  const askedTexts = msgs.flatMap((m) => (m.role === "user" ? [m.text.toLowerCase()] : []));
  const asked = askedTexts.length;
  const remaining = QUICK.filter((q) => !askedTexts.includes(q.label.toLowerCase()));
  const pendingHandoff = msgs.some((m) => m.role === "handoff" && !m.sent);

  const reply = (text: string, after?: () => void) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((xs) => [...xs, { role: "bot", text, at: Date.now() }]);
      after?.();
    }, TYPING_MS);
  };

  /** A question we cannot answer from the data: hand it to the brand team. */
  const handoff = () => {
    if (contact) {
      reply(`Noted. The ${b.name} team already has your ${contact.channel === "whatsapp" ? "WhatsApp" : "email"} and will include this in their reply within one business day.`);
      return;
    }
    if (pendingHandoff) {
      reply("Added to your thread. Leave a WhatsApp number or email below so the team can reach you.");
      return;
    }
    reply(
      `This one needs the ${b.name} team rather than a stock answer. Leave a WhatsApp number or an email and the team in charge of ${b.name} will contact you within one business day.`,
      () => setMsgs((xs) => [...xs, { role: "handoff", at: Date.now(), ref: newRef() }]),
    );
  };

  const ask = (text: string, q?: Quick) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((xs) => [...xs, { role: "user", text: t, at: Date.now() }]);
    setDraft("");
    if (q?.answer) reply(q.answer(p, b));
    else handoff();
  };

  const leave = (c: Contact, ref: string) => {
    setContact(c);
    setMsgs((xs) => xs.map((m) => (m.role === "handoff" && m.ref === ref ? { ...m, sent: c } : m)));
    reply(`Got it. The ${b.name} team will reach you on ${c.channel === "whatsapp" ? `WhatsApp at ${c.value}` : c.value} within one business day. Your reference is ${ref}. You can keep asking here in the meantime.`);
  };

  // A question passed in from a link is asked once, on a fresh thread.
  const firstAsked = useRef(false);
  useEffect(() => {
    if (!hydrated || !first || firstAsked.current || msgs.length || DESIGN_PREVIEW) return;
    firstAsked.current = true;
    const q = QUICK.find((x) => x.label.toLowerCase() === first.toLowerCase());
    ask(first, q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, first]);

  const submit = (e: FormEvent) => { e.preventDefault(); ask(draft); };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(draft); }
  };
  const time = (at: number) => new Date(at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <>
      <div className={`scrim ${open ? "is-on" : ""}`} onClick={onClose} />
      <aside className={`drawer ask ${open ? "is-on" : ""}`} aria-hidden={!open} aria-label={`Ask about ${p.name}`}>
        <header className="drawer__head ask__head">
          <div>
            <span className="eyebrow">Ask about this product</span>
            <h3 className="serif">{p.name}</h3>
            <p className="muted small">{b.name} · KLOW brand team, Seoul</p>
          </div>
          <button className="link" onClick={onClose}>Close</button>
        </header>

        <div className="chat">
          <Bot>
            <p>Hi — a few things about {p.name} we can answer straight away are below. Anything else goes to the {b.name} team, who reply on WhatsApp or email within one business day.</p>
          </Bot>

          {msgs.map((m, i) => {
            if (m.role === "handoff") return <HandoffCard key={i} m={m} buyer={buyer} onLeave={(c) => leave(c, m.ref)} />;
            if (m.role === "bot") return <Bot key={i}><p>{m.text}</p><time>{time(m.at)}</time></Bot>;
            return (
              <div key={i} className="chat__msg chat__msg--user">
                <div className="chat__bubble"><p>{m.text}</p><time>{time(m.at)}</time></div>
              </div>
            );
          })}

          {typing && (
            <div className="chat__msg chat__msg--bot">
              <span className="chat__mark">K</span>
              <span className="dots"><i /><i /><i /></span>
            </div>
          )}

          {remaining.length > 0 && !typing && !pendingHandoff && (
            <div className={`chat__quick ${asked ? "chat__quick--more" : ""}`}>
              <span className="eyebrow">{asked ? "Also common" : "Common questions"}</span>
              {remaining.map((q) => (
                <button key={q.label} type="button" onClick={() => ask(q.label, q)}>
                  {q.label}
                  <span className="chat__quick-k">{q.answer ? "Instant" : "Brand team"}</span>
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form className="chat__composer" onSubmit={submit}>
          <div className="chat__row">
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask anything about this product…"
              rows={1}
              aria-label="Your question"
              disabled={typing}
            />
            <button type="submit" className="btn btn--solid btn--plain" disabled={!draft.trim() || typing}>Send</button>
          </div>
          <p className="muted small">
            {contact
              ? `Replies from the ${b.name} team go to ${contact.value}.`
              : "Questions we can't answer here go to the brand team, who reply on WhatsApp or email."}
          </p>
        </form>
      </aside>
    </>
  );
}

function Bot({ children }: { children: React.ReactNode }) {
  return (
    <div className="chat__msg chat__msg--bot">
      <span className="chat__mark">K</span>
      <div className="chat__bubble">{children}</div>
    </div>
  );
}

/** Inline card: pick WhatsApp or email, leave the detail, done. Buyers who are signed in get their details offered. */
function HandoffCard({ m, buyer, onLeave }: { m: Extract<Msg, { role: "handoff" }>; buyer: { email: string; dial: string; phone: string } | null; onLeave: (c: Contact) => void }) {
  // WhatsApp first, unless the signed-in buyer has no phone on file.
  const [channel, setChannel] = useState<Channel>(buyer && !buyer.phone ? "email" : "whatsapp");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!buyer) return;
    setValue(channel === "whatsapp" ? (buyer.phone ? `${buyer.dial} ${buyer.phone}` : "") : buyer.email);
  }, [channel, buyer]);

  const valid = channel === "email" ? /\S+@\S+\.\S+/.test(value) : value.replace(/\D/g, "").length >= 7;

  if (m.sent) {
    return (
      <div className="chat__hand chat__hand--done">
        <span className="chat__hand-tick">✓</span>
        <div>
          <b>{m.sent.channel === "whatsapp" ? "WhatsApp" : "Email"} left · {m.ref}</b>
          <span className="muted small">{m.sent.value}</span>
        </div>
      </div>
    );
  }

  return (
    <form className="chat__hand" onSubmit={(e) => { e.preventDefault(); if (valid) onLeave({ channel, value: value.trim() }); }}>
      <span className="eyebrow">Where should the brand team reach you?</span>
      <div className="chat__hand-tabs" role="radiogroup">
        <button type="button" role="radio" aria-checked={channel === "whatsapp"} className={channel === "whatsapp" ? "is-on" : ""} onClick={() => setChannel("whatsapp")}>WhatsApp</button>
        <button type="button" role="radio" aria-checked={channel === "email"} className={channel === "email" ? "is-on" : ""} onClick={() => setChannel("email")}>Email</button>
      </div>
      <div className="chat__hand-row">
        {channel === "whatsapp" ? (
          <input type="tel" value={value} onChange={(e) => setValue(e.target.value)} placeholder="+1 415 555 0100" autoComplete="tel" aria-label="WhatsApp number" />
        ) : (
          <input type="email" value={value} onChange={(e) => setValue(e.target.value)} placeholder="you@company.com" autoComplete="email" aria-label="Email" />
        )}
        <button type="submit" className="btn btn--solid btn--plain" disabled={!valid}>Leave it</button>
      </div>
      <span className="muted small">The team in charge of this brand contacts you within one business day. No newsletter, no sharing.</span>
    </form>
  );
}
