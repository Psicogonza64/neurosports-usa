"use client";

import { Card } from "@/components/ui/card";
import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";
import type { BookingFormState, BookingStep } from "@/types/booking";

type BookingReviewProps = {
  content: BookingAssistantContent;
  state: BookingFormState;
  onJumpToStep: (step: BookingStep) => void;
};

function joinValues(values: string[]) {
  return values.length > 0 ? values.join(", ") : "-";
}

export function BookingReview({ content, state, onJumpToStep }: BookingReviewProps) {
  const appointmentForLabel = content.appointmentFor.options.find((item) => item.value === state.appointmentFor)?.label ?? "-";
  const contactMethodLabel = content.contactOptions.find((item) => item.value === state.contactPreference)?.label ?? "-";
  const studiesStatusLabel = content.objective.studiesStatus.find((item) => item.value === state.previousStudiesStatus)?.label ?? "-";

  const categoryLabels = state.reasonCategories
    .map((value) => content.objective.categories.find((item) => item.value === value)?.label)
    .filter(Boolean) as string[];

  const studyLabels = state.previousStudyTypes
    .map((value) => content.objective.studiesTypes.find((item) => item.value === value)?.label)
    .filter(Boolean) as string[];

  const referralLabel = content.objective.referralSourceOptions.find((item) => item.value === state.referralSource)?.label;

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg text-[var(--color-foreground)]">{content.review.title}</h3>
          <button type="button" onClick={() => onJumpToStep(1)} className="min-h-11 rounded-full border px-4 text-sm">
            {content.editAppointmentLabel}
          </button>
        </div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="font-medium">{content.review.appointmentType}</dt><dd>{content.appointmentTypeLabel}</dd></div>
          <div><dt className="font-medium">{content.review.appointmentFor}</dt><dd>{appointmentForLabel}</dd></div>
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
          <div><dt className="font-medium">{content.review.email}</dt><dd>{state.patient.email || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.phone}</dt><dd>{state.patient.mobilePhone || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.contactMethod}</dt><dd>{contactMethodLabel}</dd></div>
          {state.appointmentFor === "family-member" ? (
            <div>
              <dt className="font-medium">{content.review.responsibleAdult}</dt>
              <dd>{`${state.responsibleAdult.firstName} ${state.responsibleAdult.lastName}`.trim() || content.review.notProvided}</dd>
            </div>
          ) : null}
        </dl>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg text-[var(--color-foreground)]">{content.stepTitles[4]}</h3>
          <button type="button" onClick={() => onJumpToStep(4)} className="min-h-11 rounded-full border px-4 text-sm">
            {content.editObjectiveLabel}
          </button>
        </div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div><dt className="font-medium">{content.review.primaryObjective}</dt><dd>{state.appointmentObjective || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.categories}</dt><dd>{joinValues(categoryLabels) || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.previousStudies}</dt><dd>{studiesStatusLabel}</dd></div>
          <div><dt className="font-medium">{content.review.previousStudyTypes}</dt><dd>{joinValues(studyLabels) || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.referralSource}</dt><dd>{referralLabel || content.review.notProvided}</dd></div>
          <div><dt className="font-medium">{content.review.additionalNote}</dt><dd>{state.additionalNote || content.review.notProvided}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
