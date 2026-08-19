# WEB-24: Interactive 3D Brain Experience

## Technology and architecture

- `three` 0.185.1 with `OrbitControls` from the official Three.js examples.
- `InteractiveBrain3D` is an isolated client-only boundary. Three.js is dynamically imported inside `useEffect`, so the page remains SSR-safe and textual Scientific Journey content does not depend on WebGL.
- Only the responsive variant matching the viewport is mounted, preventing duplicate WebGL canvases.

## Model source, license, and size

The brain is an original procedural runtime model created in `components/diagrams/InteractiveBrain3D.tsx`. It uses two independently scaled volumetric hemisphere meshes, a central fissure, and generated curved cortical relief geometry. No external model or texture was used, so there is no third-party model license or binary asset to track. Runtime geometry is intentionally compact and has no downloaded model size.

Three.js is distributed under the MIT license.

## Scientific governance

The visualization is symbolic and non-diagnostic. Its accessible label identifies it as an "Interactive symbolic visualization of functional brain-network organization." It does not represent MRI, fMRI, PET, EEG source localization, a patient brain, measured neural activity, or treatment efficacy.

Existing process nodes and DetailPanel content remain unchanged. Node selection changes a restrained symbolic network color, opacity, and distributed node scale; RSFN is the strongest network-oriented state without localizing activity to a patient-specific region.

## Interaction and responsive behavior

- Desktop supports constrained mouse drag/orbit with damping, no pan or zoom, and limited polar/azimuth ranges.
- Touch uses the same constrained orbit control while page scrolling remains available outside the canvas.
- Idle mode uses slow OrbitControls auto-rotation; user interaction pauses it.
- `prefers-reduced-motion: reduce` disables auto-rotation while retaining static WebGL orientation.
- Mobile/tablet place the 3D viewport above the existing vertical process journey.
- Desktop keeps the established WEB-23.2 branching node geometry and places the canvas behind the labels/connectors.

## Fallback and loading

The component shows a restrained loading state while WebGL initializes. If dynamic import or renderer creation fails, it shows a text fallback and the existing Scientific Journey nodes and DetailPanel remain usable.

## Performance safeguards

- Dynamic import defers Three.js work until the client boundary mounts.
- Device pixel ratio is capped at `1.75`.
- Geometry uses compact primitive meshes and low segment counts.
- ResizeObserver updates the renderer only to its container dimensions.
- Renderer, controls, geometry, and materials are disposed on cleanup.
- Hidden responsive variants are not mounted, so only one canvas exists per diagram instance.

## Validation

- Routes: `/`, `/what-we-do`, `/integrated-model`, `/technology`.
- Widths: `375`, `430`, `768`, `1024`, `1280`, `1440px`.
- Verified one non-empty WebGL canvas per visible diagram variant, zero node overlap, zero horizontal overflow, readable headings/connectors, and active DetailPanel behavior.
- Verified Functional Evaluation and RSFN state changes, constrained drag interaction, and reduced-motion page initialization.
- `npm run lint`: successful.
- `npm run build`: successful.
- Existing `npm run test:calendar`: 14/16 passed; 2 unrelated pre-existing assertions fail in calendar configuration/auth source expectations. No calendar files were modified.

## Files

- Added `components/diagrams/InteractiveBrain3D.tsx`.
- Added `WEB24_INTERACTIVE_3D_BRAIN.md`.
- Modified `components/diagrams/ScientificJourneyDiagram.tsx`.
- Modified `package.json` and `package-lock.json` to add `three` and `@types/three`.

Locations/Houston photo work, Schedule, Google Calendar, APIs, MNSI Clinical Suite, `.env.local`, and environment variables were not modified.

WEB-24 is not certified; external visual review remains required.
