import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing addon...')
  const [textStartTime, setTextStartTime] = useState(Date.now())

  const loadingMessages = [
    'Initializing addon...',
    'Loading motivational messages...',
    'Connecting to party...',
    'Preparing dungeons...',
    'Ready for adventure!'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 8 + 2, 100)
        
        // Update loading text based on progress with minimum display time
        const currentTime = Date.now()
        const timeSinceLastChange = currentTime - textStartTime
        
        // Only change text if it's been displayed for at least 1.5 seconds
        if (timeSinceLastChange >= 1500) {
          if (newProgress < 15) {
            setLoadingText(loadingMessages[0])
            setTextStartTime(currentTime)
          } else if (newProgress < 35) {
            setLoadingText(loadingMessages[1])
            setTextStartTime(currentTime)
          } else if (newProgress < 55) {
            setLoadingText(loadingMessages[2])
            setTextStartTime(currentTime)
          } else if (newProgress < 75) {
            setLoadingText(loadingMessages[3])
            setTextStartTime(currentTime)
          } else {
            setLoadingText(loadingMessages[4])
            setTextStartTime(currentTime)
          }
        }
        
        return newProgress
      })
    }, 300) // Slower interval

    return () => clearInterval(interval)
  }, [textStartTime])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-party-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -10,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 10,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center neon-glow overflow-hidden">
            <img 
              src="/images/pm-icon.png" 
              alt="PartyMotivator Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-gaming font-bold mb-4 neon-text"
        >
          <span className="text-party-primary">Party</span>
          <span className="text-party-secondary">Motivator</span>
        </motion.h1>

        {/* Loading progress */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-slate-800 rounded-full h-4 overflow-hidden border-2 border-slate-600">
            <motion.div
              className="h-full bg-gradient-to-r from-party-primary to-party-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading text */}
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-slate-300 font-body typewriter min-h-[2rem] flex items-center justify-center"
        >
          {loadingText}
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-party-primary rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Version info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 text-sm"
        >
          Version 1.3.0 | by xMethface
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen
