import React, { useMemo, useState, useEffect, useDeferredValue, useId } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Dices,
  ExternalLink,
  Minus,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { RECIPE_CATEGORIES, recipes } from '../data/recipes';
import { scaleByPax, scaleByMajorIngredient, formatAmount } from '../utils/recipeScale';
import { estimateRecipeNutrition } from '../utils/recipeNutrition';
import {
  REFINE_GROUPS,
  QUIZ_STEPS,
  countRefineMatches,
  getRefineOption,
  recipeMatchesRefine,
  suggestDishes,
} from '../utils/letsCookFilters';
import Seo from '../components/Seo';

/** Deep link for a recipe: `/lets-cook?recipe={id}` (same as openRecipe / Seo path). */
function recipePageUrl(recipeId) {
  if (typeof window === 'undefined') return `/lets-cook?recipe=${recipeId}`;
  const url = new URL('/lets-cook', window.location.origin);
  url.searchParams.set('recipe', recipeId);
  return url.toString();
}

/** WhatsApp click-to-chat body using currently displayed (scaled) amounts. */
function buildWhatsAppRecipeMessage({ title, pax, ingredients, pageUrl }) {
  const lines = [`Recipe: ${title}`, `Pax: ${pax}`, ''];

  if (ingredients?.length) {
    lines.push('Ingredients:');
    for (const ing of ingredients) {
      lines.push(`- ${formatAmount(ing.amount, ing.unit)} ${ing.name}`.replace(/\s+/g, ' ').trim());
    }
    lines.push('');
  }

  lines.push(pageUrl);
  return lines.join('\n');
}

function MacroStat({ label, value, unit = '' }) {
  return (
    <div className="min-w-0 text-center">
      <p className="text-base font-bold tabular-nums text-slate-900">
        {value}
        {unit ? <span className="text-[10px] font-semibold text-gray-400"> {unit}</span> : null}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</p>
    </div>
  );
}

/** Base kcal/serving for list cards (cached per recipe id). */
const baseKcalCache = new Map();
function approxKcalPerServing(recipe) {
  if (!recipe?.id) return null;
  if (baseKcalCache.has(recipe.id)) return baseKcalCache.get(recipe.id);
  const n = estimateRecipeNutrition(recipe.ingredients || [], recipe.basePax || 1);
  const kcal = n.available && n.perServing ? n.perServing.kcal : null;
  baseKcalCache.set(recipe.id, kcal);
  return kcal;
}

const PAGE_SIZE = 24;

function RecipeImage({ src, alt, className, fallbackClassName = '' }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-50 via-slate-100 to-amber-50 ${fallbackClassName || className}`}
        aria-hidden
      >
        <UtensilsCrossed className="text-indigo-300" size={36} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

const emptyQuizAnswers = () => ({
  meal: null,
  protein: null,
  time: null,
  taste: null,
});

const LetsCook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('recipe');
  const refinePanelId = useId();

  const [category, setCategory] = useState('all');
  const [refineIds, setRefineIds] = useState([]);
  const [refineOpen, setRefineOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [pax, setPax] = useState(4);
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const [scaleSource, setScaleSource] = useState('pax');

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(emptyQuizAnswers);
  const [suggestions, setSuggestions] = useState(null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const selectedRecipe = useMemo(
    () => recipes.find((r) => r.id === selectedId) ?? null,
    [selectedId]
  );

  const refineCounts = useMemo(
    () => countRefineMatches(recipes, category),
    [category]
  );

  const filtered = useMemo(() => {
    const q = deferredQuery;
    let list = recipes.filter((r) => {
      const catOk = category === 'all' || r.category === category;
      if (!catOk || !recipeMatchesRefine(r, refineIds)) return false;
      if (!q) return true;

      const hay = [
        r.title,
        r.description,
        r.category,
        r.subcategory,
        ...(r.tags || []),
        ...(r.ingredients || []).map((i) => i.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });

    list = [...list];
    if (sort === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'cook') {
      list.sort((a, b) => (a.cookMinutes ?? 9999) - (b.cookMinutes ?? 9999));
    } else {
      list.sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));
    }
    return list;
  }, [category, refineIds, deferredQuery, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  useEffect(() => {
    setPage(1);
  }, [category, refineIds, deferredQuery, sort]);

  useEffect(() => {
    if (!selectedRecipe) return;
    const ings = selectedRecipe.ingredients || [];
    if (!ings.length) {
      setScaledIngredients([]);
      setPax(selectedRecipe.basePax || 4);
      setScaleSource('pax');
      return;
    }
    const result = scaleByPax(selectedRecipe, selectedRecipe.basePax);
    setPax(result.pax);
    setScaledIngredients(result.ingredients);
    setScaleSource('pax');
  }, [selectedRecipe]);

  // Reset window scroll on route enter and when opening/closing a recipe.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedId]);

  useEffect(() => {
    if (!quizOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setQuizOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [quizOpen]);

  const openRecipe = (id) => {
    setQuizOpen(false);
    setSearchParams({ recipe: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeRecipe = () => {
    setSearchParams({});
  };

  const handlePaxChange = (next) => {
    if (!selectedRecipe?.ingredients?.length) return;
    const value = Math.max(1, Math.min(24, next));
    const result = scaleByPax(selectedRecipe, value);
    setPax(result.pax);
    setScaledIngredients(result.ingredients);
    setScaleSource('pax');
  };

  const handleMajorChange = (ingredientId, rawValue) => {
    if (!selectedRecipe?.ingredients?.length) return;
    const num = Number(rawValue);
    if (!Number.isFinite(num) || num <= 0) return;
    const result = scaleByMajorIngredient(selectedRecipe, ingredientId, num);
    setPax(result.pax);
    setScaledIngredients(result.ingredients);
    setScaleSource('major');
  };

  const toggleRefine = (id) => {
    setRefineIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setCategory('all');
    setRefineIds([]);
    setQuery('');
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilters =
    category !== 'all' ||
    refineIds.length > 0 ||
    query.trim().length > 0 ||
    sort !== 'newest';

  const openQuiz = () => {
    setQuizAnswers(emptyQuizAnswers());
    setQuizStep(0);
    setSuggestions(null);
    setQuizOpen(true);
  };

  const closeQuiz = () => setQuizOpen(false);

  const selectQuizOption = (stepId, optionId) => {
    const nextAnswers = { ...quizAnswers, [stepId]: optionId };
    setQuizAnswers(nextAnswers);

    if (quizStep < QUIZ_STEPS.length - 1) {
      setQuizStep((s) => s + 1);
      return;
    }

    setSuggestions(suggestDishes(recipes, nextAnswers, 3));
  };

  const shuffleSuggestions = () => {
    if (!quizAnswers.meal) return;
    const exclude = (suggestions || []).map((r) => r.id);
    const next = suggestDishes(recipes, quizAnswers, 3, exclude);
    setSuggestions(next.length ? next : suggestDishes(recipes, quizAnswers, 3));
  };

  const restartQuiz = () => {
    setQuizAnswers(emptyQuizAnswers());
    setQuizStep(0);
    setSuggestions(null);
  };

  const canScale = (selectedRecipe?.ingredients || []).length > 0;
  const currentQuizStep = QUIZ_STEPS[quizStep];

  const scaledNutrition = useMemo(() => {
    if (!canScale || !scaledIngredients.length) return null;
    return estimateRecipeNutrition(scaledIngredients, pax);
  }, [canScale, scaledIngredients, pax]);

  const shareRecipeOnWhatsApp = () => {
    if (!selectedRecipe) return;
    const pageUrl = recipePageUrl(selectedRecipe.id);
    const message = buildWhatsAppRecipeMessage({
      title: selectedRecipe.title,
      pax: canScale ? pax : selectedRecipe.basePax,
      ingredients: canScale ? scaledIngredients : [],
      pageUrl,
    });
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen text-slate-800 selection:bg-indigo-500/20">
      <Seo
        title={
          selectedRecipe
            ? `${selectedRecipe.title} — Let's Cook`
            : "Let's Cook — Recipe Scaler"
        }
        description={
          selectedRecipe?.description ||
          "Browse hundreds of recipes adapted from Steffi Akka', tribute to the master of bachelor cooking — then scale ingredients by servings or a major ingredient."
        }
        path={selectedRecipe ? `/lets-cook?recipe=${selectedRecipe.id}` : '/lets-cook'}
        noindex
      />

      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 max-w-6xl py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to portfolio
          </Link>
          <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ChefHat className="text-indigo-500" size={22} />
            Let&apos;s Cook
          </span>
          <a
            href="https://www.steffisrecipes.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-xs text-gray-500 hover:text-indigo-600 transition-colors"
          >
            recipes; redesigned with Love for art
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-10 md:py-14">
        <AnimatePresence mode="wait">
          {!selectedRecipe ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <section className="mb-8 md:mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500 mb-3">
                  Bonus kitchen
                </p>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
                    <a
                      href="https://www.steffisrecipes.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 rounded-full overflow-hidden ring-2 ring-indigo-200/80 shadow-md shadow-slate-900/10 transition hover:ring-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      aria-label="Steffi Akka' — visit steffisrecipes.com"
                    >
                      <RecipeImage
                        src="/lets-cook/steffi-akka.jpg"
                        alt="Steffi Akka'"
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover"
                        fallbackClassName="h-16 w-16 sm:h-20 sm:w-20"
                      />
                    </a>
                    <div className="min-w-0">
                      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
                        Let&apos;s <span className="gradient-text">Cook</span>
                      </h1>
                      <p className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
                        Steffi Akka&apos; recipes
                      </p>
                      <p className="text-sm sm:text-base text-gray-500 italic mb-3">
                        tribute to the master of bachelor cooking
                      </p>
                      <p className="text-lg text-gray-600">
                        Browse by protein, refine the style, then scale by servings — or ask the
                        kitchen what to make tonight.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openQuiz}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                  >
                    <Dices size={18} />
                    What should I cook?
                  </button>
                </div>
              </section>

              <section className="mb-5" aria-label="Search and sort">
                <div className="flex flex-col md:flex-row gap-3 md:items-center">
                  <label className="relative flex-1">
                    <span className="sr-only">Search recipes</span>
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search title, ingredients, tags…"
                      className="w-full rounded-2xl border border-black/10 bg-white/80 pl-10 pr-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="whitespace-nowrap">Sort</span>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="rounded-xl border border-black/10 bg-white/80 px-3 py-3 text-sm outline-none focus:border-indigo-400"
                    >
                      <option value="newest">Newest</option>
                      <option value="az">A–Z</option>
                      <option value="cook">Cook time</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="mb-4" aria-label="Category filters">
                <div className="flex flex-wrap gap-2">
                  {RECIPE_CATEGORIES.map((cat) => {
                    const active = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          active
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                            : 'bg-white/70 border border-black/5 text-gray-600 hover:border-indigo-300 hover:text-indigo-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mb-8" aria-label="Refine filters">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <button
                    type="button"
                    aria-expanded={refineOpen}
                    aria-controls={refinePanelId}
                    onClick={() => setRefineOpen((o) => !o)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                      refineOpen || refineIds.length
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                        : 'border-black/10 bg-white/80 text-slate-700 hover:border-indigo-200'
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    Refine
                    {refineIds.length > 0 && (
                      <span className="rounded-md bg-indigo-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                        {refineIds.length}
                      </span>
                    )}
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <X size={14} />
                      Clear all
                    </button>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {refineOpen && (
                    <motion.div
                      id={refinePanelId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 rounded-2xl border border-black/5 bg-white/70 p-4 md:p-5 backdrop-blur-sm">
                        <p className="mb-4 text-xs text-gray-500">
                          Short curated filters — contributor names and noisy labels stay out of
                          the way.
                        </p>
                        <div className="grid gap-5 sm:grid-cols-2">
                          {REFINE_GROUPS.map((group) => (
                            <div key={group.id}>
                              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                {group.label}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {group.options.map((opt) => {
                                  const active = refineIds.includes(opt.id);
                                  const count = refineCounts[opt.id] || 0;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      disabled={count === 0 && !active}
                                      onClick={() => toggleRefine(opt.id)}
                                      className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${
                                        active
                                          ? 'bg-slate-900 border-slate-900 text-white'
                                          : 'bg-white/80 border-black/10 text-gray-600 hover:border-indigo-300'
                                      }`}
                                    >
                                      {opt.label}
                                      <span
                                        className={`ml-1.5 tabular-nums ${
                                          active ? 'text-white/70' : 'text-gray-400'
                                        }`}
                                      >
                                        {count}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {refineIds.length > 0 && (
                  <div className="flex flex-wrap gap-2" aria-label="Active refine filters">
                    {refineIds.map((id) => {
                      const opt = getRefineOption(id);
                      if (!opt) return null;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleRefine(id)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-800 hover:bg-indigo-100"
                        >
                          {opt.label}
                          <X size={12} aria-hidden />
                          <span className="sr-only">Remove {opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <section aria-label="Recipe list">
                <p className="text-sm text-gray-500 mb-4">
                  Showing {pageItems.length} of {filtered.length} recipe
                  {filtered.length === 1 ? '' : 's'}
                  {filtered.length !== recipes.length ? ` (filtered from ${recipes.length})` : ''}
                </p>

                {pageItems.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-black/10 bg-white/50 p-10 text-center">
                    <p className="text-gray-600 mb-3">No recipes match these filters.</p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-semibold text-indigo-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pageItems.map((recipe, index) => {
                      const kcalApprox = approxKcalPerServing(recipe);
                      return (
                      <motion.button
                        key={recipe.id}
                        type="button"
                        onClick={() => openRecipe(recipe.id)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.24), duration: 0.3 }}
                        className="text-left group overflow-hidden rounded-2xl border border-black/5 bg-white/60 backdrop-blur-md hover:bg-white/90 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                      >
                        <RecipeImage
                          src={recipe.image}
                          alt=""
                          className="h-40 w-full object-cover"
                          fallbackClassName="h-40 w-full"
                        />
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
                              {recipe.subcategory || recipe.category}
                            </span>
                            {!recipe.structured && (
                              <span className="text-[10px] uppercase tracking-wide text-amber-600 font-semibold">
                                Catalog
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
                            {recipe.title}
                          </h2>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {recipe.description}
                          </p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-1">
                              <Users size={13} /> {recipe.basePax} pax
                            </span>
                            {recipe.cookTime && (
                              <span className="inline-flex items-center gap-1">
                                <Clock size={13} /> {recipe.cookTime}
                              </span>
                            )}
                            {kcalApprox != null && (
                              <span className="inline-flex items-center gap-1 text-slate-600">
                                ≈{kcalApprox} kcal/serv
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                      );
                    })}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={pageSafe <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border border-black/10 disabled:opacity-40 hover:border-indigo-300"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {pageSafe} / {totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={pageSafe >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border border-black/10 disabled:opacity-40 hover:border-indigo-300"
                    >
                      Next
                    </button>
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key={selectedRecipe.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <button
                type="button"
                onClick={closeRecipe}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
              >
                <ArrowLeft size={18} />
                All recipes
              </button>

              <div className="mb-8 overflow-hidden rounded-3xl border border-black/5 bg-white/50">
                <RecipeImage
                  src={selectedRecipe.image}
                  alt=""
                  className="h-52 sm:h-72 w-full object-cover"
                  fallbackClassName="h-52 sm:h-72 w-full"
                />
              </div>

              <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500 mb-2">
                    {selectedRecipe.category}
                    {selectedRecipe.subcategory ? ` · ${selectedRecipe.subcategory}` : ''}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                    {selectedRecipe.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                    {selectedRecipe.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                    {selectedRecipe.prepTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={15} /> Prep {selectedRecipe.prepTime}
                      </span>
                    )}
                    {selectedRecipe.cookTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={15} /> Cook {selectedRecipe.cookTime}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={15} /> Base {selectedRecipe.basePax} servings
                    </span>
                    {scaledNutrition?.available && scaledNutrition.perServing && (
                      <span className="inline-flex items-center gap-1.5">
                        ≈{scaledNutrition.perServing.kcal} kcal / serving (approx)
                      </span>
                    )}
                    {selectedRecipe.sourceUrl && (
                      <a
                        href={selectedRecipe.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline"
                      >
                        <ExternalLink size={15} /> Original post
                      </a>
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-4">Method</h2>
                  <ol className="space-y-4 mb-10">
                    {(selectedRecipe.steps || []).map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>

                  {selectedRecipe.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-black/5 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <aside className="lg:sticky lg:top-24 rounded-2xl border border-black/5 bg-white/75 backdrop-blur-xl p-5 shadow-lg shadow-slate-900/5">
                  {canScale ? (
                    <>
                      <div className="mb-6">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                          Servings (pax)
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Decrease servings"
                            onClick={() => handlePaxChange(pax - 1)}
                            className="w-10 h-10 rounded-full bg-black/5 hover:bg-indigo-100 text-slate-700 flex items-center justify-center transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={24}
                            value={pax}
                            onChange={(e) => handlePaxChange(Number(e.target.value))}
                            className="w-16 text-center text-2xl font-bold bg-transparent border-b-2 border-indigo-200 focus:border-indigo-500 outline-none"
                          />
                          <button
                            type="button"
                            aria-label="Increase servings"
                            onClick={() => handlePaxChange(pax + 1)}
                            className="w-10 h-10 rounded-full bg-black/5 hover:bg-indigo-100 text-slate-700 flex items-center justify-center transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {scaleSource === 'major'
                            ? 'Scaled from a major ingredient — pax updated by the same ratio.'
                            : `Factor ×${(pax / selectedRecipe.basePax).toFixed(2)} from base ${selectedRecipe.basePax} pax.`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={shareRecipeOnWhatsApp}
                        className="mb-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
                      >
                        <Share2 size={16} aria-hidden />
                        Send to WhatsApp
                      </button>

                      {scaledNutrition?.available && (
                        <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-3">
                          <div className="mb-2 flex items-baseline justify-between gap-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                              Approx nutrition
                            </p>
                            <p className="text-[10px] text-gray-500">
                              Estimates · updates with scale
                            </p>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <MacroStat label="kcal" value={scaledNutrition.total.kcal} />
                            <MacroStat label="protein" value={scaledNutrition.total.protein} unit="g" />
                            <MacroStat label="carbs" value={scaledNutrition.total.carbs} unit="g" />
                            <MacroStat label="fat" value={scaledNutrition.total.fat} unit="g" />
                          </div>
                          {scaledNutrition.perServing && (
                            <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                              ≈{scaledNutrition.perServing.kcal} kcal ·{' '}
                              {scaledNutrition.perServing.protein}g P ·{' '}
                              {scaledNutrition.perServing.carbs}g C ·{' '}
                              {scaledNutrition.perServing.fat}g F per serving
                              {pax > 1 ? ` (${pax} servings)` : ''}
                            </p>
                          )}
                        </div>
                      )}

                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                        Ingredients
                      </h2>
                      <ul className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                        {scaledIngredients.map((ing) => {
                          const isMajor = Boolean(ing.isMajor);
                          return (
                            <li
                              key={ing.id}
                              className={`flex items-start justify-between gap-3 text-sm ${
                                isMajor ? 'rounded-xl bg-indigo-50/80 px-3 py-2 -mx-1' : ''
                              }`}
                            >
                              <div className="min-w-0">
                                <p className="font-medium text-slate-800 truncate">
                                  {ing.name}
                                  {isMajor && (
                                    <span className="ml-2 text-[10px] uppercase tracking-wide text-indigo-600 font-bold">
                                      major
                                    </span>
                                  )}
                                </p>
                              </div>
                              {isMajor && ing.amount != null ? (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <input
                                    type="number"
                                    min={0.01}
                                    step="any"
                                    value={ing.amount}
                                    onChange={(e) => handleMajorChange(ing.id, e.target.value)}
                                    className="w-16 text-right font-semibold bg-white border border-indigo-200 rounded-lg px-2 py-1 outline-none focus:border-indigo-500"
                                  />
                                  <span className="text-gray-500 text-xs w-8">{ing.unit}</span>
                                </div>
                              ) : (
                                <span className="font-semibold text-slate-700 whitespace-nowrap">
                                  {formatAmount(ing.amount, ing.unit)}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                        Edit any major amount to rescale the whole list: new ÷ base for that
                        ingredient, applied to every other quantity.
                      </p>
                    </>
                  ) : (
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-semibold text-slate-800 mb-2">Ingredients on source</p>
                      <p className="mb-4">
                        Structured quantities were not detected for this post. Open the original
                        for the full ingredient list and method.
                      </p>
                      <button
                        type="button"
                        onClick={shareRecipeOnWhatsApp}
                        className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
                      >
                        <Share2 size={16} aria-hidden />
                        Send to WhatsApp
                      </button>
                      {selectedRecipe.sourceUrl && (
                        <a
                          href={selectedRecipe.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:underline"
                        >
                          <ExternalLink size={15} /> View on steffisrecipes.com
                        </a>
                      )}
                    </div>
                  )}
                </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-gray-500">
        Tribute to Steffi Akka&apos; — recipes adapted from{' '}
        <a
          href="https://www.steffisrecipes.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          steffisrecipes.com
        </a>
        . Scale locally — no tracking, just cooking math.
      </footer>

      <AnimatePresence>
        {quizOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cook-quiz-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              aria-label="Close quiz"
              onClick={closeQuiz}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/40 bg-[linear-gradient(165deg,#ffffff_0%,#f4f6ff_55%,#fff8f0_100%)] shadow-2xl shadow-slate-900/25"
            >
              <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-black/5 bg-white/80 px-5 py-4 backdrop-blur-md">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
                    Kitchen roulette
                  </p>
                  <h2 id="cook-quiz-title" className="text-lg font-bold text-slate-900">
                    What should I cook?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeQuiz}
                  className="rounded-full p-2 text-gray-500 hover:bg-black/5 hover:text-slate-800"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 py-5">
                {!suggestions ? (
                  <>
                    <div className="mb-5 flex gap-1.5" aria-hidden>
                      {QUIZ_STEPS.map((step, i) => (
                        <span
                          key={step.id}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i <= quizStep ? 'bg-indigo-500' : 'bg-black/10'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Step {quizStep + 1} of {QUIZ_STEPS.length}
                    </p>
                    <h3 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-900">
                      {currentQuizStep.question}
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {currentQuizStep.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => selectQuizOption(currentQuizStep.id, opt.id)}
                          className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {quizStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setQuizStep((s) => Math.max(0, s - 1))}
                        className="mt-5 text-sm font-medium text-gray-500 hover:text-indigo-600"
                      >
                        Back
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      Three picks for you
                    </p>
                    <h3 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-900">
                      Tonight&apos;s shortlist
                    </h3>
                    {suggestions.length === 0 ? (
                      <p className="text-sm text-gray-600 mb-4">
                        Couldn&apos;t find a match — try again with looser answers.
                      </p>
                    ) : (
                      <ul className="space-y-3 mb-5">
                        {suggestions.map((recipe, i) => (
                          <motion.li
                            key={recipe.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                          >
                            <button
                              type="button"
                              onClick={() => openRecipe(recipe.id)}
                              className="flex w-full gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white/90 text-left transition hover:border-indigo-300 hover:shadow-md"
                            >
                              <RecipeImage
                                src={recipe.image}
                                alt=""
                                className="h-24 w-24 flex-shrink-0 object-cover"
                                fallbackClassName="h-24 w-24 flex-shrink-0"
                              />
                              <div className="min-w-0 py-3 pr-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500 mb-0.5">
                                  {recipe.category}
                                  {recipe.cookTime ? ` · ${recipe.cookTime}` : ''}
                                </p>
                                <p className="font-bold text-slate-900 line-clamp-2">
                                  {recipe.title}
                                </p>
                                <p className="mt-1 text-xs font-semibold text-indigo-600">
                                  Open recipe →
                                </p>
                              </div>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={shuffleSuggestions}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        <Dices size={16} />
                        Shuffle again
                      </button>
                      <button
                        type="button"
                        onClick={restartQuiz}
                        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-300"
                      >
                        Retake quiz
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetsCook;
