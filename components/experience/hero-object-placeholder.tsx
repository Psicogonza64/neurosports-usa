import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type HeroObjectPlaceholderProps = {
  className?: string;
};

function AssessmentIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="4.5" y="5" width="11" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 15.5L18.8 19.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="6.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="16.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.3 8.7L10.2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.7 7.7L13.8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 8.3L15.5 7.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CoreIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 4.8C7 4.8 5 7.2 5 9.9c0 1.7.7 3.2 1.9 4.1.6.5 1 1.2 1 2V17c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-.9c0-.8.3-1.5 1-2 1.2-.9 1.9-2.4 1.9-4.1 0-2.7-2-5.1-5-5.1-.9 0-1.7.2-2.4.7A4.8 4.8 0 0 0 10 4.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 19.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 8.8c.7-.7 2-.7 2.7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClinicalIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7.2" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.8 18.8c.6-2.9 2.6-4.8 5.2-4.8 2.6 0 4.6 1.9 5.2 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 6.2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.5 8.2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PerformanceIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M5 15.5c2.4-3.7 5-5.5 8.5-6.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 17.5c2.9-1.3 5.1-3.6 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 6.4h3.8v3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OutcomeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5v2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16.8V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 12h2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.8 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type HeroNodeCardProps = {
  label: string;
  icon: ReactNode;
  className?: string;
  emphasis?: "default" | "core";
};

function HeroNodeCard({
  label,
  icon,
  className,
  emphasis = "default",
}: HeroNodeCardProps) {
  const emphasisClasses =
    emphasis === "core"
      ? "border-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_80%,white)] text-[var(--color-foreground)] shadow-[0_24px_60px_-42px_rgba(35,33,29,0.28)]"
      : "border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_76%,white)] text-[var(--color-muted)] shadow-[0_18px_44px_-38px_rgba(35,33,29,0.22)]";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[1.3rem] border px-4 py-3 text-[11px] uppercase tracking-[0.18em] backdrop-blur-[2px]",
        emphasisClasses,
        className,
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function BrainSilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-[7%] h-[86%] w-[86%] text-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))]"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M49.8 13.5c-7.3-4.7-17.5-3.1-23.4 3.7-6.9 0-12.6 5.9-12.6 13.2 0 2.8.8 5.4 2.3 7.6-4.1 2.5-6.7 7.1-6.7 12.1 0 6.1 3.9 11.4 9.5 13.2.2 8.8 7.1 15.8 15.7 15.8 3.7 0 7.2-1.3 9.9-3.6 1.6 5.6 6.7 9.8 12.8 9.8 6.2 0 11.5-4.4 12.9-10.1 2.8 2.5 6.5 3.9 10.4 3.9 8.8 0 15.9-7.2 15.9-16.1v-.2c5.1-2.2 8.7-7.3 8.7-13.3 0-5.2-2.7-9.9-7-12.4 1.5-2.1 2.3-4.7 2.3-7.5 0-7.3-5.8-13.2-12.9-13.2-5.9-6.5-15.9-8-23.1-3.3Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M49.5 17.5c-3.8 4.5-5.8 9.4-5.8 14.8 0 4.8 1.5 8.8 4.3 12.1-2.7 3.1-4.1 6.9-4.1 11.3 0 6.7 2.6 12.6 7.7 17.9"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M50.4 17.3c3.9 4.6 5.9 9.6 5.9 15 0 4.7-1.4 8.7-4.2 11.9 2.7 3.2 4.1 7 4.1 11.4 0 6.7-2.6 12.8-7.7 18.2"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesktopBlueprint() {
  return (
    <div className="relative hidden h-full w-full max-w-xl lg:block">
      <BrainSilhouette />

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        <path d="M50 18V30" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.35" />
        <path d="M50 42V54" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.35" />
        <path d="M50 67C46 70.4 38.8 74.2 28.5 77.5" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.35" strokeLinecap="round" />
        <path d="M50 67C54 70.4 61.2 74.2 71.5 77.5" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.35" strokeLinecap="round" />
        <path d="M28.5 81C34 84.8 40.8 87.4 47.5 89" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.35" strokeLinecap="round" />
        <path d="M71.5 81C66 84.8 59.2 87.4 52.5 89" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.35" strokeLinecap="round" />
      </svg>

      <HeroNodeCard
        label="Functional Evaluation"
        icon={<AssessmentIcon />}
        className="absolute left-1/2 top-[8%] w-[13.5rem] -translate-x-1/2"
      />

      <HeroNodeCard
        label="Brain Network Profile"
        icon={<NetworkIcon />}
        className="absolute left-1/2 top-[27%] w-[14.25rem] -translate-x-1/2"
      />

      <HeroNodeCard
        label="MNSI Core"
        icon={<CoreIcon />}
        emphasis="core"
        className="absolute left-1/2 top-[47%] min-h-[5.75rem] w-[14.5rem] -translate-x-1/2 justify-center text-center text-xs tracking-[0.22em]"
      />

      <HeroNodeCard
        label="Clinical Neuroscience"
        icon={<ClinicalIcon />}
        className="absolute left-[6%] top-[76%] w-[14rem]"
      />

      <HeroNodeCard
        label="NeuroPerformance"
        icon={<PerformanceIcon />}
        className="absolute right-[6%] top-[76%] w-[13.75rem]"
      />

      <HeroNodeCard
        label="Functional Outcomes"
        icon={<OutcomeIcon />}
        className="absolute bottom-[4%] left-1/2 w-[13.75rem] -translate-x-1/2"
      />
    </div>
  );
}

function MobileBlueprint() {
  return (
    <div className="relative flex w-full flex-col gap-4 lg:hidden">
      <div className="absolute inset-x-[10%] top-[3%] bottom-[6%] rounded-[44%] border border-dashed border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] opacity-60" />
      <div className="absolute left-1/2 top-[13%] bottom-[14%] w-px -translate-x-1/2 bg-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))]" />

      <HeroNodeCard label="Functional Evaluation" icon={<AssessmentIcon />} className="relative z-10" />
      <HeroNodeCard label="Brain Network Profile" icon={<NetworkIcon />} className="relative z-10" />
      <HeroNodeCard label="MNSI Core" icon={<CoreIcon />} emphasis="core" className="relative z-10 min-h-[4.75rem] justify-center" />
      <HeroNodeCard label="Clinical Neuroscience" icon={<ClinicalIcon />} className="relative z-10" />
      <HeroNodeCard label="NeuroPerformance" icon={<PerformanceIcon />} className="relative z-10" />
      <HeroNodeCard label="Functional Outcomes" icon={<OutcomeIcon />} className="relative z-10" />
    </div>
  );
}

export function HeroObjectPlaceholder({ className }: HeroObjectPlaceholderProps) {
  return (
    <div
      className={cn(
        "nsu-panel flex aspect-[4/5] w-full max-w-2xl items-center justify-center rounded-[2rem] border p-6 sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_72%,white)] p-6 sm:p-8">
        <DesktopBlueprint />
        <MobileBlueprint />
      </div>
    </div>
  );
}