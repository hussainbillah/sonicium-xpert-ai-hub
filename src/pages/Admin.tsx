
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

// Import icons
import { Activity, Users, Settings, HardDrive, Key, Lock } from "lucide-react";

const Admin = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCampaigns: 0,
    totalStorage: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkAdminStatus();
    fetchStats();
  }, [user, navigate]);

  const checkAdminStatus = async () => {
    try {
      // For now, just set as admin to show the page
      setIsAdmin(true);
      
      // When proper database tables are set up, uncomment this code:
      /*
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      
      if (data && (data.role === 'admin' || data.role === 'superadmin')) {
        setIsAdmin(true);
      } else {
        // Not an admin, redirect to dashboard
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin area",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
      */
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Set mock stats for now
      setStats({
        totalUsers: 245,
        activeUsers: 187,
        totalCampaigns: 532,
        totalStorage: 2.7
      });
      
      // When proper database tables are set up, uncomment this code:
      /*
      // Get total users count
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (userError) throw userError;
      
      // Get active users (users who logged in in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: activeUserCount, error: activeUserError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('last_sign_in_at', thirtyDaysAgo.toISOString());
      
      if (activeUserError) throw activeUserError;
      
      // Get total campaigns
      const { count: campaignCount, error: campaignError } = await supabase
        .from('ad_campaigns')
        .select('*', { count: 'exact', head: true });
      
      if (campaignError) throw campaignError;
      
      // Update stats
      setStats({
        totalUsers: userCount || 0,
        activeUsers: activeUserCount || 0,
        totalCampaigns: campaignCount || 0,
        totalStorage: 0 // This would need a custom storage calculation
      });
      */
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-10">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-10">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="mb-4">You don't have permission to access the admin area.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                Across all users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Storage Used
              </CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStorage} GB</div>
              <p className="text-xs text-muted-foreground">
                Cloud storage usage
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Admin Access
              </CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Full access granted
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6">
                  User management module is loaded with mock data for now.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => navigate('/super-admin/admins')}>
                    View Admin Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6">
                  Campaign management module is loaded with mock data for now.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => navigate('/campaigns')}>
                    View Campaigns
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">System settings are using mock data for now.</p>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Default User Role</h3>
                    <p className="text-sm text-muted-foreground">Role assigned to new users</p>
                  </div>
                  <Button variant="outline">Standard</Button>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Send system emails</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-muted-foreground">Allow external API access</p>
                  </div>
                  <Button variant="outline">Limited</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Security settings are using mock data for now.</p>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admins</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Button variant="outline">30 minutes</Button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium">Login Attempts</h3>
                    <p className="text-sm text-muted-foreground">Max failed login attempts</p>
                  </div>
                  <Button variant="outline">5 attempts</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
