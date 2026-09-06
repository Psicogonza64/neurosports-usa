"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";

import {
  getNeuroSportsHeroInteractiveContent,
  type HeroInteractiveLocale,
  type HeroInteractiveNode,
  type HeroInteractiveNodeId,
} from "@/lib/neurosports-hero-interactive-content";
import { InteractiveBrain3D } from "@/components/diagrams/InteractiveBrain3D";
import { cn } from "@/utils/cn";

type ScientificJourneyMode = "hero" | "section" | "compact";

type ScientificJourneyDiagramProps = {
  mode?: ScientificJourneyMode;
  locale?: HeroInteractiveLocale;
  className?: string;
};

const modeClasses: Record<ScientificJourneyMode, {
  frame: string;
  figure: string;
  detail: string;
  node: string;
}> = {
  hero: {
    frame: "border p-4 md:p-5 lg:p-6",
    figure: "aspect-square",
    detail: "mt-4 min-h-[9rem]",
    node: "w-28 text-[10px] lg:w-32 lg:text-[10.5px]",
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
  "functional-evaluation": "left-[2%] top-[13%]",
  rsfn: "right-[2%] top-[13%]",
  "mnsi-core": "left-1/2 top-[1.5%] -translate-x-1/2",
  "clinical-neuroscience": "left-[2%] bottom-[16%]",
  neuroperformance: "right-[2%] bottom-[16%]",
  "functional-outcomes": "bottom-[3%] left-1/2 -translate-x-1/2",
};

function NodeButton({
  node,
  isActive,
  panelId,
  onClick,
  onActivate,
  className,
}: {
  node: HeroInteractiveNode;
  isActive: boolean;
  panelId: string;
  onClick: () => void;
  onActivate: () => void;
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
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        "min-h-10 rounded-full border px-3 py-2 text-center font-medium leading-tight text-[var(--ns-charcoal)]",
        "bg-[color:color-mix(in_srgb,var(--ns-bone)_94%,white)] shadow-[0_12px_24px_-22px_rgba(43,42,40,0.68)]",
        "transition-[border-color,transform,box-shadow,background-color] duration-200 ease-out motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--ns-gold)_52%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ns-ivory)]",
        isActive
          ? "border-[color:color-mix(in_srgb,var(--ns-gold)_74%,var(--ns-sage-dark))] bg-[color:color-mix(in_srgb,var(--ns-gold-soft)_46%,var(--ns-bone))] shadow-[0_18px_36px_-28px_rgba(43,42,40,0.78)]"
          : "border-[color:color-mix(in_srgb,var(--ns-sage-dark)_24%,var(--ns-border))] hover:border-[color:color-mix(in_srgb,var(--ns-sage-dark)_60%,var(--ns-border))] hover:bg-[color:color-mix(in_srgb,var(--ns-sage)_18%,var(--ns-bone))]",
        "hover:-translate-y-[1px] hover:shadow-[0_16px_28px_-22px_rgba(43,42,40,0.72)]",
        className,
      )}
    >
      {node.id === "rsfn" ? (
        <>
          <span className="block">{node.title.replace(" (RSFN)", "")}</span>
          <span className="block">(RSFN)</span>
        </>
      ) : (
        node.title
      )}
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
      <ul className="mt-4 grid gap-2 border-t border-[var(--ns-border)] pt-4 text-sm leading-6 text-[var(--ns-charcoal)] sm:grid-cols-2">
        {node.details.map((detail) => (
          <li key={detail} className="flex gap-2">
            <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ns-gold)]" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
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
    <div className="min-[1200px]:hidden">
      <div className="ns-hero-enter border-t border-[var(--ns-border)] pt-2">
        <div className="mx-auto w-full max-w-[34rem]">
          {nodes.map((node, index) => {
            const isActive = activeNodeId === node.id;
            return (
              <div key={node.id} className="border-b border-[var(--ns-border)]">
                <NodeButton
                  node={node}
                  isActive={isActive}
                  panelId={`scientific-mobile-panel-${node.id}`}
                  onClick={() => setActiveNodeId(node.id)}
                  onActivate={() => setActiveNodeId(node.id)}
                  className="w-full rounded-none border-0 bg-transparent px-3 text-left text-[12px] shadow-none"
                />
                {index < nodes.length - 1 ? (
                  <p className="py-2 text-center text-sm leading-none text-[var(--ns-sage-dark)]" aria-hidden="true">↓</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-4 w-full max-w-[34rem]">
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
  const [wideLayout, setWideLayout] = useState(false);
  const [wideViewport, setWideViewport] = useState<boolean | null>(null);

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
    const stageId = new URLSearchParams(window.location.search).get("journeyState") as HeroInteractiveNodeId | null;
    if (!stageId || !content.nodes.some((node) => node.id === stageId)) return;
    const timer = window.setTimeout(() => setActiveNodeId(stageId), 0);
    return () => window.clearTimeout(timer);
  }, [content.nodes]);

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
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateLayout = () => {
      setWideLayout(root.clientWidth >= 760);
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1200px)");
    const update = () => setWideViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
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
      className={cn("w-full min-w-0", className)}
      style={{
        ["--rsfn-cursor-x" as string]: "0px",
        ["--rsfn-cursor-y" as string]: "0px",
        ["--rsfn-scroll" as string]: "0px",
      }}
    >
      <div className="mb-5 px-1 sm:mb-6">
        <h2 className="text-lg leading-tight text-[var(--ns-charcoal)] sm:text-xl">NeuroSports Scientific Journey</h2>
        <p className="mt-1.5 text-sm leading-6 text-[var(--ns-muted-text)]">From functional evaluation to measurable outcomes.</p>
      </div>

      {wideViewport !== true ? <div>
        <div className="relative mb-4 h-56 overflow-hidden rounded-[1rem] border border-[var(--ns-border)] bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--ns-sage)_20%,transparent),transparent_60%),color-mix(in_srgb,var(--ns-ivory)_78%,white)] sm:h-64 md:h-72">
          <InteractiveBrain3D activeNodeId={activeNodeId} className="absolute inset-0" />
        </div>
        {activeNodeId === "rsfn" ? <p className="mb-4 break-words text-xs leading-5 text-[var(--ns-muted-text)]">Conceptual functional-network visualization. Not patient-specific neuroimaging.</p> : null}
        <MobileDiagram
          nodes={content.nodes}
          activeNodeId={activeNodeId}
          setActiveNodeId={setActiveNodeId}
          closeLabel={content.closeLabel}
          learnMoreLabel={content.learnMoreLabel}
        />
      </div> : null}

      {wideViewport === true ? <div
        className={cn(
          "ns-hero-enter hidden min-[1200px]:block border-[var(--ns-border)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--ns-ivory)_82%,white),color-mix(in_srgb,var(--ns-bone)_86%,white))]",
          classes.frame,
        )}
      >
        <div
          className={cn(
            "relative",
            mode === "compact" || !wideLayout
              ? ""
              : "min-[1200px]:grid min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(15rem,0.72fr)] min-[1200px]:items-start min-[1200px]:gap-4",
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
            <InteractiveBrain3D activeNodeId={activeNodeId} className="pointer-events-auto absolute inset-0 z-[4]" />
            <div className="absolute inset-0 z-20">
              {content.nodes.map((node) => (
                <NodeButton
                  key={node.id}
                  node={node}
                  isActive={activeNodeId === node.id}
                  panelId={`scientific-panel-${node.id}`}
                  onClick={() => setActiveNodeId(node.id)}
                  onActivate={() => setActiveNodeId(node.id)}
                  className={cn("absolute", classes.node, desktopNodePositions[node.id])}
                />
              ))}
            </div>
          </div>
          </div>

        <div className={cn(classes.detail, mode === "compact" || !wideLayout ? "" : "min-[1200px]:mt-0")}>
          {activeNodeId === "rsfn" ? <p className="mb-3 text-xs leading-5 text-[var(--ns-muted-text)]">Conceptual functional-network visualization. Not patient-specific neuroimaging.</p> : null}
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
      </div> : null}
    </div>
  );
}
