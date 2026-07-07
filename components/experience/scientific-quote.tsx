import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type ScientificQuoteProps = {
  quote: string;
  attribution?: string;
  className?: string;
};

export function ScientificQuote({
  quote,
  attribution,
  className,
}: ScientificQuoteProps) {
  return (
    <Card
      className={cn(
        "border-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_7%,var(--panel))] px-6 py-12 sm:px-10 lg:px-14",
        className,
      )}
    >
      <blockquote className="mx-auto max-w-4xl space-y-6 text-center">
        <p className="text-3xl leading-tight tracking-tight text-[var(--color-foreground)] sm:text-4xl lg:text-5xl">
          {quote}
        </p>
        {attribution ? (
          <footer className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]/80">
            {attribution}
          </footer>
        ) : null}
      </blockquote>
    </Card>
  );
}