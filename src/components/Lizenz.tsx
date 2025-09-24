import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Heart, Code, Users, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LizenzProps {
  onClose: () => void
}

const Lizenz = ({ onClose }: LizenzProps) => {
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
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-lg sm:text-2xl">{t('legal.license.title')}</span>
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
          {/* License Overview */}
          <div className="bg-slate-700/50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.license.overview')}</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t('legal.license.overviewText')}
            </p>
          </div>

          {/* What you can do */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-secondary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.license.allowed')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="mb-2 sm:mb-3">{t('legal.license.allowedText')}</p>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.allowedItems.use')}</p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.allowedItems.modify')}</p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.allowedItems.distribute')}</p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.allowedItems.sublicense')}</p>
              </div>
            </div>
          </div>

          {/* What you must do */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.license.required')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="mb-2 sm:mb-3">{t('legal.license.requiredText')}</p>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.requiredItems.copyright')}</p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.requiredItems.disclaimer')}</p>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <p>{t('legal.license.requiredItems.warranty')}</p>
              </div>
            </div>
          </div>

          {/* Full MIT License */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-primary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.license.fullText')}</span>
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-slate-400 overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">
                {t('legal.license.fullTextContent')}
              </pre>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-party-secondary flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('legal.license.community')}</span>
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300">
              <p>
                {t('legal.license.communityText')}
              </p>
              <p>
                <strong className="text-white">{t('legal.license.contribute')}</strong><br />
                <span className="mt-1 inline-block">{t('legal.license.contributeItems')}</span>
              </p>
              <p>
                <strong className="text-white">{t('legal.license.communityJoin')}</strong><br />
                <span className="mt-1 inline-block">{t('legal.license.communityJoinText')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-3 sm:p-4 rounded-b-xl sm:rounded-b-2xl">
          <div className="text-center text-xs sm:text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2">
              <span>{t('legal.license.footer')}</span>
            </div>
            <p className="mt-1 sm:mt-2 text-xs">
              {t('legal.license.footerText')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Lizenz