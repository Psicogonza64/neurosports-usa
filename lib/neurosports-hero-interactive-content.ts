export type HeroInteractiveLocale = "en" | "es";

export type HeroInteractiveNodeId =
  | "functional-evaluation"
  | "rsfn"
  | "mnsi-core"
  | "clinical-neuroscience"
  | "neuroperformance"
  | "functional-outcomes";

export type HeroInteractiveNode = {
  id: HeroInteractiveNodeId;
  title: string;
  shortDescription: string;
  learnMoreHref: string;
};

type HeroInteractiveContent = {
  brainAlt: string;
  closeLabel: string;
  learnMoreLabel: string;
  promptLabel: string;
  nodes: HeroInteractiveNode[];
};

const heroInteractiveContent: Record<HeroInteractiveLocale, HeroInteractiveContent> = {
  en: {
    brainAlt:
      "Functional brain supporting the NeuroSports USA journey from evaluation and RSFN through MNSI to clinical and performance outcomes.",
    closeLabel: "Close details",
    learnMoreLabel: "Learn more",
    promptLabel: "Select a node to explore this scientific journey.",
    nodes: [
      {
        id: "functional-evaluation",
        title: "Functional Evaluation",
        shortDescription:
          "Identifies cognitive strengths, functional needs and priorities through an individualized assessment process.",
        learnMoreHref: "/what-we-do#functional-evaluation",
      },
      {
        id: "rsfn",
        title: "Functional Brain Networks (RSFN)",
        shortDescription:
          "Connects assessment findings with the functional brain systems involved in cognition, behavior and performance.",
        learnMoreHref: "/integrated-model#rsfn",
      },
      {
        id: "mnsi-core",
        title: "MNSI Core",
        shortDescription:
          "Organizes intervention through a structured sequence of preparation, activation, training, consolidation and functional transfer.",
        learnMoreHref: "/integrated-model#mnsi",
      },
      {
        id: "clinical-neuroscience",
        title: "Clinical Neuroscience",
        shortDescription:
          "Evaluation and rehabilitation pathways for cognitive, developmental, neurological and behavioral needs.",
        learnMoreHref: "/what-we-do#clinical-neuroscience",
      },
      {
        id: "neuroperformance",
        title: "NeuroPerformance",
        shortDescription:
          "Functional neuroscience applied to attention, decision-making, reaction time and performance environments.",
        learnMoreHref: "/what-we-do#neuroperformance",
      },
      {
        id: "functional-outcomes",
        title: "Functional Outcomes",
        shortDescription:
          "Progress is monitored through cognitive, clinical, academic, daily-life or sport-specific indicators.",
        learnMoreHref: "/integrated-model#outcomes",
      },
    ],
  },
  es: {
    brainAlt:
      "Cerebro funcional que representa el recorrido de NeuroSports USA desde la evaluación y RSFN, mediante MNSI, hasta los resultados clínicos y de rendimiento.",
    closeLabel: "Cerrar detalles",
    learnMoreLabel: "Conocer más",
    promptLabel: "Selecciona un nodo para explorar este recorrido científico.",
    nodes: [
      {
        id: "functional-evaluation",
        title: "Evaluación funcional",
        shortDescription:
          "Identifica fortalezas cognitivas, necesidades funcionales y prioridades mediante un proceso de evaluación individualizado.",
        learnMoreHref: "/what-we-do#functional-evaluation",
      },
      {
        id: "rsfn",
        title: "Redes cerebrales funcionales (RSFN)",
        shortDescription:
          "Relaciona los hallazgos de la evaluación con los sistemas cerebrales funcionales implicados en la cognición, la conducta y el rendimiento.",
        learnMoreHref: "/integrated-model#rsfn",
      },
      {
        id: "mnsi-core",
        title: "Núcleo MNSI",
        shortDescription:
          "Organiza la intervención mediante una secuencia estructurada de preparación, activación, entrenamiento, consolidación y transferencia funcional.",
        learnMoreHref: "/integrated-model#mnsi",
      },
      {
        id: "clinical-neuroscience",
        title: "Neurociencia Clínica",
        shortDescription:
          "Rutas de evaluación y rehabilitación para necesidades cognitivas, del desarrollo, neurológicas y conductuales.",
        learnMoreHref: "/what-we-do#clinical-neuroscience",
      },
      {
        id: "neuroperformance",
        title: "NeuroPerformance",
        shortDescription:
          "Neurociencia funcional aplicada a la atención, la toma de decisiones, el tiempo de reacción y los entornos de rendimiento.",
        learnMoreHref: "/what-we-do#neuroperformance",
      },
      {
        id: "functional-outcomes",
        title: "Resultados funcionales",
        shortDescription:
          "El progreso se monitorea mediante indicadores cognitivos, clínicos, académicos, cotidianos o específicos del deporte.",
        learnMoreHref: "/integrated-model#outcomes",
      },
    ],
  },
};

export function getNeuroSportsHeroInteractiveContent(
  locale: HeroInteractiveLocale = "en",
) {
  return heroInteractiveContent[locale] ?? heroInteractiveContent.en;
}
