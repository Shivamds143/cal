/**
 * prerender.js — Static Site Generation (SSG) for SEO
 * 
 * After Vite builds the SPA into dist/, this script:
 * 1. Spins up a lightweight static server
 * 2. Uses Puppeteer to visit each route
 * 3. Captures the fully-rendered HTML (with all React content, meta tags, JSON-LD)
 * 4. Writes it to dist/<route>/index.html
 * 
 * This ensures Googlebot gets real HTML content even without executing JS.
 * 
 * Usage: node prerender.js
 * (Run after `vite build`)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, 'dist');

// All routes that need pre-rendering
const ROUTES = [
  '/',
  '/calculators',
  '/how-it-works',
  '/about',
  // GPA calculators
  '/sppu-cgpa-to-percentage',
  '/sppu-percentage-to-cgpa',
  '/sppu-sgpa-to-percentage',
  '/sppu-sgpa-to-cgpa',
  '/sppu-cgpa-calculator',
  '/semester-wise-cgpa',
  // Marks calculators
  '/marks-percentage',
  '/internal-external-marks',
  '/required-marks',
  '/passing-marks',
  '/total-marks-calculator',
  '/average-marks-calculator',
  // Student utilities
  '/target-cgpa-calculator',
  '/attendance-percentage',
  '/required-attendance',
  '/grade-calculator',
  '/class-division-calculator',
];

async function prerender() {
  // Dynamic import so puppeteer is only needed at build time
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error('❌ Puppeteer not found. Install it:');
    console.error('   npm install --save-dev puppeteer');
    process.exit(1);
  }

  // Start a simple static file server for the dist directory
  const { createServer } = await import('http');
  const handler = await createStaticHandler(DIST_DIR);
  const server = createServer(handler);
  
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(undefined));
  });
  
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;
  
  console.log(`🌐 Static server running at ${origin}`);
  console.log(`📄 Pre-rendering ${ROUTES.length} routes...\n`);

  const browser = await puppeteer.default.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `${origin}${route}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait a bit for React to hydrate and helmet to inject tags
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(r => setTimeout(r, 1000));

      // Get the fully rendered HTML
      const html = await page.content();

      // Determine output path
      const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
      const outputFile = path.join(DIST_DIR, routePath);
      const outputDir = path.dirname(outputFile);

      // Create directory if needed
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputFile, html, 'utf-8');
      console.log(`  ✅ ${route} → ${path.relative(DIST_DIR, outputFile)}`);
    } catch (error) {
      console.error(`  ❌ ${route} → Error: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n🎉 Pre-rendered ${ROUTES.length} pages into dist/`);
}

/**
 * Creates a simple static file server handler that also handles
 * SPA fallback (serves index.html for routes without a file extension).
 */
async function createStaticHandler(distDir) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  return (req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);

    // SPA fallback: if no extension and file doesn't exist, serve index.html
    if (!ext || (!fs.existsSync(filePath) && !ext)) {
      filePath = path.join(distDir, 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const contentType = mimeTypes[path.extname(filePath)] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } else {
      // SPA fallback for all other requests
      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    }
  };
}

prerender().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
