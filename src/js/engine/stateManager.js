import { executePrimarySearch, executeSecondarySearch } from "./searchEngine.js";
import { extractSecondaryAttributes } from "./attributeExtractor.js";

export const RefinementStatus = {
  IDLE: "INITIAL_SEARCH_IDLE",
  PRIMARY_ACTIVE: "PRIMARY_FILTERED",
  NEEDS_REFINEMENT: "NEEDS_REFINEMENT",
  REFINED: "SECONDARY_FILTERED",
  SUCCESS: "SUCCESS",
  VIEWER_OPEN: "TARGET_VIEWER_OPEN"
};

class StateManager {
  constructor() {
    this.allPhotos = [];
    this.state = {
      refinementStatus: RefinementStatus.IDLE,
      selectedInitialChips: {
        location: [],
        year: [],
        event: [],
        people: [],
        season: []
      },
      activeFilteredPhotos: [],
      availableSecondaryChips: [],
      selectedSecondaryChips: [],
      activePhotoModal: null
    };
    this.listeners = [];
  }

  init(photos) {
    this.allPhotos = photos;
    this.state.activeFilteredPhotos = photos;
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.state);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.state));
  }

  getState() {
    return this.state;
  }

  toggleInitialChip(category, value) {
    this.selectSingleInitialChip(category, value);
  }

  selectSingleInitialChip(category, value) {
    const current = this.state.selectedInitialChips[category] || [];
    if (current.includes(value)) {
      this.state.selectedInitialChips[category] = [];
    } else {
      this.state.selectedInitialChips[category] = [value];
    }
    this.notify();
  }

  resetCategory(category) {
    this.state.selectedInitialChips[category] = [];
    this.notify();
  }

  applyPrimarySearch() {
    this.state.refinementStatus = RefinementStatus.PRIMARY_ACTIVE;
    this.state.activeFilteredPhotos = executePrimarySearch(this.allPhotos, this.state.selectedInitialChips);
    this.notify();
  }

  triggerRefinementNo() {
    this.state.refinementStatus = RefinementStatus.NEEDS_REFINEMENT;
    const baseSubset = executePrimarySearch(this.allPhotos, this.state.selectedInitialChips);
    this.state.availableSecondaryChips = extractSecondaryAttributes(baseSubset);
    this.notify();
  }

  triggerRefinementYes() {
    this.state.refinementStatus = RefinementStatus.SUCCESS;
    this.notify();
  }

  toggleSecondaryChip(chipTag) {
    this.state.refinementStatus = RefinementStatus.REFINED;
    
    const idx = this.state.selectedSecondaryChips.indexOf(chipTag);
    if (idx > -1) {
      this.state.selectedSecondaryChips.splice(idx, 1);
    } else {
      this.state.selectedSecondaryChips.push(chipTag);
    }
    
    const baseSubset = executePrimarySearch(this.allPhotos, this.state.selectedInitialChips);
    this.state.activeFilteredPhotos = executeSecondarySearch(baseSubset, this.state.selectedSecondaryChips);
    
    // Re-extract the counts dynamically based on the current filtering level, 
    // but we base it on the baseSubset so unselected chips don't vanish.
    this.state.availableSecondaryChips = extractSecondaryAttributes(baseSubset);
    
    this.notify();
  }

  openPhotoModal(photoId) {
    this.state.activePhotoModal = this.allPhotos.find(p => p.photo_id === photoId);
    this.notify();
  }

  closePhotoModal() {
    this.state.activePhotoModal = null;
    this.notify();
  }

  resetSearch() {
    this.state.refinementStatus = RefinementStatus.IDLE;
    this.state.selectedInitialChips = { location: [], year: [], event: [], people: [], season: [] };
    this.state.activeFilteredPhotos = this.allPhotos;
    this.state.availableSecondaryChips = [];
    this.state.selectedSecondaryChips = [];
    this.notify();
  }
}

export const stateManager = new StateManager();
