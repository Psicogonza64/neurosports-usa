import {
  ClinicalPerformanceCards,
  DualPath,
  FeatureGrid,
  HeroObjectPlaceholder,
  JourneyCTA,
  JourneyDivider,
  ProcessExplorer,
  NeuroHero,
  ScientificQuote,
  SectionHeader,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";
import {
  getNeuroSportsPublicContent,
  type PublicContentLocale,
} from "@/lib/neurosports-public-content";
import {
  whatWeDeliverItems,
  whatWeDoClinicalPath,
  whatWeDoPerformancePath,
} from "@/modules/website/what-we-do/data";

function HeroSection() {
  return (
    <NeuroHero
      eyebrow="WHAT WE DO"
      title="Clinical care and human performance through one integrated neuroscience model."
      subtitle="NeuroSports USA applies MNSI to evaluate, rehabilitate and optimize brain function across clinical and athletic contexts."
      ctaLabel="Explore the Integrated Model"
      ctaHref="/integrated-model"
      illustration={<HeroObjectPlaceholder />}
    />
  );
}

function ScientificQuoteSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Scientific Position" />
          <ScientificQuote quote="We do not separate rehabilitation from performance. We understand both as expressions of brain function." />
        </SectionSpacing>
      </Container>
    </section>
  );
}

function DualPathSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="One Model" />
          <SectionHeader
            centered
            label="MNSI"
            title="Clinical Neuroscience and NeuroPerformance are two applications of the same model."
            subtitle="What We Do is not a list of services. It is the practical application of one neuroscience architecture across clinical and athletic environments."
          />
          <div className="mt-14">
            <DualPath />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}

function ClinicalPerformanceSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Applied Worlds" />
          <SectionHeader
            label="Clinical Neuroscience + NeuroPerformance"
            title="Two applied worlds, one scientific logic."
            subtitle="Both pathways are organized under MNSI so that care, rehabilitation and performance remain part of one institutional framework."
          />
          <div className="mt-14">
            <ClinicalPerformanceCards
              clinical={whatWeDoClinicalPath}
              performance={whatWeDoPerformancePath}
            />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}

function JourneyFlowSection({ locale }: { locale: PublicContentLocale }) {
  const content = getNeuroSportsPublicContent(locale);

  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Public Process" />
          <SectionHeader
            label={content.processExplorer.eyebrow}
            title={content.processExplorer.title}
            subtitle={content.processExplorer.description}
          />
          <div className="mt-14">
            <ProcessExplorer
              items={content.processExplorer.items}
              mode="interactive"
              sequenceLabel={content.processExplorer.sequenceLabel}
            />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}

function WhatWeDeliverSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Deliverables" />
          <SectionHeader
            label="What We Deliver"
            title="Structured neuroscience applications designed for care, transfer and performance."
            subtitle="Each area below is part of one platform architecture rather than a standalone service line."
          />
          <div className="mt-14">
            <FeatureGrid items={whatWeDeliverItems} />
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="border-b nsu-border" id="appointments">
      <Container>
        <SectionSpacing>
          <JourneyCTA
            title="Start with a Functional Brain Evaluation"
            text="Every clinical and performance journey begins by understanding how the brain is functioning today."
            ctaLabel="Schedule an Evaluation"
            ctaHref="/contact"
          />
        </SectionSpacing>
      </Container>
    </section>
  );
}

export function WhatWeDoPage({ locale = "en" }: { locale?: PublicContentLocale }) {
  return (
    <>
      <HeroSection />
      <ScientificQuoteSection />
      <DualPathSection />
      <ClinicalPerformanceSection />
      <JourneyFlowSection locale={locale} />
      <WhatWeDeliverSection />
      <FinalCtaSection />
    </>
  );
}