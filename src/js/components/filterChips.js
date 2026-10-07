import { filterCategories } from "../../data/mockPhotos.js";
import { stateManager } from "../engine/stateManager.js";

export function initFilterChips() {
  const chips = document.querySelectorAll(".dropdown-chip");
  const dropdownMenu = document.getElementById("filter-dropdown-menu");
  const dropdownList = document.getElementById("dropdown-list");
  const resetBtn = document.getElementById("dropdown-reset-btn");
  const applyBtn = document.getElementById("dropdown-apply-btn");
  const primaryFilters = document.getElementById("primary-filters");
  const filterRow = document.getElementById("filter-dropdown-row");
  const actionBar = document.getElementById("action-bar");

  let activeDropdown = null;

  // Setup click listeners on dropdown chips
  chips.forEach(chip => {
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const category = chip.getAttribute("data-category");
      
      if (activeDropdown === category) {
        closeDropdown();
      } else {
        openDropdown(category, chip);
      }
    });
  });

  // Close dropdown on click outside
  document.addEventListener("click", (e) => {
    if (activeDropdown && dropdownMenu && !dropdownMenu.contains(e.target) && !e.target.closest(".dropdown-chip")) {
      closeDropdown();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeDropdown) {
        stateManager.resetCategory(activeDropdown);
        const activeChip = document.querySelector(`.dropdown-chip[data-category="${activeDropdown}"]`);
        if (activeChip) {
          openDropdown(activeDropdown, activeChip);
        }
      }
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDropdown();
      stateManager.applyPrimarySearch();
    });
  }

  function closeDropdown() {
    activeDropdown = null;
    if (dropdownMenu) dropdownMenu.classList.add("hidden");
    chips.forEach(c => c.classList.remove("active"));
  }

  function openDropdown(category, chipElement) {
    activeDropdown = category;
    
    // Highlight active chip
    chips.forEach(c => c.classList.remove("active"));
    chipElement.classList.add("active");

    // Clear and reveal dropdown
    if (dropdownList) dropdownList.innerHTML = "";
    if (dropdownMenu) dropdownMenu.classList.remove("hidden");

    // Position dropdown directly below the clicked filter chip
    positionDropdown(chipElement);

    const items = filterCategories[category];
    const currentState = stateManager.getState().selectedInitialChips;
    
    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "radio-item";
      
      const isSelected = currentState[category] && currentState[category].includes(item);

      if (isSelected) {
        row.classList.add("selected");
      }

      const circle = document.createElement("div");
      circle.className = "radio-circle";

      const text = document.createElement("span");
      text.textContent = item;

      row.appendChild(circle);
      row.appendChild(text);

      row.addEventListener("click", (e) => {
        e.stopPropagation();
        // Single option selection per category
        stateManager.selectSingleInitialChip(category, item);
        openDropdown(category, chipElement);
      });

      if (dropdownList) dropdownList.appendChild(row);
    });
  }

  function positionDropdown(chipElement) {
    if (!primaryFilters || !filterRow || !dropdownMenu) return;

    const filtersRect = primaryFilters.getBoundingClientRect();

    // Top position: directly below the chips row
    const topPos = chipElement.offsetTop + chipElement.offsetHeight + 8;

    // Left position: aligned with the clicked chip's left edge (adjusted for scroll)
    let leftPos = chipElement.offsetLeft - filterRow.scrollLeft;

    const menuWidth = Math.max(220, chipElement.offsetWidth + 40);
    const maxLeft = filtersRect.width - menuWidth - 16;
    
    if (leftPos > maxLeft) {
      leftPos = Math.max(16, maxLeft);
    }
    if (leftPos < 16) {
      leftPos = 16;
    }

    dropdownMenu.style.top = `${topPos}px`;
    dropdownMenu.style.left = `${leftPos}px`;
    dropdownMenu.style.width = `${menuWidth}px`;
    dropdownMenu.style.right = "auto";
  }

  // Subscribe to state changes to update labels on the chips
  stateManager.subscribe((state) => {
    const selectedChips = state.selectedInitialChips;

    chips.forEach(chip => {
      const category = chip.getAttribute("data-category");
      const labelElement = chip.querySelector(".chip-label");
      
      const defaults = { location: "Location", year: "Year", event: "Event", people: "People", season: "Season" };
      const selectedForCat = selectedChips[category] || [];

      if (selectedForCat.length > 0) {
        labelElement.textContent = selectedForCat[0];
        chip.classList.add("has-selection");
      } else {
        labelElement.textContent = defaults[category];
        chip.classList.remove("has-selection");
      }
    });

    if (actionBar) {
      actionBar.classList.add("hidden");
    }
  });
}
