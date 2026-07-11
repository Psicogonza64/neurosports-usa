import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getNeuroSportsHomeContent, type HomeLocale } from "@/lib/neurosports-home-content";

type ApplicationsSectionProps = {
  locale?: HomeLocale;
};

export function ApplicationsSection({ locale = "en" }: ApplicationsSectionProps) {
  const content = getNeuroSportsHomeContent(locale);

  return (
    <section className="border-b nsu-border" id="applications">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow={content.applications.eyebrow}
          title={content.applications.title}
          description={content.applications.intro}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {content.applications.pathways.map((pathway) => (
            <Card key={pathway.id} className="h-full p-6 sm:p-7 lg:p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{pathway.title}</h3>
                  <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{pathway.description}</p>
                </div>

                <ul className="grid gap-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {pathway.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-secondary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button href={pathway.ctaHref} variant="secondary">
                  <span>{pathway.ctaLabel}</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
