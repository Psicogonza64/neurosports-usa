import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { researchPillars } from "@/modules/website/home/data";

export function ResearchSection() {
  return (
    <section className="border-b nsu-border" id="research">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Research"
          title="An institutional research presence designed to support credibility, education, and future publication visibility."
          description="Research is positioned as a structural pillar of the platform, connecting scientific authority with clinical clarity and educational value."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Card className="bg-[color:color-mix(in_srgb,var(--color-primary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
            <div className="flex min-h-72 flex-col justify-between gap-8 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_48%,white)] p-6">
              <p className="max-w-lg text-sm leading-7 text-[var(--color-muted)]">
                Placeholder area for future publications, clinical resources, and research summaries.
              </p>
              <div>
                <Button href="#" variant="secondary">
                  View Research
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-5">
            {researchPillars.map((item) => (
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