const technologyItems = [
  "Neuromodulation",
  "Digital Rehabilitation",
  "Advanced Assessment",
  "Brain Performance",
];

export function Technology() {
  return (
    <section className="border-b nsu-border" id="technology">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
            Technology
          </p>
          <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            A structured placeholder for future technology narratives.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {technologyItems.map((item) => (
            <article
              key={item}
              className="flex min-h-64 flex-col rounded-[1.75rem] border nsu-border bg-[color:color-mix(in_srgb,var(--color-secondary)_4%,var(--panel))] p-6"
            >
              <div className="flex h-28 items-center justify-center rounded-[1.25rem] border nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_45%,white)] text-sm text-[var(--color-muted)]">
                Placeholder
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{item}</h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  Placeholder copy reserved for future explanatory content.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}