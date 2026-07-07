import { SiteShell } from "@/components/layout/site-shell";
import { TechnologyPage } from "@/modules/website/technology/page";

export default function TechnologyRoute() {
  return (
    <SiteShell>
      <TechnologyPage />
    </SiteShell>
  );
}