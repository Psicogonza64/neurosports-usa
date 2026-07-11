import { randomBytes } from "node:crypto";

import { NextResponse } from "next/server";

import { sendBookingNotifications } from "@/lib/server/booking-notifications";

type BookingRequestBody = {
  appointmentFor?: "self" | "family-member";
  patientFirstName?: string;
  patientLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
  responsibleAdultName?: string;
  relationship?: string;
  requestedDate?: string;
  requestedTime?: string;
  timezone?: string;
  consentAccepted?: boolean;
  preferredContactMethod?: "email" | "phone" | "text";
  reasonCategories?: string[];
  previousStudiesStatus?: "yes" | "no" | "not-sure";
  previousStudyTypes?: string[];
  appointmentObjective?: string;
  website?: string;
};

const REQUEST_WINDOW_MS = 45_000;
const recentSubmissions = new Map<string, number>();

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

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\+?[0-9]{10,15}$/.test(value);
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function formatRequestedTimeLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Invalid";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function makeReference() {
  return `NSH-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function safeOriginValidation(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    return originUrl.host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!safeOriginValidation(request)) {
    return noStoreJson({ message: "Invalid request origin." }, 403);
  }

  const contentLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
  if (Number.isFinite(contentLength) && contentLength > 16_000) {
    return noStoreJson({ message: "Request payload is too large." }, 413);
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

  if (!body.patientFirstName?.trim() || !body.patientLastName?.trim()) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  const normalizedEmail = normalizeEmail(body.contactEmail ?? "");
  const normalizedPhone = normalizePhone(body.contactPhone ?? "");

  if (!isValidEmail(normalizedEmail) || !isValidPhone(normalizedPhone)) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!body.requestedDate || !isValidDate(body.requestedDate)) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!body.requestedTime || Number.isNaN(new Date(body.requestedTime).getTime())) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.timezone !== "America/Chicago") {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (!body.consentAccepted) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.appointmentObjective && body.appointmentObjective.length > 300) {
    return noStoreJson({ message: "Invalid request payload." }, 400);
  }

  if (body.appointmentFor === "family-member") {
    if (!body.responsibleAdultName?.trim() || !body.relationship?.trim()) {
      return noStoreJson({ message: "Invalid request payload." }, 400);
    }
  }

  const fingerprint = `${normalizedEmail}|${normalizedPhone}`;
  const now = Date.now();
  const previous = recentSubmissions.get(fingerprint);
  if (previous && now - previous < REQUEST_WINDOW_MS) {
    return noStoreJson({ message: "Please wait and try again." }, 429);
  }
  recentSubmissions.set(fingerprint, now);

  const reference = makeReference();
  const timestamp = new Date().toISOString();

  // TODO: Add approved secure intake storage before collecting detailed clinical narratives.
  // TODO: Reconcile booking-request notifications with live Google Calendar confirmation.
  const notifications = await sendBookingNotifications({
    reference,
    submittedAtIso: timestamp,
    appointmentFor: body.appointmentFor,
    patientFirstName: body.patientFirstName.trim(),
    patientLastName: body.patientLastName.trim(),
    responsibleAdultName:
      body.appointmentFor === "family-member"
        ? body.responsibleAdultName?.trim()
        : undefined,
    requestedDate: body.requestedDate,
    requestedTimeLabel: formatRequestedTimeLabel(body.requestedTime),
    contactEmail: normalizedEmail,
    contactPhone: normalizedPhone,
    preferredContactMethod: body.preferredContactMethod,
    reasonCategories: body.reasonCategories ?? [],
    previousStudiesStatus: body.previousStudiesStatus ?? "not-sure",
  });

  const isSuccess = notifications.email.delivered;

  console.info(
    `[booking-request] ref=${reference} ts=${timestamp} email_delivered=${notifications.email.delivered} sms_attempted=${notifications.sms.attempted} sms_delivered=${notifications.sms.delivered}`,
  );

  if (!isSuccess) {
    return noStoreJson(
      {
        success: false,
        message: "Online scheduling is temporarily unavailable while appointment configuration is completed.",
      },
      503,
    );
  }

  return noStoreJson({
    success: true,
    reference,
    message: "Your appointment request was received.",
  });
}
