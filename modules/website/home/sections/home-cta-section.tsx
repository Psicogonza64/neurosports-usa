import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type HomeCtaSectionProps = {
  locale?: HomeLocale;
};

export function HomeCtaSection({ locale = "en" }: HomeCtaSectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="home-cta">
      <Container className="py-20 lg:py-24">
        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[linear-gradient(148deg,color-mix(in_srgb,var(--color-background)_82%,white),color-mix(in_srgb,var(--ns-sand)_36%,white))] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">{content.finalCta.eyebrow}</p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">{content.finalCta.title}</h2>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{content.finalCta.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={content.finalCta.primaryHref}>
                <span>{content.finalCta.primaryLabel}</span>
              </Button>
              <Button href={content.finalCta.secondaryHref} variant="secondary">
                <span>{content.finalCta.secondaryLabel}</span>
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
