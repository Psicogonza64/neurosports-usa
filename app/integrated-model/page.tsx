import { SiteShell } from "@/components/layout/site-shell";
import { IntegratedModelPage } from "@/modules/website/integrated-model/page";

export default function IntegratedModelRoute() {
  return (
    <SiteShell>
      <IntegratedModelPage />
    </SiteShell>
  );
}