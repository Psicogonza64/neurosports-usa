import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/ui/hero";
import { SectionTitle } from "@/components/ui/section-title";
import {
  applicationAreas,
  clinicalLogicSteps,
  integratedPhases,
  positioningPoints,
} from "@/modules/website/integrated-model/data";

function IntegratedModelHeroVisual() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">
        Sequential Framework
      </span>
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="relative grid w-full max-w-lg gap-3">
          {integratedPhases.map((phase, index) => (
            <div
              key={phase.id}
              className="relative rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium tracking-[0.12em] text-[var(--color-primary)]">
                  {phase.id}
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
              {index < integratedPhases.length - 1 ? (
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

function HeroSection() {
  return (
    <Hero
      left={
        <div className="max-w-2xl space-y-10">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.3em]">
            NeuroSports USA
          </p>
          <div className="space-y-7">
            <h1 className="max-w-2xl text-5xl leading-[0.94] tracking-[-0.03em] text-[var(--color-foreground)] sm:text-6xl lg:text-7xl">
              Integrated Model
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              A sequential neuroscience-based model for brain rehabilitation,
              cognitive performance and functional transfer.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]/90 sm:text-base">
              NeuroSports USA uses an integrated intervention model designed to
              organize evaluation, neuromodulation, cognitive training,
              sensorimotor consolidation and real-life transfer within a
              structured clinical sequence.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#mnsi-overview">
              <span>Explore the Model</span>
              <span className="text-[10px] font-normal uppercase tracking-[0.14em] opacity-80">
                Ver modelo
              </span>
            </Button>
          </div>
        </div>
      }
      right={<IntegratedModelHeroVisual />}
    />
  );
}

function ModelOverviewSection() {
  return (
    <section className="border-b nsu-border" id="mnsi-overview">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-28">
        <SectionTitle
          eyebrow="MNSI Framework"
          title="MNSI — Multimodal NeuroSequential Integration"
          description="MNSI is a structured intervention model that combines clinical neuropsychology, functional neuroscience, neuromodulation, digital cognitive training, analog integration, sensorimotor consolidation and immediate functional transfer."
        />

        <Card className="bg-[color:color-mix(in_srgb,var(--color-secondary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {integratedPhases.map((phase) => (
                <div
                  key={phase.id}
                  className="rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_60%,white)] p-4"
                >
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary)]/80">
                    Phase {phase.id}
                  </span>
                  <h3 className="mt-3 text-lg text-[var(--color-foreground)]">
                    {phase.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="rounded-[1.7rem] border border-[color:color-mix(in_srgb,var(--color-primary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_56%,white)] p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                <span>Clinical Neuropsychology</span>
                <span>•</span>
                <span>Neuromodulation</span>
                <span>•</span>
                <span>Cognitive Training</span>
                <span>•</span>
                <span>Functional Transfer</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="nsu-gradient-line h-px w-full" />
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  The framework is sequential by design: each phase prepares the
                  next one so that clinical intervention can move from regulation
                  to activation, from activation to integration, and from
                  integration to measurable real-world performance.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

function SixPhaseModelSection() {
  return (
    <section className="border-b nsu-border" id="six-phase-model">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Six-Phase Model"
          title="A structured sequence that organizes intervention from preparation to transfer."
          description="Each phase serves a specific clinical purpose and becomes more effective because it is positioned inside a coherent progression."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {integratedPhases.map((phase) => (
            <Card key={phase.id} className="min-h-72 p-7">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                    Phase {phase.id}
                  </span>
                  <div className="nsu-gradient-line h-px w-16" />
                </div>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {phase.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
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

function ClinicalLogicSection() {
  return (
    <section className="border-b nsu-border" id="clinical-logic">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Clinical Logic"
          title="From Evaluation to Functional Change"
          description="The model follows a clinical sequence where evaluation informs targeting, sequencing and outcome transfer."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {clinicalLogicSteps.map((step, index) => (
            <Card key={step.title} className="relative min-h-60 p-6">
              <div className="space-y-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_25%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium text-[var(--color-primary)]">
                  {index + 1}
                </span>
                <h3 className="text-xl text-[var(--color-foreground)]">{step.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
              {index < clinicalLogicSteps.length - 1 ? (
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-lg text-[var(--color-secondary)]/65 lg:block">
                  →
                </span>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ApplicationsSection() {
  return (
    <section className="border-b nsu-border" id="applications">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Applications"
          title="Where the Integrated Model Applies"
          description="The same sequential logic can be adapted across clinical, educational, athletic and institutional settings."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {applicationAreas.map((area) => (
            <Card key={area.title} className="min-h-64 p-6">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Application
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {area.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {area.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ScientificPositioningSection() {
  return (
    <section className="border-b nsu-border" id="scientific-positioning">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-28">
        <SectionTitle
          eyebrow="Scientific Positioning"
          title="Why This Model Is Different"
          description="This is not a single-technique solution. It is a structured intervention architecture that aligns preparation, activation, cognitive load, motor consolidation and transfer."
        />

        <div className="grid gap-5">
          {positioningPoints.map((point) => (
            <Card key={point.title} className="p-6 sm:p-7">
              <div className="space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{point.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {point.description}
                </p>
              </div>
            </Card>
          ))}

          <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_7%,var(--panel))] p-6 sm:p-7">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                Integrated Difference
              </span>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                It integrates brain state preparation, network activation,
                cognitive load, motor consolidation and real-world transfer so
                that intervention does not end at task completion, but continues
                until the change is functionally usable.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="border-b nsu-border" id="appointments">
      <Container className="py-24 lg:py-28">
        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))] px-6 py-14 text-center sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-7">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
              Final CTA
            </p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
              Start with a Functional Brain Evaluation
            </h2>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Every intervention begins with a comprehensive evaluation to
              identify cognitive strengths, vulnerabilities and functional
              network priorities.
            </p>
            <Button href="#contact" className="mx-auto">
              <span>Schedule an Evaluation</span>
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export function IntegratedModelPage() {
  return (
    <>
      <HeroSection />
      <ModelOverviewSection />
      <SixPhaseModelSection />
      <ClinicalLogicSection />
      <ApplicationsSection />
      <ScientificPositioningSection />
      <FinalCtaSection />
    </>
  );
}