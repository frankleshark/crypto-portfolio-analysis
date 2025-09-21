import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Shield, BarChart3, DollarSign, Zap } from 'lucide-react';

interface PortfolioStrategy {
  rank: number;
  name: string;
  return: string;
  description: string;
  sharpe: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const PortfolioComparison: React.FC = () => {
  const strategies: PortfolioStrategy[] = [
    {
      rank: 1,
      name: 'Max Sharpe',
      return: '725.89%',
      description: '100% HYPE allocation',
      sharpe: '2.18',
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    },
    {
      rank: 2,
      name: 'Max Return',
      return: '89.20%',
      description: '93% BNB, 7% HYPE',
      sharpe: '1.49',
      icon: <TrendingUp className="w-8 h-8 text-primary-green" />,
    },
    {
      rank: 3,
      name: 'Momentum',
      return: '73.10%',
      description: 'Based on recent trends',
      sharpe: '1.08',
      icon: <Zap className="w-8 h-8 text-primary-blue" />,
    },
    {
      rank: 4,
      name: 'Min Volatility',
      return: '64.54%',
      description: '100% BNB allocation',
      sharpe: '1.24',
      icon: <Shield className="w-8 h-8 text-primary-purple" />,
    },
    {
      rank: 5,
      name: 'Equal Weight',
      return: '50.98%',
      description: '12.5% each asset',
      sharpe: '0.88',
      icon: <Target className="w-8 h-8 text-primary-green" />,
      highlight: true,
    },
    {
      rank: 6,
      name: 'Risk Parity',
      return: '41.15%',
      description: 'Risk-weighted allocation',
      sharpe: '0.80',
      icon: <BarChart3 className="w-8 h-8 text-light-blue" />,
    },
    {
      rank: 7,
      name: 'Market Cap',
      return: '36.07%',
      description: 'Price-weighted allocation',
      sharpe: '0.74',
      icon: <DollarSign className="w-8 h-8 text-light-purple" />,
    },
  ];

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8"
      >
        <h2 className="text-3xl font-bold gradient-text mb-6">
          🎯 Portfolio Strategy Comparison
        </h2>
        
        <p className="text-light-green mb-8 text-lg leading-relaxed">
          We analyzed 7 different portfolio optimization strategies to find the optimal weighting approach. 
          Here's how each strategy performed over the analysis period:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                glass-card p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2
                ${strategy.highlight 
                  ? 'border-2 border-primary-green shadow-lg shadow-primary-green/30 animate-pulse-glow' 
                  : 'hover:border-primary-purple/50'
                }
              `}
            >
              <div className="flex items-center justify-center mb-4">
                {strategy.rank === 1 && <Trophy className="w-6 h-6 text-yellow-400 mr-2" />}
                <span className={`text-2xl font-bold ${strategy.rank <= 3 ? 'text-primary-green' : 'text-light-purple'}`}>
                  #{strategy.rank}
                </span>
              </div>
              
              <div className="mb-4">
                {strategy.icon}
              </div>
              
              <h3 className="text-xl font-bold text-light-purple mb-3">
                {strategy.name}
              </h3>
              
              <div className="text-3xl font-bold text-primary-green mb-3">
                {strategy.return}
              </div>
              
              <p className="text-light-blue text-sm mb-3 leading-relaxed">
                {strategy.description}
              </p>
              
              <div className="text-sm text-light-green">
                <span className="font-semibold">Sharpe:</span> {strategy.sharpe}
              </div>
              
              {strategy.highlight && (
                <div className="mt-4 p-2 bg-primary-green/20 rounded-lg border border-primary-green/40">
                  <p className="text-primary-green text-xs font-semibold">
                    Your Current Strategy
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-medium-purple/30 to-medium-blue/30 rounded-xl border border-primary-purple/30"
        >
          <h3 className="text-xl font-bold text-primary-purple mb-4">
            💡 Strategy Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-light-blue">
            <div>
              <p className="mb-2">
                <span className="font-semibold text-primary-green">Best Risk-Adjusted:</span> Max Sharpe (2.18 Sharpe ratio)
              </p>
              <p className="mb-2">
                <span className="font-semibold text-primary-blue">Most Stable:</span> Min Volatility (39.80% volatility)
              </p>
            </div>
            <div>
              <p className="mb-2">
                <span className="font-semibold text-primary-purple">Best Diversified:</span> Equal Weight (your approach)
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Highest Return:</span> Max Sharpe (725.89% total return)
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PortfolioComparison;