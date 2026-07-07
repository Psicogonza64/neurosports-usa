import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

import { experienceRhythm } from "@/components/experience/section-spacing";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  visual?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  visual,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("border-b nsu-border", className)}>
      <Container className="grid min-h-[calc(100vh-73px)] gap-16 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-28">
        <div className="max-w-2xl space-y-10">
          <div className={experienceRhythm.headerStack}>
            {eyebrow ? <p className={experienceRhythm.eyebrow}>{eyebrow}</p> : null}
            <h1 className={experienceRhythm.heroTitle}>{title}</h1>
            <p className={experienceRhythm.heroBody}>{description}</p>
          </div>
          {ctaLabel && ctaHref ? (
            <div className={experienceRhythm.buttonGroup}>
              <Button href={ctaHref}>
                <span>{ctaLabel}</span>
              </Button>
            </div>
          ) : null}
        </div>
        <div className="flex w-full items-center justify-center">{visual}</div>
      </Container>
    </section>
  );
}