# Implementation Plan: AI-Assisted Google Photos Search MVP

This document outlines the phase-by-phase implementation strategy for building the **AI-Assisted Google Photos Search MVP** based on the technical specification in [docs/Architecture.md](file:///home/testing/Development/Nextleap%20projects/Google%20photos%20search%20MVP/docs/Architecture.md).

---

## User Review Required

> [!IMPORTANT]
> The implementation plan breaks down development into **5 sequential phases**. Each phase includes explicit verification criteria to ensure the happy flow is fully validated before proceeding.

---

## Phase 1: Environment Setup & Mock Data Repository

### Objectives
Establish the workspace structure and construct a rich, realistic local mock photo library dataset covering various categories (locations, years, events, people, visual attributes).

### Proposed Tasks
- [x] **Task 1.1:** Initialize directory layout (`src/css/`, `src/data/`, `src/js/engine/`, `src/js/components/`).
- [x] **Task 1.2:** Create `src/data/mockPhotos.js` with ~25–30 diverse photo records following the `PhotoRecord` schema:
  - Locations: *Goa Beach, Paris, Home, Mountain Trail, Office*
  - Years: *2022, 2023, 2024*
  - Events: *Party, Vacation, Birthday, Casual, Sick/Health*
  - People: *Alex, Sam, Jordan, Solo*
  - Visual Attributes: *white_clothes, sunset, night, bonfire, medicine, document, food, group, indoor, outdoor*
- [x] **Task 1.3:** Create a quick data validation check to verify metadata integrity.

### Verification Criteria
- [mockPhotos.js](file:///home/testing/Development/Nextleap%20projects/Google%20photos%20search%20MVP/src/data/mockPhotos.js) contains valid JSON-exportable arrays with accessible image URLs.

---

## Phase 2: Core State Machine & Search Engine Logic

### Objectives
Implement pure, decoupled JavaScript modules for state management, primary filtering, dynamic attribute extraction, and secondary sub-filtering.

### Proposed Tasks
- [x] **Task 2.1:** Build `src/js/engine/searchEngine.js`:
  - `executePrimarySearch(photos, criteria)`: Multi-attribute matching (Location AND/OR Year AND/OR Event AND/OR People).
  - `executeSecondarySearch(activePhotos, attributeClue)`: Intersect active result set with secondary visual attribute tag.
- [x] **Task 2.2:** Build `src/js/engine/attributeExtractor.js`:
  - `extractSecondaryAttributes(activePhotos, selectedAttributes)`: Scans visible photo subset, calculates attribute frequencies, ranks candidates, and returns top 4–6 visual chips.
- [x] **Task 2.3:** Build `src/js/engine/stateManager.js`:
  - Central store managing `AppState` transitions (`INITIAL_SEARCH_IDLE` $\rightarrow$ `PRIMARY_FILTERED` $\rightarrow$ `NEEDS_REFINEMENT` $\rightarrow$ `SECONDARY_FILTERED` $\rightarrow$ `TARGET_VIEWER_OPEN`).

### Verification Criteria
- Unit tests or console assertion scripts verify that filtering `Beach + 2024 + Party` correctly returns initial photos, and calling `extractSecondaryAttributes()` returns expected chips like `white_clothes`, `sunset`, `night`.

---

## Phase 3: Design System & Base UI Layout

### Objectives
Build the HTML skeleton and CSS design system mimicking Google Photos' modern, clean interface (rounded pill chips, dark/light theme tokens, responsive grid).

### Proposed Tasks
- [x] **Task 3.1:** Create `index.html` with semantic structure:
  - Top Search Header
  - Primary Filter Chip Section (categorized horizontally scrollable pill containers)
  - Floating Action Bar (**Apply** CTA + Selection count)
  - Main Photo Grid Container
  - Bottom Navigation Bar with **Search** tab highlighted
- [x] **Task 3.2:** Build `src/css/main.css` & `src/css/components.css`:
  - Google Photos design tokens (colors, typography, elevation shadows, glassmorphism overlays).
  - Chip toggle states (`.chip`, `.chip--selected`, `.chip--secondary`).
  - Mobile & desktop responsive layouts.

### Verification Criteria
- App renders cleanly in browser with styled filter chips, active state toggles, and Google Photos visual aesthetic.

---

## Phase 4: Dynamic Photo Grid & Interactive Refinement Flow

### Objectives
Wire UI components with the search engine logic to complete the full interactive experience.

### Proposed Tasks
- [x] **Task 4.1:** Implement `src/js/components/filterChips.js`:
  - Render primary memory categories (`Event`, `Location`, `Date`, `People`).
  - Attach click handlers for selection toggling and **Apply** CTA execution.
- [x] **Task 4.2:** Implement `src/js/components/photoGrid.js`:
  - Render dynamic photo cards with thumbnail images, title, and metadata previews.
  - Implement smooth entry animations and empty result fallback state.
- [x] **Task 4.3:** Implement `src/js/components/refinementPrompt.js`:
  - Surface floating bottom bar `"Found it? Yes / No"` when initial search completes.
  - **Yes click:** Highlight photo selection.
  - **No click:** Trigger `attributeExtractor` and slide up the Dynamic Secondary Visual Clues panel.
  - Handle secondary chip selection and instant grid re-filtering.
- [x] **Task 4.4:** Implement `src/js/components/lightbox.js`:
  - Fullscreen photo viewer modal displaying full-res image, title, and tag pills upon clicking a photo thumbnail.

### Verification Criteria
- Interactive user happy flow functions seamlessly end-to-end:
  `Select Clues (Beach + 2024) -> Click Apply -> View Grid -> Click "No" -> Click "White clothes" -> Grid narrows -> Click Photo -> Lightbox opens.`

---

## Phase 5: Polish, Testing & Documentation

### Objectives
Fine-tune animations, test edge cases, and provide comprehensive documentation.

### Proposed Tasks
- [x] **Task 5.1:** UI Polish: Add micro-animations for chip selections, smooth slide-up drawers, and image hover effects.
- [x] **Task 5.2:** Edge Case Handling: Handle zero results, clearing all filters, and re-querying gracefully.
- [x] **Task 5.3:** Create project `README.md` with:
  - Overview & Objectives
  - How to run the local prototype
  - Step-by-step user journey guide
  - Architecture breakdown summary & known limitations
- [x] **Task 5.4:** Complete final verification walkthrough.

### Verification Criteria
- Fully functional, zero-bug prototype running locally via dev server / standard web page, completely aligned with `docs/Architecture.md` and `docs/context.md`.
