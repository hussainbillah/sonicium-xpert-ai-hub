
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart, Calendar, Layers, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { getMockData } from "@/utils/mockDatabaseHelper";

// Sample data for the charts
const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 590 },
  { name: 'Jun', value: 480 },
  { name: 'Jul', value: 380 },
];

const Dashboard = () => {
  const { session, user, loading } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalImpressions: 0,
    totalClicks: 0,
    conversionRate: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/auth');
    }
  }, [session, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchCampaigns();
      fetchAnalytics();
    }
  }, [user]);

  const fetchCampaigns = async () => {
    try {
      // Use mock data until database tables are set up
      const mockCampaigns = getMockData('campaigns');
      setCampaigns(mockCampaigns);
      setStats(prev => ({ ...prev, totalCampaigns: mockCampaigns.length || 0 }));
      setStats(prev => ({ 
        ...prev, 
        activeCampaigns: mockCampaigns.filter((campaign: any) => campaign.status === 'active').length || 0 
      }));

      // When database tables are set up, uncomment this code:
      /*
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCampaigns(data || []);
      setStats(prev => ({ ...prev, totalCampaigns: data?.length || 0 }));
      setStats(prev => ({ 
        ...prev, 
        activeCampaigns: data?.filter(campaign => campaign.status === 'active').length || 0 
      }));
      */
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      // Use mock analytics data
      const mockAnalytics = [
        { impressions: 5000, clicks: 250, conversions: 25 },
        { impressions: 4500, clicks: 220, conversions: 22 }
      ];
      
      const totalImpressions = mockAnalytics.reduce((sum, item) => sum + item.impressions, 0);
      const totalClicks = mockAnalytics.reduce((sum, item) => sum + item.clicks, 0);
      const conversionRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
      
      setStats({
        ...stats,
        totalImpressions,
        totalClicks,
        conversionRate
      });

      // When database tables are set up, uncomment this code:
      /*
      const { data, error } = await supabase
        .from('analytics')
        .select('impressions, clicks, conversions')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const totalImpressions = data.reduce((sum, item) => sum + item.impressions, 0);
        const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
        const conversionRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
        
        setStats({
          ...stats,
          totalImpressions,
          totalClicks,
          conversionRate
        });
      }
      */
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const createNewCampaign = () => {
    navigate('/campaigns/create');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button 
            onClick={createNewCampaign} 
            className="bg-sonicium-600 hover:bg-sonicium-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCampaigns} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Impressions
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalImpressions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalClicks.toLocaleString()} clicks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate.toFixed(2)}%</div>
              <Progress className="h-2 mt-2" value={stats.conversionRate} max={100} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscription Status
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Free</div>
              <p className="text-xs text-muted-foreground">
                <Button variant="link" className="px-0 text-xs h-auto" 
                  onClick={() => navigate('/subscription')}>
                  Upgrade Now
                </Button>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="campaigns">Recent Campaigns</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                {campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.slice(0, 5).map((campaign: any) => (
                      <div key={campaign.id} className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Status: <span className="capitalize">{campaign.status}</span> • 
                            Budget: ${campaign.budget}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No campaigns yet</p>
                    <Button onClick={createNewCampaign}>Create Your First Campaign</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
