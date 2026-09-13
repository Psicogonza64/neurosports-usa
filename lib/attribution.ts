export const ATTRIBUTION_STORAGE_KEY = "neurosports_attribution_v1";
export const UTM_MAX_LENGTH = 80;

export const ATTRIBUTION_PATHWAYS = [
  "home",
  "houston",
  "site_navigation",
  "schedule_direct",
  "unknown",
] as const;

export type AttributionPathway = (typeof ATTRIBUTION_PATHWAYS)[number];

export type AttributionRecord = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referring_domain?: string;
  landing_path: string;
  pathway: AttributionPathway;
};

type AttributionInput = {
  pathname: string;
  search?: string;
  referrer?: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

// Marketing tokens are lowercase URL-safe identifiers, capped to prevent arbitrary query values.
const UTM_TOKEN_PATTERN = /^[a-z0-9][a-z0-9._~-]{0,79}$/;

export function sanitizePagePath(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const clean = pathname.split("?")[0].split("#")[0].trim();
  return clean || "/";
}

export function normalizeUtmToken(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized.length > UTM_MAX_LENGTH || !UTM_TOKEN_PATTERN.test(normalized)) {
    return undefined;
  }

  return normalized;
}

export function normalizeReferringDomain(referrer: string | undefined): string | undefined {
  if (!referrer) {
    return undefined;
  }

  try {
    const url = new URL(referrer);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }

    return url.hostname.toLowerCase() || undefined;
  } catch {
    return undefined;
  }
}

export function isAttributionPathway(value: unknown): value is AttributionPathway {
  return typeof value === "string" && (ATTRIBUTION_PATHWAYS as readonly string[]).includes(value);
}

export function sanitizeAttribution(value: Partial<AttributionRecord>): Partial<AttributionRecord> {
  const result: Partial<AttributionRecord> = {};

  for (const key of UTM_KEYS) {
    const token = normalizeUtmToken(value[key]);
    if (token) {
      result[key] = token;
    }
  }

  if (typeof value.referring_domain === "string") {
    const domain = normalizeReferringDomain(`https://${value.referring_domain}`);
    if (domain) {
      result.referring_domain = domain;
    }
  }

  if (typeof value.landing_path === "string") {
    result.landing_path = sanitizePagePath(value.landing_path);
  }

  if (isAttributionPathway(value.pathway)) {
    result.pathway = value.pathway;
  }

  return result;
}

function createAttribution(input: AttributionInput): AttributionRecord {
  const searchParams = new URLSearchParams(input.search ?? "");
  const record: AttributionRecord = {
    landing_path: sanitizePagePath(input.pathname),
    pathway: sanitizePagePath(input.pathname) === "/schedule" ? "schedule_direct" : "unknown",
  };

  for (const key of UTM_KEYS) {
    const token = normalizeUtmToken(searchParams.get(key));
    if (token) {
      record[key] = token;
    }
  }

  const referringDomain = normalizeReferringDomain(input.referrer);
  if (referringDomain) {
    record.referring_domain = referringDomain;
  }

  return record;
}

function readStoredAttribution(storage: StorageLike | undefined): AttributionRecord | undefined {
  if (!storage) {
    return undefined;
  }

  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as Partial<AttributionRecord>;
    const sanitized = sanitizeAttribution(parsed);
    if (typeof sanitized.landing_path !== "string" || !isAttributionPathway(sanitized.pathway)) {
      return undefined;
    }

    return sanitized as AttributionRecord;
  } catch {
    return undefined;
  }
}

function writeStoredAttribution(storage: StorageLike | undefined, attribution: AttributionRecord): void {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage failures must not disrupt navigation or analytics.
  }
}

export function getSessionAttribution(input: AttributionInput, storage?: StorageLike): AttributionRecord {
  const stored = readStoredAttribution(storage);
  if (stored) {
    return stored;
  }

  const attribution = createAttribution(input);
  writeStoredAttribution(storage, attribution);
  return attribution;
}

export function getPathwayForCta(ctaLocation: string | undefined, href: string | undefined): AttributionPathway | undefined {
  if (!href || !isScheduleHref(href)) {
    return undefined;
  }

  if (ctaLocation === "hero" || ctaLocation === "home-contact-section" || ctaLocation === "home-final-cta") {
    return "home";
  }

  if (ctaLocation === "houston-location") {
    return "houston";
  }

  return "site_navigation";
}

function isScheduleHref(href: string): boolean {
  try {
    return new URL(href, "https://www.neurosportsusa.com").pathname === "/schedule";
  } catch {
    return false;
  }
}

export function updateSessionPathway(
  input: AttributionInput,
  pathway: AttributionPathway | undefined,
  storage?: StorageLike,
): AttributionRecord {
  const attribution = getSessionAttribution(input, storage);
  if (!pathway || attribution.pathway === pathway) {
    return attribution;
  }

  const updated = { ...attribution, pathway };
  writeStoredAttribution(storage, updated);
  return updated;
}

export function getBrowserSessionAttribution(): AttributionRecord | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return getSessionAttribution(
    {
      pathname: window.location.pathname,
      search: window.location.search,
      referrer: document.referrer,
    },
    getBrowserSessionStorage(),
  );
}

export function updateBrowserSessionPathway(pathway: AttributionPathway | undefined): AttributionRecord | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return updateSessionPathway(
    {
      pathname: window.location.pathname,
      search: window.location.search,
      referrer: document.referrer,
    },
    pathway,
    getBrowserSessionStorage(),
  );
}

function getBrowserSessionStorage(): StorageLike | undefined {
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
}