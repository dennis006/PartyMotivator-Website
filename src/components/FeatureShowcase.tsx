import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Users, 
  Zap, 
  Settings, 
  Calendar, 
  Trophy,
  Clock,
  Shield,
  Heart,
  Star
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAddonStatsSimple as useAddonStats, formatDownloads } from '../hooks/useAddonStats-simple'
import { ADDON_CONFIG } from '../config/addonConfig'

const FeatureShowcase = () => {
  const { t } = useTranslation()
  const { downloads, version, loading } = useAddonStats()
  
  // Helper function für "New!" Badge
  const isNewRelease = () => {
    const releaseDate = new Date(ADDON_CONFIG.RELEASE_DATE);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 30; // Als "neu" für 30 Tage
  };
  
  const features = [
    {
      icon: MessageCircle,
      title: t('features.items.autoMessages.title'),
      description: t('features.items.autoMessages.description'),
      color: "from-party-primary to-green-400",
      delay: 0.1
    },
    {
      icon: Users,
      title: t('features.items.autoGreetings.title'),
      description: t('features.items.autoGreetings.description'),
      color: "from-blue-400 to-party-primary",
      delay: 0.2
    },
    {
      icon: Zap,
      title: t('features.items.smartTiming.title'),
      description: t('features.items.smartTiming.description'),
      color: "from-party-secondary to-red-400",
      delay: 0.3
    },
    {
      icon: Trophy,
      title: t('features.items.mythicSuccess.title'),
      description: t('features.items.mythicSuccess.description'),
      color: "from-yellow-400 to-party-secondary",
      delay: 0.4
    },
    {
      icon: Calendar,
      title: t('features.items.holidayMessages.title'),
      description: t('features.items.holidayMessages.description'),
      color: "from-purple-400 to-pink-400",
      delay: 0.5
    },
    {
      icon: Settings,
      title: t('features.items.customizable.title'),
      description: t('features.items.customizable.description'),
      color: "from-party-primary to-blue-400",
      delay: 0.6
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: t('features.benefits.teamMorale.title'),
      description: t('features.benefits.teamMorale.description')
    },
    {
      icon: Clock,
      title: t('features.benefits.timeSaving.title'),
      description: t('features.benefits.timeSaving.description')
    },
    {
      icon: Shield,
      title: t('features.benefits.errorPrevention.title'),
      description: t('features.benefits.errorPrevention.description')
    },
    {
      icon: Star,
      title: t('features.benefits.successRate.title'),
      description: t('features.benefits.successRate.description')
    }
  ]

  return (
    <section id="features" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity }
          }}
          className="absolute -top-32 -right-32 w-64 h-64 border border-party-primary/10 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity }
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 border border-party-secondary/10 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gaming font-bold mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, _) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-party-primary/20 h-full relative overflow-hidden hover:border-party-primary/40 transition-all duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative z-10`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-party-primary/20 to-party-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-gaming font-bold mb-4 text-party-secondary">
            {t('features.benefits.title')}
          </h3>
          <p className="text-lg text-slate-400">
            {t('features.benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-party-secondary/20 hover:border-party-secondary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-party-secondary to-party-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                {benefit.title}
              </h4>
              <p className="text-slate-400 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-party-primary/10 via-party-secondary/10 to-party-primary/10 rounded-3xl p-8 border border-party-primary/20 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-party-primary mb-2"
              >
                {loading ? '...' : formatDownloads(downloads)}
              </motion.div>
              <div className="text-slate-300">{t('features.stats.downloads')}</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-party-secondary mb-2"
              >
                {loading ? '...' : version}
              </motion.div>
              <div className="text-slate-300">{t('features.stats.currentVersion')}</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-party-primary mb-2"
              >
                {isNewRelease() ? t('features.stats.fresh') : `${ADDON_CONFIG.FEATURES_COUNT}+`}
              </motion.div>
              <div className="text-slate-300">
                {isNewRelease() ? "Latest Update" : "Features"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureShowcase
