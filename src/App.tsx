import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MetricsGrid from './components/MetricsGrid';
import PortfolioComparison from './components/PortfolioComparison';
import AssetPerformance from './components/AssetPerformance';
import ChartsSection from './components/ChartsSection';
import InsightsSection from './components/InsightsSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-green via-dark-blue to-dark-purple">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MetricsGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PortfolioComparison />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <AssetPerformance />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ChartsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <InsightsSection />
        </motion.div>
      </div>
    </div>
  );
}

export default App;