import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  bookingPageContent,
  houstonBookingConfig,
  type BookingLocale,
} from "@/lib/neurosports-booking-config";

export const metadata: Metadata = {
  title: "Schedule a Functional Evaluation | NeuroSports USA Houston",
  description:
    "Schedule a functional neuropsychological or NeuroPerformance evaluation at the NeuroSports USA Houston Center.",
};

function formatWindow(value: string, locale: BookingLocale) {
  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  if (locale === "es") {
    const periodEs = period === "AM" ? "a. m." : "p. m.";
    return `${hour12}:${String(minutes).padStart(2, "0")} ${periodEs}`;
  }

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function SchedulePageContent({ locale = "en" }: { locale?: BookingLocale }) {
  const content = bookingPageContent[locale] ?? bookingPageContent.en;
  const hasBookingUrl = Boolean(houstonBookingConfig.bookingUrl);

  return (
    <section className="border-b nsu-border" id="schedule">
      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4">
            <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl tracking-tight text-[var(--color-foreground)] sm:text-5xl">
              {content.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {content.intro}
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                  {content.centerLabel}
                </p>
                <p className="text-xl text-[var(--color-foreground)]">{content.centerName}</p>
              </div>

              <address className="space-y-1 text-sm not-italic leading-7 text-[var(--color-muted)] sm:text-base">
                {houstonBookingConfig.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
                  {content.windowsLabel}
                </p>
                <ul className="space-y-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {houstonBookingConfig.availabilityWindows.map((window) => (
                    <li key={`${window.start}-${window.end}`}>
                      {formatWindow(window.start, locale)}-{formatWindow(window.end, locale)}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                <span className="text-[var(--color-foreground)]">{content.timezoneLabel}: </span>
                {content.timezoneValue}
              </p>

              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.schedulingNote}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {hasBookingUrl ? (
                  <a
                    href={houstonBookingConfig.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="schedule-evaluation"
                    data-location="schedule"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium leading-tight text-[var(--ns-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_46%,white)]"
                  >
                    <span>{content.primaryLabel}</span>
                    <span className="ml-2 text-[10px] uppercase tracking-[0.08em] opacity-85">
                      {content.primaryOpensInNewTab}
                    </span>
                  </a>
                ) : (
                  <>
                    <p className="w-full text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {content.fallbackMessage}
                    </p>
                    <Button href="/contact" dataCta="schedule-evaluation" dataLocation="schedule-fallback">
                      <span>{content.fallbackActionLabel}</span>
                    </Button>
                  </>
                )}

                <Button href={content.secondaryHref} variant="secondary">
                  <span>{content.secondaryLabel}</span>
                </Button>
              </div>

              <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {content.trustNote}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default function ScheduleRoute() {
  return (
    <SiteShell>
      <SchedulePageContent locale="en" />
    </SiteShell>
  );
}
