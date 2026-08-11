/**
 * Scrape all recipes from steffisrecipes.com (Blogger).
 * 1) Paginate summary feed for catalog (title, url, labels, thumb)
 * 2) Fetch each post HTML for ingredients, steps, times, og:image
 * 3) Write src/data/recipes.generated.js + scrape report
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'scrape-cache');
const CATALOG_PATH = path.join(OUT_DIR, 'catalog.json');
const RECIPES_PATH = path.join(OUT_DIR, 'recipes-raw.json');
const GENERATED_JS = path.join(ROOT, 'src', 'data', 'recipes.generated.js');
const REPORT_PATH = path.join(OUT_DIR, 'report.json');

const BASE = 'https://www.steffisrecipes.com';
const UA = 'Mozilla/5.0 (compatible; PortfolioRecipeIndexer/1.0; +local)';
const PAGE_SIZE = 150;
const CONCURRENCY = 4;
const DELAY_MS = 120;

fs.mkdirSync(OUT_DIR, { recursive: true });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json,text/html,*/*' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return await res.text();
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(800 * (i + 1));
    }
  }
}

function decodeEntities(str) {
  return String(str || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&apos;/g, "'");
}

function stripTags(html) {
  return decodeEntities(
    String(html || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|tr|li|h\d)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+\n/g, '\n')
      .replace(/\n\s+/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .trim()
  );
}

function slugify(title) {
  return String(title || 'recipe')
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'recipe';
}

function mapCategory(labels = [], title = '') {
  const L = labels.map((x) => x.toLowerCase());
  const t = title.toLowerCase();
  const has = (re) => L.some((l) => re.test(l)) || re.test(t);

  if (has(/fish|seafood|prawn|shrimp|crab/)) return 'seafood';
  if (has(/mutton|lamb|goat/)) return 'mutton';
  if (has(/chicken/)) return 'chicken';
  if (has(/egg/)) return 'egg';
  if (has(/sweet|dessert|cake|baking|ladoo|laddu|halwa|kesari|jamun|payasam|pudding|biscuit|macaroon|katli|burfi|mysore/))
    return 'sweets';
  if (has(/snack|chat|appetizer|starter|bonda|bajji|pakora|chips|cuts|roast(?!.*curry)/))
    return 'snacks';
  if (has(/breakfast|idli|dosa|uthappam|poori|porridge|upma/)) return 'breakfast';
  if (has(/sauce|chutney|masala.?powder|pickle/)) return 'condiments';
  if (has(/drink|beverage|coffee|juice|buttermilk|panagam|jigarthanda|shake/)) return 'drinks';
  if (has(/baby/)) return 'other';
  if (has(/vegetarian|veg|paneer|mushroom|soya|rice|curry|kulambu|gravy|side/)) return 'vegetarian';
  if (has(/non.?veg/)) return 'chicken';
  return 'vegetarian';
}

function mapSubcategory(labels = []) {
  if (!labels.length) return null;
  const priority = [
    /appetizer|starter/i,
    /side/i,
    /curry|gravy|kulambu/i,
    /rice/i,
    /breakfast/i,
    /snack/i,
    /sweet|dessert|cake|baking/i,
    /chat/i,
    /sauce|chutney/i,
    /egg/i,
    /fish/i,
    /chicken/i,
    /mutton/i,
    /paneer/i,
    /traditional/i,
    /diwali/i,
  ];
  for (const re of priority) {
    const hit = labels.find((l) => re.test(l));
    if (hit) return hit.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return labels[0].replace(/-/g, ' ');
}

function parseFraction(token) {
  const t = token.trim();
  if (!t) return null;
  if (/^(required|to taste|as needed|as required|few|some)$/i.test(t)) return null;
  const mixed = t.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = t.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const num = t.match(/^(\d+(?:\.\d+)?)/);
  if (num) return Number(num[1]);
  return null;
}

function parseQuantity(qtyRaw) {
  const qty = stripTags(qtyRaw).replace(/\u00a0/g, ' ').trim();
  if (!qty || /^(required|to taste|as needed|as required|-)$/i.test(qty)) {
    return { amount: null, unit: 'to taste', scalable: false };
  }

  // e.g. "1 cup", "1/4 tsp", "2 - 3", "10", "1 tbsp"
  const range = qty.match(/^(\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)\s*[-–to]+\s*(\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)(?:\s+(.+))?$/i);
  if (range) {
    const a = parseFraction(range[1]);
    const b = parseFraction(range[2]);
    const amount = a != null && b != null ? (a + b) / 2 : a ?? b;
    const unit = (range[3] || 'pcs').trim().toLowerCase() || 'pcs';
    return { amount, unit: normalizeUnit(unit) };
  }

  const m = qty.match(/^(\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)\s*(.*)$/);
  if (m) {
    const amount = parseFraction(m[1]);
    let unit = (m[2] || '').trim().toLowerCase();
    if (!unit) unit = 'pcs';
    return { amount, unit: normalizeUnit(unit) };
  }

  return { amount: null, unit: qty.toLowerCase() || 'to taste', scalable: false };
}

function normalizeUnit(unit) {
  const u = unit.toLowerCase().replace(/\./g, '').trim();
  const map = {
    teaspoon: 'tsp',
    teaspoons: 'tsp',
    tsps: 'tsp',
    tablespoon: 'tbsp',
    tablespoons: 'tbsp',
    tbsps: 'tbsp',
    tbs: 'tbsp',
    cups: 'cup',
    cup: 'cup',
    grams: 'g',
    gram: 'g',
    gms: 'g',
    gm: 'g',
    ml: 'ml',
    millilitre: 'ml',
    milliliter: 'ml',
    litre: 'l',
    liter: 'l',
    kg: 'kg',
    pieces: 'pcs',
    piece: 'pcs',
    nos: 'pcs',
    no: 'pcs',
    numbers: 'pcs',
    number: 'pcs',
    cloves: 'cloves',
    clove: 'clove',
    sprigs: 'sprig',
    sprig: 'sprig',
    spring: 'sprig',
    pinch: 'pinch',
    pinches: 'pinch',
    inch: 'inch',
    inches: 'inch',
  };
  if (map[u]) return map[u];
  if (/^to taste/.test(u)) return 'to taste';
  return u.slice(0, 24) || 'pcs';
}

function ingredientId(name, idx) {
  const base = slugify(name).slice(0, 40) || `ing-${idx}`;
  return `${base}-${idx}`;
}

function pickMajor(ingredients) {
  const scored = ingredients
    .map((ing, idx) => {
      let score = 0;
      const n = ing.name.toLowerCase();
      if (ing.amount == null || ing.scalable === false) score -= 10;
      if (/(chicken|mutton|fish|prawn|paneer|soya|mushroom|cauliflower|potato|rice|flour|milk|egg|meat|beef|lamb|dal|lentil|peas|corn|oats|wheat|maida|bread|biscuit)/.test(n))
        score += 5;
      if (/(salt|water|oil|turmeric|chilli|chili|mustard|curry leaf|asafoetida|hing)/.test(n)) score -= 3;
      if (ing.unit === 'g' || ing.unit === 'kg' || ing.unit === 'cup' || ing.unit === 'ml') score += 2;
      if (idx < 3) score += 1;
      return { idx, score };
    })
    .sort((a, b) => b.score - a.score);

  const majors = scored.slice(0, 2).filter((s) => s.score > 0).map((s) => s.idx);
  if (!majors.length && ingredients.length) majors.push(0);
  return new Set(majors);
}

function parseIngredientsFromHtml(html) {
  const ingredients = [];
  // Prefer quantity/ingredient tables
  const tableRe = /<table[\s\S]*?<\/table>/gi;
  const tables = html.match(tableRe) || [];
  for (const table of tables) {
    if (!/ingredient/i.test(table) && !/<td>/i.test(table)) continue;
    if (/cooking method|step\s*\d/i.test(stripTags(table).slice(0, 80))) continue;
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    for (const row of rows) {
      const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
        stripTags(c[1])
      );
      if (cells.length < 2) continue;
      if (/quantity|ingredient/i.test(cells.join(' '))) continue;
      const [qty, name] = cells;
      if (!name || name.length < 2) continue;
      if (/^(quantity|ingredients)/i.test(name)) continue;
      const parsed = parseQuantity(qty);
      ingredients.push({
        name: name.replace(/\s+/g, ' ').trim(),
        ...parsed,
      });
    }
    if (ingredients.length >= 3) break;
  }
  return ingredients;
}

function parseStepsFromHtml(html) {
  const steps = [];
  const stepRe = /<b>\s*Step\s*(\d+)\s*\)?\s*:?\s*<\/b>\s*([\s\S]*?)(?=<b>\s*Step\s*\d+|<div[^>]*id=['"]share-post|Enjoy the|Happy Cooking|$)/gi;
  let m;
  while ((m = stepRe.exec(html))) {
    const text = stripTags(m[2])
      .replace(/^[\s:)\\-]+/, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length > 8) steps.push(paraphraseStep(text));
  }
  if (steps.length) return steps;

  // Fallback: numbered method lines
  const text = stripTags(html);
  const alt = [...text.matchAll(/Step\s*(\d+)\s*\)?\s*:?\s*([^\n]+)/gi)];
  for (const a of alt) {
    const t = a[2].trim();
    if (t.length > 8) steps.push(paraphraseStep(t));
  }
  return steps;
}

function paraphraseStep(text) {
  // Light cleanup — keep method accurate, trim fluff
  return text
    .replace(/\s+/g, ' ')
    .replace(/Happy Cooking.*/i, '')
    .replace(/Enjoy the delicious.*/i, '')
    .trim()
    .slice(0, 500);
}

function parseMeta(html) {
  const getMeta = (prop) => {
    const re = new RegExp(`<meta[^>]+(?:property|name)=['"]${prop}['"][^>]+content=['"]([^'"]+)['"]`, 'i');
    const re2 = new RegExp(`<meta[^>]+content=['"]([^'"]+)['"][^>]+(?:property|name)=['"]${prop}['"]`, 'i');
    return decodeEntities((html.match(re) || html.match(re2) || [])[1] || '');
  };

  const image =
    getMeta('og:image') ||
    getMeta('twitter:image') ||
    (html.match(/<link[^>]+rel=['"]image_src['"][^>]+href=['"]([^'"]+)['"]/i) || [])[1] ||
    '';

  const description =
    getMeta('og:description') ||
    getMeta('description') ||
    '';

  let prepTime = null;
  let cookTime = null;
  let serves = null;

  const prepM = html.match(/Prep\s*Time[^:]*:\s*([^<]+)/i);
  if (prepM) prepTime = stripTags(prepM[1]).replace(/\s+/g, ' ').trim();
  const cookM = html.match(/Cook\s*Time[^:]*:\s*([^<]+)/i);
  if (cookM) cookTime = stripTags(cookM[1]).replace(/\s+/g, ' ').trim();
  const serveM = html.match(/Serves[^:]*:\s*([^<]+)/i);
  if (serveM) serves = stripTags(serveM[1]).replace(/\s+/g, ' ').trim();

  // First paragraph-ish description from post body
  let bodyDesc = '';
  const moreIdx = html.indexOf('name="more"');
  const bodySlice = moreIdx > 0 ? html.slice(Math.max(0, moreIdx - 2500), moreIdx) : html;
  const paras = [...bodySlice.matchAll(/<div[^>]*separator[^>]*>[\s\S]*?<\/div>/gi)]
    .map((x) => stripTags(x[0]))
    .filter((t) => t.length > 40 && !/click here|youtube|watch/i.test(t));
  if (paras[0]) bodyDesc = paras[0].slice(0, 280);

  return {
    image: image.replace(/^http:\/\//, 'https://'),
    description: (bodyDesc || description).slice(0, 280),
    prepTime,
    cookTime,
    serves,
  };
}

function parseBasePax(serves) {
  if (!serves) return 4;
  const nums = [...String(serves).matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  if (!nums.length) return 4;
  if (nums.length >= 2) return Math.round((nums[0] + nums[1]) / 2) || 4;
  return nums[0] || 4;
}

function cookMinutes(cookTime) {
  if (!cookTime) return null;
  const t = cookTime.toLowerCase();
  let mins = 0;
  const h = t.match(/(\d+)\s*h/);
  const m = t.match(/(\d+)\s*m/);
  if (h) mins += Number(h[1]) * 60;
  if (m) mins += Number(m[1]);
  if (!h && !m) {
    const n = t.match(/(\d+)/);
    if (n) mins = Number(n[1]);
  }
  return mins || null;
}

async function fetchCatalog() {
  if (fs.existsSync(CATALOG_PATH)) {
    const cached = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    if (cached.length >= 300) {
      console.log(`Using cached catalog (${cached.length})`);
      return cached;
    }
  }

  const posts = [];
  let start = 1;
  let total = Infinity;

  while (start <= total) {
    const url = `${BASE}/feeds/posts/summary?alt=json&max-results=${PAGE_SIZE}&start-index=${start}`;
    console.log('Catalog page', start);
    const text = await fetchText(url);
    const json = JSON.parse(text);
    total = Number(json.feed?.['openSearch$totalResults']?.['$t'] || 0);
    const entries = json.feed?.entry || [];
    if (!entries.length) break;

    for (const e of entries) {
      const title = e.title?.['$t'] || 'Untitled';
      const link = (e.link || []).find((l) => l.rel === 'alternate')?.href || '';
      const labels = (e.category || []).map((c) => c.term).filter(Boolean);
      const thumb = e['media$thumbnail']?.url?.replace(/^http:\/\//, 'https://') || '';
      const published = e.published?.['$t'] || '';
      const id = e.id?.['$t'] || link;
      posts.push({
        blogId: id,
        title: decodeEntities(title).trim(),
        sourceUrl: link.replace(/^http:\/\//, 'https://'),
        labels,
        thumb,
        published,
        summary: stripTags(e.summary?.['$t'] || '').slice(0, 280),
      });
    }
    start += PAGE_SIZE;
    await sleep(DELAY_MS);
  }

  // de-dupe by URL
  const seen = new Set();
  const unique = [];
  for (const p of posts) {
    if (!p.sourceUrl || seen.has(p.sourceUrl)) continue;
    seen.add(p.sourceUrl);
    unique.push(p);
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(unique, null, 2));
  console.log(`Catalog saved: ${unique.length} / total claimed ${total}`);
  return unique;
}

async function scrapePost(post) {
  const html = await fetchText(post.sourceUrl);
  const meta = parseMeta(html);
  const ingredientsRaw = parseIngredientsFromHtml(html);
  const steps = parseStepsFromHtml(html);
  const majorSet = pickMajor(ingredientsRaw);
  const ingredients = ingredientsRaw.map((ing, idx) => {
    const item = {
      id: ingredientId(ing.name, idx),
      name: ing.name,
      amount: ing.amount ?? null,
      unit: ing.unit || 'to taste',
    };
    if (ing.scalable === false || item.amount == null) item.scalable = false;
    if (majorSet.has(idx) && item.amount != null) item.isMajor = true;
    return item;
  });

  const category = mapCategory(post.labels, post.title);
  const subcategory = mapSubcategory(post.labels);
  const basePax = parseBasePax(meta.serves);
  const description =
    meta.description ||
    post.summary ||
    `${post.title} — adapted from Steffi's Recipes.`;

  const tags = [
    ...new Set(
      [...post.labels, subcategory, category]
        .filter(Boolean)
        .map((t) => String(t).replace(/-/g, ' ').trim())
        .filter((t) => t.length > 1)
    ),
  ].slice(0, 12);

  const image = meta.image || post.thumb || '';

  return {
    id: slugify(post.title.replace(/\s*recipe\s*$/i, '')),
    title: post.title.replace(/\s*recipe\s*$/i, '').trim() || post.title,
    category,
    subcategory,
    description: paraphraseDesc(description),
    basePax,
    prepTime: meta.prepTime || null,
    cookTime: meta.cookTime || null,
    cookMinutes: cookMinutes(meta.cookTime),
    tags,
    labels: post.labels,
    image,
    sourceUrl: post.sourceUrl,
    ingredients,
    steps:
      steps.length > 0
        ? steps
        : [
            'See the original post for the full method — structured steps were not detected on this page.',
          ],
    structured: ingredients.length >= 2 && steps.length >= 1,
    published: post.published,
  };
}

function paraphraseDesc(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/Lets get started\.?/gi, '')
    .replace(/Please click here.*/gi, '')
    .trim()
    .slice(0, 260);
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function ensureUniqueIds(recipes) {
  const seen = new Map();
  for (const r of recipes) {
    let id = r.id;
    if (!seen.has(id)) {
      seen.set(id, 1);
      continue;
    }
    const n = seen.get(id) + 1;
    seen.set(id, n);
    r.id = `${id}-${n}`;
  }
  return recipes;
}

function emitJs(recipes) {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'chicken', label: 'Chicken' },
    { id: 'mutton', label: 'Mutton' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'egg', label: 'Egg' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'condiments', label: 'Condiments' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'other', label: 'Other' },
  ];

  const present = new Set(recipes.map((r) => r.category));
  const RECIPE_CATEGORIES = categories.filter((c) => c.id === 'all' || present.has(c.id));

  const header = `/**
 * Auto-generated recipe catalog adapted from steffisrecipes.com.
 * Descriptions paraphrased; ingredient amounts/methods structured from source posts.
 * Nutrition (kcal / macros) is estimated at runtime from ingredients via
 * src/utils/recipeNutrition.js + src/data/nutritionDb.js — not stored here —
 * so values recalculate when servings or major-ingredient amounts change.
 * Generated: ${new Date().toISOString()}
 * Total: ${recipes.length}
 */

export const RECIPE_CATEGORIES = ${JSON.stringify(RECIPE_CATEGORIES, null, 2)};

export const recipes = `;

  const body = JSON.stringify(recipes, null, 2);

  const footer = `;

export function getRecipeById(id) {
  return recipes.find((r) => r.id === id) ?? null;
}

export function getSubcategories(categoryId) {
  const list =
    categoryId === 'all' ? recipes : recipes.filter((r) => r.category === categoryId);
  return [...new Set(list.map((r) => r.subcategory).filter(Boolean))].sort();
}

export function getAllTags(minCount = 1) {
  const counts = new Map();
  for (const r of recipes) {
    for (const tag of r.tags || []) {
      const key = String(tag).trim();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= minCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
}
`;

  fs.writeFileSync(GENERATED_JS, header + body + footer);
}

async function main() {
  const catalog = await fetchCatalog();
  console.log(`Scraping ${catalog.length} posts…`);

  let existing = [];
  if (fs.existsSync(RECIPES_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(RECIPES_PATH, 'utf8'));
    } catch {
      existing = [];
    }
  }
  const byUrl = new Map(existing.filter((r) => r?.sourceUrl).map((r) => [r.sourceUrl, r]));

  const pending = catalog.filter((p) => {
    const prev = byUrl.get(p.sourceUrl);
    return !(prev && prev.structured);
  });
  console.log(`Pending full scrape: ${pending.length} (cached structured: ${byUrl.size})`);

  let done = 0;
  const scraped = await mapPool(pending, CONCURRENCY, async (post) => {
    try {
      await sleep(DELAY_MS);
      const recipe = await scrapePost(post);
      done++;
      if (done % 20 === 0 || done === pending.length) {
        console.log(`Progress ${done}/${pending.length}`);
      }
      return recipe;
    } catch (err) {
      console.warn('Fail', post.sourceUrl, err.message);
      return {
        id: slugify(post.title),
        title: post.title.replace(/\s*recipe\s*$/i, '').trim() || post.title,
        category: mapCategory(post.labels, post.title),
        subcategory: mapSubcategory(post.labels),
        description: post.summary || `${post.title} from Steffi's Recipes.`,
        basePax: 4,
        prepTime: null,
        cookTime: null,
        cookMinutes: null,
        tags: post.labels,
        labels: post.labels,
        image: post.thumb || '',
        sourceUrl: post.sourceUrl,
        ingredients: [],
        steps: ['Open the source recipe for full ingredients and method.'],
        structured: false,
        scrapeError: err.message,
        published: post.published,
      };
    }
  });

  for (const r of scraped) {
    if (r?.sourceUrl) byUrl.set(r.sourceUrl, r);
  }

  // Ensure catalog-only entries exist even if somehow missing
  for (const p of catalog) {
    if (!byUrl.has(p.sourceUrl)) {
      byUrl.set(p.sourceUrl, {
        id: slugify(p.title),
        title: p.title.replace(/\s*recipe\s*$/i, '').trim() || p.title,
        category: mapCategory(p.labels, p.title),
        subcategory: mapSubcategory(p.labels),
        description: p.summary || `${p.title} from Steffi's Recipes.`,
        basePax: 4,
        prepTime: null,
        cookTime: null,
        cookMinutes: null,
        tags: p.labels,
        labels: p.labels,
        image: p.thumb || '',
        sourceUrl: p.sourceUrl,
        ingredients: [],
        steps: ['Open the source recipe for full ingredients and method.'],
        structured: false,
        published: p.published,
      });
    }
  }

  let recipes = ensureUniqueIds([...byUrl.values()]);
  recipes.sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));

  fs.writeFileSync(RECIPES_PATH, JSON.stringify(recipes, null, 2));

  const structured = recipes.filter((r) => r.structured).length;
  const withImage = recipes.filter((r) => r.image).length;
  const withIngredients = recipes.filter((r) => (r.ingredients || []).length >= 2).length;

  const report = {
    totalCatalog: catalog.length,
    totalRecipes: recipes.length,
    structured,
    withIngredients,
    withImage,
    categories: Object.fromEntries(
      [...recipes.reduce((m, r) => m.set(r.category, (m.get(r.category) || 0) + 1), new Map())]
    ),
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  emitJs(recipes);
  console.log('Report', report);
  console.log('Wrote', GENERATED_JS);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
