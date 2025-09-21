import React from 'react';

const ReportsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Portfolio Analysis Charts */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Portfolio Analysis</h3>
          <p className="text-xs text-gray-400">8-panel comprehensive analysis</p>
        </div>
        <div className="p-4">
          <img 
            src="/reports/portfolio_analysis.png" 
            alt="Portfolio Analysis Charts"
            className="w-full h-auto rounded border border-gray-700"
          />
        </div>
      </div>

      {/* Portfolio Optimization Comparison */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Strategy Optimization Comparison</h3>
          <p className="text-xs text-gray-400">Performance comparison across 7 strategies</p>
        </div>
        <div className="p-4">
          <img 
            src="/reports/portfolio_optimization_comparison.png" 
            alt="Portfolio Optimization Comparison"
            className="w-full h-auto rounded border border-gray-700"
          />
        </div>
      </div>

      {/* Efficient Frontier */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Efficient Frontier</h3>
          <p className="text-xs text-gray-400">Risk-return optimization curve</p>
        </div>
        <div className="p-4">
          <img 
            src="/reports/efficient_frontier.png" 
            alt="Efficient Frontier"
            className="w-full h-auto rounded border border-gray-700"
          />
        </div>
      </div>

      {/* Link to Full HTML Report */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Comprehensive Report</h3>
          <p className="text-xs text-gray-400">Full quantstats analysis report</p>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-2">
                View the complete portfolio analysis report with detailed metrics, 
                performance attribution, and risk analysis.
              </p>
              <div className="text-xs text-gray-400">
                Generated using quantstats library with comprehensive portfolio analytics
              </div>
            </div>
            <a 
              href="/reports/portfolio_report.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              View Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;