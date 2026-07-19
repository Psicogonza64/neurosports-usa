import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/ui/hero";
import { ScientificJourneyDiagram } from "@/components/diagrams/ScientificJourneyDiagram";
import {
  LocationsExplorer,
  ProprietaryMethodsSection,
  ProcessExplorer,
  ScientificCard,
  SectionHeader,
} from "@/components/experience";
import {
  getIntegratedModelContent,
  type IntegratedModelLocale,
} from "@/modules/website/integrated-model/data";
import { getNeuroSportsHomeContent } from "@/lib/neurosports-home-content";
import { getNeuroSportsPublicContent } from "@/lib/neurosports-public-content";
import { getNeuroSportsLocationsContent } from "@/lib/neurosports-locations-content";

function HeroSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <Hero
      left={
        <div className="max-w-2xl space-y-10">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.3em]">
            {content.hero.eyebrow}
          </p>
          <div className="space-y-7">
            <h1 className="max-w-2xl text-5xl leading-[0.94] tracking-[-0.03em] text-[var(--color-foreground)] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              {content.hero.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/schedule" dataCta="schedule-initial-evaluation" dataLocation="integrated-model">
              <span>{content.hero.ctaLabel}</span>
            </Button>
            <Button href="#six-phase-model" variant="secondary">
              <span>{content.hero.secondaryCtaLabel}</span>
            </Button>
          </div>
        </div>
      }
      right={<ScientificJourneyDiagram mode="section" locale={locale} />}
    />
  );
}

function ScientificFoundationSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getNeuroSportsPublicContent(locale);

  return (
    <section className="border-b nsu-border" id="scientific-foundation">
      <Container className="py-24 lg:py-28">
        <SectionHeader
          label={content.processExplorer.eyebrow}
          title={content.processExplorer.title}
          subtitle={content.processExplorer.description}
        />

        <ProcessExplorer
          className="mt-14"
          items={content.processExplorer.items}
          mode="interactive"
          sequenceLabel={content.processExplorer.sequenceLabel}
        />
      </Container>
    </section>
  );
}

function RsfnSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="rsfn">
      <Container className="py-24 lg:py-28">
        <SectionHeader
          label={content.rsfn.eyebrow}
          title={content.rsfn.title}
          subtitle={content.rsfn.description}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <ScientificCard interactive className="p-6 sm:p-7">
            <div className="space-y-4">
              <h3 className="text-xl text-[var(--color-foreground)]">{content.rsfn.supportsLabel}</h3>
              <ul className="space-y-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.rsfn.supports.map((item) => (
                  <li key={item} className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] px-4 py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScientificCard>
          <ScientificCard interactive className="p-6 sm:p-7">
            <div className="space-y-6">
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.rsfn.note}
              </p>
              <div className="pt-1">
                <Button href={content.rsfn.ctaHref}>
                  <span>{content.rsfn.ctaLabel}</span>
                </Button>
              </div>
            </div>
          </ScientificCard>
        </div>
      </Container>
    </section>
  );
}

function ProprietaryMethodsModelSection({ locale }: { locale: IntegratedModelLocale }) {
  const modelContent = getIntegratedModelContent(locale);
  const homeContent = getNeuroSportsHomeContent(locale);
  const neuroPerformance = homeContent.applications.pathways.find(
    (pathway) => pathway.id === "neuroperformance",
  );

  return (
    <ProprietaryMethodsSection
      id="institutional-methods"
      label="INSTITUTIONAL METHODS"
      title="RSFN, MNSI and NeuroPerformance as differentiated institutional methods."
      description="The integrated model aligns interpretation, intervention sequencing and transfer-oriented application within one public scientific architecture."
      methods={[
        {
          id: "rsfn",
          method: "RSFN",
          title: modelContent.rsfn.title,
          description: modelContent.rsfn.description,
          ctaLabel: modelContent.rsfn.ctaLabel,
          ctaHref: modelContent.rsfn.ctaHref,
        },
        {
          id: "mnsi",
          method: "MNSI",
          title: modelContent.mnsi.title,
          description: modelContent.mnsi.description,
          ctaLabel: "Explore Six-Phase Model",
          ctaHref: "/integrated-model#six-phase-model",
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

function MnsiSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="mnsi">
      <Container className="py-24 lg:py-28">
        <div id="six-phase-model" className="h-0 scroll-mt-28" aria-hidden="true" />
        <SectionHeader
          label={content.mnsi.eyebrow}
          title={content.mnsi.title}
          subtitle={content.mnsi.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.mnsi.phases.map((phase, index) => (
            <ScientificCard key={phase.title} interactive className="min-h-64 p-6">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Phase {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{phase.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {phase.description}
                </p>
              </div>
            </ScientificCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ApplicationsSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="applications">
      <Container className="py-24 lg:py-28">
        <SectionHeader
          label={content.applications.eyebrow}
          title={content.applications.title}
          subtitle={content.applications.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <ScientificCard interactive className="p-6 sm:p-7">
            <div className="space-y-4">
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{content.applications.leftTitle}</h3>
              <ul className="space-y-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.applications.leftItems.map((item) => (
                  <li key={item} className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] px-4 py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScientificCard>

          <ScientificCard interactive className="p-6 sm:p-7">
            <div className="space-y-4">
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{content.applications.rightTitle}</h3>
              <ul className="space-y-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.applications.rightItems.map((item) => (
                  <li key={item} className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] px-4 py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScientificCard>
        </div>

        <ScientificCard className="mt-5 p-6 sm:p-7">
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {content.applications.sharedNote}
          </p>
        </ScientificCard>
      </Container>
    </section>
  );
}

function SessionStructureSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="session-structure">
      <Container className="py-24 lg:py-28">
        <SectionHeader
          label={content.sessionStructure.eyebrow}
          title={content.sessionStructure.title}
          subtitle={content.sessionStructure.description}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.sessionStructure.segments.map((segment) => (
            <ScientificCard key={`${segment.duration}-${segment.phase}`} interactive className="p-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{segment.duration}</p>
                <h3 className="text-xl text-[var(--color-foreground)]">{segment.phase}</h3>
              </div>
            </ScientificCard>
          ))}
        </div>

        <ScientificCard className="mt-5 p-6 sm:p-7">
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {content.sessionStructure.note}
          </p>
        </ScientificCard>
      </Container>
    </section>
  );
}

function OutcomeMonitoringSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="outcomes">
      <Container className="py-24 lg:py-28">
        <div id="outcome-monitoring" className="h-0 scroll-mt-28" aria-hidden="true" />
        <SectionHeader
          label={content.outcomeMonitoring.eyebrow}
          title={content.outcomeMonitoring.title}
          subtitle={content.outcomeMonitoring.description}
        />

        <ScientificCard className="mt-14 p-6 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {content.outcomeMonitoring.points.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] px-4 py-3 text-sm text-[var(--color-muted)] sm:text-base"
              >
                {point}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {content.outcomeMonitoring.note}
          </p>
        </ScientificCard>
      </Container>
    </section>
  );
}

function LocationsSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getNeuroSportsLocationsContent(locale);

  return (
    <section className="border-b nsu-border" id="locations">
      <Container className="py-24 lg:py-28">
        <SectionHeader
          label={content.labels.eyebrow}
          title={content.labels.title}
        />

        <LocationsExplorer
          locale={locale}
          className="mt-14"
        />
      </Container>
    </section>
  );
}

function FinalCtaSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="appointments">
      <Container className="py-24 lg:py-28">
        <ScientificCard className="border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))] px-6 py-14 text-center sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-7">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
              {content.finalCta.title}
            </h2>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {content.finalCta.text}
            </p>
            <Button
              href="/schedule"
              className="mx-auto"
              dataCta="schedule-initial-evaluation"
              dataLocation="integrated-model"
            >
              <span>{content.finalCta.buttonLabel}</span>
            </Button>
          </div>
        </ScientificCard>
      </Container>
    </section>
  );
}

export function IntegratedModelPage({ locale = "en" }: { locale?: IntegratedModelLocale }) {
  return (
    <>
      <HeroSection locale={locale} />
      <ScientificFoundationSection locale={locale} />
      <RsfnSection locale={locale} />
      <MnsiSection locale={locale} />
      <ApplicationsSection locale={locale} />
      <SessionStructureSection locale={locale} />
      <OutcomeMonitoringSection locale={locale} />
      <LocationsSection locale={locale} />
      <ProprietaryMethodsModelSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </>
  );
}