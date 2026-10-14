/**
 * Numbered steps joined by a thin rule: across on desktop (up to 6), down on mobile.
 * `meta` is a small mono line under each step, e.g. how long it takes.
 */
export default function StepFlow({ steps }: { steps: { title: string; description?: string; meta?: string }[] }) {
  return (
    <ol className="about-flow" style={{ "--steps": Math.min(steps.length, 6) } as React.CSSProperties}>
      {steps.map((s, i) => (
        <li key={i}>
          <span className="about-flow__n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          {s.description && <p>{s.description}</p>}
          {s.meta && <span className="about-flow__meta">{s.meta}</span>}
        </li>
      ))}
    </ol>
  );
}
