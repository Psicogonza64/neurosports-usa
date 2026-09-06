# WEB-24: Interactive 3D Brain Experience

## Technology and architecture

- `three` 0.185.1 with `OrbitControls` from the official Three.js examples.
- `InteractiveBrain3D` is an isolated client-only boundary. Three.js is dynamically imported inside `useEffect`, so the page remains SSR-safe and textual Scientific Journey content does not depend on WebGL.
- Only the responsive variant matching the viewport is mounted, preventing duplicate WebGL canvases.

## Model source, license, and size

The production brain is the NIH 3D Detailed Human Brain Model, entry `3DPX-021161`, version `1.01`, preserved as the original `brain human.glb` at `public/models/nih-brain/original/brain-human.glb`.

Source: https://3d.nih.gov/entries/3DPX-021161
License: CC Attribution 4.0 International. Attribution and source metadata are preserved in `public/models/nih-brain/LICENSE-brain-asset.txt`.
Format: untouched binary GLB, 13,161,040 bytes, 215,601 vertices, and 377,701 triangles. SHA-256: `5D3BEC401B94EE0E00C207F22E056E9D96F585811B38912F176E748ACD085B2D`.
Three.js is distributed under the MIT license.

## Scientific governance

The visualization is symbolic and non-diagnostic. Its accessible label identifies it as an "Interactive symbolic visualization of functional brain-network organization." It does not represent MRI, fMRI, PET, EEG source localization, a patient brain, measured neural activity, or treatment efficacy.

Existing stage labels and DetailPanel content remain unchanged. The neutral and general stage states retain the clean anatomical master. RSFN uses a sparse conceptual cortical network; MNSI uses the same restrained green/gold network language. The visualization does not localize activity to a patient-specific region.

## Interaction and responsive behavior

- Desktop supports constrained mouse drag/orbit with damping, no pan or zoom, and limited polar/azimuth ranges.
- Touch uses the same constrained orbit control while page scrolling remains available outside the canvas.
- Idle mode uses slow OrbitControls auto-rotation; user interaction pauses it.
- `prefers-reduced-motion: reduce` disables auto-rotation while retaining static WebGL orientation.
- Mobile/tablet place the 3D viewport above the existing vertical process journey.
- Desktop uses a restrained three-quarter/lateral-oblique orientation with compact stage anchors outside the cortical silhouette. Scientific Journey process connectors do not cross the brain.

## Fallback and loading

The component shows a restrained loading state while WebGL initializes. If dynamic import or renderer creation fails, it shows a text fallback and the existing Scientific Journey nodes and DetailPanel remain usable.

## Performance safeguards

- Dynamic import defers Three.js work until the client boundary mounts.
- Device pixel ratio is capped at `1.75`.
- The original NIH GLB is loaded as a single browser request without geometry modification.
- The runtime-only NeuroSports material uses `#EADFC9`, roughness `0.64`, metalness `0`, sRGB output, AgX tone mapping, exposure `1.0`, and restrained warm studio lighting.
- The RSFN/MNSI overlay uses compact primitive meshes and low segment counts.
- ResizeObserver updates the renderer only to its container dimensions.
- Renderer, controls, geometry, and materials are disposed on cleanup.
- Hidden responsive variants are not mounted, so only one canvas exists per diagram instance.

## Validation

- Routes: `/`, `/what-we-do`, `/integrated-model`, `/technology`.
- Widths: `375`, `430`, `768`, `1024`, `1280`, `1440px`.
- Verified one non-empty WebGL canvas per visible diagram variant, zero anchor overlap, zero horizontal overflow, and active DetailPanel behavior.
- Verified RSFN/MNSI overlay states, constrained drag interaction, and reduced-motion page initialization.
- `npm run lint`: successful.
- `npm run build`: successful.
- Existing `npm run test:calendar`: 14/16 passed; 2 unrelated pre-existing assertions fail in calendar configuration/auth source expectations. No calendar files were modified.

## Files

- Added `components/diagrams/InteractiveBrain3D.tsx`.
- Added `public/models/nih-brain/original/brain-human.glb` and `public/models/nih-brain/LICENSE-brain-asset.txt`.
- Added `WEB24_INTERACTIVE_3D_BRAIN.md`.
- Modified `components/diagrams/ScientificJourneyDiagram.tsx`.
- Modified `package.json` and `package-lock.json` to add `three` and `@types/three`.

Locations/Houston photo work, Schedule, Google Calendar, APIs, MNSI Clinical Suite, `.env.local`, and environment variables were not modified.

WEB-24 is not certified; external visual review remains required.
