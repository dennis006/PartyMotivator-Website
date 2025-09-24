import { useState, useEffect } from 'react';

interface AddonStats {
  downloads: number;
  version: string;
  loading: boolean;
  error: string | null;
}

/**
 * Custom Hook für dynamische Addon-Statistiken
 * Holt aktuelle Download-Zahlen ausschließlich von CurseForge API (Project ID: 1351399)
 */
export const useAddonStats = () => {
  const [stats, setStats] = useState<AddonStats>({
    downloads: 57, // Fallback: Deine aktuelle Zahl
    version: 'v1.3.0',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: null }));

        // CurseForge API v1 mit direkter Project ID: 1351399
        const response = await fetch(
          `https://api.curseforge.com/v1/mods/1351399`,
          {
            headers: {
              'Accept': 'application/json',
              // Öffentlicher Endpunkt - kein API Key nötig für basic info
            }
          }
        );

        if (!response.ok) {
          throw new Error(`CurseForge API Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.data) {
          const addon = data.data;
          
          setStats({
            downloads: addon.downloadCount || 57,
            version: addon.latestFilesIndexes?.[0]?.filename || addon.latestFiles?.[0]?.displayName || 'v1.3.0',
            loading: false,
            error: null
          });
        } else {
          throw new Error('Addon-Daten nicht verfügbar');
        }

      } catch (error) {
        console.error('CurseForge API failed:', error);
        
        // Fallback: Deine aktuellen Zahlen (nur CurseForge, kein GitHub)
        setStats({
          downloads: 57, // Deine aktuelle Zahl!
          version: 'v1.3.0',
          loading: false,
          error: 'CurseForge API nicht verfügbar - zeige aktuelle Zahlen'
        });
      }
    };

    // Initial fetch
    fetchStats();

    // Auto-Update alle 10 Minuten
    const interval = setInterval(fetchStats, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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

/**
 * Utility für manuelle Stats-Updates (falls nötig)
 */
export const updateStatsManually = (newStats: Partial<AddonStats>) => {
  // Könnte für Admin-Interface verwendet werden
  console.log('Manual stats update:', newStats);
};
