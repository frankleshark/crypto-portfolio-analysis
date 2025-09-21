import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, AlertTriangle, Award, Activity } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  explanation: string;
  icon: React.ReactNode;
  type: 'positive' | 'negative' | 'neutral';
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, explanation, icon, type, delay }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getValueColor = () => {
    switch (type) {
      case 'positive': return 'text-primary-green';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-primary-blue';
      default: return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="metric-card cursor-pointer relative overflow-hidden"
      onClick={() => setShowExplanation(!showExplanation)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-primary-purple"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon}
          <h3 className="text-light-green font-semibold ml-3">{title}</h3>
        </div>
      </div>
      
      <div className={`text-4xl font-bold mb-4 ${getValueColor()}`}>
        {value}
      </div>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showExplanation ? 'auto' : 0, 
          opacity: showExplanation ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-primary-blue/10 p-4 rounded-xl border-l-4 border-primary-blue">
          <p className="text-light-blue text-sm leading-relaxed">
            <span className="font-semibold text-primary-blue">AI Analysis:</span> {explanation}
          </p>
        </div>
      </motion.div>
      
      {!showExplanation && (
        <p className="text-xs text-light-green/60 mt-2">Click for AI analysis</p>
      )}
    </motion.div>
  );
};

const MetricsGrid: React.FC = () => {
  const metrics = [
    {
      title: 'Total Portfolio Return',
      value: '50.98%',
      explanation: 'Your equal-weight portfolio delivered exceptional returns of 50.98% over ~10 months. This significantly outperforms traditional investment benchmarks (S&P 500 averages ~10% annually). The diversified approach captured gains from multiple cryptocurrencies while managing risk through equal allocation.',
      icon: <TrendingUp className="w-6 h-6 text-primary-green" />,
      type: 'positive' as const,
    },
    {
      title: 'Annualized Return',
      value: '40.87%',
      explanation: 'An annualized return of 40.87% places this portfolio in the top tier of investment performance. This metric normalizes the 10-month performance to a yearly basis, making it comparable to other investment strategies. This return compensates well for the cryptocurrency market\'s inherent volatility.',
      icon: <Award className="w-6 h-6 text-primary-green" />,
      type: 'positive' as const,
    },
    {
      title: 'Sharpe Ratio',
      value: '0.88',
      explanation: 'A Sharpe ratio of 0.88 is excellent for cryptocurrency portfolios. This risk-adjusted return metric shows you\'re earning 0.88 units of return for each unit of risk taken. Values above 0.5 are considered good, above 1.0 are excellent. Your portfolio efficiently balances risk and reward.',
      icon: <Target className="w-6 h-6 text-primary-green" />,
      type: 'positive' as const,
    },
    {
      title: 'Maximum Drawdown',
      value: '-52.16%',
      explanation: 'The maximum drawdown of -52.16% represents the largest peak-to-trough decline. While this seems significant, it\'s typical for crypto portfolios and shows the portfolio\'s resilience by recovering to deliver strong overall returns. This metric helps set realistic expectations for future volatility.',
      icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
      type: 'negative' as const,
    },
    {
      title: 'Win Rate',
      value: '52.48%',
      explanation: 'A win rate above 50% means more trading days were profitable than not. This 52.48% win rate, while modest, is healthy for a diversified crypto portfolio. It indicates consistent positive momentum despite the inherent volatility of cryptocurrency markets.',
      icon: <Shield className="w-6 h-6 text-primary-green" />,
      type: 'positive' as const,
    },
    {
      title: 'Portfolio Volatility',
      value: '58.21%',
      explanation: 'Annualized volatility of 58.21% is moderate for cryptocurrency investments. While higher than traditional assets, this level of volatility is well-compensated by the 40.87% annual return. The equal-weight approach helped reduce volatility compared to concentrated positions.',
      icon: <Activity className="w-6 h-6 text-primary-blue" />,
      type: 'neutral' as const,
    },
  ];

  return (
    <div className="mb-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold gradient-text mb-8"
      >
        📊 Key Performance Metrics
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;