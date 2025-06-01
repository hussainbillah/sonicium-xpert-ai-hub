
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Calendar, 
  Mail, 
  Search, 
  Settings, 
  PlusCircle,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  MessageSquare,
  Target,
  Zap,
  Globe,
  FileText,
  Image,
  Video,
  Send,
  Bell,
  User,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, BarChart, Bar } from 'recharts';

// Sample data for charts
const performanceData = [
  { name: 'Jan', campaigns: 12, leads: 245, revenue: 12000 },
  { name: 'Feb', campaigns: 19, leads: 389, revenue: 18500 },
  { name: 'Mar', campaigns: 15, leads: 298, revenue: 15200 },
  { name: 'Apr', campaigns: 25, leads: 456, revenue: 22800 },
  { name: 'May', campaigns: 22, leads: 398, revenue: 19900 },
  { name: 'Jun', campaigns: 28, leads: 512, revenue: 25600 }
];

const socialMetrics = [
  { platform: 'Facebook', followers: 12500, engagement: 4.2, posts: 45 },
  { platform: 'Instagram', followers: 8900, engagement: 6.8, posts: 38 },
  { platform: 'Twitter', followers: 15200, engagement: 3.1, posts: 52 },
  { platform: 'LinkedIn', followers: 6800, engagement: 8.5, posts: 28 }
];

const emailCampaigns = [
  { name: 'Welcome Series', sent: 1250, opened: 875, clicked: 245, revenue: 8500 },
  { name: 'Product Launch', sent: 2100, opened: 1470, clicked: 420, revenue: 15200 },
  { name: 'Newsletter', sent: 3500, opened: 2100, clicked: 315, revenue: 5800 }
];

const VeraionDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'content-generator', name: 'Content Generator', icon: FileText },
    { id: 'social-media', name: 'Social Media Manager', icon: MessageSquare },
    { id: 'ads-manager', name: 'Ads Manager', icon: Target },
    { id: 'email-automation', name: 'Email Automation', icon: Mail },
    { id: 'seo-tools', name: 'SEO & Competitor Analysis', icon: Search },
    { id: 'landing-page', name: 'Landing Page Builder', icon: Globe },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'reports', name: 'Reports & Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`h-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r shadow-lg`}>
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white font-inter">Veraion 2.0</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Digital Marketing Suite</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        {/* Top Header */}
        <header className={`h-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search campaigns, leads, content..." 
                  className="pl-10 w-96"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? '☀️' : '🌙'}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">Dashboard Overview</h1>
                  <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your marketing campaigns.</p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Content
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active Campaigns</p>
                        <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">28</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">+12% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Leads</p>
                        <p className="text-3xl font-bold text-green-900 dark:text-green-100">2,398</p>
                        <p className="text-xs text-green-600 dark:text-green-400">+8% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Revenue</p>
                        <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">$125.6K</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">+23% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Conversion Rate</p>
                        <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">12.4%</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">+2.1% from last month</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <MousePointer className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Email campaign "Summer Sale" sent</p>
                          <p className="text-xs text-gray-500">2 hours ago • 2,450 recipients</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">45 new leads from Facebook Ads</p>
                          <p className="text-xs text-gray-500">4 hours ago • Campaign: Tech Launch</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Blog post "AI Marketing Tips" published</p>
                          <p className="text-xs text-gray-500">6 hours ago • 1,250 views</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-16 flex-col">
                        <FileText className="w-6 h-6 mb-2" />
                        <span className="text-sm">Generate Content</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Target className="w-6 h-6 mb-2" />
                        <span className="text-sm">Create Ad</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Mail className="w-6 h-6 mb-2" />
                        <span className="text-sm">Email Campaign</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Calendar className="w-6 h-6 mb-2" />
                        <span className="text-sm">Schedule Post</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'content-generator' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">AI Content Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">Create engaging content with AI assistance</p>
              </div>

              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Text Content</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center space-x-2">
                    <Image className="w-4 h-4" />
                    <span>Image Generation</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Video Scripts</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-inter">Content Input</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="content-type">Content Type</Label>
                          <select className="w-full mt-1 p-2 border rounded-lg" id="content-type">
                            <option>Blog Post</option>
                            <option>Social Media Post</option>
                            <option>Email Subject</option>
                            <option>Ad Copy</option>
                            <option>Product Description</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="prompt">Content Prompt</Label>
                          <textarea 
                            id="prompt"
                            className="w-full mt-1 p-3 border rounded-lg h-32"
                            placeholder="Describe what content you want to generate..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="tone">Tone & Style</Label>
                          <select className="w-full mt-1 p-2 border rounded-lg" id="tone">
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Casual</option>
                            <option>Persuasive</option>
                            <option>Educational</option>
                          </select>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                          <Zap className="w-4 h-4 mr-2" />
                          Generate Content
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-inter">Generated Content</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-64">
                          <p className="text-gray-500 dark:text-gray-400 italic">
                            Your generated content will appear here...
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Refine
                          </Button>
                          <Button variant="outline">
                            <Zap className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button>
                            <Send className="w-4 h-4 mr-2" />
                            Use Content
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Image Generation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="image-prompt">Image Description</Label>
                          <textarea 
                            id="image-prompt"
                            className="w-full mt-1 p-3 border rounded-lg h-24"
                            placeholder="Describe the image you want to generate..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Style</Label>
                            <select className="w-full mt-1 p-2 border rounded-lg">
                              <option>Photorealistic</option>
                              <option>Digital Art</option>
                              <option>Illustration</option>
                              <option>Minimalist</option>
                            </select>
                          </div>
                          <div>
                            <Label>Aspect Ratio</Label>
                            <select className="w-full mt-1 p-2 border rounded-lg">
                              <option>Square (1:1)</option>
                              <option>Landscape (16:9)</option>
                              <option>Portrait (9:16)</option>
                              <option>Wide (21:9)</option>
                            </select>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                          <Image className="w-4 h-4 mr-2" />
                          Generate Image
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="video" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Video Script Generator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Video Type</Label>
                          <select className="w-full mt-1 p-2 border rounded-lg">
                            <option>Explainer Video</option>
                            <option>Product Demo</option>
                            <option>Social Media Video</option>
                            <option>Educational Content</option>
                          </select>
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <select className="w-full mt-1 p-2 border rounded-lg">
                            <option>30 seconds</option>
                            <option>1 minute</option>
                            <option>2 minutes</option>
                            <option>5 minutes</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="video-topic">Video Topic</Label>
                          <textarea 
                            id="video-topic"
                            className="w-full mt-1 p-3 border rounded-lg h-24"
                            placeholder="What should the video be about?"
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-orange-600">
                          <Video className="w-4 h-4 mr-2" />
                          Generate Script
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === 'social-media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">Social Media Manager</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage and schedule your social media content</p>
                </div>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Content Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-96 flex items-center justify-center">
                        <div className="text-center">
                          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400">Calendar view will be displayed here</p>
                          <p className="text-sm text-gray-400">Drag and drop posts to schedule</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Connected Accounts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {socialMetrics.map((platform) => (
                        <div key={platform.platform} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              platform.platform === 'Facebook' ? 'bg-blue-100 text-blue-600' :
                              platform.platform === 'Instagram' ? 'bg-pink-100 text-pink-600' :
                              platform.platform === 'Twitter' ? 'bg-blue-100 text-blue-500' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{platform.platform}</p>
                              <p className="text-xs text-gray-500">{platform.followers.toLocaleString()} followers</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">Connected</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Engagement Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {socialMetrics.map((platform) => (
                          <div key={platform.platform}>
                            <div className="flex justify-between text-sm">
                              <span>{platform.platform}</span>
                              <span>{platform.engagement}%</span>
                            </div>
                            <Progress value={platform.engagement * 10} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email-automation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">Email Automation</h1>
                  <p className="text-gray-600 dark:text-gray-400">Create and manage automated email campaigns</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Template Builder
                  </Button>
                  <Button className="bg-gradient-to-r from-green-500 to-teal-600">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Campaign Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emailCampaigns.map((campaign, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge variant="outline">Active</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Sent</p>
                              <p className="font-bold">{campaign.sent.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Opened</p>
                              <p className="font-bold">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Clicked</p>
                              <p className="font-bold">{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Revenue</span>
                              <span>${campaign.revenue.toLocaleString()}</span>
                            </div>
                            <Progress value={(campaign.revenue / 25000) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Workflow Builder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">Drag & Drop Email Workflow</p>
                        <p className="text-sm text-gray-400">Build automated email sequences</p>
                        <Button className="mt-4" variant="outline">
                          Start Building
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Email Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={emailCampaigns}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="opened" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="clicked" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'seo-tools' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">SEO & Competitor Analysis</h1>
                <p className="text-gray-600 dark:text-gray-400">Optimize your content and track competitor performance</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Keyword Explorer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Enter keyword..." className="flex-1" />
                      <Button>
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">digital marketing</span>
                          <Badge>High</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Volume:</span>
                            <span className="ml-1 font-bold">18K/month</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Difficulty:</span>
                            <span className="ml-1 font-bold">72/100</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">seo tools</span>
                          <Badge variant="outline">Medium</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Volume:</span>
                            <span className="ml-1 font-bold">12K/month</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Difficulty:</span>
                            <span className="ml-1 font-bold">58/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Competitor Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Enter competitor domain..." className="flex-1" />
                      <Button>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">competitor1.com</span>
                          <Badge className="bg-red-100 text-red-700">Threat</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Traffic:</span>
                            <span className="ml-1 font-bold">125K/month</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Keywords:</span>
                            <span className="ml-1 font-bold">2,450</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">competitor2.com</span>
                          <Badge className="bg-yellow-100 text-yellow-700">Watch</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Traffic:</span>
                            <span className="ml-1 font-bold">85K/month</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Keywords:</span>
                            <span className="ml-1 font-bold">1,890</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">SERP Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { name: 'Week 1', position: 15 },
                        { name: 'Week 2', position: 12 },
                        { name: 'Week 3', position: 8 },
                        { name: 'Week 4', position: 5 },
                        { name: 'Week 5', position: 3 },
                        { name: 'Week 6', position: 2 }
                      ]}>
                        <XAxis dataKey="name" />
                        <YAxis reversed domain={[1, 20]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="position" stroke="#10B981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">CRM Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400">Manage leads, contacts, and sales pipeline</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Lead
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-sm text-gray-500">Total Leads</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-gray-500">Hot Prospects</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold">$89K</p>
                      <p className="text-sm text-gray-500">Pipeline Value</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <MousePointer className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold">23%</p>
                      <p className="text-sm text-gray-500">Conversion Rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Recent Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            JD
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-gray-500">john@company.com</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-700">Hot</Badge>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                            SM
                          </div>
                          <div>
                            <p className="font-medium">Sarah Miller</p>
                            <p className="text-sm text-gray-500">sarah@startup.io</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-700">Warm</Badge>
                          <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                            MJ
                          </div>
                          <div>
                            <p className="font-medium">Mike Johnson</p>
                            <p className="text-sm text-gray-500">mike@corp.com</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">Cold</Badge>
                          <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-inter">Sales Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Prospects</span>
                        <span className="text-sm text-gray-500">45 leads • $23K</span>
                      </div>
                      <Progress value={75} className="h-3" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Qualified</span>
                        <span className="text-sm text-gray-500">28 leads • $31K</span>
                      </div>
                      <Progress value={60} className="h-3" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Proposal</span>
                        <span className="text-sm text-gray-500">12 leads • $18K</span>
                      </div>
                      <Progress value={40} className="h-3" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Negotiation</span>
                        <span className="text-sm text-gray-500">8 leads • $17K</span>
                      </div>
                      <Progress value={25} className="h-3" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Closed Won</span>
                        <span className="text-sm text-gray-500">5 leads • $15K</span>
                      </div>
                      <Progress value={15} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'landing-page' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">Landing Page Builder</h1>
                  <p className="text-gray-600 dark:text-gray-400">Create high-converting landing pages with drag & drop</p>
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Page
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-inter">Page Elements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Header</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Image className="w-4 h-4" />
                          <span className="text-sm">Hero Section</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span className="text-sm">CTA Button</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">Testimonials</span>
                        </div>
                      </div>
                      <div className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Contact Form</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="font-inter">Preview Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Globe className="w-4 h-4 mr-2" />
                        Desktop
                      </Button>
                      <Button variant="outline" className="w-full">
                        📱 Tablet
                      </Button>
                      <Button variant="outline" className="w-full">
                        📱 Mobile
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-inter">Page Canvas</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Preview</Button>
                          <Button size="sm">Publish</Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">Drag elements here to build your page</p>
                          <p className="text-sm text-gray-400">Start with a template or build from scratch</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 rounded-lg mb-2"></div>
                        <p className="text-sm font-medium">SaaS Template</p>
                        <p className="text-xs text-gray-500">Modern SaaS landing page</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 h-24 rounded-lg mb-2"></div>
                        <p className="text-sm font-medium">Agency Template</p>
                        <p className="text-xs text-gray-500">Creative agency showcase</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-24 rounded-lg mb-2"></div>
                        <p className="text-sm font-medium">E-commerce Template</p>
                        <p className="text-xs text-gray-500">Product showcase page</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add other tab content as needed */}
          {(activeTab === 'ads-manager' || activeTab === 'reports' || activeTab === 'settings') && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-inter">
                  {activeTab === 'ads-manager' ? 'Ads Manager' : 
                   activeTab === 'reports' ? 'Reports & Analytics' : 'Settings'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {activeTab === 'ads-manager' ? 'Manage your advertising campaigns across platforms' : 
                   activeTab === 'reports' ? 'Comprehensive analytics and reporting dashboard' : 
                   'Configure your account and application settings'}
                </p>
              </div>
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {activeTab === 'ads-manager' && <Target className="w-8 h-8 text-gray-400" />}
                      {activeTab === 'reports' && <TrendingUp className="w-8 h-8 text-gray-400" />}
                      {activeTab === 'settings' && <Settings className="w-8 h-8 text-gray-400" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-gray-500">This feature is currently under development</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default VeraionDashboard;
