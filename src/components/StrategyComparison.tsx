import React from 'react';

const StrategyComparison: React.FC = () => {
  const strategies = [
    { name: 'Max Sharpe', return: '725.89%', sharpe: '2.18', allocation: '100% HYPE' },
    { name: 'Max Return', return: '89.20%', sharpe: '1.49', allocation: '93% BNB, 7% HYPE' },
    { name: 'Momentum', return: '73.10%', sharpe: '1.08', allocation: 'Multi-asset' },
    { name: 'Min Volatility', return: '64.54%', sharpe: '1.24', allocation: '100% BNB' },
    { name: 'Equal Weight', return: '50.98%', sharpe: '0.88', allocation: '12.5% each', current: true },
    { name: 'Risk Parity', return: '41.15%', sharpe: '0.80', allocation: 'Risk-weighted' },
    { name: 'Market Cap', return: '36.07%', sharpe: '0.74', allocation: 'Price-weighted' },
  ];

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Strategy Comparison</h3>
        <p className="text-sm text-gray-400">Portfolio optimization approaches</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-4 text-xs font-medium text-gray-400 uppercase tracking-wide">Strategy</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-gray-400 uppercase tracking-wide">Return</th>
              <th className="text-right py-2 px-4 text-xs font-medium text-gray-400 uppercase tracking-wide">Sharpe</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy, index) => (
              <tr key={strategy.name} className={`table-row ${strategy.current ? 'bg-primary/10' : ''}`}>
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">#{index + 1}</span>
                    <div>
                      <div className={`text-sm font-medium ${strategy.current ? 'text-primary' : 'text-white'}`}>
                        {strategy.name}
                      </div>
                      <div className="text-xs text-gray-500">{strategy.allocation}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 text-right text-sm font-medium text-success font-mono">
                  {strategy.return}
                </td>
                <td className="py-2 px-4 text-right text-sm text-gray-300 font-mono">
                  {strategy.sharpe}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategyComparison;