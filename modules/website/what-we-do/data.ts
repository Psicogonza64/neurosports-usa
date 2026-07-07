import type { BrainModelPhase, SportsProgram, WhatWeDoCard } from "@/types/what-we-do";

export const clinicalCards: WhatWeDoCard[] = [
  {
    marker: "CN",
    title: "Comprehensive Neuropsychological Evaluation",
    description:
      "Integrated evaluation framework to map cognitive, behavioral, and functional profiles with clinical clarity.",
  },
  {
    marker: "FD",
    title: "Functional Diagnosis",
    description:
      "Interpretation process focused on real-world function, not only test scores, to support actionable care decisions.",
  },
  {
    marker: "PN",
    title: "Pediatric Neuropsychology",
    description:
      "Development-oriented pathways for children and families with structured cognitive and behavioral guidance.",
  },
  {
    marker: "AN",
    title: "Adult Neuropsychology",
    description:
      "Clinical programs for adult cognitive assessment, follow-up planning, and function-centered outcomes.",
  },
  {
    marker: "CR",
    title: "Cognitive Rehabilitation",
    description:
      "Targeted rehabilitation plans designed to restore capabilities and transfer progress into daily life contexts.",
  },
];

export const brainModelPhases: BrainModelPhase[] = [
  {
    title: "Regulation",
    note: "Stabilizing foundational neurophysiological and attentional states.",
  },
  {
    title: "Neuromodulation",
    note: "Applying structured modulation strategies aligned with functional goals.",
  },
  {
    title: "Digital Cognitive Training",
    note: "Progressive digital exercises targeting specific cognitive domains.",
  },
  {
    title: "Analog Integration",
    note: "Transferring trained capabilities into non-digital guided tasks.",
  },
  {
    title: "Sensorimotor Consolidation",
    note: "Reinforcing integration between cognition, movement, and response quality.",
  },
  {
    title: "Functional Transfer",
    note: "Applying progress to school, work, sport, and everyday performance environments.",
  },
];

export const sportsPrograms: SportsProgram[] = [
  {
    name: "Soccer",
    description: "Decision speed and field awareness under continuous dynamic play.",
  },
  {
    name: "Basketball",
    description: "Rapid perception-action integration during high-density tactical moments.",
  },
  {
    name: "Baseball",
    description: "Timing, anticipation, and precision under variable pressure contexts.",
  },
  {
    name: "Tennis",
    description: "Cognitive endurance and reaction consistency through sequential point demands.",
  },
  {
    name: "Individual Athletes",
    description: "Custom neuroperformance pathways aligned with discipline-specific demands.",
  },
];

export const neuroPerformanceBenefits = [
  "Faster decision-making",
  "Attention under pressure",
  "Reaction time",
  "Cognitive endurance",
  "Field transfer",
];

export const populations = [
  "Children",
  "Adolescents",
  "Adults",
  "Athletes",
  "Older Adults",
  "Institutions",
];

export const competitiveAdvantages = [
  "Evidence-based programs",
  "Functional neuroscience model",
  "Personalized rehabilitation plans",
  "NeuroPerformance optimization",
  "International clinical experience",
  "Innovative technology",
];