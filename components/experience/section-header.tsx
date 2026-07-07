import { cn } from "@/utils/cn";

import { experienceRhythm } from "@/components/experience/section-spacing";

type SectionHeaderProps = {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        experienceRhythm.headerStack,
        centered && "mx-auto text-center",
        className,
      )}
    >
      {label ? <p className={experienceRhythm.eyebrow}>{label}</p> : null}
      <h2 className={experienceRhythm.title}>{title}</h2>
      {subtitle ? <p className={experienceRhythm.body}>{subtitle}</p> : null}
    </div>
  );
}