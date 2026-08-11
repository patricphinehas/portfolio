import fs from 'fs';

const j = JSON.parse(fs.readFileSync('R:/personal/portfolio/scripts/_feed1.json', 'utf8'));
const total = j.feed?.['openSearch$totalResults']?.['$t'];
console.log('total', total, 'entries', j.feed?.entry?.length);

const cats = new Map();
for (const e of j.feed.entry) {
  for (const c of e.category || []) {
    cats.set(c.term, (cats.get(c.term) || 0) + 1);
  }
}
console.log('unique labels', [...cats.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40));

const e = j.feed.entry[0];
console.log('sample title', e.title?.['$t']);
console.log('sample cats', (e.category || []).map((c) => c.term));
console.log('has content?', Boolean(e.content?.['$t']));
console.log('has summary?', Boolean(e.summary?.['$t']));
console.log('summary len', (e.summary?.['$t'] || '').length);
