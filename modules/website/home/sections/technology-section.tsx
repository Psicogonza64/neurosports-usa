import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type TechnologySectionProps = {
  locale?: HomeLocale;
};

export function TechnologySection({ locale = "en" }: TechnologySectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="technology-preview">
      <Container className="py-20 lg:py-24">
        <SectionTitle
          eyebrow={content.technology.eyebrow}
          title={content.technology.title}
          description={content.technology.intro}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.technology.items.map((item) => (
            <Card
              key={item.title}
              className="flex min-h-64 flex-col bg-[color:color-mix(in_srgb,var(--ns-sand)_14%,var(--panel))] p-6"
            >
              <div className="flex h-28 items-center justify-center rounded-[1.25rem] border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_45%,white)] text-sm text-[var(--color-muted)]">
                Placeholder
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{item.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* TODO: Replace neutral technology placeholders with approved photography and device imagery. */}

        <div className="mt-8">
          <Button href={content.technology.ctaHref} variant="secondary">
            <span>{content.technology.ctaLabel}</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}