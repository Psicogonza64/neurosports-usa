import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { ResearchPage } from "@/modules/website/research/page";

export const metadata: Metadata = {
  title: "Research & Scientific Development | NeuroSports USA",
  description:
    "Explore the scientific foundations, research interests and development of RSFN, MNSI, Clinical Neuroscience and NeuroPerformance at NeuroSports USA.",
};

export default function ResearchRoute() {
  return (
    <SiteShell>
      <ResearchPage />
    </SiteShell>
  );
}
