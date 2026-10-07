const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER EXCEPTION:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("clicking search");
  await page.click('[data-target="view-search"]');
  await new Promise(r => setTimeout(r, 500));
  
  console.log("clicking location chip");
  await page.click('[data-category="location"]');
  await new Promise(r => setTimeout(r, 500));

  console.log("screenshot saved to test.png");
  await page.screenshot({ path: 'test.png' });

  await browser.close();
})();
