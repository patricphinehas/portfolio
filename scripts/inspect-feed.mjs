import fs from 'fs';

const j = JSON.parse(fs.readFileSync('R:/personal/portfolio/scripts/_feed_meta.json', 'utf8'));
const total = j.feed?.['openSearch$totalResults']?.['$t'];
console.log('total', total);
console.log('entries', j.feed?.entry?.length);
const e = j.feed.entry[0];
console.log('keys', Object.keys(e));
console.log('title', e.title?.['$t']);
console.log('categories', (e.category || []).map((c) => c.term));
console.log(
  'link',
  (e.link || []).find((l) => l.rel === 'alternate')?.href
);
console.log('content type', e.content?.type);
console.log('content sample', (e.content?.['$t'] || e.summary?.['$t'] || '').slice(0, 500));
