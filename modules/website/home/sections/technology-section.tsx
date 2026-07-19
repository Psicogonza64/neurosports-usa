import { Button } from "@/components/ui/button";
import {
  InstitutionalSignalsGrid,
  ScientificCard,
  ScientificSectionBlock,
} from "@/components/experience";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type TechnologySectionProps = {
  locale?: HomeLocale;
};

export function TechnologySection({ locale = "en" }: TechnologySectionProps) {
  const content = getNeuroSportsHomeContent(locale);
  const technologySignals = content.technology.items.map((item) => ({
    ...item,
    label: "Technology",
  }));

  return (
    <ScientificSectionBlock
      id="technology-preview"
      label={content.technology.eyebrow}
      title={content.technology.title}
      description={content.technology.intro}
      content={(
        <div className="nsu-section-stack">
          <InstitutionalSignalsGrid items={technologySignals} columns="5" />
          <ScientificCard className="bg-[color:color-mix(in_srgb,var(--ns-sand)_12%,var(--panel))] p-5 sm:p-6">
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Placeholder framework reserved for approved technology photography and device imagery.
            </p>
          </ScientificCard>
        </div>
      )}
      cta={(
        <Button href={content.technology.ctaHref} variant="secondary">
          <span>{content.technology.ctaLabel}</span>
        </Button>
      )}
    />
  );
}