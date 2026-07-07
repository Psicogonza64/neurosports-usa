import { Button } from "@/components/ui/button";
import { CalloutPanel } from "@/components/experience/callout-panel";
import { SectionHeader } from "@/components/experience/section-header";
import { cn } from "@/utils/cn";

type ScientificSectionProps = {
  title: string;
  narrative: string;
  highlightedParagraph: string;
  ctaLabel?: string;
  ctaHref?: string;
  label?: string;
  className?: string;
};

export function ScientificSection({
  title,
  narrative,
  highlightedParagraph,
  ctaLabel,
  ctaHref,
  label = "Scientific Section",
  className,
}: ScientificSectionProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]", className)}>
      <SectionHeader label={label} title={title} subtitle={narrative} />
      <CalloutPanel>
        <div className="space-y-6">
          <p className="text-base leading-8 text-[var(--color-foreground)] sm:text-lg">
            {highlightedParagraph}
          </p>
          {ctaLabel && ctaHref ? (
            <Button href={ctaHref} variant="secondary">
              <span>{ctaLabel}</span>
            </Button>
          ) : null}
        </div>
      </CalloutPanel>
    </div>
  );
}