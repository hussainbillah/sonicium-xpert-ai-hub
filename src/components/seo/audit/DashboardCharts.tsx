
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/custom-chart";
import { coreWebVitalsData, pageSpeedData, schemaUsageData, bounceRateData } from './SampleData';

export const CoreWebVitalsChart: React.FC = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Core Web Vitals</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <BarChart 
          data={coreWebVitalsData}
          bars={[{ dataKey: "score", name: "Score" }]}
        />
      </div>
    </CardContent>
  </Card>
);

export const PageSpeedChart: React.FC = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Page Speed</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <BarChart 
          data={pageSpeedData}
          bars={[
            { dataKey: "mobile", fill: "#f59e0b", name: "Mobile" },
            { dataKey: "desktop", fill: "#3b82f6", name: "Desktop" }
          ]}
        />
      </div>
    </CardContent>
  </Card>
);

export const SchemaUsageChart: React.FC = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Schema Usage</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64 flex items-center justify-center">
        <PieChart 
          data={schemaUsageData}
          dataKey="value"
          innerRadius={40}
          outerRadius={80}
          label
        />
      </div>
    </CardContent>
  </Card>
);

export const BounceRateChart: React.FC = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Bounce Rate</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <LineChart 
          data={bounceRateData}
          lines={[{ dataKey: "rate", stroke: "#8b5cf6", strokeWidth: 2 }]}
        />
      </div>
    </CardContent>
  </Card>
);

export const CrawlErrorsChart: React.FC<{ data: Array<{ name: string; count: number }> }> = ({ data }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Crawl Errors</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <BarChart 
          data={data}
          bars={[{ dataKey: "count", fill: "#ef4444", name: "Count" }]}
        />
      </div>
    </CardContent>
  </Card>
);
