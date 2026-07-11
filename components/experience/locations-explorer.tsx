"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PublicLocationItem } from "@/lib/neurosports-public-content";
import { cn } from "@/utils/cn";

type LocationsExplorerProps = {
  items: PublicLocationItem[];
  className?: string;
  disclaimer: string;
};

export function LocationsExplorer({ items, className, disclaimer }: LocationsExplorerProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId, items],
  );

  return (
    <div className={cn("space-y-5", className)}>
      <div className="hidden gap-5 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="grid gap-4">
          {items.map((item) => {
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
                    ? "border-[color:color-mix(in_srgb,var(--color-primary)_24%,var(--color-border))]"
                    : "border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))]",
                )}
                aria-expanded={isActive}
                aria-controls={`location-panel-${item.id}`}
              >
                <div className="space-y-2">
                  <h3 className="text-lg tracking-[0.04em] text-[var(--color-foreground)]">{item.city}</h3>
                  <p className="text-sm leading-7 text-[var(--color-muted)]">{item.organization}</p>
                </div>
              </button>
            );
          })}
        </div>

        {activeItem ? (
          <Card className="p-0">
            {/* TODO: Replace with approved center photography. */}
            <div className="h-44 w-full border-b border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-background)_80%,white),color-mix(in_srgb,var(--color-background)_64%,white))]" />
            <div id={`location-panel-${activeItem.id}`} className="space-y-5 p-6 sm:p-7">
              <div className="space-y-2">
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{activeItem.city}</h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{activeItem.organization}</p>
              </div>
              <address className="space-y-1 text-sm not-italic leading-7 text-[var(--color-muted)] sm:text-base">
                {activeItem.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <div className="flex flex-wrap gap-3">
                <Button href={activeItem.viewHref}>
                  <span>{activeItem.viewLabel}</span>
                </Button>
                <Button href={activeItem.directionsHref} variant="secondary">
                  <span>{activeItem.directionsLabel}</span>
                </Button>
                <Button href={activeItem.contactHref} variant="secondary">
                  <span>{activeItem.contactLabel}</span>
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>

      <div className="grid gap-4 lg:hidden">
        {items.map((item) => {
          const isActive = item.id === activeItem?.id;

          return (
            <Card key={item.id} className="overflow-hidden p-0">
              <button
                type="button"
                onClick={() => setActiveId(isActive ? "" : item.id)}
                className="min-h-11 w-full px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)] focus-visible:ring-inset"
                aria-expanded={isActive}
                aria-controls={`mobile-location-panel-${item.id}`}
              >
                <div className="space-y-1">
                  <h3 className="text-lg tracking-[0.04em] text-[var(--color-foreground)]">{item.city}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{item.organization}</p>
                </div>
              </button>

              <div
                id={`mobile-location-panel-${item.id}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  {/* TODO: Replace with approved center photography. */}
                  <div className="h-36 w-full border-t border-b border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-background)_80%,white),color-mix(in_srgb,var(--color-background)_64%,white))]" />
                  <div className="space-y-4 px-5 py-5">
                    <address className="space-y-1 text-sm not-italic leading-7 text-[var(--color-muted)] sm:text-base">
                      {item.addressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </address>
                    <div className="flex flex-wrap gap-2.5">
                      <Button href={item.viewHref}>
                        <span>{item.viewLabel}</span>
                      </Button>
                      <Button href={item.directionsHref} variant="secondary">
                        <span>{item.directionsLabel}</span>
                      </Button>
                      <Button href={item.contactHref} variant="secondary">
                        <span>{item.contactLabel}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 sm:p-7">
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{disclaimer}</p>
      </Card>
    </div>
  );
}
