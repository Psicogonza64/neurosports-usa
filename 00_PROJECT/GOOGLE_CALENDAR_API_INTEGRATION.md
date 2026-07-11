# Google Calendar API Integration

## Scope

This document describes the server-side integration required to connect the Houston booking assistant with Google Calendar using FreeBusy and Events Insert.

## Requirements

1. A Google Cloud project is required.
2. Google Calendar API must be enabled in that project.
3. A service account must be created.
4. A dedicated Houston calendar must be created.
5. The Houston calendar must be shared with the service-account email with permission to manage events.

Recommended dedicated calendar name:

- NeuroSports USA — Houston Initial Evaluations

## Required Private Environment Variables

- GOOGLE_CALENDAR_ID
- GOOGLE_SERVICE_ACCOUNT_EMAIL
- GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
- GOOGLE_CALENDAR_TIMEZONE
- INITIAL_EVALUATION_DURATION_MINUTES
- GOOGLE_CALENDAR_LOCATION
- BOOKING_MIN_NOTICE_HOURS
- BOOKING_MAX_ADVANCE_DAYS
- BOOKING_BUFFER_MINUTES

Do not include secrets in client-side code.
Do not commit .env.local.

## Local and Vercel Configuration

1. Local (.env.local)
   - Copy .env.example and provide local values.
   - Ensure GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY supports escaped \n and is normalized server-side.
2. Vercel Preview
   - Define all required private variables in Preview.
3. Vercel Production
   - Define all required private variables in Production independently.

Do not claim Production is connected until real credentials and calendar permissions are configured and tested.

## Scheduling Rules

Official operating hours:

- Monday-Friday
  - 8:00 AM-12:00 PM
  - 2:00 PM-4:00 PM
- Saturday
  - 9:00 AM-12:30 PM
- Sunday
  - Unavailable

Timezone:

- America/Chicago

Appointment duration status:

- Pending approval.
- INITIAL_EVALUATION_DURATION_MINUTES is required to enable booking.

## API Integration Behavior

- FreeBusy API is the source of truth for availability.
- Events Insert API creates appointments.
- Availability shown in UI must come from server-side FreeBusy checks.
- Slot availability is rechecked immediately before event insertion.

## Privacy and Safety

- Clinical details are excluded from Google Calendar events.
- Event title remains generic:
  - Initial Evaluation — NeuroSports USA Houston
- Internal email/SMS notifications are a later sprint.
- Payment integration is a later independent sprint.
