export type LocationsLocale = "en" | "es";

export type LocationCenter = {
  id: "houston" | "bogota" | "bucaramanga";
  organization: string;
  centerTitle: string;
  cityCountry: string;
  addressLines: string[];
  shortAddress: string;
  mapQuery: string;
  mapTitle: string;
  imagePath?: string;
  imageAlt?: string;
  imageCaption?: string;
  hasApprovedImage?: boolean;
  viewHref?: string;
};

export type LocationsContent = {
  labels: {
    eyebrow: string;
    title: string;
    viewCenter: string;
    getDirections: string;
    scheduleEvaluation: string;
    centerGallery: string;
    photographyComingSoon: string;
  };
  legalNote: string;
  centers: LocationCenter[];
};

const locationsByLocale: Record<LocationsLocale, LocationsContent> = {
  en: {
    labels: {
      eyebrow: "Locations",
      title: "Our Current Centers",
      viewCenter: "View Center",
      getDirections: "Get Directions",
      scheduleEvaluation: "Schedule Evaluation",
      centerGallery: "Center Gallery",
      photographyComingSoon: "Photography Coming Soon",
    },
    legalNote:
      "NeuroSports USA and CENPA IPS are separate organizations that share scientific principles and selected intervention frameworks.",
    centers: [
      {
        id: "houston",
        organization: "NeuroSports USA",
        centerTitle: "Houston Center",
        cityCountry: "Houston, United States",
        addressLines: [
          "11777 Katy Freeway, Suite 410S",
          "Houston, Texas 77079",
          "United States",
        ],
        shortAddress: "11777 Katy Freeway, Suite 410S",
        mapQuery: "11777 Katy Freeway Suite 410S Houston Texas 77079",
        mapTitle:
          "Map showing NeuroSports USA Houston Center at 11777 Katy Freeway.",
        imagePath: "/images/locations/houston/neurosports-houston-team-building.jpg",
        imageAlt:
          "NeuroSports USA team outside the Houston center at 11777 Katy Freeway.",
        imageCaption:
          "NeuroSports USA clinical and NeuroPerformance team at the Houston center.",
        hasApprovedImage: true,
        viewHref: "#locations",
      },
      {
        id: "bogota",
        organization: "CENPA IPS",
        centerTitle: "Bogotá Center",
        cityCountry: "Bogotá, Colombia",
        addressLines: [
          "Carrera 23 No. 87-10",
          "Bogotá D.C.",
          "Colombia",
        ],
        shortAddress: "Carrera 23 No. 87-10",
        mapQuery: "Carrera 23 No 87-10 Bogotá Colombia",
        mapTitle:
          "Map showing CENPA IPS Bogotá Center at Carrera 23 No. 87-10.",
        imagePath: "/images/locations/bogota/cenpa-bogota-front.jpg",
        hasApprovedImage: false,
        viewHref: "#locations",
      },
      {
        id: "bucaramanga",
        organization: "CENPA IPS",
        centerTitle: "Bucaramanga Center",
        cityCountry: "Bucaramanga, Colombia",
        addressLines: [
          "Carrera 35A No. 48-134, Piso 2",
          "Cabecera del Llano",
          "Bucaramanga, Santander",
          "Colombia",
        ],
        shortAddress: "Carrera 35A No. 48-134, Piso 2",
        mapQuery: "Carrera 35A No 48-134 Bucaramanga Santander Colombia",
        mapTitle:
          "Map showing CENPA IPS Bucaramanga Center at Carrera 35A No. 48-134.",
        imagePath: "/images/locations/bucaramanga/cenpa-bucaramanga-front.jpg",
        hasApprovedImage: false,
        viewHref: "#locations",
      },
    ],
  },
  es: {
    labels: {
      eyebrow: "Sedes",
      title: "Nuestros Centros Actuales",
      viewCenter: "Ver Centro",
      getDirections: "Cómo Llegar",
      scheduleEvaluation: "Agendar Evaluación",
      centerGallery: "Galería del Centro",
      photographyComingSoon: "Fotografías Próximamente",
    },
    legalNote:
      "NeuroSports USA y CENPA IPS son organizaciones independientes que comparten principios científicos y determinados marcos de intervención.",
    centers: [
      {
        id: "houston",
        organization: "NeuroSports USA",
        centerTitle: "Houston Center",
        cityCountry: "Houston, Estados Unidos",
        addressLines: [
          "11777 Katy Freeway, Suite 410S",
          "Houston, Texas 77079",
          "United States",
        ],
        shortAddress: "11777 Katy Freeway, Suite 410S",
        mapQuery: "11777 Katy Freeway Suite 410S Houston Texas 77079",
        mapTitle:
          "Map showing NeuroSports USA Houston Center at 11777 Katy Freeway.",
        imagePath: "/images/locations/houston/neurosports-houston-team-building.jpg",
        imageAlt:
          "NeuroSports USA team outside the Houston center at 11777 Katy Freeway.",
        imageCaption:
          "NeuroSports USA clinical and NeuroPerformance team at the Houston center.",
        hasApprovedImage: true,
        viewHref: "#locations",
      },
      {
        id: "bogota",
        organization: "CENPA IPS",
        centerTitle: "Bogotá Center",
        cityCountry: "Bogotá, Colombia",
        addressLines: [
          "Carrera 23 No. 87-10",
          "Bogotá D.C.",
          "Colombia",
        ],
        shortAddress: "Carrera 23 No. 87-10",
        mapQuery: "Carrera 23 No 87-10 Bogotá Colombia",
        mapTitle:
          "Map showing CENPA IPS Bogotá Center at Carrera 23 No. 87-10.",
        imagePath: "/images/locations/bogota/cenpa-bogota-front.jpg",
        hasApprovedImage: false,
        viewHref: "#locations",
      },
      {
        id: "bucaramanga",
        organization: "CENPA IPS",
        centerTitle: "Bucaramanga Center",
        cityCountry: "Bucaramanga, Colombia",
        addressLines: [
          "Carrera 35A No. 48-134, Piso 2",
          "Cabecera del Llano",
          "Bucaramanga, Santander",
          "Colombia",
        ],
        shortAddress: "Carrera 35A No. 48-134, Piso 2",
        mapQuery: "Carrera 35A No 48-134 Bucaramanga Santander Colombia",
        mapTitle:
          "Map showing CENPA IPS Bucaramanga Center at Carrera 35A No. 48-134.",
        imagePath: "/images/locations/bucaramanga/cenpa-bucaramanga-front.jpg",
        hasApprovedImage: false,
        viewHref: "#locations",
      },
    ],
  },
};

export function getNeuroSportsLocationsContent(locale: LocationsLocale = "en") {
  return locationsByLocale[locale] ?? locationsByLocale.en;
}

export function getGoogleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function getGoogleMapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
