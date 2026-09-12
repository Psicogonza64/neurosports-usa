import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
  description:
    "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "NeuroSports USA",
    locale: "en_US",
    title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
    description:
      "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
    url: "https://www.neurosportsusa.com",
  },
  twitter: {
    card: "summary",
    title: "NeuroSports USA | Clinical Neuroscience & NeuroPerformance",
    description:
      "Clinical neuroscience, neuropsychological evaluation, neurorehabilitation and NeuroPerformance services through an integrated neuroscience model.",
  },
};

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