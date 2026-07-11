import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/ui/hero";
import { SectionTitle } from "@/components/ui/section-title";
import { LocationsExplorer, ProcessExplorer } from "@/components/experience";
import {
  getIntegratedModelContent,
  type IntegratedModelLocale,
} from "@/modules/website/integrated-model/data";
import { getNeuroSportsPublicContent } from "@/lib/neurosports-public-content";
import { getNeuroSportsLocationsContent } from "@/lib/neurosports-locations-content";

function IntegratedModelHeroVisual({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      {/* TODO: Replace with final approved NeuroSports USA visual asset. */}
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">MNSI Visual Placeholder</span>
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="relative grid w-full max-w-lg gap-3">
          {content.mnsi.phases.map((phase, index) => (
            <div
              key={`${phase.title}-${index}`}
              className="relative rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium tracking-[0.12em] text-[var(--color-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-[var(--color-foreground)]">
                    {phase.title}
                  </h3>
                  <p className="text-xs leading-6 text-[var(--color-muted)]">
                    {phase.description}
                  </p>
                </div>
              </div>
              {index < content.mnsi.phases.length - 1 ? (
                <span className="absolute -bottom-3 left-8 text-sm text-[var(--color-secondary)]/70">
                  ↓
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      right={<IntegratedModelHeroVisual locale={locale} />}
    />
  );
}

function ScientificFoundationSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getNeuroSportsPublicContent(locale);

  return (
    <section className="border-b nsu-border" id="scientific-foundation">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.processExplorer.eyebrow}
          title={content.processExplorer.title}
          description={content.processExplorer.description}
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
        <SectionTitle
          eyebrow={content.rsfn.eyebrow}
          title={content.rsfn.title}
          description={content.rsfn.description}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Card className="p-6 sm:p-7">
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
          </Card>

          <Card className="p-6 sm:p-7">
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
          </Card>
        </div>
      </Container>
    </section>
  );
}

function MnsiSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="mnsi">
      <Container className="py-24 lg:py-28">
        <div id="six-phase-model" className="h-0 scroll-mt-28" aria-hidden="true" />
        <SectionTitle
          eyebrow={content.mnsi.eyebrow}
          title={content.mnsi.title}
          description={content.mnsi.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {content.mnsi.phases.map((phase, index) => (
            <Card key={phase.title} className="min-h-64 p-6">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Phase {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{phase.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {phase.description}
                </p>
              </div>
            </Card>
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
        <SectionTitle
          eyebrow={content.applications.eyebrow}
          title={content.applications.title}
          description={content.applications.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-7">
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
          </Card>

          <Card className="p-6 sm:p-7">
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
          </Card>
        </div>

        <Card className="mt-5 p-6 sm:p-7">
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {content.applications.sharedNote}
          </p>
        </Card>
      </Container>
    </section>
  );
}

function SessionStructureSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getIntegratedModelContent(locale);

  return (
    <section className="border-b nsu-border" id="session-structure">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.sessionStructure.eyebrow}
          title={content.sessionStructure.title}
          description={content.sessionStructure.description}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.sessionStructure.segments.map((segment) => (
            <Card key={`${segment.duration}-${segment.phase}`} className="p-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{segment.duration}</p>
                <h3 className="text-xl text-[var(--color-foreground)]">{segment.phase}</h3>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-5 p-6 sm:p-7">
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {content.sessionStructure.note}
          </p>
        </Card>
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
        <SectionTitle
          eyebrow={content.outcomeMonitoring.eyebrow}
          title={content.outcomeMonitoring.title}
          description={content.outcomeMonitoring.description}
        />

        <Card className="mt-14 p-6 sm:p-7">
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
        </Card>
      </Container>
    </section>
  );
}

function LocationsSection({ locale }: { locale: IntegratedModelLocale }) {
  const content = getNeuroSportsLocationsContent(locale);

  return (
    <section className="border-b nsu-border" id="locations">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.labels.eyebrow}
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
        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))] px-6 py-14 text-center sm:px-10 lg:px-16">
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
        </Card>
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
      <FinalCtaSection locale={locale} />
    </>
  );
}