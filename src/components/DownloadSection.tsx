import { motion } from 'framer-motion'
import { Download, Github, ExternalLink, Shield, Zap, Users, Star } from 'lucide-react'

const DownloadSection = () => {
  const downloadOptions = [
    {
      platform: "CurseForge",
      icon: ExternalLink,
      description: "Offizielle Version mit Auto-Updates",
      url: "https://www.curseforge.com/wow/addons/partymotivator",
      primary: true,
      stats: "38+ Downloads"
    },
    {
      platform: "GitHub",
      icon: Github,
      description: "Quellcode und Releases",
      url: "https://github.com/dennis006/PartyMotivator",
      primary: false,
      stats: "Open Source"
    },
    {
      platform: "Direct Download",
      icon: Download,
      description: "Direkte ZIP-Datei",
      url: "#", // Hier später echte URL
      primary: false,
      stats: "v1.3.0"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Sicher & Stabil",
      description: "Von tausenden Spielern getestet"
    },
    {
      icon: Zap,
      title: "Sofort Einsatzbereit",
      description: "Keine Konfiguration erforderlich"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Aktive Community & Updates"
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
          <h2 className="text-4xl lg:text-5xl font-gaming font-bold mb-6">
            <span className="text-white">Jetzt </span>
            <span className="text-party-primary">herunterladen</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            PartyMotivator ist kostenlos und in wenigen Minuten installiert. 
            Verbessere deine Dungeon-Erfahrung noch heute!
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
            Installation in 3 Schritten
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Download",
                description: "Lade PartyMotivator von CurseForge oder GitHub herunter"
              },
              {
                step: "2", 
                title: "Extrahieren",
                description: "Entpacke die Datei in deinen WoW AddOns Ordner"
              },
              {
                step: "3",
                title: "Spielen",
                description: "Starte WoW neu und genieße motivierende Nachrichten!"
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
          <h4 className="text-lg font-bold text-white mb-4">Systemanforderungen</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>World of Warcraft (Retail)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>Interface Version 120000+</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-party-primary" />
              <span>~1MB Festplattenspeicher</span>
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
