import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/ui/hero";
import { SectionTitle } from "@/components/ui/section-title";
import {
  assessmentTools,
  cognitiveTrainingTools,
  ecosystemAreas,
  neuroPerformanceSignals,
  neuromodulationTools,
  trackingSteps,
  transferSignals,
} from "@/modules/website/technology/data";

function TechnologyHeroVisual() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">
        Technology Ecosystem
      </span>
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
          {ecosystemAreas.map((area, index) => (
            <div
              key={area.title}
              className="relative rounded-[1.6rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] p-5"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-base font-medium text-[var(--color-foreground)]">
                {area.title}
              </h3>
              <p className="mt-2 text-xs leading-6 text-[var(--color-muted)]">
                {area.description}
              </p>
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
              Technology
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Advanced tools for brain evaluation, rehabilitation,
              neuromodulation and cognitive performance.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]/90 sm:text-base">
              NeuroSports USA integrates clinical neuropsychology with
              evidence-informed technology to support evaluation, intervention
              planning, cognitive training and functional transfer.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#technology-overview">
              <span>Explore Technology</span>
              <span className="text-[10px] font-normal uppercase tracking-[0.14em] opacity-80">
                Explorar tecnologia
              </span>
            </Button>
          </div>
        </div>
      }
      right={<TechnologyHeroVisual />}
    />
  );
}

function TechnologyOverviewSection() {
  return (
    <section className="border-b nsu-border" id="technology-overview">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-28">
        <SectionTitle
          eyebrow="Technology Overview"
          title="A Multimodal Technology Ecosystem"
          description="Our technology ecosystem supports the complete intervention process: assessment, brain-state preparation, neuromodulation, digital cognitive activation, sensorimotor consolidation and progress tracking."
        />

        <Card className="bg-[color:color-mix(in_srgb,var(--color-secondary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {ecosystemAreas.map((area) => (
                <div
                  key={area.title}
                  className="rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_60%,white)] p-4"
                >
                  <h3 className="text-base text-[var(--color-foreground)]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.7rem] border border-[color:color-mix(in_srgb,var(--color-primary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_56%,white)] p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                <span>Assessment</span>
                <span>•</span>
                <span>Preparation</span>
                <span>•</span>
                <span>Activation</span>
                <span>•</span>
                <span>Transfer</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="nsu-gradient-line h-px w-full" />
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  Technology is organized as part of a complete ecosystem rather
                  than as isolated tools, allowing each stage of intervention to
                  support the next with clearer clinical direction.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

function AssessmentSection() {
  return (
    <section className="border-b nsu-border" id="assessment-tools">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Neuropsychological Assessment"
          title="Institutional tools that support precise and functional evaluation."
          description="Assessment technology is used to strengthen the clarity, consistency and interpretive value of the neuropsychological process."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assessmentTools.map((tool) => (
            <Card key={tool.title} className="min-h-64 p-6">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Assessment
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {tool.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {tool.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function NeuromodulationSection() {
  return (
    <section className="border-b nsu-border" id="neuromodulation">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-28">
        <SectionTitle
          eyebrow="Neuromodulation"
          title="Neuromodulation and Brain-State Preparation"
          description="Technology may be selected to support regulation, prepare target systems and guide the individual into a more effective intervention state."
        />

        <div className="grid gap-5">
          {neuromodulationTools.map((item) => (
            <Card key={item.title} className="p-6 sm:p-7">
              <div className="space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{item.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function DigitalTrainingSection() {
  return (
    <section className="border-b nsu-border" id="digital-training">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Digital Cognitive Training"
          title="Structured digital activation designed to support specific cognitive functions."
          description="Computerized training is used as part of a larger intervention sequence, with targets, pacing and challenge level aligned to clinical priorities."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cognitiveTrainingTools.map((tool) => (
            <Card key={tool.title} className="min-h-64 p-6">
              <div className="space-y-4">
                <div className="nsu-gradient-line h-px w-16" />
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {tool.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {tool.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TransferSection() {
  return (
    <section className="border-b nsu-border" id="functional-transfer">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Sensorimotor and Functional Transfer"
          title="Technology becomes clinically meaningful when it connects cognition to action and daily performance."
          description="Intervention tools are organized to support how neurocognitive gains move into response quality, motor planning and real-life use."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {transferSignals.map((signal) => (
            <Card key={signal.title} className="min-h-56 p-6">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Transfer
                </span>
                <h3 className="text-xl text-[var(--color-foreground)]">{signal.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {signal.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function NeuroPerformanceSection() {
  return (
    <section className="border-b nsu-border" id="neuroperformance-technology">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-28">
        <SectionTitle
          eyebrow="NeuroPerformance Technology"
          title="Athlete-focused systems designed to connect brain efficiency with competitive transfer."
          description="For athletes, technology is selected to support rapid perception, decision quality, sustained attention and measurable sport-specific performance progression."
        />

        <Card className="bg-[color:color-mix(in_srgb,var(--color-secondary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {neuroPerformanceSignals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_60%,white)] p-5"
              >
                <h3 className="text-base text-[var(--color-foreground)]">{signal.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
}

function TrackingSection() {
  return (
    <section className="border-b nsu-border" id="tracking-functional-change">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Data and Progress Tracking"
          title="Tracking Functional Change"
          description="Technology can support a more visible intervention pathway by helping teams monitor progression from baseline through functional outcomes."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {trackingSteps.map((step, index) => (
            <Card key={step.title} className="relative min-h-56 p-6">
              <div className="space-y-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_25%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium text-[var(--color-primary)]">
                  {index + 1}
                </span>
                <h3 className="text-xl text-[var(--color-foreground)]">{step.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </div>
              {index < trackingSteps.length - 1 ? (
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

function ResponsibleUseSection() {
  return (
    <section className="border-b nsu-border" id="responsible-use">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:py-28">
        <SectionTitle
          eyebrow="Responsible Use"
          title="Technology Guided by Clinical Judgment"
          description="Technology is not used as a replacement for clinical reasoning. It is integrated into a professional neuropsychological model and individualized intervention plan."
        />

        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_7%,var(--panel))] p-6 sm:p-8">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
              Clinical Direction
            </span>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Every tool is interpreted through neuropsychological judgment,
              functional priorities and real-world context. Selection depends on
              who the patient is, what the evaluation shows and which sequence of
              intervention is most appropriate.
            </p>
          </div>
        </Card>
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
              Technology With a Clinical Purpose
            </h2>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Every tool is selected according to the patient&apos;s evaluation
              profile, functional goals and intervention plan.
            </p>
            <Button
              href="/schedule"
              className="mx-auto"
              dataCta="schedule-initial-evaluation"
              dataLocation="technology"
            >
              <span>Schedule an Evaluation</span>
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export function TechnologyPage() {
  return (
    <>
      <HeroSection />
      <TechnologyOverviewSection />
      <AssessmentSection />
      <NeuromodulationSection />
      <DigitalTrainingSection />
      <TransferSection />
      <NeuroPerformanceSection />
      <TrackingSection />
      <ResponsibleUseSection />
      <FinalCtaSection />
    </>
  );
}