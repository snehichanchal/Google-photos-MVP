export function executePrimarySearch(photos, criteria) {
  return photos.filter((photo) => {
    let matches = true;
    
    if (criteria.location && criteria.location.length > 0) {
      if (!criteria.location.includes(photo.location)) matches = false;
    }
    
    if (criteria.year && criteria.year.length > 0) {
      if (!criteria.year.includes(photo.year)) matches = false;
    }
    
    if (criteria.event && criteria.event.length > 0) {
      if (!criteria.event.includes(photo.event)) matches = false;
    }
    
    if (criteria.people && criteria.people.length > 0) {
      if (!criteria.people.every(person => photo.people.includes(person))) {
        matches = false;
      }
    }
    
    if (criteria.season && criteria.season.length > 0) {
      if (!criteria.season.includes(photo.season)) matches = false;
    }
    
    return matches;
  });
}

export function executeSecondarySearch(activePhotos, attributeClues) {
  if (!attributeClues || attributeClues.length === 0) return activePhotos;
  return activePhotos.filter((photo) => {
    return attributeClues.every(clue => photo.visual_attributes && photo.visual_attributes.includes(clue));
  });
}
