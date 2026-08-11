/**
 * Curated refine filters + dish-suggestion quiz helpers for Let's Cook.
 * Maps noisy Blogger labels into a short, human-friendly filter set.
 */

function recipeHay(recipe) {
  return [recipe.category, recipe.subcategory, recipe.title, ...(recipe.tags || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export const REFINE_GROUPS = [
  {
    id: 'style',
    label: 'Dish style',
    options: [
      {
        id: 'curry',
        label: 'Curry & gravy',
        test: (hay) => /curry|gravy|kulambu/.test(hay),
      },
      {
        id: 'rice',
        label: 'Rice & biryani',
        test: (hay) => /rice|biryani/.test(hay),
      },
      {
        id: 'sidedish',
        label: 'Side dishes',
        test: (hay) => /sidedish|side\s*dish/.test(hay),
      },
      {
        id: 'appetizer',
        label: 'Appetizers & fries',
        test: (hay) => /appetizer|\b65\b|roast|fry/.test(hay),
      },
      {
        id: 'baking',
        label: 'Baking & cakes',
        test: (hay) => /baking|cake/.test(hay),
      },
    ],
  },
  {
    id: 'occasion',
    label: 'Occasion',
    options: [
      { id: 'diwali', label: 'Diwali', test: (hay) => /diwali/.test(hay) },
      {
        id: 'traditional',
        label: 'Traditional',
        test: (hay) => /traditional/.test(hay),
      },
      {
        id: 'chettinad',
        label: 'Chettinad',
        test: (hay) => /chettinad/.test(hay),
      },
      { id: 'paneer', label: 'Paneer', test: (hay) => /paneer/.test(hay) },
    ],
  },
];

const OPTION_BY_ID = new Map(
  REFINE_GROUPS.flatMap((group) => group.options.map((opt) => [opt.id, opt]))
);

export function getRefineOption(id) {
  return OPTION_BY_ID.get(id) ?? null;
}

export function recipeMatchesRefine(recipe, refineIds) {
  if (!refineIds?.length) return true;
  const hay = recipeHay(recipe);
  return refineIds.every((id) => {
    const opt = OPTION_BY_ID.get(id);
    return opt ? opt.test(hay) : true;
  });
}

export function countRefineMatches(recipes, categoryId = 'all') {
  const base =
    categoryId === 'all' ? recipes : recipes.filter((r) => r.category === categoryId);
  const counts = {};
  for (const group of REFINE_GROUPS) {
    for (const opt of group.options) {
      counts[opt.id] = base.filter((r) => opt.test(recipeHay(r))).length;
    }
  }
  return counts;
}

export const QUIZ_STEPS = [
  {
    id: 'meal',
    question: 'What kind of meal?',
    options: [
      { id: 'breakfast', label: 'Breakfast' },
      { id: 'lunch', label: 'Lunch' },
      { id: 'dinner', label: 'Dinner' },
      { id: 'snack', label: 'Snack' },
      { id: 'sweet', label: 'Something sweet' },
    ],
  },
  {
    id: 'protein',
    question: 'Protein preference?',
    options: [
      { id: 'any', label: 'Anything' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'chicken', label: 'Chicken' },
      { id: 'mutton', label: 'Mutton' },
      { id: 'seafood', label: 'Seafood' },
      { id: 'egg', label: 'Egg' },
    ],
  },
  {
    id: 'time',
    question: 'How much time do you have?',
    options: [
      { id: 'any', label: 'No rush' },
      { id: 'quick', label: 'Quick (≤30 min)' },
      { id: 'normal', label: 'Normal (30–45)' },
      { id: 'long', label: 'I can take my time' },
    ],
  },
  {
    id: 'taste',
    question: 'Sweet or savory?',
    options: [
      { id: 'either', label: 'Surprise me' },
      { id: 'savory', label: 'Savory' },
      { id: 'sweet', label: 'Sweet' },
    ],
  },
];

function scoreMeal(recipe, meal) {
  const hay = recipeHay(recipe);
  const cat = recipe.category;

  switch (meal) {
    case 'breakfast':
      if (cat === 'breakfast' || /breakfast/.test(hay)) return 8;
      return 0;
    case 'snack':
      if (cat === 'snacks' || (/snack/.test(hay) && cat !== 'sweets')) return 8;
      if (/appetizer|fry|\b65\b/.test(hay)) return 4;
      return 0;
    case 'sweet':
      if (cat === 'sweets' || /sweet/.test(hay)) return 8;
      return 0;
    case 'lunch':
    case 'dinner': {
      if (['condiments', 'drinks', 'sweets', 'snacks'].includes(cat)) return 0;
      if (meal === 'dinner' && /dinner/.test(hay)) return 8;
      if (meal === 'lunch' && /lunch/.test(hay)) return 8;
      if (['vegetarian', 'chicken', 'mutton', 'seafood', 'egg', 'other'].includes(cat)) {
        return 6;
      }
      if (cat === 'breakfast') return 2;
      return 0;
    }
    default:
      return 0;
  }
}

function scoreProtein(recipe, protein) {
  if (protein === 'any') return 2;
  if (recipe.category === protein) return 8;
  if (protein === 'vegetarian') {
    if (['chicken', 'mutton', 'seafood', 'egg'].includes(recipe.category)) return -20;
    if (recipe.category === 'vegetarian') return 8;
    // Non-meat categories (sweets/snacks/breakfast/…) are allowed but weaker
    return 3;
  }
  return -20;
}

function scoreTime(recipe, time) {
  if (time === 'any') return 2;
  const mins = recipe.cookMinutes;
  if (mins == null) return 1; // soft match — most catalog entries lack structured time
  if (time === 'quick') return mins <= 30 ? 6 : mins <= 40 ? 1 : -8;
  if (time === 'normal') return mins > 25 && mins <= 50 ? 6 : mins <= 60 ? 2 : -4;
  if (time === 'long') return mins > 45 ? 6 : mins > 30 ? 2 : -4;
  return 0;
}

function scoreTaste(recipe, taste) {
  if (taste === 'either') return 2;
  const hay = recipeHay(recipe);
  const isSweet = recipe.category === 'sweets' || /sweet/.test(hay);
  if (taste === 'sweet') return isSweet ? 8 : -12;
  if (taste === 'savory') return isSweet ? -12 : 6;
  return 0;
}

function scoreRecipe(recipe, answers, mode = 'strict') {
  let score = 1;
  const meal = scoreMeal(recipe, answers.meal);
  const protein = scoreProtein(recipe, answers.protein);
  const time = scoreTime(recipe, answers.time);
  const taste = scoreTaste(recipe, answers.taste);

  if (mode === 'strict') {
    // Require a real meal match — soft zeros must not leak sweets into breakfast, etc.
    if (meal < 4 || protein < 0 || taste < 0) return -1;
    if (answers.time !== 'any' && time < 0) return -1;
    score += meal + protein + time + taste;
  } else if (mode === 'relaxed') {
    // Keep meal signal but allow weaker matches; drop hard protein/taste fails
    if (meal <= 0 || protein < -10) return -1;
    if (taste < -10 && answers.taste !== 'either') return -1;
    score += meal + Math.max(protein, 0) + Math.max(time, 0) + Math.max(taste, 0);
  } else {
    // broad: protein preference + soft meal preference
    if (answers.protein !== 'any' && protein < -10) return -1;
    score += Math.max(meal, 0) + Math.max(protein, 1) + 1;
  }

  // Slight boost for structured recipes (better detail when opened)
  if (recipe.structured) score += 1;
  if (recipe.image) score += 0.5;
  return score;
}

function pickWeighted(scored, count) {
  const pool = scored.map((s) => ({ ...s }));
  const picked = [];

  while (picked.length < count && pool.length) {
    const total = pool.reduce((sum, item) => sum + Math.max(item.score, 0.1), 0);
    let roll = Math.random() * total;
    let index = 0;
    for (; index < pool.length; index += 1) {
      roll -= Math.max(pool[index].score, 0.1);
      if (roll <= 0) break;
    }
    index = Math.min(index, pool.length - 1);
    picked.push(pool[index].recipe);
    pool.splice(index, 1);
  }

  return picked;
}

/**
 * Pick up to `count` recipes matching quiz answers.
 * Uses weighted random among matches; widens criteria if needed.
 */
export function suggestDishes(catalog, answers, count = 3, excludeIds = []) {
  const exclude = new Set(excludeIds);
  const candidates = catalog.filter((r) => !exclude.has(r.id));

  const modes = ['strict', 'relaxed', 'broad'];
  for (const mode of modes) {
    const scored = candidates
      .map((recipe) => ({ recipe, score: scoreRecipe(recipe, answers, mode) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length >= count || mode === 'broad') {
      return pickWeighted(scored.slice(0, Math.max(scored.length, count)), count);
    }
  }

  return [];
}
