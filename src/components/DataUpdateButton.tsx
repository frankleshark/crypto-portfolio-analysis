import React from 'react';
import { RefreshCw } from 'lucide-react';

interface DataUpdateButtonProps {
  onUpdate: () => void;
  isUpdating: boolean;
  lastUpdated: string;
}

const DataUpdateButton: React.FC<DataUpdateButtonProps> = ({ 
  onUpdate, 
  isUpdating, 
  lastUpdated 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
      <div className="text-sm text-slate-400">
        Last updated: {formatDate(lastUpdated)}
      </div>
      <button
        onClick={onUpdate}
        disabled={isUpdating}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-sm rounded transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
        {isUpdating ? 'Updating...' : 'Update Data'}
      </button>
    </div>
  );
};

export default DataUpdateButton;