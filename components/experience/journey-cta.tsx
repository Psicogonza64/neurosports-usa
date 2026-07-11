import { Button } from "@/components/ui/button";
import { CalloutPanel } from "@/components/experience/callout-panel";
import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

type JourneyCtaProps = {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  ctaDataLocation?: string;
  className?: string;
};

export function JourneyCTA({
  title,
  text,
  ctaLabel,
  ctaHref,
  ctaDataLocation,
  className,
}: JourneyCtaProps) {
  return (
    <CalloutPanel className={cn("text-center", className)}>
      <div className="mx-auto max-w-3xl space-y-7">
        <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
          {neurosportsIdentity.platformStatement}
        </p>
        <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          {title}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {text}
        </p>
        <Button
          href={ctaHref}
          className="mx-auto"
          dataCta="schedule-evaluation"
          dataLocation={ctaDataLocation}
        >
          <span>{ctaLabel}</span>
        </Button>
      </div>
    </CalloutPanel>
  );
}