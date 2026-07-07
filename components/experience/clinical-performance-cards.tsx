import { Card } from "@/components/ui/card";
import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

export type ClinicalPerformanceCardContent = {
  label: string;
  title: string;
  description: string;
};

type ClinicalPerformanceCardsProps = {
  clinical?: ClinicalPerformanceCardContent;
  performance?: ClinicalPerformanceCardContent;
  className?: string;
};

const defaultClinical: ClinicalPerformanceCardContent = {
  label: neurosportsIdentity.clinicalNeuroscience,
  title: "Clinical application of the MNSI platform",
  description:
    "Evaluation, rehabilitation and functional care are structured through the same scientific logic that governs the broader platform.",
};

const defaultPerformance: ClinicalPerformanceCardContent = {
  label: neurosportsIdentity.neuroPerformance,
  title: "Performance application of the MNSI platform",
  description:
    "Athlete-focused cognitive preparation and transfer emerge from the same model rather than from a separate business line.",
};

function ApplicationCard({ content }: { content: ClinicalPerformanceCardContent }) {
  return (
    <Card className="min-h-72 p-6 sm:p-8">
      <div className="space-y-4">
        <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
          {content.label}
        </span>
        <div className="nsu-gradient-line h-px w-20" />
        <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
          {content.title}
        </h3>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {content.description}
        </p>
      </div>
    </Card>
  );
}

export function ClinicalPerformanceCards({
  clinical = defaultClinical,
  performance = defaultPerformance,
  className,
}: ClinicalPerformanceCardsProps) {
  return (
    <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
      <ApplicationCard content={clinical} />
      <ApplicationCard content={performance} />
    </div>
  );
}