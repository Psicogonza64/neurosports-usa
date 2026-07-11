export type IntegratedModelLocale = "en" | "es";

type LabeledItem = {
  title: string;
  description: string;
};

type SessionSegment = {
  duration: string;
  phase: string;
};

type LocationCenter = {
  city: string;
  organization: string;
};

type IntegratedModelPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    secondaryCtaLabel: string;
  };
  scientificFoundation: {
    eyebrow: string;
    title: string;
    description: string;
    sequence: LabeledItem[];
  };
  rsfn: {
    eyebrow: string;
    title: string;
    description: string;
    supportsLabel: string;
    supports: string[];
    note: string;
    ctaLabel: string;
    ctaHref: string;
  };
  mnsi: {
    eyebrow: string;
    title: string;
    description: string;
    phases: LabeledItem[];
  };
  applications: {
    eyebrow: string;
    title: string;
    description: string;
    leftTitle: string;
    rightTitle: string;
    leftItems: string[];
    rightItems: string[];
    sharedNote: string;
  };
  sessionStructure: {
    eyebrow: string;
    title: string;
    description: string;
    segments: SessionSegment[];
    note: string;
  };
  outcomeMonitoring: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    note: string;
  };
  locations: {
    eyebrow: string;
    title: string;
    centers: LocationCenter[];
    note: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    buttonLabel: string;
  };
};

const integratedModelContent: Record<IntegratedModelLocale, IntegratedModelPageContent> = {
  en: {
    hero: {
      eyebrow: "INTEGRATED MODEL",
      title:
        "One scientific framework connecting brain evaluation, rehabilitation and human performance.",
      description:
        "NeuroSports USA combines functional neuropsychological evaluation, brain-network interpretation and the MNSI intervention model to guide clinical recovery and cognitive performance.",
      ctaLabel: "Schedule an Evaluation",
      secondaryCtaLabel: "Explore the Six-Phase Model",
    },
    scientificFoundation: {
      eyebrow: "SCIENTIFIC FOUNDATION",
      title: "From Brain Function to Functional Change",
      description:
        "The integrated model follows a structured scientific sequence that links assessment, network interpretation and intervention transfer.",
      sequence: [
        {
          title: "Functional Evaluation",
          description:
            "Define the initial profile using clinical, cognitive and functional indicators.",
        },
        {
          title: "Functional Brain Networks (RSFN)",
          description:
            "Interpret functional systems that organize cognition and behavior.",
        },
        {
          title: "Personalized MNSI Plan",
          description:
            "Prioritize intervention targets according to profile, context and goals.",
        },
        {
          title: "Sequential Intervention",
          description:
            "Apply the six-phase sequence with structured progression and control.",
        },
        {
          title: "Clinical or Performance Transfer",
          description:
            "Translate gains into real clinical, academic, daily-life or sport contexts.",
        },
        {
          title: "Outcome Monitoring",
          description:
            "Track progression and update strategy through periodic reassessment.",
        },
      ],
    },
    rsfn: {
      eyebrow: "RSFN",
      title: "Functional Brain Networks (RSFN)",
      description:
        "RSFN provides a functional framework for interpreting how brain systems, cognitive processes and behavioral outcomes interact.",
      supportsLabel: "RSFN supports:",
      supports: [
        "functional network analysis",
        "clinical interpretation",
        "hypothesis generation",
        "intervention priorities",
        "outcome prediction",
      ],
      note:
        "RSFN-based interpretation informs decision-making and planning but does not imply guaranteed diagnostic or therapeutic outcomes.",
      ctaLabel: "Learn About Research",
      ctaHref: "/research",
    },
    mnsi: {
      eyebrow: "MNSI",
      title: "MNSI - Multimodal NeuroSequential Integration",
      description:
        "MNSI organizes intervention into a structured sequence that prepares brain state, activates targeted networks, trains cognition, consolidates learning and transfers gains to real-life performance.",
      phases: [
        {
          title: "Regulation",
          description: "Prepare attention, arousal and emotional state.",
        },
        {
          title: "Neuromodulation",
          description: "Support targeted neural-network preparation.",
        },
        {
          title: "Digital Cognitive Training",
          description:
            "Activate attention, memory, processing speed and executive functions.",
        },
        {
          title: "Analog Integration",
          description:
            "Transform digital performance into symbolic and functional tasks.",
        },
        {
          title: "Sensorimotor Consolidation",
          description:
            "Reinforce cognitive change through movement and response control.",
        },
        {
          title: "Functional Transfer",
          description:
            "Apply trained abilities to clinical, academic, daily-life or sport contexts.",
        },
      ],
    },
    applications: {
      eyebrow: "TWO APPLICATIONS",
      title: "One Model. Two Applications.",
      description:
        "A single scientific framework supports two implementation pathways with shared principles.",
      leftTitle: "Clinical Neuroscience",
      rightTitle: "NeuroPerformance",
      leftItems: [
        "Pediatric Neuropsychology",
        "Adult Neuropsychology",
        "Neurological Conditions",
        "Psychiatric Conditions",
        "Cognitive Rehabilitation",
        "Academic and Functional Support",
      ],
      rightItems: [
        "Soccer",
        "Basketball",
        "Baseball",
        "Tennis",
        "Individual Athletes",
        "Decision-Making",
        "Reaction Time",
        "Attention Under Pressure",
        "Cognitive Endurance",
      ],
      sharedNote:
        "Clinical Neuroscience and NeuroPerformance are applications of the same integrated scientific model, not separate businesses.",
    },
    sessionStructure: {
      eyebrow: "SESSION STRUCTURE",
      title: "A Structured 90-Minute Intervention Journey",
      description:
        "Each intervention session follows a predefined distribution of time across the MNSI sequence.",
      segments: [
        { duration: "10 min", phase: "Regulation" },
        { duration: "15 min", phase: "Neuromodulation" },
        { duration: "25 min", phase: "Digital Cognitive Training" },
        { duration: "20 min", phase: "Analog Integration" },
        { duration: "15 min", phase: "Sensorimotor Consolidation" },
        { duration: "5 min", phase: "Functional Transfer" },
      ],
      note:
        "Session duration and components are individualized according to evaluation findings, clinical judgment and functional goals.",
    },
    outcomeMonitoring: {
      eyebrow: "OUTCOME MONITORING",
      title: "Tracking Functional Change",
      description:
        "Monitoring links session-level indicators with broader functional progression.",
      points: [
        "baseline profile",
        "session indicators",
        "cognitive progression",
        "functional transfer",
        "clinical or sport-specific outcomes",
        "periodic reassessment",
      ],
      note:
        "Outcome monitoring supports clinical reasoning and performance planning but does not represent guaranteed outcomes.",
    },
    locations: {
      eyebrow: "LOCATIONS",
      title: "Current Centers",
      centers: [
        { city: "Houston, Texas", organization: "NeuroSports USA" },
        { city: "Bogota, Colombia", organization: "CENPA IPS" },
        { city: "Bucaramanga, Colombia", organization: "CENPA IPS" },
      ],
      note:
        "NeuroSports USA and CENPA IPS are separate organizations that share scientific content and intervention principles.",
    },
    finalCta: {
      eyebrow: "FINAL CTA",
      title: "Begin With a Functional Evaluation",
      text:
        "Every clinical and performance pathway begins by understanding the individual brain profile, functional priorities and real-world goals.",
      buttonLabel: "Schedule an Evaluation",
    },
  },
  es: {
    hero: {
      eyebrow: "MODELO INTEGRADO",
      title:
        "Un marco cientifico que conecta evaluacion cerebral, rehabilitacion y rendimiento humano.",
      description:
        "NeuroSports USA integra evaluacion neuropsicologica funcional, interpretacion de redes cerebrales y el modelo de intervencion MNSI para guiar recuperacion clinica y rendimiento cognitivo.",
      ctaLabel: "Agendar evaluacion",
      secondaryCtaLabel: "Explorar el modelo de seis fases",
    },
    scientificFoundation: {
      eyebrow: "BASE CIENTIFICA",
      title: "De la funcion cerebral al cambio funcional",
      description:
        "El modelo integrado sigue una secuencia cientifica estructurada que conecta evaluacion, interpretacion de redes e intervencion funcional.",
      sequence: [
        {
          title: "Evaluacion funcional",
          description:
            "Define el perfil inicial con indicadores clinicos, cognitivos y funcionales.",
        },
        {
          title: "Redes cerebrales funcionales (RSFN)",
          description:
            "Interpreta sistemas funcionales que organizan cognicion y conducta.",
        },
        {
          title: "Plan MNSI personalizado",
          description:
            "Prioriza objetivos segun perfil, contexto y metas.",
        },
        {
          title: "Intervencion secuencial",
          description:
            "Aplica la secuencia de seis fases con progresion estructurada.",
        },
        {
          title: "Transferencia clinica o de rendimiento",
          description:
            "Traslada avances a contextos clinicos, academicos, de vida diaria o deportivos.",
        },
        {
          title: "Monitoreo de resultados",
          description:
            "Sigue la progresion y ajusta estrategia con reevaluaciones periodicas.",
        },
      ],
    },
    rsfn: {
      eyebrow: "RSFN",
      title: "Redes cerebrales funcionales (RSFN)",
      description:
        "RSFN ofrece un marco funcional para interpretar como interactuan los sistemas cerebrales, los procesos cognitivos y los resultados conductuales.",
      supportsLabel: "RSFN respalda:",
      supports: [
        "analisis funcional de redes",
        "interpretacion clinica",
        "generacion de hipotesis",
        "prioridades de intervencion",
        "prediccion de resultados",
      ],
      note:
        "La interpretacion basada en RSFN orienta decisiones y planeacion, pero no implica garantias diagnosticas o terapeuticas.",
      ctaLabel: "Conocer investigacion",
      ctaHref: "/research",
    },
    mnsi: {
      eyebrow: "MNSI",
      title: "MNSI - Integracion NeuroSecuencial Multimodal",
      description:
        "MNSI organiza la intervencion en una secuencia estructurada que prepara el estado cerebral, activa redes objetivo, entrena cognicion, consolida aprendizaje y transfiere ganancias al rendimiento real.",
      phases: [
        {
          title: "Regulacion",
          description: "Prepara atencion, activacion y estado emocional.",
        },
        {
          title: "Neuromodulacion",
          description: "Apoya la preparacion de redes neuronales objetivo.",
        },
        {
          title: "Entrenamiento cognitivo digital",
          description:
            "Activa atencion, memoria, velocidad de procesamiento y funciones ejecutivas.",
        },
        {
          title: "Integracion analogica",
          description:
            "Transforma desempeno digital en tareas simbolicas y funcionales.",
        },
        {
          title: "Consolidacion sensorimotora",
          description:
            "Refuerza cambio cognitivo mediante movimiento y control de respuesta.",
        },
        {
          title: "Transferencia funcional",
          description:
            "Aplica habilidades entrenadas a contextos clinicos, academicos, cotidianos o deportivos.",
        },
      ],
    },
    applications: {
      eyebrow: "DOS APLICACIONES",
      title: "Un modelo. Dos aplicaciones.",
      description:
        "Un unico marco cientifico sostiene dos vias de implementacion con principios compartidos.",
      leftTitle: "Neurociencia clinica",
      rightTitle: "NeuroPerformance",
      leftItems: [
        "Neuropsicologia pediatrica",
        "Neuropsicologia de adultos",
        "Condiciones neurologicas",
        "Condiciones psiquiatricas",
        "Rehabilitacion cognitiva",
        "Apoyo academico y funcional",
      ],
      rightItems: [
        "Futbol",
        "Baloncesto",
        "Beisbol",
        "Tenis",
        "Atletas individuales",
        "Toma de decisiones",
        "Tiempo de reaccion",
        "Atencion bajo presion",
        "Resistencia cognitiva",
      ],
      sharedNote:
        "Neurociencia clinica y NeuroPerformance son aplicaciones del mismo modelo cientifico integrado, no negocios separados.",
    },
    sessionStructure: {
      eyebrow: "ESTRUCTURA DE SESION",
      title: "Un recorrido de intervencion estructurado de 90 minutos",
      description:
        "Cada sesion sigue una distribucion definida del tiempo a traves de la secuencia MNSI.",
      segments: [
        { duration: "10 min", phase: "Regulacion" },
        { duration: "15 min", phase: "Neuromodulacion" },
        { duration: "25 min", phase: "Entrenamiento cognitivo digital" },
        { duration: "20 min", phase: "Integracion analogica" },
        { duration: "15 min", phase: "Consolidacion sensorimotora" },
        { duration: "5 min", phase: "Transferencia funcional" },
      ],
      note:
        "La duracion y los componentes de cada sesion se individualizan segun hallazgos de evaluacion, juicio clinico y metas funcionales.",
    },
    outcomeMonitoring: {
      eyebrow: "MONITOREO DE RESULTADOS",
      title: "Seguimiento del cambio funcional",
      description:
        "El monitoreo conecta indicadores de sesion con la progresion funcional global.",
      points: [
        "perfil de linea base",
        "indicadores de sesion",
        "progresion cognitiva",
        "transferencia funcional",
        "resultados clinicos o especificos del deporte",
        "reevaluacion periodica",
      ],
      note:
        "El monitoreo de resultados orienta el razonamiento clinico y la planeacion del rendimiento, pero no representa resultados garantizados.",
    },
    locations: {
      eyebrow: "UBICACIONES",
      title: "Centros actuales",
      centers: [
        { city: "Houston, Texas", organization: "NeuroSports USA" },
        { city: "Bogota, Colombia", organization: "CENPA IPS" },
        { city: "Bucaramanga, Colombia", organization: "CENPA IPS" },
      ],
      note:
        "NeuroSports USA y CENPA IPS son organizaciones separadas que comparten contenido cientifico y principios de intervencion.",
    },
    finalCta: {
      eyebrow: "CTA FINAL",
      title: "Comienza con una evaluacion funcional",
      text:
        "Todo camino clinico y de rendimiento comienza comprendiendo el perfil cerebral individual, las prioridades funcionales y los objetivos en contexto real.",
      buttonLabel: "Agendar evaluacion",
    },
  },
};

export function getIntegratedModelContent(
  locale: IntegratedModelLocale = "en",
): IntegratedModelPageContent {
  return integratedModelContent[locale] ?? integratedModelContent.en;
}