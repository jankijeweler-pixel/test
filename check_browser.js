import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5174/', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
  const homeHtml = await page.evaluate(() => {
    const el = document.getElementById('products');
    return el ? el.outerHTML : 'NOT FOUND';
  });
  
  await page.goto('http://localhost:5174/products', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
  const allHtml = await page.content();
  
  fs.writeFileSync('output.txt', 'HOME:\n' + homeHtml + '\n\nALL HTML:\n' + allHtml);
  await browser.close();
  console.log('Saved to output.txt');
})();
