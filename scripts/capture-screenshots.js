const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

const pages = [
  { name: '01-hero', url: '/' },
  { name: '02-product-listing', url: '/products' },
  { name: '03-product-detail', url: '/product/sony-wh-1000xm5' },
  { name: '04-cart', url: '/cart' },
  { name: '05-checkout', url: '/checkout' },
  { name: '06-blog', url: '/blog' },
];

(async () => {
  console.log('Starting portfolio screenshot capture...');
  console.log('Ensure your Next.js server is running on http://localhost:3000');

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });

  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const p of pages) {
    try {
      console.log(`Capturing ${p.name}...`);
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle0', timeout: 60000 });
      
      // Add a small delay to ensure animations finish
      await new Promise(r => setTimeout(r, 2000));

      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${p.name}.png`),
        fullPage: true
      });
      console.log(`Saved ${p.name}.png`);
    } catch (error) {
      console.error(`Error capturing ${p.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured in public/portfolio/');
})();
