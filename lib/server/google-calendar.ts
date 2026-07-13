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

export async function getGoogleCalendarClient() {
  const configResult = getRuntimeBookingConfig();
  if (!configResult.ok) {
    throw new Error("calendar-config-unavailable");
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
