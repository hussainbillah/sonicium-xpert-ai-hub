import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
      // Build the query based on the timeframe
      let query = supabase
        .from('analytics')
        .select('*')
        .eq('user_id', user?.id);
        
      // Add timeframe filter
      if (timeframe === '7days') {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        query = query.gte('created_at', date.toISOString());
      } else if (timeframe === '30days') {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        query = query.gte('created_at', date.toISOString());
      } else if (timeframe === '90days') {
        const date = new Date();
        date.setDate(date.getDate() - 90);
        query = query.gte('created_at', date.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Process the data for charts
      // This would depend on your exact data structure
      const processedData = processAnalyticsData(data);
      setAnalyticsData(processedData);
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
                  <CardContent>
                    {analyticsData?.impressions ? (
                      <LineChart labels={analyticsData.impressions.labels} data={analyticsData.impressions.data} />
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
                  <CardContent>
                    {analyticsData?.clicks ? (
                      <LineChart labels={analyticsData.clicks.labels} data={analyticsData.clicks.data} />
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
                  <CardContent>
                    {analyticsData?.conversions ? (
                      <LineChart labels={analyticsData.conversions.labels} data={analyticsData.conversions.data} />
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
                  <CardContent>
                    {analyticsData?.platforms ? (
                      <PieChart labels={analyticsData.platforms.labels} data={analyticsData.platforms.data} />
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
                  <CardContent>
                    {analyticsData?.devices ? (
                      <PieChart labels={analyticsData.devices.labels} data={analyticsData.devices.data} />
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
                  <CardContent>
                    {analyticsData?.demographics?.age ? (
                      <BarChart labels={analyticsData.demographics.age.labels} data={analyticsData.demographics.age.data} />
                    ) : (
                      <p>No data available for age demographics.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analyticsData?.demographics?.gender ? (
                      <BarChart labels={analyticsData.demographics.gender.labels} data={analyticsData.demographics.gender.data} />
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
