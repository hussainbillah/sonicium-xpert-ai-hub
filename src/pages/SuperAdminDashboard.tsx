
import React from 'react';
import SuperAdminLayout from '@/components/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

  const stats = [
    { title: 'Total Pages', value: '24', change: '+4 this month' },
    { title: 'Admin Users', value: '3', change: '+1 this month' },
    { title: 'Active Features', value: '8/12', change: '66.7% enabled' },
    { title: 'Integrations', value: '5', change: '3 connected' },
  ];

  return (
    <SuperAdminLayout currentPage="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
            <CardDescription>
              Monthly page views for all pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageViews}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Admin Logins</CardTitle>
            <CardDescription>
              Admin login activity for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivity}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="logins" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Page "About Us" published</p>
                  <p className="text-sm text-gray-500">5 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">New admin user created</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-yellow-500" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">Google Analytics integration updated</p>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Database Usage</div>
                  <div className="text-sm text-gray-500">45%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '45%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Storage Usage</div>
                  <div className="text-sm text-gray-500">72%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '72%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">API Rate Limit</div>
                  <div className="text-sm text-gray-500">12%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
