import { Button } from "@/components/ui/button";
import {
  InstitutionalSignalsGrid,
  ScientificCard,
  ScientificSectionBlock,
} from "@/components/experience";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type ResearchSectionProps = {
  locale?: HomeLocale;
};

export function ResearchSection({ locale = "en" }: ResearchSectionProps) {
  const content = getNeuroSportsHomeContent(locale);
  const researchSignals = content.research.items.map((item) => ({
    ...item,
    label: "Research",
  }));

  return (
    <ScientificSectionBlock
      id="research-preview"
      label={content.research.eyebrow}
      title={content.research.title}
      description={content.research.intro}
      content={(
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <ScientificCard className="bg-[color:color-mix(in_srgb,var(--ns-sand)_16%,var(--panel))] p-6 sm:p-8 lg:p-10">
            <div className="flex min-h-72 flex-col justify-between gap-8 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_48%,white)] p-6">
              <p className="max-w-lg text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                Institutional research communication remains focused on public educational themes and transparent scientific direction.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href={content.research.ctaHref} variant="secondary">
                  <span>{content.research.ctaLabel}</span>
                </Button>
                <Button href="/schedule" dataCta="schedule-initial-evaluation" dataLocation="research">
                  <span>Schedule Evaluation</span>
                </Button>
              </div>
            </div>
          </ScientificCard>

          <InstitutionalSignalsGrid items={researchSignals} columns="2" className="items-start" />
        </div>
      )}
    />
  );
}