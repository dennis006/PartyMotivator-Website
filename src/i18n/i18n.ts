import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de/translation.json';
import en from './locales/en/translation.json';

const fallbackLng = 'en';

i18n.use(initReactI18next).init({
  resources: { 
    de: { translation: de }, 
    en: { translation: en } 
  },
  lng: fallbackLng, // tatsächliche Auswahl kommt aus Cookie/Route
  fallbackLng,
  interpolation: { escapeValue: false },
  debug: process.env.NODE_ENV === 'development',
});

export default i18n;
