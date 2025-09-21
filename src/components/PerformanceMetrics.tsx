import React from 'react';

const PerformanceMetrics: React.FC = () => {
  const assets = [
    { symbol: 'HYPE', return: '725.89%', sharpe: '2.18', price: '$53.79', maxDD: '-68.32%' },
    { symbol: 'TRON', return: '70.47%', sharpe: '0.82', price: '$0.35', maxDD: '-48.96%' },
    { symbol: 'BNB', return: '64.54%', sharpe: '1.24', price: '$1,077.04', maxDD: '-29.01%' },
    { symbol: 'ETH', return: '25.25%', sharpe: '0.61', price: '$4,482.99', maxDD: '-63.36%' },
    { symbol: 'SUI', return: '5.83%', sharpe: '0.48', price: '$3.65', maxDD: '-63.76%' },
    { symbol: 'SOL', return: '1.18%', sharpe: '0.37', price: '$240.46', maxDD: '-59.82%' },
    { symbol: 'AVAX', return: '-23.16%', sharpe: '0.11', price: '$32.97', maxDD: '-70.51%' },
    { symbol: 'APTOS', return: '-64.10%', sharpe: '-0.84', price: '$4.60', maxDD: '-73.30%' },
  ];

  return (
    <div className="card mb-6">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Asset Performance</h2>
        <p className="text-sm text-gray-400">Individual cryptocurrency returns and metrics</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Asset</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Price</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Total Return</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Sharpe</th>
              <th className="text-right py-2 px-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Max DD</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.symbol} className="table-row">
                <td className="py-2 px-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-white">{asset.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-3 text-right text-xs text-gray-300 font-mono">{asset.price}</td>
                <td className="py-2 px-3 text-right text-xs font-medium">
                  <span className={asset.return.startsWith('-') ? 'text-red-400' : 'text-green-400'}>
                    {asset.return}
                  </span>
                </td>
                <td className="py-2 px-3 text-right text-xs text-gray-300 font-mono">{asset.sharpe}</td>
                <td className="py-2 px-3 text-right text-xs font-medium">
                  <span className="text-red-400">
                    {asset.maxDD}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceMetrics;