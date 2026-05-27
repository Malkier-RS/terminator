import type { Dictionary } from "@/i18n/get-dictionary";
import { Button, SectionHeading } from "@/components/ui";

interface PricingProps {
  dict: Dictionary;
  locale: string;
}

export function Pricing({ dict, locale }: PricingProps) {
  return (
    <section id="pricing" className="section-padding bg-brand-black">
      <div className="container-max">
        <SectionHeading
          title={dict.pricing.title}
          subtitle={dict.pricing.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="card-glow rounded-sm bg-brand-dark p-8 lg:col-span-2">
            <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-brand-white">
              {dict.pricing.monthly}
            </h3>
            <div className="mt-6 space-y-4">
              {dict.pricing.monthlyPlans.map((plan) => (
                <div
                  key={plan.location}
                  className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0"
                >
                  <span className="text-brand-light">{plan.location}</span>
                  <span className="font-[family-name:var(--font-display)] text-2xl text-brand-accent">
                    {plan.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-glow rounded-sm bg-brand-dark p-8 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-brand-white">
                {dict.pricing.dayPass}
              </h3>
              <p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-brand-accent">
                {dict.pricing.dayPassPrice}
              </p>
            </div>

            <div className="card-glow rounded-sm border border-dashed border-white/10 bg-brand-gray/50 p-8 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-brand-white">
                {dict.pricing.personalTraining}
              </h3>
              <p className="mt-4 text-brand-muted">
                {dict.pricing.personalTrainingNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            href={`/${locale}#contact`}
            variant="primary"
            size="lg"
            className="animate-pulse-glow"
          >
            {dict.pricing.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
