"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";

import {
  getNeuroSportsHeroInteractiveContent,
  type HeroInteractiveLocale,
  type HeroInteractiveNode,
  type HeroInteractiveNodeId,
} from "@/lib/neurosports-hero-interactive-content";
import { cn } from "@/utils/cn";

type ScientificJourneyMode = "hero" | "section" | "compact";

type ScientificJourneyDiagramProps = {
  mode?: ScientificJourneyMode;
  locale?: HeroInteractiveLocale;
  className?: string;
};

type JourneyPathId =
  | "path-evaluation-rsfn"
  | "path-rsfn-mnsi"
  | "path-mnsi-clinical"
  | "path-mnsi-performance"
  | "path-clinical-outcomes"
  | "path-performance-outcomes";

const modeClasses: Record<ScientificJourneyMode, {
  frame: string;
  figure: string;
  detail: string;
  node: string;
}> = {
  hero: {
    frame: "rounded-[2rem] border p-5 md:p-6 lg:p-7",
    figure: "aspect-[4/5]",
    detail: "mt-4 min-h-[9rem]",
    node: "w-[9.5rem] text-[11px] lg:w-[11.6rem] lg:text-[11.5px] xl:w-[12.8rem] xl:text-[12px]",
  },
  section: {
    frame: "rounded-[1.75rem] border p-4 md:p-5 lg:p-6",
    figure: "aspect-[6/5]",
    detail: "mt-4 min-h-[8.5rem]",
    node: "w-[12rem] text-[11px] lg:w-[12.25rem]",
  },
  compact: {
    frame: "rounded-[1.25rem] border p-3 md:p-4",
    figure: "aspect-[5/4]",
    detail: "mt-3 min-h-[7.5rem]",
    node: "w-[10.2rem] text-[10.5px]",
  },
};

const desktopNodePositions: Record<HeroInteractiveNodeId, string> = {
  "functional-evaluation": "left-1/2 top-[7%] -translate-x-1/2",
  rsfn: "left-1/2 top-[24%] -translate-x-1/2",
  "mnsi-core": "left-1/2 top-[42%] -translate-x-1/2",
  "clinical-neuroscience": "left-[0.5%] top-[61%]",
  neuroperformance: "right-[0.5%] top-[61%]",
  "functional-outcomes": "left-1/2 top-[83%] -translate-x-1/2",
};

const relatedPaths: Record<HeroInteractiveNodeId, JourneyPathId[]> = {
  "functional-evaluation": ["path-evaluation-rsfn"],
  rsfn: ["path-evaluation-rsfn", "path-rsfn-mnsi"],
  "mnsi-core": ["path-rsfn-mnsi", "path-mnsi-clinical", "path-mnsi-performance"],
  "clinical-neuroscience": ["path-mnsi-clinical", "path-clinical-outcomes"],
  neuroperformance: ["path-mnsi-performance", "path-performance-outcomes"],
  "functional-outcomes": ["path-clinical-outcomes", "path-performance-outcomes"],
};

function BrainSilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full opacity-[0.08]"
      viewBox="0 0 120 120"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M60 18c-10 0-18 7-20 16-9 0-16 7-16 16 0 6 3 11 8 14-1 2-2 5-2 8 0 9 7 16 16 16h28c10 0 18-8 18-18 0-3-1-6-2-8 5-3 8-8 8-14 0-9-7-16-16-16-2-9-10-14-22-14z"
        stroke="var(--ns-sage-dark)"
        strokeWidth="1.6"
      />
      <path d="M60 30v56" stroke="var(--ns-sage-dark)" strokeWidth="1.2" />
      <path d="M42 44c5 0 9 4 9 9" stroke="var(--ns-sage-dark)" strokeWidth="1.2" />
      <path d="M78 44c-5 0-9 4-9 9" stroke="var(--ns-sage-dark)" strokeWidth="1.2" />
      <path d="M43 62c4 0 7 3 7 7" stroke="var(--ns-sage-dark)" strokeWidth="1.2" />
      <path d="M77 62c-4 0-7 3-7 7" stroke="var(--ns-sage-dark)" strokeWidth="1.2" />
    </svg>
  );
}

function ConnectorPaths({ activeNodeId }: { activeNodeId: HeroInteractiveNodeId | null }) {
  const activePathIds = activeNodeId ? relatedPaths[activeNodeId] : [];

  const pathClass = (pathId: JourneyPathId) =>
    cn(
      "ns-journey-path transition-[stroke,opacity] duration-220 ease-out motion-reduce:transition-none",
      activePathIds.includes(pathId)
        ? "stroke-[color:color-mix(in_srgb,var(--ns-sage-dark)_72%,var(--ns-gold))] opacity-100"
        : "stroke-[color:color-mix(in_srgb,var(--ns-sand)_48%,var(--ns-charcoal))] opacity-85",
    );

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-[6] h-full w-full"
      viewBox="0 0 100 100"
      fill="none"
      preserveAspectRatio="none"
    >
      <path id="path-evaluation-rsfn" d="M50 12.5V23.3" className={pathClass("path-evaluation-rsfn")} strokeWidth="0.92" strokeLinecap="round" />
      <path id="path-rsfn-mnsi" d="M50 29.4V40.2" className={pathClass("path-rsfn-mnsi")} strokeWidth="0.92" strokeLinecap="round" />
      <path id="path-mnsi-clinical" d="M49 47.8C43.8 54.2 38.6 59.3 30.8 65.2" className={pathClass("path-mnsi-clinical")} strokeWidth="0.92" strokeLinecap="round" />
      <path id="path-mnsi-performance" d="M51 47.8C56.2 54.2 61.4 59.3 69.2 65.2" className={pathClass("path-mnsi-performance")} strokeWidth="0.92" strokeLinecap="round" />
      <path id="path-clinical-outcomes" d="M30.8 70.8C38.8 78.2 45 82.2 50 84.8" className={pathClass("path-clinical-outcomes")} strokeWidth="0.92" strokeLinecap="round" />
      <path id="path-performance-outcomes" d="M69.2 70.8C61.2 78.2 55 82.2 50 84.8" className={pathClass("path-performance-outcomes")} strokeWidth="0.92" strokeLinecap="round" />
    </svg>
  );
}

function NodeButton({
  node,
  isActive,
  panelId,
  onClick,
  className,
}: {
  node: HeroInteractiveNode;
  isActive: boolean;
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
      aria-label={`${isActive ? "Collapse" : "Open"} details for ${node.title}`}
      className={cn(
        "min-h-11 rounded-[1rem] border px-4 py-2.5 text-center font-medium leading-tight text-[var(--ns-charcoal)]",
        "bg-[color:color-mix(in_srgb,var(--ns-bone)_90%,white)] shadow-[0_16px_34px_-28px_rgba(43,42,40,0.72)]",
        "transition-[border-color,transform,box-shadow,background-color] duration-200 ease-out motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--ns-gold)_52%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ns-ivory)]",
        isActive
          ? "border-[color:color-mix(in_srgb,var(--ns-gold)_74%,var(--ns-sage-dark))] bg-[color:color-mix(in_srgb,var(--ns-gold-soft)_46%,var(--ns-bone))] shadow-[0_18px_36px_-28px_rgba(43,42,40,0.78)]"
          : "border-[color:color-mix(in_srgb,var(--ns-sage-dark)_24%,var(--ns-border))] hover:border-[color:color-mix(in_srgb,var(--ns-sage-dark)_60%,var(--ns-border))] hover:bg-[color:color-mix(in_srgb,var(--ns-sage)_18%,var(--ns-bone))]",
        "hover:-translate-y-[1px] hover:shadow-[0_18px_36px_-28px_rgba(43,42,40,0.75)]",
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
      className="rounded-[1.2rem] border border-[var(--ns-border)] bg-[var(--ns-bone)] p-4 shadow-[0_20px_36px_-30px_rgba(43,42,40,0.6)] transition-all duration-200 motion-reduce:transition-none sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg text-[var(--ns-charcoal)]">{node.title}</h3>
          <p className="text-sm leading-7 text-[var(--ns-muted-text)]">{node.shortDescription}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--ns-border)] bg-[var(--ns-bone)] text-[var(--ns-sage-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--ns-gold)_52%,white)]"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="mt-4">
        <a
          href={node.learnMoreHref}
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--ns-gold)] bg-[var(--ns-gold)] px-5 py-2.5 text-sm font-medium text-[var(--ns-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--ns-gold)_62%,white)]"
        >
          {learnMoreLabel}
        </a>
      </div>
    </div>
  );
}

function MobileDiagram({
  nodes,
  activeNodeId,
  setActiveNodeId,
  closeLabel,
  learnMoreLabel,
}: {
  nodes: HeroInteractiveNode[];
  activeNodeId: HeroInteractiveNodeId | null;
  setActiveNodeId: Dispatch<SetStateAction<HeroInteractiveNodeId | null>>;
  closeLabel: string;
  learnMoreLabel: string;
}) {
  const activeNode = nodes.find((node) => node.id === activeNodeId) ?? null;

  return (
    <div className="md:hidden">
      <div className="ns-hero-enter rounded-[1.15rem] border border-[var(--ns-border)] bg-[color:color-mix(in_srgb,var(--ns-ivory)_82%,white)] p-3">
        <div className="relative mb-3 aspect-[6/5] overflow-hidden rounded-[0.9rem] border border-[var(--ns-border)] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--ns-sage)_26%,transparent),transparent_55%),linear-gradient(160deg,color-mix(in_srgb,var(--ns-ivory)_80%,white),color-mix(in_srgb,var(--ns-bone)_84%,white))]">
          <BrainSilhouette />
          {/* TODO: Replace SVG brain with final transparent anatomical asset during visual phase. */}
        </div>

        <div className="space-y-2">
          {nodes.map((node, index) => {
            const isActive = activeNodeId === node.id;
            return (
              <div key={node.id} className="rounded-[0.95rem] border border-[var(--ns-border)] bg-[var(--ns-bone)]">
                <NodeButton
                  node={node}
                  isActive={isActive}
                  panelId={`scientific-mobile-panel-${node.id}`}
                  onClick={() => setActiveNodeId((current) => (current === node.id ? null : node.id))}
                  className="w-full rounded-[0.95rem] border-0 text-left text-[12px]"
                />
                {index < nodes.length - 1 ? (
                  <p className="pb-2 text-center text-xs text-[var(--ns-sage-dark)]" aria-hidden="true">↓</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-3">
          {activeNode ? (
            <DetailPanel
              node={activeNode}
              panelId={`scientific-mobile-panel-${activeNode.id}`}
              closeLabel={closeLabel}
              learnMoreLabel={learnMoreLabel}
              onClose={() => setActiveNodeId(null)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ScientificJourneyDiagram({
  mode = "hero",
  locale = "en",
  className,
}: ScientificJourneyDiagramProps) {
  const content = getNeuroSportsHeroInteractiveContent(locale);
  const classes = modeClasses[mode];

  const [activeNodeId, setActiveNodeId] = useState<HeroInteractiveNodeId | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [pointerMotionEnabled, setPointerMotionEnabled] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      const canAnimate = !reduceMotionQuery.matches;
      setMotionEnabled(canAnimate);
      setPointerMotionEnabled(canAnimate && pointerQuery.matches);
    };

    update();
    reduceMotionQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);

    return () => {
      reduceMotionQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!motionEnabled || !rootRef.current) {
      return;
    }

    const root = rootRef.current;
    let frame = 0;

    const updateScrollVariable = () => {
      const offset = Math.max(-20, Math.min(20, window.scrollY * 0.035));
      root.style.setProperty("--rsfn-scroll", `${offset.toFixed(2)}px`);
      frame = 0;
    };

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateScrollVariable);
    };

    updateScrollVariable();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [motionEnabled]);

  useEffect(() => {
    if (!pointerMotionEnabled || !rootRef.current) {
      return;
    }

    const root = rootRef.current;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const applyPointerVars = () => {
      root.style.setProperty("--rsfn-cursor-x", `${nextX.toFixed(2)}px`);
      root.style.setProperty("--rsfn-cursor-y", `${nextY.toFixed(2)}px`);
      frame = 0;
    };

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      nextX = Math.max(-20, Math.min(20, x * 0.055));
      nextY = Math.max(-14, Math.min(14, y * 0.045));

      if (frame === 0) {
        frame = window.requestAnimationFrame(applyPointerVars);
      }
    };

    const onLeave = () => {
      nextX = 0;
      nextY = 0;

      if (frame === 0) {
        frame = window.requestAnimationFrame(applyPointerVars);
      }
    };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [pointerMotionEnabled]);

  return (
    <div
      ref={rootRef}
      className={cn("w-full", className)}
      style={{
        ["--rsfn-cursor-x" as string]: "0px",
        ["--rsfn-cursor-y" as string]: "0px",
        ["--rsfn-scroll" as string]: "0px",
      }}
    >
      <div className={cn("md:hidden", mode === "compact" ? "block" : "block")}>
        <MobileDiagram
          nodes={content.nodes}
          activeNodeId={activeNodeId}
          setActiveNodeId={setActiveNodeId}
          closeLabel={content.closeLabel}
          learnMoreLabel={content.learnMoreLabel}
        />
      </div>

      <div
        className={cn(
          "ns-hero-enter hidden border-[var(--ns-border)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--ns-ivory)_82%,white),color-mix(in_srgb,var(--ns-bone)_86%,white))] md:block",
          classes.frame,
        )}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[radial-gradient(circle_at_24%_30%,color-mix(in_srgb,var(--ns-sage)_22%,transparent),transparent_44%),radial-gradient(circle_at_76%_66%,color-mix(in_srgb,var(--ns-gold-soft)_20%,transparent),transparent_48%)] transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={motionEnabled ? {
              transform: "translate3d(calc(var(--rsfn-cursor-x) * 0.2), calc((var(--rsfn-cursor-y) + var(--rsfn-scroll)) * 0.16), 0)",
            } : undefined}
          />

          <div
            className={cn("relative w-full overflow-hidden rounded-[1.35rem] border border-[color:color-mix(in_srgb,var(--ns-sage-dark)_26%,var(--ns-border))] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--ns-bone)_45%,white),0_20px_36px_-30px_rgba(43,42,40,0.55)] transition-transform duration-500 ease-out motion-reduce:transition-none", classes.figure)}
            style={motionEnabled ? {
              transform: "translate3d(calc(var(--rsfn-cursor-x) * 0.07), calc((var(--rsfn-cursor-y) + var(--rsfn-scroll)) * 0.05), 0)",
            } : undefined}
          >
            <div
              className="absolute inset-0"
              style={motionEnabled ? {
                transform: "translate3d(calc(var(--rsfn-cursor-x) * -0.04), calc(var(--rsfn-cursor-y) * -0.03), 0)",
              } : undefined}
            >
              <BrainSilhouette />
            </div>
            {/* TODO: Replace SVG brain with final transparent anatomical asset during visual phase. */}
            <div
              style={motionEnabled ? {
                transform: "translate3d(calc(var(--rsfn-cursor-x) * 0.03), calc((var(--rsfn-cursor-y) + var(--rsfn-scroll)) * 0.03), 0)",
              } : undefined}
            >
              <ConnectorPaths activeNodeId={activeNodeId} />
            </div>

            <div className="absolute inset-0 z-20">
              {content.nodes.map((node) => (
                <NodeButton
                  key={node.id}
                  node={node}
                  isActive={activeNodeId === node.id}
                  panelId={`scientific-panel-${node.id}`}
                  onClick={() => setActiveNodeId((current) => (current === node.id ? null : node.id))}
                  className={cn("absolute", classes.node, desktopNodePositions[node.id])}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={classes.detail}>
          {activeNode ? (
            <div className="animate-[ns-fade-in_180ms_ease-out] motion-reduce:animate-none">
              <DetailPanel
                node={activeNode}
                panelId={`scientific-panel-${activeNode.id}`}
                closeLabel={content.closeLabel}
                learnMoreLabel={content.learnMoreLabel}
                onClose={() => setActiveNodeId(null)}
              />
            </div>
          ) : (
            <div className="flex h-full items-center rounded-[1rem] border border-[var(--ns-border)] bg-[var(--ns-bone)] px-4 text-sm leading-7 text-[var(--ns-muted-text)]">
              {content.promptLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
