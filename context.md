# Project Context: AI-Assisted Google Photos Search MVP

## 1. Project Overview & Core Mission

**Project Title:** AI-Assisted Photo Search MVP  
**Product Concept:** A Google Photos-inspired prototype that empowers users to locate past visual memories using **vague, partial, or multi-attribute memory clues** rather than precise keywords or date ranges.

### Core Value Proposition
Traditional photo search engines assume the user remembers explicit details (exact dates, geotags, or specific facial tags). In reality, human memory is episodic and associative—people remember context like *"that party at the beach in 2024 where someone wore white"*. 

This project demonstrates a progressive, interactive search experience:
> **Vague Memory Clues ➔ Filtered Results ➔ Dynamic Refinement Prompts ("Found it? No") ➔ Secondary Visual Clues ➔ Target Photo Found.**

---

## 2. Target User Profile

* **Persona:** Active camera users accumulating thousands of personal photos, videos, screenshots, and documents over several years.
* **Pain Point:** Inability to recall exact dates or filenames, leading to tedious manual grid scrolling or search abandonment when primary search returns zero/irrelevant results.
* **Goal:** Effortlessly locate specific visual memories through guided multi-clue combination and contextual refinement.

---

## 3. End-to-End User Journey (Happy Flow)

```mermaid
flowchart TD
    A[Step 1: Open Search Tab] --> B[Step 2: Select Initial Clues<br>e.g., Beach + 2024 + Party]
    B --> C[Step 3: Apply & View Photo Grid]
    C --> D{Step 4: 'Found it?' Prompt}
    D -- Yes --> G[Step 6: Open Full-Screen Photo Viewer]
    D -- No --> E[Generate Contextual Visual Clues<br>e.g., White clothes | Sunset | Night]
    E --> F[Step 5: Select Secondary Clue<br>e.g., White clothes]
    F --> C
```

### Detailed Steps

| Step | User Action | System Response |
| :--- | :--- | :--- |
| **Step 1: Open Search** | Navigates to Search tab | Displays primary memory filter categories: Event/Vibe, Location, Date/Year, People |
| **Step 2: Select Initial Clues** | Selects chips (e.g., `Beach`, `2024`, `Party`) & taps **Apply** | Filters local photo library based on selected initial metadata |
| **Step 3: View Initial Results** | Reviews filtered photo grid | Displays relevant photo thumbnails + bottom prompt: *"Found it? (Yes / No)"* |
| **Step 4: Refine Results** | Taps **"No"** | Analyzes visible photo dataset and dynamically surface secondary visual attributes |
| **Step 5: Apply Secondary Filter** | Selects secondary chip (e.g., `White clothes`) | Instantly narrows photo grid to match combined criteria |
| **Step 6: Target Found** | Identifies photo & taps thumbnail | Opens target photo in full-screen viewer. Task complete! |

---

## 4. Data Architecture & Simulation Strategy

To ensure zero external API dependencies and immediate local usability, the prototype utilizes a local mock dataset.

### Photo Data Model Schema
```json
{
  "photo_id": "img_001",
  "image": "assets/photos/beach_party_01.jpg",
  "date": "2024-07-15",
  "year": "2024",
  "location": "Goa Beach",
  "event": "Party",
  "people": ["Alex", "Sam"],
  "visual_attributes": ["white_clothes", "sunset", "outdoor", "group"]
}
```

### Dynamic Refinement Logic Engine
1. **Base Filtering:** Filter dataset where `location == 'Beach'`, `year == '2024'`, `event == 'Party'`.
2. **Attribute Extraction:** On `"No"` click, scan remaining photos in the active result set, aggregate `visual_attributes`, and present top candidate chips (e.g., `White clothes`, `Sunset`, `Night`).
3. **Sub-filtering:** Intersect active subset with selected `visual_attributes`.

---

## 5. UI/UX Design Guidelines

* **Aesthetics:** Clean, modern, familiar Google Photos design language (rounded filter chips, sleek dark/light mode accents, responsive thumbnail grid).
* **Navigation:** Bottom navigation bar highlighting the **Search** tab.
* **Interactions:**
  * Toggle states for primary & secondary filter chips (unselected vs active/selected).
  * Prominent **Apply** CTA button.
  * Floating bottom prompt bar for `"Found it? Yes / No"`.
  * Smooth modal transition for full-screen photo viewing.

---

## 6. Project Scope & Boundary Constraints

### In-Scope (MVP Prototype)
* Complete end-to-end implementation of defined **happy flow**.
* Local mock photo library with metadata tags.
* Dynamic client-side filter computation.
* Minimalist, responsive web UI.

### Out-of-Scope (Non-Goals)
* Full Google Photos app cloning (albums, backup, sharing settings).
* Cloud backend storage or real Google OAuth user authentication.
* Heavy server-side AI model hosting or vector embeddings indexers.
* Production scale multi-million image database indexing.

---

## 7. Key Project Deliverables

1. **`problemStatement.md`**: Problem breakdown, context, and user pain point analysis.
2. **`context.md`**: Project blueprint, user flow specifications, data schema, and technical boundaries.
3. **`README.md`**: Setup instructions, running steps, architecture overview, and known limitations.
4. **Functional Prototype Web Application**: Interactive search MVP implementing the defined happy path.

---

## 8. Success Criteria

The prototype successfully validates the project goals if a user can effortlessly transition through:
$$\text{Vague Clues} \longrightarrow \text{Initial Grid} \longrightarrow \text{"Found it? No"} \longrightarrow \text{Dynamic Clues} \longrightarrow \text{Target Photo Opened}$$
