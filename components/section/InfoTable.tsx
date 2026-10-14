/** Two-column facts table: mono uppercase label, plain value. Stacks to one column on mobile. */
export default function InfoTable({ rows }: { rows: { key?: string; label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="about-facts">
      {rows.map((r, i) => (
        <div key={r.key ?? i}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
