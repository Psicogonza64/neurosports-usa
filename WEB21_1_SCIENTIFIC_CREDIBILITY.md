# WEB-21.1 Scientific Credibility Layer

## Objetivo
Incorporar una capa de credibilidad cientifica e institucional sobre la web publica de NeuroSports USA reutilizando la arquitectura visual consolidada en WEB-20, sin alterar navegacion, Schedule, APIs ni logica de negocio.

## Alcance aplicado
Se trabajaron unicamente las areas objetivo:
- Home
- Research
- What We Do
- Integrated Model

## Cambios implementados

### 1) `ProprietaryMethodsSection` reutilizable
Se creo un nuevo componente reusable para presentar metodologias institucionales diferenciadas:
- RSFN
- MNSI
- NeuroPerformance

Archivo:
- `components/experience/proprietary-methods-section.tsx`

Caracteristicas:
- estructura institucional consistente (label, title, description, cards)
- tarjetas visuales homologadas con `ScientificCard`
- CTA opcional por metodo
- responsive por grid `md/xl`

Integraciones:
- Home: bloque `ProprietaryMethodsHomeSection`
- What We Do: bloque `ProprietaryMethodsBlock`
- Integrated Model: bloque `ProprietaryMethodsModelSection`
- Research: bloque `InstitutionalModelsSection`

### 2) Integracion estrategica de `InstitutionalSignalsGrid`
Se mantuvo y fortalecio el uso del grid institucional en posicion estrategica de Research:
- `ResearchLinesSection` usa `InstitutionalSignalsGrid` para comunicar lineas cientificas actuales.

Adicionalmente se conserva su uso previo en Home (preview de Research y Technology) dentro de la estetica WEB-20.

### 3) Refinamiento de Research en 4 capas
Se implemento una pagina publica dedicada `/research` con la estructura solicitada:

1. Research Lines
2. Institutional Models
3. Scientific Development
4. Clinical Translation

Archivos:
- `app/research/page.tsx`
- `modules/website/research/page.tsx`

Notas de contenido:
- se reutiliza contenido existente de `neurosports-home-content`, `integrated-model/data` y `neurosports-public-content`
- no se agregan estadisticas ni resultados inventados
- los nuevos bloques no validados se marcan explicitamente como `Pending validation`

### 4) Componentes reutilizables para capas futuras
Se crearon componentes para futuras publicaciones, proyectos, colaboraciones e indicadores institucionales:
- `PublicationsBoard`
- `ProjectsBoard`
- `CollaborationsBoard`
- `IndicatorsBoard`

Archivo:
- `components/experience/institutional-evidence-boards.tsx`

Cada card comunica estado explicito de validacion institucional para evitar afirmaciones no verificadas.

### 5) Integracion en Home
Se agrego una nueva seccion reutilizable para metodos propietarios:
- `modules/website/home/sections/proprietary-methods-section.tsx`
- export en `modules/website/home/sections/index.ts`
- uso en `app/page.tsx`

### 6) Integracion en What We Do e Integrated Model
- `modules/website/what-we-do/page.tsx` incorpora `ProprietaryMethodsBlock`.
- `modules/website/integrated-model/page.tsx` incorpora `ProprietaryMethodsModelSection`.

## Cumplimiento de restricciones
- Sin cambios de flujo de navegacion.
- Sin cambios en `/schedule`.
- Sin cambios en APIs ni logica de negocio.
- Sin cifras, publicaciones o afiliaciones inventadas.
- Placeholders nuevos marcados como `Pending validation`.

## Verificacion tecnica
Comando ejecutado:
- `npm run build`

Resultado:
- build de produccion exitoso
- rutas confirmadas en salida de build:
  - `/`
  - `/research`
  - `/what-we-do`
  - `/integrated-model`
  - `/schedule`

## Archivos modificados en este sprint
- `app/page.tsx`
- `app/research/page.tsx`
- `components/experience/index.ts`
- `components/experience/institutional-evidence-boards.tsx`
- `components/experience/proprietary-methods-section.tsx`
- `modules/website/home/sections/index.ts`
- `modules/website/home/sections/proprietary-methods-section.tsx`
- `modules/website/integrated-model/page.tsx`
- `modules/website/research/page.tsx`
- `modules/website/what-we-do/page.tsx`
- `WEB21_1_SCIENTIFIC_CREDIBILITY.md`
