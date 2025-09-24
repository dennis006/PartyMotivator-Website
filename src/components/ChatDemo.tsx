import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

const ChatDemo = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<any[]>([])

  const demoScenario = [
    {
      delay: 1000,
      type: 'system',
      message: 'You have entered Mythic Keystone: The Necrotic Wake (+15)',
      timestamp: '19:42:01'
    },
    {
      delay: 2000,
      type: 'party-motivator',
      message: 'Ready to crush this timer?',
      timestamp: '19:42:03'
    },
    {
      delay: 1500,
      type: 'player',
      player: 'Shadowmage',
      message: 'Let\'s do this!',
      timestamp: '19:42:05'
    },
    {
      delay: 800,
      type: 'player',
      player: 'Healbot',
      message: 'Buffs ready',
      timestamp: '19:42:06'
    },
    {
      delay: 2000,
      type: 'system',
      message: 'Challenge started! Good luck!',
      timestamp: '19:42:09'
    },
    {
      delay: 3000,
      type: 'system',
      message: 'Blightbone defeated!',
      timestamp: '19:45:32'
    },
    {
      delay: 3500,
      type: 'system',
      message: 'Amarth defeated!',
      timestamp: '19:48:15'
    },
    {
      delay: 4000,
      type: 'system',
      message: 'Surgeon Stitchflesh defeated!',
      timestamp: '19:52:03'
    },
    {
      delay: 3500,
      type: 'system',
      message: 'Nalthor the Rimebinder defeated!',
      timestamp: '19:55:41'
    },
    {
      delay: 3000,
      type: 'system',
      message: 'Mythic Keystone completed! (+2 levels)',
      timestamp: '19:55:44',
      success: true
    },
    {
      delay: 1000,
      type: 'party-motivator',
      message: 'Perfectly timed! Key upgraded!',
      timestamp: '19:55:45',
      celebration: true
    },
    {
      delay: 1500,
      type: 'player',
      player: 'Shadowmage',
      message: 'GG team!',
      timestamp: '19:55:47'
    },
    {
      delay: 800,
      type: 'player',
      player: 'Healbot',
      message: 'Great run!',
      timestamp: '19:55:48'
    }
  ]

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentStep < demoScenario.length) {
        const newMessage = {
          ...demoScenario[currentStep],
          id: Date.now() + Math.random()
        }
        setMessages(prev => [...prev, newMessage])
        setCurrentStep(prev => prev + 1)
      } else {
        // Reset demo
        setTimeout(() => {
          setMessages([])
          setCurrentStep(0)
        }, 3000)
      }
    }, currentStep === 0 ? 1000 : demoScenario[currentStep - 1]?.delay || 1000)

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying])

  const resetDemo = () => {
    setMessages([])
    setCurrentStep(0)
    setIsPlaying(true)
  }

  const getMessageStyle = (message: any) => {
    switch (message.type) {
      case 'system':
        return message.success 
          ? 'text-green-400' 
          : 'text-yellow-400'
      case 'party-motivator':
        return message.celebration
          ? 'text-party-primary font-bold animate-pulse'
          : 'text-party-primary'
      case 'player':
        return 'text-blue-300'
      default:
        return 'text-white'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 skew-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-gaming font-bold mb-6">
            <span className="text-party-primary">Live</span>{" "}
            <span className="text-white">Demo</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Erlebe PartyMotivator in Aktion! Sieh dir an, wie das Addon automatisch 
            motivierende Nachrichten sendet und dein Team zum Erfolg führt.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-party-primary/20">
              <h3 className="text-2xl font-gaming font-bold mb-4 text-party-primary">
                Demo Steuerung
              </h3>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isPlaying 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetDemo}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>Reset</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Demo Fortschritt</span>
                    <span>{currentStep}/{demoScenario.length}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-party-primary to-party-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / demoScenario.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="text-sm text-slate-400">
                  <p className="mb-2">
                    <strong className="text-party-primary">Szenario:</strong> Mythic+ Dungeon Run
                  </p>
                  <p>
                    PartyMotivator sendet automatisch motivierende Nachrichten 
                    zu Beginn und gratuliert bei erfolgreichem Abschluss.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-party-secondary/20">
              <h4 className="text-lg font-bold mb-3 text-party-secondary">Features in Demo</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-party-primary rounded-full"></div>
                  <span>Automatische Motivationsnachrichten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-party-primary rounded-full"></div>
                  <span>Erfolgsnachrichten bei Key-Upgrade</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-party-primary rounded-full"></div>
                  <span>Intelligente Timing-Erkennung</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-party-primary rounded-full"></div>
                  <span>Team-Moral Boost</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Chat Interface */}
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl border-2 border-party-primary/30 overflow-hidden shadow-2xl">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 border-b border-party-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Party Chat</span>
                  </div>
                  <div className="text-party-primary text-sm font-gaming">
                    PartyMotivator Active
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-2 font-mono text-sm">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`${getMessageStyle(message)}`}
                    >
                      <span className="text-slate-500 text-xs">
                        [{message.timestamp}]
                      </span>{" "}
                      {message.type === 'party-motivator' && (
                        <span className="text-party-primary font-bold">
                          [Party] PartyMotivator: 
                        </span>
                      )}
                      {message.type === 'player' && (
                        <span className="text-blue-400">
                          [Party] {message.player}: 
                        </span>
                      )}
                      {message.type === 'system' && (
                        <span className="text-yellow-400">
                          System: 
                        </span>
                      )}
                      <span className="ml-1">{message.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Chat Input (disabled) */}
              <div className="border-t border-party-primary/20 p-3">
                <div className="bg-slate-700 rounded px-3 py-2 text-slate-400 text-sm">
                  PartyMotivator handles this automatically...
                </div>
              </div>
            </div>

            {/* Floating indicators */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 right-4 bg-party-primary text-black px-3 py-1 rounded-full text-xs font-bold"
            >
              AUTO
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ChatDemo
