/**
 * Netlify Edge Function for Locale Redirect
 * Handles automatic redirection from "/" based on Accept-Language header
 */

import type { Context } from "@netlify/edge-functions";

// Supported locales
const SUPPORTED_LOCALES = ['de', 'en'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

const FALLBACK_LOCALE: SupportedLocale = 'en';
const COOKIE_NAME = 'pm_lang';

/**
 * Parse Accept-Language header to get preferred locales with quality values
 */
function parseAcceptLanguage(acceptLanguage: string): Array<{ locale: string; quality: number }> {
  if (!acceptLanguage) return [];

  return acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      const quality = qValue ? parseFloat(qValue) : 1.0;
      const normalizedLocale = locale.split('-')[0].toLowerCase();
      
      return { locale: normalizedLocale, quality };
    })
    .filter(item => item.quality > 0)
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Detect preferred locale from Accept-Language header
 */
function detectLocaleFromAcceptLanguage(acceptLanguage?: string): SupportedLocale {
  if (!acceptLanguage) return FALLBACK_LOCALE;

  const parsed = parseAcceptLanguage(acceptLanguage);
  
  for (const { locale } of parsed) {
    if (SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
      return locale as SupportedLocale;
    }
  }
  
  return FALLBACK_LOCALE;
}

/**
 * Check if User-Agent indicates a bot/crawler
 */
function isBot(userAgent?: string): boolean {
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
 * Get locale from cookie
 */
function getLocaleFromCookie(cookieHeader?: string): SupportedLocale | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const cookieValue = cookies[COOKIE_NAME];
  
  if (SUPPORTED_LOCALES.includes(cookieValue as SupportedLocale)) {
    return cookieValue as SupportedLocale;
  }
  
  return null;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Only handle root path "/"
  if (url.pathname !== '/') {
    return; // Continue to next handler
  }
  
  const userAgent = request.headers.get('user-agent');
  const acceptLanguage = request.headers.get('accept-language');
  const cookieHeader = request.headers.get('cookie');
  
  // Don't redirect bots to avoid SEO issues
  if (isBot(userAgent || '')) {
    return; // Let the SPA handle it
  }
  
  // Check if user has a language preference cookie
  const cookieLocale = getLocaleFromCookie(cookieHeader || '');
  
  let targetLocale: SupportedLocale;
  
  if (cookieLocale) {
    // User has a preference, use it
    targetLocale = cookieLocale;
  } else {
    // No cookie, detect from Accept-Language header
    targetLocale = detectLocaleFromAcceptLanguage(acceptLanguage || '');
  }
  
  // Build redirect URL
  const redirectUrl = new URL(`/${targetLocale}`, request.url);
  
  // Perform 302 redirect with proper headers
  const response = new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl.toString(),
      'Vary': 'Accept-Language, Cookie',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
  
  return response;
};
