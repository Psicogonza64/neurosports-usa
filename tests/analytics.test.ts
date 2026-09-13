import assert from "node:assert/strict";
import test from "node:test";

import {
  getDestinationType,
  sanitizeEventPayload,
  sanitizePagePath,
  trackEvent,
} from "../lib/analytics.ts";

test("sanitizePagePath strips query strings, UTMs, hashes, and ensures clean pathname", () => {
  assert.equal(sanitizePagePath("/schedule"), "/schedule");
  assert.equal(
    sanitizePagePath("/schedule?utm_source=google&utm_medium=cpc&patient=Jane"),
    "/schedule",
  );
  assert.equal(sanitizePagePath("/#contact"), "/");
  assert.equal(sanitizePagePath("/technology?ref=123#overview"), "/technology");
  assert.equal(sanitizePagePath(""), "/");
});

test("getDestinationType correctly categorizes internal, whatsapp, and external targets", () => {
  assert.equal(getDestinationType("/schedule"), "internal");
  assert.equal(getDestinationType("#contact"), "internal");
  assert.equal(getDestinationType("./what-we-do"), "internal");
  assert.equal(
    getDestinationType("https://www.neurosportsusa.com/what-we-do"),
    "internal",
  );
  assert.equal(
    getDestinationType("https://wa.me/18324579238?text=Hello"),
    "whatsapp",
  );
  assert.equal(
    getDestinationType("https://api.whatsapp.com/send?phone=18324579238"),
    "whatsapp",
  );
  assert.equal(
    getDestinationType("https://www.google.com/maps"),
    "external",
  );
  assert.equal(getDestinationType(undefined), "internal");
});

test("sanitizeEventPayload enforces strict whitelist for each canonical event", () => {
  // view_path
  const viewPathPayload = sanitizeEventPayload("view_path", {
    page_path: "/schedule?email=sensitive@example.com",
  });
  assert.deepEqual(viewPathPayload, {
    page_path: "/schedule",
  });

  // cta_click
  const ctaPayload = sanitizeEventPayload("cta_click", {
    cta_name: "schedule-initial-evaluation",
    cta_location: "hero",
    destination_type: "internal",
    pathway: "home",
  });
  assert.deepEqual(ctaPayload, {
    cta_name: "schedule-initial-evaluation",
    cta_location: "hero",
    destination_type: "internal",
    pathway: "home",
  });

  // form_start
  const formStartPayload = sanitizeEventPayload("form_start", {
    form_name: "schedule_initial_evaluation",
  });
  assert.deepEqual(formStartPayload, {
    form_name: "schedule_initial_evaluation",
  });

  // form_submit
  const formSubmitPayload = sanitizeEventPayload("form_submit", {
    form_name: "schedule_initial_evaluation",
  });
  assert.deepEqual(formSubmitPayload, {
    form_name: "schedule_initial_evaluation",
  });

  // assessment_booked
  const bookedPayload = sanitizeEventPayload("assessment_booked", {
    form_name: "schedule_initial_evaluation",
    center: "houston",
    service_type: "initial_evaluation",
  });
  assert.deepEqual(bookedPayload, {
    form_name: "schedule_initial_evaluation",
    center: "houston",
    service_type: "initial_evaluation",
  });
});

test("trackEvent does not throw in SSR / server environments without window", () => {
  assert.doesNotThrow(() => {
    trackEvent("view_path", { page_path: "/schedule" });
    trackEvent("form_start", { form_name: "schedule_initial_evaluation" });
    trackEvent("form_submit", { form_name: "schedule_initial_evaluation" });
    trackEvent("assessment_booked", {
      form_name: "schedule_initial_evaluation",
      center: "houston",
      service_type: "initial_evaluation",
    });
  });
});

test("all canonical events accept only approved attribution fields", () => {
  const attribution = {
    utm_source: "google" as const,
    utm_medium: "paid_social" as const,
    referring_domain: "google" as const,
    landing_path: "/schedule" as const,
    pathway: "home" as const,
  };

  const payloads = [
    sanitizeEventPayload("view_path", { page_path: "/schedule", ...attribution }),
    sanitizeEventPayload("cta_click", {
      cta_name: "schedule-initial-evaluation",
      destination_type: "internal",
      ...attribution,
    }),
    sanitizeEventPayload("form_start", { form_name: "schedule_initial_evaluation", ...attribution }),
    sanitizeEventPayload("form_submit", { form_name: "schedule_initial_evaluation", ...attribution }),
    sanitizeEventPayload("assessment_booked", {
      form_name: "schedule_initial_evaluation",
      center: "houston",
      service_type: "initial_evaluation",
      ...attribution,
    }),
  ];

  for (const payload of payloads) {
    assert.equal(payload.utm_source, "google");
    assert.equal(payload.referring_domain, "google");
    assert.equal(payload.landing_path, "/schedule");
    assert.equal(payload.pathway, "home");
  }
});

test("arbitrary pathway values and unapproved payload fields cannot enter analytics", () => {
  const unsafePayload = {
    cta_name: "schedule-initial-evaluation",
    destination_type: "internal" as const,
    pathway: "clinical-intake",
    email: "patient@example.com",
    bookingReference: "booking-123",
    symptoms: "free text",
    utm_source: "john-smith",
    utm_medium: "patient-123",
    utm_campaign: "john@example.com",
    utm_content: "+15551234567",
    utm_term: "unregistered-term",
    referring_domain: "referral.example.com",
    landing_path: "/user-controlled-path",
  };
  const sanitized = sanitizeEventPayload(
    "cta_click",
    unsafePayload as unknown as Parameters<typeof sanitizeEventPayload<"cta_click">>[1],
  );

  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "pathway"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "email"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "bookingReference"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "symptoms"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "utm_source"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "utm_medium"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "utm_campaign"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "utm_content"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "utm_term"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "referring_domain"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(sanitized, "landing_path"), false);
});

test("assessment_booked excludes all PII, patient info, clinical data, and booking reference", () => {
  const payload = sanitizeEventPayload("assessment_booked", {
    form_name: "schedule_initial_evaluation",
    center: "houston",
    service_type: "initial_evaluation",
  });

  const forbiddenKeys = [
    "bookingReference",
    "reference",
    "patientFirstName",
    "patientLastName",
    "contactEmail",
    "contactPhone",
    "email",
    "phone",
    "dob",
    "dateOfBirth",
    "symptoms",
    "diagnosis",
    "clinicalNotes",
    "responsibleAdult",
    "relationship",
    "appointmentDate",
    "appointmentTime",
  ];

  for (const key of forbiddenKeys) {
    assert.equal(
      Object.prototype.hasOwnProperty.call(payload, key),
      false,
      `Forbidden key ${key} must not exist in analytics payload`,
    );
  }
});
