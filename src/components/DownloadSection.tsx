import { motion } from 'framer-motion'
import { Download, Github, ExternalLink, Shield, Zap, Users, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAddonStatsSimple as useAddonStats, formatDownloads } from '../hooks/useAddonStats-simple'

const DownloadSection = () => {
  const { t } = useTranslation()
  const { downloads } = useAddonStats()
  
  const downloadOptions = [
    {
      platform: "CurseForge",
      icon: ExternalLink,
      description: t('download.curseforge.description'),
      url: "https://www.curseforge.com/wow/addons/partymotivator",
      primary: true,
      stats: `${formatDownloads(downloads)} Downloads`
    },
    {
      platform: "GitHub",
      icon: Github,
      description: t('download.github.description'),
      url: "https://github.com/dennis006/PartyMotivator",
      primary: false,
      stats: "Open Source"
    },
    {
      platform: "Direct Download",
      icon: Download,
      description: t('download.direct.description'),
      url: "#", // Hier später echte URL
      primary: false,
      stats: "v1.3.0"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: t('download.features.secure.title'),
      description: t('download.features.secure.description')
    },
    {
      icon: Zap,
      title: t('download.features.ready.title'),
      description: t('download.features.ready.description')
    },
    {
      icon: Users,
      title: t('download.features.community.title'),
      description: t('download.features.community.description')
    }
  ]

  return (
    <section id="download" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px',
                 animation: 'grid-move 20s linear infinite'
               }} 
          />
        </div>
        
        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-party-primary/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + (i * 2),
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gaming font-bold mb-6">
            {t('download.title')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('download.subtitle')}
          </p>
        </motion.div>

        {/* Download Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {downloadOptions.map((option, index) => (
            <motion.div
              key={option.platform}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <motion.a
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block p-6 rounded-2xl border transition-all duration-300 ${
                  option.primary
                    ? 'bg-gradient-to-br from-party-primary/20 to-party-secondary/20 border-party-primary/40 hover:border-party-primary/60'
                    : 'bg-slate-800/50 border-party-primary/20 hover:border-party-primary/40'
                } backdrop-blur-sm hover:shadow-xl`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  option.primary 
                    ? 'bg-gradient-to-br from-party-primary to-party-secondary' 
                    : 'bg-slate-700'
                }`}>
                  <option.icon className={`w-8 h-8 ${
                    option.primary ? 'text-black' : 'text-party-primary'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-party-primary transition-colors">
                  {option.platform}
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  {option.description}
                </p>
                <div className={`text-xs font-medium ${
                  option.primary ? 'text-party-primary' : 'text-party-secondary'
                }`}>
                  {option.stats}
                </div>

                {/* Primary badge */}
                {option.primary && (
                  <div className="absolute top-4 right-4 bg-party-secondary text-black px-2 py-1 rounded-full text-xs font-bold">
                    EMPFOHLEN
                  </div>
                )}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Installation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-party-primary/20 mb-16"
        >
          <h3 className="text-2xl font-gaming font-bold mb-6 text-center text-party-primary">
            {t('download.installation.title')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: t('download.installation.step1Title'),
                description: t('download.installation.step1Description')
              },
              {
                step: "2", 
                title: t('download.installation.step2Title'),
                description: t('download.installation.step2Description')
              },
              {
                step: "3",
                title: t('download.installation.step3Title'),
                description: t('download.installation.step3Description')
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-party-primary to-party-secondary rounded-full flex items-center justify-center text-black font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-party-primary/20 hover:border-party-primary/40 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-party-primary/20 to-party-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-party-primary" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h4 className="text-lg font-bold text-white mb-4">{t('download.requirements.title')}</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>{t('download.requirements.wow')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>{t('download.requirements.interface')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>{t('download.requirements.storage')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add CSS for grid animation */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  )
}

export default DownloadSection
