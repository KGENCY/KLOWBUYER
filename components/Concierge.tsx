"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FREE_SHIPPING_SKUS, money, productsOf } from "@/lib/data";
import { ACKS, Answers, STEPS, Step, labelFor, matchBrands } from "@/lib/match";
import Photo from "./Photo";
import { useSamples } from "./SampleBox";

type Msg = { role: "bot" | "user"; text: string; note?: string };

const TYPING_MS = 700;

const answerText = (s: Step, a: Answers) => {
  const v = a[s.key];
  if (v === undefined) return "";
  return (Array.isArray(v) ? v : [v]).map((x) => labelFor(s.key, x)).join(", ");
};

export default function Concierge({ initialType }: { initialType?: string }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState(-1); // index of the question awaiting an answer
  const [typing, setTyping] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);

  const say = (m: Msg, delay = TYPING_MS) =>
    new Promise<void>((res) => {
      setTyping(true);
      setTimeout(() => { setTyping(false); setMsgs((xs) => [...xs, m]); res(); }, delay);
    });

  const ask = async (i: number, a: Answers) => {
    const prev = STEPS[i - 1];
    const ack = prev ? ACKS[prev.key]?.(a) : undefined;
    await say({ role: "bot", text: STEPS[i].question, note: [ack, STEPS[i].hint].filter(Boolean).join(" ") });
    setStep(i);
  };

  const start = async (prefill?: string) => {
    setMsgs([]); setAnswers({}); setPicked([]); setDone(false); setRecapOpen(false); setStep(-1);
    await say({ role: "bot", text: "Welcome to KLOW.", note: "Five short questions about how you sell — then we'll match you with Korean brands built for your business." }, 350);
    const t = STEPS[0].options.find((o) => o.value === prefill);
    if (!t) return ask(0, {});
    await say({ role: "bot", text: STEPS[0].question }, 350);
    commit(0, [t.value], {});
  };

  useEffect(() => {
    if (booted.current) return; // guard against StrictMode double-run
    booted.current = true;
    start(initialType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Follow the thread as it grows. The second pass re-aligns after the option tiles finish rising,
  // so the newest question never ends up under the fixed sample bar (see .thread__end scroll-margin).
  useEffect(() => {
    const go = () => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    go();
    const t = setTimeout(go, 450);
    return () => clearTimeout(t);
  }, [msgs, typing, step]);

  const commit = async (i: number, values: string[], base: Answers) => {
    const s = STEPS[i];
    const next: Answers = { ...base, [s.key]: s.max ? values : values[0] };
    setAnswers(next);
    setPicked([]);
    setStep(-1);
    setMsgs((xs) => [...xs, { role: "user", text: values.map((v) => labelFor(s.key, v)).join(", ") }]);
    if (i + 1 < STEPS.length) return ask(i + 1, next);
    await say({ role: "bot", text: "Thank you — matching you with brands now." }, 600);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setDone(true);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }, 1100);
  };

  const current: Step | undefined = STEPS[step];
  const onPick = (v: string) => {
    if (!current) return;
    if (!current.max) return commit(step, [v], answers);
    setPicked((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : xs.length < current.max! ? [...xs, v] : xs));
  };

  const answered = STEPS.filter((s) => answers[s.key] !== undefined).length;

  return (
    <>
      <section className={`concierge ${done ? "concierge--done" : ""}`}>
        <div className="concierge__top">
          <span className="eyebrow">KLOW Concierge</span>
          <span className="concierge__step">{String(Math.min(answered + (done ? 0 : 1), STEPS.length)).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
          <button className="link small" disabled={typing} onClick={() => start()}>Start over</button>
        </div>
        <div className="concierge__bar"><i style={{ width: `${(answered / STEPS.length) * 100}%` }} /></div>

        {done ? (
          <div className="recap">
            <button className="recap__head" onClick={() => setRecapOpen((o) => !o)} aria-expanded={recapOpen}>
              <div>
                <span className="eyebrow">Your answers · {STEPS.length} of {STEPS.length}</span>
                <p>{STEPS.map((s) => answerText(s, answers)).filter(Boolean).join(" · ")}</p>
              </div>
              <span className="recap__chev" aria-hidden>{recapOpen ? "−" : "+"}</span>
            </button>
            {recapOpen && (
              <dl className="recap__body">
                {STEPS.map((s) => (
                  <div key={s.key} className="recap__row">
                    <dt>{s.question}</dt>
                    <dd>{answerText(s, answers)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ) : (
        <div className="thread">
          {msgs.map((m, i) =>
            m.role === "bot" ? (
              <div key={i} className="msg msg--bot">
                <p className="msg__text">{m.text}</p>
                {m.note && <p className="msg__note">{m.note}</p>}
              </div>
            ) : (
              <div key={i} className="msg msg--user"><p>{m.text}</p></div>
            )
          )}

          {typing && (
            <div className="msg msg--bot">
              <span className="dots"><i /><i /><i /></span>
            </div>
          )}

          {current && !typing && (
            <div className="choices">
              <div className={`options ${current.options.length > 6 ? "options--compact" : ""}`}>
                {current.options.map((o, idx) => {
                  const on = picked.includes(o.value);
                  return (
                    <button key={o.value} className={`option ${on ? "is-on" : ""}`} onClick={() => onPick(o.value)} style={{ animationDelay: `${idx * 40}ms` }}>
                      <span className="option__label">{o.label}</span>
                      {o.note && <span className="option__note">{o.note}</span>}
                      {current.max && <span className="option__tick" />}
                    </button>
                  );
                })}
              </div>
              {current.max && (
                <div className="choices__foot">
                  <span className="muted small">{picked.length} of {current.max} selected</span>
                  <button className="btn btn--solid" disabled={!picked.length} onClick={() => commit(step, picked, answers)}>Continue</button>
                </div>
              )}
            </div>
          )}
          <div ref={endRef} className="thread__end" aria-hidden />
        </div>
        )}
      </section>

      <div ref={resultsRef}>{done && <Results answers={answers} />}</div>
    </>
  );
}

function Results({ answers }: { answers: Answers }) {
  const matches = useMemo(() => matchBrands(answers), [answers]);
  const [all, setAll] = useState(false);
  const { addMany, has, setOpen } = useSamples();
  const shown = all ? matches : matches.slice(0, 6);

  const summary = [
    answers.type && labelFor("type", answers.type),
    answers.region && labelFor("region", answers.region),
    answers.purpose && labelFor("purpose", answers.purpose),
    ...(answers.lines ?? []).map((l) => labelFor("lines", l)),
    ...(answers.priorities ?? []).map((p) => labelFor("priorities", p)),
  ].filter(Boolean) as string[];

  return (
    <section className="results">
      <div className="wrap">
        <div className="results__head">
          <span className="eyebrow">Matched for your business</span>
          <h2 className="h2">{matches.filter((m) => m.score >= 70).length} brands fit how you sell.</h2>
          <ul className="tags">{summary.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>

        <ol className="matches">
          {shown.map((m, i) => {
            const b = m.brand;
            const ps = productsOf(b.id).slice(0, 3);
            const allIn = ps.every((p) => has(p.id));
            return (
              <li key={b.id} className="match" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="match__rank">{String(i + 1).padStart(2, "0")}</div>
                <div className="match__brand">
                  <span className="eyebrow">{b.tier === "icon" ? "K-Beauty icon" : "Hidden gem"} · {b.city}, est. {b.founded}</span>
                  <h3>{b.name}</h3>
                  <p className="muted">{b.tagline}</p>
                  <div className="match__fit"><b>{m.score}%</b> fit</div>
                </div>
                <div className="match__why">
                  <ul>{(m.reasons.length ? m.reasons : ["A complementary brand for your line-up"]).map((r) => <li key={r}>{r}</li>)}</ul>
                  <dl className="match__stats">
                    <div><dt>Reorder MOQ</dt><dd>{b.moq} units</dd></div>
                    <div><dt>Avg. margin</dt><dd>{b.margin.toFixed(1)}×</dd></div>
                    <div><dt>Dispatch</dt><dd>{b.leadDays} days</dd></div>
                  </dl>
                </div>
                <div className="match__products">
                  <div className="match__thumbs">
                    {ps.map((p) => (
                      <div key={p.id} className={`thumb ${has(p.id) ? "is-added" : ""}`} title={p.name}>
                        <Photo p={p} sizes="120px" />
                        <span>{money(p.wholesale)}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`btn ${allIn ? "btn--ghost" : "btn--solid"} btn--block`}
                    onClick={() => (allIn ? setOpen(true) : addMany(ps.map((p) => p.id)))}
                  >
                    {allIn ? "In your sample box" : `Sample ${ps.length} products · ${money(ps.reduce((s, p) => s + p.wholesale, 0))}`}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="results__foot">
          {!all && matches.length > 6 && <button className="btn btn--ghost" onClick={() => setAll(true)}>Show all {matches.length} brands</button>}
          <p className="muted small">Mix products across brands — any {FREE_SHIPPING_SKUS} SKUs ship complimentary. <Link href="/#collection" className="link">Browse the full collection</Link></p>
        </div>
      </div>
    </section>
  );
}

