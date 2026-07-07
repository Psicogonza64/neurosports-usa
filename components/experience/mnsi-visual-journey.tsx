import { neurosportsIdentity } from "@/lib/neurosports-identity";
import { cn } from "@/utils/cn";

export type MNSIJourneyStage = {
  title: string;
};

export type MNSICorePhase = {
  id: string;
  title: string;
};

export type MNSIJourneyBranch = {
  title: string;
  items: string[];
};

type MNSIVisualJourneyProps = {
  className?: string;
  stages?: MNSIJourneyStage[];
  coreLabel?: string;
  corePhases?: MNSICorePhase[];
  leftBranch?: MNSIJourneyBranch;
  rightBranch?: MNSIJourneyBranch;
};

const defaultStages: MNSIJourneyStage[] = [
  { title: "Functional Evaluation" },
  { title: "Brain Network Profile" },
  { title: "MNSI Core" },
  { title: "Sequential Intervention" },
  { title: "Functional Transfer" },
  { title: "Outcomes" },
];

const defaultCorePhases: MNSICorePhase[] = [
  { id: "1", title: "Regulation" },
  { id: "2", title: "Neuromodulation" },
  { id: "3", title: "Digital Training" },
  { id: "4", title: "Analog Integration" },
  { id: "5", title: "Sensorimotor Consolidation" },
  { id: "6", title: "Functional Transfer" },
];

const defaultLeftBranch: MNSIJourneyBranch = {
  title: neurosportsIdentity.clinicalNeuroscience,
  items: [
    "Children",
    "Adults",
    "Neurological Disorders",
    "Psychiatric Conditions",
    "Brain Rehabilitation",
  ],
};

const defaultRightBranch: MNSIJourneyBranch = {
  title: neurosportsIdentity.neuroPerformance,
  items: [
    "Soccer",
    "Basketball",
    "Baseball",
    "Tennis",
    "Elite Athletes",
    "Decision Making",
    "Reaction Time",
  ],
};

const palette = {
  foreground: "var(--color-foreground)",
  muted: "var(--color-muted)",
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  border: "var(--color-border)",
  panel: "var(--panel)",
  background: "var(--color-background)",
};

function DesktopJourney({
  stages,
  coreLabel,
  corePhases,
  leftBranch,
  rightBranch,
}: Required<Omit<MNSIVisualJourneyProps, "className">>) {
  const stageStartX = 118;
  const stageStep = 238;
  const stageY = 124;
  const stageWidth = 172;
  const stageHeight = 62;
  const coreX = 256;
  const coreY = 246;
  const coreWidth = 928;
  const coreHeight = 190;
  const branchY = 610;
  const branchWidth = 402;
  const branchHeight = 220;
  const leftBranchX = 162;
  const rightBranchX = 876;

  return (
    <svg
      aria-label="MNSI visual journey"
      className="hidden w-full lg:block"
      viewBox="0 0 1440 900"
      role="img"
    >
      <defs>
        <linearGradient id="mnsi-stage-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--color-primary) 18%, transparent)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-secondary) 18%, transparent)" />
        </linearGradient>
        <linearGradient id="mnsi-core-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-primary) 18%, var(--color-border))" />
        </linearGradient>
      </defs>

      <rect
        x="20"
        y="20"
        width="1400"
        height="860"
        rx="40"
        fill="color-mix(in srgb, var(--color-background) 76%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 8%, var(--color-border))"
      />

      <text
        x="720"
        y="70"
        fill={palette.secondary}
        fontSize="13"
        letterSpacing="3.8"
        textAnchor="middle"
      >
        OFFICIAL NEUROSPORTS JOURNEY
      </text>

      {stages.map((stage, index) => {
        const x = stageStartX + index * stageStep;
        const textX = x + stageWidth / 2;
        const centerX = x + stageWidth / 2;
        const nextX = x + stageStep;

        return (
          <g key={stage.title}>
            <rect
              x={x}
              y={stageY}
              width={stageWidth}
              height={stageHeight}
              rx="31"
              fill="color-mix(in srgb, var(--panel) 86%, white)"
              stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
            />
            <text
              x={textX}
              y={stageY + 28}
              fill={palette.foreground}
              fontSize="15"
              fontWeight="500"
              textAnchor="middle"
            >
              {stage.title}
            </text>

            {index < stages.length - 1 ? (
              <g>
                <line
                  x1={centerX + stageWidth / 2}
                  y1={stageY + stageHeight / 2}
                  x2={nextX - 34}
                  y2={stageY + stageHeight / 2}
                  stroke="url(#mnsi-stage-line)"
                  strokeWidth="1.5"
                />
                <circle
                  cx={nextX - 34}
                  cy={stageY + stageHeight / 2}
                  r="4"
                  fill="color-mix(in srgb, var(--color-primary) 30%, white)"
                  stroke="color-mix(in srgb, var(--color-primary) 22%, var(--color-border))"
                />
              </g>
            ) : null}
          </g>
        );
      })}

      <line
        x1="720"
        y1="186"
        x2="720"
        y2="246"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />
      <circle
        cx="720"
        cy="216"
        r="5"
        fill="color-mix(in srgb, var(--color-secondary) 22%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))"
      />

      <rect
        x={coreX}
        y={coreY}
        width={coreWidth}
        height={coreHeight}
        rx="34"
        fill="color-mix(in srgb, var(--panel) 82%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />
      <text
        x="720"
        y="286"
        fill={palette.secondary}
        fontSize="13"
        letterSpacing="3.2"
        textAnchor="middle"
      >
        {coreLabel}
      </text>

      <line
        x1="358"
        y1="346"
        x2="1082"
        y2="346"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />

      {corePhases.map((phase, index) => {
        const nodeX = 374 + index * 142;
        return (
          <g key={phase.id}>
            <circle
              cx={nodeX}
              cy="346"
              r="16"
              fill="color-mix(in srgb, var(--color-primary) 10%, white)"
              stroke="color-mix(in srgb, var(--color-primary) 22%, var(--color-border))"
            />
            <text
              x={nodeX}
              y="351"
              fill={palette.primary}
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              {phase.id}
            </text>
            <text
              x={nodeX}
              y="386"
              fill={palette.foreground}
              fontSize="12"
              textAnchor="middle"
            >
              {phase.title}
            </text>
          </g>
        );
      })}

      <line
        x1="720"
        y1="436"
        x2="720"
        y2="520"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />
      <circle
        cx="720"
        cy="478"
        r="5"
        fill="color-mix(in srgb, var(--color-primary) 24%, white)"
        stroke="color-mix(in srgb, var(--color-primary) 20%, var(--color-border))"
      />
      <line
        x1="720"
        y1="520"
        x2="363"
        y2="520"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />
      <line
        x1="720"
        y1="520"
        x2="1077"
        y2="520"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />
      <line
        x1="363"
        y1="520"
        x2="363"
        y2="610"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />
      <line
        x1="1077"
        y1="520"
        x2="1077"
        y2="610"
        stroke="url(#mnsi-core-line)"
        strokeWidth="1.5"
      />

      <rect
        x={leftBranchX}
        y={branchY}
        width={branchWidth}
        height={branchHeight}
        rx="28"
        fill="color-mix(in srgb, var(--panel) 84%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />
      <rect
        x={rightBranchX}
        y={branchY}
        width={branchWidth}
        height={branchHeight}
        rx="28"
        fill="color-mix(in srgb, var(--panel) 84%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />

      <text x="196" y="660" fill={palette.secondary} fontSize="12" letterSpacing="3">
        {leftBranch.title}
      </text>
      <text x="910" y="660" fill={palette.secondary} fontSize="12" letterSpacing="3">
        {rightBranch.title}
      </text>

      {leftBranch.items.map((item, index) => {
        const y = 700 + index * 24;
        return (
          <g key={item}>
            <circle
              cx="198"
              cy={y - 5}
              r="3"
              fill="color-mix(in srgb, var(--color-primary) 30%, white)"
            />
            <text x="214" y={y} fill={palette.muted} fontSize="15">
              {item}
            </text>
          </g>
        );
      })}

      {rightBranch.items.map((item, index) => {
        const y = 700 + index * 24;
        return (
          <g key={item}>
            <circle
              cx="912"
              cy={y - 5}
              r="3"
              fill="color-mix(in srgb, var(--color-secondary) 30%, white)"
            />
            <text x="928" y={y} fill={palette.muted} fontSize="15">
              {item}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MobileJourney({
  stages,
  coreLabel,
  corePhases,
  leftBranch,
  rightBranch,
}: Required<Omit<MNSIVisualJourneyProps, "className">>) {
  const stageStartY = 72;
  const stageStep = 90;
  const stageX = 52;
  const stageWidth = 336;
  const stageHeight = 54;
  const coreX = 30;
  const coreY = 620;
  const coreWidth = 380;
  const coreHeight = 430;

  return (
    <svg
      aria-label="MNSI visual journey mobile"
      className="w-full lg:hidden"
      viewBox="0 0 440 1520"
      role="img"
    >
      <defs>
        <linearGradient id="mnsi-mobile-line" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--color-primary) 18%, transparent)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-secondary) 18%, transparent)" />
        </linearGradient>
      </defs>

      <rect
        x="8"
        y="8"
        width="424"
        height="1504"
        rx="32"
        fill="color-mix(in srgb, var(--color-background) 76%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 8%, var(--color-border))"
      />

      <text
        x="220"
        y="42"
        fill={palette.secondary}
        fontSize="11"
        letterSpacing="3.2"
        textAnchor="middle"
      >
        OFFICIAL NEUROSPORTS JOURNEY
      </text>

      {stages.map((stage, index) => {
        const y = stageStartY + index * stageStep;
        const centerY = y + stageHeight / 2;

        return (
          <g key={stage.title}>
            <rect
              x={stageX}
              y={y}
              width={stageWidth}
              height={stageHeight}
              rx="27"
              fill="color-mix(in srgb, var(--panel) 86%, white)"
              stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
            />
            <text
              x="220"
              y={y + 32}
              fill={palette.foreground}
              fontSize="14"
              fontWeight="500"
              textAnchor="middle"
            >
              {stage.title}
            </text>

            {index < stages.length - 1 ? (
              <g>
                <line
                  x1="220"
                  y1={centerY + stageHeight / 2}
                  x2="220"
                  y2={y + stageStep - 18}
                  stroke="url(#mnsi-mobile-line)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="220"
                  cy={y + stageStep - 18}
                  r="4"
                  fill="color-mix(in srgb, var(--color-primary) 30%, white)"
                  stroke="color-mix(in srgb, var(--color-primary) 22%, var(--color-border))"
                />
              </g>
            ) : null}
          </g>
        );
      })}

      <rect
        x={coreX}
        y={coreY}
        width={coreWidth}
        height={coreHeight}
        rx="30"
        fill="color-mix(in srgb, var(--panel) 82%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />
      <text
        x="220"
        y="664"
        fill={palette.secondary}
        fontSize="12"
        letterSpacing="3.2"
        textAnchor="middle"
      >
        {coreLabel}
      </text>

      {corePhases.map((phase, index) => {
        const y = 712 + index * 52;
        return (
          <g key={phase.id}>
            <line
              x1="86"
              y1={y}
              x2="354"
              y2={y}
              stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
              strokeWidth="1.2"
            />
            <circle
              cx="106"
              cy={y}
              r="15"
              fill="color-mix(in srgb, var(--color-primary) 10%, white)"
              stroke="color-mix(in srgb, var(--color-primary) 22%, var(--color-border))"
            />
            <text
              x="106"
              y={y + 4}
              fill={palette.primary}
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
            >
              {phase.id}
            </text>
            <text x="134" y={y + 5} fill={palette.foreground} fontSize="13">
              {phase.title}
            </text>
          </g>
        );
      })}

      <line
        x1="220"
        y1="1050"
        x2="220"
        y2="1116"
        stroke="url(#mnsi-mobile-line)"
        strokeWidth="1.5"
      />
      <circle
        cx="220"
        cy="1084"
        r="4"
        fill="color-mix(in srgb, var(--color-secondary) 22%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 18%, var(--color-border))"
      />

      <rect
        x="30"
        y="1116"
        width="380"
        height="176"
        rx="28"
        fill="color-mix(in srgb, var(--panel) 84%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />
      <rect
        x="30"
        y="1312"
        width="380"
        height="176"
        rx="28"
        fill="color-mix(in srgb, var(--panel) 84%, white)"
        stroke="color-mix(in srgb, var(--color-secondary) 12%, var(--color-border))"
      />

      <text x="56" y="1154" fill={palette.secondary} fontSize="11" letterSpacing="3">
        {leftBranch.title}
      </text>
      {leftBranch.items.map((item, index) => {
        const y = 1188 + index * 24;
        return (
          <g key={item}>
            <circle cx="58" cy={y - 4} r="3" fill="color-mix(in srgb, var(--color-primary) 30%, white)" />
            <text x="72" y={y} fill={palette.muted} fontSize="14">
              {item}
            </text>
          </g>
        );
      })}

      <text x="56" y="1350" fill={palette.secondary} fontSize="11" letterSpacing="3">
        {rightBranch.title}
      </text>
      {rightBranch.items.map((item, index) => {
        const y = 1384 + index * 24;
        return (
          <g key={item}>
            <circle cx="58" cy={y - 4} r="3" fill="color-mix(in srgb, var(--color-secondary) 30%, white)" />
            <text x="72" y={y} fill={palette.muted} fontSize="14">
              {item}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function MNSIVisualJourney({
  className,
  stages = defaultStages,
  coreLabel = neurosportsIdentity.mnsi,
  corePhases = defaultCorePhases,
  leftBranch = defaultLeftBranch,
  rightBranch = defaultRightBranch,
}: MNSIVisualJourneyProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[2rem] border nsu-panel p-3 sm:p-4 lg:p-5",
        className,
      )}
    >
      <DesktopJourney
        stages={stages}
        coreLabel={coreLabel}
        corePhases={corePhases}
        leftBranch={leftBranch}
        rightBranch={rightBranch}
      />
      <MobileJourney
        stages={stages}
        coreLabel={coreLabel}
        corePhases={corePhases}
        leftBranch={leftBranch}
        rightBranch={rightBranch}
      />
    </div>
  );
}