/**
 * Language Switcher Component
 * Uses shadcn/ui components with accessibility support
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { SupportedLocale, setLanguageCookie } from '../lib/cookies';
import { buildLocalePath, removeLocaleFromPath, getCurrentLocale } from '../lib/locale';

// Flag SVG Components
const GermanFlag = ({ className = "w-5 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
    <rect width="5" height="1" fill="#000000"/>
    <rect width="5" height="1" y="1" fill="#DD0000"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

const USAFlag = ({ className = "w-5 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 19 10" xmlns="http://www.w3.org/2000/svg">
    {/* Red background */}
    <rect width="19" height="10" fill="#B22234"/>
    {/* White stripes */}
    <rect width="19" height="0.77" y="0.77" fill="#FFFFFF"/>
    <rect width="19" height="0.77" y="2.31" fill="#FFFFFF"/>
    <rect width="19" height="0.77" y="3.85" fill="#FFFFFF"/>
    <rect width="19" height="0.77" y="5.38" fill="#FFFFFF"/>
    <rect width="19" height="0.77" y="6.92" fill="#FFFFFF"/>
    <rect width="19" height="0.77" y="8.46" fill="#FFFFFF"/>
    {/* Blue canton */}
    <rect width="7.6" height="5.38" fill="#3C3B6E"/>
    {/* Simplified star pattern - just a few key stars */}
    <g fill="#FFFFFF">
      <circle cx="1.5" cy="1" r="0.15"/>
      <circle cx="3" cy="1" r="0.15"/>
      <circle cx="4.5" cy="1" r="0.15"/>
      <circle cx="6" cy="1" r="0.15"/>
      <circle cx="2.25" cy="2" r="0.15"/>
      <circle cx="3.75" cy="2" r="0.15"/>
      <circle cx="5.25" cy="2" r="0.15"/>
      <circle cx="1.5" cy="3" r="0.15"/>
      <circle cx="3" cy="3" r="0.15"/>
      <circle cx="4.5" cy="3" r="0.15"/>
      <circle cx="6" cy="3" r="0.15"/>
      <circle cx="2.25" cy="4" r="0.15"/>
      <circle cx="3.75" cy="4" r="0.15"/>
      <circle cx="5.25" cy="4" r="0.15"/>
    </g>
  </svg>
);

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: 'de' as SupportedLocale, name: 'Deutsch', flag: GermanFlag },
  { code: 'en' as SupportedLocale, name: 'English', flag: USAFlag }
];

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = getCurrentLocale();

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    // Set cookie to remember user preference
    setLanguageCookie(newLocale);
    
    // Change i18next language
    i18n.changeLanguage(newLocale);
    
    // Navigate to new locale URL without full page reload
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathWithoutLocale = removeLocaleFromPath(currentPath);
      const newPath = buildLocalePath(newLocale, pathWithoutLocale);
      
      // Use history.pushState for SPA navigation
      window.history.pushState({}, '', newPath);
      
      // Update page title and meta tags
      document.documentElement.lang = newLocale;
    }
    
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[1];

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-party-primary/20 hover:border-party-primary/40 transition-colors"
        aria-label={t('language.switch')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} className="sm:w-[18px] sm:h-[18px] text-party-primary" />
        <div className="flex items-center space-x-2">
          <currentLanguage.flag className="w-4 h-3 sm:w-5 sm:h-4" />
          <span className="hidden sm:inline text-xs sm:text-sm font-medium text-white">
            {currentLanguage.name}
          </span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 z-50 min-w-[120px] sm:min-w-[140px] bg-slate-800/95 backdrop-blur-sm border border-party-primary/20 rounded-lg shadow-xl"
            role="listbox"
            aria-label={t('language.switch')}
          >
            {languages.map((language) => {
              const isSelected = language.code === currentLocale;
              
              return (
                <motion.button
                  key={language.code}
                  whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-party-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  role="option"
                  aria-selected={isSelected}
                  aria-label={`${t('language.switch')} ${language.name}`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <language.flag className="w-4 h-3 sm:w-5 sm:h-4" />
                    <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-party-primary' : 'text-white'}`}>
                      {language.name}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <Check size={14} className="sm:w-4 sm:h-4 text-party-primary" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
