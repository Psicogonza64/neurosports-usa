import { cn } from "@/utils/cn";

type HeroObjectPlaceholderProps = {
  className?: string;
};

const clinicalItems = [
  "Children",
  "Adults",
  "Neurological Disorders",
  "Psychiatric Conditions",
  "Brain Rehabilitation",
];

const performanceItems = [
  "Soccer",
  "Basketball",
  "Baseball",
  "Tennis",
  "Elite Athletes",
  "Decision Making",
  "Reaction Time",
];

type NeuralNodeProps = {
  title: string;
  subtitle?: string;
  className?: string;
  emphasis?: "default" | "core" | "outcome";
};

function NeuralNode({
  title,
  subtitle,
  className,
  emphasis = "default",
}: NeuralNodeProps) {
  const baseClasses =
    "rounded-[999px] border px-4 py-2 text-center uppercase tracking-[0.17em] backdrop-blur-[10px]";

  const emphasisClasses =
    emphasis === "core"
      ? "border-[color:color-mix(in_srgb,var(--color-primary)_30%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_68%,white)] text-[11px] text-[var(--color-foreground)] shadow-[0_26px_60px_-46px_rgba(35,33,29,0.3)]"
      : emphasis === "outcome"
        ? "border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] text-[10px] text-[var(--color-foreground)] shadow-[0_24px_58px_-44px_rgba(35,33,29,0.24)]"
        : "border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] text-[10px] text-[var(--color-muted)] shadow-[0_18px_48px_-40px_rgba(35,33,29,0.2)]";

  return (
    <div className={cn(baseClasses, emphasisClasses, className)}>
      <p className="leading-tight">{title}</p>
      {subtitle ? (
        <p className="mt-1 whitespace-pre-line text-[9px] normal-case tracking-[0.01em] text-[var(--color-muted)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type HemisphereProps = {
  side: "left" | "right";
};

function Hemisphere({ side }: HemisphereProps) {
  const isLeft = side === "left";
  const title = isLeft ? "Clinical Neuroscience" : "NeuroPerformance";
  const items = isLeft ? clinicalItems : performanceItems;

  return (
    <div
      className={cn(
        "absolute top-[52%] z-20 flex w-[34%] flex-col gap-2 rounded-[1.6rem] border px-4 py-3 text-center backdrop-blur-[10px]",
        "border-[color:color-mix(in_srgb,var(--color-secondary)_15%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_52%,white)]",
        isLeft ? "left-[9%]" : "right-[9%]",
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-foreground)]">
        {title}
      </p>
      <ul className="space-y-1 text-[9px] leading-relaxed text-[var(--color-muted)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function BrainSilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 z-10 h-[80%] w-[78%] -translate-x-1/2 -translate-y-1/2 text-[color:color-mix(in_srgb,var(--color-secondary)_13%,var(--color-border))]"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M49.8 13.5c-7.3-4.7-17.5-3.1-23.4 3.7-6.9 0-12.6 5.9-12.6 13.2 0 2.8.8 5.4 2.3 7.6-4.1 2.5-6.7 7.1-6.7 12.1 0 6.1 3.9 11.4 9.5 13.2.2 8.8 7.1 15.8 15.7 15.8 3.7 0 7.2-1.3 9.9-3.6 1.6 5.6 6.7 9.8 12.8 9.8 6.2 0 11.5-4.4 12.9-10.1 2.8 2.5 6.5 3.9 10.4 3.9 8.8 0 15.9-7.2 15.9-16.1v-.2c5.1-2.2 8.7-7.3 8.7-13.3 0-5.2-2.7-9.9-7-12.4 1.5-2.1 2.3-4.7 2.3-7.5 0-7.3-5.8-13.2-12.9-13.2-5.9-6.5-15.9-8-23.1-3.3Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M49.5 17.5c-3.8 4.5-5.8 9.4-5.8 14.8 0 4.8 1.5 8.8 4.3 12.1-2.7 3.1-4.1 6.9-4.1 11.3 0 6.7 2.6 12.6 7.7 17.9"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M50.4 17.3c3.9 4.6 5.9 9.6 5.9 15 0 4.7-1.4 8.7-4.2 11.9 2.7 3.2 4.1 7 4.1 11.4 0 6.7-2.6 12.8-7.7 18.2"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesktopBlueprint() {
  return (
    <div className="relative hidden h-full w-full max-w-2xl lg:block">
      <BrainSilhouette />

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        <path d="M50 14V22.5" stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))" strokeWidth="0.26" />
        <path d="M50 30V39" stroke="color-mix(in srgb, var(--color-primary) 17%, var(--color-border))" strokeWidth="0.26" />
        <path d="M50 47V55" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.26" />
        <path d="M50 55C45.2 58.9 40 62.7 33.6 67" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.26" strokeLinecap="round" />
        <path d="M50 55C54.8 58.9 60 62.7 66.4 67" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.26" strokeLinecap="round" />
        <path d="M33.6 74.5C39.4 79.6 45.3 83.1 50 85" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.26" strokeLinecap="round" />
        <path d="M66.4 74.5C60.6 79.6 54.7 83.1 50 85" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.26" strokeLinecap="round" />
      </svg>

      <NeuralNode
        title="Functional Evaluation"
        className="absolute left-1/2 top-[10%] z-20 w-[13.5rem] -translate-x-1/2"
      />

      <NeuralNode
        title="Functional Brain Networks (RSFN)"
        className="absolute left-1/2 top-[28%] z-20 w-[15.2rem] -translate-x-1/2"
      />

      <NeuralNode
        title="MNSI Core"
        subtitle="Multimodal NeuroSequential Integration"
        emphasis="core"
        className="absolute left-1/2 top-[42%] z-30 min-h-[4.8rem] w-[14.2rem] -translate-x-1/2"
      />

      <Hemisphere side="left" />
      <Hemisphere side="right" />

      <NeuralNode
        title="Functional Outcomes"
        subtitle="Better Brain\nBetter Performance\nBetter Life"
        emphasis="outcome"
        className="absolute bottom-[7%] left-1/2 z-20 w-[13.2rem] -translate-x-1/2"
      />
    </div>
  );
}

function TabletBlueprint() {
  return (
    <div className="relative hidden h-full w-full md:block lg:hidden">
      <BrainSilhouette />

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        <path d="M50 14V23" stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))" strokeWidth="0.28" />
        <path d="M50 32V40" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.28" />
        <path d="M50 48V56" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.28" />
        <path d="M50 56C45.5 60.5 39.5 64.2 33 68" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.28" strokeLinecap="round" />
        <path d="M50 56C54.5 60.5 60.5 64.2 67 68" stroke="color-mix(in srgb, var(--color-secondary) 16%, var(--color-border))" strokeWidth="0.28" strokeLinecap="round" />
        <path d="M33 73.5C38.2 78.2 44.5 82.2 50 84.5" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.28" strokeLinecap="round" />
        <path d="M67 73.5C61.8 78.2 55.5 82.2 50 84.5" stroke="color-mix(in srgb, var(--color-primary) 16%, var(--color-border))" strokeWidth="0.28" strokeLinecap="round" />
      </svg>

      <NeuralNode title="Functional Evaluation" className="absolute left-1/2 top-[10%] z-20 w-[12.4rem] -translate-x-1/2" />
      <NeuralNode title="Functional Brain Networks (RSFN)" className="absolute left-1/2 top-[29%] z-20 w-[13.8rem] -translate-x-1/2" />
      <NeuralNode
        title="MNSI Core"
        subtitle="Multimodal NeuroSequential Integration"
        emphasis="core"
        className="absolute left-1/2 top-[43%] z-30 w-[13.4rem] -translate-x-1/2"
      />

      <div className="absolute left-[11%] top-[63%] z-20 rounded-[999px] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_56%,white)] px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[var(--color-foreground)] backdrop-blur-[10px]">
        Clinical Neuroscience
      </div>
      <div className="absolute right-[11%] top-[63%] z-20 rounded-[999px] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_56%,white)] px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[var(--color-foreground)] backdrop-blur-[10px]">
        NeuroPerformance
      </div>

      <NeuralNode
        title="Functional Outcomes"
        subtitle="Better Brain\nBetter Performance\nBetter Life"
        emphasis="outcome"
        className="absolute bottom-[8%] left-1/2 z-20 w-[12.8rem] -translate-x-1/2"
      />
    </div>
  );
}

function MobileBlueprint() {
  return (
    <div className="relative flex w-full flex-col gap-4 md:hidden">
      <div className="absolute left-1/2 top-[10%] bottom-[8%] w-px -translate-x-1/2 bg-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))]" />

      <NeuralNode title="Functional Evaluation" className="relative z-20" />
      <NeuralNode title="Functional Brain Networks (RSFN)" className="relative z-20" />
      <NeuralNode
        title="MNSI Core"
        subtitle="Multimodal NeuroSequential Integration"
        emphasis="core"
        className="relative z-20"
      />

      <div className="relative z-20 rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] px-4 py-3 text-center backdrop-blur-[10px]">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-foreground)]">Clinical Neuroscience</p>
        <p className="mt-2 text-[9px] leading-relaxed text-[var(--color-muted)]">
          Children · Adults · Neurological Disorders · Psychiatric Conditions · Brain Rehabilitation
        </p>
      </div>

      <div className="relative z-20 rounded-[1.25rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_58%,white)] px-4 py-3 text-center backdrop-blur-[10px]">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-foreground)]">NeuroPerformance</p>
        <p className="mt-2 text-[9px] leading-relaxed text-[var(--color-muted)]">
          Soccer · Basketball · Baseball · Tennis · Elite Athletes · Decision Making · Reaction Time
        </p>
      </div>

      <NeuralNode
        title="Functional Outcomes"
        subtitle="Better Brain\nBetter Performance\nBetter Life"
        emphasis="outcome"
        className="relative z-20"
      />
    </div>
  );
}

export function HeroObjectPlaceholder({ className }: HeroObjectPlaceholderProps) {
  return (
    <div
      className={cn(
        "nsu-panel flex aspect-[4/5] w-full max-w-2xl items-center justify-center rounded-[2rem] border p-5 sm:p-7 lg:p-10",
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.9rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-background)_78%,white),color-mix(in_srgb,var(--color-background)_66%,white))] p-4 sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_45%),radial-gradient(circle_at_72%_72%,color-mix(in_srgb,var(--color-secondary)_9%,transparent),transparent_50%)]" />
        <DesktopBlueprint />
        <TabletBlueprint />
        <MobileBlueprint />
      </div>
    </div>
  );
}