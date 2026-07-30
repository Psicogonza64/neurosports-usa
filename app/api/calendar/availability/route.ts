import { NextResponse } from "next/server";

import {
  calculateAvailableSlots,
  getConfigPublicMessage,
  getBusyPeriods,
  getGoogleCalendarClient,
  getRuntimeBookingConfig,
  getWorkingWindowsForDate,
  isDateWithinAdvanceWindow,
  isSunday,
  isValidCalendarDateInput,
  localDateTimeToUtc,
  toCalendarPublicError,
} from "@/lib/server/google-calendar";
import { runGoogleCalendarDeterministicChecks } from "@/lib/server/google-calendar-deterministic-checks";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type CalendarStage = "authentication" | "freebusy" | "slots";

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getSafeErrorDetails(error: unknown) {
  const details = error as {
    name?: string;
    code?: number | string;
    status?: number | string;
    message?: string;
    response?: {
      status?: number | string;
      data?: {
        error?:
          | string
          | {
              error?: string;
              error_description?: string;
              message?: string;
            };
      };
    };
    errors?: Array<{ reason?: string; message?: string }>;
  };

  const oauthError =
    typeof details.response?.data?.error === "string"
      ? details.response.data.error
      : details.response?.data?.error?.error;

  const oauthDescription =
    typeof details.response?.data?.error === "object"
      ? details.response.data.error?.error_description ?? details.response.data.error?.message
      : undefined;

  return {
    name: details.name ?? "UnknownError",
    httpStatus: details.status ?? details.code ?? details.response?.status,
    oauthError: oauthError ?? details.errors?.[0]?.reason,
    description: oauthDescription ?? details.message ?? details.errors?.[0]?.message,
  };
}

function logCalendarDiagnostics(stage: CalendarStage, error: unknown, context: { date: string }) {
  const safe = getSafeErrorDetails(error);

  console.error("[calendar-availability] Google Calendar failure", {
    stage,
    date: context.date,
    errorName: safe.name,
    httpStatus: safe.httpStatus,
    oauthError: safe.oauthError,
    description: safe.description,
  });
}

export async function GET(request: Request) {
  const configResult = getRuntimeBookingConfig();
  const search = new URL(request.url).searchParams;
  const date = search.get("date")?.trim() ?? "";

  const timezone = configResult.ok ? configResult.config.timezone : "America/Chicago";

  if (!isValidCalendarDateInput(date)) {
    return noStoreJson({ message: "Invalid date. Use YYYY-MM-DD." }, 400);
  }

  if (!configResult.ok) {
    return noStoreJson(
      {
        date,
        timezone,
        slots: [],
        message: getConfigPublicMessage(configResult.issues),
      },
      503,
    );
  }

  if (process.env.NODE_ENV !== "production") {
    runGoogleCalendarDeterministicChecks();
  }

  if (
    !isDateWithinAdvanceWindow({
      date,
      now: new Date(),
      timeZone: configResult.config.timezone,
      maxAdvanceDays: configResult.config.maximumAdvanceBookingDays,
    })
  ) {
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
    let client: Awaited<ReturnType<typeof getGoogleCalendarClient>>["client"];
    let config: Awaited<ReturnType<typeof getGoogleCalendarClient>>["config"];

    try {
      const calendarClient = await getGoogleCalendarClient();
      client = calendarClient.client;
      config = calendarClient.config;
    } catch (error) {
      logCalendarDiagnostics("authentication", error, { date });
      throw error;
    }

    let busy: Awaited<ReturnType<typeof getBusyPeriods>>;

    try {
      busy = await getBusyPeriods({
        calendar: client,
        calendarId: config.calendarId,
        timeMin: firstWindowStart.toISOString(),
        timeMax: lastWindowEnd.toISOString(),
      });
    } catch (error) {
      logCalendarDiagnostics("freebusy", error, { date });
      throw error;
    }

    let slots: ReturnType<typeof calculateAvailableSlots>;

    try {
      slots = calculateAvailableSlots({
        date,
        timeZone: config.timezone,
        windows,
        busyPeriods: busy,
        durationMinutes: config.durationMinutes,
        bufferMinutes: config.bufferMinutes,
        minimumBookingNoticeHours: config.minimumBookingNoticeHours,
        now: new Date(),
      });
    } catch (error) {
      logCalendarDiagnostics("slots", error, { date });
      throw error;
    }

    return noStoreJson({ date, timezone: config.timezone, slots });
  } catch (error) {
    const publicError = toCalendarPublicError(error);
    return noStoreJson(
      {
        date,
        timezone: configResult.config.timezone,
        slots: [],
        message: publicError.message,
      },
      publicError.status,
    );
  }
}
