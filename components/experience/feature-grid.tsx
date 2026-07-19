import { Button } from "@/components/ui/button";
import { ScientificCard } from "@/components/experience/scientific-card";
import { cn } from "@/utils/cn";

export type FeatureGridItem = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type FeatureGridProps = {
  items: FeatureGridItem[];
  className?: string;
};

export function FeatureGrid({ items, className }: FeatureGridProps) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((item) => (
        <ScientificCard key={item.title} interactive className="min-h-64 p-6 sm:p-7">
          <div className="flex h-full flex-col gap-4">
            <div className="nsu-gradient-line h-px w-16" />
            <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
              {item.title}
            </h3>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {item.description}
            </p>
            {item.ctaLabel && item.ctaHref ? (
              <Button href={item.ctaHref} variant="secondary" size="sm" className="mt-auto self-start">
                <span>{item.ctaLabel}</span>
              </Button>
            ) : null}
          </div>
        </ScientificCard>
      ))}
    </div>
  );
}