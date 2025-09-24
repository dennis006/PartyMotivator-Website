import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('footer.navigation.features'), href: '#features' },
    { name: t('footer.navigation.gallery'), href: '#gallery' },
    { name: t('footer.navigation.download'), href: '#download' },
    { name: t('header.github'), href: 'https://github.com/dennis006/PartyMotivator', external: true },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-party-primary/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center neon-glow overflow-hidden">
              <img 
                src="/images/pm-icon.png" 
                alt="PartyMotivator Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-gaming">
              <div className="text-xl font-bold">
                <span className="text-party-primary">Party</span>
                <span className="text-party-secondary">Motivator</span>
              </div>
              <div className="text-xs text-slate-400 tracking-wider">
                WOW ADDON v1.3.0
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-300 hover:text-party-primary transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-party-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* CTA Button */}
            <motion.a
              href="#download"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 255, 136, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-party-primary to-party-secondary text-black px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <Download size={16} />
              <span>{t('header.download')}</span>
            </motion.a>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-party-primary hover:text-party-secondary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-md border-t border-party-primary/20"
      >
        <div className="px-4 py-6 space-y-4">
          {navigation.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              whileHover={{ x: 10, color: "#00ff88" }}
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-300 hover:text-party-primary transition-colors duration-200 font-medium py-2"
            >
              {item.name}
            </motion.a>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="py-2">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile CTA */}
          <motion.a
            href="#download"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(false)}
            className="block w-full bg-gradient-to-r from-party-primary to-party-secondary text-black px-4 py-3 rounded-lg font-semibold text-center mt-4 hover:shadow-lg transition-all duration-300"
          >
            <Download size={16} className="inline mr-2" />
            Download Addon
          </motion.a>
        </div>
      </motion.div>

      {/* Gaming UI decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-party-primary to-transparent opacity-50"></div>
    </motion.header>
  )
}

export default Header
