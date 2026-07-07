import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_92%,white)]/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link
          className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-foreground)]"
          href="/"
        >
          NeuroSports USA
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              className="text-sm text-[var(--color-muted)]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="/contact" size="sm">
          Schedule Evaluation
        </Button>
      </Container>

      <nav aria-label="Mobile" className="border-t nsu-border lg:hidden">
        <Container className="flex gap-4 overflow-x-auto py-3 text-sm text-[var(--color-muted)]">
          {navigationItems.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}