import { ScientificKnowledgeHub } from "@/components/experience";

type ScientificKnowledgeHubHomeSectionProps = {
  locale?: "en" | "es";
};

export function ScientificKnowledgeHubHomeSection({
  locale = "en",
}: ScientificKnowledgeHubHomeSectionProps) {
  const isEs = locale === "es";

  return (
    <ScientificKnowledgeHub
      id="scientific-knowledge-hub"
      label={isEs ? "HUB DE CONOCIMIENTO CIENTIFICO" : "SCIENTIFIC KNOWLEDGE HUB"}
      title={isEs
        ? "Arquitectura inicial para organizar conocimiento cientifico institucional."
        : "Initial architecture to organize institutional scientific knowledge."}
      description={isEs
        ? "Seis areas estructuran metodos actuales y lineas futuras de desarrollo sin declarar resultados no validados."
        : "Six areas structure current methods and future development lines without declaring unvalidated outcomes."}
      areas={[
        {
          id: "methodologies",
          title: "Methodologies",
          description: isEs
            ? "Marco actual para organizar metodos institucionales y su gobernanza publica."
            : "Current framework to organize institutional methods and their public governance.",
          status: "Current methodology",
          relatedTo: isEs ? "Integrated Model" : "Integrated Model",
          href: "/integrated-model#institutional-methods",
        },
        {
          id: "research",
          title: "Research",
          description: isEs
            ? "Linea actual para comunicar direccion cientifica institucional en formato publico."
            : "Current line to communicate institutional scientific direction in a public format.",
          status: "Current methodology",
          relatedTo: "Research",
          href: "/research#research-lines",
        },
        {
          id: "clinical-translation",
          title: "Clinical Translation",
          description: isEs
            ? "Linea actual de traduccion entre interpretacion funcional, intervencion y resultados monitoreados."
            : "Current translation line between functional interpretation, intervention and monitored outcomes.",
          status: "Current methodology",
          relatedTo: isEs ? "Research + Integrated Model" : "Research + Integrated Model",
          href: "/research#clinical-translation",
        },
        {
          id: "education",
          title: "Education",
          description: isEs
            ? "Espacio reservado para programas educativos institucionales en desarrollo."
            : "Reserved space for institutional educational programs in development.",
          status: "Future development line",
          relatedTo: "Research",
          href: "/research#scientific-development",
        },
        {
          id: "innovation",
          title: "Innovation",
          description: isEs
            ? "Espacio reservado para iniciativas de innovacion metodologica y operativa futuras."
            : "Reserved space for future methodological and operational innovation initiatives.",
          status: "Future development line",
          relatedTo: "Integrated Model",
          href: "/integrated-model#outcome-monitoring",
        },
        {
          id: "publications",
          title: "Publications",
          description: isEs
            ? "Espacio reservado para publicaciones y registros institucionales pendientes de validacion."
            : "Reserved space for publications and institutional records pending validation.",
          status: "Future development line",
          relatedTo: "Research",
          href: "/research#scientific-development",
        },
      ]}
    />
  );
}