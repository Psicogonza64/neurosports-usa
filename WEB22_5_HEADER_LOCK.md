# WEB-22.5 Header Lock

## Objetivo
Aplicar el ajuste final del encabezado institucional y congelar el branding del header.

## Archivo modificado
- `components/layout/navbar.tsx`

## Ajustes aplicados
1. **Ancho del bloque de marca**
   - Se amplio el area ocupada por el wordmark para aumentar su presencia institucional sin depender solo de tipografia.
   - Nuevo ancho responsive del bloque:
     - Mobile: `w-[220px]`
     - Tablet: `sm:w-[245px]`
     - Desktop: `lg:w-[300px]`

2. **Separacion vertical del slogan**
   - Se incremento la separacion entre `NeuroSports` y `The Brain Matters`.
   - Cambio: `pt-[6px]` -> `pt-[11px]` (incremento de 5px).

3. **Presencia del slogan**
   - Tamano mantenido (sin aumento significativo): `11px / 12px / 14px`.
   - Tracking levemente mayor: `0.06em` -> `0.08em`.
   - Color ligeramente mas oscuro para legibilidad inmediata:
     - `color-mix(... foreground 64% ...)` -> `color-mix(... foreground 74% ...)`.

4. **Altura del navbar**
   - Aumento ligero dentro del rango solicitado.
   - Cambio de padding vertical del contenedor principal:
     - `py-[20px] lg:py-[22px]` -> `py-[23px] lg:py-[25px]`.
   - Incremento aproximado total: +6px de alto.

5. **Respiracion entre marca y menu**
   - Se agrego separacion sutil hacia el menu principal:
     - `ml-2` en base y `lg:ml-4` en desktop.

## Restricciones respetadas
- No se modifico Hero, H1, botones, diagrama ni secciones publicas.
- No se modifico `/clinical`, `/schedule`, rutas, API ni logica.
- No se modificaron componentes MNSI.

## Validacion
Comando ejecutado:

```bash
cmd /c rmdir /s /q .next ; npm run build
```

Resultado:
- Build de produccion exitoso.
