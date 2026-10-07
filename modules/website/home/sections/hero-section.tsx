import Link from "next/link";

import { InteractiveBrain3D } from "@/components/diagrams/InteractiveBrain3D";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { twoPathsHeroContent } from "@/lib/neurosports-two-paths-content";
import { cn } from "@/utils/cn";

import styles from "./hero-section.module.css";

export function HeroSection() {
  const content = twoPathsHeroContent;

  return (
    <section id="hero" aria-labelledby="home-hero-title" className={cn("border-b nsu-border", styles.hero)}>
      <Container className="grid gap-10 py-10 sm:py-12 lg:py-14 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] xl:items-start xl:gap-8">
        <div className="min-w-0 space-y-7">
          <div className="space-y-5">
            <p className={cn("nsu-eyebrow", styles.eyebrow)}>{content.eyebrow}</p>
            <h1 id="home-hero-title" className="nsu-h1 max-w-2xl text-balance">
              {content.headline}{" "}
              <span className="text-[var(--ns-sage-dark)] underline decoration-[var(--ns-gold)] decoration-2 underline-offset-8">
                {content.headlineAccent}
              </span>
            </h1>
            <p className="nsu-body-lg max-w-2xl">{content.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.paths.map((path) => (
              <Link
                key={path.id}
                href={path.ctaHref}
                data-cta={path.ctaName}
                data-location="hero"
                aria-labelledby={`home-path-${path.id}`}
                aria-describedby={`home-path-description-${path.id}`}
                className={cn(
                  "group flex min-w-0 flex-col rounded-[1.4rem] border bg-[var(--ns-bone)] p-5 shadow-[var(--shadow-soft)] sm:p-6",
                  "transition-[transform,border-color,box-shadow] duration-200 motion-reduce:transition-none motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
                  styles.path,
                  path.id === "clinical-neuroscience"
                    ? "border-[color:color-mix(in_srgb,var(--ns-sage-dark)_55%,var(--ns-border))] hover:border-[var(--ns-sage-dark)]"
                    : "border-[color:color-mix(in_srgb,var(--ns-gold)_65%,var(--ns-border))] hover:border-[var(--ns-gold)]",
                )}
              >
                <span className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--ns-muted-text)]">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 w-6 rounded-full",
                      path.id === "clinical-neuroscience" ? "bg-[var(--ns-sage-dark)]" : "bg-[var(--ns-gold)]",
                    )}
                  />
                  PATH {path.number}
                </span>
                <h2 id={`home-path-${path.id}`} className="text-2xl leading-tight tracking-tight text-[var(--ns-charcoal)]">
                  {path.title}
                </h2>
                <p id={`home-path-description-${path.id}`} className="mt-4 text-sm leading-6 text-[var(--ns-muted-text)]">
                  {path.description}
                </p>
                <span className="mt-auto flex min-h-11 items-center justify-between gap-3 pt-6 text-sm font-semibold leading-6 text-[var(--ns-charcoal)]">
                  {path.ctaLabel}
                  <span aria-hidden="true" className="shrink-0 text-lg motion-safe:transition-transform motion-safe:group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-6 text-[var(--ns-muted-text)]">{content.guidance}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/schedule" dataCta="schedule-initial-evaluation" dataLocation="hero">
                Schedule Evaluation
              </Button>
              <Button href="/#home-contact" variant="secondary" className={styles.guidance}>
                Contact for guidance
              </Button>
            </div>
          </div>
        </div>

        <figure aria-labelledby="home-science-title" className="m-0 min-w-0 xl:self-center">
          <div className="mb-5 space-y-2">
            <h2 id="home-science-title" className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ns-charcoal)]">
              Functional Brain Science
            </h2>
            <p className="text-sm font-medium tracking-[0.08em] text-[var(--ns-charcoal)]">RSFN + MNSI</p>
          </div>
          <div className="relative h-56 overflow-hidden rounded-[1.4rem] bg-[#f6f0e4] sm:h-80 md:h-96 xl:aspect-square xl:h-auto">
            <InteractiveBrain3D activeNodeId={null} className="absolute inset-0" />
          </div>
          <figcaption className="mt-5 max-w-lg text-sm leading-6 text-[var(--ns-muted-text)]">
            One integrated scientific framework supporting clinical understanding and human performance.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}