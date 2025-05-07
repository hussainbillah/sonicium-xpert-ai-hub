
import React from 'react';
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from '@/components/ui/stats-card';
import { DownloadCloud, ExternalLink, BellRing, UserCheck, PieChart, ActivitySquare, Database, Shield, Settings } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  // Sample data for dashboard
  const pageViews = [
    { name: 'Jan', views: 1200 },
    { name: 'Feb', views: 1900 },
    { name: 'Mar', views: 2400 },
    { name: 'Apr', views: 1800 },
    { name: 'May', views: 2800 },
    { name: 'Jun', views: 3200 },
    { name: 'Jul', views: 3800 },
  ];

  const userActivity = [
    { name: 'Mon', logins: 24 },
    { name: 'Tue', logins: 36 },
    { name: 'Wed', logins: 42 },
    { name: 'Thu', logins: 50 },
    { name: 'Fri', logins: 45 },
    { name: 'Sat', logins: 28 },
    { name: 'Sun', logins: 20 },
  ];

  const apiUsage = [
    { name: 'Jan', usage: 24000 },
    { name: 'Feb', usage: 28000 },
    { name: 'Mar', usage: 34000 },
    { name: 'Apr', usage: 42000 },
    { name: 'May', usage: 38000 },
    { name: 'Jun', usage: 47000 },
    { name: 'Jul', usage: 52000 },
  ];

  return (
    <SuperAdminLayout currentPage="Dashboard">
      <div className="space-y-6">
        {/* Summary Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value="2,853"
            change="+12%"
            timeframe="this month"
            isPositive={true}
            icon={<UserCheck size={20} />}
          />
          
          <StatsCard
            title="API Calls"
            value="1.2M"
            change="+8.2%"
            timeframe="vs. last month"
            isPositive={true}
            icon={<Database size={20} />}
          />
          
          <StatsCard
            title="Active Subscriptions"
            value="847"
            change="+3.1%"
            timeframe="this month"
            isPositive={true}
            icon={<PieChart size={20} />}
          />
          
          <StatsCard
            title="Revenue"
            value="$48,568"
            change="+15.3%"
            timeframe="vs. last month"
            isPositive={true}
            icon={<ActivitySquare size={20} />}
          />
        </div>

        <Tabs defaultValue="user-activity" className="space-y-6">
          <TabsList className="bg-background border">
            <TabsTrigger value="user-activity" className="font-poppins">User Activity</TabsTrigger>
            <TabsTrigger value="api-usage" className="font-poppins">API Usage</TabsTrigger>
            <TabsTrigger value="system" className="font-poppins">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="user-activity" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* User Logins Chart */}
              <Card className="col-span-1 rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-inter">User Logins</CardTitle>
                    <CardDescription>
                      Daily login activity for the past week
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <DownloadCloud className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userActivity}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="logins" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Page Views Chart */}
              <Card className="col-span-1 rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-inter">Page Views</CardTitle>
                    <CardDescription>
                      Monthly page views across all pages
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={pageViews}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Activity */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="font-inter">Recent Activity</CardTitle>
                <CardDescription>Latest user activities across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-xl">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New user registered</p>
                      <p className="text-sm text-muted-foreground">John Doe (john@example.com) created an account</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-xl">
                      <BellRing className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Subscription upgraded</p>
                      <p className="text-sm text-muted-foreground">Jane Smith upgraded to Professional plan</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 p-2 rounded-xl">
                      <Database className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">API limit reached</p>
                      <p className="text-sm text-muted-foreground">API usage limit reached for user: marketing@example.com</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-xl">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Security alert cleared</p>
                      <p className="text-sm text-muted-foreground">Multiple login attempts resolved</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-slate-100 p-2 rounded-xl">
                      <Settings className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">System updated</p>
                      <p className="text-sm text-muted-foreground">Platform updated to version 2.4.0</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api-usage" className="space-y-6 mt-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="font-inter">API Usage</CardTitle>
                <CardDescription>Total API calls by month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiUsage}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="font-inter">API Usage By Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Social Media API</div>
                      <div className="text-sm text-gray-500">45%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: '45%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">SEO Analytics API</div>
                      <div className="text-sm text-gray-500">72%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '72%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Email Marketing API</div>
                      <div className="text-sm text-gray-500">38%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: '38%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">PPC Automation API</div>
                      <div className="text-sm text-gray-500">54%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: '54%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="font-inter">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">API Services</p>
                        <p className="text-xs text-gray-500">Fully operational</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Database</p>
                        <p className="text-xs text-gray-500">Fully operational</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Authentication</p>
                        <p className="text-xs text-gray-500">Fully operational</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div>
                        <p className="text-sm font-medium">Email Service</p>
                        <p className="text-xs text-gray-500">Degraded performance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="font-inter">Database Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Storage</div>
                        <div className="text-sm text-gray-500">65%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">CPU Usage</div>
                        <div className="text-sm text-gray-500">42%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '42%' }} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Memory</div>
                        <div className="text-sm text-gray-500">78%</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="font-inter">Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Firewall Status</p>
                        <p className="text-xs text-gray-500">Active</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">SSL Certificate</p>
                        <p className="text-xs text-gray-500">Valid for 275 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-sm font-medium">Failed Login Attempts</p>
                        <p className="text-xs text-gray-500">12 in the last 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Data Backups</p>
                        <p className="text-xs text-gray-500">Latest: 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
