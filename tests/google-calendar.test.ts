import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
  HOUSTON_TIMEZONE,
  calculateAvailableSlots,
  createInitialEvaluationEvent,
  getConfigPublicMessage,
  getRuntimeBookingConfig,
  getWorkingWindowsForDate,
  isSunday,
  isValidCalendarDateInput,
  recheckSlotAvailability,
} from "../lib/server/google-calendar-core.ts";

test("Monday slots include morning and afternoon windows while excluding a busy interval", () => {
  const slots = calculateAvailableSlots({
    date: "2026-07-06",
    timeZone: HOUSTON_TIMEZONE,
    windows: getWorkingWindowsForDate("2026-07-06", HOUSTON_TIMEZONE),
    busyPeriods: [
      {
        start: "2026-07-06T14:00:00-05:00",
        end: "2026-07-06T14:30:00-05:00",
      },
    ],
    durationMinutes: 60,
    bufferMinutes: 15,
    minimumBookingNoticeHours: 0,
    now: new Date("2026-07-05T12:00:00.000Z"),
  });

  assert.deepEqual(
    slots.map((slot) => slot.label),
    ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "3:00 PM"],
  );
});

test("Saturday slots use the official Houston window", () => {
  const slots = calculateAvailableSlots({
    date: "2026-07-11",
    timeZone: HOUSTON_TIMEZONE,
    windows: getWorkingWindowsForDate("2026-07-11", HOUSTON_TIMEZONE),
    busyPeriods: [],
    durationMinutes: 60,
    bufferMinutes: 0,
    minimumBookingNoticeHours: 0,
    now: new Date("2026-07-10T12:00:00.000Z"),
  });

  assert.deepEqual(slots.map((slot) => slot.label), ["9:00 AM", "10:00 AM", "11:00 AM"]);
});

test("Sunday is rejected by the Houston calendar helper", () => {
  assert.equal(isSunday("2026-07-12", HOUSTON_TIMEZONE), true);
  assert.equal(getWorkingWindowsForDate("2026-07-12", HOUSTON_TIMEZONE).length, 0);
});

test("Buffer rules remove adjacent starts around a busy event", () => {
  const slots = calculateAvailableSlots({
    date: "2026-07-06",
    timeZone: HOUSTON_TIMEZONE,
    windows: [{ start: "08:00", end: "12:00" }],
    busyPeriods: [
      {
        start: "2026-07-06T09:00:00-05:00",
        end: "2026-07-06T10:00:00-05:00",
      },
    ],
    durationMinutes: 60,
    bufferMinutes: 30,
    minimumBookingNoticeHours: 0,
    now: new Date("2026-07-05T12:00:00.000Z"),
  });

  assert.deepEqual(slots.map((slot) => slot.label), ["11:00 AM"]);
});

test("Duration handling only returns complete starts that fit the window", () => {
  const slots = calculateAvailableSlots({
    date: "2026-07-06",
    timeZone: HOUSTON_TIMEZONE,
    windows: [{ start: "08:00", end: "12:00" }],
    busyPeriods: [],
    durationMinutes: 90,
    bufferMinutes: 0,
    minimumBookingNoticeHours: 0,
    now: new Date("2026-07-05T12:00:00.000Z"),
  });

  assert.deepEqual(slots.map((slot) => slot.label), ["8:00 AM", "9:30 AM"]);
});

test("Missing configuration stays blocked until all required values are supplied", () => {
  const blocked = getRuntimeBookingConfig({
    GOOGLE_CALENDAR_TIMEZONE: HOUSTON_TIMEZONE,
    GOOGLE_CALENDAR_LOCATION: "11777 Katy Freeway, Suite 410S, Houston, Texas 77079",
  });

  assert.equal(blocked.ok, false);
  assert.equal(blocked.message, BOOKING_CONFIG_UNAVAILABLE_MESSAGE);
  if (blocked.ok) {
    return;
  }

  assert.deepEqual(blocked.issues, [
    "INITIAL_EVALUATION_DURATION_MINUTES must be a positive integer.",
    "BOOKING_MIN_NOTICE_HOURS must be a positive integer.",
    "BOOKING_MAX_ADVANCE_DAYS must be a positive integer.",
    "BOOKING_BUFFER_MINUTES must be a non-negative integer.",
    "GOOGLE_CALENDAR_ID is required.",
    "GOOGLE_OAUTH_CLIENT_ID is required.",
    "GOOGLE_OAUTH_CLIENT_SECRET is required.",
    "GOOGLE_OAUTH_REFRESH_TOKEN is required.",
  ]);
});

test("Config public messages are descriptive for missing credentials and calendar id", () => {
  assert.equal(
    getConfigPublicMessage(["GOOGLE_OAUTH_REFRESH_TOKEN is required."]),
    "Online scheduling is temporarily unavailable because calendar credentials are missing or invalid.",
  );

  assert.equal(
    getConfigPublicMessage(["GOOGLE_CALENDAR_ID is required."]),
    "Online scheduling is temporarily unavailable because the scheduling calendar is not configured.",
  );
});

test("OAuth credentials are accepted when all auth variables are provided", () => {
  const blocked = getRuntimeBookingConfig({
    GOOGLE_CALENDAR_ID: "calendar-id",
    GOOGLE_OAUTH_CLIENT_ID: "client-id",
    GOOGLE_OAUTH_CLIENT_SECRET: "client-secret",
    GOOGLE_OAUTH_REFRESH_TOKEN: "refresh-token",
    GOOGLE_CALENDAR_TIMEZONE: HOUSTON_TIMEZONE,
    INITIAL_EVALUATION_DURATION_MINUTES: "60",
    BOOKING_MIN_NOTICE_HOURS: "24",
    BOOKING_MAX_ADVANCE_DAYS: "60",
    BOOKING_BUFFER_MINUTES: "10",
  });

  assert.equal(blocked.ok, true);
});

test("Invalid date inputs are rejected before any Google request is attempted", () => {
  assert.equal(isValidCalendarDateInput("2026-07-13"), true);
  assert.equal(isValidCalendarDateInput("2026-13-40"), false);
  assert.equal(isValidCalendarDateInput("07-13-2026"), false);
});

test("Slot conflict recheck fails when FreeBusy returns an overlap", async () => {
  const calendar = {
    freebusy: {
      query: async () => ({
        data: {
          calendars: {
            calendar: {
              busy: [{ start: "2026-07-06T14:00:00-05:00", end: "2026-07-06T15:00:00-05:00" }],
            },
          },
        },
      }),
    },
    events: {
      insert: async () => ({ data: { id: "unused" } }),
    },
  };

  const available = await recheckSlotAvailability({
    calendar,
    calendarId: "calendar",
    selectedStart: new Date("2026-07-06T19:00:00.000Z"),
    selectedEnd: new Date("2026-07-06T20:00:00.000Z"),
    bufferMinutes: 0,
  });

  assert.equal(available, false);
});

test("Event creation generates a public NSH reference and excludes sensitive fields", async () => {
  let requestBody: { description: string; summary: string; attendees: Array<{ email: string }> } | null = null;

  const calendar = {
    freebusy: {
      query: async () => ({ data: {} }),
    },
    events: {
      insert: async (input: {
        requestBody: { description: string; summary: string; attendees: Array<{ email: string }> };
      }) => {
        requestBody = input.requestBody;
        return { data: { id: "google-event-id" } };
      },
    },
  };

  const created = await createInitialEvaluationEvent({
    calendar,
    calendarId: "calendar",
    timezone: HOUSTON_TIMEZONE,
    selectedStart: new Date("2026-07-06T19:00:00.000Z"),
    selectedEnd: new Date("2026-07-06T20:00:00.000Z"),
    location: "11777 Katy Freeway, Suite 410S, Houston, Texas 77079",
    appointmentFor: "self",
    preferredContactMethod: "email",
    contactEmail: "person@example.com",
  });

  assert.match(created.bookingReference, /^NSH-[A-F0-9]{8}$/);
  assert.equal(created.eventConfirmed, true);
  assert.equal(requestBody?.summary, "Initial Evaluation — NeuroSports USA Houston");
  assert.deepEqual(requestBody?.attendees, [{ email: "person@example.com" }]);
  assert.ok(requestBody?.description.includes("Booking reference:"));
  assert.ok(!requestBody?.description.includes("diagnosis"));
  assert.ok(!requestBody?.description.includes("date of birth"));
});

test("Booking Assistant submits to the live calendar endpoint and no longer posts to booking-request", async () => {
  const source = await readFile("components/scheduling/booking-assistant.tsx", "utf8");

  assert.ok(source.includes('fetch("/api/calendar/book"'));
  assert.ok(!source.includes('fetch("/api/booking-request"'));
});

test("Booking Assistant keeps duplicate-click prevention in place during submission", async () => {
  const source = await readFile("components/scheduling/booking-assistant.tsx", "utf8");

  assert.ok(source.includes("if (isSubmitting) {"));
  assert.ok(source.includes('disabled={isSubmitting}'));
  assert.ok(source.includes("Scheduling your appointment..."));
});

test("Booking route keeps invalid-payload and conflict guards in place", async () => {
  const source = await readFile("app/api/calendar/book/route.ts", "utf8");

  assert.ok(source.includes("Invalid request payload."));
  assert.ok(source.includes("That appointment time was just booked. Please select another available time."));
  assert.ok(source.includes("if (body.website && body.website.trim())"));
});

test("Availability route keeps the safe configuration fallback and no-store caching", async () => {
  const source = await readFile("app/api/calendar/availability/route.ts", "utf8");

  assert.ok(source.includes('"Cache-Control": "no-store"'));
  assert.ok(source.includes("getConfigPublicMessage(configResult.issues)"));
  assert.ok(source.includes("slots: []"));
});

test("Google calendar server auth uses OAuth client credentials and refresh token", async () => {
  const source = await readFile("lib/server/google-calendar.ts", "utf8");

  assert.ok(source.includes("new OAuth2Client"));
  assert.ok(source.includes("configResult.config.oauthClientId"));
  assert.ok(source.includes("configResult.config.oauthClientSecret"));
  assert.ok(source.includes("refresh_token: configResult.config.oauthRefreshToken"));
  assert.ok(!source.includes("new google.auth.GoogleAuth"));
  assert.ok(!source.includes("keyFile:"));
});