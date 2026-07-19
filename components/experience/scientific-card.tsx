import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type ScientificCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function ScientificCard({
  children,
  className,
  interactive = false,
}: ScientificCardProps) {
  return (
    <Card
      className={cn(
        "nsu-scientific-card",
        interactive && "nsu-scientific-card-hover",
        className,
      )}
    >
      {children}
    </Card>
  );
}
