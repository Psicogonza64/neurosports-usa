"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";

type BookingConfirmationProps = {
  content: BookingAssistantContent;
  mode: "not-configured" | "error" | "success";
  requestReference?: string;
  requestedDate: string;
  requestedTime: string;
};

export function BookingConfirmation({
  content,
  mode,
  requestReference,
  requestedDate,
  requestedTime,
}: BookingConfirmationProps) {
  const heading =
    mode === "success"
      ? content.feedback.successTitle
      : mode === "error"
        ? content.feedback.errorTitle
        : content.feedback.notConfiguredTitle;

  const message =
    mode === "success"
      ? content.feedback.successMessage
      : mode === "error"
        ? content.feedback.errorMessage
        : content.feedback.notConfiguredMessage;

  return (
    <Card className="p-5 sm:p-6">
      <div className="space-y-3">
        <h3 className="text-xl text-[var(--color-foreground)]">{heading}</h3>
        <p className="text-sm leading-7 text-[var(--color-muted)]">{message}</p>

        {mode === "not-configured" ? (
          <p className="text-sm leading-7 text-[var(--color-muted)]">{content.feedback.contactFallback}</p>
        ) : null}

        {(mode === "success" || mode === "not-configured") && (requestedDate || requestedTime) ? (
          <div className="rounded-xl border p-3 text-sm">
            <p>{requestedDate}</p>
            <p>{requestedTime}</p>
            <p>{content.timezoneValue}</p>
          </div>
        ) : null}

        {mode === "success" && requestReference ? (
          <p className="text-sm"><strong>{content.feedback.referenceLabel}:</strong> {requestReference}</p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button href="/">{content.feedback.returnHome}</Button>
          <Button href="/#locations" variant="secondary">{content.feedback.viewHoustonCenter}</Button>
          {mode !== "success" ? (
            <Button href="/contact" variant="secondary">{content.contactFallbackLabel}</Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
