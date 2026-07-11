import type { PublicProcessItem } from "@/lib/neurosports-public-content";

export type HomeLocale = "en" | "es";

export type HomeApplicationsPathway = {
  id: "clinical-neuroscience" | "neuroperformance";
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type HomeMnsiPhase = {
  id: "regulation" | "neuromodulation" | "digital-cognitive-training" | "analog-integration" | "sensorimotor-consolidation" | "functional-transfer";
  title: string;
  summary: string;
};

export type HomePreviewItem = {
  title: string;
  description: string;
};

export type HomeContent = {
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    sequenceLabel: string;
    items: PublicProcessItem[];
  };
  applications: {
    eyebrow: string;
    title: string;
    intro: string;
    pathways: HomeApplicationsPathway[];
  };
  mnsi: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
    ctaHref: string;
    phases: HomeMnsiPhase[];
  };
  technology: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
    ctaHref: string;
    items: HomePreviewItem[];
  };
  research: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
    ctaHref: string;
    items: HomePreviewItem[];
  };
  locations: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const processItemsEn: PublicProcessItem[] = [
  {
    id: "functional-evaluation",
    title: "Functional Evaluation",
    shortDescription: "A structured baseline of cognitive and functional priorities before intervention begins.",
    expandedDescription: "A public overview of the baseline process used to define practical goals, strengths and needs before the intervention pathway is selected.",
    ctaLabel: "Learn more",
    ctaHref: "/what-we-do#functional-evaluation",
    category: "Foundation",
  },
  {
    id: "functional-brain-networks-rsfn",
    title: "Functional Brain Networks (RSFN)",
    shortDescription: "Interprets how functional networks support attention, behavior and performance.",
    expandedDescription: "A non-proprietary explanation of how functional network interpretation helps organize planning and progression.",
    ctaLabel: "Learn more",
    ctaHref: "/integrated-model#rsfn",
    category: "Science",
  },
  {
    id: "mnsi",
    title: "MNSI",
    shortDescription: "A sequenced framework that moves from preparation to transfer.",
    expandedDescription: "A concise public view of the six-phase sequence without exposing technical intervention parameters.",
    ctaLabel: "Learn more",
    ctaHref: "/integrated-model#mnsi",
    category: "Intervention",
  },
  {
    id: "clinical-neuroscience",
    title: "Clinical Neuroscience",
    shortDescription: "Clinical pathways for cognitive, developmental, neurological and behavioral needs.",
    expandedDescription: "A structured clinical application of the same scientific framework used across the platform.",
    ctaLabel: "Learn more",
    ctaHref: "/what-we-do#clinical-neuroscience",
    category: "Application",
  },
  {
    id: "neuroperformance",
    title: "NeuroPerformance",
    shortDescription: "Functional neuroscience applied to performance under real decision pressure.",
    expandedDescription: "A performance pathway focused on attention, decision quality, reaction time and transfer.",
    ctaLabel: "Learn more",
    ctaHref: "/what-we-do#neuroperformance",
    category: "Application",
  },
  {
    id: "functional-outcomes",
    title: "Functional Outcomes",
    shortDescription: "Tracks practical progress across clinical, academic, daily-life or sport contexts.",
    expandedDescription: "Monitors meaningful change over time through contextual indicators and periodic review.",
    ctaLabel: "Learn more",
    ctaHref: "/integrated-model#outcomes",
    category: "Monitoring",
  },
];

const processItemsEs: PublicProcessItem[] = [
  {
    id: "functional-evaluation",
    title: "Evaluacion funcional",
    shortDescription: "Linea base estructurada de prioridades cognitivas y funcionales antes de intervenir.",
    expandedDescription: "Vista publica del proceso inicial para definir metas practicas, fortalezas y necesidades sin exponer parametros internos.",
    ctaLabel: "Conocer mas",
    ctaHref: "/what-we-do#functional-evaluation",
    category: "Fundamento",
  },
  {
    id: "functional-brain-networks-rsfn",
    title: "Redes cerebrales funcionales (RSFN)",
    shortDescription: "Interpreta como las redes funcionales sostienen atencion, conducta y rendimiento.",
    expandedDescription: "Explicacion publica de como la interpretacion funcional orienta la planificacion clinica y de rendimiento.",
    ctaLabel: "Conocer mas",
    ctaHref: "/integrated-model#rsfn",
    category: "Ciencia",
  },
  {
    id: "mnsi",
    title: "MNSI",
    shortDescription: "Marco secuencial que avanza desde preparacion hasta transferencia funcional.",
    expandedDescription: "Resumen publico de seis fases sin divulgar configuraciones tecnicas o algoritmos internos.",
    ctaLabel: "Conocer mas",
    ctaHref: "/integrated-model#mnsi",
    category: "Intervencion",
  },
  {
    id: "clinical-neuroscience",
    title: "Neurociencia Clinica",
    shortDescription: "Rutas clinicas para necesidades cognitivas, del desarrollo, neurologicas y conductuales.",
    expandedDescription: "Aplicacion clinica estructurada del mismo marco cientifico institucional.",
    ctaLabel: "Conocer mas",
    ctaHref: "/what-we-do#clinical-neuroscience",
    category: "Aplicacion",
  },
  {
    id: "neuroperformance",
    title: "NeuroPerformance",
    shortDescription: "Neurociencia funcional aplicada al rendimiento bajo presion real.",
    expandedDescription: "Ruta de rendimiento centrada en atencion, decisiones, reaccion y transferencia.",
    ctaLabel: "Conocer mas",
    ctaHref: "/what-we-do#neuroperformance",
    category: "Aplicacion",
  },
  {
    id: "functional-outcomes",
    title: "Resultados funcionales",
    shortDescription: "Monitorea progreso util en clinica, academia, vida diaria o deporte.",
    expandedDescription: "Seguimiento de cambios funcionales con indicadores contextuales y revision periodica.",
    ctaLabel: "Conocer mas",
    ctaHref: "/integrated-model#outcomes",
    category: "Monitoreo",
  },
];

const homeContentByLocale: Record<HomeLocale, HomeContent> = {
  en: {
    process: {
      eyebrow: "OUR SCIENTIFIC JOURNEY",
      title: "From understanding brain function to meaningful functional change.",
      intro: "Explore the core processes that connect evaluation, brain-network interpretation, intervention and real-world outcomes.",
      sequenceLabel: "Public process sequence",
      items: processItemsEn,
    },
    applications: {
      eyebrow: "TWO APPLICATIONS",
      title: "One scientific foundation. Two functional pathways.",
      intro: "The same functional neuroscience framework supports clinical care and performance development while preserving the specific goals of each individual.",
      pathways: [
        {
          id: "clinical-neuroscience",
          title: "Clinical Neuroscience",
          description: "Evaluation and rehabilitation pathways for cognitive, developmental, neurological and behavioral needs.",
          items: [
            "Children and adolescents",
            "Adults and older adults",
            "Neurological conditions",
            "Behavioral and psychiatric needs",
            "Cognitive rehabilitation",
            "Academic and daily-life function",
          ],
          ctaLabel: "Explore Clinical Neuroscience",
          ctaHref: "/what-we-do#clinical-neuroscience",
        },
        {
          id: "neuroperformance",
          title: "NeuroPerformance",
          description: "Functional neuroscience applied to attention, decision-making, reaction time, cognitive endurance and sport transfer.",
          items: [
            "Soccer",
            "Basketball",
            "Baseball",
            "Tennis",
            "Individual athletes",
            "Decision-making",
            "Reaction time",
            "Attention under pressure",
          ],
          ctaLabel: "Explore NeuroPerformance",
          ctaHref: "/what-we-do#neuroperformance",
        },
      ],
    },
    mnsi: {
      eyebrow: "MNSI",
      title: "A structured journey from preparation to functional transfer.",
      intro: "Select each phase for a concise public description of how the sequence progresses.",
      ctaLabel: "Explore the Integrated Model",
      ctaHref: "/integrated-model#mnsi",
      phases: [
        { id: "regulation", title: "Regulation", summary: "Prepare attention, arousal and emotional state." },
        { id: "neuromodulation", title: "Neuromodulation", summary: "Support targeted brain-network preparation." },
        { id: "digital-cognitive-training", title: "Digital Cognitive Training", summary: "Activate attention, memory, processing speed and executive functions." },
        { id: "analog-integration", title: "Analog Integration", summary: "Connect cognitive performance with symbolic and functional tasks." },
        { id: "sensorimotor-consolidation", title: "Sensorimotor Consolidation", summary: "Reinforce cognitive change through controlled movement and response." },
        { id: "functional-transfer", title: "Functional Transfer", summary: "Apply trained abilities to daily life, academics, clinical goals or sport." },
      ],
    },
    technology: {
      eyebrow: "TECHNOLOGY",
      title: "Technology selected to support evaluation, intervention and performance.",
      intro: "NeuroSports USA combines clinical expertise with selected digital, neuromodulation, cognitive and sensorimotor technologies.",
      ctaLabel: "Explore Technology",
      ctaHref: "/technology",
      items: [
        { title: "Neuropsychological assessment", description: "Structured measurement tools used to understand functional cognitive profiles." },
        { title: "Cognitive training platforms", description: "Digital environments that support progressive cognitive activation." },
        { title: "Neuromodulation support", description: "Selected support technologies integrated under professional supervision." },
        { title: "Sensorimotor integration", description: "Structured transfer work connecting cognitive and motor control." },
        { title: "Functional outcome monitoring", description: "Longitudinal tracking to support practical decision-making and adaptation." },
      ],
    },
    research: {
      eyebrow: "RESEARCH",
      title: "Science guides the model.",
      intro: "Our work is informed by neuropsychology, functional brain networks, cognitive rehabilitation and performance science.",
      ctaLabel: "Explore Research",
      ctaHref: "/research",
      items: [
        { title: "Functional brain-network interpretation", description: "Public perspective on how network-level patterns inform planning." },
        { title: "Sequential multimodal intervention", description: "A structured sequence connecting preparation, training and transfer." },
        { title: "Clinical and performance outcome monitoring", description: "Shared monitoring principles across care and performance contexts." },
      ],
    },
    locations: {
      eyebrow: "LOCATIONS",
      title: "Our Current Centers",
      intro: "Explore our current centers in Houston, Bogotá and Bucaramanga.",
    },
    finalCta: {
      eyebrow: "BEGIN WITH UNDERSTANDING",
      title: "Every pathway begins with a functional evaluation.",
      description: "Clinical care and NeuroPerformance programs begin by understanding the individual brain profile, functional priorities and real-world goals.",
      primaryLabel: "Schedule Evaluation",
      primaryHref: "#contact",
      secondaryLabel: "Contact NeuroSports USA",
      secondaryHref: "/contact",
    },
  },
  es: {
    process: {
      eyebrow: "NUESTRO RECORRIDO CIENTIFICO",
      title: "De comprender la funcion cerebral al cambio funcional significativo.",
      intro: "Explora los procesos centrales que conectan evaluacion, interpretacion de redes, intervencion y resultados funcionales.",
      sequenceLabel: "Secuencia publica",
      items: processItemsEs,
    },
    applications: {
      eyebrow: "DOS APLICACIONES",
      title: "Una base cientifica. Dos rutas funcionales.",
      intro: "El mismo marco de neurociencia funcional respalda atencion clinica y desarrollo de rendimiento respetando objetivos individuales.",
      pathways: [
        {
          id: "clinical-neuroscience",
          title: "Neurociencia Clinica",
          description: "Rutas de evaluacion y rehabilitacion para necesidades cognitivas, del desarrollo, neurologicas y conductuales.",
          items: [
            "Ninos y adolescentes",
            "Adultos y adultos mayores",
            "Condiciones neurologicas",
            "Necesidades conductuales y psiquiatricas",
            "Rehabilitacion cognitiva",
            "Funcion academica y de vida diaria",
          ],
          ctaLabel: "Explorar Neurociencia Clinica",
          ctaHref: "/what-we-do#clinical-neuroscience",
        },
        {
          id: "neuroperformance",
          title: "NeuroPerformance",
          description: "Neurociencia funcional aplicada a atencion, decisiones, tiempo de reaccion, resistencia cognitiva y transferencia deportiva.",
          items: [
            "Futbol",
            "Baloncesto",
            "Beisbol",
            "Tenis",
            "Atletas individuales",
            "Toma de decisiones",
            "Tiempo de reaccion",
            "Atencion bajo presion",
          ],
          ctaLabel: "Explorar NeuroPerformance",
          ctaHref: "/what-we-do#neuroperformance",
        },
      ],
    },
    mnsi: {
      eyebrow: "MNSI",
      title: "Una ruta estructurada desde preparacion hasta transferencia funcional.",
      intro: "Selecciona cada fase para una explicacion publica breve de la secuencia.",
      ctaLabel: "Explorar modelo integrado",
      ctaHref: "/integrated-model#mnsi",
      phases: [
        { id: "regulation", title: "Regulacion", summary: "Preparar atencion, activacion y estado emocional." },
        { id: "neuromodulation", title: "Neuromodulacion", summary: "Apoyar preparacion dirigida de redes cerebrales." },
        { id: "digital-cognitive-training", title: "Entrenamiento Cognitivo Digital", summary: "Activar atencion, memoria, velocidad de procesamiento y funciones ejecutivas." },
        { id: "analog-integration", title: "Integracion Analogica", summary: "Conectar el rendimiento cognitivo con tareas simbolicas y funcionales." },
        { id: "sensorimotor-consolidation", title: "Consolidacion Sensorimotora", summary: "Reforzar cambios cognitivos con movimiento y respuesta controlada." },
        { id: "functional-transfer", title: "Transferencia Funcional", summary: "Aplicar habilidades entrenadas a vida diaria, academia, objetivos clinicos o deporte." },
      ],
    },
    technology: {
      eyebrow: "TECNOLOGIA",
      title: "Tecnologia seleccionada para apoyar evaluacion, intervencion y rendimiento.",
      intro: "NeuroSports USA integra experiencia clinica con tecnologias digitales, neuromodulatorias, cognitivas y sensorimotoras.",
      ctaLabel: "Explorar Tecnologia",
      ctaHref: "/technology",
      items: [
        { title: "Evaluacion neuropsicologica", description: "Herramientas estructuradas para comprender perfiles cognitivos funcionales." },
        { title: "Plataformas de entrenamiento cognitivo", description: "Entornos digitales para activacion cognitiva progresiva." },
        { title: "Soporte de neuromodulacion", description: "Tecnologias de soporte seleccionadas bajo supervision profesional." },
        { title: "Integracion sensorimotora", description: "Trabajo estructurado que conecta control cognitivo y motor." },
        { title: "Monitoreo de resultados funcionales", description: "Seguimiento longitudinal para decisiones practicas y ajustes." },
      ],
    },
    research: {
      eyebrow: "INVESTIGACION",
      title: "La ciencia orienta el modelo.",
      intro: "Nuestro trabajo se apoya en neuropsicologia, redes cerebrales funcionales, rehabilitacion cognitiva y ciencia del rendimiento.",
      ctaLabel: "Explorar Investigacion",
      ctaHref: "/research",
      items: [
        { title: "Interpretacion de redes cerebrales funcionales", description: "Perspectiva publica sobre patrones de red y planificacion funcional." },
        { title: "Intervencion multimodal secuencial", description: "Secuencia estructurada que conecta preparacion, entrenamiento y transferencia." },
        { title: "Monitoreo de resultados clinicos y de rendimiento", description: "Principios compartidos de seguimiento entre clinica y rendimiento." },
      ],
    },
    locations: {
      eyebrow: "SEDES",
      title: "Nuestros Centros Actuales",
      intro: "Explora nuestros centros actuales en Houston, Bogota y Bucaramanga.",
    },
    finalCta: {
      eyebrow: "COMENZAR CON COMPRENSION",
      title: "Cada ruta comienza con una evaluacion funcional.",
      description: "Los programas clinicos y de NeuroPerformance comienzan comprendiendo el perfil cerebral individual, prioridades funcionales y metas reales.",
      primaryLabel: "Agendar evaluacion",
      primaryHref: "#contact",
      secondaryLabel: "Contactar NeuroSports USA",
      secondaryHref: "/contact",
    },
  },
};

export function getNeuroSportsHomeContent(locale: HomeLocale = "en") {
  return homeContentByLocale[locale] ?? homeContentByLocale.en;
}
