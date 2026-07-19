import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/experience/section-header";
import { SectionSpacing } from "@/components/experience/section-spacing";
import { cn } from "@/utils/cn";

type ScientificSectionBlockProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  content: ReactNode;
  cta?: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: "dense" | "compact" | "default";
};

export function ScientificSectionBlock({
  id,
  label,
  title,
  description,
  content,
  cta,
  className,
  contentClassName,
  size = "default",
}: ScientificSectionBlockProps) {
  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container>
        <SectionSpacing size={size}>
          <div className="nsu-section-stack">
            <SectionHeader label={label} title={title} subtitle={description} />
            <div className={cn(contentClassName)}>{content}</div>
            {cta ? <div>{cta}</div> : null}
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}
