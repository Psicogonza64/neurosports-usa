import {
  JourneyDivider,
  JourneyFlow,
  SectionHeader,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";
import { homeJourneySteps } from "@/modules/website/home/data";

export function JourneyFlowSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Journey Flow" />
          <SectionHeader
            label="How Every Journey Begins"
            title="A structured path from evaluation to functional outcomes."
            subtitle="Every NeuroSports pathway starts with a functional reading of the brain and advances through a sequential MNSI intervention process."
          />
          <div className="mt-14">
            <JourneyFlow steps={homeJourneySteps} />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}