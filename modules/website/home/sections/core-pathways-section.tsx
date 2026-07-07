import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { corePathways } from "@/modules/website/home/data";

export function CorePathwaysSection() {
  return (
    <section className="border-b nsu-border" id="services">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Clinical + Sports NeuroPerformance"
          title="Two core pathways designed to serve both care and high-level performance."
          description="The platform distinguishes between clinical care needs and sports NeuroPerformance journeys while preserving one shared institutional framework."
          supportText="Dos rutas principales: cuidado clinico y NeuroPerformance deportivo."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {corePathways.map((item) => (
            <Card key={item.title} className="min-h-80 p-8 sm:p-10">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
                  Core Pathway
                </span>
                <h3 className="text-3xl tracking-tight text-[var(--color-foreground)]">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
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