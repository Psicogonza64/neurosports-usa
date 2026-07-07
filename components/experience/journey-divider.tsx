import { cn } from "@/utils/cn";

type JourneyDividerProps = {
  className?: string;
  label?: string;
};

export function JourneyDivider({ className, label }: JourneyDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center gap-4 py-6 text-[var(--color-secondary)]/70",
        className,
      )}
      data-experience-divider="journey"
    >
      <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_45%,white)] transition-transform duration-300" />
        <span className="h-2.5 w-2.5 rounded-full border border-[color:color-mix(in_srgb,var(--color-secondary)_26%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_75%,white)] transition-transform duration-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_42%,white)] transition-transform duration-300" />
      </span>
      {label ? (
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary)]/75">
          {label}
        </span>
      ) : null}
      <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))]" />
    </div>
  );
}