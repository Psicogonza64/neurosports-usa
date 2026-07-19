import { ScientificCard } from "@/components/experience/scientific-card";
import { cn } from "@/utils/cn";

export type InstitutionalEvidenceItem = {
  id: string;
  title: string;
  summary: string;
  status: string;
  timeline?: string;
};

type InstitutionalEvidenceBoardProps = {
  items: InstitutionalEvidenceItem[];
  className?: string;
};

function InstitutionalEvidenceBoard({
  items,
  className,
}: InstitutionalEvidenceBoardProps) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2", className)}>
      {items.map((item) => (
        <ScientificCard key={item.id} interactive className="nsu-content-stack p-6 sm:p-7">
          <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
            {item.status}
          </span>
          <h3 className="nsu-h3">{item.title}</h3>
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {item.summary}
          </p>
          {item.timeline ? (
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]/80">
              {item.timeline}
            </p>
          ) : null}
        </ScientificCard>
      ))}
    </div>
  );
}

export function PublicationsBoard(props: InstitutionalEvidenceBoardProps) {
  return <InstitutionalEvidenceBoard {...props} />;
}

export function ProjectsBoard(props: InstitutionalEvidenceBoardProps) {
  return <InstitutionalEvidenceBoard {...props} />;
}

export function CollaborationsBoard(props: InstitutionalEvidenceBoardProps) {
  return <InstitutionalEvidenceBoard {...props} />;
}

export function IndicatorsBoard(props: InstitutionalEvidenceBoardProps) {
  return <InstitutionalEvidenceBoard {...props} />;
}
