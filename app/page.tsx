import { SiteShell } from "@/components/layout/site-shell";
import { CTA } from "@/components/ui/cta";
import {
  ClinicalPerformanceSection,
  DualPathSection,
  ExperienceQuoteSection,
  HeroSection,
  PublicProcessesSection,
  IntegratedModelSection,
  JourneyFlowSection,
  ResearchSection,
  TechnologySection,
  TestimonialsSection,
  WhatWeDoSection,
  WhoWeHelpSection,
} from "@/modules/website/home/sections";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <PublicProcessesSection />
      <ExperienceQuoteSection />
      <DualPathSection />
      <ClinicalPerformanceSection />
      <JourneyFlowSection />
      <WhatWeDoSection />
      <WhoWeHelpSection />
      <IntegratedModelSection />
      <TechnologySection />
      <ResearchSection />
      <TestimonialsSection />
      <CTA
        eyebrow="Final CTA"
        title="Start with a comprehensive evaluation."
        buttonLabel="Schedule Evaluation"
        buttonHref="#contact"
      />
    </SiteShell>
  );
}