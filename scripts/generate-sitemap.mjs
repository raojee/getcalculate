import fs from 'fs';
import path from 'path';

/**
 * Automator: Programmatic Sitemap Generator
 * Parses the static configuration matrix and synchronizes the public sitemap.
 */
const configPath = path.resolve('src/config/solversData.ts');
const sitemapPath = path.resolve('public/sitemap.xml');

const BASE_URL = 'https://thecalcpro.com';

try {
  const content = fs.readFileSync(configPath, 'utf-8');
  // Extract slugs using regex to avoid TS compilation overhead in build script
  const slugs = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

  let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  const markerStart = '<!-- pSEO Programmatic Routes -->';
  const markerEnd = '</urlset>';
  const startIndex = sitemap.indexOf(markerStart);

  if (startIndex !== -1) {
    const header = sitemap.substring(0, startIndex + markerStart.length);
    const newRoutes = slugs.map(slug => `\n  <url><loc>${BASE_URL}/solvers/${slug}</loc><priority>0.9</priority></url>`).join('');

    const finalSitemap = `${header}${newRoutes}\n</urlset>\n`;
    fs.writeFileSync(sitemapPath, finalSitemap);
    console.log(`✅ Sitemap synchronized: ${slugs.length} programmatic routes injected.`);
  } else {
    console.warn('⚠️ Sitemap marker not found. Skipping synchronization.');
  }
} catch (err) {
  console.error('❌ Failed to synchronize sitemap:', err.message);
  process.exit(1);
}
