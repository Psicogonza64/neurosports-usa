import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type ResearchSectionProps = {
  locale?: HomeLocale;
};

export function ResearchSection({ locale = "en" }: ResearchSectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="research-preview">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.research.eyebrow}
          title={content.research.title}
          description={content.research.intro}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Card className="bg-[color:color-mix(in_srgb,var(--ns-sand)_16%,var(--panel))] p-6 sm:p-8 lg:p-10">
            <div className="flex min-h-72 flex-col justify-between gap-8 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_48%,white)] p-6">
              <p className="max-w-lg text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                Institutional research communication remains focused on public educational themes and transparent scientific direction.
              </p>
              <div>
                <div className="flex flex-wrap gap-3">
                  <Button href={content.research.ctaHref} variant="secondary">
                    <span>{content.research.ctaLabel}</span>
                  </Button>
                  <Button href="/schedule" dataCta="schedule-evaluation" dataLocation="research">
                    <span>Schedule Evaluation</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5">
            {content.research.items.map((item) => (
              <Card key={item.title} className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl text-[var(--color-foreground)]">{item.title}</h3>
                  <p className="text-sm leading-6 text-[var(--color-muted)]">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}