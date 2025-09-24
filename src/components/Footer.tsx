import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Mail, Code, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Impressum from './Impressum'
import Datenschutz from './Datenschutz'
import Lizenz from './Lizenz'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [showImpressum, setShowImpressum] = useState(false)
  const [showDatenschutz, setShowDatenschutz] = useState(false)
  const [showLizenz, setShowLizenz] = useState(false)

  const links = {
    addon: [
      { name: t('footer.navigation.download'), href: "#download" },
      { name: t('footer.navigation.features'), href: "#features" },
      { name: t('footer.navigation.gallery'), href: "#gallery" },
      { name: "Changelog", href: "#" }
    ],
    community: [
      { name: t('footer.community.github'), href: "https://github.com/dennis006/PartyMotivator", external: true },
      { name: t('footer.community.curseforge'), href: "https://www.curseforge.com/wow/addons/partymotivator", external: true },
      { name: t('footer.community.discord'), href: "https://discord.gg/bUsnWHAqRG", external: true },
      { name: t('footer.support.discord'), href: "https://discord.gg/bUsnWHAqRG", external: true }
    ],
    legal: [
      { name: t('footer.legal.impressum'), href: "#", action: () => setShowImpressum(true) },
      { name: t('footer.legal.privacy'), href: "#", action: () => setShowDatenschutz(true) },
      { name: t('footer.legal.license'), href: "#", action: () => setShowLizenz(true) }
    ]
  }

  return (
    <footer className="relative bg-slate-900 border-t border-party-primary/20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity }
          }}
          className="absolute -top-20 -left-20 w-40 h-40 border border-party-primary/5 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 25, repeat: Infinity }
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 border border-party-secondary/5 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
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
                    WOW ADDON
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {t('footer.brandDescription')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg">
                  <div className="text-lg font-bold text-party-primary">38+</div>
                  <div className="text-xs text-slate-500">{t('hero.stats.downloads')}</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg">
                  <div className="text-lg font-bold text-party-secondary">v1.3.0</div>
                  <div className="text-xs text-slate-500">{t('footer.latest')}</div>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              {/* Addon Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-white mb-4 font-gaming">
                  {t('footer.navigation.title')}
                </h3>
                <ul className="space-y-3">
                  {links.addon.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5, color: "#00ff88" }}
                        className="text-slate-400 hover:text-party-primary transition-colors text-sm flex items-center space-x-2"
                      >
                        <span>{link.name}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-white mb-4 font-gaming">
                  {t('footer.community.title')}
                </h3>
                <ul className="space-y-3">
                  {links.community.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        whileHover={{ x: 5, color: "#ff6600" }}
                        className="text-slate-400 hover:text-party-secondary transition-colors text-sm flex items-center space-x-2"
                      >
                        <span>{link.name}</span>
                        {link.external && <ExternalLink size={12} />}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-white mb-4 font-gaming">
                  {t('footer.legal.title')}
                </h3>
                <ul className="space-y-3">
                  {links.legal.map((link) => (
                    <li key={link.name}>
                      <motion.button
                        onClick={link.action || (() => {})}
                        whileHover={{ x: 5, color: "#00ff88" }}
                        className="text-slate-400 hover:text-party-primary transition-colors text-sm text-left"
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-6 border-t border-slate-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>
                {t('footer.copyright', { year: currentYear })}
              </span>
              <div className="flex items-center space-x-1">
                <Code size={14} />
                <span>Open Source</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/dennis006/PartyMotivator"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-slate-800 hover:bg-party-primary/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-party-primary transition-all duration-300 border border-slate-700 hover:border-party-primary/40"
              >
                <Github size={18} />
              </motion.a>
              
              <motion.a
                href="mailto:support@partymotivator.dev"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-slate-800 hover:bg-party-secondary/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-party-secondary transition-all duration-300 border border-slate-700 hover:border-party-secondary/40"
              >
                <Mail size={18} />
              </motion.a>

              <motion.a
                href="https://discord.gg/bUsnWHAqRG"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-slate-800 hover:bg-discord-600/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-discord-400 transition-all duration-300 border border-slate-700 hover:border-discord-600/40"
              >
                <Users size={18} />
              </motion.a>
            </div>
          </div>

          {/* World of Warcraft Disclaimer */}
          <div className="mt-6 pt-6 border-t border-slate-800/50">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              {t('footer.disclaimer')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-party-primary to-transparent opacity-50"></div>

      {/* Modals */}
      {showImpressum && (
        <Impressum onClose={() => setShowImpressum(false)} />
      )}
      
      {showDatenschutz && (
        <Datenschutz onClose={() => setShowDatenschutz(false)} />
      )}
      
      {showLizenz && (
        <Lizenz onClose={() => setShowLizenz(false)} />
      )}
    </footer>
  )
}

export default Footer
