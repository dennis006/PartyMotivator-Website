import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DatenschutzProps {
  onClose: () => void
}

const Datenschutz = ({ onClose }: DatenschutzProps) => {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-party-primary/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-party-primary/20 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-gaming font-bold text-party-primary pr-2 flex items-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-lg sm:text-2xl">{t('legal.privacy.title')}</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-8">
          {/* General Information */}
          <div className="bg-slate-700/50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.privacy.general')}</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t('legal.privacy.generalText')}
            </p>
          </div>

          {/* Responsible Party */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-secondary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.privacy.responsible')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 text-xs sm:text-sm">
              <p className="text-slate-300">
                {t('legal.privacy.responsibleText')}
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.privacy.dataCollection')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.privacy.dataCollectionText')}
              </p>
              <div className="space-y-1 sm:space-y-2 mt-3 sm:mt-4">
                <p><strong className="text-party-primary">✓ {t('legal.privacy.gdprCompliant')}</strong></p>
                <p><strong className="text-party-primary">✓ {t('legal.privacy.privacyRespect')}</strong></p>
              </div>
            </div>
          </div>

          {/* Server Logs */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-secondary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.privacy.serverLogs')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.privacy.serverLogsText')}
              </p>
            </div>
          </div>

          {/* PartyMotivator Addon */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.privacy.addon')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.privacy.addonText')}
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
              <span className="text-sm sm:text-base">{t('legal.privacy.rights')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.privacy.rightsText')}
              </p>
              <p>
                <strong className="text-white">{t('legal.privacy.contact')}</strong><br />
                <a 
                  href="mailto:support@partymotivator.dev" 
                  className="text-party-primary hover:text-party-secondary transition-colors break-all"
                >
                  support@partymotivator.dev
                </a>
              </p>
            </div>
          </div>

          {/* Changes to Privacy Policy */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
              <span className="text-sm sm:text-base">{t('legal.privacy.changes')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.privacy.changesText')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-3 sm:p-4 rounded-b-xl sm:rounded-b-2xl">
          <div className="text-center text-xs sm:text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
              <div className="flex items-center justify-center gap-2">
                <span>{t('legal.privacy.lastUpdated')}: {new Date().toLocaleDateString()}</span>
                <span className="hidden sm:inline">|</span>
              </div>
              <span className="text-party-primary">{t('legal.privacy.gdprCompliant')}</span>
            </div>
            <p className="mt-1 sm:mt-2 text-xs">
              {t('legal.privacy.privacyRespect')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Datenschutz