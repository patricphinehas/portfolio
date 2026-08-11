import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import GoogleAnalytics from './components/GoogleAnalytics';

const LetsCook = lazy(() => import('./pages/LetsCook'));

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
    </>
  );
}

export default App;
