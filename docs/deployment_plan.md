# Streamlit Deployment Plan: Google Photos Search MVP

This document outlines the strategy for deploying the current HTML/JS/CSS-based Google Photos Search MVP using **Streamlit**. Since Streamlit is a Python-based framework primarily used for data and AI apps, migrating this project requires integrating the frontend with a Python backend.

---

## 1. Deployment Approaches

There are two primary ways to deploy this MVP to Streamlit:

### Option A: Native Streamlit Rebuild (Recommended)
Rewrite the UI using native Streamlit Python components. 
- **Pros:** Extremely easy to integrate actual AI backends (like Gemini/OpenAI), built-in state management, clean Pythonic codebase.
- **Cons:** We will lose the highly customized CSS/animations of the current web app, as Streamlit enforces its own design system.

### Option B: Iframe / Custom Component Wrapper
Serve the existing `index.html`, CSS, and JS files directly through a Streamlit Custom Component (`streamlit.components.v1.html`).
- **Pros:** Keeps 100% of the current beautiful UI, CSS animations, and JavaScript logic.
- **Cons:** Harder to pass complex data between the Python backend and the JavaScript frontend later on.

*The steps below focus on **Option A** as it is the standard and most scalable approach for AI-powered Search tools in Streamlit, but you can choose Option B if UI aesthetics are the strict priority.*

---

## 2. Step-by-Step Implementation Plan

### Phase 1: Environment & Repository Setup
1. **Initialize Python Environment:**
   Create a virtual environment and install Streamlit.
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install streamlit pandas
   ```
2. **Create Core Files:**
   Create an `app.py` (main application file) and a `requirements.txt` file at the root of the project.

### Phase 2: Data Migration
1. **Convert Mock Data:**
   Translate the data currently in `src/data/mockPhotos.js` into a Python dictionary or a CSV file.
2. **Load Data using Pandas:**
   Load the mock photos into a Pandas DataFrame in `app.py` for easy filtering.

### Phase 3: Building the Streamlit UI (`app.py`)
1. **Header & Search Bar:**
   Use `st.title()` and `st.text_input("Ask a question...")` for the main AI search bar.
2. **Filter Chips (Dropdowns):**
   Use Streamlit's `st.selectbox()` or `st.multiselect()` inside columns (`st.columns`) to represent the filters (People, Location, Season, etc.).
3. **State Management:**
   Replace `stateManager.js` logic with Streamlit's built-in `st.session_state` to track applied filters.
4. **Photo Grid:**
   Iterate over the filtered Pandas DataFrame and use `st.image()` inside dynamically created columns to render the photo grid.

### Phase 4: Deployment to Streamlit Community Cloud
Streamlit Community Cloud is the easiest, free way to deploy Streamlit apps.

1. **Commit to GitHub:**
   Ensure `app.py`, `requirements.txt`, and data assets are pushed to a public (or private, if linked) GitHub repository.
2. **Connect to Streamlit Cloud:**
   - Go to [share.streamlit.io](https://share.streamlit.io/).
   - Click **"New App"**.
   - Select the GitHub repository, branch, and specify `app.py` as the Main file path.
3. **Deploy:**
   Click "Deploy". Streamlit will automatically install dependencies from `requirements.txt` and host the application on a public URL.

---

## 3. Revised Directory Structure (Post-Migration)

If moving fully to Streamlit, the directory will look like this:

```text
Google photos search MVP/
│
├── app.py                   # Main Streamlit Application
├── requirements.txt         # Python dependencies (streamlit, pandas, etc.)
├── data/
│   └── mock_photos.csv      # Converted JS data to CSV format
├── assets/
│   └── images/              # Local image files
└── docs/
    └── deployment_plan.md   # This file
```

## 4. Next Steps & Action Items
- Decide between **Option A (Native Streamlit)** and **Option B (Custom Component Wrapper)**.
- If proceeding with Option A, we can begin scripting `app.py` and translating the `mockPhotos.js` into Python immediately.
