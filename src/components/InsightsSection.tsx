
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar, BarChart, LineChart } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

// Mock data for the chart
const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 590 },
  { name: 'Jun', value: 480 },
  { name: 'Jul', value: 380 },
];

const CounterAnimation = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const InsightsSection = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Live Insights</h2>
        <p className="section-subtitle text-center">
          Monitor your marketing performance with real-time data and analytics
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Active Users</h3>
                  <Users className="text-sonicium-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-sonicium-800"><CounterAnimation end={1247} /></p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Today's Target</span>
                    <span className="text-gray-700 font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-gray-100" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Campaigns Today</h3>
                  <Calendar className="text-sonicium-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-sonicium-800"><CounterAnimation end={36} /></p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Weekly Average</span>
                    <span className="text-gray-700 font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-100" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Ads Published</h3>
                  <BarChart className="text-sonicium-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-sonicium-800"><CounterAnimation end={543} /></p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Monthly Target</span>
                    <span className="text-gray-700 font-medium">64%</span>
                  </div>
                  <Progress value={64} className="h-2 bg-gray-100" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Engagement</h3>
                  <LineChart className="text-sonicium-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-sonicium-800"><CounterAnimation end={8574} /></p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Target</span>
                    <span className="text-gray-700 font-medium">83%</span>
                  </div>
                  <Progress value={83} className="h-2 bg-gray-100" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-700">Performance Trends</h3>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-sonicium-500 mr-1"></div>
                    <span className="text-xs text-gray-500">Engagements</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0EA5E9"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
