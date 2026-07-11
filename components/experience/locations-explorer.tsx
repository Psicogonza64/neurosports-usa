"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  getNeuroSportsLocationsContent,
  type LocationCenter,
  type LocationsLocale,
} from "@/lib/neurosports-locations-content";
import { cn } from "@/utils/cn";

type LocationsExplorerProps = {
  locale?: LocationsLocale;
  className?: string;
};

function LocationImage({
  item,
  mobile = false,
}: {
  item: LocationCenter;
  mobile?: boolean;
}) {
  if (item.hasApprovedImage && item.imagePath) {
    return (
      <figure className="w-full max-w-full border-b border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))]">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={item.imagePath}
            alt={item.imageAlt ?? item.centerTitle}
            fill
            sizes={mobile ? "92vw" : "(min-width: 1024px) 40vw, 90vw"}
            className="object-cover"
          />
        </div>
        {item.imageCaption ? (
          <figcaption className={cn("text-sm leading-6 text-[var(--color-muted)]", mobile ? "px-4 py-3" : "px-6 py-3")}>
            {item.imageCaption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <>
      {item.id === "bogota" ? (
        <>
          {/* TODO: Add approved Bogotá center photography. */}
        </>
      ) : null}
      {item.id === "bucaramanga" ? (
        <>
          {/* TODO: Add approved Bucaramanga center photography. */}
        </>
      ) : null}
      <div className={cn("w-full max-w-full border-b border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-background)_80%,white),color-mix(in_srgb,var(--color-background)_64%,white))]", mobile ? "h-40" : "h-52")}>
        <div className="flex h-full items-center justify-center px-4 text-center text-sm leading-6 text-[var(--color-muted)]">
          <div>
            <p className="text-[var(--color-foreground)]">{item.centerTitle}</p>
            <p>{item.cityCountry}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function ExpandedLocationPanel({
  item,
  locale,
  onClose,
}: {
  item: LocationCenter;
  locale: LocationsLocale;
  onClose: () => void;
}) {
  const content = getNeuroSportsLocationsContent(locale);
  const directionsUrl = getGoogleMapsDirectionsUrl(item.mapQuery);
  const mapEmbedUrl = getGoogleMapsEmbedUrl(item.mapQuery);

  return (
    <Card className="min-w-0 w-full max-w-full overflow-hidden p-0">
      <LocationImage item={item} />

      <div id={`location-panel-${item.id}`} className="space-y-5 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{item.organization}</p>
            <h3 className="text-2xl tracking-tight text-[var(--color-foreground)]">{item.centerTitle}</h3>
            <p className="break-words text-sm text-[var(--color-muted)]">{item.cityCountry}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close center details"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-secondary)_22%,var(--color-border))] text-[var(--color-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_40%,white)]"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <address className="space-y-1 text-sm not-italic leading-7 text-[var(--color-muted)] sm:text-base">
          {item.addressLines.map((line) => (
            <p key={line} className="break-words">{line}</p>
          ))}
        </address>

        <div className="overflow-hidden rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))]">
          <div className="relative aspect-video min-h-[220px] md:min-h-[280px] w-full">
            <iframe
              title={item.mapTitle}
              src={mapEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3 text-sm font-medium leading-tight nsu-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_38%,white)]"
          >
            {content.labels.getDirections}
          </a>
          <Button
            href="/schedule"
            className="min-h-11"
            dataCta="schedule-evaluation"
            dataLocation={item.id === "houston" ? "houston-location" : undefined}
          >
            <span>{content.labels.scheduleEvaluation}</span>
          </Button>
        </div>

        {item.id === "houston" ? (
          <div className="rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_66%,white)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">Public Appointment Windows</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">8:00 AM-12:00 PM</p>
            <p className="text-sm leading-7 text-[var(--color-muted)]">2:00 PM-4:00 PM</p>
            <p className="text-sm leading-7 text-[var(--color-muted)]">Central Time</p>
            {/* TODO: Add officially confirmed Houston appointment days. */}
          </div>
        ) : null}

        <div className="rounded-[1rem] border border-[color:color-mix(in_srgb,var(--color-secondary)_12%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-background)_66%,white)] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{content.labels.centerGallery}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{content.labels.photographyComingSoon}</p>
        </div>
      </div>
    </Card>
  );
}

export function LocationsExplorer({ locale = "en", className }: LocationsExplorerProps) {
  const content = getNeuroSportsLocationsContent(locale);
  const centers = content.centers;
  const [activeId, setActiveId] = useState<LocationCenter["id"] | "">(
    centers[0]?.id ?? "houston",
  );
  const activeCenter = centers.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId("");
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className={cn("min-w-0 space-y-5", className)}>
      <div className="hidden lg:block">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {centers.map((item) => {
            const isActive = activeId === item.id;
            const directionsUrl = getGoogleMapsDirectionsUrl(item.mapQuery);

            return (
              <Card key={item.id} className="min-w-0 w-full max-w-full overflow-hidden p-0">
                <LocationImage item={item} />
                <div className="space-y-4 p-5">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{item.organization}</p>
                    <h3 className="text-xl text-[var(--color-foreground)]">{item.centerTitle}</h3>
                    <p className="break-words text-sm text-[var(--color-muted)]">{item.cityCountry}</p>
                    <p className="break-words text-sm leading-6 text-[var(--color-muted)]">{item.shortAddress}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveId((current) => (current === item.id ? "" : item.id))}
                      aria-expanded={isActive}
                      aria-controls={`location-panel-${item.id}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium leading-tight nsu-primary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]"
                    >
                      {content.labels.viewCenter}
                    </button>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium leading-tight nsu-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_38%,white)]"
                    >
                      {content.labels.getDirections}
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {activeCenter ? (
          <div className="mt-5">
            <ExpandedLocationPanel
              item={activeCenter}
              locale={locale}
              onClose={() => setActiveId("")}
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:hidden">
        {centers.map((item) => {
          const isActive = activeId === item.id;
          const directionsUrl = getGoogleMapsDirectionsUrl(item.mapQuery);

          return (
            <div key={item.id} className="min-w-0 w-full max-w-full space-y-3">
              <Card className="min-w-0 w-full max-w-full overflow-hidden p-0">
                <LocationImage item={item} mobile />
                <div className="space-y-4 p-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">{item.organization}</p>
                    <h3 className="text-lg text-[var(--color-foreground)]">{item.centerTitle}</h3>
                    <p className="break-words text-sm text-[var(--color-muted)]">{item.cityCountry}</p>
                    <p className="break-words text-sm leading-6 text-[var(--color-muted)]">{item.shortAddress}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveId((current) => (current === item.id ? "" : item.id))}
                      aria-expanded={isActive}
                      aria-controls={`mobile-location-panel-${item.id}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium leading-tight nsu-primary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_42%,white)]"
                    >
                      {content.labels.viewCenter}
                    </button>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium leading-tight nsu-secondary-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_38%,white)]"
                    >
                      {content.labels.getDirections}
                    </a>
                  </div>
                </div>
              </Card>

              {isActive ? (
                <div id={`mobile-location-panel-${item.id}`}>
                  <ExpandedLocationPanel
                    item={item}
                    locale={locale}
                    onClose={() => setActiveId("")}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <Card className="p-6 sm:p-7">
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">{content.legalNote}</p>
      </Card>
    </div>
  );
}
