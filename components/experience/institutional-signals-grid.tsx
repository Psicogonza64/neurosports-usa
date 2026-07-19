import { ScientificCard } from "@/components/experience/scientific-card";
import { cn } from "@/utils/cn";

export type InstitutionalSignal = {
  title: string;
  description: string;
  label?: string;
};

type InstitutionalSignalsGridProps = {
  items: InstitutionalSignal[];
  className?: string;
  columns?: "2" | "3" | "4" | "5";
};

const columnsClassName = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 xl:grid-cols-3",
  "4": "md:grid-cols-2 xl:grid-cols-4",
  "5": "md:grid-cols-2 xl:grid-cols-5",
};

export function InstitutionalSignalsGrid({
  items,
  className,
  columns = "3",
}: InstitutionalSignalsGridProps) {
  return (
    <div className={cn("grid gap-5", columnsClassName[columns], className)}>
      {items.map((item) => (
        <ScientificCard key={item.title} interactive className="nsu-content-stack p-6 sm:p-7">
          {item.label ? (
            <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
              {item.label}
            </span>
          ) : null}
          <h3 className="nsu-h3">{item.title}</h3>
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {item.description}
          </p>
        </ScientificCard>
      ))}
    </div>
  );
}
