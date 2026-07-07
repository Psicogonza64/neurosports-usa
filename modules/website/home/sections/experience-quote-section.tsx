import {
  JourneyDivider,
  ScientificQuote,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";

export function ExperienceQuoteSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Platform Identity" />
          <ScientificQuote quote="This is not a conventional clinic. It is a neuroscience platform where one scientific model transforms clinical rehabilitation and human performance." />
        </SectionSpacing>
      </Container>
    </section>
  );
}