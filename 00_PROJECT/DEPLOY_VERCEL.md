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

## 2. Variables De Entorno (Futuro)

Estado actual:

- No hay variables de entorno obligatorias para el prototipo actual.

Estructura recomendada para cuando existan:

- Definir variables en Vercel por entorno:
  - Development
  - Preview
  - Production
- No versionar secretos en el repositorio.
- Mantener archivo `.env.local` solo para uso local.

Checklist futuro:

- TODO: Registrar variables requeridas por modulo.
- TODO: Definir convenciones de nombres de variables.
- TODO: Documentar dependencias entre variables y servicios externos.

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
