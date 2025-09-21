import React from 'react';

const ChartsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Cumulative Returns - Full Width */}
      <div className="bg-slate-800 rounded-lg border border-slate-700">
        <div className="p-3 border-b border-slate-700">
          <h3 className="text-sm font-medium text-white">Cumulative Returns</h3>
          <p className="text-xs text-slate-400">Portfolio vs Individual Assets</p>
        </div>
        <div className="p-4">
          <img 
            src="reports/cumulative_returns.png" 
            alt="Cumulative Returns Chart"
            className="w-full h-auto rounded border border-slate-700"
            onError={(e) => {
              console.log('Failed to load cumulative_returns.png');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Portfolio Drawdown */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Portfolio Drawdown</h3>
            <p className="text-xs text-slate-400">Peak-to-trough declines</p>
          </div>
          <div className="p-4">
            <img 
              src="reports/portfolio_drawdown.png" 
              alt="Portfolio Drawdown"
              className="w-full h-auto rounded border border-slate-700"
              onError={(e) => {
                console.log('Failed to load portfolio_drawdown.png');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Return Distribution */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Return Distribution</h3>
            <p className="text-xs text-slate-400">Daily return frequency</p>
          </div>
          <div className="p-4">
            <img 
              src="reports/return_distribution.png" 
              alt="Return Distribution"
              className="w-full h-auto rounded border border-slate-700"
              onError={(e) => {
                console.log('Failed to load return_distribution.png');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Three Column Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Correlation Matrix */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Correlation Matrix</h3>
            <p className="text-xs text-slate-400">Asset correlations</p>
          </div>
          <div className="p-4">
            <img 
              src="reports/correlation_matrix.png" 
              alt="Correlation Matrix"
              className="w-full h-auto rounded border border-slate-700"
              onError={(e) => {
                console.log('Failed to load correlation_matrix.png');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Portfolio Weights by Strategy */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Strategy Weights</h3>
            <p className="text-xs text-slate-400">Allocation comparison</p>
          </div>
          <div className="p-4">
            <img 
              src="reports/strategy_weights.png" 
              alt="Strategy Weights"
              className="w-full h-auto rounded border border-slate-700"
              onError={(e) => {
                console.log('Failed to load strategy_weights.png');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Efficient Frontier */}
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-3 border-b border-slate-700">
            <h3 className="text-sm font-medium text-white">Efficient Frontier</h3>
            <p className="text-xs text-slate-400">Risk-return optimization</p>
          </div>
          <div className="p-4">
            <img 
              src="reports/efficient_frontier.png" 
              alt="Efficient Frontier"
              className="w-full h-auto rounded border border-slate-700"
              onError={(e) => {
                console.log('Failed to load efficient_frontier.png');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;