/**
 * Photos Tab Component
 * Renders the masonry-style photo grid for the default "Photos" landing page.
 */

import { stateManager } from "../engine/stateManager.js";
import { mockPhotos } from "../../data/mockPhotos.js";

export function initPhotosTab() {
  const allPhotosGrid = document.getElementById("all-photos-grid");
  
  // Render all photos into the grid
  renderGrid(mockPhotos, allPhotosGrid);
}

function renderGrid(photos, gridElement) {
  gridElement.innerHTML = "";
  
  photos.forEach((photo) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    if (photo.aspect_ratio) {
      card.setAttribute("data-aspect", photo.aspect_ratio);
    }

    const img = document.createElement("img");
    img.src = photo.image_url;
    img.alt = photo.title;
    img.loading = "lazy";

    card.appendChild(img);

    card.addEventListener("click", () => {
      stateManager.openPhotoModal(photo.photo_id);
    });

    gridElement.appendChild(card);
  });
}
