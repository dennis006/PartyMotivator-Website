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

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: 'de' as SupportedLocale, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as SupportedLocale, name: 'English', flag: '🇺🇸' }
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
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-party-primary/20 hover:border-party-primary/40 transition-colors"
        aria-label={t('language.switch')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={18} className="text-party-primary" />
        <span className="text-sm font-medium text-white">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
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
            className="absolute top-full mt-2 right-0 z-50 min-w-[140px] bg-slate-800/95 backdrop-blur-sm border border-party-primary/20 rounded-lg shadow-xl"
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
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-party-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  role="option"
                  aria-selected={isSelected}
                  aria-label={`${t('language.switch')} ${language.name}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <span className={`text-sm font-medium ${isSelected ? 'text-party-primary' : 'text-white'}`}>
                      {language.name}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <Check size={16} className="text-party-primary" />
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
