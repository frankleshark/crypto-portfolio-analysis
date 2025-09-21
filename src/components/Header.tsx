import React from 'react';
import { TrendingUp, Calendar, Coins } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="glass-card p-8 mb-8 text-center glow-border">
      <div className="flex items-center justify-center mb-4">
        <TrendingUp className="w-12 h-12 text-primary-green mr-4" />
        <h1 className="text-5xl font-bold gradient-text">
          Crypto Portfolio Dashboard
        </h1>
      </div>
      
      <p className="text-xl text-light-green mb-6 opacity-90">
        Equal-Weight Cryptocurrency Index Analysis with Advanced Optimization
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 text-light-blue">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="font-semibold">Period:</span>
          <span className="ml-2">November 2024 - September 2025</span>
        </div>
        <div className="flex items-center">
          <Coins className="w-5 h-5 mr-2" />
          <span className="font-semibold">Assets:</span>
          <span className="ml-2">ETH, SOL, HYPE, BNB, AVAX, TRON, APTOS, SUI</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-primary-green/10 rounded-xl border border-primary-green/30">
        <p className="text-primary-green font-semibold text-lg">
          🏆 Portfolio delivered <span className="text-2xl">50.98%</span> returns with a <span className="text-2xl">0.88</span> Sharpe ratio
        </p>
      </div>
    </div>
  );
};

export default Header;