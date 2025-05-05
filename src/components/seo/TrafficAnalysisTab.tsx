
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Bar, Line, Pie } from "recharts";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";

// Sample data
const monthlyTrafficData = [
  { month: 'Jan', organic: 24500, paid: 8200, direct: 12300, referral: 6800, social: 5400 },
  { month: 'Feb', organic: 26700, paid: 7800, direct: 13100, referral: 7200, social: 5900 },
  { month: 'Mar', organic: 29800, paid: 9100, direct: 14500, referral: 7600, social: 6300 },
  { month: 'Apr', organic: 31200, paid: 9600, direct: 15200, referral: 8100, social: 6800 },
  { month: 'May', organic: 33500, paid: 10200, direct: 16400, referral: 8600, social: 7200 },
  { month: 'Jun', organic: 32100, paid: 10800, direct: 15800, referral: 8200, social: 6900 },
  { month: 'Jul', organic: 34800, paid: 11500, direct: 17200, referral: 8900, social: 7500 },
  { month: 'Aug', organic: 38200, paid: 12400, direct: 18600, referral: 9700, social: 8200 },
  { month: 'Sep', organic: 42100, paid: 13600, direct: 20500, referral: 10600, social: 9000 },
  { month: 'Oct', organic: 45600, paid: 14900, direct: 22100, referral: 11500, social: 9800 },
  { month: 'Nov', organic: 48200, paid: 15800, direct: 23400, referral: 12200, social: 10400 },
  { month: 'Dec', organic: 52400, paid: 17200, direct: 25500, referral: 13300, social: 11300 },
];

const trafficSourceData = [
  { name: 'Organic Search', value: 52400, color: '#3b82f6' },
  { name: 'Paid Search', value: 17200, color: '#ef4444' },
  { name: 'Direct', value: 25500, color: '#22c55e' },
  { name: 'Referral', value: 13300, color: '#f59e0b' },
  { name: 'Social', value: 11300, color: '#8b5cf6' },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#3b82f6' },
  { name: 'Desktop', value: 28, color: '#22c55e' },
  { name: 'Tablet', value: 7, color: '#f59e0b' },
];

const engagementMetrics = [
  { 
    name: 'Bounce Rate', 
    value: 42, 
    change: -5, 
    changeDirection: 'down', 
    goodDirection: 'down',
    benchmark: 51 
  },
  { 
    name: 'Pages/Session', 
    value: 3.2, 
    change: 0.4, 
    changeDirection: 'up', 
    goodDirection: 'up',
    benchmark: 2.8 
  },
  { 
    name: 'Avg. Session Duration', 
    value: 185, 
    change: 32, 
    changeDirection: 'up', 
    goodDirection: 'up',
    benchmark: 164 
  },
  { 
    name: 'Conversion Rate', 
    value: 3.8, 
    change: 0.6, 
    changeDirection: 'up', 
    goodDirection: 'up',
    benchmark: 3.1 
  },
];

// Helper to convert seconds to readable format
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TrafficAnalysisTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Traffic', value: '119,700', change: '+18.2%', period: 'vs. last month' },
          { label: 'Organic Traffic', value: '52,400', change: '+15.5%', period: 'vs. last month' },
          { label: 'Avg. Session Duration', value: '3:05', change: '+20.8%', period: 'vs. last month' },
          { label: 'Conversion Rate', value: '3.8%', change: '+18.7%', period: 'vs. last month' },
        ].map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="text-2xl font-bold mt-1">{item.value}</div>
              <div className="mt-1 text-sm flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                {item.change} 
                <span className="text-muted-foreground ml-1 text-xs">{item.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Traffic Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart config={{
              organic: { color: "#3b82f6" },
              paid: { color: "#ef4444" },
              direct: { color: "#22c55e" },
              referral: { color: "#f59e0b" },
              social: { color: "#8b5cf6" }
            }}>
              <Line
                type="monotone"
                dataKey="organic"
                data={monthlyTrafficData}
                name="Organic Search"
                stroke="var(--color-organic)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="paid"
                data={monthlyTrafficData}
                name="Paid Search"
                stroke="var(--color-paid)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="direct"
                data={monthlyTrafficData}
                name="Direct"
                stroke="var(--color-direct)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="referral"
                data={monthlyTrafficData}
                name="Referral"
                stroke="var(--color-referral)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="social"
                data={monthlyTrafficData}
                name="Social"
                stroke="var(--color-social)"
                strokeWidth={2}
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PieChart config={{
                "Organic Search": { color: "#3b82f6" },
                "Paid Search": { color: "#ef4444" },
                "Direct": { color: "#22c55e" },
                "Referral": { color: "#f59e0b" },
                "Social": { color: "#8b5cf6" }
              }}>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  data={trafficSourceData}
                  innerRadius={50}
                  outerRadius={80}
                  label
                />
              </PieChart>
            </div>
            <div className="mt-4 space-y-3">
              {trafficSourceData.map((source, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                  <div className="flex-1 text-sm">{source.name}</div>
                  <div className="text-sm font-medium">{source.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground ml-2">
                    {Math.round(source.value * 100 / trafficSourceData.reduce((sum, src) => sum + src.value, 0))}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <PieChart config={{
                "Mobile": { color: "#3b82f6" },
                "Desktop": { color: "#22c55e" },
                "Tablet": { color: "#f59e0b" }
              }}>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  data={deviceData}
                  innerRadius={50}
                  outerRadius={80}
                  label
                />
              </PieChart>
            </div>
            <div className="mt-4 space-y-3">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: device.color }}></div>
                  <div className="flex-1 text-sm">{device.name}</div>
                  <div className="text-sm font-medium">{device.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {engagementMetrics.map((metric, index) => {
                const isPercentage = metric.name.includes('Rate');
                const isTime = metric.name.includes('Duration');
                
                let displayValue = isPercentage 
                  ? `${metric.value}%` 
                  : isTime 
                    ? formatTime(metric.value) 
                    : metric.value;
                
                let displayChange = isPercentage 
                  ? `${Math.abs(metric.change)}%` 
                  : isTime 
                    ? formatTime(Math.abs(metric.change)) 
                    : Math.abs(metric.change);
                
                const isGood = metric.changeDirection === metric.goodDirection;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div 
                        className={`text-sm flex items-center ${isGood ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {metric.changeDirection === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {displayChange}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold">{displayValue}</span>
                      <span className="text-xs text-muted-foreground">Industry avg: {
                        isPercentage 
                          ? `${metric.benchmark}%` 
                          : isTime 
                            ? formatTime(metric.benchmark) 
                            : metric.benchmark
                      }</span>
                    </div>
                    <Progress 
                      value={isPercentage ? metric.value : (metric.value / (metric.benchmark * 1.5) * 100)} 
                      className="h-2" 
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New vs Returning Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <BarChart config={{
                "New": { color: "#3b82f6" },
                "Returning": { color: "#22c55e" }
              }}>
                <Bar
                  dataKey="New"
                  data={[
                    { month: 'Jul', New: 25800, Returning: 9000 },
                    { month: 'Aug', New: 28300, Returning: 9900 },
                    { month: 'Sep', New: 31200, Returning: 10900 },
                    { month: 'Oct', New: 33800, Returning: 11800 },
                    { month: 'Nov', New: 35700, Returning: 12500 },
                    { month: 'Dec', New: 38800, Returning: 13600 },
                  ]}
                  stackId="a"
                  fill="var(--color-New)"
                />
                <Bar
                  dataKey="Returning"
                  data={[
                    { month: 'Jul', New: 25800, Returning: 9000 },
                    { month: 'Aug', New: 28300, Returning: 9900 },
                    { month: 'Sep', New: 31200, Returning: 10900 },
                    { month: 'Oct', New: 33800, Returning: 11800 },
                    { month: 'Nov', New: 35700, Returning: 12500 },
                    { month: 'Dec', New: 38800, Returning: 13600 },
                  ]}
                  stackId="a"
                  fill="var(--color-Returning)"
                />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 pr-4">
            <div className="h-64 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr>
                    <th className="text-left pl-6 py-2 font-medium">Country</th>
                    <th className="text-right py-2 font-medium">Sessions</th>
                    <th className="text-right py-2 font-medium">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { country: '🇺🇸 United States', sessions: 68500, percent: 57.2 },
                    { country: '🇬🇧 United Kingdom', sessions: 12800, percent: 10.7 },
                    { country: '🇨🇦 Canada', sessions: 8900, percent: 7.4 },
                    { country: '🇦🇺 Australia', sessions: 7200, percent: 6.0 },
                    { country: '🇩🇪 Germany', sessions: 4900, percent: 4.1 },
                    { country: '🇫🇷 France', sessions: 4200, percent: 3.5 },
                    { country: '🇮🇳 India', sessions: 3800, percent: 3.2 },
                    { country: '🇯🇵 Japan', sessions: 2900, percent: 2.4 },
                    { country: '🇧🇷 Brazil', sessions: 2600, percent: 2.2 },
                    { country: '🇪🇸 Spain', sessions: 2100, percent: 1.8 },
                    { country: '🇮🇹 Italy', sessions: 1800, percent: 1.5 },
                  ].map((country, index) => (
                    <tr key={index} className="hover:bg-muted">
                      <td className="pl-6 py-2">{country.country}</td>
                      <td className="text-right py-2">{country.sessions.toLocaleString()}</td>
                      <td className="text-right py-2">{country.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrafficAnalysisTab;
