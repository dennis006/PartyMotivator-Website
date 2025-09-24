export const ADDON_CONFIG = {
  // 📊 AKTUELLE ZAHLEN (HIER ÄNDERN!)
  DOWNLOADS: 57,           // ← Deine CurseForge Downloads
  VERSION: 'v1.3.0',       // ← Aktuelle Version
  RELEASE_DATE: '2025-09-22', // ← Release-Datum der aktuellen Version (für "New!" Badge)
  
  // 🔗 PROJEKT-INFOS
  PROJECT_ID: 1351399,
  CURSEFORGE_URL: 'https://www.curseforge.com/wow/addons/partymotivator',
  GITHUB_URL: 'https://github.com/dennis006/PartyMotivator',
  
  // 📈 ZUSÄTZLICHE STATS (optional)
  SUPPORTED_WOW_VERSIONS: ['10.2.5', '11.0'],
  TOTAL_MESSAGES: 50,      // Anzahl verschiedener Nachrichten im Addon
  FEATURES_COUNT: 8,       // Anzahl Hauptfeatures
  
  // 🎨 DISPLAY-OPTIONEN
  SHOW_PLUS_SYMBOL: true,  // Zeigt "57+" statt nur "57"
  ANIMATE_COUNTERS: true,  // Counter-Animationen
  
  // 🔄 AUTOMATISCHE FORMATIERUNG
  FORMAT_NUMBERS: true     // 1200 → "1.2k+", 15000 → "15k+"
} as const;

/**
 * QUICK-UPDATE FUNKTIONEN
 */
export const updateDownloads = (newCount: number) => {
  // Für zukünftige Admin-Oberfläche
  console.log(`Downloads updated: ${ADDON_CONFIG.DOWNLOADS} → ${newCount}`);
};

export const updateVersion = (newVersion: string) => {
  // Für zukünftige Admin-Oberfläche
  console.log(`Version updated: ${ADDON_CONFIG.VERSION} → ${newVersion}`);
};

/**
 * FORMATIERUNG FÜR DISPLAY
 */
export const getDisplayStats = () => {
  return {
    downloads: ADDON_CONFIG.DOWNLOADS,
    version: ADDON_CONFIG.VERSION,
    downloadsFormatted: ADDON_CONFIG.FORMAT_NUMBERS ? 
      formatNumber(ADDON_CONFIG.DOWNLOADS) : 
      ADDON_CONFIG.DOWNLOADS.toString(),
    isNew: isRecentRelease(ADDON_CONFIG.RELEASE_DATE)
  };
};

// Hilfsfunktionen
const formatNumber = (num: number): string => {
  if (!ADDON_CONFIG.FORMAT_NUMBERS) return num.toString();
  
  const suffix = ADDON_CONFIG.SHOW_PLUS_SYMBOL ? '+' : '';
  
  if (num >= 10000) {
    return `${Math.floor(num / 1000)}k${suffix}`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k${suffix}`;
  } else {
    return `${num}${suffix}`;
  }
};

const isRecentRelease = (dateString: string): boolean => {
  const releaseDate = new Date(dateString);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff <= 30; // Als "neu" für 30 Tage
};
