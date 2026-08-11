/**
 * Approximate recipe nutrition from ingredients.
 * Recalculates from whatever ingredient list you pass (e.g. scaled servings).
 */
import { NUTRITION_ENTRIES, GENERIC_PER_100 } from '../data/nutritionDb.js';

const EMPTY = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

const WHOLE_UNITS = new Set([
  'pcs',
  'piece',
  'pieces',
  'nos',
  'no',
  'sprig',
  'sprigs',
  'clove',
  'cloves',
  'large',
  'small',
  'medium',
  'slice',
  'strand',
]);

function emptyMacros() {
  return { ...EMPTY };
}

function addMacros(a, b) {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

function scaleMacros(m, factor) {
  return {
    kcal: m.kcal * factor,
    protein: m.protein * factor,
    carbs: m.carbs * factor,
    fat: m.fat * factor,
  };
}

function roundMacros(m) {
  return {
    kcal: Math.round(m.kcal),
    protein: Math.round(m.protein * 10) / 10,
    carbs: Math.round(m.carbs * 10) / 10,
    fat: Math.round(m.fat * 10) / 10,
  };
}

/**
 * Parse unit strings like "/4 tsp", "/2 cup", "pinch of" into
 * { amountMultiplier, baseUnit }.
 */
export function normalizeUnitParts(unitRaw) {
  const raw = String(unitRaw || '')
    .toLowerCase()
    .replace(/\./g, '')
    .trim();

  if (!raw || raw === 'to taste' || /required|as needed|few|some|topping/.test(raw)) {
    return { amountMultiplier: 0, baseUnit: 'to taste', skip: true };
  }

  // Parenthetical grams: "(150g)", "(250 g)"
  const parenG = raw.match(/^\(?\s*(\d+(?:\.\d+)?)\s*g\s*\)?$/);
  if (parenG) {
    return { amountMultiplier: Number(parenG[1]), baseUnit: 'g_from_unit', skip: false };
  }

  // Leading fraction in unit: "/4 tsp", "/2 cup", "/8 tsp", "/2 kg"
  const fracUnit = raw.match(/^\/(\d+)\s*(.*)$/);
  if (fracUnit) {
    const denom = Number(fracUnit[1]) || 1;
    const rest = (fracUnit[2] || 'pcs').trim() || 'pcs';
    return { amountMultiplier: 1 / denom, baseUnit: rest, skip: false };
  }

  // "+2 tbsp" style junk → treat as tbsp
  const plus = raw.match(/^\+?\s*\d+\s*(tbsp|tsp|cup|g|ml)$/);
  if (plus) {
    return { amountMultiplier: 1, baseUnit: plus[1], skip: false };
  }

  if (/^pinch/.test(raw)) {
    return { amountMultiplier: 1, baseUnit: 'pinch', skip: false };
  }
  if (/hand/.test(raw)) {
    return { amountMultiplier: 1, baseUnit: 'handful', skip: false };
  }

  return { amountMultiplier: 1, baseUnit: raw, skip: false };
}

function gramsInName(name) {
  const m = String(name || '').match(/\((\d+(?:\.\d+)?)\s*g\)/i);
  return m ? Number(m[1]) : null;
}

function findEntry(name) {
  const n = String(name || '').toLowerCase();
  let best = null;
  let bestPri = -1;
  for (const entry of NUTRITION_ENTRIES) {
    if (!entry.match.test(n)) continue;
    const pri = entry.priority ?? 0;
    if (pri > bestPri) {
      best = entry;
      bestPri = pri;
    }
  }
  return best;
}

/**
 * Convert an ingredient quantity into approximate grams.
 */
export function ingredientToGrams(ing, entry) {
  if (!ing || ing.amount == null || Number(ing.amount) <= 0) return null;

  const nameG = gramsInName(ing.name);
  // "Meal maker (60 g)" with amount 1 cup → prefer explicit grams when present
  // and unit is volume/count that looks like a pack size.
  if (nameG != null && Number(ing.amount) === 1) {
    const u = String(ing.unit || '').toLowerCase();
    if (/cup|pcs|pack|packet|^$/.test(u) || u.includes('g')) {
      // If unit itself encodes grams via paren, handled below.
    }
  }

  const { amountMultiplier, baseUnit, skip } = normalizeUnitParts(ing.unit);
  if (skip) return null;

  let amount = Number(ing.amount) * amountMultiplier;
  if (!Number.isFinite(amount) || amount <= 0) return null;

  // Unit was literally "(150g)" → amount * 150 already folded into multiplier as grams
  if (baseUnit === 'g_from_unit') {
    return amount; // amountMultiplier already absolute grams * original amount
  }

  if (baseUnit === 'g' || baseUnit === 'gram' || baseUnit === 'grams' || baseUnit === 'gm') {
    return amount;
  }
  if (baseUnit === 'kg') return amount * 1000;
  if (baseUnit === 'ml') return amount; // ~water density
  if (baseUnit === 'l') return amount * 1000;

  if (baseUnit === 'tsp' || baseUnit === 'tsps') {
    // ~5 ml; density-aware if we have cup density
    if (entry?.density) return amount * (entry.density / 48);
    return amount * 5;
  }
  if (baseUnit === 'tbsp' || baseUnit === 'tbsps' || baseUnit === 'tbs') {
    if (entry?.density) return amount * (entry.density / 16);
    return amount * 15;
  }
  if (baseUnit === 'cup' || baseUnit === 'cups') {
    if (entry?.density) return amount * entry.density;
    return amount * 150;
  }
  if (baseUnit === 'pinch') return amount * 0.3;
  if (baseUnit === 'handful' || baseUnit === 'handfull') {
    return amount * (entry?.density ? entry.density * 0.25 : 30);
  }
  if (baseUnit === 'scoop') return amount * (entry?.density ? entry.density * 0.3 : 40);
  if (baseUnit === 'inch' || baseUnit.endsWith('inch')) {
    // ginger/cinnamon stick approx
    return amount * (entry?.pieceG || 8);
  }

  if (WHOLE_UNITS.has(baseUnit) || baseUnit === '/2' || baseUnit === '/4') {
    // bare "/2" as unit with amount 1 → half piece already via amountMultiplier
    if (entry?.pieceG) return amount * entry.pieceG;
    // default piece
    return amount * 50;
  }

  // Explicit grams in the name as a pack size (e.g. meal maker 60g, 1 cup)
  if (nameG != null) {
    return nameG * Math.max(amount, 1);
  }

  // Unknown unit — if name has grams use that; else light estimate from amount
  if (entry?.density && /cup/.test(baseUnit)) return amount * entry.density;
  return null;
}

function macrosFromGrams(grams, per100) {
  if (grams == null || grams <= 0) return emptyMacros();
  const f = grams / 100;
  return {
    kcal: per100.kcal * f,
    protein: per100.protein * f,
    carbs: per100.carbs * f,
    fat: per100.fat * f,
  };
}

/**
 * Estimate nutrition for a single ingredient line.
 * @returns {{ macros, grams, matched, entryKey }}
 */
export function estimateIngredientNutrition(ing) {
  if (!ing) {
    return { macros: emptyMacros(), grams: null, matched: false };
  }

  // Skip garnish-only / non-scalable taste items with no amount
  if (ing.amount == null || ing.scalable === false) {
    const unit = String(ing.unit || '').toLowerCase();
    if (!unit || unit === 'to taste' || /required|garnish/.test(String(ing.name || '').toLowerCase())) {
      return { macros: emptyMacros(), grams: null, matched: false, skipped: true };
    }
  }

  const entry = findEntry(ing.name);
  let grams = ingredientToGrams(ing, entry);

  if (grams == null || grams <= 0) {
    return { macros: emptyMacros(), grams: null, matched: Boolean(entry), skipped: true };
  }

  // Deep-fry oil lists are usually bath volume, not eaten oil — count ~15% absorbed.
  const nameLower = String(ing.name || '').toLowerCase();
  if (/fry|frying|deep\s*fry/.test(nameLower) && /oil|ghee/.test(nameLower)) {
    grams = Math.min(grams * 0.15, 40);
  }

  const per100 = entry?.per100 || GENERIC_PER_100;
  return {
    macros: macrosFromGrams(grams, per100),
    grams,
    matched: Boolean(entry),
    usedGeneric: !entry,
  };
}

/**
 * Sum macros for a list of ingredients (already scaled or base).
 * @returns {{
 *   total: {kcal, protein, carbs, fat},
 *   perServing: {kcal, protein, carbs, fat}|null,
 *   coverage: { counted, total, matched, generic },
 *   approximate: true
 * }}
 */
export function estimateRecipeNutrition(ingredients, servings = 1) {
  const list = Array.isArray(ingredients) ? ingredients : [];
  let total = emptyMacros();
  let counted = 0;
  let matched = 0;
  let generic = 0;

  for (const ing of list) {
    const est = estimateIngredientNutrition(ing);
    if (est.skipped || est.grams == null) continue;
    total = addMacros(total, est.macros);
    counted += 1;
    if (est.matched) matched += 1;
    if (est.usedGeneric) generic += 1;
  }

  const pax = Math.max(1, Number(servings) || 1);
  const hasSignal = counted > 0 && total.kcal > 0;

  return {
    total: roundMacros(total),
    perServing: hasSignal ? roundMacros(scaleMacros(total, 1 / pax)) : null,
    coverage: {
      counted,
      total: list.length,
      matched,
      generic,
    },
    approximate: true,
    available: hasSignal,
  };
}

/**
 * Scale a previously computed base nutrition by serving/ingredient factor.
 * Prefer re-running estimateRecipeNutrition on scaled ingredients when possible.
 */
export function scaleNutrition(baseTotal, factor) {
  if (!baseTotal) return null;
  return roundMacros(scaleMacros(baseTotal, factor));
}
