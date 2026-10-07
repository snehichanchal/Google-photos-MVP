/**
 * Data Validation Script for mockPhotos.js
 */

import { mockPhotos, filterCategories } from "../src/data/mockPhotos.js";

console.log("==========================================");
console.log("  Running Phase 1 Mock Data Validation   ");
console.log("==========================================");

let hasErrors = false;

// 1. Total Photos Count
console.log(`\n[+] Total Photo Records: ${mockPhotos.length}`);
if (mockPhotos.length < 15) {
  console.error("❌ Error: Expected at least 15 photo records in mockPhotos.");
  hasErrors = true;
} else {
  console.log("✅ Photo count meets minimum threshold.");
}

// 2. Schema Integrity Verification
const requiredKeys = [
  "photo_id",
  "title",
  "image_url",
  "date",
  "year",
  "location",
  "event",
  "people",
  "visual_attributes",
  "aspect_ratio"
];

const photoIds = new Set();

mockPhotos.forEach((photo, index) => {
  const prefix = `Photo [${index + 1}] (${photo.photo_id || "missing-id"})`;

  // Check required keys
  requiredKeys.forEach((key) => {
    if (!photo.hasOwnProperty(key) || photo[key] === null || photo[key] === undefined) {
      console.error(`❌ ${prefix}: Missing required field '${key}'`);
      hasErrors = true;
    }
  });

  // Check for duplicate photo_id
  if (photoIds.has(photo.photo_id)) {
    console.error(`❌ ${prefix}: Duplicate photo_id '${photo.photo_id}'`);
    hasErrors = true;
  }
  photoIds.add(photo.photo_id);

  // Check array types
  if (!Array.isArray(photo.people) || photo.people.length === 0) {
    console.error(`❌ ${prefix}: 'people' must be a non-empty array`);
    hasErrors = true;
  }

  if (!Array.isArray(photo.visual_attributes) || photo.visual_attributes.length === 0) {
    console.error(`❌ ${prefix}: 'visual_attributes' must be a non-empty array`);
    hasErrors = true;
  }

  // Check aspect ratio
  if (!["square", "portrait", "landscape"].includes(photo.aspect_ratio)) {
    console.error(`❌ ${prefix}: Invalid aspect_ratio '${photo.aspect_ratio}'`);
    hasErrors = true;
  }
});

// 3. Category Metadata Check
console.log("\n[+] Checking Filter Categories:");
Object.keys(filterCategories).forEach((cat) => {
  console.log(` - ${cat}: ${filterCategories[cat].join(", ")}`);
  if (!Array.isArray(filterCategories[cat]) || filterCategories[cat].length === 0) {
    console.error(`❌ Error: Filter category '${cat}' is empty.`);
    hasErrors = true;
  }
});

console.log("\n==========================================");
if (hasErrors) {
  console.error("❌ DATA VALIDATION FAILED");
  process.exit(1);
} else {
  console.log("✅ ALL DATA VALIDATION CHECKS PASSED SUCCESSFULLY!");
  process.exit(0);
}
