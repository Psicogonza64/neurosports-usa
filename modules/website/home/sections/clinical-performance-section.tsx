import {
  ClinicalPerformanceCards,
  JourneyDivider,
  SectionHeader,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";
import {
  clinicalNeurosciencePath,
  neuroPerformancePath,
} from "@/modules/website/home/data";

export function ClinicalPerformanceSection() {
  return (
    <section className="border-b nsu-border" id="services">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Two Applications" />
          <SectionHeader
            label="Clinical Neuroscience + NeuroPerformance"
            title="Two applications of the same neuroscience platform."
            subtitle="The model is not split into separate businesses. Clinical care and human performance are aligned as two institutional expressions of MNSI."
          />
          <div className="mt-14">
            <ClinicalPerformanceCards
              clinical={clinicalNeurosciencePath}
              performance={neuroPerformancePath}
            />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}