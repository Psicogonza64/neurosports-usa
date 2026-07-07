import { CalloutPanel } from "@/components/experience/callout-panel";
import { SectionHeader } from "@/components/experience/section-header";
import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

type ResearchHighlightProps = {
  title: string;
  narrative: string;
  finding: string;
  className?: string;
};

export function ResearchHighlight({
  title,
  narrative,
  finding,
  className,
}: ResearchHighlightProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]", className)}>
      <SectionHeader label="Research" title={title} subtitle={narrative} />
      <CalloutPanel tone="soft">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
            {neurosportsIdentity.oneScience}
          </span>
          <p className="text-base leading-8 text-[var(--color-foreground)] sm:text-lg">
            {finding}
          </p>
        </div>
      </CalloutPanel>
    </div>
  );
}