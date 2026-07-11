"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IntakeForm } from "@/components/scheduling/intake-form";
import { bookingAssistantContent } from "@/lib/neurosports-booking-content";
import { houstonBookingConfig } from "@/lib/neurosports-booking-config";
import type {
  BookingAssistantLocale,
  BookingFormErrors,
  BookingFormState,
  BookingStep,
  GoogleBookingStatus,
  PreviousStudyType,
} from "@/types/booking";

const OBJECTIVE_MAX = 600;

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
    email: "",
    mobilePhone: "",
  },
  appointmentObjective: "",
  reasonCategories: [],
  previousStudiesStatus: "",
  previousStudyTypes: [],
  referralSource: "",
  additionalNote: "",
  consentAccepted: false,
  googleBookingStatus: "",
};

function hasValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function hasValidPhone(value: string) {
  return /^[0-9()+\-\s]{7,}$/.test(value.trim());
}

function validateStep(step: BookingStep, state: BookingFormState, content: ReturnType<typeof getContent>) {
  const errors: BookingFormErrors = {};

  if (step === 1 && !state.appointmentFor) {
    errors.appointmentFor = content.validationSelectOne;
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

    if (state.appointmentFor === "self") {
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
      if (!state.responsibleAdult.email.trim()) {
        errors["responsibleAdult.email"] = content.validationRequired;
      } else if (!hasValidEmail(state.responsibleAdult.email)) {
        errors["responsibleAdult.email"] = content.invalidEmail;
      }
      if (!state.responsibleAdult.mobilePhone.trim()) {
        errors["responsibleAdult.mobilePhone"] = content.validationRequired;
      } else if (!hasValidPhone(state.responsibleAdult.mobilePhone)) {
        errors["responsibleAdult.mobilePhone"] = content.invalidPhone;
      }
    }

    if (!state.contactPreference) {
      errors.contactPreference = content.validationSelectOne;
    }

    if (!state.appointmentObjective.trim()) {
      errors.appointmentObjective = content.validationRequired;
    }
    if (state.appointmentObjective.length > OBJECTIVE_MAX) {
      errors.appointmentObjective = content.objectiveMaxError;
    }
  }

  if (step === 4) {
    if (!state.previousStudiesStatus) {
      errors.previousStudiesStatus = content.validationSelectOne;
    }
    if (state.previousStudiesStatus === "yes" && state.previousStudyTypes.length === 0) {
      errors.previousStudyTypes = content.validationSelectAtLeastOne;
    }
  }

  if (step === 5 && !state.googleBookingStatus) {
    errors.googleBookingStatus = content.validationSelectOne;
  }

  return errors;
}

function getContent(locale: BookingAssistantLocale) {
  return bookingAssistantContent[locale] ?? bookingAssistantContent.en;
}

export function BookingAssistant({ locale = "en" }: { locale?: BookingAssistantLocale }) {
  const content = getContent(locale);
  const [step, setStep] = useState<BookingStep>(1);
  const [state, setState] = useState<BookingFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<BookingFormErrors>({});

  const googleUrl = houstonBookingConfig.googleAppointmentScheduleUrl;
  const hasGoogleUrl = Boolean(googleUrl);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

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
        } else if (key === "lastName") {
          draft.responsibleAdult.lastName = value;
        } else if (key === "email") {
          draft.responsibleAdult.email = value;
        } else {
          draft.responsibleAdult.mobilePhone = value;
        }
        return draft;
      }

      if (path === "appointmentFor") {
        draft.appointmentFor = value as BookingFormState["appointmentFor"];

        if (value === "self") {
          draft.responsibleAdult = {
            firstName: "",
            lastName: "",
            relationship: "",
            email: "",
            mobilePhone: "",
          };
        }

        if (value === "family-member") {
          draft.patient.email = "";
          draft.patient.mobilePhone = "";
        }

        return draft;
      }

      if (path === "contactPreference") {
        draft.contactPreference = value as BookingFormState["contactPreference"];
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

      if (path === "googleBookingStatus") {
        draft.googleBookingStatus = value as BookingFormState["googleBookingStatus"];
        return draft;
      }

      return draft;
    });
  };

  const togglePreviousStudyType = (value: PreviousStudyType) => {
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

    setStep((current) => (current < 5 ? ((current + 1) as BookingStep) : current));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => (current > 1 ? ((current - 1) as BookingStep) : current));
  };

  const bookingStatus = state.googleBookingStatus as GoogleBookingStatus | "";

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
                  <span className="rounded-full border px-3 py-1">{content.privacyPolicyLabel}</span>
                  <span className="rounded-full border px-3 py-1">{content.termsOfUseLabel}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div aria-live="polite" className="text-sm text-[var(--color-muted)]">
              {content.stepTitles[step]} - {step} {content.progressLabel}
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
                  <div role="radiogroup" aria-label={content.appointmentFor.label} className="grid gap-3 sm:grid-cols-2">
                    {content.appointmentFor.options.map((option) => {
                      const id = `appointment-for-${option.value}`;
                      const checked = state.appointmentFor === option.value;

                      return (
                        <label
                          key={option.value}
                          htmlFor={id}
                          className={[
                            "flex min-h-11 cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
                            checked
                              ? "border-[color:color-mix(in_srgb,var(--color-secondary)_64%,var(--color-primary))] bg-[color:color-mix(in_srgb,var(--color-secondary)_12%,white)] text-[var(--ns-charcoal)]"
                              : "border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:border-[color:color-mix(in_srgb,var(--color-secondary)_34%,var(--color-border))]",
                          ].join(" ")}
                        >
                          <input
                            id={id}
                            type="radio"
                            name="appointment-for"
                            value={option.value}
                            checked={checked}
                            onChange={(event) => {
                              setErrors((current) => {
                                const nextErrors = { ...current };
                                delete nextErrors.appointmentFor;
                                return nextErrors;
                              });
                              updateField("appointmentFor", event.target.value);
                            }}
                            className="h-4 w-4 border-[var(--color-border)] text-[var(--color-secondary)]"
                          />
                          <span className="ml-3 flex-1 text-sm font-medium">{option.label}</span>
                          <span
                            aria-hidden="true"
                            className={[
                              "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                              checked
                                ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-[var(--ns-charcoal)]"
                                : "border-[var(--color-border)] text-transparent",
                            ].join(" ")}
                          >
                            •
                          </span>
                        </label>
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
                <div className="space-y-4 rounded-xl border border-[color:color-mix(in_srgb,var(--color-secondary)_20%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-secondary)_7%,white)] p-5">
                  <p className="text-sm leading-7 text-[var(--color-muted)]">{content.googleStepDescription}</p>
                  {hasGoogleUrl ? (
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--ns-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_46%,white)]"
                    >
                      {content.googleStepActionLabel}
                    </a>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-7 text-[var(--color-muted)]">{content.googleStepFallbackMessage}</p>
                      <Button href="/contact" variant="secondary">{content.googleStepFallbackAction}</Button>
                    </div>
                  )}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-5">
                  <IntakeForm content={content} state={state} errors={errors} onFieldChange={updateField} />
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
                </div>
              ) : null}

              {step === 4 ? (
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
                      {errors.previousStudyTypes ? <p className="text-sm text-[var(--color-danger)]">{errors.previousStudyTypes}</p> : null}
                    </div>
                  ) : null}

                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{content.objective.studiesHelp}</p>
                </fieldset>
              ) : null}

              {step === 5 ? (
                <div className="space-y-5">
                  <fieldset className="space-y-3 rounded-lg border p-4">
                    <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.googleCompletionQuestion}</legend>
                    {content.googleCompletionOptions.map((option) => (
                      <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="google-booking-status"
                          value={option.value}
                          checked={bookingStatus === option.value}
                          onChange={(event) => updateField("googleBookingStatus", event.target.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                    {errors.googleBookingStatus ? <p className="text-sm text-[var(--color-danger)]">{errors.googleBookingStatus}</p> : null}
                  </fieldset>

                  {bookingStatus === "booked" ? (
                    <Card className="border-dashed p-4">
                      <p className="text-sm text-[var(--color-foreground)]">{content.googleCompletionBookedTitle}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{content.googleCompletionBookedText}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
                        {content.googleCompletionPreparationItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Card>
                  ) : null}

                  {bookingStatus === "not-yet" && hasGoogleUrl ? (
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--ns-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--color-primary)_46%,white)]"
                    >
                      {content.googleStepActionLabel}
                    </a>
                  ) : null}

                  {bookingStatus === "need-help" ? (
                    <Link
                      href="/contact"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-foreground)]"
                    >
                      {content.googleCompletionHelpLabel}
                    </Link>
                  ) : null}
                </div>
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
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
