import type { Dictionary } from "@/i18n/get-dictionary";
import { HighlightCard } from "@/components/ui";

interface HighlightsProps {
  dict: Dictionary;
}

const icons = {
  equipment: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 7h16M4 12h16M4 17h10"
      />
    </svg>
  ),
  atmosphere: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  locations: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

export function Highlights({ dict }: HighlightsProps) {
  const cards = [
    { key: "equipment" as const, ...dict.highlights.equipment },
    { key: "atmosphere" as const, ...dict.highlights.atmosphere },
    { key: "locations" as const, ...dict.highlights.locations },
  ];

  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-max">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <HighlightCard
              key={card.key}
              icon={icons[card.key]}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
