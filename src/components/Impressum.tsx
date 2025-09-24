import { motion } from 'framer-motion'
import { ArrowLeft, User, Code, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ImpressumProps {
  onClose: () => void
}

const Impressum = ({ onClose }: ImpressumProps) => {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-party-primary/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-party-primary/20 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-gaming font-bold text-party-primary pr-2">
              {t('legal.impressum.title')}
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
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Angaben nach § 5 TMG */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.impressum.operator')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2">
              <p className="text-slate-300 text-sm sm:text-base">
                <strong className="text-white">{t('legal.impressum.responsible')}:</strong><br />
                xMethface
              </p>
              <p className="text-slate-300 text-sm sm:text-base">
                <strong className="text-white">{t('legal.impressum.contact')}:</strong><br />
                <a 
                  href="mailto:support@partymotivator.dev" 
                  className="text-party-primary hover:text-party-secondary transition-colors break-all"
                >
                  support@partymotivator.dev
                </a>
              </p>
            </div>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-secondary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.impressum.disclaimer')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                <strong className="text-white">{t('legal.impressum.contentLiability')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.contentLiabilityText')}</span>
              </p>
              <p>
                <strong className="text-white">{t('legal.impressum.linkLiability')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.linkLiabilityText')}</span>
              </p>
              <p>
                <strong className="text-white">{t('legal.impressum.copyright')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.copyrightText')}</span>
              </p>
            </div>
          </div>

          {/* Addon-spezifische Hinweise */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.impressum.addon')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                <strong className="text-white">{t('legal.impressum.useAtOwnRisk')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.useAtOwnRiskText')}</span>
              </p>
              <p>
                <strong className="text-white">{t('legal.impressum.wow')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.wowText')}</span>
              </p>
              <p>
                <strong className="text-white">{t('legal.impressum.openSource')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.openSourceText')}</span>
              </p>
            </div>
          </div>

          {/* Datenschutz */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
              <span className="text-sm sm:text-base">{t('legal.impressum.privacy')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-slate-300">
              <p>
                <strong className="text-white">{t('legal.impressum.noDataCollection')}:</strong><br />
                <span className="mt-1 inline-block">{t('legal.impressum.noDataCollectionText')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-3 sm:p-4 rounded-b-xl sm:rounded-b-2xl">
          <div className="text-center text-xs sm:text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
              <span>{t('legal.impressum.lastUpdated')}: {new Date().toLocaleDateString()}</span>
              <span className="hidden sm:inline">|</span>
              <span className="text-party-primary">{t('footer.copyright', { year: new Date().getFullYear() })}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Impressum