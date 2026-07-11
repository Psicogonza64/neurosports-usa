import { NextResponse } from "next/server";

import {
  BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
  calculateAvailableSlots,
  getBusyPeriods,
  getGoogleCalendarClient,
  getRuntimeBookingConfig,
  getWorkingWindowsForDate,
  isDateWithinAdvanceWindow,
  isSunday,
  localDateTimeToUtc,
} from "@/lib/server/google-calendar";
import { runGoogleCalendarDeterministicChecks } from "@/lib/server/google-calendar-deterministic-checks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export async function GET(request: Request) {
  const configResult = getRuntimeBookingConfig();
  const search = new URL(request.url).searchParams;
  const date = search.get("date")?.trim() ?? "";

  const timezone = configResult.ok ? configResult.config.timezone : "America/Chicago";

  if (!isValidDate(date)) {
    return noStoreJson({ message: "Invalid date. Use YYYY-MM-DD." }, 400);
  }

  if (!configResult.ok) {
    return noStoreJson(
      {
        date,
        timezone,
        slots: [],
        message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
      },
      503,
    );
  }

  if (process.env.NODE_ENV !== "production") {
    runGoogleCalendarDeterministicChecks();
  }

  if (!isDateWithinAdvanceWindow({
    date,
    now: new Date(),
    timeZone: configResult.config.timezone,
    maxAdvanceDays: configResult.config.maximumAdvanceBookingDays,
  })) {
    return noStoreJson({ message: "Selected date is outside the booking window." }, 400);
  }

  if (isSunday(date, configResult.config.timezone)) {
    return noStoreJson({ message: "Sunday is unavailable." }, 400);
  }

  const windows = getWorkingWindowsForDate(date, configResult.config.timezone);
  if (windows.length === 0) {
    return noStoreJson({ date, timezone, slots: [] });
  }

  const firstWindowStart = localDateTimeToUtc(date, windows[0]?.start ?? "08:00", configResult.config.timezone);
  const lastWindowEnd = localDateTimeToUtc(
    date,
    windows[windows.length - 1]?.end ?? "16:00",
    configResult.config.timezone,
  );

  try {
    const { client, config } = await getGoogleCalendarClient();
    const busy = await getBusyPeriods({
      calendar: client,
      calendarId: config.calendarId,
      timeMin: firstWindowStart.toISOString(),
      timeMax: lastWindowEnd.toISOString(),
    });

    const slots = calculateAvailableSlots({
      date,
      timeZone: config.timezone,
      windows,
      busyPeriods: busy,
      durationMinutes: config.durationMinutes,
      bufferMinutes: config.bufferMinutes,
      minimumBookingNoticeHours: config.minimumBookingNoticeHours,
      now: new Date(),
    });

    return noStoreJson({ date, timezone: config.timezone, slots });
  } catch {
    return noStoreJson(
      {
        date,
        timezone: configResult.config.timezone,
        slots: [],
        message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
      },
      503,
    );
  }
}
