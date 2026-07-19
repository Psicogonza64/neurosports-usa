import { ProprietaryMethodsSection } from "@/components/experience";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";
import { getIntegratedModelContent } from "@/modules/website/integrated-model/data";

type ProprietaryMethodsHomeSectionProps = {
  locale?: HomeLocale;
};

export function ProprietaryMethodsHomeSection({
  locale = "en",
}: ProprietaryMethodsHomeSectionProps) {
  const homeContent = getNeuroSportsHomeContent(locale);
  const integratedContent = getIntegratedModelContent(locale);

  const neuroPerformance = homeContent.applications.pathways.find(
    (pathway) => pathway.id === "neuroperformance",
  );

  return (
    <ProprietaryMethodsSection
      id="proprietary-methods"
      label="PROPRIETARY METHODS"
      title="Institutional methodologies that organize science, intervention and transfer."
      description="RSFN, MNSI and NeuroPerformance are presented as distinct but connected institutional methods within one public scientific architecture."
      methods={[
        {
          id: "rsfn",
          method: "RSFN",
          title: integratedContent.rsfn.title,
          description: integratedContent.rsfn.description,
          ctaLabel: integratedContent.rsfn.ctaLabel,
          ctaHref: integratedContent.rsfn.ctaHref,
        },
        {
          id: "mnsi",
          method: "MNSI",
          title: integratedContent.mnsi.title,
          description: integratedContent.mnsi.description,
          ctaLabel: "Explore MNSI",
          ctaHref: "/integrated-model#mnsi",
        },
        {
          id: "neuroperformance",
          method: "NEUROPERFORMANCE",
          title: neuroPerformance?.title ?? "NeuroPerformance",
          description:
            neuroPerformance?.description ??
            "Functional neuroscience applied to attention, decision-making, reaction time and transfer.",
          ctaLabel: neuroPerformance?.ctaLabel ?? "Explore NeuroPerformance",
          ctaHref: neuroPerformance?.ctaHref ?? "/what-we-do#neuroperformance",
        },
      ]}
    />
  );
}
