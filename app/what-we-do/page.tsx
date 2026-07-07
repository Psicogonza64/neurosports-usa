import { SiteShell } from "@/components/layout/site-shell";
import { WhatWeDoPage } from "@/modules/website/what-we-do/page";

export default function WhatWeDoRoute() {
  return (
    <SiteShell>
      <WhatWeDoPage />
    </SiteShell>
  );
}