import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { IntegratedModelPage } from "@/modules/website/integrated-model/page";

export const metadata: Metadata = {
  title: "Integrated Neuroscience Model | NeuroSports USA",
  description:
    "Discover the NeuroSports USA integrated framework connecting functional evaluation, RSFN, MNSI, clinical neuroscience and NeuroPerformance.",
  alternates: {
    canonical: "/integrated-model",
  },
  openGraph: {
    type: "website",
    siteName: "NeuroSports USA",
    locale: "en_US",
    title: "Integrated Neuroscience Model | NeuroSports USA",
    description:
      "Discover the NeuroSports USA integrated framework connecting functional evaluation, RSFN, MNSI, clinical neuroscience and NeuroPerformance.",
    url: "https://www.neurosportsusa.com/integrated-model",
  },
  twitter: {
    card: "summary",
    title: "Integrated Neuroscience Model | NeuroSports USA",
    description:
      "Discover the NeuroSports USA integrated framework connecting functional evaluation, RSFN, MNSI, clinical neuroscience and NeuroPerformance.",
  },
};

export default function IntegratedModelRoute() {
  return (
    <SiteShell>
      <IntegratedModelPage />
    </SiteShell>
  );
}