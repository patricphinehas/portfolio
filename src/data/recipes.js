/**
 * Recipe catalog for Let's Cook.
 * Full dataset is generated from steffisrecipes.com via scripts/scrape-steffi-recipes.mjs
 * Approximate macros/calories are computed at runtime from ingredients
 * (see src/utils/recipeNutrition.js) and scale with serving/ingredient changes.
 */
export {
  RECIPE_CATEGORIES,
  recipes,
  getRecipeById,
  getSubcategories,
  getAllTags,
} from './recipes.generated.js';
