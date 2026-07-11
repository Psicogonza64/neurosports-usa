"use client";

import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { houstonBookingConfig, type BookingDay } from "@/lib/neurosports-booking-config";
import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";

type AppointmentCalendarProps = {
  content: BookingAssistantContent;
  selectedDate: string;
  selectedTime: string;
  dateError?: string;
  timeError?: string;
  onSelectDate: (value: string) => void;
  onSelectTime: (value: string) => void;
};

const WEEKDAY_KEYS: BookingDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

function isHoustonAvailableDay(value: Date) {
  const dayName = WEEKDAY_KEYS[value.getDay()];
  return houstonBookingConfig.weeklyAvailability.some((rule) => rule.days.includes(dayName));
}

function buildTimeSlotsForDate(dateIso: string) {
  if (!dateIso) {
    return [] as string[];
  }

  const selected = new Date(`${dateIso}T00:00:00`);
  const dayName = WEEKDAY_KEYS[selected.getDay()];
  const rule = houstonBookingConfig.weeklyAvailability.find((item) => item.days.includes(dayName));

  if (!rule) {
    return [] as string[];
  }

  const slots: string[] = [];

  for (const window of rule.windows) {
    const [startHour, startMinute] = window.start.split(":").map(Number);
    const [endHour, endMinute] = window.end.split(":").map(Number);

    let total = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    // TODO: Confirm official Initial Evaluation duration.
    while (total < end) {
      const hours = Math.floor(total / 60);
      const minutes = total % 60;
      slots.push(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
      total += houstonBookingConfig.slotIntervalMinutes;
    }
  }

  return slots;
}

function formatTime(value: string, locale: "en" | "es") {
  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  if (locale === "es") {
    return `${hour12}:${String(minutes).padStart(2, "0")} ${period === "AM" ? "a. m." : "p. m."}`;
  }

  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
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

  const dayGrid = useMemo(() => buildDayGrid(visibleMonth), [visibleMonth]);
  const slots = useMemo(() => buildTimeSlotsForDate(selectedDate), [selectedDate]);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <Card className="p-4 sm:p-5">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-secondary)]/80">
            {content.requestedTimeLabel}
          </p>
          {/* TODO: Connect live Houston calendar availability before enabling automatic confirmation. */}
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
              const selectable = isCurrentMonth && isHoustonAvailableDay(day) && day >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const isSelected = selectedDate === iso;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!selectable}
                  onClick={() => {
                    onSelectDate(iso);
                    onSelectTime("");
                  }}
                  aria-pressed={isSelected}
                  className="min-h-11 rounded-lg border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          {dateError ? (
            <p className="text-sm text-[var(--color-danger)]" role="alert">{dateError}</p>
          ) : null}
          <p className="text-xs text-[var(--color-muted)]">{content.unavailableSundayLabel}</p>
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="space-y-4">
          <h3 className="text-base text-[var(--color-foreground)]">{content.stepTitles[2]}</h3>
          <div className="grid gap-2" role="radiogroup" aria-label={content.requestedTimeLabel}>
            {slots.map((slot) => {
              const checked = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => onSelectTime(slot)}
                  className="min-h-11 rounded-lg border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_36%,white)]"
                >
                  {formatTime(slot, content.locale)}
                </button>
              );
            })}
            {slots.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">{content.selectDateHint}</p>
            ) : null}
          </div>
          {timeError ? (
            <p className="text-sm text-[var(--color-danger)]" role="alert">{timeError}</p>
          ) : null}

          <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_16%,var(--color-border))] p-3 text-sm">
            <p><strong>{content.requestedTimeLabel}:</strong></p>
            <p>{selectedDate || "-"}</p>
            <p>{selectedTime ? formatTime(selectedTime, content.locale) : "-"}</p>
            <p>{content.timezoneValue}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
