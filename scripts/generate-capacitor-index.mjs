/**
 * scripts/generate-capacitor-index.mjs
 * 
 * Post-build script that generates a minimal index.html in dist/client/
 * for Capacitor's WebView entry point. Reads the actual hashed filenames
 * from the Vite client build output so it stays in sync across rebuilds.
 */
import { readdirSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

const DIST = join(process.cwd(), 'dist', 'client');
const ASSETS = join(DIST, 'assets');

// Find hashed entry files
const files = readdirSync(ASSETS);
const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
const jsFiles = files
  .filter(f => f.startsWith('index-') && f.endsWith('.js'))
  .sort((a, b) => {
    // Sort by file size ascending so we include all chunks in order
    return statSync(join(ASSETS, a)).size - statSync(join(ASSETS, b)).size;
  });

const jsEntries = jsFiles
  .map(f => `  <script type="module" src="assets/${f}"></script>`)
  .join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#ff9d2e" />
  <title>TheCalcPro</title>
  ${cssFile ? `<link rel="stylesheet" href="assets/${cssFile}" />` : ''}
  <link rel="icon" href="favicon.ico" />
  <script>
    (function() {
      var theme = localStorage.getItem('calcpro-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body>
  <div id="root"></div>
${jsEntries}
</body>
</html>
`;

writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
console.log('✅ Capacitor index.html generated in dist/client/');
