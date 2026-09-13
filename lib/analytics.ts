type AttributionPathway = "home" | "houston" | "site_navigation" | "schedule_direct" | "unknown";

type AnalyticsAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referring_domain?: string;
  landing_path?: string;
  pathway?: AttributionPathway;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_TOKEN_PATTERN = /^[a-z0-9][a-z0-9._~-]{0,79}$/;
const ATTRIBUTION_PATHWAYS: readonly AttributionPathway[] = [
  "home",
  "houston",
  "site_navigation",
  "schedule_direct",
  "unknown",
];

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

  for (const key of UTM_KEYS) {
    const candidate = value[key];
    const normalized = typeof candidate === "string" ? candidate.trim().toLowerCase() : "";
    if (normalized.length <= 80 && UTM_TOKEN_PATTERN.test(normalized)) {
      result[key] = normalized;
    }
  }

  if (typeof value.referring_domain === "string") {
    try {
      const domain = new URL(`https://${value.referring_domain}`).hostname.toLowerCase();
      if (domain) {
        result.referring_domain = domain;
      }
    } catch {
      // Invalid attribution is discarded at the analytics boundary.
    }
  }

  if (typeof value.landing_path === "string") {
    result.landing_path = sanitizePagePath(value.landing_path);
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
