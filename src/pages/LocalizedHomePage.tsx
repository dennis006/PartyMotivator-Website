/**
 * Localized Home Page Component
 * Wraps the main content with proper i18n and SEO setup
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Router params are handled by the parent AppRouter
import { motion } from 'framer-motion';

// Import existing components
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChatDemo from '../components/ChatDemo';
import FeatureShowcase from '../components/FeatureShowcase';
import AddonGallery from '../components/AddonGallery';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import SEOHead from '../components/SEOHead';

// Utils
import { SupportedLocale } from '../lib/cookies';

interface LocalizedHomePageProps {
  locale: SupportedLocale;
}

const LocalizedHomePage = ({ locale }: LocalizedHomePageProps) => {
  const { i18n, t } = useTranslation();
  
  // Ensure i18n language is set correctly
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* SEO Head */}
      <SEOHead 
        path={`/${locale}`}
        title={t('hero.title')}
        description={t('hero.subtitle')}
      />
      
      {/* Particle Background */}
      <ParticleBackground />
      

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Header />
        <HeroSection />
        <ChatDemo />
        <FeatureShowcase />
        <AddonGallery />
        <DownloadSection />
        <Footer />
      </motion.div>
    </div>
  );
};

export default LocalizedHomePage;
