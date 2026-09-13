type AttributionPathway = "home" | "houston" | "site_navigation" | "schedule_direct" | "unknown";

type AnalyticsAttribution = {
  utm_source?: "google" | "bing" | "facebook" | "instagram" | "linkedin" | "youtube" | "email" | "referral" | "partner";
  utm_medium?: "organic" | "cpc" | "paid_social" | "social" | "email" | "referral" | "display" | "video" | "partner";
  utm_campaign?: never;
  utm_content?: never;
  utm_term?: never;
  referring_domain?: "google" | "bing" | "facebook" | "instagram" | "linkedin" | "youtube" | "other_referral";
  landing_path?: "/" | "/what-we-do" | "/integrated-model" | "/technology" | "/research" | "/schedule" | "unknown";
  pathway?: AttributionPathway;
};

const ATTRIBUTION_PATHWAYS: readonly AttributionPathway[] = [
  "home",
  "houston",
  "site_navigation",
  "schedule_direct",
  "unknown",
];
const UTM_SOURCES: readonly AnalyticsAttribution["utm_source"][] = ["google", "bing", "facebook", "instagram", "linkedin", "youtube", "email", "referral", "partner"];
const UTM_MEDIA: readonly AnalyticsAttribution["utm_medium"][] = ["organic", "cpc", "paid_social", "social", "email", "referral", "display", "video", "partner"];
const REFERRING_DOMAINS: readonly AnalyticsAttribution["referring_domain"][] = ["google", "bing", "facebook", "instagram", "linkedin", "youtube", "other_referral"];
const LANDING_PATHS: readonly AnalyticsAttribution["landing_path"][] = ["/", "/what-we-do", "/integrated-model", "/technology", "/research", "/schedule", "unknown"];

export type AnalyticsEventMap = {
  view_path: AnalyticsAttribution & {
    page_path: string;
  };
  cta_click: AnalyticsAttribution & {
    cta_name: string;
    cta_location?: string;
    destination_type: "internal" | "whatsapp" | "external";
  };
  form_start: AnalyticsAttribution & {
    form_name: "schedule_initial_evaluation";
  };
  form_submit: AnalyticsAttribution & {
    form_name: "schedule_initial_evaluation";
  };
  assessment_booked: AnalyticsAttribution & {
    form_name: "schedule_initial_evaluation";
    center: "houston";
    service_type: "initial_evaluation";
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function sanitizePagePath(pathname: string): string {
  if (!pathname) {
    return "/";
  }
  const clean = pathname.split("?")[0].split("#")[0].trim();
  return clean || "/";
}

function sanitizeAttribution(value: AnalyticsAttribution): AnalyticsAttribution {
  const result: AnalyticsAttribution = {};

  if (UTM_SOURCES.includes(value.utm_source)) {
    result.utm_source = value.utm_source;
  }
  if (UTM_MEDIA.includes(value.utm_medium)) {
    result.utm_medium = value.utm_medium;
  }

  if (REFERRING_DOMAINS.includes(value.referring_domain)) {
    result.referring_domain = value.referring_domain;
  }

  if (LANDING_PATHS.includes(value.landing_path)) {
    result.landing_path = value.landing_path;
  }

  if (ATTRIBUTION_PATHWAYS.includes(value.pathway as AttributionPathway)) {
    result.pathway = value.pathway;
  }

  return result;
}

export function getDestinationType(
  href: string | null | undefined,
): "internal" | "whatsapp" | "external" {
  if (!href) {
    return "internal";
  }
  const trimmed = href.trim();
  if (trimmed.includes("wa.me") || trimmed.includes("whatsapp.com")) {
    return "whatsapp";
  }
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return "internal";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (
        url.hostname === "www.neurosportsusa.com" ||
        url.hostname === "neurosportsusa.com" ||
        url.hostname === "localhost"
      ) {
        return "internal";
      }
    } catch {
      // Keep as external if parsing fails
    }
    return "external";
  }
  return "internal";
}

export function sanitizeEventPayload<E extends AnalyticsEventName>(
  eventName: E,
  payload: AnalyticsEventMap[E],
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (eventName === "view_path") {
    const p = payload as AnalyticsEventMap["view_path"];
    result.page_path = sanitizePagePath(p.page_path);
  }

  if (eventName === "cta_click") {
    const p = payload as AnalyticsEventMap["cta_click"];
    result.cta_name = String(p.cta_name);
    if (p.cta_location) {
      result.cta_location = String(p.cta_location);
    }
    result.destination_type = p.destination_type;
  }

  if (eventName === "form_start" || eventName === "form_submit") {
    const p = payload as AnalyticsEventMap["form_start"];
    result.form_name = p.form_name;
  }

  if (eventName === "assessment_booked") {
    const p = payload as AnalyticsEventMap["assessment_booked"];
    result.form_name = p.form_name;
    result.center = p.center;
    result.service_type = p.service_type;
  }

  return { ...result, ...sanitizeAttribution(payload) };
}

export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  payload: AnalyticsEventMap[E],
): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    const sanitizedPayload = sanitizeEventPayload(eventName, payload);

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, sanitizedPayload);
    }
  } catch {
    // Fail silently in all environments without impacting user experience
  }
}
