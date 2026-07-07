import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Hero } from "@/components/ui/hero";
import { SectionTitle } from "@/components/ui/section-title";
import {
  brainModelPhases,
  clinicalCards,
  competitiveAdvantages,
  neuroPerformanceBenefits,
  populations,
  sportsPrograms,
} from "@/modules/website/what-we-do/data";

function WhatWeDoHeroVisual() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">
        Brain Systems Overview
      </span>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[42%] border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_72%,white)] px-8 text-center text-sm leading-6 text-[var(--color-muted)]">
          <div className="absolute inset-[7%] rounded-[42%] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute inset-[15%] rounded-[38%] border border-[color:color-mix(in_srgb,var(--color-primary)_16%,var(--color-border))]" />

          <div className="absolute left-[19%] top-[27%] h-px w-[26%] rotate-[-8deg] bg-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))]" />
          <div className="absolute right-[17%] top-[34%] h-px w-[24%] rotate-[10deg] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />
          <div className="absolute left-[33%] bottom-[30%] h-px w-[30%] rotate-[-14deg] bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute right-[26%] bottom-[24%] h-px w-[19%] rotate-[20deg] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />

          <div className="absolute left-[20%] top-[28%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_48%,white)]" />
          <div className="absolute left-[45%] top-[27%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_45%,white)]" />
          <div className="absolute right-[18%] top-[34%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]" />
          <div className="absolute left-[36%] bottom-[30%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_45%,white)]" />
          <div className="absolute right-[29%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_40%,white)]" />

          <span className="relative z-10 max-w-[12.5rem] rounded-full border border-[color:color-mix(in_srgb,var(--color-border)_78%,white)] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] px-4 py-2">
            Functional Brain Architecture
          </span>
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
              What We Do
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Comprehensive brain evaluation, rehabilitation and NeuroPerformance
              programs based on neuroscience.
            </p>
            <p className="max-w-lg text-sm leading-7 text-[var(--color-secondary)]/80">
              Evaluacion, rehabilitacion y NeuroPerformance con enfoque funcional.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#clinical-neuropsychology">
              <span>Explore Programs</span>
              <span className="text-[10px] font-normal uppercase tracking-[0.14em] opacity-80">
                Explorar programas
              </span>
            </Button>
          </div>
        </div>
      }
      right={<WhatWeDoHeroVisual />}
    />
  );
}

function ClinicalNeuropsychologySection() {
  return (
    <section className="border-b nsu-border" id="clinical-neuropsychology">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Clinical Neuropsychology"
          title="Structured clinical services for precise evaluation and functional recovery planning."
          description="Our neuropsychology programs are organized to move from rigorous assessment to meaningful intervention and real-world transfer."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clinicalCards.map((item) => (
            <Card key={item.title} className="min-h-72 p-7">
              <div className="space-y-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border nsu-outline-badge text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {item.marker}
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {item.title}
                </h3>
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

function BrainRehabilitationSection() {
  return (
    <section className="border-b nsu-border" id="brain-rehabilitation">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:py-28">
        <SectionTitle
          eyebrow="Brain Rehabilitation"
          title="The MNSI model translates neuroscience into progressive and functional rehabilitation phases."
          description="MNSI is presented as an integrated institutional framework where rehabilitation evolves through sequenced phases to maximize sustainable outcomes."
        />

        <Card className="bg-[color:color-mix(in_srgb,var(--color-secondary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <ol className="space-y-4">
            {brainModelPhases.map((phase, index) => (
              <li key={phase.title} className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] px-5 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_28%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-sm text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg text-[var(--color-foreground)]">{phase.title}</h3>
                    <p className="text-sm leading-6 text-[var(--color-muted)]">{phase.note}</p>
                  </div>
                </div>
                {index < brainModelPhases.length - 1 ? (
                  <span className="pl-5 text-lg text-[var(--color-secondary)]/70">↓</span>
                ) : null}
              </li>
            ))}
          </ol>
        </Card>
      </Container>
    </section>
  );
}

function NeuroPerformanceSection() {
  return (
    <section className="border-b nsu-border" id="neuroperformance">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="NeuroPerformance"
          title="Sport-specific cognitive performance pathways prepared for high-demand competitive environments."
          description="Programs are designed to support sport contexts where perception, timing, attention, and execution must remain reliable under pressure."
          supportText="Rendimiento neurocognitivo aplicado al contexto real de competencia."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="p-7 sm:p-8">
            <div className="space-y-5">
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                Sports Programs
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {sportsPrograms.map((program) => (
                  <div
                    key={program.name}
                    className="rounded-2xl border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_55%,white)] p-4"
                  >
                    <h4 className="text-base font-medium text-[var(--color-foreground)]">
                      {program.name}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {program.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-7 sm:p-8">
            <div className="space-y-5">
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                Program Benefits
              </h3>
              <ul className="space-y-3">
                {neuroPerformanceBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function PopulationsSection() {
  return (
    <section className="border-b nsu-border" id="populations">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Populations We Serve"
          title="Programs designed for diverse clinical and performance populations."
          description="NeuroSports USA is structured to support individual, family, athletic, and institutional needs through one coherent methodology."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {populations.map((population) => (
            <Card key={population} className="min-h-40 p-6">
              <div className="space-y-3">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  Population
                </span>
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {population}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyNeuroSportsSection() {
  return (
    <section className="border-b nsu-border" id="why-neurosports">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Why NeuroSports USA"
          title="An institutional model that combines evidence, function, and scalable performance systems."
          description="Competitive advantages are defined as structural strengths to sustain clinical quality, measurable outcomes, and long-term growth."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {competitiveAdvantages.map((item) => (
            <Card key={item} className="min-h-56 p-6">
              <div className="space-y-4">
                <div className="nsu-gradient-line h-px w-20" />
                <h3 className="text-xl text-[var(--color-foreground)]">{item}</h3>
              </div>
            </Card>
          ))}
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
              Start with a comprehensive evaluation.
            </h2>
            <Button href="#contact" className="mx-auto">
              <span>Schedule an Evaluation</span>
              <span className="text-[10px] font-normal uppercase tracking-[0.14em] opacity-80">
                Agendar evaluacion
              </span>
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}

export function WhatWeDoPage() {
  return (
    <>
      <HeroSection />
      <ClinicalNeuropsychologySection />
      <BrainRehabilitationSection />
      <NeuroPerformanceSection />
      <PopulationsSection />
      <WhyNeuroSportsSection />
      <FinalCtaSection />
    </>
  );
}