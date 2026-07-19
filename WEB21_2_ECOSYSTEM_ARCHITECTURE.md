# WEB-21.2 NeuroSports Scientific Ecosystem Architecture

## Objetivo
Presentar de forma clara y visual la arquitectura institucional del ecosistema NeuroSports USA sin mezclar la web publica con plataformas clinicas o cientificas independientes.

## Alcance
Se implemento una seccion reutilizable denominada `ScientificEcosystemSection` e integrada en:
- Home
- Integrated Model

## Seccion reusable creada

### ScientificEcosystemSection
Archivo:
- `components/experience/scientific-ecosystem-section.tsx`

Proposito:
- mostrar una plataforma institucional central (NeuroSports USA)
- representar componentes del ecosistema con:
  - nombre
  - proposito breve
  - relacion con NeuroSports USA
  - estado institucional

Componentes mostrados:
- NeuroSports USA (plataforma institucional central)
- RSFN (metodologia cientifica)
- MNSI (modelo clinico de intervencion)
- NeuroPerformance (aplicacion deportiva)
- NeuroScanner (herramienta especializada futura)

Notas de cumplimiento:
- no se exponen funciones internas de MNSI Clinical Suite
- no se agregan rutas privadas ni formularios clinicos
- no se afirma disponibilidad comercial de RSFN, MNSI o NeuroScanner
- NeuroScanner se marca explicitamente como `Future tool - pending validation`

## Integraciones realizadas

### Home
- Se agrego `ScientificEcosystemHomeSection` en el flujo principal.
- Ubicacion: despues de `ProprietaryMethodsHomeSection` y antes de `TechnologySection`.

Archivos:
- `modules/website/home/sections/scientific-ecosystem-section.tsx`
- `modules/website/home/sections/index.ts`
- `app/page.tsx`

### Integrated Model
- Se agrego `ScientificEcosystemModelSection` como bloque institucional antes del cierre CTA.

Archivo:
- `modules/website/integrated-model/page.tsx`

## Estilo visual y consistencia
- Se reutilizan primitives WEB-20 / WEB-21.1:
  - `SectionHeader`
  - `SectionSpacing`
  - `ScientificCard`
  - tokens tipograficos y de espaciado existentes
- Sin cambios en sistema de animaciones ni microinteracciones globales.

## Responsive y accesibilidad
Comportamiento esperado:
- Desktop: layout en dos columnas (plataforma central a la izquierda y grid de componentes a la derecha).
- Tablet: reflujo vertical con grid de componentes en 2 columnas.
- Movil: una sola columna, lectura secuencial de plataforma y componentes.

Accesibilidad aplicada:
- jerarquia semantica de seccion y encabezados
- etiquetas de estado visibles por card
- texto explicito de relacion institucional por componente
- sin interacciones ocultas o dependientes de hover

## Restricciones respetadas
- sin cambios en Schedule
- sin cambios en APIs
- sin cambios en logica de negocio
- sin crear acceso clinico privado
- sin incorporar funcionalidades internas de MNSI Clinical Suite

## Build y verificacion
Comando ejecutado:
- `npm run build`

Verificacion solicitada:
- Home
- Integrated Model
- Schedule

Resultado:
- build exitoso y rutas publicas compiladas correctamente.

## Contenido provisional pendiente de validacion cientifica
- `NeuroScanner` como herramienta futura se presenta en estado:
  - `Future tool - pending validation`
- textos de desarrollo futuro asociados al ecosistema se mantienen en nivel institucional general y no comercial.
