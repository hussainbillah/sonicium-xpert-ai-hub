
import React from 'react';
import PerformanceChart from './PerformanceChart';
import StatsCard from './StatsCard';

const ChartSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PerformanceChart />
      <StatsCard />
    </div>
  );
};

export default ChartSection;
