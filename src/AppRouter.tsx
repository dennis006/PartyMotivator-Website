/**
 * App Router Component
 * Handles routing for localized pages and root redirect
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';

// Pages
import LocalizedHomePage from './pages/LocalizedHomePage';
import RedirectPage from './pages/RedirectPage';
import LoadingScreen from './components/LoadingScreen';

// Utils are imported in components as needed

const AppRouter = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<RedirectPage />} />
            
            {/* Localized routes */}
            <Route 
              path="/de/*" 
              element={<LocalizedHomePage locale="de" />} 
            />
            <Route 
              path="/en/*" 
              element={<LocalizedHomePage locale="en" />} 
            />
            
            {/* Catch-all: redirect invalid routes to English */}
            <Route 
              path="*" 
              element={<Navigate to="/en" replace />} 
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default AppRouter;
