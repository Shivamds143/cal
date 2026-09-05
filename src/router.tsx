import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './Layout';

// Lazy-loaded page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CalculatorsHubPage = lazy(() => import('./pages/CalculatorsHubPage').then(m => ({ default: m.CalculatorsHubPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage').then(m => ({ default: m.CalculatorPage })));

/**
 * Minimal loading fallback — keeps CLS low
 */
function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

/**
 * Redirects old hash-based URLs (e.g. /#sppu-cgpa-to-percentage)
 * to the equivalent clean path (/sppu-cgpa-to-percentage).
 */
function HashRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hashPath = location.hash.replace('#', '');
      if (hashPath && hashPath !== '/') {
        const pathMap: Record<string, string> = {
          'home': '/',
          'calculators-hub': '/calculators',
          'how-it-works': '/how-it-works',
          'about': '/about',
        };
        const newPath = pathMap[hashPath] || `/${hashPath}`;
        navigate(newPath, { replace: true });
      }
    }
  }, [location.hash, navigate]);

  return null;
}

export function AppRouter() {
  return (
    <>
      <HashRedirect />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          } />
          <Route path="calculators" element={
            <Suspense fallback={<PageLoader />}>
              <CalculatorsHubPage />
            </Suspense>
          } />
          <Route path="how-it-works" element={
            <Suspense fallback={<PageLoader />}>
              <HowItWorksPage />
            </Suspense>
          } />
          <Route path="about" element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          } />
          <Route path=":calculatorSlug" element={
            <Suspense fallback={<PageLoader />}>
              <CalculatorPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  );
}
