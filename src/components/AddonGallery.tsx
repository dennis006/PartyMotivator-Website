import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AddonGallery = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Echte Screenshots vom PartyMotivator Addon
  const screenshots = [
    {
      id: 1,
      title: t('gallery.screenshots.mainUI'),
      description: t('gallery.screenshots.mainUI'),
      category: "UI",
      image: "/images/screenshots/main-ui.png"
    },
    {
      id: 2,
      title: t('gallery.screenshots.chatIntegration'),
      description: t('gallery.screenshots.chatIntegration'),
      category: "In-Game",
      image: "/images/screenshots/chat-integration.png"
    },
    {
      id: 3,
      title: t('gallery.screenshots.mythicSetup'),
      description: t('gallery.screenshots.mythicSetup'),
      category: "Features",
      image: "/images/screenshots/mythic-plus-setup.png"
    },
    {
      id: 4,
      title: t('gallery.screenshots.holidayMessages'),
      description: t('gallery.screenshots.holidayMessages'),
      category: "Features", 
      image: "/images/screenshots/holiday-messages.png"
    },
    {
      id: 5,
      title: t('gallery.screenshots.profileManagement'),
      description: t('gallery.screenshots.profileManagement'),
      category: "UI",
      image: "/images/screenshots/profile-management.png"
    },
    {
      id: 6,
      title: t('gallery.screenshots.liveDemo'),
      description: t('gallery.screenshots.liveDemo'),
      category: "In-Game",
      image: "/images/screenshots/live-demo.png"
    }
  ]

  const categories = [
    { key: "All", label: t('gallery.categories.all') },
    { key: "UI", label: t('gallery.categories.ui') },
    { key: "In-Game", label: t('gallery.categories.ingame') },
    { key: "Features", label: t('gallery.categories.features') }
  ]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredScreenshots = activeCategory === "All" 
    ? screenshots 
    : screenshots.filter(img => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredScreenshots.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredScreenshots.length) % filteredScreenshots.length)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-slate-800 via-purple-900/30 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gaming font-bold mb-6">
            <span className="text-white">Addon </span>
            <span className="text-party-primary">{t('gallery.title')}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-party-primary/20">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-gradient-to-r from-party-primary to-party-secondary text-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Screenshot Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredScreenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-party-primary/20 group-hover:border-party-primary/40 transition-all duration-300">
                  {/* Echter Screenshot */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={screenshot.image} 
                      alt={screenshot.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback falls Bild nicht gefunden wird
                        e.currentTarget.style.display = 'none'
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement && nextElement.style) {
                          nextElement.style.display = 'flex'
                        }
                      }}
                    />
                    
                    {/* Fallback falls Bild nicht gefunden wird */}
                    <div className="absolute inset-0 bg-gradient-to-br from-party-primary/20 to-party-secondary/20 flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-6xl font-gaming opacity-20 text-party-primary">
                        PM
                      </div>
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Maximize2 className="w-12 h-12 text-white" />
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-4 right-4 bg-party-primary/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {screenshot.category}
                    </div>
                  </div>

                  {/* Screenshot info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-party-primary transition-colors">
                      {screenshot.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {screenshot.description}
                    </p>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-party-primary/10 to-party-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={24} />
              </motion.button>

              {/* Navigation buttons */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight size={24} />
              </motion.button>

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-party-primary/30">
                  {/* Echter Screenshot */}
                  <div className="aspect-video relative">
                    <img 
                      src={filteredScreenshots[selectedImage].image} 
                      alt={filteredScreenshots[selectedImage].title}
                      className="w-full h-full object-contain bg-black"
                      onError={(e) => {
                        // Fallback falls Bild nicht gefunden wird
                        e.currentTarget.style.display = 'none'
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement && nextElement.style) {
                          nextElement.style.display = 'flex'
                        }
                      }}
                    />
                    
                    {/* Fallback falls Bild nicht gefunden wird */}
                    <div className="absolute inset-0 bg-gradient-to-br from-party-primary/20 to-party-secondary/20 flex items-center justify-center" style={{display: 'none'}}>
                      <div className="text-8xl font-gaming opacity-30 text-party-primary">
                        PM
                      </div>
                    </div>
                  </div>
                  
                  {/* Image info */}
                  <div className="p-6 bg-slate-800/90 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {filteredScreenshots[selectedImage].title}
                    </h3>
                    <p className="text-slate-300">
                      {filteredScreenshots[selectedImage].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-400 mb-6">
            {t('gallery.cta')}
          </p>
          <motion.a
            href="#download"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-party-primary to-party-secondary text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 neon-glow"
          >
            <span>{t('hero.downloadCta')}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default AddonGallery
