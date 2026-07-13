import { randomBytes } from "node:crypto";

import { houstonBookingConfigShared } from "../neurosports-booking-config-shared.js";

type BookingDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const BOOKING_CONFIG_UNAVAILABLE_MESSAGE =
  "Online scheduling is temporarily unavailable while appointment configuration is completed.";

export const HOUSTON_TIMEZONE = "America/Chicago";

export type RuntimeBookingConfig = {
  timezone: string;
  calendarId: string;
  oauthClientId: string;
  oauthClientSecret: string;
  oauthRefreshToken: string;
  durationMinutes: number;
  minimumBookingNoticeHours: number;
  maximumAdvanceBookingDays: number;
  bufferMinutes: number;
  location: string;
};

export type RuntimeBookingConfigResult =
  | { ok: true; config: RuntimeBookingConfig }
  | { ok: false; message: string; issues: string[] };

export type BusyPeriod = {
  start: string;
  end: string;
};

export type AvailableSlot = {
  start: string;
  label: string;
};

export type GoogleCalendarClientLike = {
  freebusy: {
    query: (input: {
      requestBody: {
        timeMin: string;
        timeMax: string;
        timeZone: string;
        items: Array<{ id: string }>;
      };
    }) => Promise<{
      data: {
        calendars?: Record<string, { busy?: Array<{ start?: string | null; end?: string | null }> }>;
      };
    }>;
  };
  events: {
    insert: (input: {
      calendarId: string;
      sendUpdates: "all" | "externalOnly" | "none";
      requestBody: {
        summary: string;
        location: string;
        description: string;
        start: {
          dateTime: string;
          timeZone: string;
        };
        end: {
          dateTime: string;
          timeZone: string;
        };
        attendees: Array<{ email: string }>;
        extendedProperties: {
          private: {
            bookingReference: string;
          };
        };
      };
    }) => Promise<{ data: { id?: string | null } }>;
  };
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

function parseNonNegativeInteger(value: string | undefined) {
  if (value === undefined) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export function isValidCalendarDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export function getRuntimeBookingConfig(env: NodeJS.ProcessEnv = process.env): RuntimeBookingConfigResult {
  const timezone = env.GOOGLE_CALENDAR_TIMEZONE?.trim() || HOUSTON_TIMEZONE;
  const durationMinutes = parseInteger(env.INITIAL_EVALUATION_DURATION_MINUTES);
  const minimumBookingNoticeHours = parseInteger(env.BOOKING_MIN_NOTICE_HOURS);
  const maximumAdvanceBookingDays = parseInteger(env.BOOKING_MAX_ADVANCE_DAYS);
  const bufferMinutes = parseNonNegativeInteger(env.BOOKING_BUFFER_MINUTES);
  const calendarId = env.GOOGLE_CALENDAR_ID?.trim() ?? "";
  const oauthClientId = env.GOOGLE_OAUTH_CLIENT_ID?.trim() ?? "";
  const oauthClientSecret = env.GOOGLE_OAUTH_CLIENT_SECRET?.trim() ?? "";
  const oauthRefreshToken = env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() ?? "";

  const issues: string[] = [];

  if (timezone !== HOUSTON_TIMEZONE) {
    issues.push("GOOGLE_CALENDAR_TIMEZONE must be America/Chicago.");
  }

  if (!durationMinutes) {
    issues.push("INITIAL_EVALUATION_DURATION_MINUTES must be a positive integer.");
  }

  if (!minimumBookingNoticeHours) {
    issues.push("BOOKING_MIN_NOTICE_HOURS must be a positive integer.");
  }

  if (!maximumAdvanceBookingDays) {
    issues.push("BOOKING_MAX_ADVANCE_DAYS must be a positive integer.");
  }

  if (bufferMinutes === null) {
    issues.push("BOOKING_BUFFER_MINUTES must be a non-negative integer.");
  }

  if (!calendarId) {
    issues.push("GOOGLE_CALENDAR_ID is required.");
  }

  if (!oauthClientId) {
    issues.push("GOOGLE_OAUTH_CLIENT_ID is required.");
  }

  if (!oauthClientSecret) {
    issues.push("GOOGLE_OAUTH_CLIENT_SECRET is required.");
  }

  if (!oauthRefreshToken) {
    issues.push("GOOGLE_OAUTH_REFRESH_TOKEN is required.");
  }

  if (issues.length > 0) {
    return {
      ok: false,
      message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
      issues,
    };
  }

  return {
    ok: true,
    config: {
      timezone,
      calendarId,
      oauthClientId,
      oauthClientSecret,
      oauthRefreshToken,
      durationMinutes: durationMinutes!,
      minimumBookingNoticeHours: minimumBookingNoticeHours!,
      maximumAdvanceBookingDays: maximumAdvanceBookingDays!,
      bufferMinutes: bufferMinutes!,
      location:
        env.GOOGLE_CALENDAR_LOCATION?.trim() ||
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
  return houstonBookingConfigShared.weeklyAvailability.find((item) => item.days.includes(day))?.windows ?? [];
}

function overlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

export async function getBusyPeriods(input: {
  calendar: GoogleCalendarClientLike;
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
  calendar: GoogleCalendarClientLike;
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
  calendar: GoogleCalendarClientLike;
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

export type CalendarPublicErrorCode =
  | "calendar-config-unavailable"
  | "calendar-permission-denied"
  | "calendar-not-found"
  | "calendar-auth-failed"
  | "calendar-request-failed";

export type CalendarPublicError = {
  code: CalendarPublicErrorCode;
  status: number;
  message: string;
};

export function getConfigPublicMessage(issues: string[]) {
  if (issues.some((issue) => issue.includes("GOOGLE_OAUTH_"))) {
    return "Online scheduling is temporarily unavailable because calendar credentials are missing or invalid.";
  }

  if (issues.some((issue) => issue.includes("GOOGLE_CALENDAR_ID"))) {
    return "Online scheduling is temporarily unavailable because the scheduling calendar is not configured.";
  }

  return BOOKING_CONFIG_UNAVAILABLE_MESSAGE;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function toCalendarPublicError(error: unknown): CalendarPublicError {
  if (error instanceof Error && error.message === "calendar-config-unavailable") {
    return {
      code: "calendar-config-unavailable",
      status: 503,
      message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
    };
  }

  const details = isObject(error) ? error : {};
  const code = typeof details.code === "number" ? details.code : undefined;
  const status = typeof details.status === "number" ? details.status : undefined;
  const message = typeof details.message === "string" ? details.message : "";
  const errors = Array.isArray(details.errors) ? details.errors : [];
  const reasons = errors
    .map((item) => (isObject(item) && typeof item.reason === "string" ? item.reason : ""))
    .filter(Boolean);

  if (code === 403 || status === 403 || reasons.includes("forbidden")) {
    return {
      code: "calendar-permission-denied",
      status: 403,
      message: "Online scheduling is temporarily unavailable because calendar access is not permitted.",
    };
  }

  if (code === 404 || status === 404 || reasons.includes("notFound")) {
    return {
      code: "calendar-not-found",
      status: 404,
      message: "Online scheduling is temporarily unavailable because the scheduling calendar could not be found.",
    };
  }

  if (code === 401 || status === 401 || reasons.includes("authError") || message.includes("credential")) {
    return {
      code: "calendar-auth-failed",
      status: 503,
      message: "Online scheduling is temporarily unavailable because calendar credentials are not configured correctly.",
    };
  }

  return {
    code: "calendar-request-failed",
    status: 502,
    message: "Online scheduling is temporarily unavailable. Please try again shortly.",
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