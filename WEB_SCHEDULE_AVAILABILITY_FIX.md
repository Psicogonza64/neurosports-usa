# Public Scheduling Availability Fix

## Incident
In `/schedule`, all days appeared unavailable and the UI showed:

- "Online scheduling is temporarily unavailable. Please try again shortly."

## API Route Used by Public Calendar
- `GET /api/calendar/availability?date=YYYY-MM-DD`
- Implemented in `app/api/calendar/availability/route.ts`

## Direct API Diagnostics
### Local
- URL: `/api/calendar/availability?date=2026-08-01`
- Before fix:
  - Status: `502`
  - Body: `{"date":"2026-08-01","timezone":"America/Chicago","slots":[],"message":"Online scheduling is temporarily unavailable. Please try again shortly."}`
- After fix:
  - Status: `200`
  - Body includes real slots (example):
    - `2026-08-01T09:00:00-05:00`
    - `2026-08-01T10:30:00-05:00`

### Production (pre-fix check)
- URL: `https://www.neurosportsusa.com/api/calendar/availability?date=2026-08-01`
- Status: `502` after redirect to `www`
- Body: same fallback message and empty slots.

## Root Cause
The scheduling service was authenticating with OAuth refresh-token flow only.

- Local runtime probe showed credentials/config values present but Google returned:
  - `invalid_grant` (HTTP 400)
- This failure occurred during Google authentication before successful free/busy retrieval.

At the same time, `GOOGLE_APPLICATION_CREDENTIALS` was configured and valid, but the calendar client did not use it.

## Fix Implemented
### Files changed
- `lib/server/google-calendar-core.ts`
- `lib/server/google-calendar.ts`

### Changes
1. Runtime config now accepts either:
   - Service account via `GOOGLE_APPLICATION_CREDENTIALS`, or
   - OAuth credentials (`GOOGLE_OAUTH_*`) when service account is not provided.

2. Calendar client auth now:
   - Uses service-account auth first (`GOOGLE_APPLICATION_CREDENTIALS`) supporting:
     - key file path, or
     - inline JSON credentials.
   - Falls back to OAuth refresh-token auth if service-account auth is unavailable.

## Validation Checklist
- API route returns `200` locally for valid dates.
- Real slots are generated and returned.
- Timezone remains `America/Chicago`.
- 24-hour minimum notice remains active (`BOOKING_MIN_NOTICE_HOURS=24`).
- Duration and interval logic unchanged (`INITIAL_EVALUATION_DURATION_MINUTES`, weekly windows, buffer).
- `npm run build` passes.

## Local/Production Environment Presence Comparison (no secrets)
### Local
- Required scheduling vars: present.
- Service-account var `GOOGLE_APPLICATION_CREDENTIALS`: present.

### Production (inferred from API behavior)
- `getRuntimeBookingConfig` did not return config-missing message; therefore required vars are likely present.
- The pre-fix `502` fallback indicates runtime failure after config validation (auth/request stage), consistent with the diagnosed auth-path issue.
