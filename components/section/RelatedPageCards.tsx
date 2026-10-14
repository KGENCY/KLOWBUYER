import Link from "next/link";

/** Two or three large cards pointing to the next pages to read. data-cta-id is `${ctaPrefix}_${card.key}`. */
export default function RelatedPageCards({
  cards,
  ctaPrefix,
  headingLevel: Heading = "h2",
}: {
  cards: { key: string; href: string; title: string; description?: string }[];
  ctaPrefix: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className={`about-related__grid about-related__grid--${Math.min(cards.length, 3)}`}>
      {cards.map((c) => (
        <li key={c.key}>
          <Link href={c.href} data-cta-id={`${ctaPrefix}_${c.key}`}>
            <Heading>{c.title}</Heading>
            {c.description && <p>{c.description}</p>}
            <span className="about-related__go" aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
