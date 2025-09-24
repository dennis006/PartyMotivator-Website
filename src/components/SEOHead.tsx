/**
 * SEO Head Component
 * Handles all SEO meta tags, hreflang alternates, and Open Graph
 */

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SupportedLocale } from '../lib/cookies';
import { getAlternateUrls, getCurrentLocale } from '../lib/locale';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://party-motivator.com'; // TODO: Update with actual domain
const DEFAULT_IMAGE = '/images/pm-icon.png';

const SEOHead = ({ 
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website'
}: SEOHeadProps) => {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale();
  
  // Build localized meta content
  const siteTitle = t('hero.title');
  const siteDescription = description || t('hero.subtitle');
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  // Get alternate URLs for hreflang
  const alternateUrls = getAlternateUrls(path, BASE_URL);
  const canonicalUrl = `${BASE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  // Locale mapping for Open Graph
  const ogLocaleMap: Record<SupportedLocale, string> = {
    'de': 'de_DE',
    'en': 'en_US'
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLocale} />
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Alternates */}
      {alternateUrls.map(({ locale, url }) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={url}
        />
      ))}
      
      {/* x-default for international targeting */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${path === '/' ? '' : path}`}
      />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:locale" content={ogLocaleMap[currentLocale]} />
      <meta property="og:site_name" content="PartyMotivator" />
      
      {/* Open Graph Locale Alternates */}
      {alternateUrls
        .filter(({ locale }) => locale !== currentLocale)
        .map(({ locale }) => (
          <meta
            key={`og-alt-${locale}`}
            property="og:locale:alternate"
            content={ogLocaleMap[locale]}
          />
        ))}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="PartyMotivator Team" />
      <meta name="keywords" content="WoW, World of Warcraft, Addon, Mythic+, Dungeon, Motivation, Gaming" />
      
      {/* Theme and App */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="application-name" content="PartyMotivator" />
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "PartyMotivator",
          "description": siteDescription,
          "url": BASE_URL,
          "inLanguage": currentLocale === 'de' ? 'de-DE' : 'en-US',
          "author": {
            "@type": "Organization",
            "name": "PartyMotivator Team"
          }
        })}
      </script>
      
      {/* Structured Data - SoftwareApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "PartyMotivator",
          "description": siteDescription,
          "applicationCategory": "GameApplication",
          "operatingSystem": "Windows, macOS",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "downloadUrl": "https://www.curseforge.com/wow/addons/partymotivator",
          "softwareVersion": "1.3.0"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
