import "server-only";

import { randomBytes } from "node:crypto";

import { google, type calendar_v3 } from "googleapis";

import { houstonBookingConfig, type BookingDay } from "@/lib/neurosports-booking-config";

export const BOOKING_CONFIG_UNAVAILABLE_MESSAGE =
  "Online scheduling is temporarily unavailable while appointment configuration is completed.";

const GOOGLE_CALENDAR_SCOPE = ["https://www.googleapis.com/auth/calendar"];

const DEFAULTS = {
  development: {
    minimumBookingNoticeHours: 24,
    maximumAdvanceBookingDays: 60,
    bufferMinutes: 10,
  },
};

export type RuntimeBookingConfig = {
  timezone: string;
  calendarId: string;
  serviceAccountEmail: string;
  serviceAccountPrivateKey: string;
  durationMinutes: number;
  minimumBookingNoticeHours: number;
  maximumAdvanceBookingDays: number;
  bufferMinutes: number;
  location: string;
};

export type RuntimeBookingConfigResult =
  | { ok: true; config: RuntimeBookingConfig }
  | { ok: false; message: string };

export type BusyPeriod = {
  start: string;
  end: string;
};

export type AvailableSlot = {
  start: string;
  label: string;
};

function parseInteger(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function readIntegerWithEnvironmentDefaults(
  value: string | undefined,
  developmentDefault: number,
): number | null {
  const parsed = parseInteger(value);
  if (parsed !== null) {
    return parsed;
  }

  if (process.env.NODE_ENV !== "production") {
    return developmentDefault;
  }

  return null;
}

function normalizePrivateKey(value: string | undefined) {
  if (!value) {
    return "";
  }

  return value.replace(/\\n/g, "\n").trim();
}

export function getRuntimeBookingConfig(): RuntimeBookingConfigResult {
  const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE?.trim() || "America/Chicago";

  const durationMinutes = parseInteger(process.env.INITIAL_EVALUATION_DURATION_MINUTES);
  // TODO: Confirm official Initial Evaluation duration before Production booking is enabled.
  if (!durationMinutes) {
    return { ok: false, message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE };
  }

  const minimumBookingNoticeHours = readIntegerWithEnvironmentDefaults(
    process.env.BOOKING_MIN_NOTICE_HOURS,
    DEFAULTS.development.minimumBookingNoticeHours,
  );
  const maximumAdvanceBookingDays = readIntegerWithEnvironmentDefaults(
    process.env.BOOKING_MAX_ADVANCE_DAYS,
    DEFAULTS.development.maximumAdvanceBookingDays,
  );
  const bufferMinutes = readIntegerWithEnvironmentDefaults(
    process.env.BOOKING_BUFFER_MINUTES,
    DEFAULTS.development.bufferMinutes,
  );

  if (!minimumBookingNoticeHours || !maximumAdvanceBookingDays || !bufferMinutes) {
    return { ok: false, message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE };
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim() ?? "";
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() ?? "";
  const serviceAccountPrivateKey = normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

  if (!calendarId || !serviceAccountEmail || !serviceAccountPrivateKey) {
    return { ok: false, message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE };
  }

  return {
    ok: true,
    config: {
      timezone,
      calendarId,
      serviceAccountEmail,
      serviceAccountPrivateKey,
      durationMinutes,
      minimumBookingNoticeHours,
      maximumAdvanceBookingDays,
      bufferMinutes,
      location:
        process.env.GOOGLE_CALENDAR_LOCATION?.trim() ||
        "11777 Katy Freeway, Suite 410S, Houston, Texas 77079",
    },
  };
}

function getTimeZoneOffsetMinutes(utcDate: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(utcDate);

  const name = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+0";
  const match = name.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);

  if (!match) {
    return 0;
  }

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number.parseInt(match[2] ?? "0", 10);
  const minutes = Number.parseInt(match[3] ?? "0", 10);

  return sign * (hours * 60 + minutes);
}

export function localDateTimeToUtc(date: string, time: string, timeZone: string) {
  const [year, month, day] = date.split("-").map((item) => Number.parseInt(item, 10));
  const [hour, minute] = time.split(":").map((item) => Number.parseInt(item, 10));

  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offsetMinutes = getTimeZoneOffsetMinutes(new Date(utcGuess), timeZone);
  return new Date(utcGuess - offsetMinutes * 60_000);
}

function formatInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (name: string) => parts.find((item) => item.type === name)?.value ?? "00";
  const offsetMinutes = getTimeZoneOffsetMinutes(date, timeZone);
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(abs / 60)).padStart(2, "0");
  const offsetMins = String(abs % 60).padStart(2, "0");

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}${sign}${offsetHours}:${offsetMins}`;
}

export function formatDateInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (name: string) => parts.find((item) => item.type === name)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function formatLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function toBookingDay(date: string, timeZone: string): BookingDay {
  const midday = localDateTimeToUtc(date, "12:00", timeZone);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
  }).format(midday) as BookingDay;
}

export function getWorkingWindowsForDate(date: string, timeZone: string) {
  const day = toBookingDay(date, timeZone);
  return houstonBookingConfig.weeklyAvailability.find((item) => item.days.includes(day))?.windows ?? [];
}

function overlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

export async function getGoogleCalendarClient() {
  const configResult = getRuntimeBookingConfig();
  if (!configResult.ok) {
    throw new Error("calendar-config-unavailable");
  }

  const auth = new google.auth.JWT({
    email: configResult.config.serviceAccountEmail,
    key: configResult.config.serviceAccountPrivateKey,
    scopes: GOOGLE_CALENDAR_SCOPE,
  });

  return {
    client: google.calendar({ version: "v3", auth }),
    config: configResult.config,
  };
}

export async function getBusyPeriods(input: {
  calendar: calendar_v3.Calendar;
  calendarId: string;
  timeMin: string;
  timeMax: string;
}) {
  const response = await input.calendar.freebusy.query({
    requestBody: {
      timeMin: input.timeMin,
      timeMax: input.timeMax,
      timeZone: "UTC",
      items: [{ id: input.calendarId }],
    },
  });

  const periods = response.data.calendars?.[input.calendarId]?.busy ?? [];
  return periods
    .filter((period): period is { start: string; end: string } => Boolean(period.start && period.end))
    .map((period) => ({ start: period.start, end: period.end }));
}

export function calculateAvailableSlots(input: {
  date: string;
  timeZone: string;
  windows: Array<{ start: string; end: string }>;
  busyPeriods: BusyPeriod[];
  durationMinutes: number;
  bufferMinutes: number;
  minimumBookingNoticeHours: number;
  now: Date;
}) {
  const slots: AvailableSlot[] = [];

  const expandedBusy = input.busyPeriods.map((period) => {
    const start = new Date(period.start);
    const end = new Date(period.end);

    return {
      start: new Date(start.getTime() - input.bufferMinutes * 60_000),
      end: new Date(end.getTime() + input.bufferMinutes * 60_000),
    };
  });

  const minimumStart = new Date(input.now.getTime() + input.minimumBookingNoticeHours * 3_600_000);

  for (const window of input.windows) {
    const windowStart = localDateTimeToUtc(input.date, window.start, input.timeZone);
    const windowEnd = localDateTimeToUtc(input.date, window.end, input.timeZone);

    let cursor = new Date(windowStart);

    while (cursor.getTime() + input.durationMinutes * 60_000 <= windowEnd.getTime()) {
      const candidateStart = new Date(cursor);
      const candidateEnd = new Date(cursor.getTime() + input.durationMinutes * 60_000);

      if (candidateStart >= minimumStart) {
        const blocked = expandedBusy.some((busy) => overlap(candidateStart, candidateEnd, busy.start, busy.end));
        if (!blocked) {
          slots.push({
            start: formatInTimeZone(candidateStart, input.timeZone),
            label: formatLabel(candidateStart, input.timeZone),
          });
        }
      }

      cursor = new Date(cursor.getTime() + input.durationMinutes * 60_000);
    }
  }

  return slots;
}

export async function recheckSlotAvailability(input: {
  calendar: calendar_v3.Calendar;
  calendarId: string;
  selectedStart: Date;
  selectedEnd: Date;
  bufferMinutes: number;
}) {
  const busy = await getBusyPeriods({
    calendar: input.calendar,
    calendarId: input.calendarId,
    timeMin: new Date(input.selectedStart.getTime() - input.bufferMinutes * 60_000).toISOString(),
    timeMax: new Date(input.selectedEnd.getTime() + input.bufferMinutes * 60_000).toISOString(),
  });

  return !busy.some((period) => {
    const busyStart = new Date(period.start);
    const busyEnd = new Date(period.end);
    const expandedStart = new Date(busyStart.getTime() - input.bufferMinutes * 60_000);
    const expandedEnd = new Date(busyEnd.getTime() + input.bufferMinutes * 60_000);
    return overlap(input.selectedStart, input.selectedEnd, expandedStart, expandedEnd);
  });
}

function buildBookingReference() {
  return `NSH-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function createInitialEvaluationEvent(input: {
  calendar: calendar_v3.Calendar;
  calendarId: string;
  timezone: string;
  selectedStart: Date;
  selectedEnd: Date;
  location: string;
  appointmentFor: "self" | "family-member";
  preferredContactMethod?: "email" | "phone" | "text";
  contactEmail: string;
}) {
  const bookingReference = buildBookingReference();

  const response = await input.calendar.events.insert({
    calendarId: input.calendarId,
    sendUpdates: "all",
    requestBody: {
      summary: "Initial Evaluation — NeuroSports USA Houston",
      location: `${input.location}, United States`,
      description: [
        `Booking reference: ${bookingReference}`,
        `Appointment for: ${input.appointmentFor}`,
        `Preferred contact method: ${input.preferredContactMethod ?? "not-provided"}`,
        "Detailed intake is handled in a separate secure workflow.",
      ].join("\n"),
      start: {
        dateTime: input.selectedStart.toISOString(),
        timeZone: input.timezone,
      },
      end: {
        dateTime: input.selectedEnd.toISOString(),
        timeZone: input.timezone,
      },
      attendees: input.contactEmail ? [{ email: input.contactEmail }] : [],
      extendedProperties: {
        private: {
          bookingReference,
        },
      },
    },
  });

  return {
    bookingReference,
    startsAt: formatInTimeZone(input.selectedStart, input.timezone),
    eventConfirmed: Boolean(response.data.id),
  };
}

export function isDateWithinAdvanceWindow(input: {
  date: string;
  now: Date;
  timeZone: string;
  maxAdvanceDays: number;
}) {
  const today = formatDateInTimeZone(input.now, input.timeZone);
  const start = localDateTimeToUtc(today, "00:00", input.timeZone).getTime();
  const target = localDateTimeToUtc(input.date, "00:00", input.timeZone).getTime();
  const max = localDateTimeToUtc(today, "00:00", input.timeZone).getTime() + input.maxAdvanceDays * 86_400_000;

  return target >= start && target <= max;
}

export function isSunday(date: string, timeZone: string) {
  return toBookingDay(date, timeZone) === "Sunday";
}

export function isStartInsideWindows(input: {
  date: string;
  start: Date;
  end: Date;
  windows: Array<{ start: string; end: string }>;
  timeZone: string;
}) {
  return input.windows.some((window) => {
    const windowStart = localDateTimeToUtc(input.date, window.start, input.timeZone);
    const windowEnd = localDateTimeToUtc(input.date, window.end, input.timeZone);
    return input.start >= windowStart && input.end <= windowEnd;
  });
}
