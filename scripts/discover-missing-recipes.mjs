/**
 * Find posts missing from summary pagination via label feeds + archive pages.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'scrape-cache');
const CATALOG_PATH = path.join(OUT_DIR, 'catalog.json');
const BASE = 'https://www.steffisrecipes.com';
const UA = 'Mozilla/5.0 (compatible; PortfolioRecipeIndexer/1.0)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

function decodeEntities(str) {
  return String(str || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

async function feedEntries(url) {
  const text = await fetchText(url);
  const json = JSON.parse(text);
  const total = Number(json.feed?.['openSearch$totalResults']?.['$t'] || 0);
  const entries = json.feed?.entry || [];
  return { total, entries };
}

async function allFromFeed(baseQuery) {
  const posts = [];
  let start = 1;
  let total = Infinity;
  while (start <= total) {
    const url = `${BASE}/feeds/posts/summary${baseQuery}${baseQuery.includes('?') ? '&' : '?'}alt=json&max-results=150&start-index=${start}`;
    const { total: t, entries } = await feedEntries(url);
    total = t;
    if (!entries.length) break;
    for (const e of entries) {
      const title = decodeEntities(e.title?.['$t'] || '').trim();
      const link = (e.link || []).find((l) => l.rel === 'alternate')?.href || '';
      const labels = (e.category || []).map((c) => c.term).filter(Boolean);
      const thumb = e['media$thumbnail']?.url?.replace(/^http:\/\//, 'https://') || '';
      const published = e.published?.['$t'] || '';
      posts.push({
        blogId: e.id?.['$t'] || link,
        title,
        sourceUrl: link.replace(/^http:\/\//, 'https://'),
        labels,
        thumb,
        published,
        summary: '',
      });
    }
    start += 150;
    await sleep(100);
  }
  return { total, posts };
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const byUrl = new Map(existing.map((p) => [p.sourceUrl, p]));

  // Discover labels from homepage nav + known catalog
  const home = await fetchText(BASE + '/');
  const labelLinks = [
    ...home.matchAll(/\/search\/label\/([^"'/?#]+)/g),
  ].map((m) => decodeURIComponent(m[1].replace(/\+/g, ' ')));
  const labels = [...new Set([...labelLinks, ...existing.flatMap((p) => p.labels || [])])];
  console.log('Labels found', labels.length);

  for (const label of labels) {
    const q = `/-/${encodeURIComponent(label)}?`;
    try {
      const { total, posts } = await allFromFeed(q);
      let added = 0;
      for (const p of posts) {
        if (!p.sourceUrl || byUrl.has(p.sourceUrl)) continue;
        byUrl.set(p.sourceUrl, p);
        added++;
      }
      console.log(`Label ${label}: feed total ${total}, new ${added}`);
    } catch (err) {
      console.warn('Label fail', label, err.message);
    }
  }

  // Year archives
  for (let year = 2012; year <= 2026; year++) {
    try {
      const { total, posts } = await allFromFeed(`?published-min=${year}-01-01T00:00:00&published-max=${year}-12-31T23:59:59&`);
      // Blogger may not support published-min on public feeds; also try HTML archive
      let added = 0;
      for (const p of posts) {
        if (!p.sourceUrl || byUrl.has(p.sourceUrl)) continue;
        byUrl.set(p.sourceUrl, p);
        added++;
      }
      if (added || total) console.log(`Year ${year}: total ${total}, new ${added}`);
    } catch (err) {
      // ignore
    }

    try {
      const html = await fetchText(`${BASE}/${year}/`);
      const links = [...html.matchAll(/href=['"](https?:\/\/www\.steffisrecipes\.com\/\d{4}\/\d{2}\/[^"'#]+\.html)['"]/gi)].map(
        (m) => m[1].replace(/^http:\/\//, 'https://')
      );
      let added = 0;
      for (const url of links) {
        if (byUrl.has(url)) continue;
        const titleGuess = url
          .split('/')
          .pop()
          .replace(/\.html$/, '')
          .replace(/-/g, ' ');
        byUrl.set(url, {
          blogId: url,
          title: titleGuess,
          sourceUrl: url,
          labels: [],
          thumb: '',
          published: `${year}-01-01T00:00:00.000Z`,
          summary: '',
        });
        added++;
      }
      if (added) console.log(`Archive HTML ${year}: new ${added}`);
    } catch (err) {
      // year may 404
    }
    await sleep(80);
  }

  // Full default feed with content (sometimes returns different set)
  try {
    const { total, posts } = await allFromFeed('?');
    let added = 0;
    for (const p of posts) {
      if (!p.sourceUrl || byUrl.has(p.sourceUrl)) continue;
      byUrl.set(p.sourceUrl, p);
      added++;
    }
    console.log(`Default summary full pass: claimed ${total}, new ${added}`);
  } catch (err) {
    console.warn(err.message);
  }

  const merged = [...byUrl.values()];
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(merged, null, 2));
  console.log('Merged catalog size', merged.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
