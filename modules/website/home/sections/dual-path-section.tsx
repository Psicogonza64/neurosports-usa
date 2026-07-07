import {
  DualPath,
  JourneyDivider,
  SectionHeader,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";

export function DualPathSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="One Model" />
          <SectionHeader
            centered
            label="MNSI Architecture"
            title="One scientific model connecting Clinical Neuroscience and NeuroPerformance."
            subtitle="NeuroSports USA is organized as one neuroscience platform where clinical care and performance transfer emerge from the same scientific structure."
          />
          <div className="mt-14">
            <DualPath />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}