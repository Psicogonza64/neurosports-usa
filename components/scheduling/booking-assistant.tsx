"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppointmentCalendar } from "@/components/scheduling/appointment-calendar";
import { BookingConfirmation } from "@/components/scheduling/booking-confirmation";
import { BookingReview } from "@/components/scheduling/booking-review";
import { IntakeForm } from "@/components/scheduling/intake-form";
import { bookingAssistantContent, type BookingAssistantContent } from "@/lib/neurosports-booking-content";
import { houstonBookingConfig } from "@/lib/neurosports-booking-config";
import type {
  BookingAssistantLocale,
  BookingFormErrors,
  BookingFormState,
  BookingStep,
  BookingSubmissionPayload,
  BookingSubmissionResponse,
  ContactMethod,
  PreviousStudiesStatus,
  ReasonCategory,
} from "@/types/booking";

const OBJECTIVE_MAX = 600;
const ADDITIONAL_NOTE_MAX = 300;

const INITIAL_STATE: BookingFormState = {
  appointmentType: "initial-evaluation",
  appointmentFor: "",
  requestedDate: "",
  requestedTime: "",
  patient: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobilePhone: "",
  },
  contactPreference: "",
  responsibleAdult: {
    firstName: "",
    lastName: "",
    relationship: "",
  },
  appointmentObjective: "",
  reasonCategories: [],
  previousStudiesStatus: "",
  previousStudyTypes: [],
  referralSource: "",
  additionalNote: "",
  consentAccepted: false,
};

function hasValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function hasValidPhone(value: string) {
  return /^[0-9()+\-\s]{7,}$/.test(value.trim());
}

function buildPayload(state: BookingFormState): BookingSubmissionPayload {
  return {
    appointmentType: state.appointmentType,
    appointmentFor: state.appointmentFor as BookingSubmissionPayload["appointmentFor"],
    patient: state.patient,
    responsibleAdult:
      state.appointmentFor === "family-member"
        ? {
            firstName: state.responsibleAdult.firstName,
            lastName: state.responsibleAdult.lastName,
            relationship: state.responsibleAdult.relationship,
          }
        : null,
    requestedDate: state.requestedDate,
    requestedTime: state.requestedTime,
    timezone: houstonBookingConfig.timezone,
    contactPreference: state.contactPreference as ContactMethod,
    reasonCategories: state.reasonCategories,
    appointmentObjective: state.appointmentObjective,
    previousStudiesStatus: state.previousStudiesStatus as PreviousStudiesStatus,
    previousStudyTypes: state.previousStudyTypes,
    referralSource: state.referralSource || null,
    additionalNote: state.additionalNote,
    consentAccepted: state.consentAccepted,
    submittedAt: new Date().toISOString(),
  };
}

function validateStep(step: BookingStep, state: BookingFormState, content: BookingAssistantContent) {
  const errors: BookingFormErrors = {};

  if (step === 1) {
    if (!state.appointmentFor) {
      errors.appointmentFor = content.validationSelectOne;
    }
  }

  if (step === 2) {
    if (!state.requestedDate) {
      errors.requestedDate = content.validationRequired;
    }
    if (!state.requestedTime) {
      errors.requestedTime = content.validationRequired;
    }
  }

  if (step === 3) {
    if (!state.patient.firstName.trim()) {
      errors["patient.firstName"] = content.validationRequired;
    }
    if (!state.patient.lastName.trim()) {
      errors["patient.lastName"] = content.validationRequired;
    }
    if (!state.patient.dateOfBirth) {
      errors["patient.dateOfBirth"] = content.validationRequired;
    }
    if (!state.patient.email.trim()) {
      errors["patient.email"] = content.validationRequired;
    } else if (!hasValidEmail(state.patient.email)) {
      errors["patient.email"] = content.invalidEmail;
    }
    if (!state.patient.mobilePhone.trim()) {
      errors["patient.mobilePhone"] = content.validationRequired;
    } else if (!hasValidPhone(state.patient.mobilePhone)) {
      errors["patient.mobilePhone"] = content.invalidPhone;
    }
    if (!state.contactPreference) {
      errors.contactPreference = content.validationSelectOne;
    }

    if (state.appointmentFor === "family-member") {
      if (!state.responsibleAdult.firstName.trim()) {
        errors["responsibleAdult.firstName"] = content.validationRequired;
      }
      if (!state.responsibleAdult.lastName.trim()) {
        errors["responsibleAdult.lastName"] = content.validationRequired;
      }
      if (!state.responsibleAdult.relationship) {
        errors["responsibleAdult.relationship"] = content.validationSelectOne;
      }
    }
  }

  if (step === 4) {
    if (!state.appointmentObjective.trim()) {
      errors.appointmentObjective = content.validationRequired;
    }
    if (state.appointmentObjective.length > OBJECTIVE_MAX) {
      errors.appointmentObjective = content.objectiveMaxError;
    }
    if (state.reasonCategories.length === 0) {
      errors.reasonCategories = content.validationSelectAtLeastOne;
    }
    if (!state.previousStudiesStatus) {
      errors.previousStudiesStatus = content.validationSelectOne;
    }
  }

  if (step === 5 && !state.consentAccepted) {
    errors.consentAccepted = content.validationConsent;
  }

  return errors;
}

export function BookingAssistant({ locale = "en" }: { locale?: BookingAssistantLocale }) {
  const content = bookingAssistantContent[locale] ?? bookingAssistantContent.en;
  const [step, setStep] = useState<BookingStep>(1);
  const [state, setState] = useState<BookingFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "not-configured" | "error" | "success">("idle");
  const [requestReference, setRequestReference] = useState<string | undefined>();

  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const progressText = `${step} ${content.progressLabel}`;
  const endpoint = houstonBookingConfig.submissionEndpoint;

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  const payloadPreview = useMemo(() => {
    const isReady = state.appointmentFor && state.requestedDate && state.requestedTime;
    if (!isReady) {
      return null;
    }

    return buildPayload(state);
  }, [state]);

  const updateField = (path: string, value: string) => {
    setState((current) => {
      const draft: BookingFormState = {
        ...current,
        patient: { ...current.patient },
        responsibleAdult: { ...current.responsibleAdult },
      };

      if (path.startsWith("patient.")) {
        const key = path.replace("patient.", "") as keyof BookingFormState["patient"];
        draft.patient[key] = value;
        return draft;
      }

      if (path.startsWith("responsibleAdult.")) {
        const key = path.replace("responsibleAdult.", "") as keyof BookingFormState["responsibleAdult"];
        if (key === "relationship") {
          draft.responsibleAdult.relationship = value as BookingFormState["responsibleAdult"]["relationship"];
        } else if (key === "firstName") {
          draft.responsibleAdult.firstName = value;
        } else {
          draft.responsibleAdult.lastName = value;
        }
        return draft;
      }

      if (path === "contactPreference") {
        draft.contactPreference = value as BookingFormState["contactPreference"];
        return draft;
      }

      if (path === "requestedDate") {
        draft.requestedDate = value;
        return draft;
      }

      if (path === "requestedTime") {
        draft.requestedTime = value;
        return draft;
      }

      if (path === "appointmentFor") {
        draft.appointmentFor = value as BookingFormState["appointmentFor"];
        return draft;
      }

      if (path === "appointmentObjective") {
        draft.appointmentObjective = value.slice(0, OBJECTIVE_MAX);
        return draft;
      }

      if (path === "previousStudiesStatus") {
        draft.previousStudiesStatus = value as BookingFormState["previousStudiesStatus"];
        if (value !== "yes") {
          draft.previousStudyTypes = [];
        }
        return draft;
      }

      if (path === "referralSource") {
        draft.referralSource = value as BookingFormState["referralSource"];
        return draft;
      }

      if (path === "additionalNote") {
        draft.additionalNote = value.slice(0, ADDITIONAL_NOTE_MAX);
      }

      return draft;
    });
  };

  const toggleReasonCategory = (value: ReasonCategory) => {
    setState((current) => {
      const exists = current.reasonCategories.includes(value);
      return {
        ...current,
        reasonCategories: exists
          ? current.reasonCategories.filter((item) => item !== value)
          : [...current.reasonCategories, value],
      };
    });
  };

  const togglePreviousStudyType = (value: BookingFormState["previousStudyTypes"][number]) => {
    setState((current) => {
      const exists = current.previousStudyTypes.includes(value);
      return {
        ...current,
        previousStudyTypes: exists
          ? current.previousStudyTypes.filter((item) => item !== value)
          : [...current.previousStudyTypes, value],
      };
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, state, content);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      return;
    }

    setStatus("idle");
    setStep((current) => (current < 5 ? ((current + 1) as BookingStep) : current));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => (current > 1 ? ((current - 1) as BookingStep) : current));
  };

  const submit = async () => {
    const reviewErrors = validateStep(5, state, content);
    setErrors(reviewErrors);

    if (Object.keys(reviewErrors).length > 0 || isSubmitting) {
      return;
    }

    if (!endpoint) {
      setStatus("not-configured");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const payload = buildPayload(state);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      const data = (await response.json()) as BookingSubmissionResponse;
      setRequestReference(data.requestReference);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-b nsu-border" id="schedule">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6">
          <p className="nsu-kicker text-xs font-medium uppercase tracking-[0.26em]">SCHEDULE</p>
          <h1 className="text-4xl tracking-tight text-[var(--color-foreground)] sm:text-5xl">{content.pageTitle}</h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{content.pageDescription}</p>

          <Card className="p-4 sm:p-6">
            <div className="space-y-4">
              <p className="text-sm leading-7 text-[var(--color-muted)]">{content.emergencyNotice}</p>
              <p className="text-sm leading-7 text-[var(--color-muted)]">{content.privacyNotice}</p>
              <div className="text-sm text-[var(--color-muted)]">
                <p>{content.privacyLinksLabel}</p>
                <div className="flex flex-wrap gap-3">
                  {/* TODO: Add real Privacy Policy route when available. */}
                  <span className="rounded-full border px-3 py-1">{content.privacyPolicyLabel}</span>
                  {/* TODO: Add real Terms of Use route when available. */}
                  <span className="rounded-full border px-3 py-1">{content.termsOfUseLabel}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div aria-live="polite" className="text-sm text-[var(--color-muted)]">
              {content.stepTitles[step]} - {progressText}
            </div>
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              className="mt-2 text-2xl tracking-tight text-[var(--color-foreground)] focus:outline-none"
            >
              {step === 1 && content.stepHeadings.appointment}
              {step === 2 && content.stepHeadings.dateTime}
              {step === 3 && content.stepHeadings.patientInfo}
              {step === 4 && content.stepHeadings.objective}
              {step === 5 && content.stepHeadings.review}
            </h2>

            <div className="mt-5 space-y-6">
              {step === 1 ? (
                <fieldset className="space-y-4">
                  <legend className="text-sm text-[var(--color-foreground)]">{content.appointmentFor.label}</legend>
                  <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={content.appointmentFor.label}>
                    {content.appointmentFor.options.map((option) => {
                      const checked = state.appointmentFor === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={checked}
                          onClick={() => updateField("appointmentFor", option.value)}
                          className="min-h-11 rounded-xl border px-4 py-3 text-left"
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.appointmentFor ? <p className="text-sm text-[var(--color-danger)]">{errors.appointmentFor}</p> : null}

                  <div className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-primary)_8%,white)] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-secondary)]/85">{content.appointmentTypeLabel}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{content.appointmentTypeDescription}</p>
                  </div>
                </fieldset>
              ) : null}

              {step === 2 ? (
                <AppointmentCalendar
                  content={content}
                  selectedDate={state.requestedDate}
                  selectedTime={state.requestedTime}
                  dateError={errors.requestedDate}
                  timeError={errors.requestedTime}
                  onSelectDate={(value) => updateField("requestedDate", value)}
                  onSelectTime={(value) => updateField("requestedTime", value)}
                />
              ) : null}

              {step === 3 ? (
                <IntakeForm content={content} state={state} errors={errors} onFieldChange={updateField} />
              ) : null}

              {step === 4 ? (
                <div className="space-y-5">
                  <label htmlFor="appointment-objective" className="block text-sm text-[var(--color-foreground)]">
                    {content.objective.label}
                    <textarea
                      id="appointment-objective"
                      rows={5}
                      maxLength={OBJECTIVE_MAX}
                      value={state.appointmentObjective}
                      onChange={(event) => updateField("appointmentObjective", event.target.value)}
                      aria-invalid={Boolean(errors.appointmentObjective)}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                    />
                  </label>
                  <p className="text-sm text-[var(--color-muted)]">{content.objective.helper}</p>
                  <p className="text-xs text-[var(--color-muted)]">{state.appointmentObjective.length}/{OBJECTIVE_MAX}</p>
                  {errors.appointmentObjective ? <p className="text-sm text-[var(--color-danger)]">{errors.appointmentObjective}</p> : null}

                  <fieldset className="rounded-lg border p-4">
                    <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.objective.categoriesLabel}</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {content.objective.categories.map((option) => {
                        const checked = state.reasonCategories.includes(option.value);
                        return (
                          <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleReasonCategory(option.value)}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.reasonCategories ? <p className="text-sm text-[var(--color-danger)]">{errors.reasonCategories}</p> : null}
                  </fieldset>

                  <fieldset className="rounded-lg border p-4">
                    <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.objective.studiesQuestion}</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {content.objective.studiesStatus.map((statusOption) => (
                        <label key={statusOption.value} className="flex min-h-11 items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="previous-studies-status"
                            value={statusOption.value}
                            checked={state.previousStudiesStatus === statusOption.value}
                            onChange={(event) => updateField("previousStudiesStatus", event.target.value)}
                          />
                          <span>{statusOption.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.previousStudiesStatus ? <p className="text-sm text-[var(--color-danger)]">{errors.previousStudiesStatus}</p> : null}

                    {state.previousStudiesStatus === "yes" ? (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-[var(--color-foreground)]">{content.objective.studiesTypesLabel}</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {content.objective.studiesTypes.map((study) => {
                            const checked = state.previousStudyTypes.includes(study.value);
                            return (
                              <label key={study.value} className="flex min-h-11 items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => togglePreviousStudyType(study.value)}
                                />
                                <span>{study.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}

                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{content.objective.studiesHelp}</p>
                  </fieldset>

                  <label htmlFor="referral-source" className="block text-sm text-[var(--color-foreground)]">
                    {content.objective.referralSourceLabel}
                    <select
                      id="referral-source"
                      value={state.referralSource}
                      onChange={(event) => updateField("referralSource", event.target.value)}
                      className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
                    >
                      <option value="">{content.selectPlaceholder}</option>
                      {content.objective.referralSourceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor="additional-note" className="block text-sm text-[var(--color-foreground)]">
                    {content.objective.additionalNoteLabel}
                    <textarea
                      id="additional-note"
                      rows={4}
                      maxLength={ADDITIONAL_NOTE_MAX}
                      value={state.additionalNote}
                      onChange={(event) => updateField("additionalNote", event.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                    />
                  </label>
                  <p className="text-sm text-[var(--color-muted)]">{content.objective.additionalNoteHelp}</p>
                  <p className="text-xs text-[var(--color-muted)]">{state.additionalNote.length}/{ADDITIONAL_NOTE_MAX}</p>
                </div>
              ) : null}

              {step === 5 ? (
                <div className="space-y-5">
                  <BookingReview content={content} state={state} onJumpToStep={setStep} />
                  <label className="flex min-h-11 items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={state.consentAccepted}
                      onChange={(event) => setState((current) => ({ ...current, consentAccepted: event.target.checked }))}
                    />
                    <span>{content.review.consentLabel}</span>
                  </label>
                  {errors.consentAccepted ? <p className="text-sm text-[var(--color-danger)]">{errors.consentAccepted}</p> : null}
                </div>
              ) : null}

              {status !== "idle" ? (
                <BookingConfirmation
                  content={content}
                  mode={status}
                  requestReference={requestReference}
                  requestedDate={state.requestedDate}
                  requestedTime={state.requestedTime}
                />
              ) : null}

              {!endpoint && payloadPreview ? (
                <Card className="border-dashed p-4">
                  <p className="text-sm text-[var(--color-muted)]">
                    Secure backend submission is required to persist appointment requests.
                  </p>
                </Card>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={goBack}>
                  {content.backLabel}
                </Button>
              ) : null}

              {step < 5 ? (
                <Button type="button" onClick={goNext}>
                  {content.nextLabel}
                </Button>
              ) : (
                <Button type="button" onClick={submit} disabled={isSubmitting}>
                  {isSubmitting ? content.submittingLabel : content.submitLabel}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
