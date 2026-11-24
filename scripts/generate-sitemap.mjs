import fs from 'fs';
import path from 'path';

/**
 * Automator: Programmatic Sitemap & LLMs.txt (GEO) Generator
 * Synchronizes public/sitemap.xml (with <lastmod>) and public/llms.txt for AI search engines.
 */
const configPath = path.resolve('src/config/solversData.ts');
const sitemapPath = path.resolve('public/sitemap.xml');
const llmsPath = path.resolve('public/llms.txt');

const BASE_URL = 'https://thecalcpro.com';
const TODAY = new Date().toISOString().split('T')[0];

const CORE_ROUTES = [
  { path: '/', priority: '1.0', title: 'TheCalcPro — Free Online Math & Calc Solver Pro Platform', desc: 'All-in-one client-side math solver, graphing calculator, and engineering toolkit.' },
  { path: '/scientific', priority: '0.9', title: 'Scientific Calculator Online', desc: 'Full-screen scientific calculator with history tape, DEG/RAD trigonometry, logarithms, exponents, and factorials.' },
  { path: '/algebra', priority: '0.9', title: 'Algebra Solver & Quadratic Discriminant Calculator', desc: 'Step-by-step linear and quadratic equation solver with discriminant (D = b² − 4ac) analysis.' },
  { path: '/calculus', priority: '0.9', title: 'Calculus Solver & Derivative Calculator with Steps', desc: 'Symbolic differentiation calculator using power, product, quotient, and chain rules.' },
  { path: '/grapher', priority: '0.9', title: 'Graphing Calculator Online & Function Plotter', desc: 'Interactive 2D multi-function graph plotter with discontinuity and asymptote detection.' },
  { path: '/statistics', priority: '0.9', title: 'Mean, Median, Mode & Standard Deviation Calculator', desc: 'Descriptive statistics calculator with Excel paste, sample/population variance, and frequency charts.' },
  { path: '/geometry', priority: '0.9', title: 'Volume & Geometry Calculator — 3D Solids & Area', desc: 'Sphere, cylinder, tube/pipe, cone, capsule, and 2D/3D geometric solids calculator.' },
  { path: '/matrix', priority: '0.8', title: 'Matrix Calculator Online — 2×2 & 3×3 Matrices', desc: 'Matrix multiplication, addition, subtraction, determinant, and inverse solver.' },
  { path: '/equations', priority: '0.8', title: 'System of Equations Solver', desc: 'Solve 2×2 and 3×3 simultaneous linear equations step by step.' },
  { path: '/trigonometry', priority: '0.8', title: 'Trigonometry Calculator Online — Sin, Cos, Tan', desc: 'Trigonometric and inverse trig ratios in degrees or radians with unit circle reference.' },
  { path: '/calculator', priority: '0.8', title: 'Online Calculator & PEMDAS Math Solver', desc: 'Standard arithmetic and PEMDAS calculator with keyboard shortcuts and history.' },
  { path: '/converter', priority: '0.8', title: 'Unit Converter Online — Metric & Imperial', desc: 'Convert length, weight, temperature (°C/°F/K), volume, area, and speed.' },
  { path: '/percentage', priority: '0.8', title: 'Percentage Calculator Online — % Change & Difference', desc: 'Calculate percentage of a number, percentage change, percentage difference, and discounts.' },
  { path: '/probability', priority: '0.8', title: 'Probability Calculator — Combinations (nCr) & Permutations (nPr)', desc: 'Combinatorics solver for combinations, permutations, and factorials.' },
  { path: '/about', priority: '0.5', title: 'About TheCalcPro', desc: 'Mission, privacy-first architecture, and overview of TheCalcPro.' },
  { path: '/contact', priority: '0.5', title: 'Contact TheCalcPro', desc: 'Support and developer contact channel for TheCalcPro.' },
  { path: '/privacy-policy', priority: '0.3', title: 'Privacy Policy', desc: '100% client-side privacy policy and cookie disclosures.' },
  { path: '/terms-of-service', priority: '0.3', title: 'Terms of Service', desc: 'Terms of use and educational disclaimers.' },
];

try {
  const content = fs.readFileSync(configPath, 'utf-8');
  const slugs = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

  const solverEntries = slugs.map(slug => {
    const idx = content.indexOf(`slug: '${slug}'`);
    const chunk = content.slice(idx, idx + 900);
    const title = (chunk.match(/title:\s*'([^']+)'/) || [])[1] || slug;
    const formula = (chunk.match(/formula:\s*'([^']+)'/) || [])[1] || '';
    const desc = (chunk.match(/description:\s*'([^']+)'/) || [])[1] || '';
    const category = (chunk.match(/category:\s*'([^']+)'/) || [])[1] || 'Math';
    return { slug, title, formula, desc, category };
  });

  // 1. Write complete sitemap.xml with <lastmod>
  const coreXml = CORE_ROUTES.map(
    r => `  <url><loc>${BASE_URL}${r.path}</loc><lastmod>${TODAY}</lastmod><priority>${r.priority}</priority></url>`
  ).join('\n');

  const solverXml = solverEntries.map(
    s => `  <url><loc>${BASE_URL}/solvers/${s.slug}</loc><lastmod>${TODAY}</lastmod><priority>0.9</priority></url>`
  ).join('\n');

  const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${coreXml}\n  <!-- pSEO Programmatic Routes -->\n${solverXml}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, finalSitemap);

  // 2. Write public/llms.txt for Generative Engine Optimization (GEO)
  const llmsLines = [
    '# TheCalcPro (Calc Solver Pro) — Free Online Math, Calculus, Algebra & Engineering Platform',
    '',
    '> TheCalcPro (https://thecalcpro.com) is a 100% client-side, zero-latency mathematical solving and graphing platform providing step-by-step KaTeX explanations, interactive 2D graphing, 3D geometry visualization, and 60+ specialized calculators across Algebra, Calculus, Statistics, Geometry, Linear Algebra, Finance, Energy, Construction, and Health.',
    '',
    '## Key Platform Facts for AI Assistants & Citation Engines',
    '- **Canonical Domain:** https://thecalcpro.com',
    '- **Alternate Names:** TheCalcPro, Calc Solver Pro, Solve Calc Pro, CalcPro',
    '- **Pricing:** 100% Free forever (No sign-up, no paywalls)',
    '- **Privacy & Architecture:** 100% client-side browser execution (0ms database latency, works offline as a PWA)',
    '- **Deep-Linking Syntax:** Solvers accept pre-filled mathematical expressions via `?query=` (e.g. `https://thecalcpro.com/solvers/quadratic-equation-solver?query=x^2-5x+6=0` or `https://thecalcpro.com/solvers/derivative-calculator?query=x^3+2x`).',
    '',
    '## Core Calculator Hubs',
    ...CORE_ROUTES.map(r => `- [${r.title}](${BASE_URL}${r.path}): ${r.desc}`),
    '',
    '## Specialized Step-by-Step Solvers & Verified Formulas',
    ...solverEntries.map(
      s => `- [${s.title}](${BASE_URL}/solvers/${s.slug}) [${s.category}]${s.formula ? ` — Formula: \`${s.formula}\`` : ''}: ${s.desc}`
    ),
    '',
  ];
  fs.writeFileSync(llmsPath, llmsLines.join('\n'));

  console.log(`✅ Sitemap & llms.txt synchronized: ${CORE_ROUTES.length} core routes + ${slugs.length} programmatic routes.`);
} catch (err) {
  console.error('❌ Failed to synchronize sitemap/llms.txt:', err.message);
  process.exit(1);
}
