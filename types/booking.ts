export type BookingAssistantLocale = "en" | "es";

export type AppointmentType = "initial-evaluation";
export type AppointmentFor = "self" | "family-member";
export type ContactMethod = "email" | "phone" | "text";
export type FamilyRelationship =
  | "parent"
  | "spouse"
  | "adult-child"
  | "legal-guardian"
  | "other-family-member";

export type PreviousStudiesStatus = "no" | "yes" | "not-sure";
export type PreviousStudyType =
  | "brain-mri"
  | "ct-scan"
  | "eeg"
  | "previous-neuropsych-evaluation"
  | "psychological-or-psychiatric-evaluation"
  | "neurological-evaluation"
  | "school-or-academic-evaluation"
  | "other-relevant-report";

export type ReferralSource =
  | "physician-or-healthcare-professional"
  | "school"
  | "sports-organization-or-coach"
  | "family-or-friend"
  | "online-search"
  | "social-media"
  | "other";

export type ReasonCategory =
  | "attention-or-concentration"
  | "memory"
  | "learning-or-academic-concerns"
  | "developmental-concerns"
  | "neurological-condition"
  | "emotional-or-behavioral-concerns"
  | "cognitive-rehabilitation"
  | "sport-or-neuroperformance"
  | "other";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type BookingPatient = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobilePhone: string;
};

export type ResponsibleAdult = {
  firstName: string;
  lastName: string;
  relationship: FamilyRelationship | "";
};

export type BookingFormState = {
  appointmentType: AppointmentType;
  appointmentFor: AppointmentFor | "";
  requestedDate: string;
  requestedTime: string;
  patient: BookingPatient;
  contactPreference: ContactMethod | "";
  responsibleAdult: ResponsibleAdult;
  appointmentObjective: string;
  reasonCategories: ReasonCategory[];
  previousStudiesStatus: PreviousStudiesStatus | "";
  previousStudyTypes: PreviousStudyType[];
  referralSource: ReferralSource | "";
  additionalNote: string;
  consentAccepted: boolean;
};

export type BookingSubmissionPayload = {
  appointmentType: AppointmentType;
  appointmentFor: AppointmentFor;
  patient: BookingPatient;
  responsibleAdult: ResponsibleAdult | null;
  requestedDate: string;
  requestedTime: string;
  timezone: string;
  contactPreference: ContactMethod;
  reasonCategories: ReasonCategory[];
  appointmentObjective: string;
  previousStudiesStatus: PreviousStudiesStatus;
  previousStudyTypes: PreviousStudyType[];
  referralSource: ReferralSource | null;
  additionalNote: string;
  consentAccepted: boolean;
  submittedAt: string;
};

export type BookingSubmissionResponse = {
  requestReference?: string;
};

export type BookingFormErrors = Partial<Record<string, string>>;
