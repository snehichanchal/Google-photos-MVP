const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  await page.click('[data-target="view-search"]');
  await new Promise(r => setTimeout(r, 500));
  
  await page.click('[data-category="location"]');
  await new Promise(r => setTimeout(r, 500));

  await page.click('.filter-dropdown-menu .checkbox-item');
  await new Promise(r => setTimeout(r, 500));

  await page.click('#dropdown-apply-btn');
  await new Promise(r => setTimeout(r, 1000));

  await page.click('#found-no-btn');
  await new Promise(r => setTimeout(r, 1000));

  // Click the first dynamic chip
  console.log("clicking chip...");
  await page.click('.chip-container .chip');
  await new Promise(r => setTimeout(r, 1000));
  console.log("clicked.");

  await browser.close();
})();
