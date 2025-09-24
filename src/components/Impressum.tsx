import { motion } from 'framer-motion'
import { ArrowLeft, Mail, User, Code, Heart } from 'lucide-react'

interface ImpressumProps {
  onClose: () => void
}

const Impressum = ({ onClose }: ImpressumProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-party-primary/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-party-primary/20 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-gaming font-bold text-party-primary">
              Impressum
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Angaben nach § 5 TMG */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-party-primary" />
              Angaben nach § 5 TMG
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
              <p className="text-slate-300">
                <strong className="text-white">Verantwortlich für den Inhalt:</strong><br />
                xMethface
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Kontakt:</strong><br />
                <a 
                  href="mailto:support@partymotivator.dev" 
                  className="text-party-primary hover:text-party-secondary transition-colors"
                >
                  support@partymotivator.dev
                </a>
              </p>
            </div>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2 text-party-secondary" />
              Haftungsausschluss
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Haftung für Inhalte:</strong><br />
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
              <p>
                <strong className="text-white">Haftung für Links:</strong><br />
                Unser Angebot enthält Links zu externen Websites Dritter. Für den Inhalt der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
              </p>
              <p>
                <strong className="text-white">Urheberrecht:</strong><br />
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              </p>
            </div>
          </div>

          {/* Addon-spezifische Hinweise */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-party-primary" />
              PartyMotivator Addon
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Nutzung auf eigene Gefahr:</strong><br />
                Das PartyMotivator Addon wird "wie es ist" zur Verfügung gestellt. Die Nutzung erfolgt auf eigene Gefahr.
              </p>
              <p>
                <strong className="text-white">World of Warcraft:</strong><br />
                World of Warcraft® ist ein eingetragenes Markenzeichen von Blizzard Entertainment, Inc. 
                PartyMotivator ist ein inoffizielles Addon und steht in keiner Verbindung zu Blizzard Entertainment.
              </p>
              <p>
                <strong className="text-white">Open Source:</strong><br />
                Dieses Projekt ist Open Source und wird ehrenamtlich für die WoW-Community entwickelt.
              </p>
            </div>
          </div>

          {/* Datenschutz */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Datenschutz
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 text-sm text-slate-300">
              <p>
                <strong className="text-white">Keine Datensammlung:</strong><br />
                Diese Website sammelt keine persönlichen Daten. Das PartyMotivator Addon läuft vollständig lokal auf deinem Computer.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-4 rounded-b-2xl">
          <div className="text-center text-xs text-slate-500">
            Stand: {new Date().toLocaleDateString('de-DE')} | 
            <span className="text-party-primary ml-1">Made with ❤️ for the WoW Community</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Impressum
