"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PublicProcessItem } from "@/lib/neurosports-public-content";
import { cn } from "@/utils/cn";

type ProcessExplorerProps = {
  items: PublicProcessItem[];
  mode?: "summary" | "interactive";
  className?: string;
  sequenceLabel?: string;
};

export function ProcessExplorer({
  items,
  mode = "interactive",
  className,
  sequenceLabel = "Scientific sequence",
}: ProcessExplorerProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [items, activeId],
  );

  if (mode === "summary") {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3", className)}>
        {items.map((item) => (
          <Card key={item.id} className="min-h-56 p-6 sm:p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{item.title}</h3>
                {item.category ? (
                  <span className="inline-flex rounded-full border nsu-outline-badge px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
                    {item.category}
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {item.shortDescription}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="hidden gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="grid gap-4">
          {items.map((item, index) => {
            const isActive = item.id === activeItem?.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "min-h-11 rounded-[1.4rem] border bg-[var(--panel)] p-5 text-left outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                  isActive
                    ? "border-[color:color-mix(in_srgb,var(--color-primary)_26%,var(--color-border))]"
                    : "border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))]",
                )}
                aria-expanded={isActive}
                aria-controls={`process-panel-${item.id}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-[10px] font-medium tracking-[0.12em] text-[var(--color-primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg text-[var(--color-foreground)]">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-[var(--color-muted)]">{item.shortDescription}</p>
                </div>
              </button>
            );
          })}
        </div>

        {activeItem ? (
          <Card className="sticky top-24 min-h-[23rem] border-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))] p-6 sm:p-7">
            <div
              id={`process-panel-${activeItem.id}`}
              className="space-y-5 transition-opacity duration-300 ease-out"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                {sequenceLabel}
              </p>
              <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{activeItem.title}</h3>
              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {activeItem.expandedDescription}
              </p>
              <Button href={activeItem.ctaHref}>
                <span>{activeItem.ctaLabel}</span>
              </Button>
            </div>
          </Card>
        ) : null}
      </div>

      <div className="grid gap-4 lg:hidden">
        {items.map((item, index) => {
          const isActive = item.id === activeItem?.id;

          return (
            <Card key={item.id} className="overflow-hidden p-0">
              <button
                type="button"
                onClick={() => setActiveId(isActive ? "" : item.id)}
                className={cn(
                  "min-h-11 w-full px-5 py-4 text-left outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)] focus-visible:ring-inset",
                )}
                aria-expanded={isActive}
                aria-controls={`mobile-process-panel-${item.id}`}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_10%,white)] text-[10px] font-medium tracking-[0.12em] text-[var(--color-primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg text-[var(--color-foreground)]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item.shortDescription}</p>
                  </div>
                </div>
              </button>

              <div
                id={`mobile-process-panel-${item.id}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-4 border-t border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {item.expandedDescription}
                    </p>
                    <Button href={item.ctaHref}>
                      <span>{item.ctaLabel}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
