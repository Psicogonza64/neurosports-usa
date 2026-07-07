import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { audiences } from "@/modules/website/home/data";

export function WhoWeHelpSection() {
  return (
    <section className="border-b nsu-border" id="who-we-help">
      <Container className="py-24 lg:py-28">
        <SectionTitle
          eyebrow="Who We Help"
          title="Care pathways prepared for children, adults, families, and athletes."
          description="The platform is designed to guide distinct audiences through a structured and readable experience without fragmenting the institutional voice."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {audiences.map((item) => (
            <Card key={item.title} className="flex min-h-80 flex-col p-5">
              <div className="nsu-soft flex aspect-[4/3] items-center justify-center rounded-[1.25rem] border nsu-border text-sm text-[var(--color-muted)]">
                Audience Placeholder
              </div>
              <div className="mt-5 space-y-3">
                <h3 className="text-xl text-[var(--color-foreground)]">{item.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}