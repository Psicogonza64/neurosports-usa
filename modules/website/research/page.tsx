import { Button } from "@/components/ui/button";
import {
  CollaborationsBoard,
  IndicatorsBoard,
  InstitutionalSignalsGrid,
  ProjectsBoard,
  ProprietaryMethodsSection,
  PublicationsBoard,
  ScientificSectionBlock,
} from "@/components/experience";
import { NeuroHero } from "@/components/experience/neuro-hero";
import { getNeuroSportsHomeContent } from "@/lib/neurosports-home-content";
import { getNeuroSportsPublicContent, type PublicContentLocale } from "@/lib/neurosports-public-content";
import { getIntegratedModelContent } from "@/modules/website/integrated-model/data";

function HeroSection({ locale }: { locale: PublicContentLocale }) {
  const homeContent = getNeuroSportsHomeContent(locale);

  return (
    <NeuroHero
      id="research"
      eyebrow={homeContent.research.eyebrow}
      title="Scientific Credibility Layer"
      subtitle="Institutional research communication that connects functional neuroscience, proprietary methods and clinical translation under a transparent public framework."
      ctaLabel="Explore Institutional Methods"
      ctaHref="#institutional-models"
      secondaryCtaLabel="Schedule Evaluation"
      secondaryCtaHref="/schedule"
    />
  );
}

function ResearchLinesSection({ locale }: { locale: PublicContentLocale }) {
  const homeContent = getNeuroSportsHomeContent(locale);
  const researchSignals = homeContent.research.items.map((item) => ({
    ...item,
    label: "Research Line",
  }));

  return (
    <ScientificSectionBlock
      id="research-lines"
      label="Research Lines"
      title="Current public lines that guide institutional scientific direction."
      description="This block uses the institutional signal system to maintain the visual hierarchy established in WEB-20."
      content={<InstitutionalSignalsGrid items={researchSignals} columns="3" />}
    />
  );
}

function InstitutionalModelsSection({ locale }: { locale: PublicContentLocale }) {
  const modelContent = getIntegratedModelContent(locale);
  const homeContent = getNeuroSportsHomeContent(locale);
  const neuroPerformance = homeContent.applications.pathways.find(
    (pathway) => pathway.id === "neuroperformance",
  );

  return (
    <ProprietaryMethodsSection
      id="institutional-models"
      label="Institutional Models"
      title="Differentiated methodologies presented as institutional methods."
      description="RSFN, MNSI and NeuroPerformance are communicated as complementary methods across interpretation, intervention sequence and transfer-oriented application."
      methods={[
        {
          id: "rsfn",
          method: "RSFN",
          title: modelContent.rsfn.title,
          description: modelContent.rsfn.description,
          ctaLabel: "Explore Integrated Model",
          ctaHref: "/integrated-model#rsfn",
        },
        {
          id: "mnsi",
          method: "MNSI",
          title: modelContent.mnsi.title,
          description: modelContent.mnsi.description,
          ctaLabel: "Explore Six-Phase Model",
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

function ScientificDevelopmentSection() {
  const publications = [
    {
      id: "pub-1",
      title: "Institutional Publications Registry",
      summary: "Placeholder reserved for peer-reviewed publications and institutional scientific documents.",
      status: "Pending validation",
      timeline: "Publication metadata pending validation",
    },
    {
      id: "pub-2",
      title: "Conference and Academic Communications",
      summary: "Placeholder reserved for conference abstracts and academic dissemination records.",
      status: "Pending validation",
      timeline: "Conference records pending validation",
    },
  ];

  const projects = [
    {
      id: "proj-1",
      title: "Research Development Projects",
      summary: "Placeholder reserved for current and upcoming institutional research projects.",
      status: "Pending validation",
      timeline: "Project portfolio pending validation",
    },
    {
      id: "proj-2",
      title: "Methodological Development Tracks",
      summary: "Placeholder reserved for methodological refinement initiatives connected to RSFN and MNSI.",
      status: "Pending validation",
      timeline: "Method tracks pending validation",
    },
  ];

  const collaborations = [
    {
      id: "col-1",
      title: "Institutional Collaborations",
      summary: "Placeholder reserved for validated partnerships and collaborative research agreements.",
      status: "Pending validation",
      timeline: "Collaboration records pending validation",
    },
    {
      id: "col-2",
      title: "Academic and Clinical Cooperation",
      summary: "Placeholder reserved for cooperation frameworks with scientific and clinical institutions.",
      status: "Pending validation",
      timeline: "Cooperation frameworks pending validation",
    },
  ];

  const indicators = [
    {
      id: "ind-1",
      title: "Institutional Indicators",
      summary: "Placeholder reserved for validated scientific output and program-level institutional indicators.",
      status: "Pending validation",
      timeline: "Indicators pending validation",
    },
    {
      id: "ind-2",
      title: "Outcome and Impact Indicators",
      summary: "Placeholder reserved for validated impact indicators linked to scientific and translation programs.",
      status: "Pending validation",
      timeline: "Impact indicators pending validation",
    },
  ];

  return (
    <ScientificSectionBlock
      id="scientific-development"
      label="Scientific Development"
      title="Reusable institutional boards for future scientific evidence layers."
      description="All cards below are explicit placeholders pending institutional validation."
      content={(
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="nsu-content-stack">
            <h3 className="nsu-h3">Publications</h3>
            <PublicationsBoard items={publications} />
          </div>
          <div className="nsu-content-stack">
            <h3 className="nsu-h3">Projects</h3>
            <ProjectsBoard items={projects} />
          </div>
          <div className="nsu-content-stack">
            <h3 className="nsu-h3">Collaborations</h3>
            <CollaborationsBoard items={collaborations} />
          </div>
          <div className="nsu-content-stack">
            <h3 className="nsu-h3">Institutional Indicators</h3>
            <IndicatorsBoard items={indicators} />
          </div>
        </div>
      )}
    />
  );
}

function ClinicalTranslationSection({ locale }: { locale: PublicContentLocale }) {
  const processContent = getNeuroSportsPublicContent(locale);
  const translationSignals = processContent.processExplorer.items
    .filter((item) =>
      item.id === "clinical-neuroscience" ||
      item.id === "neuroperformance" ||
      item.id === "functional-outcomes",
    )
    .map((item) => ({
      title: item.title,
      description: item.shortDescription,
      label: "Clinical Translation",
    }));

  return (
    <ScientificSectionBlock
      id="clinical-translation"
      label="Clinical Translation"
      title="How scientific architecture is translated into clinical and performance pathways."
      description="Translation remains focused on functional interpretation, supervised intervention and monitored outcomes."
      content={<InstitutionalSignalsGrid items={translationSignals} columns="3" />}
      cta={(
        <div className="flex flex-wrap gap-3">
          <Button href="/what-we-do" variant="secondary">
            <span>Explore What We Do</span>
          </Button>
          <Button href="/integrated-model#outcomes" variant="secondary">
            <span>Explore Outcome Monitoring</span>
          </Button>
        </div>
      )}
    />
  );
}

export function ResearchPage({ locale = "en" }: { locale?: PublicContentLocale }) {
  return (
    <>
      <HeroSection locale={locale} />
      <ResearchLinesSection locale={locale} />
      <InstitutionalModelsSection locale={locale} />
      <ScientificDevelopmentSection />
      <ClinicalTranslationSection locale={locale} />
    </>
  );
}
