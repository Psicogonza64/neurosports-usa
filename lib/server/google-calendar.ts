import "server-only";

import { google } from "googleapis";

export {
  BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
  toCalendarPublicError,
  HOUSTON_TIMEZONE,
  calculateAvailableSlots,
  createInitialEvaluationEvent,
  formatDateInTimeZone,
  getConfigPublicMessage,
  getBusyPeriods,
  getRuntimeBookingConfig,
  getWorkingWindowsForDate,
  isDateWithinAdvanceWindow,
  isStartInsideWindows,
  isSunday,
  isValidCalendarDateInput,
  localDateTimeToUtc,
  recheckSlotAvailability,
  type AvailableSlot,
  type BusyPeriod,
  type CalendarPublicError,
  type GoogleCalendarClientLike,
  type RuntimeBookingConfig,
  type RuntimeBookingConfigResult,
} from "./google-calendar-core";

import {
  getRuntimeBookingConfig,
  type GoogleCalendarClientLike,
} from "./google-calendar-core";

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

function buildServiceAccountAuth(raw: string) {
  const normalized = raw.trim();
  if (!normalized) {
    return null;
  }

  if (normalized.startsWith("{")) {
    try {
      const credentials = JSON.parse(normalized) as Record<string, unknown>;
      return new google.auth.GoogleAuth({
        credentials,
        scopes: [CALENDAR_SCOPE],
      });
    } catch {
      return null;
    }
  }

  return new google.auth.GoogleAuth({
    keyFile: normalized,
    scopes: [CALENDAR_SCOPE],
  });
}

export async function getGoogleCalendarClient() {
  const configResult = getRuntimeBookingConfig();
  if (!configResult.ok) {
    throw new Error("calendar-config-unavailable");
  }

  const serviceAccountAuth = buildServiceAccountAuth(configResult.config.googleApplicationCredentials);
  if (serviceAccountAuth) {
    try {
      await serviceAccountAuth.getClient();
      return {
        client: google.calendar({ version: "v3", auth: serviceAccountAuth }) as GoogleCalendarClientLike,
        config: configResult.config,
      };
    } catch {
      // Continue with OAuth fallback when service-account auth is unavailable.
    }
  }

  const auth = new google.auth.OAuth2(
    configResult.config.oauthClientId,
    configResult.config.oauthClientSecret,
  );

  auth.setCredentials({
    refresh_token: configResult.config.oauthRefreshToken,
  });

  return {
    client: google.calendar({ version: "v3", auth }) as GoogleCalendarClientLike,
    config: configResult.config,
  };
}
