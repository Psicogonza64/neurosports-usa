import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

export const experienceRhythm = {
  container: "mx-auto w-full max-w-7xl px-6 lg:px-10",
  section: "py-24 lg:py-28",
  sectionCompact: "py-16 lg:py-20",
  sectionDense: "py-12 lg:py-16",
  headerStack: "space-y-4",
  title: "text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl lg:text-5xl",
  heroTitle:
    "text-5xl leading-[0.94] tracking-[-0.03em] text-[var(--color-foreground)] sm:text-6xl lg:text-7xl",
  body: "max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base",
  heroBody: "max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg",
  eyebrow: "nsu-kicker text-xs font-medium uppercase tracking-[0.26em]",
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