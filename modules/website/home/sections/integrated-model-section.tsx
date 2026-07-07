import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { integratedModelSteps } from "@/modules/website/home/data";

export function IntegratedModelSection() {
  return (
    <section className="border-b nsu-border" id="model">
      <Container className="grid gap-10 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-28">
        <SectionTitle
          eyebrow="Our Integrated Model"
          title="A longitudinal framework that connects diagnosis, intervention, and real-world function."
          description="The future NeuroSports experience is designed around a continuous model rather than isolated services, enabling patients and athletes to move through clear stages of care and measurement."
        />

        <Card className="bg-[color:color-mix(in_srgb,var(--color-secondary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <ol className="space-y-4">
            {integratedModelSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] px-5 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_28%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-sm text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg text-[var(--color-foreground)]">{step.title}</h3>
                    <p className="text-sm leading-6 text-[var(--color-muted)]">{step.note}</p>
                  </div>
                </div>
                {index < integratedModelSteps.length - 1 ? (
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