import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2, Zap, TrendingDown } from 'lucide-react';

interface AssetData {
  symbol: string;
  name: string;
  return: string;
  sharpe: string;
  price: string;
  description: string;
  analysis: string;
  icon: React.ReactNode;
  type: 'star' | 'stable' | 'consistent' | 'underperform';
}

const AssetPerformance: React.FC = () => {
  const assets: AssetData[] = [
    {
      symbol: 'HYPE',
      name: 'Hyperliquid',
      return: '725.89%',
      sharpe: '2.18',
      price: '$53.79',
      description: 'Star Performer',
      analysis: 'HYPE was the portfolio\'s superstar, delivering over 725% returns with a remarkable Sharpe ratio of 2.18. This asset single-handedly drove much of the portfolio\'s outperformance. Its inclusion demonstrates the value of diversification in capturing breakout opportunities.',
      icon: <Rocket className="w-8 h-8 text-yellow-400" />,
      type: 'star',
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      return: '64.54%',
      sharpe: '1.24',
      price: '$1,077.04',
      description: 'Stability Provider',
      analysis: 'BNB provided the best risk-adjusted foundation with strong 64.54% returns and lowest volatility (39.80%). This asset proved to be the portfolio\'s anchor, providing stability while still delivering solid growth. Essential for risk management.',
      icon: <Building2 className="w-8 h-8 text-primary-blue" />,
      type: 'stable',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      return: '25.25%',
      sharpe: '0.61',
      price: '$4,482.99',
      description: 'Consistent Growth',
      analysis: 'Ethereum delivered steady 25.25% returns with moderate volatility. As the second-largest cryptocurrency, ETH provided portfolio stability and consistent growth, serving as a reliable core holding in the diversified approach.',
      icon: <Zap className="w-8 h-8 text-primary-green" />,
      type: 'consistent',
    },
    {
      symbol: 'TRON',
      name: 'Tron',
      return: '70.47%',
      sharpe: '0.82',
      price: '$0.35',
      description: 'Strong Performer',
      analysis: 'TRON delivered impressive 70.47% returns with a solid 0.82 Sharpe ratio. This asset contributed significantly to portfolio performance while maintaining reasonable risk levels, showcasing the benefits of including diverse blockchain ecosystems.',
      icon: <TrendingDown className="w-8 h-8 text-primary-purple" />,
      type: 'consistent',
    },
  ];

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'star':
        return 'border-yellow-400/50 shadow-yellow-400/20 hover:shadow-yellow-400/40';
      case 'stable':
        return 'border-primary-blue/50 shadow-primary-blue/20 hover:shadow-primary-blue/40';
      case 'consistent':
        return 'border-primary-green/50 shadow-primary-green/20 hover:shadow-primary-green/40';
      default:
        return 'border-primary-purple/50 shadow-primary-purple/20 hover:shadow-primary-purple/40';
    }
  };

  const getReturnColor = (type: string) => {
    switch (type) {
      case 'star':
        return 'text-yellow-400';
      case 'stable':
        return 'text-primary-blue';
      case 'consistent':
        return 'text-primary-green';
      default:
        return 'text-primary-purple';
    }
  };

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8"
      >
        <h2 className="text-3xl font-bold gradient-text mb-6">
          📊 Individual Asset Performance
        </h2>
        
        <p className="text-light-green mb-8 text-lg leading-relaxed">
          Deep dive into how each cryptocurrency contributed to your portfolio's success. 
          Each asset played a unique role in the overall performance story.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`
                glass-card p-6 transition-all duration-300 hover:transform hover:-translate-y-2
                ${getCardStyle(asset.type)}
              `}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {asset.icon}
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white">
                      {asset.symbol}
                    </h3>
                    <p className="text-light-green text-sm">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getReturnColor(asset.type)}`}>
                    {asset.return}
                  </div>
                  <p className="text-light-blue text-sm">Total Return</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-green">
                    {asset.sharpe}
                  </div>
                  <p className="text-light-blue text-xs">Sharpe Ratio</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-blue">
                    {asset.price}
                  </div>
                  <p className="text-light-blue text-xs">Latest Price</p>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                    asset.type === 'star' ? 'bg-yellow-400/20 text-yellow-400' :
                    asset.type === 'stable' ? 'bg-primary-blue/20 text-primary-blue' :
                    'bg-primary-green/20 text-primary-green'
                  }`}>
                    {asset.description}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-xl border-l-4 border-primary-blue">
                <p className="text-light-blue text-sm leading-relaxed">
                  <span className="font-semibold text-primary-blue">AI Analysis:</span> {asset.analysis}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Assets Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-medium-green/30 to-medium-blue/30 rounded-xl border border-primary-green/30"
        >
          <h3 className="text-xl font-bold text-primary-green mb-4">
            📈 Other Portfolio Assets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-primary-blue">SOL</div>
              <div className="text-primary-green">1.18%</div>
              <div className="text-light-blue text-xs">$240.46</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-blue">AVAX</div>
              <div className="text-red-400">-23.16%</div>
              <div className="text-light-blue text-xs">$32.97</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-blue">APTOS</div>
              <div className="text-red-400">-64.10%</div>
              <div className="text-light-blue text-xs">$4.60</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-blue">SUI</div>
              <div className="text-primary-green">5.83%</div>
              <div className="text-light-blue text-xs">$3.65</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AssetPerformance;