import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { whatWeDoItems } from "@/modules/website/home/data";

export function WhatWeDoSection() {
  return (
    <section className="border-b nsu-border" id="about">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="What We Do"
          title="An institutional platform built to connect clinical care, rehabilitation, and brain performance."
          description="NeuroSports USA is being structured as a premium neuropsychology platform where assessment, treatment, technology, and human performance can operate as one coherent system."
          supportText="Base institucional para atencion clinica, rehabilitacion cerebral y rendimiento neurocognitivo."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {whatWeDoItems.map((item) => (
            <Card key={item.title} className="min-h-72 p-7">
              <div className="space-y-5">
                <div className="nsu-gradient-line h-px w-20" />
                <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}