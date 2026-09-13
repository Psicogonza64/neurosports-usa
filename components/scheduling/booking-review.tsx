"use client";

import { Card } from "@/components/ui/card";
import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";
import type { BookingFormState, BookingStep } from "@/types/booking";

type BookingReviewProps = {
  content: BookingAssistantContent;
  state: BookingFormState;
  onJumpToStep: (step: BookingStep) => void;
};

export function BookingReview({ content, state, onJumpToStep }: BookingReviewProps) {
  const appointmentForLabel =
    content.appointmentFor.options.find((item) => item.value === state.appointmentFor)?.label ?? "-";
  const contactMethodLabel =
    content.contactOptions.find((item) => item.value === state.contactPreference)?.label ?? "-";

  const isFamilyFlow = state.appointmentFor === "family-member";
  const contactEmail = isFamilyFlow ? state.responsibleAdult.email : state.patient.email;
  const contactPhone = isFamilyFlow ? state.responsibleAdult.mobilePhone : state.patient.mobilePhone;

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg text-[var(--color-foreground)]">{content.stepTitles[1]}</h3>
          <button type="button" onClick={() => onJumpToStep(1)} className="min-h-11 rounded-full border px-4 text-sm">
            {content.editAppointmentLabel}
          </button>
        </div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="font-medium">{content.review.appointmentType}</dt><dd>{content.appointmentTypeLabel}</dd></div>
          <div><dt className="font-medium">{content.review.appointmentFor}</dt><dd>{appointmentForLabel}</dd></div>
        </dl>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg text-[var(--color-foreground)]">{content.stepTitles[2]}</h3>
          <button type="button" onClick={() => onJumpToStep(2)} className="min-h-11 rounded-full border px-4 text-sm">
            {content.editAppointmentLabel}
          </button>
        </div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="font-medium">{content.review.requestedDate}</dt><dd>{state.requestedDate || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.requestedTime}</dt><dd>{state.requestedTime || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.timezoneLabel}</dt><dd>{content.timezoneValue}</dd></div>
        </dl>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg text-[var(--color-foreground)]">{content.stepTitles[3]}</h3>
          <button type="button" onClick={() => onJumpToStep(3)} className="min-h-11 rounded-full border px-4 text-sm">
            {content.editPersonalInfoLabel}
          </button>
        </div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="font-medium">{content.review.patientName}</dt><dd>{`${state.patient.firstName} ${state.patient.lastName}`.trim() || content.review.notProvided}</dd></div>
          {isFamilyFlow ? (
            <div>
              <dt className="font-medium">{content.review.responsibleAdult}</dt>
              <dd>{`${state.responsibleAdult.firstName} ${state.responsibleAdult.lastName}`.trim() || content.review.notProvided}</dd>
            </div>
          ) : null}
          <div><dt className="font-medium">{content.review.email}</dt><dd>{contactEmail || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.phone}</dt><dd>{contactPhone || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.contactMethod}</dt><dd>{contactMethodLabel}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
