"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getDestinationType, trackEvent } from "@/lib/analytics";

function AnalyticsListener() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (pathname && pathname !== lastTrackedPath.current) {
      lastTrackedPath.current = pathname;
      trackEvent("view_path", { page_path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      const ctaElement = target.closest?.("[data-cta]");
      if (!ctaElement) {
        return;
      }

      const ctaName = ctaElement.getAttribute("data-cta");
      if (!ctaName) {
        return;
      }

      const ctaLocation = ctaElement.getAttribute("data-location") || undefined;
      const pathway = ctaElement.getAttribute("data-pathway") || undefined;
      const href =
        ctaElement.getAttribute("href") ||
        (ctaElement as HTMLAnchorElement).href ||
        undefined;

      const destinationType = getDestinationType(href);

      trackEvent("cta_click", {
        cta_name: ctaName,
        cta_location: ctaLocation,
        destination_type: destinationType,
        pathway,
      });
    };

    document.addEventListener("click", handleDocumentClick, { capture: true, passive: true });

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}

export function AnalyticsProvider() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {measurementId ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                  send_page_view: false
                });
              `,
            }}
          />
        </>
      ) : null}
      <AnalyticsListener />
    </>
  );
}
