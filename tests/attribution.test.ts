import assert from "node:assert/strict";
import test from "node:test";

// @ts-expect-error Node's TypeScript test runner requires the explicit extension.
import { ATTRIBUTION_STORAGE_KEY, UTM_MAX_LENGTH, getBrowserSessionAttribution, getPathwayForCta, getSessionAttribution, normalizeReferringDomain, normalizeUtmToken, updateSessionPathway } from "../lib/attribution.ts";

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

test("accepts only the five approved, normalized UTM tokens", () => {
  const attribution = getSessionAttribution({
    pathname: "/",
    search: "?utm_source=Google&utm_medium=Paid_Social&utm_campaign=fall-2026&utm_content=hero~a&utm_term=brain-performance&email=test@example.com",
  });

  assert.deepEqual(attribution, {
    utm_source: "google",
    utm_medium: "paid_social",
    utm_campaign: "fall-2026",
    utm_content: "hero~a",
    utm_term: "brain-performance",
    landing_path: "/",
    pathway: "unknown",
  });
});

test("rejects oversize and invalid UTM values", () => {
  assert.equal(normalizeUtmToken("a".repeat(UTM_MAX_LENGTH + 1)), undefined);
  assert.equal(normalizeUtmToken("contains space"), undefined);
  assert.equal(normalizeUtmToken("email@example.com"), undefined);
  assert.equal(normalizeUtmToken("valid-token_1"), "valid-token_1");
});

test("referrer stores only the normalized HTTP hostname", () => {
  assert.equal(
    normalizeReferringDomain("https://Referral.Example.com/path?email=test@example.com#top"),
    "referral.example.com",
  );
  assert.equal(normalizeReferringDomain("mailto:test@example.com"), undefined);
  assert.equal(normalizeReferringDomain("not a URL"), undefined);
});

test("preserves first-touch fields across internal navigation while updating controlled pathway", () => {
  const storage = new MemoryStorage();
  const firstTouch = getSessionAttribution(
    {
      pathname: "/",
      search: "?utm_source=google",
      referrer: "https://search.example/results?q=neurosports",
    },
    storage,
  );
  const laterNavigation = getSessionAttribution(
    {
      pathname: "/schedule",
      search: "?utm_source=other",
      referrer: "https://other.example/path",
    },
    storage,
  );
  const updated = updateSessionPathway({ pathname: "/schedule" }, "home", storage);

  assert.deepEqual(laterNavigation, firstTouch);
  assert.deepEqual(updated, { ...firstTouch, pathway: "home" });
  assert.ok(storage.getItem(ATTRIBUTION_STORAGE_KEY));
});

test("maps only recognized schedule CTA locations to approved pathways", () => {
  assert.equal(getPathwayForCta("hero", "/schedule"), "home");
  assert.equal(getPathwayForCta("houston-location", "/schedule"), "houston");
  assert.equal(getPathwayForCta("header", "/schedule"), "site_navigation");
  assert.equal(getPathwayForCta("hero", "/research"), undefined);
  assert.equal(getPathwayForCta("unknown", "https://wa.me/18324579238"), undefined);
});

test("storage failures and malformed stored JSON fail safely", () => {
  const brokenStorage = {
    getItem: () => {
      throw new Error("unavailable");
    },
    setItem: () => {
      throw new Error("unavailable");
    },
  };
  const malformedStorage = {
    getItem: () => "{invalid json",
    setItem: () => undefined,
  };

  assert.doesNotThrow(() => getSessionAttribution({ pathname: "/schedule", search: "?utm_source=google" }, brokenStorage));
  assert.deepEqual(getSessionAttribution({ pathname: "/schedule", search: "?utm_source=google" }, malformedStorage), {
    utm_source: "google",
    landing_path: "/schedule",
    pathway: "schedule_direct",
  });
});

test("browser attribution access is SSR safe", () => {
  assert.equal(getBrowserSessionAttribution(), undefined);
});

test("landing paths exclude query strings and hashes", () => {
  const attribution = getSessionAttribution({
    pathname: "/schedule?email=sensitive@example.com#review",
  });

  assert.equal(attribution.landing_path, "/schedule");
});