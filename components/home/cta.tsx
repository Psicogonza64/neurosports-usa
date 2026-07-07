export function CTA() {
  return (
    <section className="border-b nsu-border" id="appointments">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="rounded-[2rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))] px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
              Call to Action
            </p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
              Schedule a future evaluation pathway placeholder.
            </h2>
            <a
              className="nsu-primary-button inline-flex rounded-full border px-6 py-3 text-sm font-medium"
              href="#contact"
            >
              Schedule Evaluation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}