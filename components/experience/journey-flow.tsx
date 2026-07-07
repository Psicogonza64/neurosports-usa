import { cn } from "@/utils/cn";

export type JourneyFlowStep = {
  title: string;
  description: string;
  label?: string;
};

type JourneyFlowProps = {
  steps: JourneyFlowStep[];
  className?: string;
};

export function JourneyFlow({ steps, className }: JourneyFlowProps) {
  return (
    <div className={cn("grid gap-5 lg:grid-cols-12", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div
            key={`${step.label ?? index + 1}-${step.title}`}
            className="relative lg:col-span-4 xl:col-span-3"
            data-journey-step
          >
            <div className="relative h-full rounded-[1.85rem] border nsu-panel p-6 sm:p-7">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_25%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium tracking-[0.12em] text-[var(--color-primary)] transition-transform duration-300">
                    {step.label ?? String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))]" />
                </div>
                <h3 className="text-xl text-[var(--color-foreground)]">{step.title}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>

            {!isLast ? (
              <>
                <span className="absolute left-5 top-full h-5 w-px bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] lg:hidden" />
                <div className="absolute -right-3 top-1/2 hidden w-6 -translate-y-1/2 items-center gap-1 lg:flex">
                  <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_44%,white)]" />
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}