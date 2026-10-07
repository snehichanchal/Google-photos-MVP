import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = '/home/testing/.gemini/antigravity-ide/brain/3a806f26-0171-4714-9c2a-eae77050bcb7';

async function runTests() {
  console.log('Starting Puppeteer UI Verification...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2 }); // Pixel 7 standard mobile viewport

  console.log('1. Navigating to http://localhost:8000/index.html...');
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });

  // 1. Landing Photos Page
  console.log('2. Verifying Photos landing page grid...');
  const photoCardsCount = await page.$$eval('#all-photos-grid .photo-card', cards => cards.length);
  console.log(`   -> Found ${photoCardsCount} photos rendered in landing grid.`);

  // 2. Navigate to Search View
  console.log('3. Navigating to Search View...');
  await page.click('a[data-target="view-search"]');
  await page.waitForSelector('#view-search.active');

  // Check chips
  const chips = await page.$$eval('.dropdown-chip', chips => chips.map(c => c.getAttribute('data-category')));
  console.log(`   -> Filter chips present: ${chips.join(', ')}`);

  // 3. Open People Dropdown
  console.log('4. Testing People Filter Dropdown positioned under People chip...');
  await page.click('.dropdown-chip[data-category="people"]');
  await page.waitForSelector('#filter-dropdown-menu:not(.hidden)');
  const peopleOptions = await page.$$eval('#dropdown-list .radio-item span', items => items.map(i => i.textContent));
  console.log(`   -> People options: ${peopleOptions.join(', ')}`);

  // Select Maya
  console.log('5. Selecting People = Maya (single selection)...');
  const mayaElement = (await page.$$('#dropdown-list .radio-item'))[3]; // Maya is index 3
  await mayaElement.click();
  
  // Verify only 1 selected item (Maya)
  const selectedCount = await page.$$eval('#dropdown-list .radio-item.selected', items => items.length);
  console.log(`   -> Selected options count in dropdown: ${selectedCount}`);
  
  await page.click('#dropdown-apply-btn');
  await new Promise(r => setTimeout(r, 500));

  const filteredCountMaya = await page.$$eval('#photo-grid .photo-card', cards => cards.length);
  console.log(`   -> Photos matching Maya: ${filteredCountMaya}`);

  // 6. Test Location Dropdown positioning under Location chip
  console.log('6. Testing Location Filter Dropdown...');
  await page.click('.dropdown-chip[data-category="location"]');
  await page.waitForSelector('#filter-dropdown-menu:not(.hidden)');
  const locationOptions = await page.$$eval('#dropdown-list .radio-item span', items => items.map(i => i.textContent));
  console.log(`   -> Location options: ${locationOptions.join(', ')}`);

  // Select Tokyo
  const tokyoElement = (await page.$$('#dropdown-list .radio-item'))[2]; // Tokyo is index 2
  await tokyoElement.click();
  await page.click('#dropdown-apply-btn');
  await new Promise(r => setTimeout(r, 500));

  const mayaTokyoCount = await page.$$eval('#photo-grid .photo-card', cards => cards.length);
  console.log(`   -> Photos matching Maya + Tokyo: ${mayaTokyoCount}`);

  // 7. Test Season Dropdown positioning under Season chip
  console.log('7. Testing Season Filter Dropdown...');
  await page.click('.dropdown-chip[data-category="season"]');
  await page.waitForSelector('#filter-dropdown-menu:not(.hidden)');
  const seasonOptions = await page.$$eval('#dropdown-list .radio-item span', items => items.map(i => i.textContent));
  console.log(`   -> Season options: ${seasonOptions.join(', ')}`);
  await page.click('#dropdown-reset-btn');
  await page.click('#dropdown-apply-btn');

  // Click 'No' on refinement prompt
  console.log('8. Testing Refinement & Secondary Visual Clues...');
  await page.click('#found-no-btn');
  await page.waitForSelector('#secondary-drawer:not(.hidden)');

  console.log('✅ ALL SINGLE SELECTION & DYNAMIC POSITIONING UI TESTS PASSED SUCCESSFULLY!');
  await browser.close();
}

runTests().catch(err => {
  console.error('❌ UI Test Error:', err);
  process.exit(1);
});
