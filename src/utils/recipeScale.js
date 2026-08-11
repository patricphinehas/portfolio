/**
 * Recipe scaling helpers.
 * Relation: every ingredient amount scales by the same factor.
 *   factor = newPax / basePax
 *   OR factor = newMajorAmount / baseMajorAmount  → effectivePax = basePax * factor
 */

const WHOLE_UNITS = new Set(['pcs', 'piece', 'pieces', 'nos', 'no', 'sprig', 'sprigs', 'clove', 'cloves']);

/**
 * Round scaled amounts so the UI stays cook-friendly.
 */
export function roundAmount(amount, unit = '') {
  if (amount == null || Number.isNaN(Number(amount))) return amount;
  const n = Number(amount);
  const u = String(unit).toLowerCase().trim();

  if (WHOLE_UNITS.has(u)) {
    return Math.max(1, Math.round(n));
  }

  if (u === 'g' || u === 'ml' || u === 'kg' || u === 'l') {
    if (n >= 50) return Math.round(n);
    if (n >= 10) return Math.round(n * 2) / 2;
    return Math.round(n * 10) / 10;
  }

  // tsp, tbsp, cup, pinch, etc.
  if (n >= 10) return Math.round(n * 2) / 2;
  if (n >= 1) return Math.round(n * 10) / 10;
  return Math.round(n * 100) / 100;
}

function applyFactor(ingredients, factor) {
  return ingredients.map((ing) => {
    if (ing.amount == null || ing.scalable === false) {
      return { ...ing };
    }
    return {
      ...ing,
      amount: roundAmount(ing.amount * factor, ing.unit),
    };
  });
}

/**
 * Scale all ingredients by servings (pax).
 * @returns {{ pax: number, factor: number, ingredients: Array }}
 */
export function scaleByPax(recipe, newPax) {
  const pax = Math.max(1, Number(newPax) || recipe.basePax);
  const factor = pax / recipe.basePax;
  return {
    pax,
    factor,
    ingredients: applyFactor(recipe.ingredients, factor),
  };
}

/**
 * Scale everything from a major ingredient's new amount.
 * factor = newAmount / baseAmount → effective pax = basePax * factor
 * @returns {{ pax: number, factor: number, ingredients: Array }}
 */
export function scaleByMajorIngredient(recipe, ingredientIdOrName, newAmount) {
  const base = recipe.ingredients.find(
    (ing) =>
      ing.id === ingredientIdOrName ||
      ing.name.toLowerCase() === String(ingredientIdOrName).toLowerCase()
  );

  if (!base || base.amount == null || base.amount === 0) {
    return scaleByPax(recipe, recipe.basePax);
  }

  const amount = Math.max(0.01, Number(newAmount) || base.amount);
  const factor = amount / base.amount;
  const pax = roundAmount(recipe.basePax * factor, 'pcs');

  return {
    pax: Math.max(1, pax),
    factor,
    ingredients: applyFactor(recipe.ingredients, factor),
  };
}

export function formatAmount(amount, unit) {
  if (amount == null) return unit || 'to taste';
  const rounded = roundAmount(amount, unit);
  if (!unit || unit === 'to taste') return String(rounded);
  return `${rounded} ${unit}`;
}
