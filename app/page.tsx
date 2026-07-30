import { SiteShell } from "@/components/layout/site-shell";
import { LocationsExplorer } from "@/components/experience/locations-explorer";
import { ScientificSectionBlock } from "@/components/experience";
import {
  ApplicationsSection,
  ContactSection,
  HomeCtaSection,
  HeroSection,
  MnsiJourneySection,
  ProprietaryMethodsHomeSection,
  PublicProcessesSection,
  ResearchSection,
  ScientificEcosystemHomeSection,
  ScientificKnowledgeHubHomeSection,
  TechnologySection,
} from "@/modules/website/home/sections";
import { getNeuroSportsHomeContent } from "@/lib/neurosports-home-content";

export default function Home() {
  const content = getNeuroSportsHomeContent("en");

  return (
    <SiteShell>
      <HeroSection />
      <PublicProcessesSection />
      <ApplicationsSection />
      <MnsiJourneySection />
      <ProprietaryMethodsHomeSection />
      <ScientificEcosystemHomeSection />
      <ScientificKnowledgeHubHomeSection />
      <TechnologySection />
      <ResearchSection />
      <ScientificSectionBlock
        id="locations"
        label={content.locations.eyebrow}
        title={content.locations.title}
        description={content.locations.intro}
        content={<LocationsExplorer locale="en" />}
      />
      <HomeCtaSection />
      <ContactSection />
    </SiteShell>
  );
}