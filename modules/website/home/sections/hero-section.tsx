import { NeuroHero } from "@/components/experience";

function HeroVisual() {
  return (
    <div className="nsu-panel flex aspect-[4/5] w-full max-w-2xl flex-col justify-between rounded-[2rem] border p-8 sm:p-10 lg:p-12">
      <span className="nsu-kicker text-xs font-medium uppercase tracking-[0.24em]">
        Future Brain Visualization
      </span>
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[44%] border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_72%,white)] px-8 text-center text-sm leading-6 text-[var(--color-muted)]">
          <div className="absolute inset-[8%] rounded-[45%] border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute inset-[16%] rounded-[40%] border border-[color:color-mix(in_srgb,var(--color-primary)_16%,var(--color-border))]" />
          <div className="absolute left-[24%] top-[30%] h-px w-[22%] bg-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))]" />
          <div className="absolute right-[24%] top-[34%] h-px w-[20%] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />
          <div className="absolute left-[32%] bottom-[32%] h-px w-[26%] rotate-[-14deg] bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
          <div className="absolute right-[30%] bottom-[28%] h-px w-[18%] rotate-[20deg] bg-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))]" />
          <div className="absolute left-[23%] top-[29%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_48%,white)]" />
          <div className="absolute left-[46%] top-[29%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_45%,white)]" />
          <div className="absolute right-[24%] top-[33%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]" />
          <div className="absolute left-[38%] bottom-[30%] h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_45%,white)]" />
          <div className="absolute right-[35%] bottom-[27%] h-1.5 w-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_40%,white)]" />

          <span className="relative z-10 max-w-[12rem] rounded-full border border-[color:color-mix(in_srgb,var(--color-border)_80%,white)] bg-[color:color-mix(in_srgb,var(--color-background)_64%,white)] px-4 py-2">
            Future Brain Visualization
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <NeuroHero
      id="home"
      eyebrow="NeuroSports USA"
      title="Understanding the Brain. Transforming Lives."
      subtitle="One Science. One Model. Two Worlds. Clinical Neuroscience and NeuroPerformance integrated through MNSI."
      ctaLabel="Schedule Evaluation"
      ctaHref="#appointments"
      secondaryCtaLabel="Explore Our Model"
      secondaryCtaHref="#model"
      illustration={<HeroVisual />}
    />
  );
}