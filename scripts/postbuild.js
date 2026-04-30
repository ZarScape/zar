import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const indexHtml = path.join(distPath, 'index.html');

const routes = [
  'store',
  'partners',
  'privacy',
  'tos',
  'success'
];

if (fs.existsSync(indexHtml)) {
  routes.forEach(route => {
    const routeFolder = path.join(distPath, route);
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    fs.copyFileSync(indexHtml, path.join(routeFolder, 'index.html'));
    console.log(`Created ${route}/index.html`);
  });
  
  // Also copy to 404.html if it doesn't exist (as a fallback)
  const fallback404 = path.join(distPath, '404.html');
  if (!fs.existsSync(fallback404)) {
    fs.copyFileSync(indexHtml, fallback404);
    console.log('Created 404.html fallback');
  }
} else {
  console.error('dist/index.html not found. Run npm run build first.');
}
