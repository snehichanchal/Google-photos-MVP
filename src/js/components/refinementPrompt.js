import { stateManager, RefinementStatus } from "../engine/stateManager.js";

export function initRefinementPrompt() {
  const refinementPrompt = document.getElementById("refinement-prompt");
  const secondaryDrawer = document.getElementById("secondary-drawer");
  const secondaryChipsContainer = document.getElementById("secondary-chips");

  document.getElementById("found-no-btn").addEventListener("click", () => {
    stateManager.triggerRefinementNo();
  });

  document.getElementById("found-yes-btn").addEventListener("click", () => {
    stateManager.triggerRefinementYes();
  });

  stateManager.subscribe((state) => {
    if (state.refinementStatus === RefinementStatus.PRIMARY_ACTIVE && state.activeFilteredPhotos.length > 0) {
      refinementPrompt.classList.remove("hidden");
    } else {
      refinementPrompt.classList.add("hidden");
    }

    if (state.refinementStatus === RefinementStatus.NEEDS_REFINEMENT || state.refinementStatus === RefinementStatus.REFINED) {
      secondaryDrawer.classList.remove("hidden");
      renderSecondaryChips(state.availableSecondaryChips, state.selectedSecondaryChips, secondaryChipsContainer);
    } else {
      secondaryDrawer.classList.add("hidden");
    }
  });
}

function renderSecondaryChips(chips, selectedChips, container) {
  container.innerHTML = "";
  chips.forEach(chipData => {
    const chip = document.createElement("button");
    chip.className = "chip";
    if (selectedChips.includes(chipData.tag)) {
      chip.classList.add("chip--selected");
    }
    chip.textContent = `${chipData.label} (${chipData.count})`;
    chip.addEventListener("click", () => {
      stateManager.toggleSecondaryChip(chipData.tag);
    });
    container.appendChild(chip);
  });
}
