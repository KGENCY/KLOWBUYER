/** Numbered steps joined by a thin rule: across on desktop, down on mobile. */
export default function StepFlow({ steps }: { steps: { title: string; description?: string }[] }) {
  return (
    <ol className="about-flow">
      {steps.map((s, i) => (
        <li key={i}>
          <span className="about-flow__n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          {s.description && <p>{s.description}</p>}
        </li>
      ))}
    </ol>
  );
}
