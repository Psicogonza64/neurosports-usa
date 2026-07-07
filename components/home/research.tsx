export function Research() {
  return (
    <section className="border-b nsu-border" id="research">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10 lg:py-24">
        <div className="max-w-xl space-y-4">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
            Research
          </p>
          <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            Institutional space reserved for future publications and resources.
          </h2>
        </div>

        <div className="rounded-[2rem] border nsu-border bg-[color:color-mix(in_srgb,var(--color-primary)_5%,var(--panel))] p-6 sm:p-8 lg:p-10">
          <div className="flex min-h-72 flex-col justify-between gap-8 rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_48%,white)] p-6">
            <p className="max-w-lg text-sm leading-7 text-[var(--color-muted)]">
              Placeholder area for future publications, clinical resources, and
              research summaries.
            </p>
            <div>
              <a
                className="nsu-secondary-button inline-flex rounded-full border px-6 py-3 text-sm font-medium"
                href="#"
              >
                View Research
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}