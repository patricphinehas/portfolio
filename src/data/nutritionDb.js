/**
 * Approximate nutrition per 100g (edible portion).
 * Values are rough cookbook/USDA-style averages for Indian home cooking —
 * not lab-accurate. Used only for ballpark macros in Let's Cook.
 *
 * Each entry: { match, priority?, per100: { kcal, protein, carbs, fat },
 *   density?: grams per cup (optional), pieceG?: grams per piece }
 */
export const NUTRITION_ENTRIES = [
  // Oils & fats (high priority — match before generic)
  { match: /ghee|clarified\s*butter/, priority: 20, per100: { kcal: 900, protein: 0, carbs: 0, fat: 100 }, density: 220 },
  { match: /butter(?!\s*milk)/, priority: 18, per100: { kcal: 717, protein: 0.9, carbs: 0.1, fat: 81 }, density: 227, pieceG: 14 },
  {
    match: /cooking\s*oil|oil\s*for|sunflower|sesame\s*oil|gingelly|coconut\s*oil|mustard\s*oil|vegetable\s*oil|olive\s*oil|\boil\b/,
    priority: 18,
    per100: { kcal: 884, protein: 0, carbs: 0, fat: 100 },
    density: 218,
  },

  // Proteins — meat / seafood / egg / dairy / soy
  { match: /chicken\s*(breast|thigh|leg|curry\s*cut|with\s*bone|boneless|pieces?|meat)?|broiler/, priority: 15, per100: { kcal: 165, protein: 31, carbs: 0, fat: 3.6 }, pieceG: 100 },
  { match: /\bmutton\b|\blamb\b|\bgoat\b/, priority: 15, per100: { kcal: 215, protein: 25, carbs: 0, fat: 12 }, pieceG: 100 },
  { match: /\bprawn|\bshrimp|\bcrab\b|\bfish\b|\bkane?\b|\bvanjaram\b|\bsalmon\b|\btuna\b/, priority: 15, per100: { kcal: 100, protein: 20, carbs: 0, fat: 2 }, pieceG: 60 },
  { match: /\beggs?\b/, priority: 15, per100: { kcal: 155, protein: 13, carbs: 1.1, fat: 11 }, pieceG: 50 },
  { match: /\bpaneer\b|cottage\s*cheese/, priority: 15, per100: { kcal: 265, protein: 18, carbs: 1.2, fat: 21 }, density: 220, pieceG: 50 },
  { match: /meal\s*maker|soya\s*chunk|soy\s*chunk|textured\s*soy|tvp/, priority: 16, per100: { kcal: 345, protein: 52, carbs: 33, fat: 0.5 }, density: 80 },
  { match: /\btofu\b/, priority: 14, per100: { kcal: 76, protein: 8, carbs: 1.9, fat: 4.8 }, density: 250 },
  { match: /\bcurd\b|\byogurt\b|\byoghurt\b/, priority: 14, per100: { kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3 }, density: 245 },
  { match: /\bcream\b|whipping/, priority: 14, per100: { kcal: 340, protein: 2, carbs: 3, fat: 36 }, density: 240 },
  { match: /\bcheese\b|cheddar|mozarella|mozzarella/, priority: 14, per100: { kcal: 350, protein: 22, carbs: 2, fat: 28 }, density: 110, pieceG: 28 },
  { match: /\bmilk\b(?!.*powder)|fresh\s*milk/, priority: 12, per100: { kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3 }, density: 244 },
  { match: /milk\s*powder|dairy\s*whitener/, priority: 14, per100: { kcal: 496, protein: 26, carbs: 38, fat: 27 }, density: 120 },
  { match: /condensed\s*milk/, priority: 14, per100: { kcal: 321, protein: 7.9, carbs: 54, fat: 8.7 }, density: 306 },
  { match: /evaporated\s*milk/, priority: 14, per100: { kcal: 134, protein: 6.8, carbs: 10, fat: 7.6 }, density: 252 },
  { match: /coconut\s*milk/, priority: 14, per100: { kcal: 180, protein: 1.8, carbs: 3, fat: 18 }, density: 240 },

  // Pulses & legumes
  { match: /toor\s*dal|thuvaram|arhar|pigeon\s*pea/, priority: 14, per100: { kcal: 343, protein: 22, carbs: 63, fat: 1.5 }, density: 200 },
  { match: /moong\s*dal|pasiparuppu|green\s*gram\s*dal/, priority: 14, per100: { kcal: 347, protein: 24, carbs: 59, fat: 1.2 }, density: 200 },
  { match: /urad\s*dal|ulunthu|black\s*gram/, priority: 14, per100: { kcal: 341, protein: 25, carbs: 59, fat: 1.6 }, density: 200 },
  { match: /channa\s*dal|chana\s*dal|kadalai\s*paruppu|bengal\s*gram\s*dal/, priority: 14, per100: { kcal: 364, protein: 22, carbs: 61, fat: 5.3 }, density: 200 },
  { match: /masoor|red\s*lentil/, priority: 14, per100: { kcal: 352, protein: 25, carbs: 60, fat: 1.1 }, density: 200 },
  { match: /\bdal\b|\bdhal\b|\bparuppu\b|\blentil/, priority: 10, per100: { kcal: 350, protein: 22, carbs: 60, fat: 1.5 }, density: 200 },
  { match: /chickpea|channa(?!\s*dal)|kabuli|kondakadalai|garbanzo/, priority: 14, per100: { kcal: 364, protein: 19, carbs: 61, fat: 6 }, density: 200 },
  { match: /\brasam\s*powder|\bsambar\s*powder/, priority: 8, per100: { kcal: 320, protein: 12, carbs: 50, fat: 8 }, density: 100 },
  { match: /green\s*peas|frozen\s*peas|\bpeas\b/, priority: 12, per100: { kcal: 81, protein: 5.4, carbs: 14, fat: 0.4 }, density: 160 },
  { match: /\bbeans\b|french\s*beans|cluster\s*beans|broad\s*beans/, priority: 12, per100: { kcal: 31, protein: 1.8, carbs: 7, fat: 0.1 }, density: 110 },
  { match: /rajma|kidney\s*bean/, priority: 14, per100: { kcal: 333, protein: 24, carbs: 60, fat: 0.8 }, density: 185 },

  // Flours & grains
  { match: /besan|gram\s*flour|chickpea\s*flour|kadalai\s*maavu/, priority: 14, per100: { kcal: 387, protein: 22, carbs: 58, fat: 6.7 }, density: 120 },
  { match: /rice\s*flour|arisi\s*maavu/, priority: 14, per100: { kcal: 366, protein: 6, carbs: 80, fat: 0.5 }, density: 160 },
  { match: /wheat\s*flour|atta|whole\s*wheat/, priority: 14, per100: { kcal: 340, protein: 13, carbs: 72, fat: 1.5 }, density: 120 },
  { match: /all\s*purpose|maida|\bflour\b(?!.*rice)/, priority: 12, per100: { kcal: 364, protein: 10, carbs: 76, fat: 1 }, density: 125 },
  { match: /corn\s*flour|cornstarch|corn\s*starch/, priority: 14, per100: { kcal: 381, protein: 0.3, carbs: 91, fat: 0.1 }, density: 130 },
  { match: /\brava\b|sooji|semolina/, priority: 14, per100: { kcal: 360, protein: 13, carbs: 73, fat: 1.1 }, density: 170 },
  { match: /oats|oatmeal/, priority: 14, per100: { kcal: 389, protein: 17, carbs: 66, fat: 7 }, density: 90 },
  { match: /basmati|cooked\s*rice|\brice\b(?!\s*flour)/, priority: 12, per100: { kcal: 360, protein: 7, carbs: 79, fat: 0.6 }, density: 185 },
  { match: /\bread\b|bun|pav/, priority: 12, per100: { kcal: 265, protein: 9, carbs: 49, fat: 3.2 }, pieceG: 30, density: 120 },
  { match: /idli|dosa\s*batter|batter/, priority: 10, per100: { kcal: 120, protein: 4, carbs: 24, fat: 0.5 }, density: 240 },
  { match: /poha|aval|beaten\s*rice/, priority: 14, per100: { kcal: 350, protein: 6.5, carbs: 77, fat: 1 }, density: 100 },
  { match: /vermicelli|semiya/, priority: 14, per100: { kcal: 352, protein: 10, carbs: 75, fat: 0.5 }, density: 100 },
  { match: /quinoa/, priority: 14, per100: { kcal: 368, protein: 14, carbs: 64, fat: 6 }, density: 170 },

  // Nuts & seeds
  { match: /cashew|mundhiri/, priority: 14, per100: { kcal: 553, protein: 18, carbs: 30, fat: 44 }, density: 140, pieceG: 5 },
  { match: /almond|badam/, priority: 14, per100: { kcal: 579, protein: 21, carbs: 22, fat: 50 }, density: 140, pieceG: 1.2 },
  { match: /peanut|groundnut|verkadalai/, priority: 14, per100: { kcal: 567, protein: 26, carbs: 16, fat: 49 }, density: 150 },
  { match: /pistachio/, priority: 14, per100: { kcal: 560, protein: 20, carbs: 28, fat: 45 }, density: 120 },
  { match: /walnut/, priority: 14, per100: { kcal: 654, protein: 15, carbs: 14, fat: 65 }, density: 120 },
  { match: /raisin|kishmish|dry\s*grape/, priority: 14, per100: { kcal: 299, protein: 3.1, carbs: 79, fat: 0.5 }, density: 145 },
  { match: /sesame\s*seed|ellu|til\b/, priority: 14, per100: { kcal: 573, protein: 17, carbs: 23, fat: 50 }, density: 140 },
  { match: /poppy\s*seed|khus\s*khus/, priority: 14, per100: { kcal: 525, protein: 18, carbs: 28, fat: 42 }, density: 140 },
  { match: /mustard\s*seed/, priority: 12, per100: { kcal: 508, protein: 26, carbs: 28, fat: 36 }, density: 160 },
  { match: /cumin\s*seed|jeera/, priority: 12, per100: { kcal: 375, protein: 18, carbs: 44, fat: 22 }, density: 100 },
  { match: /fennel\s*seed|sombu|saunf/, priority: 12, per100: { kcal: 345, protein: 16, carbs: 52, fat: 15 }, density: 100 },
  { match: /fenugreek\s*seed|vendhayam|methi\s*seed/, priority: 12, per100: { kcal: 323, protein: 23, carbs: 58, fat: 6.4 }, density: 120 },
  { match: /flax|alsi/, priority: 12, per100: { kcal: 534, protein: 18, carbs: 29, fat: 42 }, density: 140 },
  { match: /chia/, priority: 12, per100: { kcal: 486, protein: 17, carbs: 42, fat: 31 }, density: 160 },

  // Coconut
  { match: /grated\s*coconut|fresh\s*coconut|coconut\s*scrap/, priority: 14, per100: { kcal: 354, protein: 3.3, carbs: 15, fat: 33 }, density: 80 },
  { match: /desiccated\s*coconut|dry\s*coconut/, priority: 14, per100: { kcal: 660, protein: 6.9, carbs: 24, fat: 65 }, density: 90 },
  { match: /\bcoconut\b(?!\s*(oil|milk))/, priority: 10, per100: { kcal: 354, protein: 3.3, carbs: 15, fat: 33 }, density: 80 },

  // Sweeteners
  { match: /jaggery|vellam|gur\b/, priority: 14, per100: { kcal: 383, protein: 0.4, carbs: 98, fat: 0.1 }, density: 220 },
  { match: /\bsugar\b|caster|icing\s*sugar|powdered\s*sugar/, priority: 14, per100: { kcal: 387, protein: 0, carbs: 100, fat: 0 }, density: 200 },
  { match: /honey/, priority: 14, per100: { kcal: 304, protein: 0.3, carbs: 82, fat: 0 }, density: 340 },
  { match: /maple\s*syrup|sugar\s*syrup|syrup/, priority: 12, per100: { kcal: 260, protein: 0, carbs: 67, fat: 0 }, density: 320 },
  { match: /chocolate|cocoa/, priority: 12, per100: { kcal: 500, protein: 8, carbs: 45, fat: 35 }, density: 100 },

  // Vegetables
  { match: /\bonions?\b|shallot|chinna\s*vengayam|sambar\s*onion/, priority: 12, per100: { kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1 }, density: 160, pieceG: 110 },
  { match: /\btomatoes?\b/, priority: 12, per100: { kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }, density: 180, pieceG: 120 },
  { match: /potato|urulai/, priority: 12, per100: { kcal: 77, protein: 2, carbs: 17, fat: 0.1 }, density: 150, pieceG: 150 },
  { match: /carrot/, priority: 12, per100: { kcal: 41, protein: 0.9, carbs: 10, fat: 0.2 }, density: 130, pieceG: 60 },
  { match: /capsicum|bell\s*pepper|shimla/, priority: 12, per100: { kcal: 31, protein: 1, carbs: 6, fat: 0.3 }, density: 150, pieceG: 120 },
  { match: /cauliflower|gobi/, priority: 12, per100: { kcal: 25, protein: 1.9, carbs: 5, fat: 0.3 }, density: 100 },
  { match: /cabbage/, priority: 12, per100: { kcal: 25, protein: 1.3, carbs: 6, fat: 0.1 }, density: 90 },
  { match: /spinach|palak|keerai/, priority: 12, per100: { kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4 }, density: 30 },
  { match: /brinjal|eggplant|aubergine|kathirikai/, priority: 12, per100: { kcal: 25, protein: 1, carbs: 6, fat: 0.2 }, density: 100, pieceG: 200 },
  { match: /lad(?:y|ies)?\s*finger|okra|vendakkai/, priority: 12, per100: { kcal: 33, protein: 1.9, carbs: 7, fat: 0.2 }, density: 100 },
  { match: /drumstick|murungakkai/, priority: 12, per100: { kcal: 37, protein: 2.1, carbs: 8.5, fat: 0.2 }, pieceG: 40 },
  { match: /mushroom/, priority: 12, per100: { kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3 }, density: 70 },
  { match: /ginger(?!\s*garlic)/, priority: 12, per100: { kcal: 80, protein: 1.8, carbs: 18, fat: 0.8 }, density: 100, pieceG: 15 },
  { match: /garlic/, priority: 12, per100: { kcal: 149, protein: 6.4, carbs: 33, fat: 0.5 }, density: 140, pieceG: 3 },
  { match: /ginger\s*garlic\s*paste/, priority: 16, per100: { kcal: 100, protein: 3, carbs: 20, fat: 0.6 }, density: 240 },
  { match: /green\s*chil|green\s*chilli|hari\s*mirch/, priority: 12, per100: { kcal: 40, protein: 2, carbs: 9, fat: 0.2 }, pieceG: 5 },
  { match: /curry\s*leaves/, priority: 8, per100: { kcal: 108, protein: 6, carbs: 18, fat: 1 }, pieceG: 1 },
  { match: /coriander\s*leaves|cilantro|kothamalli/, priority: 10, per100: { kcal: 23, protein: 2.1, carbs: 3.7, fat: 0.5 }, density: 40 },
  { match: /mint\s*leaves|\bmint\b|pudina/, priority: 10, per100: { kcal: 44, protein: 3.3, carbs: 8, fat: 0.7 }, density: 40 },
  { match: /lemon|lime/, priority: 12, per100: { kcal: 29, protein: 1.1, carbs: 9, fat: 0.3 }, pieceG: 60, density: 240 },
  { match: /tamarind|puli/, priority: 12, per100: { kcal: 239, protein: 2.8, carbs: 63, fat: 0.6 }, density: 200 },
  { match: /cucumber/, priority: 12, per100: { kcal: 15, protein: 0.7, carbs: 3.6, fat: 0.1 }, pieceG: 200 },
  { match: /beetroot|beet\b/, priority: 12, per100: { kcal: 43, protein: 1.6, carbs: 10, fat: 0.2 }, pieceG: 150 },
  { match: /sweet\s*potato/, priority: 12, per100: { kcal: 86, protein: 1.6, carbs: 20, fat: 0.1 }, pieceG: 130 },
  { match: /corn\b|sweet\s*corn/, priority: 12, per100: { kcal: 86, protein: 3.3, carbs: 19, fat: 1.2 }, density: 165 },
  { match: /avocado/, priority: 12, per100: { kcal: 160, protein: 2, carbs: 9, fat: 15 }, pieceG: 150 },
  { match: /banana/, priority: 12, per100: { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 }, pieceG: 120 },
  { match: /mango/, priority: 12, per100: { kcal: 60, protein: 0.8, carbs: 15, fat: 0.4 }, pieceG: 200 },
  { match: /apple/, priority: 12, per100: { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 }, pieceG: 180 },
  { match: /pineapple/, priority: 12, per100: { kcal: 50, protein: 0.5, carbs: 13, fat: 0.1 }, density: 165 },
  { match: /pumpkin|poosanikai/, priority: 12, per100: { kcal: 26, protein: 1, carbs: 7, fat: 0.1 }, density: 120 },
  { match: /bottle\s*gourd|sorakkai|lauki/, priority: 12, per100: { kcal: 14, protein: 0.6, carbs: 3.4, fat: 0 }, density: 120 },
  { match: /ridge\s*gourd|peerkangai/, priority: 12, per100: { kcal: 17, protein: 0.8, carbs: 3.5, fat: 0.1 }, density: 120 },
  { match: /snake\s*gourd/, priority: 12, per100: { kcal: 18, protein: 0.6, carbs: 4, fat: 0.1 }, density: 120 },
  { match: /raw\s*banana|plantain|vazhakkai/, priority: 12, per100: { kcal: 122, protein: 1.3, carbs: 32, fat: 0.4 }, pieceG: 150 },
  { match: /yam|senai/, priority: 12, per100: { kcal: 118, protein: 1.5, carbs: 28, fat: 0.2 }, density: 150 },
  { match: /colocasia|sepankizhangu|arbi/, priority: 12, per100: { kcal: 112, protein: 1.5, carbs: 26, fat: 0.2 }, pieceG: 80 },

  // Spices / powders (small amounts)
  { match: /turmeric/, priority: 10, per100: { kcal: 312, protein: 10, carbs: 67, fat: 3.3 }, density: 100 },
  { match: /chili\s*powder|chilli\s*powder|kashmiri|red\s*chili|red\s*chilli|dry\s*red/, priority: 10, per100: { kcal: 282, protein: 12, carbs: 50, fat: 14 }, density: 100, pieceG: 2 },
  { match: /coriander\s*powder|dhania/, priority: 10, per100: { kcal: 298, protein: 12, carbs: 55, fat: 18 }, density: 100 },
  { match: /cumin\s*powder/, priority: 10, per100: { kcal: 375, protein: 18, carbs: 44, fat: 22 }, density: 100 },
  { match: /garam\s*masala/, priority: 10, per100: { kcal: 320, protein: 12, carbs: 50, fat: 12 }, density: 100 },
  { match: /pepper\s*powder|black\s*pepper|pepper\s*corn/, priority: 10, per100: { kcal: 251, protein: 10, carbs: 64, fat: 3.3 }, density: 100, pieceG: 0.3 },
  { match: /cardamom/, priority: 10, per100: { kcal: 311, protein: 11, carbs: 68, fat: 6.7 }, pieceG: 0.5 },
  { match: /cinnamon/, priority: 10, per100: { kcal: 247, protein: 4, carbs: 81, fat: 1.2 }, pieceG: 2 },
  { match: /\bcloves?\b/, priority: 10, per100: { kcal: 274, protein: 6, carbs: 66, fat: 13 }, pieceG: 0.1 },
  { match: /asafoetida|\bhing\b/, priority: 10, per100: { kcal: 297, protein: 4, carbs: 68, fat: 1 }, density: 100 },
  { match: /bay\s*leaf/, priority: 8, per100: { kcal: 313, protein: 8, carbs: 75, fat: 8 }, pieceG: 0.6 },
  { match: /saffron/, priority: 8, per100: { kcal: 310, protein: 11, carbs: 65, fat: 6 }, pieceG: 0.05 },
  { match: /vanilla/, priority: 8, per100: { kcal: 288, protein: 0.1, carbs: 13, fat: 0.1 }, density: 208 },
  { match: /baking\s*(soda|powder)/, priority: 8, per100: { kcal: 0, protein: 0, carbs: 0, fat: 0 }, density: 220 },
  { match: /yeast/, priority: 8, per100: { kcal: 325, protein: 40, carbs: 41, fat: 8 }, density: 150 },

  // Sauces & condiments
  { match: /soy\s*sauce|soya\s*sauce/, priority: 12, per100: { kcal: 53, protein: 8, carbs: 5, fat: 0 }, density: 255 },
  { match: /tomato\s*(sauce|ketchup|puree|paste)/, priority: 12, per100: { kcal: 82, protein: 1.5, carbs: 19, fat: 0.2 }, density: 245 },
  { match: /vinegar/, priority: 10, per100: { kcal: 18, protein: 0, carbs: 0.9, fat: 0 }, density: 240 },
  { match: /mayonnaise|mayo/, priority: 12, per100: { kcal: 680, protein: 1, carbs: 1, fat: 75 }, density: 220 },
  { match: /pickle|oorugai/, priority: 10, per100: { kcal: 120, protein: 1, carbs: 10, fat: 8 }, density: 200 },
  { match: /chutney/, priority: 8, per100: { kcal: 150, protein: 3, carbs: 15, fat: 8 }, density: 240 },

  // Zero / negligible
  { match: /\bwater\b|ice\s*cube/, priority: 20, per100: { kcal: 0, protein: 0, carbs: 0, fat: 0 }, density: 240 },
  { match: /\bsalt\b/, priority: 20, per100: { kcal: 0, protein: 0, carbs: 0, fat: 0 }, density: 280 },
];

/** Fallback for unmatched measurable ingredients (generic cooked mix). */
export const GENERIC_PER_100 = { kcal: 120, protein: 4, carbs: 15, fat: 4 };
