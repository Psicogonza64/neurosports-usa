"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_90%,white)]/96 shadow-[0_10px_26px_-24px_rgba(43,42,40,0.7)] backdrop-blur-md">
      <Container className="flex items-center justify-between gap-6 py-3.5 lg:py-4">
        <Link
          className="rounded-md px-1 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_42%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          href="/"
        >
          NeuroSports USA
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              className={[
                "rounded-full px-3 py-2 text-sm leading-none transition-colors duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_42%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                pathname === item.href
                  ? "bg-[color:color-mix(in_srgb,var(--color-secondary)_12%,white)] text-[var(--color-foreground)] shadow-[0_10px_20px_-20px_rgba(43,42,40,0.8)]"
                  : "text-[var(--color-muted)] hover:bg-[color:color-mix(in_srgb,var(--color-secondary)_10%,transparent)] hover:text-[var(--color-foreground)]",
              ].join(" ")}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="/schedule" size="sm" dataCta="schedule-initial-evaluation" dataLocation="header">
          Schedule Evaluation
        </Button>
      </Container>

      <nav aria-label="Mobile" className="border-t nsu-border lg:hidden">
        <Container className="flex gap-2 overflow-x-auto py-2.5 text-sm text-[var(--color-muted)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "whitespace-nowrap rounded-full px-3 py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_42%,white)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                pathname === item.href
                  ? "bg-[color:color-mix(in_srgb,var(--color-secondary)_12%,white)] text-[var(--color-foreground)]"
                  : "text-[var(--color-muted)]",
              ].join(" ")}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}