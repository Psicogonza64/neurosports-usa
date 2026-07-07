import {
  ClinicalPerformanceCards,
  DualPath,
  FeatureGrid,
  JourneyCTA,
  JourneyDivider,
  JourneyFlow,
  NeuroHero,
  ScientificQuote,
  SectionHeader,
  SectionSpacing,
} from "@/components/experience";
import { Container } from "@/components/ui/container";
import {
  whatWeDeliverItems,
  whatWeDoClinicalPath,
  whatWeDoJourneySteps,
  whatWeDoPerformancePath,
} from "@/modules/website/what-we-do/data";

function WhatWeDoHeroVisual() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">
        Brain Systems Overview
      </span>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[42%] border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_72%,white)] px-8 text-center text-sm leading-6 text-[var(--color-muted)]">
          <div className="absolute inset-[7%] rounded-[42%] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute inset-[15%] rounded-[38%] border border-[color:color-mix(in_srgb,var(--color-primary)_16%,var(--color-border))]" />

          <div className="absolute left-[19%] top-[27%] h-px w-[26%] rotate-[-8deg] bg-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))]" />
          <div className="absolute right-[17%] top-[34%] h-px w-[24%] rotate-[10deg] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />
          <div className="absolute left-[33%] bottom-[30%] h-px w-[30%] rotate-[-14deg] bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute right-[26%] bottom-[24%] h-px w-[19%] rotate-[20deg] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />

          <div className="absolute left-[20%] top-[28%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_48%,white)]" />
          <div className="absolute left-[45%] top-[27%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_45%,white)]" />
          <div className="absolute right-[18%] top-[34%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]" />
          <div className="absolute left-[36%] bottom-[30%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_45%,white)]" />
          <div className="absolute right-[29%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_40%,white)]" />

          <span className="relative z-10 max-w-[12.5rem] rounded-full border border-[color:color-mix(in_srgb,var(--color-border)_78%,white)] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] px-4 py-2">
            Functional Brain Architecture
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <NeuroHero
      eyebrow="WHAT WE DO"
      title="Clinical care and human performance through one integrated neuroscience model."
      subtitle="NeuroSports USA applies MNSI to evaluate, rehabilitate and optimize brain function across clinical and athletic contexts."
      ctaLabel="Explore the Integrated Model"
      ctaHref="/integrated-model"
      illustration={<WhatWeDoHeroVisual />}
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

function JourneyFlowSection() {
  return (
    <section className="border-b nsu-border">
      <Container>
        <SectionSpacing>
          <JourneyDivider label="Journey" />
          <SectionHeader
            label="From Evaluation to Functional Outcomes"
            title="A sequential route from understanding the brain to applying change."
            subtitle="The What We Do page describes a process, not a menu of disconnected services."
          />
          <div className="mt-14">
            <JourneyFlow steps={whatWeDoJourneySteps} />
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

export function WhatWeDoPage() {
  return (
    <>
      <HeroSection />
      <ScientificQuoteSection />
      <DualPathSection />
      <ClinicalPerformanceSection />
      <JourneyFlowSection />
      <WhatWeDeliverSection />
      <FinalCtaSection />
    </>
  );
}