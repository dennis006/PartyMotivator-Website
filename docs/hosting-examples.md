# Hosting Examples for PartyMotivator i18n

This document provides configuration examples for different hosting providers and servers to handle the locale detection and redirection for the PartyMotivator website.

## Table of Contents

- [Netlify (Implemented)](#netlify-implemented)
- [Vercel Middleware](#vercel-middleware)
- [Nginx Configuration](#nginx-configuration)
- [Node.js/Express Server](#nodejsexpress-server)
- [Apache .htaccess](#apache-htaccess)

## Netlify (Implemented)

The Netlify configuration is already implemented in this project:

- **Edge Function**: `netlify/edge-functions/locale-redirect.ts`
- **Configuration**: `netlify.toml`

### Key Features:
- ✅ Automatic redirect from "/" based on Accept-Language
- ✅ Cookie preference support (`pm_lang`)
- ✅ Bot detection (no redirect for crawlers)
- ✅ Proper SEO headers (Vary, Content-Language)
- ✅ SPA fallback for all routes

## Vercel Middleware

For Vercel deployment, create `middleware.ts` in the project root:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['de', 'en'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];
const FALLBACK_LOCALE: SupportedLocale = 'en';
const COOKIE_NAME = 'pm_lang';

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

function isBot(userAgent?: string): boolean {
  if (!userAgent) return false;
  
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /google/i, /bing/i, 
    /yandex/i, /baidu/i, /duckduckbot/i, /facebookexternalhit/i
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only handle root path "/"
  if (pathname !== '/') {
    return NextResponse.next();
  }
  
  const userAgent = request.headers.get('user-agent');
  const acceptLanguage = request.headers.get('accept-language');
  
  // Don't redirect bots
  if (isBot(userAgent || '')) {
    return NextResponse.next();
  }
  
  // Check cookie preference
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  let targetLocale: SupportedLocale;
  
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)) {
    targetLocale = cookieLocale as SupportedLocale;
  } else {
    targetLocale = detectLocaleFromAcceptLanguage(acceptLanguage || '');
  }
  
  // Redirect with proper headers
  const redirectUrl = new URL(`/${targetLocale}`, request.url);
  const response = NextResponse.redirect(redirectUrl, 302);
  
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  return response;
}

export const config = {
  matcher: '/'
};
```

### Vercel Configuration (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/de/(.*)",
      "dest": "/index.html"
    },
    {
      "src": "/en/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/de/(.*)",
      "headers": [
        {
          "key": "Content-Language",
          "value": "de"
        }
      ]
    },
    {
      "source": "/en/(.*)",
      "headers": [
        {
          "key": "Content-Language", 
          "value": "en"
        }
      ]
    }
  ]
}
```

## Nginx Configuration

For traditional server hosting with Nginx:

```nginx
server {
    listen 80;
    server_name party-motivator.com;
    root /var/www/partymotivator/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options nosniff;

    # Root path locale detection and redirect
    location = / {
        # Check for bot user agents - don't redirect
        if ($http_user_agent ~* "(bot|crawler|spider|google|bing|yandex|baidu)") {
            try_files $uri /index.html;
            break;
        }

        # Check cookie preference first
        set $redirect_locale "en";
        if ($cookie_pm_lang = "de") {
            set $redirect_locale "de";
        }
        if ($cookie_pm_lang = "en") {
            set $redirect_locale "en";
        }

        # If no cookie, check Accept-Language header
        if ($cookie_pm_lang = "") {
            set $redirect_locale "en";
            if ($http_accept_language ~* "^de") {
                set $redirect_locale "de";
            }
        }

        # Perform redirect
        add_header Vary "Accept-Language, Cookie";
        return 302 /$redirect_locale/;
    }

    # Handle localized routes
    location ~* ^/(de|en)(/.*)?$ {
        set $locale $1;
        add_header Content-Language $locale;
        add_header Vary "Accept-Language";
        try_files $uri $uri/ /index.html;
    }

    # Static assets with long cache
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 1y;
        add_header Cache-Control "public";
    }

    # Fallback for SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Node.js/Express Server

For a custom Node.js server:

```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

const SUPPORTED_LOCALES = ['de', 'en'];
const FALLBACK_LOCALE = 'en';
const COOKIE_NAME = 'pm_lang';

// Parse Accept-Language header
function parseAcceptLanguage(acceptLanguage) {
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

function detectLocaleFromAcceptLanguage(acceptLanguage) {
  if (!acceptLanguage) return FALLBACK_LOCALE;

  const parsed = parseAcceptLanguage(acceptLanguage);
  
  for (const { locale } of parsed) {
    if (SUPPORTED_LOCALES.includes(locale)) {
      return locale;
    }
  }
  
  return FALLBACK_LOCALE;
}

function isBot(userAgent) {
  if (!userAgent) return false;
  
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /google/i, /bing/i,
    /yandex/i, /baidu/i, /duckduckbot/i, /facebookexternalhit/i
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

// Middleware for cookie parsing
app.use(require('cookie-parser')());

// Static files
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  immutable: true
}));

app.use('/images', express.static(path.join(__dirname, 'dist/images'), {
  maxAge: '1y'
}));

// Root path redirect
app.get('/', (req, res) => {
  const userAgent = req.get('user-agent');
  const acceptLanguage = req.get('accept-language');
  
  // Don't redirect bots
  if (isBot(userAgent)) {
    return res.sendFile(path.join(__dirname, 'dist/index.html'));
  }
  
  // Check cookie preference
  const cookieLocale = req.cookies[COOKIE_NAME];
  let targetLocale;
  
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    targetLocale = detectLocaleFromAcceptLanguage(acceptLanguage);
  }
  
  // Set headers and redirect
  res.set({
    'Vary': 'Accept-Language, Cookie',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  
  res.redirect(302, `/${targetLocale}/`);
});

// Localized routes
app.get(/^\/(de|en)(\/.*)?$/, (req, res) => {
  const locale = req.params[0];
  
  res.set({
    'Content-Language': locale,
    'Vary': 'Accept-Language'
  });
  
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Package.json scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "vite build",
    "serve": "npm run build && npm start"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cookie-parser": "^1.4.6"
  }
}
```

## Apache .htaccess

For Apache servers, create `.htaccess` in the document root:

```apache
# Enable rewrite engine
RewriteEngine On

# Security headers
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options nosniff

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/css application/json application/javascript text/xml application/xml text/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/* "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>

# Root path locale detection (simplified)
RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP_USER_AGENT} !(bot|crawler|spider|google|bing|yandex|baidu) [NC]
RewriteCond %{HTTP_COOKIE} pm_lang=de [NC]
RewriteRule ^$ /de/? [R=302,L]

RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP_USER_AGENT} !(bot|crawler|spider|google|bing|yandex|baidu) [NC]
RewriteCond %{HTTP_COOKIE} pm_lang=en [NC]
RewriteRule ^$ /en/? [R=302,L]

RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP_USER_AGENT} !(bot|crawler|spider|google|bing|yandex|baidu) [NC]
RewriteCond %{HTTP_ACCEPT_LANGUAGE} ^de [NC]
RewriteCond %{HTTP_COOKIE} !pm_lang= [NC]
RewriteRule ^$ /de/? [R=302,L]

RewriteCond %{REQUEST_URI} ^/$
RewriteCond %{HTTP_USER_AGENT} !(bot|crawler|spider|google|bing|yandex|baidu) [NC]
RewriteCond %{HTTP_COOKIE} !pm_lang= [NC]
RewriteRule ^$ /en/? [R=302,L]

# Set Content-Language for localized paths
RewriteRule ^de/ - [E=LOCALE:de]
RewriteRule ^en/ - [E=LOCALE:en]
Header set Content-Language %{LOCALE}e env=LOCALE

# SPA fallback for all routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Add Vary header for SEO
Header always set Vary "Accept-Language, Cookie"
```

## Testing Your Implementation

### Manual Tests:

1. **Root redirect with Accept-Language**: 
   ```bash
   curl -H "Accept-Language: de-DE,de;q=0.9" http://localhost:3000/
   # Should return 302 to /de/
   ```

2. **Cookie preference**:
   ```bash
   curl -H "Cookie: pm_lang=en" http://localhost:3000/
   # Should return 302 to /en/
   ```

3. **Bot detection**:
   ```bash
   curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/
   # Should return 200 with index.html (no redirect)
   ```

### Automated Testing:

Consider adding Playwright tests for comprehensive coverage:

```javascript
// tests/locale.spec.js
import { test, expect } from '@playwright/test';

test('redirects based on Accept-Language', async ({ page, context }) => {
  await context.setExtraHTTPHeaders({
    'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
  });
  
  await page.goto('/');
  expect(page.url()).toContain('/de');
});

test('respects cookie preference', async ({ page, context }) => {
  await context.addCookies([{
    name: 'pm_lang',
    value: 'en',
    domain: 'localhost',
    path: '/'
  }]);
  
  await page.goto('/');
  expect(page.url()).toContain('/en');
});
```

## SEO Considerations

1. **Always include hreflang alternates** in your HTML head
2. **Set proper Content-Language headers** for each locale
3. **Use Vary header** to inform caches about dynamic content
4. **Don't redirect bots** to avoid crawling issues
5. **Use 302 redirects** (temporary) for locale detection
6. **Implement proper canonical URLs** for each language version

## Performance Notes

- Edge functions (Netlify/Vercel) provide the best performance
- Server-side redirects are faster than client-side
- Cache static assets aggressively
- Use appropriate compression (gzip/brotli)
- Consider implementing service workers for offline support
