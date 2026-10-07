import { stateManager } from "../engine/stateManager.js";
import { formatAttributeLabel } from "../engine/attributeExtractor.js";

export function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxTags = document.getElementById("lightbox-tags");
  const closeBtn = document.getElementById("lightbox-close");

  closeBtn.addEventListener("click", () => {
    stateManager.closePhotoModal();
  });

  stateManager.subscribe((state) => {
    if (state.activePhotoModal) {
      const photo = state.activePhotoModal;
      lightboxImg.src = photo.image_url;
      lightboxTitle.textContent = photo.title;
      
      lightboxTags.innerHTML = "";
      if (photo.visual_attributes) {
        photo.visual_attributes.forEach(attr => {
          const tag = document.createElement("span");
          tag.className = "chip";
          tag.textContent = formatAttributeLabel(attr);
          lightboxTags.appendChild(tag);
        });
      }

      lightbox.classList.remove("hidden");
    } else {
      lightbox.classList.add("hidden");
    }
  });
}
