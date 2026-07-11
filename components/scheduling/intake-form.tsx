"use client";

import type { BookingAssistantContent } from "@/lib/neurosports-booking-content";
import type { BookingFormErrors, BookingFormState } from "@/types/booking";

type IntakeFormProps = {
  content: BookingAssistantContent;
  state: BookingFormState;
  errors: BookingFormErrors;
  onFieldChange: (path: string, value: string) => void;
};

function FieldError({ error, id }: { error?: string; id: string }) {
  if (!error) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-sm text-[var(--color-danger)]" role="alert">
      {error}
    </p>
  );
}

export function IntakeForm({ content, state, errors, onFieldChange }: IntakeFormProps) {
  const isFamilyFlow = state.appointmentFor === "family-member";

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-[var(--color-foreground)]" htmlFor="patient-first-name">
          {content.patientInfo.firstName}
          <input
            id="patient-first-name"
            name="patient-first-name"
            autoComplete="given-name"
            value={state.patient.firstName}
            onChange={(event) => onFieldChange("patient.firstName", event.target.value)}
            aria-invalid={Boolean(errors["patient.firstName"])}
            aria-describedby={errors["patient.firstName"] ? "patient-first-name-error" : undefined}
            className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
          />
          <FieldError id="patient-first-name-error" error={errors["patient.firstName"]} />
        </label>

        <label className="text-sm text-[var(--color-foreground)]" htmlFor="patient-last-name">
          {content.patientInfo.lastName}
          <input
            id="patient-last-name"
            name="patient-last-name"
            autoComplete="family-name"
            value={state.patient.lastName}
            onChange={(event) => onFieldChange("patient.lastName", event.target.value)}
            aria-invalid={Boolean(errors["patient.lastName"])}
            aria-describedby={errors["patient.lastName"] ? "patient-last-name-error" : undefined}
            className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
          />
          <FieldError id="patient-last-name-error" error={errors["patient.lastName"]} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-[var(--color-foreground)]" htmlFor="patient-dob">
          {content.patientInfo.dob}
          <input
            id="patient-dob"
            name="patient-dob"
            type="date"
            autoComplete="bday"
            value={state.patient.dateOfBirth}
            onChange={(event) => onFieldChange("patient.dateOfBirth", event.target.value)}
            aria-invalid={Boolean(errors["patient.dateOfBirth"])}
            className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
          />
          <FieldError id="patient-dob-error" error={errors["patient.dateOfBirth"]} />
        </label>

        {!isFamilyFlow ? (
          <label className="text-sm text-[var(--color-foreground)]" htmlFor="patient-email">
            {content.patientInfo.email}
            <input
              id="patient-email"
              name="patient-email"
              type="email"
              autoComplete="email"
              value={state.patient.email}
              onChange={(event) => onFieldChange("patient.email", event.target.value)}
              aria-invalid={Boolean(errors["patient.email"])}
              className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
            />
            <FieldError id="patient-email-error" error={errors["patient.email"]} />
          </label>
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
      </div>

      {!isFamilyFlow ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-[var(--color-foreground)]" htmlFor="patient-phone">
            {content.patientInfo.mobilePhone}
            <input
              id="patient-phone"
              name="patient-phone"
              type="tel"
              autoComplete="tel"
              value={state.patient.mobilePhone}
              onChange={(event) => onFieldChange("patient.mobilePhone", event.target.value)}
              aria-invalid={Boolean(errors["patient.mobilePhone"])}
              className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
            />
            <FieldError id="patient-phone-error" error={errors["patient.mobilePhone"]} />
          </label>

          <fieldset className="min-w-0 rounded-lg border p-3">
            <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.patientInfo.preferredContactMethod}</legend>
            <div className="grid gap-2">
              {content.contactOptions.map((option) => (
                <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="contact-method"
                    value={option.value}
                    checked={state.contactPreference === option.value}
                    onChange={(event) => onFieldChange("contactPreference", event.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <FieldError id="contact-method-error" error={errors.contactPreference} />
          </fieldset>
        </div>
      ) : null}

      {isFamilyFlow ? (
        <fieldset className="rounded-lg border p-4">
          <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.patientInfo.responsibleAdultHeading}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--color-foreground)]" htmlFor="responsible-first-name">
              {content.patientInfo.responsibleFirstName}
              <input
                id="responsible-first-name"
                autoComplete="given-name"
                value={state.responsibleAdult.firstName}
                onChange={(event) => onFieldChange("responsibleAdult.firstName", event.target.value)}
                aria-invalid={Boolean(errors["responsibleAdult.firstName"])}
                className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
              />
              <FieldError id="responsible-first-name-error" error={errors["responsibleAdult.firstName"]} />
            </label>

            <label className="text-sm text-[var(--color-foreground)]" htmlFor="responsible-last-name">
              {content.patientInfo.responsibleLastName}
              <input
                id="responsible-last-name"
                autoComplete="family-name"
                value={state.responsibleAdult.lastName}
                onChange={(event) => onFieldChange("responsibleAdult.lastName", event.target.value)}
                aria-invalid={Boolean(errors["responsibleAdult.lastName"])}
                className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
              />
              <FieldError id="responsible-last-name-error" error={errors["responsibleAdult.lastName"]} />
            </label>
          </div>

          <label className="mt-4 block text-sm text-[var(--color-foreground)]" htmlFor="responsible-relationship">
            {content.patientInfo.relationship}
            <select
              id="responsible-relationship"
              value={state.responsibleAdult.relationship}
              onChange={(event) => onFieldChange("responsibleAdult.relationship", event.target.value)}
              aria-invalid={Boolean(errors["responsibleAdult.relationship"])}
              className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
            >
              <option value="">{content.selectPlaceholder}</option>
              {content.relationshipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FieldError id="responsible-relationship-error" error={errors["responsibleAdult.relationship"]} />
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--color-foreground)]" htmlFor="responsible-email">
              {content.patientInfo.responsibleEmail}
              <input
                id="responsible-email"
                name="responsible-email"
                type="email"
                autoComplete="email"
                value={state.responsibleAdult.email}
                onChange={(event) => onFieldChange("responsibleAdult.email", event.target.value)}
                aria-invalid={Boolean(errors["responsibleAdult.email"])}
                className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
              />
              <FieldError id="responsible-email-error" error={errors["responsibleAdult.email"]} />
            </label>

            <label className="text-sm text-[var(--color-foreground)]" htmlFor="responsible-phone">
              {content.patientInfo.responsibleMobilePhone}
              <input
                id="responsible-phone"
                name="responsible-phone"
                type="tel"
                autoComplete="tel"
                value={state.responsibleAdult.mobilePhone}
                onChange={(event) => onFieldChange("responsibleAdult.mobilePhone", event.target.value)}
                aria-invalid={Boolean(errors["responsibleAdult.mobilePhone"])}
                className="mt-1 min-h-11 w-full rounded-lg border px-3 py-2"
              />
              <FieldError id="responsible-phone-error" error={errors["responsibleAdult.mobilePhone"]} />
            </label>
          </div>

          <fieldset className="mt-4 min-w-0 rounded-lg border p-3">
            <legend className="px-1 text-sm text-[var(--color-foreground)]">{content.patientInfo.preferredContactMethod}</legend>
            <div className="grid gap-2">
              {content.contactOptions.map((option) => (
                <label key={option.value} className="flex min-h-11 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="contact-method"
                    value={option.value}
                    checked={state.contactPreference === option.value}
                    onChange={(event) => onFieldChange("contactPreference", event.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <FieldError id="contact-method-error" error={errors.contactPreference} />
          </fieldset>
        </fieldset>
      ) : null}
    </div>
  );
}
