import { NextResponse } from "next/server";

import {
  BOOKING_CONFIG_UNAVAILABLE_MESSAGE,
  createInitialEvaluationEvent,
  getGoogleCalendarClient,
  getRuntimeBookingConfig,
  getWorkingWindowsForDate,
  isStartInsideWindows,
  recheckSlotAvailability,
} from "@/lib/server/google-calendar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type BookingRequestBody = {
  appointmentFor?: "self" | "family-member";
  patientFirstName?: string;
  patientLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
  responsibleAdultName?: string;
  relationship?: string;
  selectedStart?: string;
  timezone?: string;
  consentAccepted?: boolean;
  preferredContactMethod?: "email" | "phone" | "text";
  reasonCategories?: string[];
  previousStudiesStatus?: "no" | "yes" | "not-sure";
  previousStudyTypes?: string[];
  website?: string;
};

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isBlank(value: string | undefined) {
  return !value || !value.trim();
}

function isValidEmail(value: string | undefined) {
  if (!value) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string | undefined) {
  if (!value) {
    return false;
  }

  return /^[0-9()+\-\s]{7,}$/.test(value.trim());
}

export async function POST(request: Request) {
  const contentLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
  if (Number.isFinite(contentLength) && contentLength > 15_000) {
    return noStoreJson({ message: "Request payload is too large." }, 413);
  }

  const configResult = getRuntimeBookingConfig();
  if (!configResult.ok) {
    return noStoreJson({ message: BOOKING_CONFIG_UNAVAILABLE_MESSAGE }, 503);
  }

  let body: BookingRequestBody;
  try {
    body = (await request.json()) as BookingRequestBody;
  } catch {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.website && body.website.trim()) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.appointmentFor !== "self" && body.appointmentFor !== "family-member") {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (isBlank(body.patientFirstName) || isBlank(body.patientLastName)) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!isValidEmail(body.contactEmail) || !isValidPhone(body.contactPhone)) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!body.selectedStart || Number.isNaN(new Date(body.selectedStart).getTime())) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.timezone !== configResult.config.timezone) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!body.consentAccepted) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.appointmentFor === "family-member") {
    if (isBlank(body.responsibleAdultName) || isBlank(body.relationship)) {
      return noStoreJson({ message: "Invalid request payload." }, 400);
    }
  }

  const selectedStart = new Date(body.selectedStart);
  const selectedEnd = new Date(
    selectedStart.getTime() + configResult.config.durationMinutes * 60_000,
  );

  const selectedDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: configResult.config.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(selectedStart)
    .replace(/\//g, "-");

  const windows = getWorkingWindowsForDate(selectedDate, configResult.config.timezone);
  if (windows.length === 0) {
    return noStoreJson({ message: "Selected time is outside official hours." }, 400);
  }

  if (
    !isStartInsideWindows({
      date: selectedDate,
      start: selectedStart,
      end: selectedEnd,
      windows,
      timeZone: configResult.config.timezone,
    })
  ) {
    return noStoreJson({ message: "Selected time is outside official hours." }, 400);
  }

  try {
    const { client, config } = await getGoogleCalendarClient();
    const stillAvailable = await recheckSlotAvailability({
      calendar: client,
      calendarId: config.calendarId,
      selectedStart,
      selectedEnd,
      bufferMinutes: config.bufferMinutes,
    });

    if (!stillAvailable) {
      return noStoreJson(
        {
          message: "That appointment time was just booked. Please select another available time.",
        },
        409,
      );
    }

    // TODO: Connect approved secure intake storage separately from Google Calendar.
    const created = await createInitialEvaluationEvent({
      calendar: client,
      calendarId: config.calendarId,
      timezone: config.timezone,
      selectedStart,
      selectedEnd,
      location: config.location,
      appointmentFor: body.appointmentFor,
      preferredContactMethod: body.preferredContactMethod,
      contactEmail: body.contactEmail?.trim() ?? "",
    });

    if (!created.eventConfirmed) {
      return noStoreJson({ message: "Could not schedule appointment." }, 502);
    }

    return noStoreJson({
      message: "Your Initial Evaluation has been scheduled.",
      bookingReference: created.bookingReference,
      start: created.startsAt,
      timezone: "Central Time — Houston",
      address: [
        "11777 Katy Freeway, Suite 410S",
        "Houston, Texas 77079",
        "United States",
      ],
      inviteNotice: "Please check your email for the calendar invitation.",
    });
  } catch {
    return noStoreJson({ message: "Online scheduling is temporarily unavailable. Please try again shortly." }, 502);
  }
}
