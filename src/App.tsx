import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import PortfolioOverview from './components/PortfolioOverview';
import PerformanceMetrics from './components/PerformanceMetrics';
import StrategyComparison from './components/StrategyComparison';
import ChartsSection from './components/ChartsSection';
import DataUpdateButton from './components/DataUpdateButton';

function App() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());

  const handleDataUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/update-data', {
        method: 'POST',
      });
      if (response.ok) {
        setLastUpdated(new Date().toISOString());
        // Refresh the page to load new data
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to update data:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Header />
        <DataUpdateButton 
          onUpdate={handleDataUpdate} 
          isUpdating={isUpdating}
          lastUpdated={lastUpdated}
        />
        <PortfolioOverview />
        
        {/* Asset Performance and Strategy Comparison side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <PerformanceMetrics />
          <StrategyComparison />
        </div>
        
        <ChartsSection />
      </div>
    </div>
  );
}

export default App;