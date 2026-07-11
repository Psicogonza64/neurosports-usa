# Houston Guided Booking Assistant Architecture

## Current UI Status

The `/schedule` route now renders a five-step guided booking assistant focused on Initial Evaluation scheduling and intake collection.

Implemented steps:

1. Appointment
2. Date and Time
3. Patient Information
4. Appointment Objective
5. Review and Submit

The workflow is stateful while the visitor remains on the page and validates required fields before step progression.

## Official Houston Hours

Configured in `lib/neurosports-booking-config.ts`:

- Monday-Friday
  - 8:00 AM-12:00 PM
  - 2:00 PM-4:00 PM
- Saturday
  - 9:00 AM-12:30 PM
- Sunday unavailable
- Timezone: `America/Chicago`

The UI labels this selection as `Requested appointment time` until a live calendar backend exists.

## Collected Public Fields

The assistant collects only public scheduling and intake essentials:

- Appointment type: Initial Evaluation
- Appointment for: self or family member
- Requested date and time
- Patient first name
- Patient last name
- Date of birth
- Email
- Mobile phone
- Preferred contact method
- Responsible adult information (family-member flow)
- Primary appointment objective
- Concern categories
- Previous studies status and optional study types
- Referral source (optional)
- Additional note (optional)
- Confirmation consent checkbox

## Information Intentionally Not Collected

The assistant intentionally does NOT collect:

- Social Security number
- Insurance identification
- Payment-card information
- Full medical history
- Detailed psychiatric history
- Diagnostic document uploads in this sprint

## Required Secure Backend

No production booking API endpoint currently exists in this repository.

Current behavior when submission is attempted without backend:

- Shows explicit fallback state:
  - "Online appointment submission is being connected."
  - "Your information has not been sent yet."
- Keeps entered data on the page.
- Provides Contact fallback.

Required backend next steps:

1. Create secure server endpoint for appointment request persistence.
2. Validate payload server-side.
3. Return request reference IDs on success.
4. Add secure auditing and operational monitoring.

## Live Calendar Integration Requirement

Calendar availability is currently generated from configured business-hour rules.

Before automatic confirmation can be enabled:

1. Connect a live Houston calendar availability source.
2. Prevent double-booking with transactional checks.
3. Distinguish requested versus confirmed slots from backend status.

## Email Notification Requirement

To complete scheduling operations:

1. Send internal scheduling notification emails.
2. Send requester receipt confirmation emails.
3. Handle retry and delivery-failure paths.

## Privacy Policy Requirement

Privacy Policy and Terms of Use references are intentionally placeholders in UI.

Pending tasks:

1. Publish policy pages.
2. Link the schedule assistant to those pages.

## Future Secure Document Transfer Requirement

Document upload is intentionally excluded from this sprint.

Future requirement:

1. Add secure, authenticated, HIPAA-aligned document transfer workflow.
2. Collect records only after operational instructions from the scheduling team.

## Requested vs Confirmed Distinction

The assistant supports requested appointments only in current architecture.

It does not declare confirmation unless a live backend returns a confirmed status.
