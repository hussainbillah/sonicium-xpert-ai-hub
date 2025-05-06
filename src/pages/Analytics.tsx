
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, BarChart, PieChart } from "@/components/ui/custom-chart";
import { getMockData } from "@/utils/mockDatabaseHelper";

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, timeframe]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Mock analytics data
      setTimeout(() => {
        const mockData = {
          impressions: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [4200, 3800, 5100, 4800],
          },
          clicks: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [320, 280, 350, 310],
          },
          conversions: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [42, 36, 48, 40],
          },
          platforms: {
            labels: ['Facebook', 'Google', 'Instagram', 'Twitter', 'LinkedIn'],
            data: [35, 25, 20, 10, 10],
          },
          devices: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            data: [45, 40, 15],
          },
          demographics: {
            age: {
              labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
              data: [15, 30, 25, 20, 10],
            },
            gender: {
              labels: ['Male', 'Female', 'Other'],
              data: [48, 46, 6],
            },
          },
        };
        
        setAnalyticsData(mockData);
        setLoading(false);
      }, 1000);
      
      // When database tables are set up, uncomment this code:
      /*
      // Use mock data helper for now
      const analyticsData = getMockData('analytics');
      
      // Add timeframe filter logic here
      
      setAnalyticsData(processAnalyticsData(analyticsData));
      setLoading(false);
      */
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      // setLoading(false); // This is now handled in the mock data timeout
    }
  };
  
  // Helper function to process the analytics data
  const processAnalyticsData = (data: any[]) => {
    // This would process your actual data structure
    // For now, we're using mock data so this isn't called
    return {
      impressions: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [4200, 3800, 5100, 4800],
      },
      clicks: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [320, 280, 350, 310],
      },
      conversions: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [42, 36, 48, 40],
      },
      platforms: {
        labels: ['Facebook', 'Google', 'Instagram', 'Twitter', 'LinkedIn'],
        data: [35, 25, 20, 10, 10],
      },
      devices: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [45, 40, 15],
      },
      demographics: {
        age: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          data: [15, 30, 25, 20, 10],
        },
        gender: {
          labels: ['Male', 'Female', 'Other'],
          data: [48, 46, 6],
        },
      },
    };
  };

  // Function to create chart data for the custom-chart components
  const createChartData = (labels: string[], dataValues: number[]) => {
    return labels.map((label, index) => ({
      name: label,
      value: dataValues[index]
    }));
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">Website Traffic</h2>
                <p className="text-sm text-gray-500">Real-time data on website performance</p>
              </div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="impressions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Loading analytics data...
            </div>
          ) : (
            <>
              <TabsContent value="impressions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Impressions Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.impressions ? (
                      <LineChart 
                        data={createChartData(analyticsData.impressions.labels, analyticsData.impressions.data)}
                        lines={[{ dataKey: 'value', stroke: '#4f46e5', name: 'Impressions' }]}
                        xAxisDataKey="name"
                      />
                    ) : (
                      <p>No data available for impressions.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clicks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Clicks Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.clicks ? (
                      <LineChart 
                        data={createChartData(analyticsData.clicks.labels, analyticsData.clicks.data)}
                        lines={[{ dataKey: 'value', stroke: '#22c55e', name: 'Clicks' }]}
                        xAxisDataKey="name"
                      />
                    ) : (
                      <p>No data available for clicks.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conversions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversions Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.conversions ? (
                      <LineChart 
                        data={createChartData(analyticsData.conversions.labels, analyticsData.conversions.data)}
                        lines={[{ dataKey: 'value', stroke: '#f59e0b', name: 'Conversions' }]}
                        xAxisDataKey="name"
                      />
                    ) : (
                      <p>No data available for conversions.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.platforms ? (
                      <PieChart 
                        data={createChartData(analyticsData.platforms.labels, analyticsData.platforms.data)}
                        dataKey="value"
                        nameKey="name"
                        colors={['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']}
                      />
                    ) : (
                      <p>No data available for platforms.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="devices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.devices ? (
                      <PieChart 
                        data={createChartData(analyticsData.devices.labels, analyticsData.devices.data)}
                        dataKey="value"
                        nameKey="name"
                        colors={['#4f46e5', '#22c55e', '#f59e0b']}
                      />
                    ) : (
                      <p>No data available for devices.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.demographics?.age ? (
                      <BarChart 
                        data={createChartData(analyticsData.demographics.age.labels, analyticsData.demographics.age.data)}
                        bars={[{ dataKey: 'value', fill: '#4f46e5', name: 'Users' }]}
                        xAxisDataKey="name"
                      />
                    ) : (
                      <p>No data available for age demographics.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    {analyticsData?.demographics?.gender ? (
                      <BarChart 
                        data={createChartData(analyticsData.demographics.gender.labels, analyticsData.demographics.gender.data)}
                        bars={[{ dataKey: 'value', fill: '#22c55e', name: 'Users' }]}
                        xAxisDataKey="name"
                      />
                    ) : (
                      <p>No data available for gender demographics.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
