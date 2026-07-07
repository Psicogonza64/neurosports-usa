import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type CalloutPanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "soft";
};

const toneClasses = {
  default:
    "border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))]",
  soft: "bg-[color:color-mix(in_srgb,var(--color-background)_62%,white)]",
};

export function CalloutPanel({
  children,
  className,
  tone = "default",
}: CalloutPanelProps) {
  return (
    <Card className={cn("rounded-[2rem] px-6 py-10 sm:px-10 lg:px-12", toneClasses[tone], className)}>
      {children}
    </Card>
  );
}