import "server-only";

import { calculateAvailableSlots } from "@/lib/server/google-calendar";

export function runGoogleCalendarDeterministicChecks() {
  const now = new Date("2026-07-06T11:00:00.000Z");

  const mondayMorningAndAfternoon = calculateAvailableSlots({
    date: "2026-07-06",
    timeZone: "America/Chicago",
    windows: [
      { start: "08:00", end: "12:00" },
      { start: "14:00", end: "16:00" },
    ],
    busyPeriods: [
      {
        start: "2026-07-06T14:00:00-05:00",
        end: "2026-07-06T14:30:00-05:00",
      },
    ],
    durationMinutes: 60,
    bufferMinutes: 15,
    minimumBookingNoticeHours: 0,
    now,
  });

  const saturdaySlots = calculateAvailableSlots({
    date: "2026-07-11",
    timeZone: "America/Chicago",
    windows: [{ start: "09:00", end: "12:30" }],
    busyPeriods: [],
    durationMinutes: 60,
    bufferMinutes: 0,
    minimumBookingNoticeHours: 0,
    now,
  });

  if (mondayMorningAndAfternoon.length === 0) {
    throw new Error("deterministic-check-failed-monday");
  }

  if (saturdaySlots.length === 0) {
    throw new Error("deterministic-check-failed-saturday");
  }

  return {
    monday: mondayMorningAndAfternoon.length,
    saturday: saturdaySlots.length,
  };
}
