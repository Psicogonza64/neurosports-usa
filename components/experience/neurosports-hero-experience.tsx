import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScientificJourneyDiagram } from "@/components/scientific-journey/ScientificJourneyDiagram";
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
      <Container className="grid min-h-[calc(100vh-73px)] gap-12 py-14 md:gap-14 xl:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] xl:items-center xl:gap-16 xl:py-28">
        <div className="order-2 max-w-2xl space-y-10 xl:order-1">
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

        <div className="order-1 flex w-full items-center justify-center xl:order-2">
          <div className="nsu-panel w-full max-w-3xl rounded-[2rem] border p-4 sm:p-6 lg:p-7">
            <ScientificJourneyDiagram locale={locale} mode="hero" />
          </div>
        </div>
      </Container>
    </section>
  );
}
