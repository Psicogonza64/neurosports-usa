# WEB-20.3 Scientific Design Language

## Objetivo del sprint
Consolidar el lenguaje visual cientifico-institucional definido en Hero RSFN sobre las secciones:
- What We Do
- Integrated Model
- Technology
- Research
- Locations

Sin cambios de arquitectura, contenido funcional ni logica de negocio.

## Alcance aplicado
- Unificacion del sistema de tarjetas con un componente reutilizable (`ScientificCard`) y una clase visual comun (`nsu-scientific-card`).
- Estandarizacion de estructura de seccion institucional mediante `ScientificSectionBlock` con el orden:
  1. etiqueta
  2. titulo
  3. descripcion
  4. contenido
  5. llamada a la accion
- Ritmo visual consistente usando espaciados uniformes y stacks estandar (`nsu-section-stack`, `nsu-content-stack`).
- Homogeneizacion de microinteracciones con tokens globales de movimiento:
  - `--motion-duration-ui: 220ms`
  - `--motion-ease-ui: cubic-bezier(0.22, 1, 0.36, 1)`
- Preparacion de componentes reutilizables para futuras capas de evidencia, publicaciones, metricas e indicadores institucionales:
  - `InstitutionalSignalsGrid`

## Componentes refinados y nuevos

### Nuevos
- `components/experience/scientific-card.tsx`
  - Envoltura visual institucional sobre `Card`.
  - Soporte de estado `interactive` para hover/focus coherente.

- `components/experience/scientific-section-block.tsx`
  - Estructura reusable de seccion con `SectionHeader + content + cta`.
  - Mantiene accesibilidad semantica (`section`, `id`) y ritmo uniforme.

- `components/experience/institutional-signals-grid.tsx`
  - Grid reutilizable para bloques institucionales (evidencia/publicaciones/metricas/indicadores).
  - Configuracion de columnas por breakpoint.

### Ajustados
- `components/experience/feature-grid.tsx`
  - Migrado a `ScientificCard` para estandarizar tarjetas en What We Do.

- `components/experience/locations-explorer.tsx`
  - Migrado a `ScientificCard` en tarjetas de centros, panel expandido y nota legal.
  - Sin cambios en flujo interactivo, estado ni acciones.

- `components/experience/index.ts`
  - Exporta nuevos componentes para reutilizacion transversal.

## Secciones impactadas

### What We Do
- Conserva flujo y contenido.
- Tarjetas de deliverables unificadas con `ScientificCard` via `FeatureGrid`.

### Integrated Model
- Encabezados migrados a `SectionHeader` para consistencia de jerarquia tipografica.
- Tarjetas migradas a `ScientificCard` en:
  - RSFN
  - MNSI phases
  - Applications
  - Session structure
  - Outcome monitoring
  - Final CTA

### Technology
- Encabezados migrados a `SectionHeader` en todos los bloques.
- Tarjetas migradas a `ScientificCard` en:
  - Technology overview
  - Assessment
  - Neuromodulation
  - Digital training
  - Transfer
  - NeuroPerformance
  - Tracking
  - Responsible use
  - Final CTA

### Research
- `ResearchSection` migrada a `ScientificSectionBlock`.
- Grid de items migrado a `InstitutionalSignalsGrid`.
- Bloque principal migrado a `ScientificCard`.

### Locations
- Home locations section migrada a `ScientificSectionBlock`.
- `LocationsExplorer` unificado con `ScientificCard`.

## Sistema de transiciones y microinteracciones
- Las transiciones de `button` y `a` ahora comparten los mismos tokens globales de duracion y curva.
- `ScientificCard` aplica elevacion institucional consistente en hover/focus-within.
- Respeto de `prefers-reduced-motion` para evitar desplazamientos visuales en usuarios con preferencia reducida.

## Accesibilidad, rendimiento y responsive
- No se alteraron rutas, data fetching, formularios ni logica de negocio.
- Se mantuvieron semantica estructural y targets de focus.
- El comportamiento responsive se preserva con las mismas bases de grid y breakpoints existentes.
- Cambios centrados en clases y composicion visual reusable, minimizando impacto de rendimiento.

## Exclusiones confirmadas
- Sin cambios en navegacion.
- Sin cambios en formulario de Schedule.
- Sin cambios en logica de negocio ni APIs.
- Sin inclusion de nuevo contenido institucional en esta fase.
