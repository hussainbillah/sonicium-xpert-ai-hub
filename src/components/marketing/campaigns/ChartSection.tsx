
import React from 'react';
import PerformanceChart from './PerformanceChart';
import StatsCard from './StatsCard';

interface ChartSectionProps {}

const ChartSection: React.FC<ChartSectionProps> = () => {
  const statsData = [
    { title: 'Total Campaigns', value: '24', change: '+12%', timeframe: 'from last month' },
    { title: 'Avg. CTR', value: '3.6%', change: '+0.8%', timeframe: 'from last month' },
    { title: 'Conversion Rate', value: '2.4%', change: '+0.6%', timeframe: 'from last month' },
    { title: 'Avg. CPC', value: '$1.28', change: '-0.12%', timeframe: 'from last month' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PerformanceChart />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            timeframe={stat.timeframe}
            isPositive={stat.change.startsWith('+')}
          />
        ))}
      </div>
    </div>
  );
};

export default ChartSection;
