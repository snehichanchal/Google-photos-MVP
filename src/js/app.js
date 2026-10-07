/**
 * Main Application Entry Point
 * Initializes state manager with mock data and wires up UI components.
 */

import { mockPhotos } from "../data/mockPhotos.js";
import { stateManager } from "./engine/stateManager.js";

import { initFilterChips } from "./components/filterChips.js";
import { initPhotoGrid } from "./components/photoGrid.js";
import { initRefinementPrompt } from "./components/refinementPrompt.js";
import { initLightbox } from "./components/lightbox.js";
import { initNavigation } from "./components/navigation.js";
import { initPhotosTab } from "./components/photosTab.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing AI-Assisted Google Photos Search MVP...");

    // Initialize Global UI Components
    initNavigation();
    initPhotosTab();

    // Initialize Search MVP Components
    initFilterChips();
    initPhotoGrid();
    initRefinementPrompt();
    initLightbox();

    // Load data and ignite state machine
    stateManager.init(mockPhotos);

    // Optional: For debugging, expose stateManager to window
    window.__stateManager = stateManager;
});
