import { stateManager, RefinementStatus } from "../engine/stateManager.js";

export function initPhotoGrid() {
  const gridContainer = document.getElementById("photo-grid-container");
  const grid = document.getElementById("photo-grid");
  const emptyState = document.getElementById("empty-state");
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  const primaryFiltersSection = document.getElementById("primary-filters");
  const largeSearchBar = document.querySelector(".large-search-container");

  clearFiltersBtn.addEventListener("click", () => {
    stateManager.resetSearch();
  });

  stateManager.subscribe((state) => {
    if (state.refinementStatus === RefinementStatus.IDLE) {
      gridContainer.classList.add("hidden");
      if (largeSearchBar) largeSearchBar.classList.remove("hidden");
      return;
    }

    gridContainer.classList.remove("hidden");
    if (largeSearchBar) largeSearchBar.classList.add("hidden");

    const photos = state.activeFilteredPhotos;

    if (photos.length === 0) {
      grid.classList.add("hidden");
      emptyState.classList.remove("hidden");
    } else {
      grid.classList.remove("hidden");
      emptyState.classList.add("hidden");
      renderGrid(photos, grid);
    }
  });
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
