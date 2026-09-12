import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { WhatWeDoPage } from "@/modules/website/what-we-do/page";

export const metadata: Metadata = {
  title: "Clinical Neuroscience & NeuroPerformance | NeuroSports USA",
  description:
    "Explore NeuroSports USA services in Clinical Neuroscience and NeuroPerformance, including evaluation, neurorehabilitation and cognitive performance pathways.",
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: {
    type: "website",
    siteName: "NeuroSports USA",
    locale: "en_US",
    title: "Clinical Neuroscience & NeuroPerformance | NeuroSports USA",
    description:
      "Explore NeuroSports USA services in Clinical Neuroscience and NeuroPerformance, including evaluation, neurorehabilitation and cognitive performance pathways.",
    url: "https://www.neurosportsusa.com/what-we-do",
  },
  twitter: {
    card: "summary",
    title: "Clinical Neuroscience & NeuroPerformance | NeuroSports USA",
    description:
      "Explore NeuroSports USA services in Clinical Neuroscience and NeuroPerformance, including evaluation, neurorehabilitation and cognitive performance pathways.",
  },
};

export default function WhatWeDoRoute() {
  return (
    <SiteShell>
      <WhatWeDoPage />
    </SiteShell>
  );
}