# Booking Notification Architecture

## Purpose

This provisional notification flow alerts the NeuroSports USA internal team when a Houston Initial Evaluation request is submitted.

## Privacy Model

1. Email notification destination is private and server-side only.
2. SMS recipients are private and server-side only.
3. Recipient values are never returned in API responses and never exposed in client bundles.

## Notification Scope

1. Email and SMS are provisional operational alerts.
2. SMS contains no patient identity or clinical content.
3. Detailed clinical intake is not transmitted in notifications.

## Relationship to Google Calendar

1. Google Calendar remains the confirmation source for appointments.
2. Notification delivery does not confirm an appointment.
3. Booking requests remain REQUESTED until confirmed via approved calendar workflow.

## Secure Infrastructure Status

1. Secure intake storage is still required.
2. Domain-based sender email should replace provisional Gmail operations later.
3. Provider configuration must use private Vercel environment variables.
4. Delivery failures must be monitored operationally.

## Pending Work

- TODO: Reconcile booking-request notifications with live Google Calendar confirmation.
- TODO: Add approved secure intake storage before collecting detailed clinical narratives.
- TODO: Add production-grade distributed rate limiting and abuse controls.
