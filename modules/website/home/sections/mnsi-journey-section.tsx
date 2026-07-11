import { MnsiPhaseExplorer } from "@/components/experience/mnsi-phase-explorer";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type MnsiJourneySectionProps = {
  locale?: HomeLocale;
};

export function MnsiJourneySection({ locale = "en" }: MnsiJourneySectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="mnsi-journey">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.mnsi.eyebrow}
          title={content.mnsi.title}
          description={content.mnsi.intro}
        />

        <MnsiPhaseExplorer className="mt-14" phases={content.mnsi.phases} />

        <div className="mt-8">
          <Button href={content.mnsi.ctaHref} variant="secondary">
            <span>{content.mnsi.ctaLabel}</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
