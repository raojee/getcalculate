import fs from 'fs';

const HOST = 'thecalcpro.com';
const KEY = 'eb4619e494f84413b7e61924655a8e1c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const extraUrls = [
  `https://${HOST}/privacy-policy`,
  `https://${HOST}/terms-of-service`,
];
const urlList = Array.from(new Set([...urls, ...extraUrls]));

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    console.log(`[${endpoint}] HTTP ${res.status} ${res.statusText}`, text ? `- ${text}` : '');
  } catch (err) {
    console.error(`[${endpoint}] Error:`, err.message);
  }
}
