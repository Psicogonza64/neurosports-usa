import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { TechnologyPage } from "@/modules/website/technology/page";

export const metadata: Metadata = {
  title: "Neuroscience Technology | NeuroSports USA",
  description:
    "Explore the technologies used within NeuroSports USA for functional evaluation, neuromodulation, neurorehabilitation and cognitive performance.",
};

export default function TechnologyRoute() {
  return (
    <SiteShell>
      <TechnologyPage />
    </SiteShell>
  );
}