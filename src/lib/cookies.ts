/**
 * Cookie handling utilities for PartyMotivator i18n
 * TypeScript-strict, no external dependencies
 */

export type SupportedLocale = 'de' | 'en';

const LANGUAGE_COOKIE_NAME = 'pm_lang';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 365 days in seconds

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  
  return null;
}

/**
 * Set a cookie with name, value, and options
 */
function setCookie(name: string, value: string, maxAge: number = COOKIE_MAX_AGE): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + maxAge * 1000);
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Get the user's preferred language from cookie
 * Returns null if no cookie is set
 */
export function getLanguageCookie(): SupportedLocale | null {
  const cookieValue = getCookie(LANGUAGE_COOKIE_NAME);
  
  if (cookieValue === 'de' || cookieValue === 'en') {
    return cookieValue;
  }
  
  return null;
}

/**
 * Set the user's preferred language in cookie
 * Cookie will be valid for 365 days
 */
export function setLanguageCookie(locale: SupportedLocale): void {
  setCookie(LANGUAGE_COOKIE_NAME, locale, COOKIE_MAX_AGE);
}

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale === 'de' || locale === 'en';
}

/**
 * Get fallback locale
 */
export function getFallbackLocale(): SupportedLocale {
  return 'en';
}
