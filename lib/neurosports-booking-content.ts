import type {
  BookingAssistantLocale,
  ContactMethod,
  FamilyRelationship,
  PreviousStudyType,
  ReasonCategory,
  ReferralSource,
} from "@/types/booking";

type LocalizedOption<T extends string> = {
  value: T;
  label: string;
};

export type BookingAssistantContent = {
  locale: BookingAssistantLocale;
  pageTitle: string;
  pageDescription: string;
  emergencyNotice: string;
  privacyNotice: string;
  privacyLinksLabel: string;
  privacyPolicyLabel: string;
  termsOfUseLabel: string;
  progressLabel: string;
  requestedTimeLabel: string;
  timezoneLabel: string;
  timezoneValue: string;
  appointmentTypeLabel: string;
  appointmentTypeDescription: string;
  unavailableSundayLabel: string;
  previousMonthLabel: string;
  nextMonthLabel: string;
  selectPlaceholder: string;
  selectDateHint: string;
  contactFallbackLabel: string;
  objectiveMaxError: string;
  googleStepDescription: string;
  googleStepActionLabel: string;
  googleStepFallbackMessage: string;
  googleStepFallbackAction: string;
  googleCompletionQuestion: string;
  googleCompletionOptions: LocalizedOption<"booked" | "not-yet" | "need-help">[];
  googleCompletionBookedTitle: string;
  googleCompletionBookedText: string;
  googleCompletionPreparationItems: string[];
  googleCompletionHelpLabel: string;
  nextLabel: string;
  backLabel: string;
  submitLabel: string;
  submittingLabel: string;
  editAppointmentLabel: string;
  editPersonalInfoLabel: string;
  editObjectiveLabel: string;
  validationRequired: string;
  validationSelectOne: string;
  validationSelectAtLeastOne: string;
  validationConsent: string;
  invalidEmail: string;
  invalidPhone: string;
  stepTitles: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  stepHeadings: {
    appointment: string;
    dateTime: string;
    patientInfo: string;
    objective: string;
    review: string;
  };
  appointmentFor: {
    label: string;
    options: LocalizedOption<"self" | "family-member">[];
  };
  patientInfo: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    mobilePhone: string;
    preferredContactMethod: string;
    responsibleAdultHeading: string;
    responsibleFirstName: string;
    responsibleLastName: string;
    relationship: string;
    responsibleEmail: string;
    responsibleMobilePhone: string;
  };
  contactOptions: LocalizedOption<ContactMethod>[];
  relationshipOptions: LocalizedOption<FamilyRelationship>[];
  objective: {
    heading: string;
    label: string;
    helper: string;
    categoriesLabel: string;
    categories: LocalizedOption<ReasonCategory>[];
    studiesQuestion: string;
    studiesStatus: LocalizedOption<"no" | "yes" | "not-sure">[];
    studiesTypesLabel: string;
    studiesTypes: LocalizedOption<PreviousStudyType>[];
    studiesHelp: string;
    referralSourceLabel: string;
    referralSourceOptions: LocalizedOption<ReferralSource>[];
    additionalNoteLabel: string;
    additionalNoteHelp: string;
  };
  review: {
    title: string;
    appointmentType: string;
    appointmentFor: string;
    patientName: string;
    responsibleAdult: string;
    requestedDate: string;
    requestedTime: string;
    email: string;
    phone: string;
    contactMethod: string;
    primaryObjective: string;
    categories: string;
    previousStudies: string;
    previousStudyTypes: string;
    referralSource: string;
    additionalNote: string;
    notProvided: string;
    consentLabel: string;
  };
  feedback: {
    notConfiguredTitle: string;
    notConfiguredMessage: string;
    contactFallback: string;
    errorTitle: string;
    errorMessage: string;
    successTitle: string;
    successMessage: string;
    returnHome: string;
    viewHoustonCenter: string;
    referenceLabel: string;
  };
};

export const bookingAssistantContent: Record<BookingAssistantLocale, BookingAssistantContent> = {
  en: {
    locale: "en",
    pageTitle: "Schedule an Initial Evaluation",
    pageDescription:
      "Request an Initial Evaluation at the NeuroSports USA Houston Center. Do not upload or include extensive medical records. Our team will provide secure instructions if documents are needed.",
    emergencyNotice:
      "This scheduling form is not monitored for emergencies. If immediate medical assistance is required, contact local emergency services.",
    privacyNotice:
      "Please provide only the information needed to request the appointment. Do not submit emergency information or extensive medical records through this form.",
    privacyLinksLabel: "Policy references",
    privacyPolicyLabel: "Privacy Policy",
    termsOfUseLabel: "Terms of Use",
    progressLabel: "of 5",
    requestedTimeLabel: "Requested appointment time",
    timezoneLabel: "Timezone",
    timezoneValue: "Central Time - Houston",
    appointmentTypeLabel: "Initial Evaluation",
    appointmentTypeDescription:
      "An individualized functional evaluation designed to understand cognitive strengths, functional needs and priorities for clinical or NeuroPerformance planning.",
    unavailableSundayLabel: "Sunday is unavailable",
    previousMonthLabel: "Prev",
    nextMonthLabel: "Next",
    selectPlaceholder: "Select",
    selectDateHint: "Select a date to view available times.",
    contactFallbackLabel: "Contact",
    objectiveMaxError: "Maximum 300 characters.",
    googleStepDescription:
      "Our secure Google Calendar booking page displays current Houston availability and removes times that are already booked.",
    googleStepActionLabel: "View Available Dates and Times",
    googleStepFallbackMessage:
      "Online booking is being configured. Please contact NeuroSports USA to request an Initial Evaluation.",
    googleStepFallbackAction: "Go to Contact",
    googleCompletionQuestion: "Have you completed your booking?",
    googleCompletionOptions: [
      { value: "booked", label: "Yes, my appointment was booked" },
      { value: "not-yet", label: "Not yet" },
      { value: "need-help", label: "I need help" },
    ],
    googleCompletionBookedTitle: "Preparation and next steps",
    googleCompletionBookedText:
      "Please arrive a few minutes early with your confirmation details. Do not include detailed clinical information in calendar titles or public notes.",
    googleCompletionPreparationItems: [
      "Bring a valid ID and your appointment confirmation details.",
      "Bring a concise summary of your main concern for the Initial Evaluation.",
      "Wait for secure instructions if additional documents are required.",
    ],
    googleCompletionHelpLabel: "Go to Contact",
    nextLabel: "Continue",
    backLabel: "Back",
    submitLabel: "Submit appointment request",
    submittingLabel: "Sending request...",
    editAppointmentLabel: "Edit appointment",
    editPersonalInfoLabel: "Edit personal information",
    editObjectiveLabel: "Edit appointment objective",
    validationRequired: "This field is required.",
    validationSelectOne: "Please select one option.",
    validationSelectAtLeastOne: "Please select at least one option.",
    validationConsent: "You must accept the confirmation before submitting.",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
    stepTitles: {
      1: "Appointment For",
      2: "Open Availability",
      3: "Prepare for Evaluation",
      4: "Previous Studies",
      5: "Confirmation and Next Steps",
    },
    stepHeadings: {
      appointment: "Who is the appointment for?",
      dateTime: "Select a real available appointment.",
      patientInfo: "Prepare for your Initial Evaluation",
      objective: "Previous studies checklist",
      review: "Confirmation and next steps",
    },
    appointmentFor: {
      label: "Appointment for",
      options: [
        { value: "self", label: "Myself" },
        { value: "family-member", label: "A family member" },
      ],
    },
    patientInfo: {
      firstName: "First name",
      lastName: "Last name",
      dob: "Date of birth",
      email: "Email address",
      mobilePhone: "Mobile phone",
      preferredContactMethod: "Preferred contact method",
      responsibleAdultHeading: "Responsible adult information",
      responsibleFirstName: "Parent or responsible adult first name",
      responsibleLastName: "Parent or responsible adult last name",
      relationship: "Relationship to the patient",
      responsibleEmail: "Responsible adult email",
      responsibleMobilePhone: "Responsible adult mobile phone",
    },
    contactOptions: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "text", label: "Text message" },
    ],
    relationshipOptions: [
      { value: "parent", label: "Parent" },
      { value: "spouse", label: "Spouse" },
      { value: "adult-child", label: "Adult child" },
      { value: "legal-guardian", label: "Legal guardian" },
      { value: "other-family-member", label: "Other family member" },
    ],
    objective: {
      heading: "Primary reason for the Initial Evaluation",
      label: "Primary reason for the Initial Evaluation",
      helper:
        "Briefly identify the main goal. Do not include diagnoses, detailed medical history, test results or highly sensitive information.",
      categoriesLabel: "Select applicable categories",
      categories: [
        { value: "attention-or-concentration", label: "Attention or concentration" },
        { value: "memory", label: "Memory" },
        { value: "learning-or-academic-concerns", label: "Learning or academic concerns" },
        { value: "developmental-concerns", label: "Developmental concerns" },
        { value: "neurological-condition", label: "Neurological condition" },
        { value: "emotional-or-behavioral-concerns", label: "Emotional or behavioral concerns" },
        { value: "cognitive-rehabilitation", label: "Cognitive rehabilitation" },
        { value: "sport-or-neuroperformance", label: "Sport or NeuroPerformance" },
        { value: "other", label: "Other" },
      ],
      studiesQuestion: "Do you have previous evaluations or diagnostic studies?",
      studiesStatus: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
        { value: "not-sure", label: "Not sure" },
      ],
      studiesTypesLabel: "Select available prior studies",
      studiesTypes: [
        { value: "brain-mri", label: "Brain MRI" },
        { value: "ct-scan", label: "CT scan" },
        { value: "eeg", label: "EEG" },
        { value: "previous-neuropsych-evaluation", label: "Previous neuropsychological evaluation" },
        { value: "psychological-or-psychiatric-evaluation", label: "Psychological or psychiatric evaluation" },
        { value: "neurological-evaluation", label: "Neurological evaluation" },
        { value: "school-or-academic-evaluation", label: "School or academic evaluation" },
        { value: "other-relevant-report", label: "Other relevant report" },
      ],
      studiesHelp:
        "Please do not upload medical records on this page. Our team will provide secure instructions if documents are needed before the appointment.",
      referralSourceLabel: "How did you hear about NeuroSports USA?",
      referralSourceOptions: [
        { value: "physician-or-healthcare-professional", label: "Physician or healthcare professional" },
        { value: "school", label: "School" },
        { value: "sports-organization-or-coach", label: "Sports organization or coach" },
        { value: "family-or-friend", label: "Family or friend" },
        { value: "online-search", label: "Online search" },
        { value: "social-media", label: "Social media" },
        { value: "other", label: "Other" },
      ],
      additionalNoteLabel: "Anything else our scheduling team should know?",
      additionalNoteHelp: "Do not include highly sensitive medical information.",
    },
    review: {
      title: "Review your appointment request.",
      appointmentType: "Appointment type",
      appointmentFor: "Appointment for",
      patientName: "Patient name",
      responsibleAdult: "Responsible adult",
      requestedDate: "Requested date",
      requestedTime: "Requested time",
      email: "Email",
      phone: "Phone",
      contactMethod: "Preferred contact method",
      primaryObjective: "Primary appointment objective",
      categories: "Concern categories",
      previousStudies: "Previous studies",
      previousStudyTypes: "Selected previous study types",
      referralSource: "Referral source",
      additionalNote: "Additional note",
      notProvided: "Not provided",
      consentLabel:
        "I confirm that the information is accurate and understand that this is an appointment request subject to confirmation.",
    },
    feedback: {
      notConfiguredTitle: "Online appointment submission is being connected.",
      notConfiguredMessage: "Your information has not been sent yet.",
      contactFallback: "Use the Contact page while secure submission is finalized.",
      errorTitle: "We could not send your appointment request.",
      errorMessage:
        "Your information remains on this page. Please review the form or use the Contact page.",
      successTitle: "Appointment request received.",
      successMessage:
        "Thank you. The NeuroSports USA Houston team will review your requested date and contact information. Your appointment is not confirmed until you receive confirmation from our team.",
      returnHome: "Return Home",
      viewHoustonCenter: "View Houston Center",
      referenceLabel: "Request reference",
    },
  },
  es: {
    locale: "es",
    pageTitle: "Agendar una Evaluacion Inicial",
    pageDescription:
      "Solicite una Evaluacion Inicial en el centro NeuroSports USA Houston. No cargue ni incluya historias clinicas extensas. Nuestro equipo compartira instrucciones seguras si se requieren documentos.",
    emergencyNotice:
      "Este formulario de agenda no se monitorea para emergencias. Si requiere asistencia medica inmediata, contacte servicios de emergencia locales.",
    privacyNotice:
      "Proporcione unicamente la informacion necesaria para solicitar la cita. No envie informacion de emergencia ni historias clinicas extensas mediante este formulario.",
    privacyLinksLabel: "Referencias de politica",
    privacyPolicyLabel: "Politica de Privacidad",
    termsOfUseLabel: "Terminos de Uso",
    progressLabel: "de 5",
    requestedTimeLabel: "Horario de cita solicitado",
    timezoneLabel: "Zona horaria",
    timezoneValue: "Hora Central - Houston",
    appointmentTypeLabel: "Evaluacion Inicial",
    appointmentTypeDescription:
      "Evaluacion funcional individualizada disenada para comprender fortalezas cognitivas, necesidades funcionales y prioridades para planificacion clinica o NeuroPerformance.",
    unavailableSundayLabel: "Domingo no disponible",
    previousMonthLabel: "Anterior",
    nextMonthLabel: "Siguiente",
    selectPlaceholder: "Seleccione",
    selectDateHint: "Seleccione una fecha para ver horarios disponibles.",
    contactFallbackLabel: "Contacto",
    objectiveMaxError: "Maximo 300 caracteres.",
    googleStepDescription:
      "Nuestra pagina segura de Google Calendar muestra disponibilidad actual de Houston y elimina horarios que ya fueron reservados.",
    googleStepActionLabel: "Ver fechas y horarios disponibles",
    googleStepFallbackMessage:
      "La reserva en linea se esta configurando. Contacte a NeuroSports USA para solicitar una Evaluacion Inicial.",
    googleStepFallbackAction: "Ir a Contacto",
    googleCompletionQuestion: "Ha completado su reserva?",
    googleCompletionOptions: [
      { value: "booked", label: "Si, mi cita fue reservada" },
      { value: "not-yet", label: "Aun no" },
      { value: "need-help", label: "Necesito ayuda" },
    ],
    googleCompletionBookedTitle: "Preparacion y siguientes pasos",
    googleCompletionBookedText:
      "Por favor llegue unos minutos antes con los datos de confirmacion. No incluya informacion clinica detallada en titulos o notas publicas del calendario.",
    googleCompletionPreparationItems: [
      "Lleve una identificacion valida y los datos de confirmacion de la cita.",
      "Lleve un resumen breve de su principal motivo para la Evaluacion Inicial.",
      "Espere instrucciones seguras si se requieren documentos adicionales.",
    ],
    googleCompletionHelpLabel: "Ir a Contacto",
    nextLabel: "Continuar",
    backLabel: "Atras",
    submitLabel: "Enviar solicitud de cita",
    submittingLabel: "Enviando solicitud...",
    editAppointmentLabel: "Editar cita",
    editPersonalInfoLabel: "Editar informacion personal",
    editObjectiveLabel: "Editar objetivo de la cita",
    validationRequired: "Este campo es obligatorio.",
    validationSelectOne: "Seleccione una opcion.",
    validationSelectAtLeastOne: "Seleccione al menos una opcion.",
    validationConsent: "Debe aceptar la confirmacion antes de enviar.",
    invalidEmail: "Ingrese un correo electronico valido.",
    invalidPhone: "Ingrese un numero de telefono valido.",
    stepTitles: {
      1: "Para quien",
      2: "Abrir disponibilidad",
      3: "Preparacion",
      4: "Estudios previos",
      5: "Confirmacion y siguientes pasos",
    },
    stepHeadings: {
      appointment: "Para quien es la cita?",
      dateTime: "Seleccione una cita realmente disponible.",
      patientInfo: "Preparese para su Evaluacion Inicial",
      objective: "Checklist de estudios previos",
      review: "Confirmacion y siguientes pasos",
    },
    appointmentFor: {
      label: "Cita para",
      options: [
        { value: "self", label: "Para mi" },
        { value: "family-member", label: "Para un familiar" },
      ],
    },
    patientInfo: {
      firstName: "Nombre",
      lastName: "Apellido",
      dob: "Fecha de nacimiento",
      email: "Correo electronico",
      mobilePhone: "Telefono movil",
      preferredContactMethod: "Metodo de contacto preferido",
      responsibleAdultHeading: "Informacion del adulto responsable",
      responsibleFirstName: "Nombre del padre o adulto responsable",
      responsibleLastName: "Apellido del padre o adulto responsable",
      relationship: "Relacion con el paciente",
      responsibleEmail: "Correo del adulto responsable",
      responsibleMobilePhone: "Telefono movil del adulto responsable",
    },
    contactOptions: [
      { value: "email", label: "Correo" },
      { value: "phone", label: "Telefono" },
      { value: "text", label: "Mensaje de texto" },
    ],
    relationshipOptions: [
      { value: "parent", label: "Padre o madre" },
      { value: "spouse", label: "Conyuge" },
      { value: "adult-child", label: "Hijo adulto" },
      { value: "legal-guardian", label: "Tutor legal" },
      { value: "other-family-member", label: "Otro familiar" },
    ],
    objective: {
      heading: "Motivo principal de la Evaluacion Inicial",
      label: "Motivo principal de la Evaluacion Inicial",
      helper:
        "Identifique brevemente el objetivo principal. No incluya diagnosticos, historial medico detallado, resultados de pruebas ni informacion altamente sensible.",
      categoriesLabel: "Seleccione categorias aplicables",
      categories: [
        { value: "attention-or-concentration", label: "Atencion o concentracion" },
        { value: "memory", label: "Memoria" },
        { value: "learning-or-academic-concerns", label: "Aprendizaje o inquietudes academicas" },
        { value: "developmental-concerns", label: "Inquietudes del desarrollo" },
        { value: "neurological-condition", label: "Condicion neurologica" },
        { value: "emotional-or-behavioral-concerns", label: "Inquietudes emocionales o conductuales" },
        { value: "cognitive-rehabilitation", label: "Rehabilitacion cognitiva" },
        { value: "sport-or-neuroperformance", label: "Deporte o NeuroPerformance" },
        { value: "other", label: "Otro" },
      ],
      studiesQuestion: "Tiene evaluaciones previas o estudios diagnosticos?",
      studiesStatus: [
        { value: "no", label: "No" },
        { value: "yes", label: "Si" },
        { value: "not-sure", label: "No estoy seguro" },
      ],
      studiesTypesLabel: "Seleccione estudios previos disponibles",
      studiesTypes: [
        { value: "brain-mri", label: "Resonancia cerebral" },
        { value: "ct-scan", label: "Tomografia" },
        { value: "eeg", label: "EEG" },
        { value: "previous-neuropsych-evaluation", label: "Evaluacion neuropsicologica previa" },
        { value: "psychological-or-psychiatric-evaluation", label: "Evaluacion psicologica o psiquiatrica" },
        { value: "neurological-evaluation", label: "Evaluacion neurologica" },
        { value: "school-or-academic-evaluation", label: "Evaluacion escolar o academica" },
        { value: "other-relevant-report", label: "Otro informe relevante" },
      ],
      studiesHelp:
        "No cargue historias clinicas en esta pagina. Nuestro equipo compartira instrucciones seguras si se requieren documentos antes de la cita.",
      referralSourceLabel: "Como conocio NeuroSports USA?",
      referralSourceOptions: [
        { value: "physician-or-healthcare-professional", label: "Medico o profesional de salud" },
        { value: "school", label: "Colegio" },
        { value: "sports-organization-or-coach", label: "Organizacion deportiva o entrenador" },
        { value: "family-or-friend", label: "Familiar o amigo" },
        { value: "online-search", label: "Busqueda en linea" },
        { value: "social-media", label: "Redes sociales" },
        { value: "other", label: "Otro" },
      ],
      additionalNoteLabel: "Algo mas que deba saber nuestro equipo de agenda?",
      additionalNoteHelp: "No incluya informacion medica altamente sensible.",
    },
    review: {
      title: "Revise su solicitud de cita.",
      appointmentType: "Tipo de cita",
      appointmentFor: "Cita para",
      patientName: "Nombre del paciente",
      responsibleAdult: "Adulto responsable",
      requestedDate: "Fecha solicitada",
      requestedTime: "Hora solicitada",
      email: "Correo",
      phone: "Telefono",
      contactMethod: "Metodo de contacto preferido",
      primaryObjective: "Objetivo principal",
      categories: "Categorias seleccionadas",
      previousStudies: "Estudios previos",
      previousStudyTypes: "Tipos de estudios previos",
      referralSource: "Como nos conocio",
      additionalNote: "Nota adicional",
      notProvided: "No proporcionado",
      consentLabel:
        "Confirmo que la informacion es correcta y entiendo que esta es una solicitud de cita sujeta a confirmacion.",
    },
    feedback: {
      notConfiguredTitle: "El envio en linea de citas esta en conexion.",
      notConfiguredMessage: "Su informacion aun no ha sido enviada.",
      contactFallback: "Use la pagina de Contacto mientras finalizamos el envio seguro.",
      errorTitle: "No pudimos enviar su solicitud de cita.",
      errorMessage:
        "Su informacion permanece en esta pagina. Revise el formulario o use la pagina de Contacto.",
      successTitle: "Solicitud de cita recibida.",
      successMessage:
        "Gracias. El equipo NeuroSports USA Houston revisara su fecha solicitada y datos de contacto. Su cita no esta confirmada hasta que reciba confirmacion de nuestro equipo.",
      returnHome: "Volver al inicio",
      viewHoustonCenter: "Ver centro Houston",
      referenceLabel: "Referencia de solicitud",
    },
  },
};
