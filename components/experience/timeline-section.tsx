import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export type TimelinePhase = {
  title: string;
  description: string;
  label?: string;
};

type TimelineSectionProps = {
  phases: TimelinePhase[];
  className?: string;
};

export function TimelineSection({ phases, className }: TimelineSectionProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      {phases.map((phase, index) => (
        <div key={`${phase.label ?? index + 1}-${phase.title}`} className="flex gap-4">
          <div className="flex w-10 shrink-0 flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_14%,white)]" />
            {index < phases.length - 1 ? (
              <span className="mt-2 h-full min-h-16 w-px bg-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))]" />
            ) : null}
          </div>
          <Card className="flex-1 p-6 sm:p-7">
            <div className="space-y-3">
              {phase.label ? (
                <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                  {phase.label}
                </span>
              ) : null}
              <h3 className="text-xl text-[var(--color-foreground)]">{phase.title}</h3>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {phase.description}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}