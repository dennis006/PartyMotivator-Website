/**
 * Main App Component
 * Sets up i18n and routing for the PartyMotivator website
 */

import { useState } from 'react';
import AppRouter from './AppRouter';
import LoadingScreen from './components/LoadingScreen';

// Initialize i18n
import './i18n/i18n';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return <AppRouter />;
}

export default App;
