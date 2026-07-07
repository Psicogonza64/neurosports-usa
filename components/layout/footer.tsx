import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-[color:color-mix(in_srgb,var(--color-background)_85%,white)]" id="contact">
      <Container className="flex flex-col gap-4 py-10 text-sm text-[var(--color-muted)]">
        <span className="font-medium uppercase tracking-[0.22em] text-[var(--color-secondary)]">
          NeuroSports USA
        </span>
        <span>Premium institutional neuropsychology platform in active development.</span>
      </Container>
    </footer>
  );
}