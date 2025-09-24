import { useState } from 'react';
import { ADDON_CONFIG } from '../config/addonConfig';

interface AddonStats {
  downloads: number;
  version: string;
  loading: boolean;
  error: string | null;
}

/**
 * Vereinfachte Version für manuelle Updates
 * Verwendet addonConfig.ts für zentrale Konfiguration
 */
export const useAddonStatsSimple = () => {
  const [stats] = useState<AddonStats>({
    downloads: ADDON_CONFIG.DOWNLOADS,    // Aus zentraler Konfiguration
    version: ADDON_CONFIG.VERSION,        // Aus zentraler Konfiguration  
    loading: false,
    error: null
  });

  return stats;
};

/**
 * Formatiert Download-Zahlen benutzerfreundlich
 */
export const formatDownloads = (downloads: number): string => {
  if (downloads >= 10000) {
    return `${Math.floor(downloads / 1000)}k+`;
  } else if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}k+`;
  } else if (downloads >= 100) {
    return `${downloads}+`;
  } else {
    return `${downloads}+`;
  }
};

// Exportiere beide Versionen
export { useAddonStats } from './useAddonStats';

// Konfiguration ist jetzt in config/addonConfig.ts zentralisiert
