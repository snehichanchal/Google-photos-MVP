const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  await page.click('[data-target="view-search"]');
  await new Promise(r => setTimeout(r, 500));
  
  // Click Location chip
  await page.click('[data-category="location"]');
  await new Promise(r => setTimeout(r, 500));

  // Select first item
  await page.click('.filter-dropdown-menu .checkbox-item');
  await new Promise(r => setTimeout(r, 500));

  // Show Results
  await page.click('#dropdown-apply-btn');
  await new Promise(r => setTimeout(r, 1000));

  // Click NO on "Found it?"
  await page.click('#found-no-btn');
  await new Promise(r => setTimeout(r, 1000));

  // Capture screenshot of dynamic chips
  await page.screenshot({ path: 'test-dynamic-1.png' });
  
  // Click the first dynamic chip (e.g. Indoor (4))
  await page.click('.chip-container .chip');
  await new Promise(r => setTimeout(r, 1000));

  // Capture screenshot after clicking one
  await page.screenshot({ path: 'test-dynamic-2.png' });
  
  // Click the SECOND dynamic chip
  await page.evaluate(() => {
    document.querySelectorAll('.chip-container .chip')[1].click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Capture screenshot after clicking second
  await page.screenshot({ path: 'test-dynamic-3.png' });

  await browser.close();
})();
