import { CalloutPanel } from "@/components/experience/callout-panel";
import { SectionHeader } from "@/components/experience/section-header";
import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

type TechnologyHighlightProps = {
  title: string;
  narrative: string;
  emphasis: string;
  className?: string;
};

export function TechnologyHighlight({
  title,
  narrative,
  emphasis,
  className,
}: TechnologyHighlightProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]", className)}>
      <SectionHeader label="Technology" title={title} subtitle={narrative} />
      <CalloutPanel>
        <div className="space-y-5">
          <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
            {neurosportsIdentity.platformStatement}
          </span>
          <p className="text-base leading-8 text-[var(--color-foreground)] sm:text-lg">
            {emphasis}
          </p>
        </div>
      </CalloutPanel>
    </div>
  );
}