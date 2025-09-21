import React from 'react';
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

const ChartsGrid: React.FC = () => {
  // Chart options with professional styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
          font: { size: 11 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#6B7280', font: { size: 10 } },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#6B7280', font: { size: 10 } },
        grid: { color: '#374151' },
      },
    },
  };

  // Cumulative Returns Data
  const cumulativeReturnsData = {
    labels: ['Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25'],
    datasets: [
      {
        label: 'Portfolio',
        data: [0, 5.2, 12.8, -8.4, 15.6, 28.3, 35.7, 42.1, 38.9, 45.2, 50.98],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'HYPE',
        data: [0, 45.2, 125.8, 85.4, 245.6, 428.3, 535.7, 642.1, 598.9, 685.2, 725.89],
        borderColor: '#A855F7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'BNB',
        data: [0, 8.2, 18.8, 12.4, 25.6, 38.3, 45.7, 52.1, 48.9, 58.2, 64.54],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Portfolio Drawdown Data
  const drawdownData = {
    labels: ['Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25'],
    datasets: [
      {
        label: 'Drawdown',
        data: [0, -2.1, -5.8, -18.4, -12.6, -8.3, -5.7, -2.1, -8.9, -5.2, -3.2],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Return Distribution Data
  const returnDistributionData = {
    labels: ['-15%', '-10%', '-5%', '0%', '5%', '10%', '15%', '20%'],
    datasets: [
      {
        label: 'Frequency',
        data: [8, 15, 28, 45, 52, 38, 25, 12],
        backgroundColor: [
          '#EF4444', '#F97316', '#F59E0B', '#22C55E', 
          '#22C55E', '#3B82F6', '#8B5CF6', '#A855F7'
        ],
        borderColor: '#374151',
        borderWidth: 1,
      },
    ],
  };

  // Correlation Matrix Data (simplified heatmap representation)
  const correlationData = {
    labels: ['ETH', 'SOL', 'HYPE', 'BNB', 'AVAX', 'TRON', 'APTOS', 'SUI'],
    datasets: [
      {
        label: 'Correlation',
        data: [
          { x: 0, y: 0, v: 1.00 }, { x: 1, y: 0, v: 0.72 }, { x: 2, y: 0, v: 0.45 }, { x: 3, y: 0, v: 0.68 },
          { x: 0, y: 1, v: 0.72 }, { x: 1, y: 1, v: 1.00 }, { x: 2, y: 1, v: 0.38 }, { x: 3, y: 1, v: 0.65 },
          { x: 0, y: 2, v: 0.45 }, { x: 1, y: 2, v: 0.38 }, { x: 2, y: 2, v: 1.00 }, { x: 3, y: 2, v: 0.32 },
          { x: 0, y: 3, v: 0.68 }, { x: 1, y: 3, v: 0.65 }, { x: 2, y: 3, v: 0.32 }, { x: 3, y: 3, v: 1.00 },
        ],
        backgroundColor: (ctx) => {
          const value = ctx.parsed.v;
          if (value > 0.7) return '#EF4444';
          if (value > 0.5) return '#F97316';
          if (value > 0.3) return '#F59E0B';
          return '#22C55E';
        },
      },
    ],
  };

  // Portfolio Weights by Strategy
  const portfolioWeightsData = {
    labels: ['Equal Weight', 'Max Sharpe', 'Min Vol', 'Max Return', 'Risk Parity'],
    datasets: [
      {
        label: 'HYPE',
        data: [12.5, 100, 0, 6.8, 8.4],
        backgroundColor: '#A855F7',
      },
      {
        label: 'BNB',
        data: [12.5, 0, 100, 93.2, 22.1],
        backgroundColor: '#22C55E',
      },
      {
        label: 'ETH',
        data: [12.5, 0, 0, 0, 14.0],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Others',
        data: [62.5, 0, 0, 0, 55.5],
        backgroundColor: '#6B7280',
      },
    ],
  };

  // Efficient Frontier Data
  const efficientFrontierData = {
    datasets: [
      {
        label: 'Efficient Frontier',
        data: [
          { x: 0.25, y: 0.08 }, { x: 0.30, y: 0.12 }, { x: 0.35, y: 0.16 },
          { x: 0.40, y: 0.20 }, { x: 0.45, y: 0.24 }, { x: 0.50, y: 0.28 },
          { x: 0.55, y: 0.32 }, { x: 0.60, y: 0.36 }, { x: 0.65, y: 0.40 },
        ],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        showLine: true,
        pointRadius: 3,
      },
      {
        label: 'Portfolio',
        data: [{ x: 0.58, y: 0.41 }],
        backgroundColor: '#EF4444',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
      {/* Cumulative Returns */}
      <div className="card col-span-1 lg:col-span-2">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Cumulative Returns</h3>
        </div>
        <div className="p-3">
          <div className="h-48">
            <Line data={cumulativeReturnsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Portfolio Allocation */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Portfolio Allocation</h3>
        </div>
        <div className="p-3">
          <div className="h-48">
            <Doughnut 
              data={{
                labels: ['ETH', 'SOL', 'HYPE', 'BNB', 'AVAX', 'TRON', 'APTOS', 'SUI'],
                datasets: [{
                  data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
                  backgroundColor: ['#3B82F6', '#8B5CF6', '#A855F7', '#22C55E', '#EF4444', '#14B8A6', '#F97316', '#84CC16'],
                  borderColor: '#1F2937',
                  borderWidth: 1,
                }]
              }} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { position: 'bottom', labels: { ...chartOptions.plugins.legend.labels, boxWidth: 12 } }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Portfolio Drawdown */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Portfolio Drawdown</h3>
        </div>
        <div className="p-3">
          <div className="h-48">
            <Line data={drawdownData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Return Distribution */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Return Distribution</h3>
        </div>
        <div className="p-3">
          <div className="h-48">
            <Bar data={returnDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Portfolio Weights by Strategy */}
      <div className="card">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Weights by Strategy</h3>
        </div>
        <div className="p-3">
          <div className="h-48">
            <Bar 
              data={portfolioWeightsData} 
              options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  x: { ...chartOptions.scales.x, stacked: true },
                  y: { ...chartOptions.scales.y, stacked: true, max: 100 }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Efficient Frontier */}
      <div className="card col-span-1 lg:col-span-2 xl:col-span-3">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium text-white">Efficient Frontier</h3>
        </div>
        <div className="p-3">
          <div className="h-64">
            <Scatter 
              data={efficientFrontierData} 
              options={{
                ...chartOptions,
                scales: {
                  x: { 
                    ...chartOptions.scales.x, 
                    title: { display: true, text: 'Risk (Volatility)', color: '#9CA3AF' }
                  },
                  y: { 
                    ...chartOptions.scales.y, 
                    title: { display: true, text: 'Return', color: '#9CA3AF' }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsGrid;