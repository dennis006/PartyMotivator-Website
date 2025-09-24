/**
 * Redirect Page Component
 * Handles client-side locale detection and redirection for root "/"
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLanguageCookie, SupportedLocale, getFallbackLocale } from '../lib/cookies';
import { buildLocalePath } from '../lib/locale';

const RedirectPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has a language preference cookie
    const cookieLocale = getLanguageCookie();
    
    if (cookieLocale) {
      // User has a preference, redirect to that locale
      navigate(buildLocalePath(cookieLocale), { replace: true });
      return;
    }
    
    // No cookie, try to detect from Accept-Language header
    // Note: This is client-side fallback, server-side redirect is preferred
    let detectedLocale: SupportedLocale = getFallbackLocale();
    
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLocale = navigator.language.split('-')[0].toLowerCase();
      if (browserLocale === 'de' || browserLocale === 'en') {
        detectedLocale = browserLocale;
      }
    }
    
    navigate(buildLocalePath(detectedLocale), { replace: true });
  }, [navigate]);
  
  // Show minimal loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-party-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Redirecting...</p>
      </div>
    </div>
  );
};

export default RedirectPage;
