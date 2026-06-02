import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeading } from "@/components/ui";
import { LocationCard } from "@/components/locations/LocationCard";

interface LocationsProps {
  dict: Dictionary;
}

export function Locations({ dict }: LocationsProps) {
  return (
    <section id="locations" className="section-padding bg-brand-dark">
      <div className="container-max">
        <SectionHeading
          title={dict.locations.title}
          subtitle={dict.locations.subtitle}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {dict.locations.items.map((location) => (
            <LocationCard key={location.id} location={location} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
