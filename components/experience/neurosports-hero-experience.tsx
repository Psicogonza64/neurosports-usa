import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { experienceRhythm } from "@/components/experience/section-spacing";
import {
  getNeuroSportsHeroContent,
  type HeroLocale,
} from "@/lib/neurosports-hero-content";
import { cn } from "@/utils/cn";

type NeuroSportsHeroExperienceProps = {
  id?: string;
  locale?: HeroLocale;
  ctaHref?: string;
  secondaryCtaHref?: string;
  className?: string;
};

type NodeProps = {
  title: string;
  subtitle?: string;
  className?: string;
  emphasis?: "default" | "core" | "outcome";
};

function GlassNode({ title, subtitle, className, emphasis = "default" }: NodeProps) {
  const emphasisClasses =
    emphasis === "core"
      ? "border-[color:color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_68%,white)] text-[var(--color-foreground)]"
      : emphasis === "outcome"
        ? "border-[color:color-mix(in_srgb,var(--color-secondary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] text-[var(--color-foreground)]"
        : "border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_56%,white)] text-[var(--color-muted)]";

  return (
    <div
      className={cn(
        "z-20 rounded-[1.1rem] border px-3.5 py-2.5 text-center shadow-[0_20px_48px_-42px_rgba(35,33,29,0.28)] backdrop-blur-[10px]",
        emphasisClasses,
        className,
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.16em] leading-tight">{title}</p>
      {subtitle ? (
        <p className="mt-1 text-[9px] normal-case tracking-[0.01em] text-[var(--color-muted)] leading-snug">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function NeuralPaths() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-[15] h-full w-full"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M50 16.8C50 20.2 50 22.9 50 25.8"
        stroke="color-mix(in srgb, var(--color-secondary) 19%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <path
        d="M50 33.5C50 36.4 50 39.3 50 42"
        stroke="color-mix(in srgb, var(--color-primary) 18%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <path
        d="M50 49.5C45.4 56.4 40.7 60.8 33.2 65.2"
        stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <path
        d="M50 49.5C54.6 56.4 59.3 60.8 66.8 65.2"
        stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <path
        d="M33.2 72.8C38.6 78.6 44.2 82.2 50 84.9"
        stroke="color-mix(in srgb, var(--color-primary) 18%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
      <path
        d="M66.8 72.8C61.4 78.6 55.8 82.2 50 84.9"
        stroke="color-mix(in srgb, var(--color-primary) 18%, var(--color-border))"
        strokeWidth="0.28"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesktopTabletJourney({
  functionalEvaluation,
  functionalNetworks,
  mnsiTitle,
  mnsiSubtitle,
  clinicalTitle,
  clinicalSubtitle,
  performanceTitle,
  performanceSubtitle,
  outcomesTitle,
  outcomesSubtitle,
}: {
  functionalEvaluation: string;
  functionalNetworks: string;
  mnsiTitle: string;
  mnsiSubtitle: string;
  clinicalTitle: string;
  clinicalSubtitle: string;
  performanceTitle: string;
  performanceSubtitle: string;
  outcomesTitle: string;
  outcomesSubtitle: string;
}) {
  return (
    <>
      <NeuralPaths />

      <GlassNode
        title={functionalEvaluation}
        className="absolute left-1/2 top-[10.5%] w-[11.8rem] -translate-x-1/2 md:w-[12.4rem] lg:w-[13rem]"
      />

      <GlassNode
        title={functionalNetworks}
        className="absolute left-1/2 top-[28%] w-[13.6rem] -translate-x-1/2 md:w-[14rem] lg:w-[15rem]"
      />

      <GlassNode
        title={mnsiTitle}
        subtitle={mnsiSubtitle}
        emphasis="core"
        className="absolute left-1/2 top-[43%] w-[14rem] -translate-x-1/2 md:w-[14.5rem] lg:w-[15rem]"
      />

      <GlassNode
        title={clinicalTitle}
        subtitle={clinicalSubtitle}
        className="absolute left-[9%] top-[62%] w-[11.6rem] md:left-[10%] md:w-[12.2rem] lg:left-[8%] lg:w-[12.8rem]"
      />

      <GlassNode
        title={performanceTitle}
        subtitle={performanceSubtitle}
        className="absolute right-[9%] top-[62%] w-[11.6rem] md:right-[10%] md:w-[12.2rem] lg:right-[8%] lg:w-[12.8rem]"
      />

      <GlassNode
        title={outcomesTitle}
        subtitle={outcomesSubtitle}
        emphasis="outcome"
        className="absolute bottom-[6.8%] left-1/2 w-[13.8rem] -translate-x-1/2 md:w-[14.2rem] lg:w-[15rem]"
      />
    </>
  );
}

function MobileJourney({
  functionalEvaluation,
  functionalNetworks,
  mnsiTitle,
  mnsiSubtitle,
  clinicalTitle,
  clinicalSubtitle,
  performanceTitle,
  performanceSubtitle,
  outcomesTitle,
  outcomesSubtitle,
}: {
  functionalEvaluation: string;
  functionalNetworks: string;
  mnsiTitle: string;
  mnsiSubtitle: string;
  clinicalTitle: string;
  clinicalSubtitle: string;
  performanceTitle: string;
  performanceSubtitle: string;
  outcomesTitle: string;
  outcomesSubtitle: string;
}) {
  return (
    <div className="relative mt-5 flex flex-col gap-3.5 md:hidden">
      <div className="absolute left-1/2 top-[8%] bottom-[8%] w-px -translate-x-1/2 bg-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))]" />

      <GlassNode title={functionalEvaluation} className="relative" />
      <GlassNode title={functionalNetworks} className="relative" />
      <GlassNode title={mnsiTitle} subtitle={mnsiSubtitle} emphasis="core" className="relative" />
      <GlassNode title={clinicalTitle} subtitle={clinicalSubtitle} className="relative" />
      <GlassNode title={performanceTitle} subtitle={performanceSubtitle} className="relative" />
      <GlassNode title={outcomesTitle} subtitle={outcomesSubtitle} emphasis="outcome" className="relative" />
    </div>
  );
}

export function NeuroSportsHeroExperience({
  id = "home",
  locale = "en",
  ctaHref = "#appointments",
  secondaryCtaHref = "#model",
  className,
}: NeuroSportsHeroExperienceProps) {
  const content = getNeuroSportsHeroContent(locale);

  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container className="grid min-h-[calc(100vh-73px)] gap-12 py-14 md:gap-14 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] lg:items-center lg:gap-16 lg:py-28">
        <div className="order-2 max-w-2xl space-y-10 lg:order-1">
          <div className={experienceRhythm.headerStack}>
            <p className={experienceRhythm.eyebrow}>{content.eyebrow}</p>
            <h1 className={cn(experienceRhythm.heroTitle, "whitespace-pre-line")}>{content.title}</h1>
            <p className={experienceRhythm.heroBody}>{content.subtitle}</p>
          </div>
          <div className={experienceRhythm.buttonGroup}>
            <Button href={ctaHref}>
              <span>{content.primaryCTA}</span>
            </Button>
            <Button href={secondaryCtaHref} variant="secondary">
              <span>{content.secondaryCTA}</span>
            </Button>
          </div>
        </div>

        <div className="order-1 flex w-full items-center justify-center lg:order-2">
          <div className="nsu-panel flex w-full max-w-2xl flex-col rounded-[2rem] border p-4 sm:p-6 lg:p-7">
            <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[1.85rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[linear-gradient(158deg,color-mix(in_srgb,var(--color-background)_76%,white),color-mix(in_srgb,var(--color-background)_62%,white))]">
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_28%_24%,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_44%),radial-gradient(circle_at_74%_70%,color-mix(in_srgb,var(--color-secondary)_8%,transparent),transparent_48%)]" />

              <div
                className="relative h-full w-full"
                role="img"
                aria-label={content.brainAlt}
              >
                <Image
                  src="/images/neurosports-brain-master.webp"
                  alt={content.brainAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 80vw"
                  className="absolute left-1/2 top-1/2 z-[11] h-[84%] w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />

                <div className="hidden md:block">
                  <DesktopTabletJourney
                    functionalEvaluation={content.functionalEvaluation}
                    functionalNetworks={content.functionalNetworks}
                    mnsiTitle={content.mnsiTitle}
                    mnsiSubtitle={content.mnsiSubtitle}
                    clinicalTitle={content.clinicalTitle}
                    clinicalSubtitle={content.clinicalSubtitle}
                    performanceTitle={content.performanceTitle}
                    performanceSubtitle={content.performanceSubtitle}
                    outcomesTitle={content.outcomesTitle}
                    outcomesSubtitle={content.outcomesSubtitle}
                  />
                </div>
              </div>
            </div>

            <MobileJourney
              functionalEvaluation={content.functionalEvaluation}
              functionalNetworks={content.functionalNetworks}
              mnsiTitle={content.mnsiTitle}
              mnsiSubtitle={content.mnsiSubtitle}
              clinicalTitle={content.clinicalTitle}
              clinicalSubtitle={content.clinicalSubtitle}
              performanceTitle={content.performanceTitle}
              performanceSubtitle={content.performanceSubtitle}
              outcomesTitle={content.outcomesTitle}
              outcomesSubtitle={content.outcomesSubtitle}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
