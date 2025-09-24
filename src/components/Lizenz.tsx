import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Github, Heart, Code, Users, Shield } from 'lucide-react'

interface LizenzProps {
  onClose: () => void
}

const Lizenz = ({ onClose }: LizenzProps) => {
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
              <FileText className="w-6 h-6 mr-3" />
              MIT Lizenz
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
          {/* Lizenz-Übersicht */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-party-primary" />
              PartyMotivator - Open Source Lizenz
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              PartyMotivator ist unter der <strong className="text-party-primary">MIT-Lizenz</strong> veröffentlicht. 
              Diese Lizenz ermöglicht es dir, das Addon frei zu nutzen, zu modifizieren und zu verbreiten.
            </p>
          </div>

          {/* Was du darfst */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2 text-party-secondary" />
              Was du mit PartyMotivator machen darfst
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Kostenlos nutzen</strong> - Das Addon ist vollständig kostenlos</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Kopieren und verteilen</strong> - Du kannst es mit Freunden teilen</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Modifizieren</strong> - Du kannst den Code anpassen</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Kommerziell nutzen</strong> - Auch in kommerziellen Projekten</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Forken</strong> - Du kannst deine eigene Version erstellen</p>
              </div>
            </div>
          </div>

          {/* Was du beachten musst */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-party-primary" />
              Was du beachten musst
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Lizenzhinweis beibehalten</strong> - Copyright-Notiz nicht entfernen</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Haftungsausschluss</strong> - Nutzung auf eigene Gefahr</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <p><strong className="text-white">Keine Garantie</strong> - Software kommt "wie sie ist"</p>
              </div>
            </div>
          </div>

          {/* Vollständige MIT-Lizenz */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-party-secondary" />
              Vollständige MIT-Lizenz
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 text-xs font-mono text-slate-300 leading-relaxed">
              <p className="mb-4">
                <strong className="text-white">MIT License</strong><br />
                <br />
                Copyright (c) 2025 xMethface
              </p>
              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy<br />
                of this software and associated documentation files (the "Software"), to deal<br />
                in the Software without restriction, including without limitation the rights<br />
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br />
                copies of the Software, and to permit persons to whom the Software is<br />
                furnished to do so, subject to the following conditions:
              </p>
              <p className="mb-4">
                The above copyright notice and this permission notice shall be included in all<br />
                copies or substantial portions of the Software.
              </p>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br />
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br />
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br />
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br />
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br />
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE<br />
                SOFTWARE.
              </p>
            </div>
          </div>

          {/* GitHub Repository */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Github className="w-5 h-5 mr-2 text-party-primary" />
              Quellcode
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 text-sm text-slate-300">
              <p className="mb-3">
                Der vollständige Quellcode von PartyMotivator ist auf GitHub verfügbar:
              </p>
              <a 
                href="https://github.com/dennis006/PartyMotivator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-party-secondary" />
              Community & Beitragen
            </h3>
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-sm text-slate-300">
              <p>
                PartyMotivator wird <strong className="text-party-primary">ehrenamtlich</strong> für die WoW-Community entwickelt.
              </p>
              <p>
                <strong className="text-white">Beitragen:</strong><br />
                - Bug Reports auf GitHub<br />
                - Feature Requests auf Discord<br />
                - Pull Requests für Verbesserungen<br />
                - Screenshots und Feedback teilen
              </p>
              <p>
                <strong className="text-white">Community:</strong><br />
                Trete unserem Discord Server bei für Support und Diskussionen!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/90 backdrop-blur-sm border-t border-party-primary/20 p-4 rounded-b-2xl">
          <div className="text-center text-xs text-slate-500">
            <p>
              MIT License | 
              <span className="text-party-primary ml-1">Open Source für die Community</span>
            </p>
            <p className="mt-1">
              PartyMotivator - Entwickelt mit ❤️ für World of Warcraft Spieler
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Lizenz
