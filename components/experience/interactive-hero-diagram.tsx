"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getNeuroSportsHeroInteractiveContent,
  type HeroInteractiveLocale,
  type HeroInteractiveNode,
  type HeroInteractiveNodeId,
} from "@/lib/neurosports-hero-interactive-content";
import { cn } from "@/utils/cn";

type InteractiveHeroDiagramProps = {
  locale?: HeroInteractiveLocale;
};

type JourneyPathId =
  | "path-evaluation-rsfn"
  | "path-rsfn-mnsi"
  | "path-mnsi-clinical"
  | "path-mnsi-performance"
  | "path-clinical-outcomes"
  | "path-performance-outcomes";

const desktopNodePositions: Record<HeroInteractiveNodeId, string> = {
  "functional-evaluation": "left-1/2 top-[8%] -translate-x-1/2",
  rsfn: "left-1/2 top-[25%] -translate-x-1/2",
  "mnsi-core": "left-1/2 top-[42%] -translate-x-1/2",
  "clinical-neuroscience": "left-[2%] top-[61%]",
  neuroperformance: "right-[2%] top-[61%]",
  "functional-outcomes": "left-1/2 top-[81%] -translate-x-1/2",
};

const relatedPaths: Record<HeroInteractiveNodeId, JourneyPathId[]> = {
  "functional-evaluation": ["path-evaluation-rsfn"],
  rsfn: ["path-evaluation-rsfn", "path-rsfn-mnsi"],
  "mnsi-core": ["path-rsfn-mnsi", "path-mnsi-clinical", "path-mnsi-performance"],
  "clinical-neuroscience": ["path-mnsi-clinical", "path-clinical-outcomes"],
  neuroperformance: ["path-mnsi-performance", "path-performance-outcomes"],
  "functional-outcomes": ["path-clinical-outcomes", "path-performance-outcomes"],
};

function ConnectorPaths({ activeNodeId }: { activeNodeId: HeroInteractiveNodeId | null }) {
  const activePathIds = activeNodeId ? relatedPaths[activeNodeId] : [];

  const pathClass = (pathId: JourneyPathId) =>
    cn(
      "transition-colors duration-200 ease-out motion-reduce:transition-none",
      activePathIds.includes(pathId)
        ? "stroke-[color:color-mix(in_srgb,var(--color-secondary)_55%,var(--color-primary))]"
        : "stroke-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))]",
    );

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-[14] h-full w-full"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        id="path-evaluation-rsfn"
        d="M50 13.5C50 18.4 50 21.3 50 25"
        className={pathClass("path-evaluation-rsfn")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        id="path-rsfn-mnsi"
        d="M50 30.6C50 34.5 50 38.1 50 41.5"
        className={pathClass("path-rsfn-mnsi")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        id="path-mnsi-clinical"
        d="M49 48.8C44.2 55.3 39.5 60.1 32.3 64.6"
        className={pathClass("path-mnsi-clinical")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        id="path-mnsi-performance"
        d="M51 48.8C55.8 55.3 60.5 60.1 67.7 64.6"
        className={pathClass("path-mnsi-performance")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        id="path-clinical-outcomes"
        d="M32.3 70.6C38.5 77.5 44.8 82.2 50 84.8"
        className={pathClass("path-clinical-outcomes")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
      <path
        id="path-performance-outcomes"
        d="M67.7 70.6C61.5 77.5 55.2 82.2 50 84.8"
        className={pathClass("path-performance-outcomes")}
        strokeWidth="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NodeButton({
  node,
  isActive,
  isStartNode,
  panelId,
  onClick,
  className,
}: {
  node: HeroInteractiveNode;
  isActive: boolean;
  isStartNode: boolean;
  panelId: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-expanded={isActive}
      aria-controls={panelId}
      className={cn(
        "min-h-11 min-w-11 rounded-[1rem] border px-3.5 py-2 text-center text-[11px] leading-tight tracking-[0.08em]",
        "cursor-pointer uppercase shadow-[0_16px_34px_-30px_rgba(35,33,29,0.32)]",
        "transition-[border-color,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_40%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        isActive
          ? "border-[color:color-mix(in_srgb,var(--color-primary)_32%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_70%,white)] text-[var(--color-foreground)]"
          : isStartNode
            ? "border-[color:color-mix(in_srgb,var(--color-secondary)_30%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_66%,white)] text-[var(--color-foreground)]"
            : "border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)] text-[var(--color-muted)]",
        "hover:-translate-y-[1px] hover:border-[color:color-mix(in_srgb,var(--color-secondary)_28%,var(--color-border))]",
        className,
      )}
    >
      {node.title}
    </button>
  );
}

function DetailPanel({
  node,
  panelId,
  closeLabel,
  learnMoreLabel,
  onClose,
}: {
  node: HeroInteractiveNode;
  panelId: string;
  closeLabel: string;
  learnMoreLabel: string;
  onClose: () => void;
}) {
  return (
    <div
      id={panelId}
      className="rounded-[1.2rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_17%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_74%,white)] p-4 shadow-[0_22px_42px_-34px_rgba(35,33,29,0.36)] sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-base text-[var(--color-foreground)] sm:text-lg">{node.title}</h3>
          <p className="text-sm leading-7 text-[var(--color-muted)]">{node.shortDescription}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_40%,white)]"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="mt-4">
        <a
          href={node.learnMoreHref}
          className="inline-flex min-h-11 items-center rounded-full border border-[color:color-mix(in_srgb,var(--color-primary)_34%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_8%,white)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_44%,white)]"
        >
          {learnMoreLabel}
        </a>
      </div>
    </div>
  );
}

export function InteractiveHeroDiagram({
  locale = "en",
}: InteractiveHeroDiagramProps) {
  const content = getNeuroSportsHeroInteractiveContent(locale);
  const [activeNodeId, setActiveNodeId] = useState<HeroInteractiveNodeId | null>(null);

  const activeNode = useMemo(
    () => content.nodes.find((node) => node.id === activeNodeId) ?? null,
    [content.nodes, activeNodeId],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNodeId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="w-full">
      <div className="hidden rounded-[1.85rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[linear-gradient(158deg,color-mix(in_srgb,var(--color-background)_76%,white),color-mix(in_srgb,var(--color-background)_62%,white))] p-4 md:block md:p-5 lg:p-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_32%_30%,color-mix(in_srgb,var(--color-secondary)_14%,transparent),transparent_46%),radial-gradient(circle_at_72%_68%,color-mix(in_srgb,var(--ns-sage)_24%,transparent),transparent_52%)]" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem]">
            {/* TODO: Insert final approved transparent NeuroSports USA brain asset during visual-assets phase. */}

            <ConnectorPaths activeNodeId={activeNodeId} />

            <div className="absolute inset-0 z-20">
              {content.nodes.map((node) => (
                <NodeButton
                  key={node.id}
                  node={node}
                  isActive={activeNodeId === node.id}
                  isStartNode={node.id === "functional-evaluation" && activeNodeId === null}
                  panelId={`hero-detail-${node.id}`}
                  onClick={() =>
                    setActiveNodeId((current) => (current === node.id ? null : node.id))
                  }
                  className={cn(
                    "absolute w-[10.8rem] text-[10px] md:w-[11.6rem] md:text-[10.5px] lg:w-[12.4rem]",
                    desktopNodePositions[node.id],
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 min-h-[10.8rem]">
          {activeNode ? (
            <DetailPanel
              node={activeNode}
              panelId={`hero-detail-${activeNode.id}`}
              closeLabel={content.closeLabel}
              learnMoreLabel={content.learnMoreLabel}
              onClose={() => setActiveNodeId(null)}
            />
          ) : (
            <div className="flex min-h-[10.8rem] items-center px-1 text-sm leading-7 text-[var(--color-muted)]">
              {content.promptLabel}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[1.85rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[linear-gradient(158deg,color-mix(in_srgb,var(--color-background)_76%,white),color-mix(in_srgb,var(--color-background)_62%,white))] p-4 md:hidden">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_10%,var(--color-border))] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--color-secondary)_12%,transparent),transparent_58%),linear-gradient(160deg,color-mix(in_srgb,var(--color-background)_82%,white),color-mix(in_srgb,var(--color-background)_64%,white))]">
          {/* TODO: Insert final approved transparent NeuroSports USA brain asset during visual-assets phase. */}
        </div>

        <div className="space-y-3">
          {content.nodes.map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <div key={node.id} className="rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_14%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_70%,white)]">
                <NodeButton
                  node={node}
                  isActive={isActive}
                  isStartNode={node.id === "functional-evaluation" && activeNodeId === null}
                  panelId={`hero-mobile-detail-${node.id}`}
                  onClick={() => setActiveNodeId((current) => (current === node.id ? null : node.id))}
                  className="w-full rounded-[1rem] border-0 px-4 py-3 text-left text-[11px]"
                />
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] px-4 py-4">
                      <DetailPanel
                        node={node}
                        panelId={`hero-mobile-detail-${node.id}`}
                        closeLabel={content.closeLabel}
                        learnMoreLabel={content.learnMoreLabel}
                        onClose={() => setActiveNodeId(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
