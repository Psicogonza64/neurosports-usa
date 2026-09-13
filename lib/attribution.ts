export const ATTRIBUTION_STORAGE_KEY = "neurosports_attribution_v1";

export const UTM_SOURCES = [
  "google",
  "bing",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "email",
  "referral",
  "partner",
] as const;

export const UTM_MEDIA = [
  "organic",
  "cpc",
  "paid_social",
  "social",
  "email",
  "referral",
  "display",
  "video",
  "partner",
] as const;

// Add approved production campaign tokens here before they can be emitted to GA4.
export const UTM_CAMPAIGNS = [] as const;
export const UTM_CONTENTS = [] as const;
export const UTM_TERMS = [] as const;

export const REFERRING_DOMAINS = [
  "google",
  "bing",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "other_referral",
] as const;

export const PUBLIC_LANDING_PATHS = [
  "/",
  "/what-we-do",
  "/integrated-model",
  "/technology",
  "/research",
  "/schedule",
  "unknown",
] as const;

export const ATTRIBUTION_PATHWAYS = [
  "home",
  "houston",
  "site_navigation",
  "schedule_direct",
  "unknown",
] as const;

export type AttributionPathway = (typeof ATTRIBUTION_PATHWAYS)[number];
type UtmSource = (typeof UTM_SOURCES)[number];
type UtmMedium = (typeof UTM_MEDIA)[number];
type ReferringDomain = (typeof REFERRING_DOMAINS)[number];
type LandingPath = (typeof PUBLIC_LANDING_PATHS)[number];

export type AttributionRecord = {
  utm_source?: UtmSource;
  utm_medium?: UtmMedium;
  utm_campaign?: (typeof UTM_CAMPAIGNS)[number];
  utm_content?: (typeof UTM_CONTENTS)[number];
  utm_term?: (typeof UTM_TERMS)[number];
  referring_domain?: ReferringDomain;
  landing_path: LandingPath;
  pathway: AttributionPathway;
};

type AttributionInput = {
  pathname: string;
  search?: string;
  referrer?: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function sanitizePagePath(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  const clean = pathname.split("?")[0].split("#")[0].trim();
  return clean || "/";
}

function normalizeControlledValue<T extends string>(value: string | null | undefined, allowed: readonly T[]): T | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  return allowed.includes(normalized as T) ? (normalized as T) : undefined;
}

export function normalizeUtmSource(value: string | null | undefined): UtmSource | undefined {
  return normalizeControlledValue(value, UTM_SOURCES);
}

export function normalizeUtmMedium(value: string | null | undefined): UtmMedium | undefined {
  return normalizeControlledValue(value, UTM_MEDIA);
}

function normalizeCampaign(value: string | null | undefined): (typeof UTM_CAMPAIGNS)[number] | undefined {
  return normalizeControlledValue(value, UTM_CAMPAIGNS);
}

function normalizeContent(value: string | null | undefined): (typeof UTM_CONTENTS)[number] | undefined {
  return normalizeControlledValue(value, UTM_CONTENTS);
}

function normalizeTerm(value: string | null | undefined): (typeof UTM_TERMS)[number] | undefined {
  return normalizeControlledValue(value, UTM_TERMS);
}

export function normalizeReferringDomain(referrer: string | undefined): ReferringDomain | undefined {
  if (!referrer) {
    return undefined;
  }

  try {
    const url = new URL(referrer);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }

    const hostname = url.hostname.toLowerCase();
    if (hostname === "neurosportsusa.com" || hostname.endsWith(".neurosportsusa.com")) {
      return undefined;
    }
    if (hostname === "bing.com" || hostname.endsWith(".bing.com")) {
      return "bing";
    }
    for (const source of ["google", "facebook", "instagram", "linkedin", "youtube"] as const) {
      if (hostname === `${source}.com` || hostname.endsWith(`.${source}.com`)) {
        return source;
      }
    }
    return "other_referral";
  } catch {
    return undefined;
  }
}

export function isAttributionPathway(value: unknown): value is AttributionPathway {
  return typeof value === "string" && (ATTRIBUTION_PATHWAYS as readonly string[]).includes(value);
}

export function normalizeLandingPath(pathname: string): LandingPath {
  const path = sanitizePagePath(pathname);
  return (PUBLIC_LANDING_PATHS as readonly string[]).includes(path) ? (path as LandingPath) : "unknown";
}

export function sanitizeAttribution(value: Partial<AttributionRecord>): Partial<AttributionRecord> {
  const result: Partial<AttributionRecord> = {};

  const source = normalizeUtmSource(value.utm_source);
  if (source) {
    result.utm_source = source;
  }
  const medium = normalizeUtmMedium(value.utm_medium);
  if (medium) {
    result.utm_medium = medium;
  }
  const campaign = normalizeCampaign(value.utm_campaign);
  if (campaign) {
    result.utm_campaign = campaign;
  }
  const content = normalizeContent(value.utm_content);
  if (content) {
    result.utm_content = content;
  }
  const term = normalizeTerm(value.utm_term);
  if (term) {
    result.utm_term = term;
  }

  if (typeof value.referring_domain === "string") {
    const domain = normalizeControlledValue(value.referring_domain, REFERRING_DOMAINS);
    if (domain) {
      result.referring_domain = domain;
    }
  }

  if (typeof value.landing_path === "string") {
    result.landing_path = normalizeLandingPath(value.landing_path);
  }

  if (isAttributionPathway(value.pathway)) {
    result.pathway = value.pathway;
  }

  return result;
}

function createAttribution(input: AttributionInput): AttributionRecord {
  const searchParams = new URLSearchParams(input.search ?? "");
  const record: AttributionRecord = {
    landing_path: normalizeLandingPath(input.pathname),
    pathway: sanitizePagePath(input.pathname) === "/schedule" ? "schedule_direct" : "unknown",
  };

  const source = normalizeUtmSource(searchParams.get("utm_source"));
  if (source) {
    record.utm_source = source;
  }
  const medium = normalizeUtmMedium(searchParams.get("utm_medium"));
  if (medium) {
    record.utm_medium = medium;
  }
  const campaign = normalizeCampaign(searchParams.get("utm_campaign"));
  if (campaign) {
    record.utm_campaign = campaign;
  }
  const content = normalizeContent(searchParams.get("utm_content"));
  if (content) {
    record.utm_content = content;
  }
  const term = normalizeTerm(searchParams.get("utm_term"));
  if (term) {
    record.utm_term = term;
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