import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScientificJourneyDiagram } from "@/components/diagrams/ScientificJourneyDiagram";
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
      <Container className="grid gap-10 py-12 md:gap-12 md:py-14 lg:py-16 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:items-center xl:gap-14 xl:py-18">
        <div className="order-2 max-w-2xl space-y-8 xl:order-1 xl:pr-2">
          <div className={experienceRhythm.headerStack}>
            <p className={experienceRhythm.eyebrow}>{content.eyebrow}</p>
            <h1 className={cn(experienceRhythm.heroTitle, "whitespace-pre-line text-balance")}>{content.title}</h1>
            <p className={experienceRhythm.heroBody}>{content.subtitle}</p>
          </div>
          <div className={cn(experienceRhythm.buttonGroup, "pt-1")}>
            <Button href={ctaHref} dataCta="schedule-initial-evaluation" dataLocation="hero">
              <span>{content.primaryCTA}</span>
            </Button>
            <Button href={secondaryCtaHref} variant="secondary">
              <span>{content.secondaryCTA}</span>
            </Button>
          </div>
        </div>

        <div className="order-1 flex w-full items-center justify-center xl:order-2 xl:justify-end">
          <div className="nsu-panel relative w-full max-w-3xl overflow-hidden rounded-[2rem] border p-3 shadow-[0_28px_52px_-38px_rgba(43,42,40,0.62)] sm:p-5 lg:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--ns-gold-soft)_12%,transparent),transparent_42%),radial-gradient(circle_at_80%_76%,color-mix(in_srgb,var(--ns-sage)_15%,transparent),transparent_46%)]" />
            <ScientificJourneyDiagram locale={locale} mode="hero" className="relative" />
          </div>
        </div>
      </Container>
    </section>
  );
}
