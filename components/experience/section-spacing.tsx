import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export const experienceRhythm = {
  container: "mx-auto w-full max-w-7xl px-6 lg:px-10",
  section: "nsu-section-y",
  sectionCompact: "py-14 lg:py-18",
  sectionDense: "py-10 lg:py-14",
  headerStack: "space-y-4",
  title: "nsu-h2",
  heroTitle:
    "nsu-h1",
  body: "max-w-2xl nsu-body",
  heroBody: "max-w-2xl nsu-body-lg",
  eyebrow: "nsu-kicker nsu-eyebrow",
  cardGrid: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
  buttonGroup: "flex flex-col gap-3 sm:flex-row sm:items-center",
} as const;

type SectionSpacingProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "dense" | "compact" | "default";
};

const spacingBySize = {
  dense: experienceRhythm.sectionDense,
  compact: experienceRhythm.sectionCompact,
  default: experienceRhythm.section,
};

export function SectionSpacing({
  children,
  className,
  size = "default",
  ...props
}: SectionSpacingProps) {
  return (
    <div className={cn(spacingBySize[size], className)} {...props}>
      {children}
    </div>
  );
}