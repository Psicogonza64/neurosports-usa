import { SiteShell } from "@/components/layout/site-shell";
import { CTA } from "@/components/ui/cta";
import {
  CorePathwaysSection,
  HeroSection,
  IntegratedModelSection,
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
      <WhatWeDoSection />
      <WhoWeHelpSection />
      <IntegratedModelSection />
      <TechnologySection />
      <CorePathwaysSection />
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