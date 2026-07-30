# WEB-22.3 Final Institutional Wordmark

## Objetivo
Convertir el bloque de marca del navbar publico en un wordmark institucional con mayor presencia, manteniendo el estilo minimalista y la estructura existente.

## Archivo Modificado
- `components/layout/navbar.tsx`

## Ajustes de Wordmark
### NeuroSports
- Mobile: `20px`
- Tablet (`sm`): `22px`
- Desktop (`lg`): `25px`
- Peso tipografico: `font-bold` (700)
- Ajuste optico de kerning: `tracking-[0.01em]`

### The Brain Matters
- Mobile: `9px`
- Tablet (`sm`): `10px`
- Desktop (`lg`): `11.5px`
- Estilo: title case (no all caps)
- Tracking ligero: `tracking-[0.08em]`
- Contraste mejorado: `color-mix(in_srgb,var(--color-foreground)_68%,var(--color-muted))`

## Composicion del bloque de marca
- Estructura vertical mantenida en dos lineas.
- Separacion vertical ajustada con `pt-[5px]` para equilibrio entre unidad de marca y legibilidad.
- Misma familia tipografica del sitio (sin cambios de fuente).

## Altura del Navbar
- Ajuste de padding del contenedor principal:
  - Antes: `py-4 lg:py-[1.15rem]`
  - Ahora: `py-[17px] lg:py-[19px]`
- Incremento aproximado respecto al estado base previo del proyecto: +6px en altura total.

## Alcance y restricciones respetadas
- Solo se modifico `components/layout/navbar.tsx`.
- No hubo cambios en rutas, navegacion, layout estructural, ni logica.
- No se modifico MNSI Clinical Suite (`app/clinical`, `app/api/clinical`, `components/clinical`, `lib/server/clinical-*`, `types/clinical.ts`).

## Validacion tecnica
Comando ejecutado:

```bash
cmd /c rmdir /s /q .next ; npm run build
```

Resultado:
- Build completado sin errores.
- Rutas publicas `/` y `/schedule` compiladas correctamente.
