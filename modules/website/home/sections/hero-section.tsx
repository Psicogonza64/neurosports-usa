import { HeroObjectPlaceholder, NeuroHero } from "@/components/experience";

export function HeroSection() {
  return (
    <NeuroHero
      id="home"
      eyebrow="NeuroSports USA"
      title="Understanding the Brain. Transforming Lives."
      subtitle="One Science. One Model. Two Worlds. Clinical Neuroscience and NeuroPerformance integrated through MNSI."
      ctaLabel="Schedule Evaluation"
      ctaHref="#appointments"
      secondaryCtaLabel="Explore Our Model"
      secondaryCtaHref="#model"
      illustration={<HeroObjectPlaceholder />}
    />
  );
}