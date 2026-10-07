const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  await page.click('[data-target="view-search"]');
  await new Promise(r => setTimeout(r, 500));
  
  await page.click('[data-category="location"]');
  await new Promise(r => setTimeout(r, 500));

  // Click the first list item in the dropdown
  await page.click('.filter-dropdown-menu .list-item');
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: 'test2.png' });
  await browser.close();
})();
