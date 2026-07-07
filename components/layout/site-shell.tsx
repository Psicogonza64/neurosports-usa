import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}