import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import GoogleAnalytics from './components/GoogleAnalytics';
const LetsCook = lazy(() => import('./pages/LetsCook'));

// Dev-only feedback tool; the DEV check lets Vite drop it from the production bundle entirely.
const Agentation = import.meta.env.DEV
  ? lazy(() => import('agentation').then((m) => ({ default: m.Agentation })))
  : null;

function App() {
  return (
    <>
      <GoogleAnalytics />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
            Loading kitchen…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lets-cook" element={<LetsCook />} />
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
