import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export type ProcessFlowStep = {
  title: string;
  description: string;
  stepNumber?: string;
};

type ProcessFlowProps = {
  steps: ProcessFlowStep[];
  className?: string;
};

export function ProcessFlow({ steps, className }: ProcessFlowProps) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-12", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div
            key={`${step.stepNumber ?? index + 1}-${step.title}`}
            className="relative lg:col-span-4 xl:col-span-3"
          >
            <Card className="relative h-full min-h-56 p-6 sm:p-7">
              <div className="space-y-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_25%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium tracking-[0.12em] text-[var(--color-primary)]">
                  {step.stepNumber ?? String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl text-[var(--color-foreground)]">{step.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {step.description}
                </p>
              </div>
            </Card>

            {!isLast ? (
              <>
                <span className="absolute left-5 top-full h-5 w-px bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] lg:hidden" />
                <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-lg text-[var(--color-secondary)]/65 lg:block">
                  →
                </span>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}