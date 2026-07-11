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

## Variables de entorno publicas

### NEXT_PUBLIC_HOUSTON_GOOGLE_APPOINTMENT_URL

- Proposito: URL oficial de Google Appointment Schedule para Evaluacion Inicial en el Centro NeuroSports USA Houston.
- Ejemplo: `NEXT_PUBLIC_HOUSTON_GOOGLE_APPOINTMENT_URL=https://calendar.google.com/calendar/appointments/...`
- No incluir credenciales reales ni identificadores privados en control de versiones.

Configuracion requerida:

1. Local
	- Definir en `.env.local` (archivo no versionado).
2. Vercel Preview
	- Definir la variable en el entorno `Preview` del proyecto.
3. Vercel Production
	- Definir la variable en el entorno `Production` del proyecto.

## Version History

| Version | Fecha | Descripcion | Autor |
| --- | --- | --- | --- |
| 0.1 | 2026-07-07 | Creacion inicial de la guia de despliegue futuro | GitHub Copilot |
