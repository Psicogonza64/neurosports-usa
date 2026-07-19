import { Container } from "@/components/ui/container";
import { ScientificCard } from "@/components/experience/scientific-card";
import { SectionHeader } from "@/components/experience/section-header";
import { SectionSpacing } from "@/components/experience/section-spacing";
import { cn } from "@/utils/cn";

export type ScientificKnowledgeHubArea = {
  id: string;
  title: string;
  description: string;
  status: "Current methodology" | "Future development line";
  href?: string;
  relatedTo?: string;
};

type ScientificKnowledgeHubProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  areas: ScientificKnowledgeHubArea[];
  className?: string;
};

export function ScientificKnowledgeHub({
  id,
  label,
  title,
  description,
  areas,
  className,
}: ScientificKnowledgeHubProps) {
  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container>
        <SectionSpacing>
          <div className="nsu-section-stack">
            <SectionHeader label={label} title={title} subtitle={description} />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <ScientificCard className="bg-[color:color-mix(in_srgb,var(--ns-sand)_12%,var(--panel))] p-6 sm:p-8 lg:p-10">
                <div className="nsu-content-stack">
                  <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                    Institutional knowledge architecture
                  </span>
                  <h3 className="nsu-h2">Scientific Knowledge Hub</h3>
                  <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    Foundational structure for organizing scientific communication across methodologies,
                    research and future institutional development lines.
                  </p>
                  <div className="rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]/80">
                      Governance note
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      Architecture only. This section does not declare commercial availability or
                      unvalidated scientific outcomes.
                    </p>
                  </div>
                </div>
              </ScientificCard>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Scientific knowledge hub areas">
                {areas.map((area) => (
                  <ScientificCard key={area.id} interactive className="nsu-content-stack p-6 sm:p-7">
                    <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                      {area.status}
                    </span>
                    <h3 className="nsu-h3">{area.title}</h3>
                    <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {area.description}
                    </p>
                    {area.relatedTo ? (
                      <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]/80">
                        Linked to: {area.relatedTo}
                      </p>
                    ) : null}
                    {area.href ? (
                      <a
                        className="inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[var(--color-foreground)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-secondary)_10%,white)]"
                        href={area.href}
                      >
                        Explore area
                      </a>
                    ) : null}
                  </ScientificCard>
                ))}
              </div>
            </div>
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}