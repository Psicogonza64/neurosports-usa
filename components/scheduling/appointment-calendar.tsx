"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";

type Slot = {
  start: string;
  label: string;
};

type AppointmentCalendarProps = {
  content: BookingAssistantContent;
  selectedDate: string;
  selectedTime: string;
  dateError?: string;
  timeError?: string;
  onSelectDate: (value: string) => void;
  onSelectTime: (value: string) => void;
};

function toISODate(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}

function getStartOfMonth(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function buildDayGrid(value: Date) {
  const start = getStartOfMonth(value);
  const offset = start.getDay();
  const first = new Date(start);
  first.setDate(start.getDate() - offset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(first);
    day.setDate(first.getDate() + index);
    return day;
  });
}

export function AppointmentCalendar({
  content,
  selectedDate,
  selectedTime,
  dateError,
  timeError,
  onSelectDate,
  onSelectTime,
}: AppointmentCalendarProps) {
  const now = new Date();
  const [visibleMonth, setVisibleMonth] = useState(getStartOfMonth(now));
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [availabilityError, setAvailabilityError] = useState<string>("");
  const onSelectTimeRef = useRef(onSelectTime);

  useEffect(() => {
    onSelectTimeRef.current = onSelectTime;
  }, [onSelectTime]);

  const dayGrid = useMemo(() => buildDayGrid(visibleMonth), [visibleMonth]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const controller = new AbortController();

    const fetchAvailability = async () => {
      setIsLoading(true);
      setAvailabilityError("");

      try {
        const response = await fetch(`/api/calendar/availability?date=${encodeURIComponent(selectedDate)}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const data = (await response.json()) as {
          slots?: Slot[];
          message?: string;
        };

        if (!response.ok) {
          setSlots([]);
          onSelectTimeRef.current("");
          setAvailabilityError(
            data.message || "Online scheduling is temporarily unavailable while appointment configuration is completed.",
          );
          return;
        }

        const nextSlots = data.slots ?? [];
        setSlots(nextSlots);

        const stillValidSelection = nextSlots.some((slot) => slot.start === selectedTime);
        if (!stillValidSelection) {
          onSelectTimeRef.current("");
        }
      } catch {
        setSlots([]);
        onSelectTimeRef.current("");
        setAvailabilityError("Online scheduling is temporarily unavailable while appointment configuration is completed.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAvailability();

    return () => controller.abort();
  }, [selectedDate, selectedTime]);

  const displayedSlots = selectedDate ? slots : [];
  const displayedAvailabilityError = selectedDate ? availabilityError : "";

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <Card className="p-4 sm:p-5">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
            {content.requestedTimeLabel}
          </p>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
              className="min-h-11 rounded-full border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] px-4 text-sm text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)]"
            >
              {content.previousMonthLabel}
            </button>
            <h3 className="text-base text-[var(--color-foreground)]">
              {visibleMonth.toLocaleString(content.locale === "es" ? "es-CO" : "en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              type="button"
              onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
              className="min-h-11 rounded-full border border-[color:color-mix(in_srgb,var(--color-secondary)_18%,var(--color-border))] px-4 text-sm text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)]"
            >
              {content.nextMonthLabel}
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {(content.locale === "es"
              ? ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
              : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
            ).map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2" role="group" aria-label={content.stepHeadings.dateTime}>
            {dayGrid.map((day) => {
              const iso = toISODate(day);
              const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
              const isFutureOrToday = day >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const selectable = isCurrentMonth && isFutureOrToday;
              const isSelected = selectedDate === iso;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!selectable}
                  onClick={() => onSelectDate(iso)}
                  aria-pressed={isSelected}
                  className={[
                    "min-h-11 rounded-lg border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)] disabled:cursor-not-allowed disabled:opacity-40",
                    isSelected
                      ? "border-[var(--color-secondary)] bg-[color:color-mix(in_srgb,var(--color-secondary)_12%,white)]"
                      : "border-[var(--color-border)]",
                  ].join(" ")}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {dateError ? <p className="text-sm text-[var(--color-danger)]">{dateError}</p> : null}

          <p className="text-xs text-[var(--color-muted)]">{content.timezoneValue}</p>
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="space-y-4">
          <h3 className="text-base text-[var(--color-foreground)]">{content.stepHeadings.dateTime}</h3>

          {isLoading ? <p className="text-sm text-[var(--color-muted)]">Loading available times...</p> : null}

          {displayedAvailabilityError ? (
            <div className="space-y-3 rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-sm text-[var(--color-muted)]">{displayedAvailabilityError}</p>
              <Button href="/contact" variant="secondary">Go to Contact</Button>
            </div>
          ) : null}

          {!isLoading && !displayedAvailabilityError ? (
            <div className="grid gap-2" role="radiogroup" aria-label={content.requestedTimeLabel}>
              {displayedSlots.map((slot) => {
                const checked = selectedTime === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    onClick={() => onSelectTime(slot.start)}
                    className={[
                      "min-h-11 rounded-lg border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)]",
                      checked
                        ? "border-[var(--color-secondary)] bg-[color:color-mix(in_srgb,var(--color-secondary)_12%,white)]"
                        : "border-[var(--color-border)]",
                    ].join(" ")}
                  >
                    {slot.label}
                  </button>
                );
              })}

              {displayedSlots.length === 0 ? (
                <p className="text-sm text-[var(--color-muted)]">No available times were returned for this date.</p>
              ) : null}
            </div>
          ) : null}

          {timeError ? <p className="text-sm text-[var(--color-danger)]">{timeError}</p> : null}
        </div>
      </Card>
    </div>
  );
}
