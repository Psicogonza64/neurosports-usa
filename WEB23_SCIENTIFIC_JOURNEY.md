# WEB-23: Scientific Journey

## Archivos modificados

- `components/diagrams/ScientificJourneyDiagram.tsx`
- `lib/neurosports-hero-interactive-content.ts`
- `WEB23_SCIENTIFIC_JOURNEY.md`

## Componentes

Se mantuvo la arquitectura compartida de `ScientificJourneyDiagram`, utilizada por las experiencias públicas de Home, What We Do, Integrated Model y Technology. No se reemplazó el diagrama por tarjetas independientes.

## Interacción

- Los seis nodos mantienen su posición y conexiones científicas.
- Hover y foco de teclado activan el nodo, resaltan sus conexiones principales y muestran el panel de detalle.
- Click alterna el estado del nodo.
- El panel muestra una explicación prudente y los puntos funcionales mínimos para cada nodo.
- Escape y el control de cierre permiten cerrar el detalle.
- Los enlaces de ampliación existentes se conservaron.

## Responsive y accesibilidad

- Desktop/tablet conserva el diagrama con conexiones SVG y nodos posicionados.
- Mobile conserva una secuencia vertical con conectores y panel expandible.
- Los nodos son botones nativos con `aria-pressed`, `aria-expanded`, `aria-controls` y foco visible.
- Las conexiones y la silueta son decorativas para lectores de pantalla.
- Se respetan los estados `prefers-reduced-motion` existentes.

## Validación

- Validación estática de los dos archivos modificados: sin errores.
- `npm run build`: exitoso con Next.js 16.2.10; compilación, TypeScript, page data y generación estática completados sin errores.
- Rutas objetivo: `/`, `/what-we-do`, `/integrated-model`, `/technology`, `/research`, `/schedule`.

## Scientific governance

El contenido añadido describe funciones y aplicaciones del modelo sin inventar estadísticas, resultados clínicos ni afirmaciones de eficacia. RSFN y MNSI se presentan como elementos del recorrido científico institucional, no como productos comerciales.

## MNSI Clinical Suite

Confirmado: no se modificaron `/clinical`, `app/clinical`, `components/clinical`, `app/api/clinical`, Schedule, Google Calendar, APIs de reserva, Navbar, Footer, branding institucional, variables de entorno, `.env.local` ni la configuración de Vercel.

## Git

Commit generado: `b9c0a52` (`WEB-23: build interactive scientific journey`). Push exitoso a `origin/main`.
