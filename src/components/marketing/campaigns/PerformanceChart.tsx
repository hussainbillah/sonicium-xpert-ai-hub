
import React, { useState } from 'react';
import { BarChart, LineChart } from '@/components/ui/custom-chart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample performance data
const weeklyData = [
  { name: 'Mon', clicks: 120, impressions: 1400, conversions: 25 },
  { name: 'Tue', clicks: 160, impressions: 1800, conversions: 32 },
  { name: 'Wed', clicks: 180, impressions: 2100, conversions: 38 },
  { name: 'Thu', clicks: 190, impressions: 2300, conversions: 42 },
  { name: 'Fri', clicks: 220, impressions: 2600, conversions: 45 },
  { name: 'Sat', clicks: 140, impressions: 1900, conversions: 28 },
  { name: 'Sun', clicks: 130, impressions: 1600, conversions: 24 },
];

const monthlyData = [
  { name: 'Week 1', clicks: 850, impressions: 11000, conversions: 190 },
  { name: 'Week 2', clicks: 940, impressions: 12500, conversions: 210 },
  { name: 'Week 3', clicks: 1020, impressions: 13800, conversions: 230 },
  { name: 'Week 4', clicks: 980, impressions: 13200, conversions: 220 },
];

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const data = timeframe === 'weekly' ? weeklyData : monthlyData;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Overview of key performance metrics</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Tabs defaultValue="weekly" onValueChange={(value) => setTimeframe(value as 'weekly' | 'monthly')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs defaultValue="bar" onValueChange={(value) => setChartType(value as 'bar' | 'line')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        {chartType === 'bar' ? (
          <BarChart 
            data={data} 
            bars={[
              { dataKey: 'clicks', fill: '#4f46e5', name: 'Clicks' },
              { dataKey: 'conversions', fill: '#22c55e', name: 'Conversions' }
            ]}
            height="100%"
            xAxisDataKey="name"
          />
        ) : (
          <LineChart 
            data={data} 
            lines={[
              { dataKey: 'clicks', stroke: '#4f46e5', name: 'Clicks' },
              { dataKey: 'conversions', stroke: '#22c55e', name: 'Conversions' },
              { dataKey: 'impressions', stroke: '#f59e0b', name: 'Impressions' }
            ]}
            height="100%"
            xAxisDataKey="name"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
