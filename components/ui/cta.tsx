import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

type CtaProps = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  buttonHref: string;
};

export function CTA({ eyebrow, title, buttonLabel, buttonHref }: CtaProps) {
  return (
    <section className="border-b nsu-border" id="appointments">
      <Container className="py-20 lg:py-24">
        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_24%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_8%,var(--panel))] px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
              {eyebrow}
            </p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">
              {title}
            </h2>
            <Button href={buttonHref}>{buttonLabel}</Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}