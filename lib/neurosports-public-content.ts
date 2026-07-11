export type PublicContentLocale = "en" | "es";

export type PublicProcessItem = {
  id: string;
  title: string;
  shortDescription: string;
  expandedDescription: string;
  ctaLabel: string;
  ctaHref: string;
  category?: string;
};

export type PublicLocationItem = {
  id: string;
  city: string;
  organization: string;
  addressLines: string[];
  viewHref: string;
  directionsHref: string;
  contactHref: string;
  viewLabel: string;
  directionsLabel: string;
  contactLabel: string;
};

type PublicContent = {
  processExplorer: {
    eyebrow: string;
    title: string;
    description: string;
    sequenceLabel: string;
    items: PublicProcessItem[];
  };
  locations: {
    eyebrow: string;
    title: string;
    disclaimer: string;
    items: PublicLocationItem[];
  };
};

const enProcessItems: PublicProcessItem[] = [
  {
    id: "functional-evaluation",
    title: "Functional Evaluation Pathway",
    shortDescription:
      "A comprehensive assessment of cognitive function, behavior, clinical history and real-world performance designed to establish an individual baseline, define practical priorities, and guide next-step planning across rehabilitation, academic support and human-performance pathways with clear professional direction.",
    expandedDescription:
      "Functional Evaluation establishes an evidence-informed baseline before any intervention pathway begins. NeuroSports USA integrates structured neuropsychological testing, clinical observation, developmental and medical context, and functional information from daily-life, academic or performance environments. This process helps identify strengths, vulnerabilities and priority targets that can guide individualized recommendations for rehabilitation, academic support or NeuroPerformance planning. Public reporting remains focused on functional interpretation and practical guidance. Internal scoring structures, proprietary weighting methods and decision criteria are managed by licensed professionals and are not published in public-facing materials.",
    ctaLabel: "Explore Evaluation",
    ctaHref: "/what-we-do",
    category: "Foundation",
  },
  {
    id: "functional-brain-networks-rsfn",
    title: "Functional Brain Networks RSFN",
    shortDescription:
      "A functional interpretation of how brain systems support cognition, behavior and performance, linking observable findings with broader network-level patterns that help professionals organize intervention priorities, frame hypothesis-driven planning, and monitor progression across clinical, academic and sport-related functional demands.",
    expandedDescription:
      "Functional Brain Networks, referenced through RSFN, provide a conceptual framework for understanding how cognitive systems interact with behavior and real-world demands. NeuroSports USA uses this perspective to connect assessment findings with attention, regulation, executive control and adaptive performance patterns. Public content explains this framework at a clinical-educational level so families, patients and athletes can understand why targeted planning matters. Internal inference logic, network-priority rules and proprietary interpretation criteria remain protected as part of supervised professional practice. RSFN supports clinical reasoning and hypothesis development; it is not presented as an automated diagnostic system or a guarantee of outcomes.",
    ctaLabel: "Explore Our Science",
    ctaHref: "/research",
    category: "Science",
  },
  {
    id: "mnsi",
    title: "MNSI Intervention Framework",
    shortDescription:
      "A structured intervention model integrating brain-state preparation, cognitive activation, consolidation and functional transfer through a sequenced workflow designed to support individualized progression across clinical rehabilitation, academic demands, and performance-oriented environments with monitored adaptation over time.",
    expandedDescription:
      "MNSI, Multimodal NeuroSequential Integration, organizes intervention through a progressive structure that moves from regulation and targeted activation toward cognitive work, integration and transfer. The public architecture communicates the sequence so visitors can understand the logic of preparation, training and application without exposing proprietary clinical parameters. Programs are individualized according to evaluation findings, professional judgment and functional goals in care or performance settings. Specific technical configurations, stimulation settings, task protocols and internal adaptation criteria are intentionally excluded from public materials. Implementation always occurs under trained supervision with continuous monitoring and periodic adjustment based on functional response.",
    ctaLabel: "Explore the Model",
    ctaHref: "/integrated-model",
    category: "Intervention",
  },
  {
    id: "clinical-neuroscience",
    title: "Clinical Neuroscience Services",
    shortDescription:
      "Evaluation and rehabilitation for children, adolescents, adults and older adults, delivered through structured pathways that support cognitive function, behavior, development and day-to-day participation across clinical and educational environments with individualized planning aligned to functional needs and context.",
    expandedDescription:
      "Clinical Neuroscience services are designed to support individuals with cognitive, behavioral, developmental, neurological or psychiatric needs across the lifespan. NeuroSports USA may integrate neuropsychological evaluation, functional diagnosis, cognitive rehabilitation and support strategies for academic or daily-life functioning. The objective is to guide individualized care planning and monitor practical change over time with evidence-informed criteria. Public content communicates scope and structure while avoiding publication of internal clinical algorithms, protocol specifications or proprietary decision pathways. Recommendations are always adapted to each profile, contextual demands and multidisciplinary clinical oversight rather than standardized one-size-fits-all sequences.",
    ctaLabel: "Explore Clinical Services",
    ctaHref: "/what-we-do",
    category: "Application",
  },
  {
    id: "neuroperformance",
    title: "NeuroPerformance Applied Pathway",
    shortDescription:
      "Cognitive evaluation and training for athletes and performance environments, focused on attention, decision quality, reaction timing and sustained mental execution under pressure in role-specific and context-aware demands, while supporting individualized progression according to competitive profile and goals.",
    expandedDescription:
      "NeuroPerformance applies functional neuroscience to competitive and high-demand environments where cognitive efficiency influences execution quality. Programs can address attention control, decision-making speed, reaction timing, cognitive endurance and transfer to sport-specific performance contexts. NeuroSports USA structures this work from individualized profiling and functional priorities, not generic drills. Public communication remains conceptual and evidence-informed, without exposing proprietary training architecture, internal adaptation algorithms or detailed protocol criteria. Progress is monitored through functional indicators and contextual observation under professional supervision, recognizing that outcomes depend on participant characteristics, training adherence, competitive context and coordinated multidisciplinary support.",
    ctaLabel: "Explore NeuroPerformance",
    ctaHref: "/what-we-do",
    category: "Application",
  },
  {
    id: "functional-outcomes",
    title: "Functional Outcomes Monitoring",
    shortDescription:
      "Progress is measured through cognitive, clinical, academic, daily-life or sport-specific indicators to monitor change, guide program adjustments and support realistic decision-making across rehabilitation and human-performance pathways, using periodic reassessment and contextual observation to inform next actions.",
    expandedDescription:
      "Functional Outcomes are tracked using baseline information, session-level indicators, contextual observation and periodic reassessment checkpoints. NeuroSports USA uses monitoring to guide adjustments, reinforce useful gains and evaluate transfer into clinical, academic, daily-life or sport demands. Public materials clarify that this process supports evidence-informed decision-making rather than guaranteed results. Progress can vary according to participant profile, clinical condition, engagement quality, environmental factors and program adherence over time. Internal scoring formulas, weighting models and proprietary decision thresholds remain protected and are not disclosed in public-facing content. Outcome interpretation is conducted by qualified professionals within individualized care frameworks.",
    ctaLabel: "How We Track Progress",
    ctaHref: "/integrated-model#outcome-monitoring",
    category: "Monitoring",
  },
];

const esProcessItems: PublicProcessItem[] = [
  {
    id: "functional-evaluation",
    title: "Ruta de Evaluacion Funcional",
    shortDescription:
      "Una evaluacion integral de funcion cognitiva, conducta, historia clinica y desempeno en contexto real para definir una linea base individual, establecer prioridades funcionales claras y orientar la planificacion posterior en clinica, academia y rendimiento bajo criterio profesional.",
    expandedDescription:
      "La Evaluacion Funcional establece una linea base informada por evidencia antes de iniciar cualquier ruta de intervencion. NeuroSports USA integra pruebas neuropsicologicas estructuradas, observacion clinica, contexto medico y de desarrollo, e informacion funcional de entornos cotidianos, academicos o de rendimiento. Este proceso permite identificar fortalezas, vulnerabilidades y prioridades que orientan recomendaciones individualizadas para rehabilitacion, apoyo academico o programas de NeuroPerformance. El reporte publico se mantiene en interpretacion funcional y orientacion practica. Estructuras internas de puntuacion, ponderaciones propietarias y criterios de decision se reservan para supervision profesional.",
    ctaLabel: "Explorar evaluacion",
    ctaHref: "/what-we-do",
    category: "Fundamento",
  },
  {
    id: "functional-brain-networks-rsfn",
    title: "Redes Cerebrales Funcionales RSFN",
    shortDescription:
      "Una interpretacion funcional de como los sistemas cerebrales sostienen cognicion, conducta y rendimiento, conectando hallazgos observables con patrones de red que ayudan a organizar prioridades de intervencion, orientar hipotesis clinicas y monitorear progresion funcional en distintos contextos.",
    expandedDescription:
      "Las Redes Cerebrales Funcionales, referenciadas como RSFN, aportan un marco conceptual para comprender como interactuan los sistemas cognitivos con la conducta y las demandas reales. NeuroSports USA utiliza esta perspectiva para vincular hallazgos de evaluacion con atencion, regulacion, control ejecutivo y adaptacion funcional. El contenido publico explica esta base en lenguaje clinico-educativo para facilitar comprension sin exponer reglas internas propietarias. La logica de inferencia, criterios de prioridad de red y reglas de decision quedan protegidos bajo practica profesional supervisada. RSFN orienta razonamiento clinico y generacion de hipotesis, no promesas de resultado.",
    ctaLabel: "Explorar ciencia",
    ctaHref: "/research",
    category: "Ciencia",
  },
  {
    id: "mnsi",
    title: "Marco de Intervencion MNSI",
    shortDescription:
      "Un modelo de intervencion estructurado que integra preparacion del estado cerebral, activacion cognitiva, consolidacion y transferencia funcional mediante una secuencia progresiva adaptada a objetivos clinicos y de rendimiento, con seguimiento profesional y ajustes individualizados durante el proceso.",
    expandedDescription:
      "MNSI, Integracion NeuroSecuencial Multimodal, organiza la intervencion mediante una estructura progresiva que avanza desde regulacion y activacion objetivo hacia trabajo cognitivo, integracion y transferencia funcional. La arquitectura publica comunica la logica de esta secuencia para facilitar comprension institucional sin divulgar parametros tecnicos propietarios. Los programas se individualizan segun hallazgos de evaluacion, juicio profesional y metas funcionales en contextos clinicos o de rendimiento. Configuraciones internas, criterios de adaptacion y protocolos detallados permanecen fuera del contenido publico. La implementacion siempre ocurre bajo supervision especializada con monitoreo continuo y ajustes periodicos.",
    ctaLabel: "Explorar modelo",
    ctaHref: "/integrated-model",
    category: "Intervencion",
  },
  {
    id: "clinical-neuroscience",
    title: "Servicios de Neurociencia Clinica",
    shortDescription:
      "Evaluacion y rehabilitacion para ninos, adolescentes, adultos y adultos mayores mediante rutas estructuradas que apoyan funcion cognitiva, conducta, desarrollo y participacion funcional en entornos clinicos y educativos, con planeacion individualizada segun necesidades y contexto real.",
    expandedDescription:
      "Los servicios de Neurociencia Clinica se orientan a necesidades cognitivas, conductuales, del desarrollo, neurologicas y psiquiatricas a lo largo del ciclo vital. NeuroSports USA puede integrar evaluacion neuropsicologica, diagnostico funcional, rehabilitacion cognitiva y apoyos para funcionamiento academico o cotidiano. El objetivo es guiar planes individualizados y monitorear cambios funcionales con criterios informados por evidencia. El contenido publico presenta alcance y estructura sin exponer algoritmos clinicos internos ni protocolos propietarios. Toda recomendacion se adapta al perfil individual, demandas del contexto y supervision multidisciplinaria, evitando secuencias rigidas o generalizaciones no personalizadas.",
    ctaLabel: "Explorar servicios clinicos",
    ctaHref: "/what-we-do",
    category: "Aplicacion",
  },
  {
    id: "neuroperformance",
    title: "Ruta Aplicada NeuroPerformance",
    shortDescription:
      "Evaluacion y entrenamiento cognitivo para atletas y entornos de alto rendimiento, enfocado en atencion, toma de decisiones, tiempo de reaccion y ejecucion mental sostenida bajo presion competitiva, con progresion individualizada segun perfil, rol y objetivos funcionales.",
    expandedDescription:
      "NeuroPerformance aplica neurociencia funcional a contextos competitivos donde la eficiencia cognitiva influye en la calidad de ejecucion. Los programas pueden trabajar control atencional, velocidad de decision, tiempo de reaccion, resistencia cognitiva y transferencia a exigencias especificas del deporte. NeuroSports USA estructura esta aplicacion desde perfiles individuales y prioridades funcionales, no desde rutinas generales. La comunicacion publica se mantiene conceptual y basada en evidencia, sin divulgar arquitectura interna de entrenamiento ni criterios propietarios de ajuste. El progreso se monitorea con indicadores funcionales y observacion contextual bajo supervision profesional, reconociendo variabilidad individual y demandas del entorno.",
    ctaLabel: "Explorar NeuroPerformance",
    ctaHref: "/what-we-do",
    category: "Aplicacion",
  },
  {
    id: "functional-outcomes",
    title: "Monitoreo de Resultados Funcionales",
    shortDescription:
      "El progreso se mide mediante indicadores cognitivos, clinicos, academicos, cotidianos o deportivos para monitorear cambios, orientar ajustes del programa y apoyar decisiones realistas de continuidad, incorporando reevaluacion periodica y observacion funcional para planificar siguientes pasos.",
    expandedDescription:
      "Los Resultados Funcionales se siguen con medidas de linea base, indicadores de sesion, observacion en contexto y reevaluaciones periodicas. NeuroSports USA utiliza este monitoreo para ajustar intervenciones, consolidar avances utiles y valorar transferencia a demandas clinicas, academicas, cotidianas o deportivas. El contenido publico aclara que este enfoque respalda decisiones informadas, no garantias de resultado. La progresion depende del perfil individual, condicion clinica, calidad de participacion, factores del entorno y adherencia al programa. Formulas internas de puntuacion, modelos de ponderacion y umbrales propietarios de decision permanecen protegidos. La interpretacion siempre corresponde a profesionales calificados dentro de planes individualizados.",
    ctaLabel: "Como monitoreamos progreso",
    ctaHref: "/integrated-model#outcome-monitoring",
    category: "Monitoreo",
  },
];

const contentByLocale: Record<PublicContentLocale, PublicContent> = {
  en: {
    processExplorer: {
      eyebrow: "Public Process Architecture",
      title: "How NeuroSports USA Works",
      description:
        "A progressive public view of our integrated framework, designed to explain purpose, sequence and functional application without publishing proprietary clinical methodology.",
      sequenceLabel: "Scientific sequence",
      items: enProcessItems,
    },
    locations: {
      eyebrow: "Current Centers",
      title: "NeuroSports USA and CENPA IPS",
      disclaimer:
        "NeuroSports USA and CENPA IPS are separate organizations that share scientific content and intervention principles.",
      items: [
        {
          id: "houston",
          city: "HOUSTON",
          organization: "NeuroSports USA",
          addressLines: [
            "11777 Katy Freeway, Suite 410S",
            "Houston, Texas 77079",
            "United States",
          ],
          viewHref: "#locations",
          directionsHref: "https://maps.google.com/?q=11777+Katy+Freeway+Suite+410S+Houston+Texas+77079",
          contactHref: "#contact",
          viewLabel: "View Location",
          directionsLabel: "Get Directions",
          contactLabel: "Schedule Evaluation",
        },
        {
          id: "bogota",
          city: "BOGOTA",
          organization: "CENPA IPS",
          addressLines: [
            "Carrera 23 No. 87-10",
            "Bogota D.C.",
            "Colombia",
          ],
          viewHref: "#locations",
          directionsHref: "https://maps.google.com/?q=Carrera+23+No.+87-10+Bogota+Colombia",
          contactHref: "#contact",
          viewLabel: "View Location",
          directionsLabel: "Get Directions",
          contactLabel: "Contact Center",
        },
        {
          id: "bucaramanga",
          city: "BUCARAMANGA",
          organization: "CENPA IPS",
          addressLines: [
            "Carrera 35A No. 48-134, Piso 2",
            "Cabecera del Llano",
            "Bucaramanga, Santander",
            "Colombia",
          ],
          viewHref: "#locations",
          directionsHref:
            "https://maps.google.com/?q=Carrera+35A+No.+48-134+Piso+2+Bucaramanga+Santander+Colombia",
          contactHref: "#contact",
          viewLabel: "View Location",
          directionsLabel: "Get Directions",
          contactLabel: "Contact Center",
        },
      ],
    },
  },
  es: {
    processExplorer: {
      eyebrow: "Arquitectura Publica",
      title: "Como funciona NeuroSports USA",
      description:
        "Vista publica progresiva del marco integrado para explicar proposito, secuencia y aplicacion funcional sin divulgar metodologia clinica propietaria.",
      sequenceLabel: "Secuencia cientifica",
      items: esProcessItems,
    },
    locations: {
      eyebrow: "Centros actuales",
      title: "NeuroSports USA y CENPA IPS",
      disclaimer:
        "NeuroSports USA y CENPA IPS son organizaciones separadas que comparten contenido cientifico y principios de intervencion.",
      items: [
        {
          id: "houston",
          city: "HOUSTON",
          organization: "NeuroSports USA",
          addressLines: [
            "11777 Katy Freeway, Suite 410S",
            "Houston, Texas 77079",
            "United States",
          ],
          viewHref: "#locations",
          directionsHref: "https://maps.google.com/?q=11777+Katy+Freeway+Suite+410S+Houston+Texas+77079",
          contactHref: "#contact",
          viewLabel: "Ver ubicacion",
          directionsLabel: "Como llegar",
          contactLabel: "Agendar evaluacion",
        },
        {
          id: "bogota",
          city: "BOGOTA",
          organization: "CENPA IPS",
          addressLines: [
            "Carrera 23 No. 87-10",
            "Bogota D.C.",
            "Colombia",
          ],
          viewHref: "#locations",
          directionsHref: "https://maps.google.com/?q=Carrera+23+No.+87-10+Bogota+Colombia",
          contactHref: "#contact",
          viewLabel: "Ver ubicacion",
          directionsLabel: "Como llegar",
          contactLabel: "Contactar centro",
        },
        {
          id: "bucaramanga",
          city: "BUCARAMANGA",
          organization: "CENPA IPS",
          addressLines: [
            "Carrera 35A No. 48-134, Piso 2",
            "Cabecera del Llano",
            "Bucaramanga, Santander",
            "Colombia",
          ],
          viewHref: "#locations",
          directionsHref:
            "https://maps.google.com/?q=Carrera+35A+No.+48-134+Piso+2+Bucaramanga+Santander+Colombia",
          contactHref: "#contact",
          viewLabel: "Ver ubicacion",
          directionsLabel: "Como llegar",
          contactLabel: "Contactar centro",
        },
      ],
    },
  },
};

export function getNeuroSportsPublicContent(locale: PublicContentLocale = "en") {
  return contentByLocale[locale] ?? contentByLocale.en;
}
