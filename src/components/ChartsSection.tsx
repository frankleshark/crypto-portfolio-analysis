import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const ChartsSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState('cumulative');

  // Sample data - in a real app, this would come from your CSV files
  const cumulativeReturnsData = {
    labels: ['Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025'],
    datasets: [
      {
        label: 'Equal Weight Portfolio',
        data: [0, 5.2, 12.8, -8.4, 15.6, 28.3, 35.7, 42.1, 38.9, 45.2, 50.98],
        borderColor: '#00FFA7',
        backgroundColor: 'rgba(0, 255, 167, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'HYPE',
        data: [0, 45.2, 125.8, 89.4, 245.6, 428.3, 535.7, 642.1, 598.9, 685.2, 725.89],
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'BNB',
        data: [0, 8.2, 18.8, 12.4, 25.6, 38.3, 45.7, 52.1, 48.9, 58.2, 64.54],
        borderColor: '#008EFF',
        backgroundColor: 'rgba(0, 142, 255, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'ETH',
        data: [0, 3.2, 8.8, -2.4, 12.6, 18.3, 22.7, 28.1, 24.9, 26.2, 25.25],
        borderColor: '#9900FF',
        backgroundColor: 'rgba(153, 0, 255, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const allocationData = {
    labels: ['ETH', 'SOL', 'HYPE', 'BNB', 'AVAX', 'TRON', 'APTOS', 'SUI'],
    datasets: [
      {
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: [
          '#9900FF',
          '#FF6B6B',
          '#FFD700',
          '#008EFF',
          '#FF8C00',
          '#00FFA7',
          '#FF69B4',
          '#32CD32',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const riskReturnData = {
    datasets: [
      {
        label: 'Cryptocurrencies',
        data: [
          { x: 62.65, y: 20.59, label: 'ETH' },
          { x: 71.53, y: 0.98, label: 'SOL' },
          { x: 104.51, y: 478.88, label: 'HYPE' },
          { x: 39.80, y: 51.31, label: 'BNB' },
          { x: 77.90, y: -19.67, label: 'AVAX' },
          { x: 92.31, y: 55.83, label: 'TRON' },
          { x: 71.13, y: -57.34, label: 'APTOS' },
          { x: 87.65, y: 4.82, label: 'SUI' },
        ],
        backgroundColor: [
          '#9900FF',
          '#FF6B6B',
          '#FFD700',
          '#008EFF',
          '#FF8C00',
          '#00FFA7',
          '#FF69B4',
          '#32CD32',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
        pointRadius: 8,
      },
      {
        label: 'Portfolio',
        data: [{ x: 58.21, y: 40.87 }],
        backgroundColor: '#00FFA7',
        borderColor: '#FFFFFF',
        borderWidth: 3,
        pointRadius: 12,
        pointStyle: 'star',
      },
    ],
  };

  const performanceComparisonData = {
    labels: ['Max Sharpe', 'Max Return', 'Momentum', 'Min Volatility', 'Equal Weight', 'Risk Parity', 'Market Cap'],
    datasets: [
      {
        label: 'Total Return (%)',
        data: [725.89, 89.20, 73.10, 64.54, 50.98, 41.15, 36.07],
        backgroundColor: [
          '#FFD700',
          '#00FFA7',
          '#008EFF',
          '#9900FF',
          '#FF6B6B',
          '#FF8C00',
          '#32CD32',
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#C6D8FF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00FFA7',
        bodyColor: '#C6D8FF',
        borderColor: '#00FFA7',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#C6D8FF',
        },
        grid: {
          color: 'rgba(198, 216, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#C6D8FF',
        },
        grid: {
          color: 'rgba(198, 216, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#C6D8FF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00FFA7',
        bodyColor: '#C6D8FF',
        borderColor: '#00FFA7',
        borderWidth: 1,
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#C6D8FF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00FFA7',
        bodyColor: '#C6D8FF',
        borderColor: '#00FFA7',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const point = context.raw;
            return `${point.label}: Risk ${point.x.toFixed(1)}%, Return ${point.y.toFixed(1)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Annual Volatility (%)',
          color: '#C6D8FF',
        },
        ticks: {
          color: '#C6D8FF',
        },
        grid: {
          color: 'rgba(198, 216, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Annual Return (%)',
          color: '#C6D8FF',
        },
        ticks: {
          color: '#C6D8FF',
        },
        grid: {
          color: 'rgba(198, 216, 255, 0.1)',
        },
      },
    },
  };

  const chartTabs = [
    { id: 'cumulative', label: 'Cumulative Returns', icon: '📈' },
    { id: 'allocation', label: 'Portfolio Allocation', icon: '🥧' },
    { id: 'riskreturn', label: 'Risk vs Return', icon: '⚖️' },
    { id: 'comparison', label: 'Strategy Comparison', icon: '📊' },
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'cumulative':
        return <Line data={cumulativeReturnsData} options={chartOptions} />;
      case 'allocation':
        return <Doughnut data={allocationData} options={doughnutOptions} />;
      case 'riskreturn':
        return <Scatter data={riskReturnData} options={scatterOptions} />;
      case 'comparison':
        return <Bar data={performanceComparisonData} options={chartOptions} />;
      default:
        return <Line data={cumulativeReturnsData} options={chartOptions} />;
    }
  };

  const getChartDescription = () => {
    switch (activeChart) {
      case 'cumulative':
        return 'Track how your portfolio and individual assets performed over time. The equal-weight approach provided steady growth while HYPE delivered exceptional returns.';
      case 'allocation':
        return 'Your equal-weight strategy allocates 12.5% to each of the 8 cryptocurrencies, providing balanced exposure across different blockchain ecosystems.';
      case 'riskreturn':
        return 'Visualize the risk-return profile of each asset. The portfolio (star) balances risk and return effectively compared to individual cryptocurrencies.';
      case 'comparison':
        return 'Compare different optimization strategies. While Max Sharpe delivered the highest returns, your equal-weight approach provided excellent diversification.';
      default:
        return '';
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
          📊 Interactive Portfolio Analytics
        </h2>
        
        <p className="text-light-green mb-8 text-lg leading-relaxed">
          Explore your portfolio's performance through interactive visualizations. 
          Each chart reveals different aspects of your investment strategy and outcomes.
        </p>
        
        {/* Chart Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                ${activeChart === tab.id
                  ? 'bg-primary-green text-black shadow-lg shadow-primary-green/30'
                  : 'bg-white/10 text-light-blue hover:bg-white/20 hover:text-white'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Chart Container */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 rounded-xl p-6 mb-6"
        >
          <div className="h-96">
            {renderChart()}
          </div>
        </motion.div>
        
        {/* Chart Description */}
        <motion.div
          key={`${activeChart}-desc`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-primary-blue/10 p-4 rounded-xl border-l-4 border-primary-blue"
        >
          <p className="text-light-blue leading-relaxed">
            <span className="font-semibold text-primary-blue">Chart Insight:</span> {getChartDescription()}
          </p>
        </motion.div>
        
        {/* Key Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-primary-green">304</div>
            <div className="text-light-blue text-sm">Trading Days</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-primary-blue">8</div>
            <div className="text-light-blue text-sm">Cryptocurrencies</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-primary-purple">7</div>
            <div className="text-light-blue text-sm">Strategies Tested</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">1st</div>
            <div className="text-light-blue text-sm">HYPE Performance</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChartsSection;