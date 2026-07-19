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
      <p className="nsu-kicker nsu-eyebrow">
        {eyebrow}
      </p>
      <h2 className="nsu-h2">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl nsu-body">
          {description}
        </p>
      ) : null}
      {supportText ? (
        <p className="text-sm leading-7 text-[var(--color-secondary)]/80">{supportText}</p>
      ) : null}
    </div>
  );
}