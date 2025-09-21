import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssetAllocation: React.FC = () => {
  const data = {
    labels: ['ETH', 'SOL', 'HYPE', 'BNB', 'AVAX', 'TRON', 'APTOS', 'SUI'],
    datasets: [
      {
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: [
          '#0EA5E9',
          '#8B5CF6',
          '#F59E0B',
          '#10B981',
          '#EF4444',
          '#06B6D4',
          '#F97316',
          '#84CC16',
        ],
        borderColor: '#1E293B',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#94A3B8',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#F1F5F9',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Portfolio Allocation</h3>
        <p className="text-sm text-gray-400">Equal-weight distribution (12.5% each)</p>
      </div>
      <div className="p-4">
        <div className="h-64">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AssetAllocation;