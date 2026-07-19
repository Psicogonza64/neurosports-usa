# WEB20_2_HERO

## Objetivo de la fase
Elevar el Hero de NeuroSports USA hacia una experiencia RSFN interactiva con acabado institucional, sin modificar arquitectura del sitio ni agregar secciones nuevas.

## Alcance aplicado
Solo se trabajó sobre el Hero y componentes directamente relacionados:
- `components/experience/neurosports-hero-experience.tsx`
- `components/diagrams/ScientificJourneyDiagram.tsx`

No se modificaron secciones de `What We Do`, `Integrated Model`, `Technology` ni `Schedule`.

## Decisiones de diseño y por qué

### 1) Profundidad visual sobria en el panel derecho
Cambio:
- Se refinó el contenedor del panel RSFN con iluminación radial sutil y sombra controlada.

Motivo:
- Generar sensación de capa y profundidad sin estética llamativa ni efectos de tipo startup.

### 2) Visualización RSFN como objeto interactivo principal
Cambio:
- El panel del Hero usa el modo `hero` del diagrama para priorizar presencia visual y legibilidad de nodos.

Motivo:
- Reforzar que la visualización RSFN es un elemento científico activo, no una imagen decorativa.

### 3) Microinteracciones y transiciones fluidas
Cambio:
- Se añadieron transiciones suaves de transformación en capas internas (brillo, silueta, conectores).
- Los nodos mantienen estados hover/focus/active con mayor lectura institucional.

Motivo:
- Aportar calidad percibida y feedback visual preciso sin distraer del contenido.

### 4) Parallax ligero por cursor y scroll
Cambio:
- Se añadieron variables CSS dinámicas (`--rsfn-cursor-x`, `--rsfn-cursor-y`, `--rsfn-scroll`) para mover capas con desplazamientos mínimos.
- Parallax de cursor solo en dispositivos con `hover + pointer:fine`.
- Scroll parallax limitado y clamped para evitar exceso de movimiento.

Motivo:
- Entregar sensación de profundidad y respuesta contextual con control estricto de amplitud.

### 5) Accesibilidad y reduced motion
Cambio:
- Respeto explícito de `prefers-reduced-motion` para desactivar animación/parallax.
- Se conservaron y reforzaron etiquetas y estados interactivos de nodos.

Motivo:
- Mantener compatibilidad accesible y experiencia robusta para usuarios con sensibilidad al movimiento.

### 6) Rendimiento
Cambio:
- Se utilizó `requestAnimationFrame` para actualizar variables de movimiento.
- Listeners pasivos para scroll y límites de movimiento para evitar trabajo innecesario.

Motivo:
- Sostener buena performance en escritorio y móviles sin introducir librerías extra.

## Resumen técnico
- No se añadieron dependencias.
- No se alteró navegación, rutas ni flujo de booking.
- No se cambió integración de Google Calendar ni variables de entorno.
- El Hero establece ahora un lenguaje visual más premium, científico y creíble para fases siguientes.
