export type AnalyticsEventMap = {
  view_path: {
    page_path: string;
  };
  cta_click: {
    cta_name: string;
    cta_location?: string;
    destination_type: "internal" | "whatsapp" | "external";
    pathway?: string;
  };
  form_start: {
    form_name: "schedule_initial_evaluation";
  };
  form_submit: {
    form_name: "schedule_initial_evaluation";
  };
  assessment_booked: {
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
    return result;
  }

  if (eventName === "cta_click") {
    const p = payload as AnalyticsEventMap["cta_click"];
    result.cta_name = String(p.cta_name);
    if (p.cta_location) {
      result.cta_location = String(p.cta_location);
    }
    result.destination_type = p.destination_type;
    if (p.pathway) {
      result.pathway = String(p.pathway);
    }
    return result;
  }

  if (eventName === "form_start" || eventName === "form_submit") {
    const p = payload as AnalyticsEventMap["form_start"];
    result.form_name = p.form_name;
    return result;
  }

  if (eventName === "assessment_booked") {
    const p = payload as AnalyticsEventMap["assessment_booked"];
    result.form_name = p.form_name;
    result.center = p.center;
    result.service_type = p.service_type;
    return result;
  }

  return result;
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
