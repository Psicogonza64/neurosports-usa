import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";

export function TestimonialsSection() {
  return (
    <section className="border-b nsu-border" id="testimonials">
      <Container className="py-20 lg:py-24">
        <SectionTitle
          eyebrow="Testimonials"
          title="A reserved placeholder for future patient and institutional trust signals."
          description="This section remains intentionally generic until approved testimonials, outcomes, or institutional references are available for publication."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="min-h-56 p-6">
              <div className="flex h-full flex-col justify-between gap-6 text-[var(--color-muted)]">
                <div className="nsu-soft rounded-[1.25rem] border nsu-border px-4 py-8 text-sm">
                  Testimonial placeholder
                </div>
                <span className="text-sm">Future approved source</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}