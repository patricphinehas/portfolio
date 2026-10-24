import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Home from './pages/Home';
import GoogleAnalytics from './components/GoogleAnalytics';

// Homepage visits keep the browser's own scroll (including Back). A forward
// visit to another route should open at the top. `scroll-behavior: smooth`
// on `html` would animate that jump, so turn it off for this one scroll.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    window.__scrollDebug = { navigationType, pathname, hash, scrollY: window.scrollY };
    if (navigationType === 'POP' || hash) return undefined;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    // `auto` follows the CSS `smooth` rule. `instant` jumps before paint.
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previous;
    };
  }, [pathname, hash, navigationType]);

  return null;
}

// Homepage stays eager. Recipe, study, and pokedex routes stay out of that chunk.
const ThankYou = lazy(() => import('./pages/ThankYou'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Links = lazy(() => import('./pages/Links'));
const HomeSystem = lazy(() => import('./pages/HomeSystem'));
const LetsCook = lazy(() => import('./pages/LetsCook'));
const Freelance = lazy(() => import('./pages/Freelance'));
const PokedexPage = lazy(() => import('./pages/PokedexPage'));

const Agentation = import.meta.env.DEV
  ? lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))
  : null;

function App() {
  return (
    <>
      <ScrollToTop />
      <GoogleAnalytics />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-sm text-slate-700">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<Links />} />
          <Route path="/projects/home-system" element={<HomeSystem />} />
          <Route path="/lets-cook" element={<LetsCook />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {Agentation && (
        <Suspense fallback={null}>
          <Agentation endpoint="http://localhost:4747" />
        </Suspense>
      )}
    </>
  );
}

export default App;
