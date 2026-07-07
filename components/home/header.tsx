const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b nsu-border bg-[color:color-mix(in_srgb,var(--color-background)_90%,white)]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <a className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-foreground)]" href="#home">
          NeuroSports USA
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              className="text-sm text-[var(--color-muted)]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="nsu-primary-button rounded-full border px-5 py-2.5 text-sm font-medium"
          href="#appointments"
        >
          Schedule Evaluation
        </a>
      </div>

      <nav aria-label="Mobile" className="border-t nsu-border lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl gap-4 overflow-x-auto px-6 py-3 text-sm text-[var(--color-muted)]">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}