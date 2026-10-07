const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  await page.click('[data-target="view-search"]');
  await new Promise(r => setTimeout(r, 500));
  
  await page.click('[data-category="location"]');
  await new Promise(r => setTimeout(r, 500));

  await page.click('.filter-dropdown-menu .checkbox-item');
  await new Promise(r => setTimeout(r, 500));

  await page.click('#dropdown-apply-btn');
  await new Promise(r => setTimeout(r, 1000));

  const isPromptVisibleBefore = await page.evaluate(() => {
    const el = document.getElementById('refinement-prompt');
    return !el.classList.contains('hidden');
  });
  console.log("Prompt visible before clicking Yes:", isPromptVisibleBefore);

  await page.click('#found-yes-btn');
  await new Promise(r => setTimeout(r, 500));

  const isPromptVisibleAfter = await page.evaluate(() => {
    const el = document.getElementById('refinement-prompt');
    return !el.classList.contains('hidden');
  });
  console.log("Prompt visible after clicking Yes:", isPromptVisibleAfter);

  await browser.close();
})();
