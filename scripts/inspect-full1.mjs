import fs from 'fs';

const j = JSON.parse(fs.readFileSync('R:/personal/portfolio/scripts/_full1.json', 'utf8'));
const e = j.feed.entry[0];
const content = e.content?.['$t'] || '';
console.log('content length', content.length);
console.log('has Ingredients?', /ingredient/i.test(content));
console.log('has Prep Time?', /prep time/i.test(content));
console.log('cats', (e.category || []).map((c) => c.term));
console.log('media', e['media$thumbnail']?.url);
console.log('tail', content.slice(-800));
