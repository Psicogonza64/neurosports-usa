# SPRINT SKP-1 Scientific Knowledge Hub

## Objetivo
Crear la arquitectura inicial de una capa institucional de conocimiento cientifico dentro de NeuroSports USA, manteniendo la web publica como punto de entrada.

## Alcance aplicado
- Se creo una seccion reusable llamada `ScientificKnowledgeHub`.
- Se integro en Home sin modificar navegacion global, Schedule, APIs ni logica de negocio.
- Se establecio enlace conceptual con Research e Integrated Model mediante enlaces estructurales.

## Componente reusable

### ScientificKnowledgeHub
Archivo:
- `components/experience/scientific-knowledge-hub.tsx`

Proposito:
- organizar seis areas institucionales de conocimiento cientifico
- diferenciar visualmente metodologias actuales vs lineas futuras
- mantener consistencia visual WEB-20 y WEB-21

Modelo de arquitectura:
- `ScientificKnowledgeHubArea` con:
  - `title`
  - `description`
  - `status` (`Current methodology` o `Future development line`)
  - `relatedTo`
  - `href` opcional

Reglas de comunicacion aplicadas:
- no se afirman resultados cientificos no validados
- no se declara disponibilidad comercial
- se incluye nota de gobernanza explicita en la seccion

## Areas incluidas
- Methodologies
- Research
- Clinical Translation
- Education
- Innovation
- Publications

Clasificacion mostrada:
- Metodologias actuales:
  - Methodologies
  - Research
  - Clinical Translation
- Lineas futuras de desarrollo:
  - Education
  - Innovation
  - Publications

## Integracion en Home

Se creo adaptador de contenido para Home:
- `modules/website/home/sections/scientific-knowledge-hub-section.tsx`

Export y uso:
- `modules/website/home/sections/index.ts`
- `app/page.tsx`

Ubicacion en flujo Home:
- despues de `ScientificEcosystemHomeSection`
- antes de `TechnologySection`

## Enlace conceptual con Research e Integrated Model
Desde las cards del hub se enlaza a:
- Research:
  - `/research#research-lines`
  - `/research#clinical-translation`
  - `/research#scientific-development`
- Integrated Model:
  - `/integrated-model#institutional-methods`
  - `/integrated-model#outcome-monitoring`

## Consistencia visual WEB-20 y WEB-21
Se reutilizaron primitives existentes:
- `SectionHeader`
- `SectionSpacing`
- `ScientificCard`
- contenedor y stacks institucionales (`nsu-section-stack`, `nsu-content-stack`)

No se introdujeron nuevos patrones de navegacion ni cambios en arquitectura funcional.

## Responsive y accesibilidad
Comportamiento esperado:
- Desktop: columna de contexto institucional + grid de 6 areas.
- Tablet: grid intermedio en 2 columnas.
- Movil: lectura secuencial en una columna.

Accesibilidad:
- estructura semantica por `section` e `id`
- etiquetas de estado visibles por area
- enlaces con texto explicito
- contraste y estados hover heredados del sistema institucional

## Restricciones respetadas
- sin cambios en navegacion global
- sin cambios en Schedule
- sin cambios en APIs
- sin cambios en logica de negocio

## Verificacion
Comando ejecutado:
- `npm run build`

Rutas verificadas en el resultado de build:
- Home (`/`)
- Research (`/research`)
- Integrated Model (`/integrated-model`)
- Schedule (`/schedule`)

Resultado:
- build exitoso