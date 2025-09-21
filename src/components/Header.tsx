import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="border-b border-gray-700 pb-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Cryptocurrency Portfolio Analysis
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Equal-Weight Index | Nov 2024 - Sep 2025
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Last Updated</div>
          <div className="text-sm text-white">Sep 21, 2025</div>
        </div>
      </div>
    </div>
  );
};

export default Header;