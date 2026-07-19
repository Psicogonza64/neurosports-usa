import { Container } from "@/components/ui/container";
import { ScientificCard } from "@/components/experience/scientific-card";
import { SectionHeader } from "@/components/experience/section-header";
import { SectionSpacing } from "@/components/experience/section-spacing";
import { cn } from "@/utils/cn";

export type ScientificEcosystemNode = {
  id: string;
  name: string;
  purpose: string;
  relation: string;
  status: string;
};

type ScientificEcosystemSectionProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  platformName: string;
  platformPurpose: string;
  nodes: ScientificEcosystemNode[];
  className?: string;
};

export function ScientificEcosystemSection({
  id,
  label,
  title,
  description,
  platformName,
  platformPurpose,
  nodes,
  className,
}: ScientificEcosystemSectionProps) {
  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container>
        <SectionSpacing>
          <div className="nsu-section-stack">
            <SectionHeader label={label} title={title} subtitle={description} />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <ScientificCard className="bg-[color:color-mix(in_srgb,var(--ns-sand)_12%,var(--panel))] p-6 sm:p-8 lg:p-10">
                <div className="nsu-content-stack">
                  <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                    Institutional Platform
                  </span>
                  <h3 className="nsu-h2">{platformName}</h3>
                  <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {platformPurpose}
                  </p>
                  <div className="rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]/80">
                      Architecture note
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      Public platform presentation only. Clinical and scientific internal systems remain independent and are not exposed from this section.
                    </p>
                  </div>
                </div>
              </ScientificCard>

              <div className="grid gap-5 md:grid-cols-2" aria-label="Scientific ecosystem components">
                {nodes.map((node) => (
                  <ScientificCard key={node.id} interactive className="nsu-content-stack p-6 sm:p-7">
                    <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                      {node.status}
                    </span>
                    <h3 className="nsu-h3">{node.name}</h3>
                    <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {node.purpose}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]/80">
                      Relation: {node.relation}
                    </p>
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
