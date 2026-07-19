import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScientificCard } from "@/components/experience/scientific-card";
import { SectionHeader } from "@/components/experience/section-header";
import { SectionSpacing } from "@/components/experience/section-spacing";
import { cn } from "@/utils/cn";

export type ProprietaryMethodItem = {
  id: string;
  method: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type ProprietaryMethodsSectionProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  methods: ProprietaryMethodItem[];
  cta?: ReactNode;
  className?: string;
};

export function ProprietaryMethodsSection({
  id,
  label,
  title,
  description,
  methods,
  cta,
  className,
}: ProprietaryMethodsSectionProps) {
  return (
    <section className={cn("border-b nsu-border", className)} id={id}>
      <Container>
        <SectionSpacing>
          <div className="nsu-section-stack">
            <SectionHeader label={label} title={title} subtitle={description} />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {methods.map((item) => (
                <ScientificCard key={item.id} interactive className="nsu-content-stack min-h-72 p-6 sm:p-7">
                  <span className="inline-flex w-fit rounded-full border nsu-outline-badge px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]">
                    {item.method}
                  </span>
                  <h3 className="nsu-h3">{item.title}</h3>
                  <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {item.description}
                  </p>
                  {item.ctaHref && item.ctaLabel ? (
                    <Button href={item.ctaHref} variant="secondary" size="sm" className="mt-auto self-start">
                      <span>{item.ctaLabel}</span>
                    </Button>
                  ) : null}
                </ScientificCard>
              ))}
            </div>

            {cta ? <div>{cta}</div> : null}
          </div>
        </SectionSpacing>
      </Container>
    </section>
  );
}
