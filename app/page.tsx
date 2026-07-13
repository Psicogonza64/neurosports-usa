import { SiteShell } from "@/components/layout/site-shell";
import { LocationsExplorer } from "@/components/experience/locations-explorer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import {
  ApplicationsSection,
  ContactSection,
  HomeCtaSection,
  HeroSection,
  MnsiJourneySection,
  PublicProcessesSection,
  ResearchSection,
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
      <TechnologySection />
      <ResearchSection />
      <section className="border-b nsu-border" id="locations">
        <Container className="py-24 lg:py-28">
          <SectionTitle
            eyebrow={content.locations.eyebrow}
            title={content.locations.title}
            description={content.locations.intro}
          />
          <LocationsExplorer className="mt-14" locale="en" />
        </Container>
      </section>
      <HomeCtaSection />
      <ContactSection />
    </SiteShell>
  );
}