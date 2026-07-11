import { ProcessExplorer } from "@/components/experience/process-explorer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getNeuroSportsPublicContent } from "@/lib/neurosports-public-content";

export function PublicProcessesSection() {
  const content = getNeuroSportsPublicContent("en");

  return (
    <section className="border-b nsu-border" id="public-processes">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.processExplorer.eyebrow}
          title={content.processExplorer.title}
          description={content.processExplorer.description}
        />

        <ProcessExplorer
          className="mt-14"
          items={content.processExplorer.items}
          mode="summary"
          sequenceLabel={content.processExplorer.sequenceLabel}
        />
      </Container>
    </section>
  );
}
