import React from 'react';

const PortfolioOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Total Return</div>
        <div className="text-2xl font-semibold text-success mt-1">50.98%</div>
        <div className="text-xs text-gray-500 mt-1">10 months</div>
      </div>
      
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Annual Return</div>
        <div className="text-2xl font-semibold text-success mt-1">40.87%</div>
        <div className="text-xs text-gray-500 mt-1">Annualized</div>
      </div>
      
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Sharpe Ratio</div>
        <div className="text-2xl font-semibold text-primary mt-1">0.88</div>
        <div className="text-xs text-gray-500 mt-1">Risk-adjusted</div>
      </div>
      
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Max Drawdown</div>
        <div className="text-2xl font-semibold text-danger mt-1">-52.16%</div>
        <div className="text-xs text-gray-500 mt-1">Peak to trough</div>
      </div>
      
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Volatility</div>
        <div className="text-2xl font-semibold text-warning mt-1">58.21%</div>
        <div className="text-xs text-gray-500 mt-1">Annualized</div>
      </div>
      
      <div className="metric-card">
        <div className="text-xs text-gray-400 uppercase tracking-wide">Win Rate</div>
        <div className="text-2xl font-semibold text-primary mt-1">52.48%</div>
        <div className="text-xs text-gray-500 mt-1">Daily wins</div>
      </div>
    </div>
  );
};

export default PortfolioOverview;