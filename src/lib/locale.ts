/**
 * Locale detection and URL handling utilities
 * Handles Accept-Language parsing, URL routing, and bot detection
 */

import { SupportedLocale, getFallbackLocale, isSupportedLocale } from './cookies';

/**
 * Parse Accept-Language header to get preferred locales with quality values
 * Example: "de-DE,de;q=0.9,en;q=0.8" -> [{ locale: 'de', quality: 1 }, { locale: 'en', quality: 0.8 }]
 */
function parseAcceptLanguage(acceptLanguage: string): Array<{ locale: string; quality: number }> {
  if (!acceptLanguage) return [];

  return acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      const quality = qValue ? parseFloat(qValue) : 1.0;
      const normalizedLocale = locale.split('-')[0].toLowerCase(); // 'de-DE' -> 'de'
      
      return { locale: normalizedLocale, quality };
    })
    .filter(item => item.quality > 0)
    .sort((a, b) => b.quality - a.quality); // Sort by quality descending
}

/**
 * Detect preferred locale from Accept-Language header
 * Returns first supported locale or fallback
 */
export function detectLocaleFromAcceptLanguage(acceptLanguage?: string): SupportedLocale {
  if (!acceptLanguage) return getFallbackLocale();

  const parsed = parseAcceptLanguage(acceptLanguage);
  
  for (const { locale } of parsed) {
    if (isSupportedLocale(locale)) {
      return locale;
    }
  }
  
  return getFallbackLocale();
}

/**
 * Extract locale from URL path
 * Examples: '/de/features' -> 'de', '/en' -> 'en', '/' -> null
 */
export function getLocaleFromPath(pathname: string): SupportedLocale | null {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;
  
  const firstSegment = segments[0];
  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

/**
 * Build localized URL path
 * Examples: buildLocalePath('de', '/features') -> '/de/features'
 */
export function buildLocalePath(locale: SupportedLocale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Remove locale from URL path
 * Examples: '/de/features' -> '/features', '/en' -> '/'
 */
export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (!locale) return pathname;
  
  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '');
  return withoutLocale || '/';
}

/**
 * Check if User-Agent indicates a bot/crawler
 * Bots should not be automatically redirected to avoid SEO issues
 */
export function isBot(userAgent?: string): boolean {
  if (!userAgent) return false;
  
  const botPatterns = [
    /bot/i,
    /crawler/i, 
    /spider/i,
    /google/i,
    /bing/i,
    /yandex/i,
    /baidu/i,
    /duckduckbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegram/i
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Get alternate URLs for hreflang tags
 */
export function getAlternateUrls(currentPath: string, baseUrl: string): Array<{ locale: SupportedLocale; url: string }> {
  const pathWithoutLocale = removeLocaleFromPath(currentPath);
  
  return (['de', 'en'] as SupportedLocale[]).map(locale => ({
    locale,
    url: `${baseUrl}${buildLocalePath(locale, pathWithoutLocale)}`
  }));
}

/**
 * Get current locale from window.location or default
 * Client-side utility
 */
export function getCurrentLocale(): SupportedLocale {
  if (typeof window === 'undefined') return getFallbackLocale();
  
  return getLocaleFromPath(window.location.pathname) || getFallbackLocale();
}
