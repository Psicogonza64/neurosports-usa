type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  supportText?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  supportText,
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
        {eyebrow}
      </p>
      <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {description}
        </p>
      ) : null}
      {supportText ? (
        <p className="text-sm leading-6 text-[var(--color-secondary)]/80">{supportText}</p>
      ) : null}
    </div>
  );
}