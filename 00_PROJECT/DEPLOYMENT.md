# DEPLOYMENT

## Objetivo

Definir el flujo futuro de publicacion de NeuroSports USA sin ejecutar aun la publicacion.

## Flujo de despliegue

Local Development

↓

GitHub Repository

↓

Vercel Deployment

↓

Public URL

## Etapas

### 1. Local Development

- Desarrollar y validar cambios en entorno local.
- Ejecutar calidad minima: `npm run lint`.
- Validar build de produccion: `npm run build`.

### 2. GitHub Repository

- Crear repositorio remoto en GitHub.
- Subir el proyecto desde la rama principal de trabajo.
- Confirmar que la estructura del proyecto y documentacion esten completas.

### 3. Vercel Deployment

- Importar el repositorio de GitHub en Vercel.
- Usar configuracion por defecto para Next.js.
- Ejecutar primer despliegue y verificar resultado.

### 4. Public URL

- Confirmar URL publica generada por Vercel.
- Validar Home en entorno publico.
- Definir siguiente etapa de mejora continua.

## Estado actual

- Publicacion no ejecutada.
- Proyecto preparado para subir a GitHub y desplegar en Vercel.

## Variables privadas de entorno

Para integracion server-side con Google Calendar API:

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_CALENDAR_TIMEZONE`
- `INITIAL_EVALUATION_DURATION_MINUTES`
- `GOOGLE_CALENDAR_LOCATION`
- `BOOKING_MIN_NOTICE_HOURS`
- `BOOKING_MAX_ADVANCE_DAYS`
- `BOOKING_BUFFER_MINUTES`

Configuracion requerida:

1. Local
	- Definir variables en `.env.local` (archivo no versionado).
2. Vercel Preview
	- Definir todas las variables en el entorno `Preview`.
3. Vercel Production
	- Definir todas las variables en el entorno `Production` con valores independientes.

Reglas de seguridad:

- No usar prefijo `NEXT_PUBLIC_` para credenciales Google.
- No publicar llaves privadas, archivos JSON de servicio o IDs privados del calendario.

## Version History

| Version | Fecha | Descripcion | Autor |
| --- | --- | --- | --- |
| 0.1 | 2026-07-07 | Creacion inicial de la guia de despliegue futuro | GitHub Copilot |
