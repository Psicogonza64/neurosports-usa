import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

import { experienceRhythm } from "@/components/experience/section-spacing";

type NeuroHeroProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  illustration?: ReactNode;
  className?: string;
};

function DefaultIllustration() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]/80">
        {neurosportsIdentity.oneModel}
      </span>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-sm uppercase tracking-[0.14em] text-[var(--color-primary)]">
          {neurosportsIdentity.mnsi}
        </div>
        <div className="h-12 w-px bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
        <div className="grid w-full max-w-sm gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] p-4 text-sm text-[var(--color-foreground)]">
            {neurosportsIdentity.clinicalNeuroscience}
          </div>
          <div className="rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] p-4 text-sm text-[var(--color-foreground)]">
            {neurosportsIdentity.neuroPerformance}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NeuroHero({
  id,
  eyebrow = neurosportsIdentity.platformStatement,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  illustration,
  className,
}: NeuroHeroProps) {
  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container className="grid min-h-[calc(100vh-73px)] gap-16 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-28">
        <div className="max-w-2xl space-y-10">
          <div className={experienceRhythm.headerStack}>
            <p className={experienceRhythm.eyebrow}>{eyebrow}</p>
            <h1 className={experienceRhythm.heroTitle}>{title}</h1>
            <p className={experienceRhythm.heroBody}>{subtitle}</p>
          </div>
          {ctaLabel && ctaHref ? (
            <div className={experienceRhythm.buttonGroup}>
              <Button href={ctaHref}>
                <span>{ctaLabel}</span>
              </Button>
              {secondaryCtaLabel && secondaryCtaHref ? (
                <Button href={secondaryCtaHref} variant="secondary">
                  <span>{secondaryCtaLabel}</span>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="flex w-full items-center justify-center">
          {illustration ?? <DefaultIllustration />}
        </div>
      </Container>
    </section>
  );
}