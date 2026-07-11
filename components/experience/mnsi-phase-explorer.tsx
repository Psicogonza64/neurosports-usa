"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import type { HomeMnsiPhase } from "@/lib/neurosports-home-content";

type MnsiPhaseExplorerProps = {
  phases: HomeMnsiPhase[];
  className?: string;
};

export function MnsiPhaseExplorer({ phases, className }: MnsiPhaseExplorerProps) {
  const [activeId, setActiveId] = useState<HomeMnsiPhase["id"] | "">(
    phases[0]?.id ?? "",
  );

  const activePhase = useMemo(
    () => phases.find((phase) => phase.id === activeId) ?? phases[0],
    [phases, activeId],
  );

  return (
    <div className={cn("space-y-5", className)}>
      <div className="hidden gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="grid gap-4">
          {phases.map((phase, index) => {
            const isActive = phase.id === activePhase?.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActiveId((current) => (current === phase.id ? "" : phase.id))}
                aria-expanded={isActive}
                aria-controls={`mnsi-phase-panel-${phase.id}`}
                className={cn(
                  "min-h-11 rounded-[1.35rem] border bg-[var(--panel)] px-5 py-4 text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_38%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                  isActive
                    ? "border-[color:color-mix(in_srgb,var(--color-primary)_28%,var(--color-border))]"
                    : "border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-[10px] font-medium tracking-[0.12em] text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <h3 className="text-lg text-[var(--color-foreground)]">{phase.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {activePhase ? (
          <Card className="sticky top-24 p-6 sm:p-7">
            <div id={`mnsi-phase-panel-${activePhase.id}`} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">Selected phase</p>
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{activePhase.title}</h3>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{activePhase.summary}</p>
            </div>
          </Card>
        ) : null}
      </div>

      <div className="grid gap-4 lg:hidden">
        {phases.map((phase, index) => {
          const isActive = phase.id === activePhase?.id;
          return (
            <Card key={phase.id} className="overflow-hidden p-0">
              <button
                type="button"
                onClick={() => setActiveId((current) => (current === phase.id ? "" : phase.id))}
                aria-expanded={isActive}
                aria-controls={`mnsi-mobile-panel-${phase.id}`}
                className="min-h-11 w-full px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_38%,white)] focus-visible:ring-inset"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-[10px] font-medium tracking-[0.12em] text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <h3 className="text-base text-[var(--color-foreground)]">{phase.title}</h3>
                </div>
              </button>
              <div
                id={`mnsi-mobile-panel-${phase.id}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                    {phase.summary}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
