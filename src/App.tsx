import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ChatDemo from './components/ChatDemo'
import FeatureShowcase from './components/FeatureShowcase'
import AddonGallery from './components/AddonGallery'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Loading wird jetzt vom LoadingScreen selbst gesteuert

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Mouse follower effect */}
      <div 
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 bg-gradient-radial from-party-primary/30 to-transparent transition-transform duration-300 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Header />
        <HeroSection />
        <ChatDemo />
        <FeatureShowcase />
        <AddonGallery />
        <DownloadSection />
        <Footer />
      </motion.div>
    </div>
  )
}

export default App
