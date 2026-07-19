import { ScientificEcosystemSection } from "@/components/experience";

type ScientificEcosystemHomeSectionProps = {
  locale?: "en" | "es";
};

export function ScientificEcosystemHomeSection({
  locale = "en",
}: ScientificEcosystemHomeSectionProps) {
  const content = locale === "es"
    ? {
      label: "ECOSISTEMA CIENTIFICO",
      title: "Arquitectura institucional de NeuroSports USA.",
      description:
        "NeuroSports USA se presenta como plataforma institucional central que articula metodos cientificos, modelos de intervencion y aplicaciones especializadas.",
      platformPurpose:
        "Plataforma institucional publica para comunicar arquitectura cientifica, aplicaciones funcionales y direccion de desarrollo, sin mezclar sistemas clinicos internos o privados.",
      nodes: [
        {
          id: "rsfn",
          name: "RSFN",
          purpose: "Metodologia cientifica para interpretar redes funcionales y orientar analisis institucional.",
          relation: "Sustenta la base cientifica del ecosistema",
          status: "Institutional method",
        },
        {
          id: "mnsi",
          name: "MNSI",
          purpose: "Modelo clinico de intervencion secuencial para organizar etapas de trabajo funcional.",
          relation: "Conecta ciencia institucional con intervencion supervisada",
          status: "Clinical intervention model",
        },
        {
          id: "neuroperformance",
          name: "NeuroPerformance",
          purpose: "Aplicacion orientada a rendimiento para transferencia cognitiva en contextos deportivos.",
          relation: "Extiende el marco institucional a aplicacion deportiva",
          status: "Applied performance pathway",
        },
        {
          id: "neuroscanner",
          name: "NeuroScanner",
          purpose: "Herramienta especializada futura para apoyo de exploracion y analisis institucional.",
          relation: "Componente futuro del ecosistema cientifico",
          status: "Future tool - pending validation",
        },
      ],
    }
    : {
      label: "SCIENTIFIC ECOSYSTEM",
      title: "NeuroSports USA institutional ecosystem architecture.",
      description:
        "NeuroSports USA is presented as the central institutional platform connecting scientific methods, intervention models and specialized applications.",
      platformPurpose:
        "Public institutional platform designed to communicate scientific architecture, functional applications and development direction without exposing private or internal clinical systems.",
      nodes: [
        {
          id: "rsfn",
          name: "RSFN",
          purpose: "Scientific methodology for functional network interpretation and institutional analysis guidance.",
          relation: "Supports the ecosystem scientific foundation",
          status: "Institutional method",
        },
        {
          id: "mnsi",
          name: "MNSI",
          purpose: "Clinical intervention model organizing sequential stages for functional work.",
          relation: "Connects institutional science with supervised intervention",
          status: "Clinical intervention model",
        },
        {
          id: "neuroperformance",
          name: "NeuroPerformance",
          purpose: "Performance-oriented application focused on cognitive transfer in sport environments.",
          relation: "Extends the institutional framework into sport application",
          status: "Applied performance pathway",
        },
        {
          id: "neuroscanner",
          name: "NeuroScanner",
          purpose: "Future specialized tool for institutional exploration and analysis support.",
          relation: "Future component within the scientific ecosystem",
          status: "Future tool - pending validation",
        },
      ],
    };

  return (
    <ScientificEcosystemSection
      id="scientific-ecosystem"
      label={content.label}
      title={content.title}
      description={content.description}
      platformName="NeuroSports USA"
      platformPurpose={content.platformPurpose}
      nodes={content.nodes}
    />
  );
}
