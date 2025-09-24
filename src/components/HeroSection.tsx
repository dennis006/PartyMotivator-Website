import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Star, Users, MessageCircle, Gamepad2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const HeroSection = () => {
  const { t } = useTranslation()
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const motivationalMessages = [
    "Let's time this key!",
    "Ready for some big pulls?",
    "Time to show what we're made of!",
    "Clean run incoming!",
    "Focus up, we've got this!",
    "Smooth and steady wins.",
    "Perfect execution time!"
  ]

  const stats = [
    { icon: Users, value: "38+", label: t('hero.stats.downloads') },
    { icon: MessageCircle, value: "500+", label: t('hero.stats.messages') },
    { icon: Star, value: t('hero.stats.new'), label: t('hero.stats.addon') },
    { icon: Gamepad2, value: "v1.3.0", label: t('hero.stats.version') }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length)
        setIsTyping(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Large decorative circles */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 border border-party-primary/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 -right-20 w-72 h-72 border border-party-secondary/20 rounded-full"
        />
        
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 ${
              i % 2 === 0 ? 'bg-party-primary/30' : 'bg-party-secondary/30'
            } rotate-45`}
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45, 135, 45],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-party-primary/10 border border-party-primary/20 rounded-full text-party-primary text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 mr-2" />
                {t('hero.title')}
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-gaming font-bold mb-6 leading-tight"
            >
              <span className="text-party-primary glitch" data-text="Party">
                Party
              </span>
              <br />
              <span className="text-party-secondary">
                Motivator
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-300 mb-8 max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Dynamic message preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="chat-window p-4 mb-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-party-primary rounded-full animate-pulse"></div>
                <span className="text-party-primary text-sm font-medium">
                  [Party] PartyMotivator:
                </span>
              </div>
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-white font-medium ${isTyping ? 'typewriter' : ''}`}
              >
                {motivationalMessages[currentMessage]}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#download"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-party-primary to-party-secondary text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-300 neon-glow"
              >
                <Download className="w-6 h-6" />
                <span>{t('hero.downloadCta')}</span>
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-party-primary text-party-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-party-primary/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-6 h-6" />
                <span>{t('hero.demoCta')}</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, _) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-party-primary/20"
                >
                  <stat.icon className="w-8 h-8 text-party-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* 3D Addon Preview */}
            <div className="tilt-card">
              <div className="tilt-card-inner relative">
                {/* Mock WoW Interface */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-party-primary/30 shadow-2xl">
                  {/* Interface Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-party-primary text-sm font-gaming">
                      PartyMotivator v1.3.0
                    </div>
                  </div>

                  {/* Mock Chat Interface */}
                  <div className="space-y-3">
                    <div className="text-yellow-400 text-sm">
                      [19:42:01] You have entered The Necrotic Wake.
                    </div>
                    <div className="text-party-primary text-sm">
                      [19:42:03] [Party] PartyMotivator: Let's time this key!
                    </div>
                    <div className="text-blue-400 text-sm">
                      [19:42:05] [Party] Player1: Let's go!
                    </div>
                    <div className="text-green-400 text-sm">
                      [19:42:07] [Party] Player2: Ready!
                    </div>
                  </div>

                  {/* Health/Mana bars simulation */}
                  <div className="mt-6 space-y-2">
                    <div className="health-bar h-3 w-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-yellow-400"
                        animate={{ width: ["100%", "85%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    <div className="mana-bar h-3 w-full">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        animate={{ width: ["100%", "60%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating UI elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-party-primary text-black px-3 py-1 rounded-full text-sm font-bold"
                >
                  LIVE
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
