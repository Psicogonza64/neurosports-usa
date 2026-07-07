import { Card } from "@/components/ui/card";
import {
  neurosportsDualPath,
  neurosportsIdentity,
} from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

export type DualPathBranch = {
  label: string;
  title: string;
  description: string;
};

type DualPathProps = {
  root?: DualPathBranch;
  branches?: [DualPathBranch, DualPathBranch];
  className?: string;
};

const defaultRoot: DualPathBranch = {
  label: neurosportsDualPath[0].label,
  title: neurosportsDualPath[0].title,
  description: neurosportsDualPath[0].description,
};

const defaultBranches: [DualPathBranch, DualPathBranch] = [
  {
    label: neurosportsDualPath[1].label,
    title: neurosportsDualPath[1].title,
    description: neurosportsDualPath[1].description,
  },
  {
    label: neurosportsDualPath[2].label,
    title: neurosportsDualPath[2].title,
    description: neurosportsDualPath[2].description,
  },
];

export function DualPath({
  root = defaultRoot,
  branches = defaultBranches,
  className,
}: DualPathProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <Card className="w-full max-w-xl p-6 text-center sm:p-8">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
            {root.label}
          </span>
          <h3 className="text-2xl tracking-tight text-[var(--color-foreground)] sm:text-3xl">
            {root.title}
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {root.description}
          </p>
        </div>
      </Card>

      <div className="relative flex h-10 items-center justify-center">
        <span className="absolute h-full w-px bg-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))]" />
        <span className="relative z-10 inline-flex h-3 w-3 rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_12%,white)]" />
      </div>

      <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-8">
        {branches.map((branch) => (
          <Card key={branch.label} className="relative p-6 sm:p-8">
            <div className="absolute left-1/2 top-0 hidden h-8 w-px -translate-y-full bg-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))] lg:block" />
            <div className="space-y-3">
              <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                {branch.label}
              </span>
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                {branch.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {branch.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]/80">
        {neurosportsIdentity.oneScience} · {neurosportsIdentity.oneModel} · {neurosportsIdentity.twoWorlds}
      </p>
    </div>
  );
}