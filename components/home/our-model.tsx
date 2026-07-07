const modelSteps = [
  "Evaluation",
  "Functional Diagnosis",
  "MNSI",
  "Neuromodulation",
  "Cognitive Training",
  "Functional Transfer",
  "Outcome Measurement",
];

export function OurModel() {
  return (
    <section className="border-b nsu-border" id="services">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-10 lg:py-24">
        <div className="max-w-xl space-y-4">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
            Our Model
          </p>
          <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            A clean vertical framework for the clinical experience.
          </h2>
          <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            Placeholder structure for the institutional model flow. Detailed
            explanations remain pending.
          </p>
        </div>

        <div className="rounded-[2rem] border nsu-border bg-[color:color-mix(in_srgb,var(--color-secondary)_6%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <ol className="space-y-4">
            {modelSteps.map((step, index) => (
              <li key={step} className="flex flex-col items-start gap-4">
                <div className="nsu-panel flex w-full items-center gap-4 rounded-[1.5rem] border px-5 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_28%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-sm text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <span className="text-lg text-[var(--color-foreground)]">{step}</span>
                </div>
                {index < modelSteps.length - 1 ? (
                  <span className="pl-5 text-lg text-[var(--color-secondary)]/70">↓</span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}