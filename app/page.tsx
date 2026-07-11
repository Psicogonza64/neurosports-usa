import { SiteShell } from "@/components/layout/site-shell";
import { LocationsExplorer } from "@/components/experience/locations-explorer";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { SectionTitle } from "@/components/ui/section-title";
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
      <section className="border-b nsu-border" id="locations">
        <Container className="py-24 lg:py-28">
          <SectionTitle
            eyebrow="LOCATIONS"
            title="Our Current Centers"
            description="Explore our current centers in Houston, Bogotá and Bucaramanga."
          />
          <LocationsExplorer className="mt-14" locale="en" />
        </Container>
      </section>
      <CTA
        eyebrow="Final CTA"
        title="Start with a comprehensive evaluation."
        buttonLabel="Schedule Evaluation"
        buttonHref="#contact"
      />
    </SiteShell>
  );
}