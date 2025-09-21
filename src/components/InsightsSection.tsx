import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Shield, Lightbulb, Download, ExternalLink, BarChart3 } from 'lucide-react';

interface InsightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const InsightCard: React.FC<InsightProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start p-6 bg-white/5 rounded-xl border border-primary-green/20 hover:border-primary-green/40 transition-all duration-300"
  >
    <div className="flex-shrink-0 mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-primary-green mb-3">{title}</h3>
      <p className="text-light-blue leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const InsightsSection: React.FC = () => {
  const insights = [
    {
      icon: <Target className="w-8 h-8 text-primary-green" />,
      title: 'Diversification Success',
      description: 'Your equal-weight strategy successfully captured HYPE\'s exceptional performance (725% return) while maintaining exposure to stable assets like BNB. This approach balanced the portfolio and prevented over-concentration in any single asset.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-blue" />,
      title: 'Risk-Adjusted Excellence',
      description: 'With a Sharpe ratio of 0.88, your portfolio efficiently converted risk into returns. The 58.21% volatility was well-compensated by 40.87% annual returns, demonstrating effective risk management in a volatile market.',
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-purple" />,
      title: 'Optimization Opportunities',
      description: 'Analysis shows that a "Max Return" approach (93% BNB, 7% HYPE) could have delivered 89.20% returns with lower drawdowns (-28.26% vs -52.16%). Consider this for future rebalancing while maintaining diversification principles.',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      title: 'Future Considerations',
      description: 'The momentum strategy (73.10% returns) shows promise for dynamic allocation. Consider periodic rebalancing based on momentum indicators while maintaining core equal-weight principles to capture emerging opportunities.',
    },
  ];

  const actionButtons = [
    {
      label: 'Download Full Report',
      icon: <Download className="w-5 h-5" />,
      href: '#',
      primary: true,
    },
    {
      label: 'View Raw Data',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '#',
      primary: false,
    },
    {
      label: 'Export Charts',
      icon: <ExternalLink className="w-5 h-5" />,
      href: '#',
      primary: false,
    },
  ];

  return (
    <div className="mb-12">
      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 mb-8"
      >
        <h2 className="text-3xl font-bold gradient-text mb-6">
          🧠 AI-Generated Key Insights
        </h2>
        
        <p className="text-light-green mb-8 text-lg leading-relaxed">
          Our AI analysis has identified key patterns and opportunities in your portfolio performance. 
          These insights can help guide your future investment decisions.
        </p>
        
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <InsightCard
              key={insight.title}
              {...insight}
              delay={index * 0.2}
            />
          ))}
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card p-8 mb-8 bg-gradient-to-r from-medium-purple/30 to-medium-blue/30 border-primary-purple/30"
      >
        <h2 className="text-3xl font-bold text-primary-purple mb-6">
          📊 Performance Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-green mb-2">50.98%</div>
            <div className="text-light-purple">Total Portfolio Return</div>
            <div className="text-sm text-light-blue mt-1">Over 10 months</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-blue mb-2">0.88</div>
            <div className="text-light-purple">Sharpe Ratio</div>
            <div className="text-sm text-light-blue mt-1">Excellent risk-adjusted returns</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">725%</div>
            <div className="text-light-purple">Best Asset (HYPE)</div>
            <div className="text-sm text-light-blue mt-1">Star performer</div>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-xl border border-primary-purple/30">
          <h3 className="text-xl font-bold text-primary-purple mb-4">Bottom Line</h3>
          <p className="text-light-blue leading-relaxed">
            The equal-weight cryptocurrency portfolio delivered <span className="font-bold text-primary-green">50.98% returns</span> with a 
            <span className="font-bold text-primary-blue"> 0.88 Sharpe ratio</span> over 10 months, significantly outperforming traditional benchmarks 
            while maintaining reasonable diversification. HYPE was the star performer (725% returns), while BNB provided stability. 
            The analysis shows multiple optimization opportunities for enhanced risk-adjusted returns.
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {actionButtons.map((button, index) => (
          <motion.a
            key={button.label}
            href={button.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300
              ${button.primary
                ? 'bg-gradient-to-r from-primary-green to-primary-blue text-black hover:shadow-lg hover:shadow-primary-green/30 hover:transform hover:-translate-y-1'
                : 'bg-white/10 text-white border border-primary-purple/50 hover:bg-white/20 hover:border-primary-purple hover:transform hover:-translate-y-1'
              }
            `}
          >
            {button.icon}
            <span>{button.label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-12 text-center text-light-blue/60 text-sm"
      >
        <p>Analysis Period: November 29, 2024 - September 21, 2025 | 8 Cryptocurrencies | 304 Trading Days</p>
        <p className="mt-2">Built with React, TypeScript, and Chart.js | Data sourced from CoinGecko API</p>
      </motion.div>
    </div>
  );
};

export default InsightsSection;