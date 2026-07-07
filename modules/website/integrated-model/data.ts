import type {
  ApplicationArea,
  ClinicalStep,
  IntegratedPhase,
  PositioningPoint,
} from "@/types/integrated-model";

export const integratedPhases: IntegratedPhase[] = [
  {
    id: "01",
    title: "Regulation",
    description:
      "Prepare attention, arousal and emotional state before cognitive work.",
  },
  {
    id: "02",
    title: "Neuromodulation",
    description:
      "Use targeted stimulation protocols to prime specific neural networks.",
  },
  {
    id: "03",
    title: "Digital Cognitive Training",
    description:
      "Activate cognitive functions through structured computerized exercises.",
  },
  {
    id: "04",
    title: "Analog Integration",
    description:
      "Convert digital performance into paper-based, symbolic and functional tasks.",
  },
  {
    id: "05",
    title: "Sensorimotor Consolidation",
    description:
      "Reinforce cognition through movement, coordination and response control.",
  },
  {
    id: "06",
    title: "Functional Transfer",
    description:
      "Apply trained abilities to academic, clinical, sport or daily-life contexts.",
  },
];

export const clinicalLogicSteps: ClinicalStep[] = [
  {
    title: "Assessment",
    description:
      "Comprehensive evaluation to establish a reliable clinical baseline.",
  },
  {
    title: "Functional Network Profile",
    description:
      "Identification of the main cognitive systems and network priorities involved.",
  },
  {
    title: "Personalized Intervention Plan",
    description:
      "Structured program design aligned with profile, goals and context.",
  },
  {
    title: "Sequential Session Structure",
    description:
      "Sessions organized through preparation, activation, integration and transfer.",
  },
  {
    title: "Performance Tracking",
    description:
      "Progress monitoring through functional indicators and clinical review.",
  },
  {
    title: "Functional Transfer",
    description:
      "Translation of gains into academic, clinical, sport and daily-life outcomes.",
  },
];

export const applicationAreas: ApplicationArea[] = [
  {
    title: "Pediatric Neuropsychology",
    description:
      "Sequential interventions adapted to developmental profiles and family systems.",
  },
  {
    title: "Adult Cognitive Rehabilitation",
    description:
      "Functional recovery pathways for adults requiring structured neurocognitive support.",
  },
  {
    title: "NeuroPerformance for Athletes",
    description:
      "Cognitive performance systems designed for decision speed, precision and resilience.",
  },
  {
    title: "Learning and Academic Support",
    description:
      "Programs connecting cognitive readiness with academic execution and endurance.",
  },
  {
    title: "Executive Function Training",
    description:
      "Targeted work on planning, inhibition, working memory and task control.",
  },
  {
    title: "Institutional Programs",
    description:
      "Scalable frameworks for schools, teams, clinics and organizational partners.",
  },
];

export const positioningPoints: PositioningPoint[] = [
  {
    title: "Not only cognitive training",
    description:
      "The model prepares brain state and sequence before demanding cognitive load.",
  },
  {
    title: "Not only neuromodulation",
    description:
      "Stimulation is integrated within a broader intervention pathway, not used in isolation.",
  },
  {
    title: "Not only rehabilitation",
    description:
      "The structure connects recovery with performance, adaptation and measurable transfer.",
  },
];