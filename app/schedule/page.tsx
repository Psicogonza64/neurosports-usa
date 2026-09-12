import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { BookingAssistant } from "@/components/scheduling/booking-assistant";

export const metadata: Metadata = {
  title: "Schedule an Initial Evaluation | NeuroSports USA Houston",
  description:
    "Request an Initial Evaluation at the NeuroSports USA Houston Center and select a preferred appointment date and time.",
  alternates: {
    canonical: "/schedule",
  },
  openGraph: {
    type: "website",
    siteName: "NeuroSports USA",
    locale: "en_US",
    title: "Schedule an Initial Evaluation | NeuroSports USA Houston",
    description:
      "Request an Initial Evaluation at the NeuroSports USA Houston Center and select a preferred appointment date and time.",
    url: "https://www.neurosportsusa.com/schedule",
  },
  twitter: {
    card: "summary",
    title: "Schedule an Initial Evaluation | NeuroSports USA Houston",
    description:
      "Request an Initial Evaluation at the NeuroSports USA Houston Center and select a preferred appointment date and time.",
  },
};

export default function ScheduleRoute() {
  return (
    <SiteShell>
      <BookingAssistant locale="en" />
    </SiteShell>
  );
}
