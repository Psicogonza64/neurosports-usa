# WEB-22.1 Brand Identity Refresh

## Objetivo
Actualizar la identidad visual institucional del encabezado (navbar) manteniendo el estilo cientifico, minimalista y premium del sitio.

## Archivos Modificados
- `components/layout/navbar.tsx`

## Cambios Implementados
1. Se reemplazo el texto de marca del navbar de `NeuroSports USA` por `NeuroSports`.
2. Se agrego el tagline `The Brain Matters` debajo del nombre principal.
3. Se ajusto la jerarquia visual del bloque de marca para cumplir el brief:
   - El tagline usa un tamano relativo de `0.37em` respecto al bloque de marca (aprox. 37%).
   - Se mantuvo la misma familia tipografica base del sitio (sin introducir fuentes nuevas).
   - Se redujo el peso visual del tagline (`font-medium` + color `var(--color-muted)`).
   - Se incremento el espaciado entre letras del tagline (`tracking-[0.26em]`).
4. Se preservo el comportamiento estructural del navbar:
   - Sin cambios en rutas ni navegacion.
   - Sin cambios en el boton `Schedule Evaluation`.
   - Sin cambios en menu desktop/mobile ni en sus espaciados.
   - Sin cambios en sticky behavior.
   - Sin introduccion de colores, iconos, sombras, degradados ni efectos adicionales.

## Decisiones de Diseno
- Se aplico una composicion tipografica en dos lineas dentro del mismo enlace de marca para mantener alineamiento horizontal con el resto de elementos.
- Se utilizo `leading-none` para controlar la altura tipografica y evitar crecimiento perceptible del navbar.
- Se mantuvieron tokens cromaticos existentes (`var(--color-foreground)` y `var(--color-muted)`) para conservar la consistencia institucional.

## Validacion Tecnica
Comando ejecutado:

```bash
cmd /c rmdir /s /q .next ; npm run build
```

Resultado:
- Build de Next.js completado sin errores.
- No se detectaron cambios de comportamiento fuera del bloque de identidad del navbar.
