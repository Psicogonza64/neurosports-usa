import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type MNSIPhaseCardProps = {
  number: string;
  title: string;
  description: string;
  illustration?: ReactNode;
  className?: string;
};

function DefaultPhaseIllustration() {
  return (
    <div className="rounded-[1.4rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] p-5">
      <div className="space-y-3">
        <div className="h-px w-full bg-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))]" />
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]" />
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:color-mix(in_srgb,var(--color-secondary)_42%,white)]" />
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-primary)_18%,var(--color-border))]" />
        </div>
      </div>
    </div>
  );
}

export function MNSIPhaseCard({
  number,
  title,
  description,
  illustration,
  className,
}: MNSIPhaseCardProps) {
  return (
    <Card className={cn("min-h-72 p-6 sm:p-7", className)}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_25%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-xs font-medium tracking-[0.12em] text-[var(--color-primary)]">
            {number}
          </span>
          <div className="nsu-gradient-line h-px w-16" />
        </div>
        <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
          {title}
        </h3>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {description}
        </p>
        {illustration ?? <DefaultPhaseIllustration />}
      </div>
    </Card>
  );
}