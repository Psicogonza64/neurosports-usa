export type BookingLocale = "en" | "es";

export type BookingDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const houstonBookingConfig = {
  center: "NeuroSports USA — Houston Center",
  timezone: "America/Chicago",
  // TODO: Confirm official Initial Evaluation duration.
  slotIntervalMinutes: 30,
  appointmentTypes: [
    {
      id: "initial-evaluation",
      label: {
        en: "Initial Evaluation",
        es: "Evaluacion Inicial",
      },
      description: {
        en: "Begin with an individualized functional evaluation to understand cognitive strengths, functional needs and program priorities.",
        es: "Comience con una evaluacion funcional individualizada para comprender fortalezas cognitivas, necesidades funcionales y prioridades del programa.",
      },
    },
  ],
  address: [
    "11777 Katy Freeway, Suite 410S",
    "Houston, Texas 77079",
    "United States",
  ],
  weeklyAvailability: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as BookingDay[],
      windows: [
        {
          start: "08:00",
          end: "12:00",
        },
        {
          start: "14:00",
          end: "16:00",
        },
      ],
    },
    {
      days: ["Saturday"] as BookingDay[],
      windows: [
        {
          start: "09:00",
          end: "12:30",
        },
      ],
    },
  ],
  bookingUrl: process.env.NEXT_PUBLIC_HOUSTON_BOOKING_URL ?? "",
  submissionEndpoint: process.env.NEXT_PUBLIC_HOUSTON_BOOKING_REQUEST_ENDPOINT ?? "",
};

export const bookingPageContent: Record<
  BookingLocale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    appointmentTypeLabel: string;
    appointmentTypeDescription: string;
    centerLabel: string;
    centerName: string;
    availabilityHeading: string;
    mondayToFridayLabel: string;
    saturdayLabel: string;
    timezoneLabel: string;
    timezoneValue: string;
    trustNote: string;
    disclaimer: string;
    primaryLabel: string;
    primaryOpensInNewTab: string;
    secondaryLabel: string;
    secondaryHref: string;
    fallbackMessage: string;
    fallbackActionLabel: string;
  }
> = {
  en: {
    eyebrow: "SCHEDULE AN EVALUATION",
    title: "Begin with an Initial Evaluation.",
    intro: "Start by selecting an Initial Evaluation at the NeuroSports USA Houston Center.",
    appointmentTypeLabel: "Initial Evaluation",
    appointmentTypeDescription:
      "An individualized functional evaluation designed to identify cognitive strengths, functional needs and priorities for clinical or NeuroPerformance planning.",
    centerLabel: "Center",
    centerName: "NeuroSports USA — Houston Center",
    availabilityHeading: "Public Appointment Hours",
    mondayToFridayLabel: "Monday-Friday",
    saturdayLabel: "Saturday",
    timezoneLabel: "Timezone",
    timezoneValue: "Central Time — Houston",
    trustNote:
      "Available dates, appointment duration and confirmation status are shown in the secure booking calendar.",
    disclaimer:
      "Appointment requests are subject to confirmation and professional availability.",
    primaryLabel: "Open Appointment Calendar",
    primaryOpensInNewTab: "(opens in new tab)",
    secondaryLabel: "View Houston Center",
    secondaryHref: "/#locations",
    fallbackMessage:
      "Online scheduling is being configured. Please use the Contact page temporarily.",
    fallbackActionLabel: "Go to Contact",
  },
  es: {
    eyebrow: "AGENDAR UNA EVALUACION",
    title: "Comience con una Evaluacion Inicial.",
    intro: "Seleccione una Evaluacion Inicial en el Centro NeuroSports USA de Houston.",
    appointmentTypeLabel: "Evaluacion Inicial",
    appointmentTypeDescription:
      "Evaluacion funcional individualizada orientada a identificar fortalezas cognitivas, necesidades funcionales y prioridades para la planificacion clinica o de NeuroPerformance.",
    centerLabel: "Centro",
    centerName: "NeuroSports USA — Centro Houston",
    availabilityHeading: "Horario Publico de Citas",
    mondayToFridayLabel: "Lunes a viernes",
    saturdayLabel: "Sabado",
    timezoneLabel: "Zona horaria",
    timezoneValue: "Hora Central — Houston",
    trustNote:
      "Las fechas disponibles, la duracion de la cita y el estado de confirmacion se muestran en el calendario seguro.",
    disclaimer:
      "Las solicitudes de cita estan sujetas a confirmacion y disponibilidad profesional.",
    primaryLabel: "Abrir calendario de citas",
    primaryOpensInNewTab: "(abre en una nueva pestana)",
    secondaryLabel: "Ver Centro Houston",
    secondaryHref: "/#locations",
    fallbackMessage:
      "La agenda en linea esta siendo configurada. Utilice temporalmente la pagina de Contacto.",
    fallbackActionLabel: "Ir a Contacto",
  },
};
