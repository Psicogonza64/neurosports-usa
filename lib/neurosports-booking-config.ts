export type BookingLocale = "en" | "es";

export const houstonBookingConfig = {
  center: "NeuroSports USA — Houston Center",
  timezone: "America/Chicago",
  address: [
    "11777 Katy Freeway, Suite 410S",
    "Houston, Texas 77079",
    "United States",
  ],
  availabilityWindows: [
    {
      start: "08:00",
      end: "12:00",
    },
    {
      start: "14:00",
      end: "16:00",
    },
  ],
  bookingUrl: process.env.NEXT_PUBLIC_HOUSTON_BOOKING_URL ?? "",
};

export const bookingPageContent: Record<
  BookingLocale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    centerLabel: string;
    centerName: string;
    windowsLabel: string;
    timezoneLabel: string;
    timezoneValue: string;
    schedulingNote: string;
    primaryLabel: string;
    primaryOpensInNewTab: string;
    secondaryLabel: string;
    secondaryHref: string;
    trustNote: string;
    fallbackMessage: string;
    fallbackActionLabel: string;
  }
> = {
  en: {
    eyebrow: "SCHEDULE AN EVALUATION",
    title: "Begin with a functional evaluation.",
    intro: "Select an available appointment time for the NeuroSports USA Houston Center.",
    centerLabel: "Center",
    centerName: "NeuroSports USA — Houston Center",
    windowsLabel: "Available appointment windows",
    timezoneLabel: "Timezone",
    timezoneValue: "Central Time — Houston",
    schedulingNote:
      "Available dates and appointment duration are shown in the secure booking calendar.",
    primaryLabel: "Open Appointment Calendar",
    primaryOpensInNewTab: "(opens in new tab)",
    secondaryLabel: "View Houston Center",
    secondaryHref: "/#locations",
    trustNote:
      "Appointment requests are subject to confirmation and professional availability.",
    fallbackMessage:
      "Online scheduling is being configured. Please use the Contact page temporarily.",
    fallbackActionLabel: "Go to Contact",
  },
  es: {
    eyebrow: "AGENDAR UNA EVALUACION",
    title: "Comience con una evaluacion funcional.",
    intro: "Seleccione un horario disponible para el Centro NeuroSports USA de Houston.",
    centerLabel: "Centro",
    centerName: "NeuroSports USA — Centro Houston",
    windowsLabel: "Horarios disponibles",
    timezoneLabel: "Zona horaria",
    timezoneValue: "Hora Central — Houston",
    schedulingNote:
      "Las fechas disponibles y la duracion de la cita se muestran en el calendario seguro.",
    primaryLabel: "Abrir calendario de citas",
    primaryOpensInNewTab: "(abre en una nueva pestana)",
    secondaryLabel: "Ver Centro Houston",
    secondaryHref: "/#locations",
    trustNote:
      "Las solicitudes de cita estan sujetas a confirmacion y disponibilidad profesional.",
    fallbackMessage:
      "La agenda en linea esta siendo configurada. Utilice temporalmente la pagina de Contacto.",
    fallbackActionLabel: "Ir a Contacto",
  },
};
