import "server-only";

type BookingNotificationPayload = {
  reference: string;
  submittedAtIso: string;
  appointmentFor: "self" | "family-member";
  patientFirstName: string;
  patientLastName: string;
  responsibleAdultName?: string;
  requestedDate: string;
  requestedTimeLabel: string;
  contactEmail: string;
  contactPhone: string;
  preferredContactMethod?: "email" | "phone" | "text";
  reasonCategories: string[];
  previousStudiesStatus: "yes" | "no" | "not-sure";
};

type EmailNotificationResult = {
  attempted: boolean;
  configured: boolean;
  delivered: boolean;
  provider: "resend" | "none";
  errorCode?: "missing-config" | "provider-error";
};

type SmsNotificationResult = {
  attempted: number;
  configured: boolean;
  delivered: number;
  failed: number;
  provider: "twilio" | "none";
  errorCode?: "missing-config" | "provider-error";
};

export type BookingNotificationResult = {
  email: EmailNotificationResult;
  sms: SmsNotificationResult;
};

function normalizePhone(value: string) {
  return value.replace(/[\s().-]/g, "");
}

function isValidUsE164(value: string) {
  return /^\+1\d{10}$/.test(value);
}

function parseSmsRecipients() {
  const raw = process.env.BOOKING_NOTIFICATION_SMS_RECIPIENTS?.trim() ?? "";
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((item) => normalizePhone(item.trim()))
    .filter((item) => isValidUsE164(item));
}

function toDisplayContactMethod(value: BookingNotificationPayload["preferredContactMethod"]) {
  if (value === "email") {
    return "Email";
  }
  if (value === "phone") {
    return "Phone";
  }
  if (value === "text") {
    return "Text message";
  }

  return "Not provided";
}

function toDisplayStudiesStatus(value: BookingNotificationPayload["previousStudiesStatus"]) {
  if (value === "yes") {
    return "yes";
  }
  if (value === "no") {
    return "no";
  }

  return "not sure";
}

function buildEmailHtml(payload: BookingNotificationPayload) {
  return [
    `<p><strong>Request reference:</strong> ${payload.reference}</p>`,
    `<p><strong>Submitted:</strong> ${payload.submittedAtIso}</p>`,
    `<p><strong>Appointment type:</strong> Initial Evaluation</p>`,
    `<p><strong>Appointment status:</strong> REQUESTED</p>`,
    `<p><strong>Appointment for:</strong> ${payload.appointmentFor}</p>`,
    `<p><strong>Patient:</strong> ${payload.patientFirstName} ${payload.patientLastName}</p>`,
    payload.responsibleAdultName
      ? `<p><strong>Responsible adult:</strong> ${payload.responsibleAdultName}</p>`
      : "",
    `<p><strong>Requested date:</strong> ${payload.requestedDate}</p>`,
    `<p><strong>Requested time:</strong> ${payload.requestedTimeLabel}</p>`,
    `<p><strong>Timezone:</strong> Central Time - Houston</p>`,
    `<p><strong>Contact email:</strong> ${payload.contactEmail}</p>`,
    `<p><strong>Contact mobile phone:</strong> ${payload.contactPhone}</p>`,
    `<p><strong>Preferred contact method:</strong> ${toDisplayContactMethod(payload.preferredContactMethod)}</p>`,
    `<p><strong>Concern categories:</strong> ${payload.reasonCategories.join(", ") || "Not provided"}</p>`,
    `<p><strong>Prior studies status:</strong> ${toDisplayStudiesStatus(payload.previousStudiesStatus)}</p>`,
    "<p><strong>Clinical objective:</strong> Additional intake information requires secure review.</p>",
    "<p><strong>This request is not a confirmed appointment.</strong></p>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendBookingEmailNotification(payload: BookingNotificationPayload): Promise<EmailNotificationResult> {
  const to = process.env.BOOKING_NOTIFICATION_EMAIL?.trim() ?? "";
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const from = process.env.BOOKING_EMAIL_FROM?.trim() ?? "";

  if (!to || !apiKey || !from) {
    return {
      attempted: false,
      configured: false,
      delivered: false,
      provider: "none",
      errorCode: "missing-config",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New Houston Initial Evaluation Request — ${payload.reference}`,
        html: buildEmailHtml(payload),
      }),
    });

    if (!response.ok) {
      return {
        attempted: true,
        configured: true,
        delivered: false,
        provider: "resend",
        errorCode: "provider-error",
      };
    }

    return {
      attempted: true,
      configured: true,
      delivered: true,
      provider: "resend",
    };
  } catch {
    return {
      attempted: true,
      configured: true,
      delivered: false,
      provider: "resend",
      errorCode: "provider-error",
    };
  }
}

export async function sendBookingSmsNotifications(payload: {
  reference: string;
  requestedDate: string;
  requestedTimeLabel: string;
}): Promise<SmsNotificationResult> {
  const recipients = parseSmsRecipients();
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim() ?? "";
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim() ?? "";
  const from = normalizePhone(process.env.TWILIO_PHONE_NUMBER?.trim() ?? "");

  if (!accountSid || !authToken || !from || recipients.length === 0) {
    return {
      attempted: 0,
      configured: false,
      delivered: 0,
      failed: 0,
      provider: "none",
      errorCode: "missing-config",
    };
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const message = `NeuroSports USA: New Houston Initial Evaluation request. Ref: ${payload.reference}. Requested: ${payload.requestedDate} ${payload.requestedTimeLabel} CT. Review the internal email.`;

  let delivered = 0;
  let failed = 0;

  for (const to of recipients) {
    try {
      const body = new URLSearchParams({
        To: to,
        From: from,
        Body: message,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        },
      );

      if (response.ok) {
        delivered += 1;
      } else {
        failed += 1;
      }
    } catch {
      failed += 1;
    }
  }

  return {
    attempted: recipients.length,
    configured: true,
    delivered,
    failed,
    provider: "twilio",
    errorCode: failed > 0 ? "provider-error" : undefined,
  };
}

export async function sendBookingNotifications(payload: BookingNotificationPayload): Promise<BookingNotificationResult> {
  const [email, sms] = await Promise.all([
    sendBookingEmailNotification(payload),
    sendBookingSmsNotifications({
      reference: payload.reference,
      requestedDate: payload.requestedDate,
      requestedTimeLabel: payload.requestedTimeLabel,
    }),
  ]);

  return { email, sms };
}
