# WEB-22.4 Final Hero Brand Cleanup

## Scope
Public NeuroSports website only.

## Component updated
- `components/experience/neurosports-hero-experience.tsx`

## Change applied
- Removed the small hero brand label rendered above the main H1.
- Hero now starts directly with:
  - `Understanding the Brain.`
  - `Transforming Lives.`

## Non-changes
- No changes to navbar wordmark sizing/position.
- No changes to navigation, buttons, diagram, scientific content, schedule flow, or responsive structure.
- No changes to MNSI Clinical Suite paths/components/APIs.

## Validation
Command executed:

```bash
cmd /c rmdir /s /q .next ; npm run build
```

Result:
- Build successful.
- Public routes including `/` and `/schedule` compiled successfully.
