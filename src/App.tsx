import React from 'react';
import Header from './components/Header';
import PortfolioOverview from './components/PortfolioOverview';
import PerformanceMetrics from './components/PerformanceMetrics';
import StrategyComparison from './components/StrategyComparison';
import ChartsSection from './components/ChartsSection';

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Header />
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