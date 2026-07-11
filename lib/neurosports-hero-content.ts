export type HeroLocale = "en" | "es";

export type NeuroSportsHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  functionalEvaluation: string;
  functionalNetworks: string;
  mnsiTitle: string;
  mnsiSubtitle: string;
  clinicalTitle: string;
  clinicalSubtitle: string;
  performanceTitle: string;
  performanceSubtitle: string;
  outcomesTitle: string;
  outcomesSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  brainAlt: string;
};

export const neurosportsHeroContent: Record<HeroLocale, NeuroSportsHeroContent> = {
  en: {
    eyebrow: "NeuroSports USA",
    title: "Understanding the Brain.\nTransforming Lives.",
    subtitle:
      "One Science. One Model. Two Worlds. Clinical Neuroscience and NeuroPerformance integrated through MNSI.",
    functionalEvaluation: "Functional Evaluation",
    functionalNetworks: "Functional Brain Networks (RSFN)",
    mnsiTitle: "MNSI Core",
    mnsiSubtitle: "Multimodal NeuroSequential Integration",
    clinicalTitle: "Clinical Neuroscience",
    clinicalSubtitle: "Assessment · Rehabilitation · Recovery",
    performanceTitle: "NeuroPerformance",
    performanceSubtitle: "Evaluation · Decision Making · Performance",
    outcomesTitle: "Functional Outcomes",
    outcomesSubtitle: "Better Brain · Better Performance · Better Life",
    primaryCTA: "Schedule Evaluation",
    secondaryCTA: "Explore Our Model",
    brainAlt:
      "Transparent functional brain representing the NeuroSports USA scientific journey from evaluation through RSFN and MNSI to clinical and performance outcomes.",
  },
  es: {
    eyebrow: "NeuroSports USA",
    title: "Comprender el cerebro.\nTransformar vidas.",
    subtitle:
      "Una ciencia. Un modelo. Dos mundos. Neurociencia clínica y NeuroPerformance integrados mediante MNSI.",
    functionalEvaluation: "Evaluación funcional",
    functionalNetworks: "Redes cerebrales funcionales (RSFN)",
    mnsiTitle: "Núcleo MNSI",
    mnsiSubtitle: "Integración Neurosecuencial Multimodal",
    clinicalTitle: "Neurociencia Clínica",
    clinicalSubtitle: "Evaluación · Rehabilitación · Recuperación",
    performanceTitle: "NeuroPerformance",
    performanceSubtitle: "Evaluación · Toma de decisiones · Rendimiento",
    outcomesTitle: "Resultados funcionales",
    outcomesSubtitle: "Mejor cerebro · Mejor rendimiento · Mejor vida",
    primaryCTA: "Agendar evaluación",
    secondaryCTA: "Explorar nuestro modelo",
    brainAlt:
      "Cerebro funcional transparente que representa el recorrido científico de NeuroSports USA desde la evaluación, RSFN y MNSI hasta los resultados clínicos y de rendimiento.",
  },
};

export function getNeuroSportsHeroContent(locale: HeroLocale = "en") {
  return neurosportsHeroContent[locale] ?? neurosportsHeroContent.en;
}
