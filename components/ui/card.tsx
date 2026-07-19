import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article className={cn("nsu-panel nsu-card", className)}>
      {children}
    </article>
  );
}