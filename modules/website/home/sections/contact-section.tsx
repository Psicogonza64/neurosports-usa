import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export function ContactSection() {
  return (
    <section className="border-b nsu-border scroll-mt-28" id="contact">
      <Container className="py-16 lg:py-20">
        <Card className="border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] bg-[linear-gradient(148deg,color-mix(in_srgb,var(--color-background)_86%,white),color-mix(in_srgb,var(--ns-sand)_22%,white))] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl space-y-5">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">CONTACT</p>
            <h2 className="text-3xl tracking-tight text-[var(--color-foreground)] sm:text-4xl">Contact NeuroSports USA</h2>
            <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              For appointment guidance and scheduling support, contact the NeuroSports USA Houston team.
            </p>

            <div className="space-y-1 text-sm leading-7 text-[var(--color-foreground)] sm:text-base">
              <p className="font-medium">NeuroSports USA Houston Center</p>
              <p>11777 Katy Freeway, Suite 410S, Houston, Texas 77079</p>
            </div>

            <div className="pt-1">
              <Button href="/schedule" dataCta="schedule-initial-evaluation" dataLocation="home-contact-section">
                Schedule Evaluation
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}