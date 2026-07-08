import { cn } from "@/utils/cn";

type HeroObjectPlaceholderProps = {
  className?: string;
};

export function HeroObjectPlaceholder({ className }: HeroObjectPlaceholderProps) {
  return (
    <div
      className={cn(
        "nsu-panel flex aspect-[4/5] w-full max-w-2xl items-center justify-center rounded-[2rem] border p-6 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_72%,white)] p-6 sm:p-8">
        <div className="relative flex h-full w-full max-w-xl items-center justify-center">
          <div className="absolute inset-[9%] rounded-[46%] border border-dashed border-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_60%,white)]/40" />

          <div className="absolute left-[7%] top-[22%] rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Evaluation Placeholder
          </div>

          <div className="absolute right-[10%] top-[31%] rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Brain Network Placeholder
          </div>

          <div className="absolute left-[8%] bottom-[16%] max-w-[10rem] rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Clinical Branch Placeholder
          </div>

          <div className="absolute right-[7%] bottom-[16%] max-w-[11rem] rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            NeuroPerformance Branch Placeholder
          </div>

          <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-primary)_16%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Functional Outcome Placeholder
          </div>

          <div className="relative z-10 flex min-h-[10rem] w-[13rem] items-center justify-center rounded-[1.8rem] border border-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_78%,white)] px-5 text-center text-xs uppercase tracking-[0.22em] text-[var(--color-foreground)]">
            Central MNSI Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}