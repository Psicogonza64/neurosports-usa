const audienceCards = [
  "Children",
  "Adolescents",
  "Adults",
  "Older Adults",
  "Athletes",
];

export function WhoWeHelp() {
  return (
    <section className="border-b nsu-border" id="about">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
            Who We Help
          </p>
          <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            Audience structure for the home experience.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {audienceCards.map((title) => (
            <article
              key={title}
              className="nsu-panel flex min-h-80 flex-col rounded-[1.75rem] border p-5"
            >
              <div className="nsu-soft flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border nsu-border text-sm text-[var(--color-muted)]">
                Image Placeholder
              </div>
              <div className="mt-5 space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{title}</h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  Placeholder description for future audience-specific content.
                  Placeholder details continue here.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}