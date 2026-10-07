import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { sanitizeEventPayload } from "../lib/analytics.ts";
import { getNeuroSportsHomeContent } from "../lib/neurosports-home-content.ts";
import { twoPathsHeroContent } from "../lib/neurosports-two-paths-content.ts";

test("hero paths retain the established destinations and distinct controlled CTA names", () => {
  const establishedPaths = getNeuroSportsHomeContent("en").applications.pathways;
  assert.equal(twoPathsHeroContent.paths.length, 2);
  assert.equal(new Set(twoPathsHeroContent.paths.map((path) => path.ctaName)).size, 2);

  for (const path of twoPathsHeroContent.paths) {
    assert.equal(path.ctaHref, establishedPaths.find((item) => item.id === path.id)?.ctaHref);
    assert.deepEqual(
      sanitizeEventPayload("cta_click", {
        cta_name: path.ctaName,
        cta_location: "hero",
        destination_type: "internal",
      }),
      { cta_name: path.ctaName, cta_location: "hero", destination_type: "internal" },
    );
  }
});

test("Home reuses one neutral brain without Journey UI and keeps scientific process after Hero", () => {
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const hero = readFileSync(new URL("../modules/website/home/sections/hero-section.tsx", import.meta.url), "utf8");
  assert.match(home, /<HeroSection \/>\s*<PublicProcessesSection \/>/);
  assert.doesNotMatch(home, /ApplicationsSection/);
  assert.equal((hero.match(/<InteractiveBrain3D\b/g) ?? []).length, 1);
  assert.match(hero, /<InteractiveBrain3D activeNodeId=\{null\}/);
  assert.doesNotMatch(hero, /ScientificJourneyDiagram|order-[12]/);
  assert.ok(hero.indexOf('id="home-hero-title"') < hero.indexOf("<InteractiveBrain3D"));
  assert.match(hero, /<figure aria-labelledby="home-science-title"/);
  assert.match(hero, /Functional Brain Science/);
  assert.doesNotMatch(hero, /Learn more|DetailPanel|NodeButton/);
});
