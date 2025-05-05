
import React from 'react';
import { CoreWebVitalsChart, PageSpeedChart, SchemaUsageChart, BounceRateChart } from './DashboardCharts';

const OverviewCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CoreWebVitalsChart />
      <PageSpeedChart />
      <SchemaUsageChart />
      <BounceRateChart />
    </div>
  );
};

export default OverviewCharts;
