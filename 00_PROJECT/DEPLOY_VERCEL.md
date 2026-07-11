# DEPLOY VERCEL

## Objetivo

Documentar el proceso recomendado para conectar NeuroSports USA con Vercel y habilitar despliegues automaticos desde GitHub sin modificar diseno, contenido o estructura del producto.

## 1. Requisitos Para Vercel

- Repositorio en GitHub con rama principal estable.
- Proyecto con build de produccion validado (`npm run build`).
- Archivo `package.json` con scripts minimos:
  - `dev`
  - `build`
  - `start`
  - `lint`
- Estructura compatible con Next.js App Router.
- Cuenta de Vercel con acceso al repositorio.

## 2. Variables De Entorno

Variables privadas requeridas para integracion Google Calendar API:

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_CALENDAR_TIMEZONE`
- `INITIAL_EVALUATION_DURATION_MINUTES`
- `GOOGLE_CALENDAR_LOCATION`
- `BOOKING_MIN_NOTICE_HOURS`
- `BOOKING_MAX_ADVANCE_DAYS`
- `BOOKING_BUFFER_MINUTES`

Configuracion por entorno:

1. Local development
  - Copiar `.env.example` a `.env.local`.
  - Definir todas las variables anteriores con valores de entorno local.
  - No versionar `.env.local`.
2. Vercel Preview
  - En Vercel, abrir Project Settings -> Environment Variables.
  - Definir todas las variables para el entorno `Preview`.
3. Vercel Production
  - Definir todas las variables para el entorno `Production` de forma separada.

Reglas:

- No usar `NEXT_PUBLIC_` para credenciales de Google Calendar.
- No hardcodear IDs ni llaves en componentes cliente.
- No declarar Production como conectada hasta validar credenciales reales y pruebas de agenda.

## 3. Flujo GitHub -> Vercel

1. Mantener cambios validados localmente.
2. Confirmar lint y build antes de publicar cambios.
3. Hacer push a GitHub.
4. Vercel detecta cambios en la rama conectada.
5. Vercel ejecuta build y genera despliegue.
6. Vercel publica URL de preview o produccion segun rama.

## 4. Despliegue Automatico

Configuracion recomendada:

- Rama principal (`main`) para despliegue de produccion.
- Pull Requests para despliegues preview automaticos.
- Reglas de calidad antes de merge:
  - lint en verde
  - build en verde

Resultado esperado:

- Cada cambio aprobado en `main` activa despliegue automatico en Vercel.

## 5. Rollback

Opciones recomendadas de reversa:

- Re-deploy de un deployment previo estable desde Vercel.
- Revert de commit en GitHub y nuevo push a `main`.

Criterios de uso:

- usar rollback ante errores funcionales o degradacion de experiencia;
- priorizar restaurar estabilidad antes de nuevos cambios.

## 6. Buenas Practicas

- Validar localmente `npm run lint` y `npm run build` antes de push.
- Mantener commits pequenos y trazables.
- No mezclar cambios de diseno con cambios de infraestructura en el mismo commit.
- Documentar cualquier cambio de configuracion de despliegue.
- Revisar logs de build en Vercel despues de cada despliegue importante.
- Mantener consistencia entre ramas y entornos.

## Estado Actual

- Build de produccion: exitoso.
- Proyecto listo para conectar con Vercel.
- Publicacion en Vercel: pendiente (no ejecutada en este sprint).

## Version History

| Version | Fecha | Descripcion | Autor |
| --- | --- | --- | --- |
| 0.1 | 2026-07-07 | Creacion inicial de la guia de despliegue en Vercel | GitHub Copilot |
