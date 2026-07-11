import { ProcessExplorer } from "@/components/experience/process-explorer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type PublicProcessesSectionProps = {
  locale?: HomeLocale;
};

export function PublicProcessesSection({ locale = "en" }: PublicProcessesSectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="process">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.process.eyebrow}
          title={content.process.title}
          description={content.process.intro}
        />

        <ProcessExplorer
          className="mt-14"
          items={content.process.items}
          mode="interactive"
          sequenceLabel={content.process.sequenceLabel}
        />
      </Container>
    </section>
  );
}
