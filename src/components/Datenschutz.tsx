import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Globe } from 'lucide-react'

interface DatenschutzProps {
  onClose: () => void
}

const Datenschutz = ({ onClose }: DatenschutzProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-party-primary/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-party-primary/20 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-gaming font-bold text-party-primary flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              Datenschutzerklärung
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
        <div className="p-6 space-y-8">
          {/* Einleitung */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-party-primary" />
              Allgemeine Hinweise
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. 
              Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck 
              der Verarbeitung von personenbezogenen Daten durch diese Website.
            </p>
          </div>

          {/* Verantwortlicher */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-party-secondary" />
              Verantwortlicher
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Verantwortlicher:</strong> xMethface
              </p>
              <p className="text-slate-300">
                <strong className="text-white">Kontakt:</strong> 
                <a 
                  href="mailto:support@partymotivator.dev" 
                  className="text-party-primary hover:text-party-secondary transition-colors ml-1"
                >
                  support@partymotivator.dev
                </a>
              </p>
            </div>
          </div>

          {/* Datenerfassung */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Database className="w-5 h-5 mr-2 text-party-primary" />
              Datenerfassung auf dieser Website
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Keine Datensammlung:</strong><br />
                Diese Website sammelt <strong className="text-party-primary">keine persönlichen Daten</strong> von Ihnen.
              </p>
              <p>
                <strong className="text-white">Keine Cookies:</strong><br />
                Es werden keine Cookies gesetzt oder persönliche Daten gespeichert.
              </p>
              <p>
                <strong className="text-white">Keine Analytics:</strong><br />
                Es wird kein Google Analytics oder ähnliche Tracking-Tools verwendet.
              </p>
              <p>
                <strong className="text-white">Keine Newsletter:</strong><br />
                Es gibt keine Newsletter-Anmeldung oder E-Mail-Marketing.
              </p>
            </div>
          </div>

          {/* Server-Logs */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-party-secondary" />
              Server-Logdateien
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Automatische Erfassung:</strong><br />
                Bei jedem Aufruf der Website werden automatisch folgende Informationen gespeichert:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP-Adresse (anonymisiert)</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem</li>
              </ul>
              <p>
                <strong className="text-white">Zweck:</strong> Sicherstellung der Funktionsfähigkeit und Sicherheit der Website.
              </p>
              <p>
                <strong className="text-white">Speicherdauer:</strong> Diese Daten werden nach spätestens 30 Tagen automatisch gelöscht.
              </p>
            </div>
          </div>

          {/* PartyMotivator Addon */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-party-primary" />
              PartyMotivator Addon
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Lokale Verarbeitung:</strong><br />
                Das PartyMotivator Addon läuft <strong className="text-party-primary">vollständig lokal</strong> auf Ihrem Computer.
              </p>
              <p>
                <strong className="text-white">Keine Datenübertragung:</strong><br />
                Es werden <strong className="text-party-primary">keine Daten</strong> an Server übertragen oder extern gespeichert.
              </p>
              <p>
                <strong className="text-white">Keine Kommunikation:</strong><br />
                Das Addon kommuniziert nur mit dem World of Warcraft Client, nicht mit externen Servern.
              </p>
              <p>
                <strong className="text-white">Datenschutz:</strong><br />
                Alle Nachrichten und Einstellungen bleiben auf Ihrem Computer und werden nicht geteilt.
              </p>
            </div>
          </div>

          {/* Ihre Rechte */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Ihre Rechte
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                Da wir keine personenbezogenen Daten verarbeiten, sind die meisten DSGVO-Rechte nicht anwendbar. 
                Sollten Sie dennoch Fragen haben, können Sie sich jederzeit an uns wenden.
              </p>
              <p>
                <strong className="text-white">Kontakt für Datenschutzanfragen:</strong><br />
                <a 
                  href="mailto:support@partymotivator.dev" 
                  className="text-party-primary hover:text-party-secondary transition-colors"
                >
                  support@partymotivator.dev
                </a>
              </p>
            </div>
          </div>

          {/* Änderungen */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">
              Änderungen dieser Datenschutzerklärung
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 text-sm text-slate-300">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. 
                Die aktuelle Version finden Sie stets auf dieser Seite.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-4 rounded-b-2xl">
          <div className="text-center text-xs text-slate-500">
            <p>
              Stand: {new Date().toLocaleDateString('de-DE')} | 
              <span className="text-party-primary ml-1">DSGVO-konform</span>
            </p>
            <p className="mt-1">
              Diese Website respektiert Ihre Privatsphäre und sammelt keine persönlichen Daten.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Datenschutz
