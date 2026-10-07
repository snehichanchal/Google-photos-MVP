export function extractSecondaryAttributes(activePhotos, selectedPrimaryCriteria, limit = 8) {
  const frequencies = {};
  
  // What attributes are already selected? 
  // Primary criteria are known implicitly by state, but secondary attributes shouldn't overlap.
  
  activePhotos.forEach((photo) => {
    if (photo.visual_attributes) {
      photo.visual_attributes.forEach((attr) => {
        if (!frequencies[attr]) frequencies[attr] = 0;
        frequencies[attr]++;
      });
    }
  });

  const sortedAttributes = Object.keys(frequencies).map(attr => ({
    tag: attr,
    label: formatAttributeLabel(attr),
    count: frequencies[attr]
  })).sort((a, b) => b.count - a.count);

  return sortedAttributes.slice(0, limit);
}

export function formatAttributeLabel(attr) {
  return attr.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
